import {
  mkdir,
  readdir,
  readFile,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises"
import path from "node:path"
import { parseIssueForm, validateIssueFields } from "./parser.mjs"
import { renderDevLog } from "./render.mjs"
import { validateHttpUrl } from "./sanitize.mjs"

const PUBLISH_LABEL = "content:publish"
const ALLOWED_AUTHORS = new Set(["ph0911"])

function hasLabel(issue, label) {
  return issue.labels?.some(
    item => (typeof item === "string" ? item : item.name) === label,
  )
}

function publicationIntent(event) {
  if (event.action === "unlabeled" && event.label?.name === PUBLISH_LABEL)
    return "remove"
  return hasLabel(event.issue, PUBLISH_LABEL) ? "publish" : "ignore"
}

function assertAuthorized(issue) {
  if (!ALLOWED_AUTHORS.has(issue.user?.login?.toLowerCase())) {
    throw new Error(
      "Dieser GitHub-Account darf keine Dev-Logs veröffentlichen.",
    )
  }
}

function assertIssue(issue) {
  if (!Number.isSafeInteger(issue.number) || issue.number < 1) {
    throw new Error("Ungültige Issue-Nummer.")
  }
  validateHttpUrl(issue.html_url, "Issue-URL")
  if (!issue.created_at || Number.isNaN(Date.parse(issue.created_at))) {
    throw new Error("Ungültiges Erstellungsdatum.")
  }
}

function safeTarget(logDirectory, filename) {
  const root = path.resolve(logDirectory)
  const target = path.resolve(root, filename)
  if (path.dirname(target) !== root || !/^[-\w]+\.mdx$/.test(filename)) {
    throw new Error("Unsicherer Dev-Log-Pfad.")
  }
  return target
}

async function findSourceFile(logDirectory, issueNumber) {
  let entries
  try {
    entries = await readdir(logDirectory, { withFileTypes: true })
  } catch (error) {
    if (error.code === "ENOENT") return null
    throw error
  }

  const matches = []
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue
    const file = safeTarget(logDirectory, entry.name)
    const source = await readFile(file, "utf8")
    if (
      new RegExp(`^sourceIssue:\\s*["']?${issueNumber}["']?\\s*$`, "m").test(
        source,
      )
    ) {
      matches.push(file)
    }
  }
  if (matches.length > 1)
    throw new Error(`Mehrere Dev-Logs referenzieren Issue #${issueNumber}.`)
  return matches[0] ?? null
}

export async function syncDevLog(event, { logDirectory = "content/log" } = {}) {
  const intent = publicationIntent(event)
  if (intent === "ignore") return { action: "ignored", path: null }

  const issue = event.issue
  assertIssue(issue)
  assertAuthorized(issue)
  const existing = await findSourceFile(logDirectory, issue.number)

  if (intent === "remove") {
    if (existing) await unlink(existing)
    return { action: existing ? "removed" : "unchanged", path: existing }
  }

  const fields = validateIssueFields(parseIssueForm(issue.body ?? ""))
  const publishedAt = new Date(issue.created_at).toISOString().slice(0, 10)
  const filename = `${publishedAt}-issue-${issue.number}.mdx`
  const destination = safeTarget(logDirectory, filename)
  const source = renderDevLog({ issue, fields, publishedAt })

  await mkdir(path.resolve(logDirectory), { recursive: true })
  if (existing && existing !== destination) await rename(existing, destination)

  let previous = null
  try {
    previous = await readFile(destination, "utf8")
  } catch (error) {
    if (error.code !== "ENOENT") throw error
  }
  if (previous === source) return { action: "unchanged", path: destination }

  await writeFile(destination, source, { encoding: "utf8", mode: 0o644 })
  return {
    action: previous === null ? "created" : "updated",
    path: destination,
  }
}
