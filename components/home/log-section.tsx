import Link from "next/link"

import type { LogEntry, Project } from "@/lib/content"
import { formatDate, getLogTypeLabel } from "@/lib/presentation"

import { SectionHeading } from "@/components/section-heading"
import { ArrowLink } from "@/components/ui/arrow-link"

type LogSectionProps = {
  entries: LogEntry[]
  projects: Project[]
}

export function LogSection({ entries, projects }: LogSectionProps) {
  const [lead, ...rest] = entries
  const projectNames = new Map(
    projects.map(project => [project.slug, project.title]),
  )

  if (!lead) {
    return null
  }

  return (
    <section className="section-shell">
      <div className="site-container">
        <SectionHeading
          description="Fortschritte, Entscheidungen und Learnings – kurz genug für den Alltag, konkret genug zum Nachvollziehen."
          number="03"
          title="Aus dem Dev Log"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:gap-16">
          <article>
            <p className="meta flex flex-wrap gap-x-5 gap-y-1 text-accent">
              <time dateTime={lead.publishedAt}>
                {formatDate(lead.publishedAt)}
              </time>
              <span>{getLogTypeLabel(lead.type)}</span>
              {lead.projectId ? (
                <span>{projectNames.get(lead.projectId)}</span>
              ) : null}
            </p>
            <h3 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.035em] md:text-5xl">
              <Link
                className="transition-colors hover:text-accent"
                href={`/log/${lead.slug}`}
              >
                {lead.title}
              </Link>
            </h3>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              {lead.summary}
            </p>
            <div className="mt-7">
              <ArrowLink href={`/log/${lead.slug}`} tone="accent">
                Update lesen
              </ArrowLink>
            </div>
          </article>

          <div className="border-l border-border pl-6 md:pl-8">
            {rest.map(entry => (
              <article
                className="grid gap-4 border-t border-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[8rem_1fr_auto]"
                key={entry.slug}
              >
                <p className="meta">
                  <time dateTime={entry.publishedAt}>
                    {formatDate(entry.publishedAt)}
                  </time>
                  <span className="mt-1 block">
                    {getLogTypeLabel(entry.type)}
                  </span>
                  {entry.projectId ? (
                    <span className="mt-1 block">
                      {projectNames.get(entry.projectId)}
                    </span>
                  ) : null}
                </p>
                <div>
                  <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                    <Link
                      className="transition-colors hover:text-accent"
                      href={`/log/${entry.slug}`}
                    >
                      {entry.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                </div>
                <Link
                  aria-label={`${entry.title} lesen`}
                  className="inline-flex size-11 items-center justify-center hover:text-accent"
                  href={`/log/${entry.slug}`}
                >
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
            <div className="mt-4">
              <ArrowLink href="/log" tone="accent">
                Alle Updates lesen
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
