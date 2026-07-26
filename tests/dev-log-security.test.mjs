import assert from "node:assert/strict"
import { mkdtemp, readdir } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { syncDevLog } from "../scripts/dev-log/sync.mjs"
import { issueBody, issueEvent } from "./dev-log-fixtures.mjs"

async function emptyLogDirectory() {
  const root = await mkdtemp(
    path.join(os.tmpdir(), "portfolio-dev-log-security-"),
  )
  return { root, logDirectory: path.join(root, "content", "log") }
}

test("rejects an unauthorized issue author before writing", async t => {
  const { root, logDirectory } = await emptyLogDirectory()
  t.after(() =>
    import("node:fs/promises").then(({ rm }) => rm(root, { recursive: true })),
  )

  await assert.rejects(
    syncDevLog(issueEvent({ issue: { user: { login: "attacker" } } }), {
      logDirectory,
    }),
    /darf keine Dev-Logs/,
  )
  await assert.rejects(readdir(logDirectory), { code: "ENOENT" })
})

test("escapes HTML, MDX expressions, ESM and unsafe markdown links", async t => {
  const { root, logDirectory } = await emptyLogDirectory()
  t.after(() =>
    import("node:fs/promises").then(({ rm }) => rm(root, { recursive: true })),
  )
  const details = [
    "<script>alert(1)</script>",
    "{process.env.SECRET}",
    "export const exploit = true",
    "[click](javascript:alert(1))",
    "![tracker](https://example.com/pixel.gif)",
    "- **Sicheres Markdown** bleibt.",
  ].join("\n")
  const event = issueEvent({ issue: { body: issueBody({ Details: details }) } })

  await syncDevLog(event, { logDirectory })
  const [filename] = await readdir(logDirectory)
  const source = await import("node:fs/promises").then(({ readFile }) =>
    readFile(path.join(logDirectory, filename), "utf8"),
  )

  assert.doesNotMatch(source, /<script>|\{process\.env\.SECRET\}|^export /m)
  assert.doesNotMatch(source, /javascript:|!\[tracker\]/)
  assert.match(source, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/)
  assert.match(source, /&#123;process\.env\.SECRET&#125;/)
  assert.match(source, /\\export const exploit/)
  assert.match(source, /- \*\*Sicheres Markdown\*\* bleibt\./)
})

test("neutralizes reference links, reference images and unsafe schemes", async t => {
  const { root, logDirectory } = await emptyLogDirectory()
  t.after(() =>
    import("node:fs/promises").then(({ rm }) => rm(root, { recursive: true })),
  )
  const details = [
    "[Data-Link][data]",
    "[Datei-Link][file]",
    "[VBScript-Link][vbscript]",
    "![Externer Tracker][tracker]",
    "",
    "[data]: data:text/html,<script>alert(1)</script>",
    "[file]: file:///etc/passwd",
    "[vbscript]: vbscript:msgbox(1)",
    "[tracker]: https://example.com/pixel.gif",
  ].join("\n")
  const event = issueEvent({ issue: { body: issueBody({ Details: details }) } })

  await syncDevLog(event, { logDirectory })
  const [filename] = await readdir(logDirectory)
  const source = await import("node:fs/promises").then(({ readFile }) =>
    readFile(path.join(logDirectory, filename), "utf8"),
  )

  assert.doesNotMatch(source, /!\[Externer Tracker\]/)
  assert.doesNotMatch(source, /^\[(data|file|vbscript|tracker)\]:/m)
  assert.match(source, /\\\[data\]: data:text\/html/)
  assert.match(source, /Externer Tracker/)
})

test("rejects non-http optional links without writing", async t => {
  const { root, logDirectory } = await emptyLogDirectory()
  t.after(() =>
    import("node:fs/promises").then(({ rm }) => rm(root, { recursive: true })),
  )
  const event = issueEvent({
    issue: { body: issueBody({ Link: "javascript:alert(document.cookie)" }) },
  })

  await assert.rejects(
    syncDevLog(event, { logDirectory }),
    /http:\/\/ oder https:\/\//,
  )
  await assert.rejects(readdir(logDirectory), { code: "ENOENT" })
})
