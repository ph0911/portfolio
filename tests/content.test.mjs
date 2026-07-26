import assert from "node:assert/strict"
import test from "node:test"
import {
  getFeaturedProjects,
  getLogEntryBySlug,
  getLogEntries,
  getLogEntriesForProject,
  getProjectBySlug,
  getProjects,
  getRecentLogEntries,
  logEntrySchema,
  projectSchema,
} from "../lib/content/index.ts"

test("project and log schemas reject malformed content", () => {
  const projectResult = projectSchema.safeParse({
    slug: "broken-project",
    title: "Broken",
    summary: "Missing required fields",
    status: "unknown",
    extra: true,
  })
  const logResult = logEntrySchema.safeParse({
    slug: "broken-log",
    type: "decision",
    title: "Broken",
    summary: "Invalid date",
    publishedAt: "26.07.2026",
    tags: [],
    schemaVersion: 1,
    body: "Body",
  })

  assert.equal(projectResult.success, false)
  assert.equal(logResult.success, false)
})

test("projects are ordered explicitly and featured projects keep that order", () => {
  assert.deepEqual(
    getProjects().map(project => project.slug),
    [
      "evo-ios",
      "nomi",
      "evo-web",
      "headroom",
      "portfolio-v2",
      "pinder-digital-brand",
      "portfolio-v1",
    ],
  )
  assert.deepEqual(
    getFeaturedProjects().map(project => project.slug),
    ["evo-ios", "nomi", "evo-web", "headroom"],
  )
  assert.equal(getProjectBySlug("nomi")?.title, "Nomi")
  assert.equal(getProjectBySlug("does-not-exist"), null)
})

test("logs are newest-first and remain associated with existing projects", () => {
  const entries = getLogEntries()
  const projectSlugs = new Set(getProjects().map(project => project.slug))

  assert.deepEqual(
    entries.map(entry => entry.slug),
    [
      "evo-finance-local-first-foundation",
      "evo-health-data-stays-local",
      "nomi-capture-first-ai-optional",
      "headroom-trends-not-peaks",
    ],
  )
  assert.deepEqual(
    getRecentLogEntries(2).map(entry => entry.slug),
    ["evo-finance-local-first-foundation", "evo-health-data-stays-local"],
  )
  assert.equal(
    getLogEntryBySlug("nomi-capture-first-ai-optional")?.projectId,
    "nomi",
  )
  assert.equal(getLogEntryBySlug("does-not-exist"), null)
  assert.ok(
    entries.every(
      entry => !entry.projectId || projectSlugs.has(entry.projectId),
    ),
  )
  assert.deepEqual(
    getLogEntriesForProject("evo-ios").map(entry => entry.slug),
    ["evo-finance-local-first-foundation", "evo-health-data-stays-local"],
  )
  assert.deepEqual(getLogEntriesForProject("portfolio-v1"), [])
})
