import assert from "node:assert/strict"
import { mkdtemp, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { run } from "../scripts/dev-log/cli.mjs"
import { issueEvent } from "./dev-log-fixtures.mjs"

test("reads the event path from --event or GITHUB_EVENT_PATH", async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-dev-log-cli-"))
  t.after(() =>
    import("node:fs/promises").then(({ rm }) => rm(root, { recursive: true })),
  )
  const eventFile = path.join(root, "event.json")
  const event = issueEvent({
    action: "labeled",
    label: { name: "content:inbox" },
    issue: { labels: [{ name: "content:inbox" }] },
  })
  await writeFile(eventFile, JSON.stringify(event))

  await assert.doesNotReject(run(["--event", eventFile], {}))
  await assert.doesNotReject(run([], { GITHUB_EVENT_PATH: eventFile }))
})
