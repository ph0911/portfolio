import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { MdxContent } from "@/components/mdx-content"
import { PageIntro } from "@/components/page-intro"
import {
  getLogEntries,
  getLogEntryBySlug,
  getProjectBySlug,
} from "@/lib/content"
import { formatDate, getLogTypeLabel } from "@/lib/presentation"

type LogEntryPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getLogEntries().map(entry => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: LogEntryPageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getLogEntryBySlug(slug)

  if (!entry) {
    return {}
  }

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/log/${entry.slug}` },
    openGraph: {
      type: "article",
      publishedTime: entry.publishedAt,
      tags: entry.tags,
    },
  }
}

export default async function LogEntryPage({ params }: LogEntryPageProps) {
  const { slug } = await params
  const entry = getLogEntryBySlug(slug)

  if (!entry) {
    notFound()
  }

  const project = entry.projectId
    ? getProjectBySlug(entry.projectId)
    : undefined

  return (
    <>
      <PageIntro
        backHref="/log"
        backLabel="Alle Updates"
        description={entry.summary}
        eyebrow={`${formatDate(entry.publishedAt)} · ${getLogTypeLabel(entry.type)}`}
        title={entry.title}
      />
      <section className="section-shell">
        <div className="site-container grid gap-10 lg:grid-cols-[13rem_minmax(0,44rem)] lg:justify-center">
          <aside className="meta space-y-5">
            {project ? (
              <div>
                <p>Projekt</p>
                <Link
                  className="mt-1 inline-block text-foreground underline underline-offset-4 hover:text-accent"
                  href={`/work/${project.slug}`}
                >
                  {project.title}
                </Link>
              </div>
            ) : null}
            <div>
              <p>Tags</p>
              <p className="mt-1 text-foreground">{entry.tags.join(" · ")}</p>
            </div>
          </aside>
          <article className="prose prose-lg prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.025em] prose-p:text-muted-foreground">
            <MdxContent source={entry.body} />
          </article>
        </div>
      </section>
    </>
  )
}
