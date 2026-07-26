#!/usr/bin/env node
import { readFile } from "node:fs/promises"
import { syncDevLog } from "./sync.mjs"

function eventPath(argv, environment) {
  const index = argv.indexOf("--event")
  if (index >= 0 && argv[index + 1]) return argv[index + 1]
  if (environment.GITHUB_EVENT_PATH) return environment.GITHUB_EVENT_PATH
  throw new Error("Event-Datei fehlt: GITHUB_EVENT_PATH oder --event angeben.")
}

export async function run(
  argv = process.argv.slice(2),
  environment = process.env,
) {
  const source = await readFile(eventPath(argv, environment), "utf8")
  const event = JSON.parse(source)
  const result = await syncDevLog(event)
  process.stdout.write(`${JSON.stringify(result)}\n`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(error => {
    process.stderr.write(`Dev-Log-Sync fehlgeschlagen: ${error.message}\n`)
    process.exitCode = 1
  })
}
