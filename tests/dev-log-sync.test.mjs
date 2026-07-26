import assert from "node:assert/strict"
import { mkdtemp, readFile, readdir } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { syncDevLog } from "../scripts/dev-log/sync.mjs"
import { issueBody, issueEvent } from "./dev-log-fixtures.mjs"

async function testLogDirectory(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-dev-log-"))
  t.after(() =>
    import("node:fs/promises").then(({ rm }) => rm(root, { recursive: true })),
  )
  return path.join(root, "content", "log")
}

test("publishes a valid issue form deterministically", async t => {
  const logDirectory = await testLogDirectory(t)
  const result = await syncDevLog(issueEvent(), { logDirectory })
  const filename = "2026-07-26-issue-42.mdx"
  const source = await readFile(path.join(logDirectory, filename), "utf8")

  assert.equal(result.action, "created")
  assert.match(source, /^schemaVersion: 1$/m)
  assert.match(source, /^sourceIssue: "42"$/m)
  assert.match(
    source,
    /sourceUrl: "https:\/\/github\.com\/ph0911\/portfolio\/issues\/42"/,
  )
  assert.match(source, /^projectId: "evo-ios"$/m)
  assert.match(source, /^type: "decision"$/m)
  assert.match(
    source,
    /\[Weitere Informationen\]\(https:\/\/github\.com\/ph0911\/evo\)/,
  )
  assert.match(source, /- Offline bleibt \*\*nutzbar\*\*\./)
  assert.deepEqual(await readdir(logDirectory), [filename])
})

test("keeps level-three headings inside details", async t => {
  const logDirectory = await testLogDirectory(t)
  const details = [
    "Ausgangslage.",
    "",
    "### Entscheidung",
    "",
    "Dieser Absatz bleibt Teil der Details.",
  ].join("\n")
  await syncDevLog(
    issueEvent({ issue: { body: issueBody({ Details: details }) } }),
    { logDirectory },
  )
  const [filename] = await readdir(logDirectory)
  const source = await readFile(path.join(logDirectory, filename), "utf8")

  assert.match(source, /### Entscheidung/)
  assert.match(source, /Dieser Absatz bleibt Teil der Details\./)
})

test("rejects duplicate and reordered form fields", async t => {
  const logDirectory = await testLogDirectory(t)
  const duplicate = `${issueBody()}\n\n### Title\n\nZweiter Titel`
  const reordered = issueBody()
    .replace("### Type\n\nDecision", "### TYPE_PLACEHOLDER\n\nDecision")
    .replace("### Project\n\nEvo iOS", "### Type\n\nDecision")
    .replace("### TYPE_PLACEHOLDER\n\nDecision", "### Project\n\nEvo iOS")

  await assert.rejects(
    syncDevLog(issueEvent({ issue: { body: duplicate } }), { logDirectory }),
    /darf nur einmal vorkommen/,
  )
  await assert.rejects(
    syncDevLog(issueEvent({ issue: { body: reordered } }), { logDirectory }),
    /erwarteten Reihenfolge/,
  )
  await assert.rejects(readdir(logDirectory), { code: "ENOENT" })
})

test("repeating an event is idempotent and edits update the same sourceIssue", async t => {
  const logDirectory = await testLogDirectory(t)
  await syncDevLog(issueEvent(), { logDirectory })
  const unchanged = await syncDevLog(issueEvent(), { logDirectory })
  const edited = issueEvent({
    action: "edited",
    issue: {
      body: issueBody({ Summary: "Neue Zusammenfassung." }),
      created_at: "2026-07-27T08:15:00Z",
    },
  })
  const updated = await syncDevLog(edited, { logDirectory })

  assert.equal(unchanged.action, "unchanged")
  assert.equal(updated.action, "updated")
  assert.deepEqual(await readdir(logDirectory), ["2026-07-27-issue-42.mdx"])
  assert.match(
    await readFile(path.join(logDirectory, "2026-07-27-issue-42.mdx"), "utf8"),
    /Neue Zusammenfassung\./,
  )
})

test("removing content:publish safely unpublishes by sourceIssue", async t => {
  const logDirectory = await testLogDirectory(t)
  await syncDevLog(issueEvent(), { logDirectory })
  const result = await syncDevLog(
    issueEvent({
      action: "unlabeled",
      label: { name: "content:publish" },
      issue: { labels: [{ name: "content:inbox" }] },
    }),
    { logDirectory },
  )

  assert.equal(result.action, "removed")
  assert.deepEqual(await readdir(logDirectory), [])
})

test("ignores inbox and unrelated label events", async t => {
  const logDirectory = await testLogDirectory(t)
  const result = await syncDevLog(
    issueEvent({
      action: "labeled",
      label: { name: "content:inbox" },
      issue: { labels: [{ name: "content:inbox" }] },
    }),
    { logDirectory },
  )

  assert.deepEqual(result, { action: "ignored", path: null })
  await assert.rejects(readdir(logDirectory), { code: "ENOENT" })
})
