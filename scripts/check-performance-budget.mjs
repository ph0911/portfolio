#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import { gzipSync } from "node:zlib"

const root = process.cwd()
const staticRoot = path.join(root, ".next", "static")
const htmlRoot = path.join(root, ".next", "server", "app")

async function filesWithin(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async entry => {
      const target = path.join(directory, entry.name)
      return entry.isDirectory() ? filesWithin(target) : [target]
    }),
  )

  return files.flat()
}

function bytes(files, sizes) {
  return files.reduce((total, file) => total + (sizes.get(file) ?? 0), 0)
}

function kilobytes(value) {
  return `${(value / 1024).toFixed(1)} KiB`
}

async function routeJavaScriptPayloads() {
  const htmlFiles = (await filesWithin(htmlRoot)).filter(file =>
    file.endsWith(".html"),
  )

  return Promise.all(
    htmlFiles.map(async htmlFile => {
      const html = await readFile(htmlFile, "utf8")
      const assetPaths = [
        ...new Set(
          [...html.matchAll(/<script[^>]+src="\/_next\/(static\/[^"]+\.js)"/g)]
            .map(match =>
              path.join(root, ".next", decodeURIComponent(match[1])),
            )
            .filter(file => file.startsWith(staticRoot)),
        ),
      ]
      const sources = await Promise.all(assetPaths.map(file => readFile(file)))

      return {
        route: path
          .relative(htmlRoot, htmlFile)
          .replace(/(?:^|\/)index\.html$/, "/")
          .replace(/\.html$/, "")
          .replaceAll(path.sep, "/")
          .replace(/^([^/])/, "/$1"),
        raw: sources.reduce((total, source) => total + source.byteLength, 0),
        gzip: sources.reduce(
          (total, source) => total + gzipSync(source).byteLength,
          0,
        ),
      }
    }),
  )
}

async function main() {
  let files

  try {
    files = await filesWithin(staticRoot)
  } catch {
    throw new Error(
      "Kein Production-Build gefunden. Zuerst `npm run build` ausführen.",
    )
  }

  const sizes = new Map(
    await Promise.all(files.map(async file => [file, (await stat(file)).size])),
  )
  const appJavaScript = files.filter(
    file =>
      file.includes(`${path.sep}chunks${path.sep}app${path.sep}`) &&
      file.endsWith(".js"),
  )
  const fonts = files.filter(
    file => file.endsWith(".woff") || file.endsWith(".woff2"),
  )
  const largestAsset = Math.max(...sizes.values())
  const routePayloads = await routeJavaScriptPayloads()
  const largestRoutePayload = routePayloads.sort((a, b) => b.gzip - a.gzip)[0]

  const budgets = [
    {
      label: "Statische Build-Assets",
      actual: bytes(files, sizes),
      maximum: 1_500_000,
    },
    {
      label: `Größtes Route-JavaScript gzip (${largestRoutePayload.route})`,
      actual: largestRoutePayload.gzip,
      maximum: 190_000,
    },
    {
      label: "Lokale Webfonts",
      actual: bytes(fonts, sizes),
      maximum: 160_000,
    },
    {
      label: "Größtes einzelnes Asset",
      actual: largestAsset,
      maximum: 300_000,
    },
  ]

  console.log("| Budget | Ist | Maximum |")
  console.log("| --- | ---: | ---: |")

  for (const budget of budgets) {
    console.log(
      `| ${budget.label} | ${kilobytes(budget.actual)} | ${kilobytes(budget.maximum)} |`,
    )
  }
  console.log(
    `\nGrößtes Route-JavaScript roh: ${kilobytes(largestRoutePayload.raw)}; route-spezifische App-Chunks gesamt: ${kilobytes(bytes(appJavaScript, sizes))}.`,
  )

  const exceeded = budgets.filter(budget => budget.actual > budget.maximum)
  if (exceeded.length) {
    throw new Error(
      `Performance-Budget überschritten: ${exceeded.map(item => item.label).join(", ")}`,
    )
  }
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
