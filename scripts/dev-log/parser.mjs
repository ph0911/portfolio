import { sanitizeMarkdown, sanitizeText, validateHttpUrl } from "./sanitize.mjs"

const FORM_FIELDS = [
  "Type",
  "Project",
  "Title",
  "Summary",
  "Details",
  "Tags",
  "Link",
]
const REQUIRED_FIELDS = FORM_FIELDS.filter(name => name !== "Link")
const TYPE_VALUES = new Map([
  ["Update", "progress"],
  ["Decision", "decision"],
  ["Learning", "learning"],
  ["Release", "release"],
  ["Experiment", "experiment"],
])
const PROJECT_VALUES = new Map([
  ["Evo iOS", "evo-ios"],
  ["Evo Web", "evo-web"],
  ["Nomi", "nomi"],
  ["Headroom", "headroom"],
  ["Portfolio", "portfolio-v2"],
  ["Other", null],
])
const FIELD_LIMITS = {
  Title: 120,
  Summary: 360,
  Details: 8_000,
}

export function parseIssueForm(body) {
  const fields = {}
  const headings = [...body.matchAll(/^### ([^\r\n]+)\r?$/gm)].map(match => ({
    index: match.index,
    length: match[0].length,
    name: match[1].trim(),
  }))
  const knownHeadings = headings.filter(heading =>
    FORM_FIELDS.includes(heading.name),
  )
  const seen = new Set()

  for (const heading of knownHeadings) {
    if (seen.has(heading.name)) {
      throw new Error(`Feld „${heading.name}“ darf nur einmal vorkommen.`)
    }
    seen.add(heading.name)
  }

  const actualOrder = knownHeadings.map(heading => heading.name)
  const expectedOrder = FORM_FIELDS.filter(name => seen.has(name))
  if (actualOrder.some((name, index) => name !== expectedOrder[index])) {
    throw new Error(
      "Die Dev-Log-Felder stehen nicht in der erwarteten Reihenfolge.",
    )
  }

  const detailsStart = knownHeadings.find(heading => heading.name === "Details")
  const tagsStart = knownHeadings.find(heading => heading.name === "Tags")
  const unknownHeadings = headings.filter(
    heading => !FORM_FIELDS.includes(heading.name),
  )

  for (const heading of unknownHeadings) {
    const belongsToDetails =
      detailsStart &&
      tagsStart &&
      heading.index > detailsStart.index &&
      heading.index < tagsStart.index
    if (!belongsToDetails) {
      throw new Error(`Unbekannte Formularüberschrift „${heading.name}“.`)
    }
  }

  for (const [index, heading] of knownHeadings.entries()) {
    const start = heading.index + heading.length
    const end = knownHeadings[index + 1]?.index ?? body.length
    fields[heading.name] = body.slice(start, end).trim()
  }

  return fields
}

function requireField(fields, name) {
  const value = fields[name]?.trim()
  if (!value || value === "_No response_") {
    throw new Error(`Pflichtfeld „${name}“ fehlt.`)
  }
  return value
}

function parseTags(value) {
  const tags = [
    ...new Set(
      value
        .split(",")
        .map(tag => sanitizeText(tag))
        .filter(Boolean),
    ),
  ]
  if (tags.length === 0 || tags.length > 8) {
    throw new Error("Tags muss zwischen einem und acht Einträgen enthalten.")
  }
  if (tags.some(tag => tag.length > 32)) {
    throw new Error("Ein Tag darf höchstens 32 Zeichen lang sein.")
  }
  return tags
}

export function validateIssueFields(fields) {
  for (const name of REQUIRED_FIELDS) requireField(fields, name)

  for (const [name, limit] of Object.entries(FIELD_LIMITS)) {
    if (fields[name].length > limit) {
      throw new Error(`„${name}“ darf höchstens ${limit} Zeichen lang sein.`)
    }
  }

  const type = TYPE_VALUES.get(sanitizeText(fields.Type))
  const projectId = PROJECT_VALUES.get(sanitizeText(fields.Project))
  if (!type) throw new Error("Unbekannter Dev-Log-Typ.")
  if (projectId === undefined) throw new Error("Unbekanntes Projekt.")

  return {
    type,
    projectId,
    title: sanitizeText(fields.Title),
    summary: sanitizeText(fields.Summary),
    details: sanitizeMarkdown(fields.Details),
    tags: parseTags(fields.Tags),
    link: validateHttpUrl(
      fields.Link === "_No response_" ? "" : (fields.Link ?? ""),
      "Link",
    ),
  }
}
