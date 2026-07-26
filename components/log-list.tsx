import Link from "next/link"

import type { LogEntry, Project } from "@/lib/content"
import { formatDate, getLogTypeLabel } from "@/lib/presentation"

type LogListProps = {
  entries: LogEntry[]
  projects: Project[]
}

export function LogList({ entries, projects }: LogListProps) {
  const projectNames = new Map(
    projects.map(project => [project.slug, project.title]),
  )

  return (
    <ol>
      {entries.map(entry => (
        <li
          className="grid gap-4 border-t border-border py-7 md:grid-cols-[12rem_1fr_auto] md:items-start"
          key={entry.slug}
        >
          <div className="meta space-y-1">
            <time dateTime={entry.publishedAt}>
              {formatDate(entry.publishedAt)}
            </time>
            <p>{getLogTypeLabel(entry.type)}</p>
            {entry.projectId ? (
              <p>{projectNames.get(entry.projectId) ?? entry.projectId}</p>
            ) : null}
          </div>
          <div>
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.025em]">
              <Link
                className="transition-colors hover:text-accent"
                href={`/log/${entry.slug}`}
              >
                {entry.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {entry.summary}
            </p>
            <ul className="meta mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {entry.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <Link
            aria-label={`${entry.title} lesen`}
            className="inline-flex size-11 items-center justify-center text-xl transition-colors hover:text-accent"
            href={`/log/${entry.slug}`}
          >
            <span aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
