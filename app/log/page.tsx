import type { Metadata } from "next"
import Link from "next/link"

import { LogList } from "@/components/log-list"
import { PageIntro } from "@/components/page-intro"
import { getLogEntries, getProjects } from "@/lib/content"

export const metadata: Metadata = {
  title: "Dev Log",
  description:
    "Kurze Fortschritte, Entscheidungen, Releases und Learnings aus Pascals Projekten.",
  alternates: {
    canonical: "/log",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/feed+json": "/feed.json",
    },
  },
}

export default function LogPage() {
  const entries = getLogEntries()
  const projects = getProjects()

  return (
    <>
      <PageIntro
        description="Fortschritte, Entscheidungen und Learnings – kurz genug für den Alltag, konkret genug zum Nachvollziehen."
        eyebrow="Dev Log · Laufend"
        title="Werkstatt statt Hochglanz."
      />
      <section className="section-shell">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link className="underlined-link" href="/feed.xml">
              RSS Feed <span aria-hidden="true">↗</span>
            </Link>
            <Link className="underlined-link" href="/feed.json">
              JSON Feed <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <LogList entries={entries} projects={projects} />
        </div>
      </section>
    </>
  )
}
