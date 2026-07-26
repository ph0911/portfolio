import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { z } from "zod"

const contentRoot = path.join(process.cwd(), "content")
const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase, kebab-case slug")
const nonEmptyText = z.string().trim().min(1)

export const projectStatusSchema = z.enum([
  "active",
  "origin",
  "lab",
  "archive",
])

export const projectSchema = z
  .object({
    slug: slugSchema,
    title: nonEmptyText,
    summary: nonEmptyText,
    status: projectStatusSchema,
    period: nonEmptyText,
    role: nonEmptyText,
    stack: z.array(nonEmptyText).min(1),
    featured: z.boolean(),
    order: z.number().int().nonnegative(),
    mark: nonEmptyText,
    links: z
      .array(
        z
          .object({
            label: nonEmptyText,
            href: z.url(),
          })
          .strict(),
      )
      .optional(),
    body: nonEmptyText,
  })
  .strict()

export const logEntryTypeSchema = z.enum([
  "progress",
  "decision",
  "release",
  "learning",
  "experiment",
  "note",
])

export const logEntrySchema = z
  .object({
    slug: slugSchema,
    type: logEntryTypeSchema,
    title: nonEmptyText,
    summary: nonEmptyText,
    publishedAt: z.iso.date(),
    projectId: slugSchema.optional(),
    tags: z.array(nonEmptyText),
    sourceIssue: nonEmptyText.optional(),
    sourceUrl: z.url().optional(),
    schemaVersion: z.literal(1),
    body: nonEmptyText,
  })
  .strict()

export type ProjectStatus = z.infer<typeof projectStatusSchema>
export type Project = z.infer<typeof projectSchema>
export type LogEntryType = z.infer<typeof logEntryTypeSchema>
export type LogEntry = z.infer<typeof logEntrySchema>

type ContentSchema<T> = z.ZodType<T>

function formatValidationError(
  collection: string,
  filename: string,
  error: z.ZodError,
) {
  const issues = error.issues
    .map(issue => {
      const field = issue.path.length ? issue.path.join(".") : "frontmatter"
      return `- ${field}: ${issue.message}`
    })
    .join("\n")

  return `Invalid ${collection} content in ${filename}:\n${issues}`
}

function readCollection<T>(
  collection: "projects" | "log",
  schema: ContentSchema<T>,
): T[] {
  const directory = path.join(contentRoot, collection)

  if (!fs.existsSync(directory)) {
    return []
  }

  return fs
    .readdirSync(directory)
    .filter(filename => filename.endsWith(".mdx"))
    .sort()
    .map(filename => {
      const source = fs.readFileSync(path.join(directory, filename), "utf8")
      let parsed: matter.GrayMatterFile<string>

      try {
        parsed = matter(source)
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error)
        throw new Error(
          `Unable to parse content/${collection}/${filename}: ${reason}`,
          { cause: error },
        )
      }

      const { data, content } = parsed
      const input = {
        ...data,
        slug: filename.replace(/\.mdx$/, ""),
        body: content.trim(),
      }
      const result = schema.safeParse(input)

      if (!result.success) {
        throw new Error(
          formatValidationError(
            `content/${collection}`,
            filename,
            result.error,
          ),
        )
      }

      return result.data
    })
}

function compareProjects(a: Project, b: Project) {
  return a.order - b.order || a.title.localeCompare(b.title, "de")
}

function compareLogEntries(a: LogEntry, b: LogEntry) {
  return (
    b.publishedAt.localeCompare(a.publishedAt) ||
    a.slug.localeCompare(b.slug, "de")
  )
}

export function getProjects(): Project[] {
  return readCollection("projects", projectSchema).sort(compareProjects)
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter(project => project.featured)
}

export function getProjectBySlug(slug: string): Project | null {
  return getProjects().find(project => project.slug === slug) ?? null
}

export function getLogEntries(): LogEntry[] {
  const entries = readCollection("log", logEntrySchema)
  const projectSlugs = new Set(getProjects().map(project => project.slug))

  for (const entry of entries) {
    if (entry.projectId && !projectSlugs.has(entry.projectId)) {
      throw new Error(
        `Invalid content/log association in ${entry.slug}.mdx: projectId "${entry.projectId}" does not match a project slug`,
      )
    }
  }

  return entries.sort(compareLogEntries)
}

export function getRecentLogEntries(limit = 6): LogEntry[] {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error("Recent log entry limit must be a non-negative integer")
  }

  return getLogEntries().slice(0, limit)
}

export function getLogEntryBySlug(slug: string): LogEntry | null {
  return getLogEntries().find(entry => entry.slug === slug) ?? null
}

export function getLogEntriesForProject(projectSlug: string): LogEntry[] {
  return getLogEntries().filter(entry => entry.projectId === projectSlug)
}
