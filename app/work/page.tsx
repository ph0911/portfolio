import type { Metadata } from "next"

import { PageIntro } from "@/components/page-intro"
import { ProjectList } from "@/components/project-list"
import { getProjects } from "@/lib/content"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Aktive Produkte, Experimente und frühere Arbeiten von Pascal Heue.",
}

export default function WorkPage() {
  const projects = getProjects()

  return (
    <>
      <PageIntro
        description="Produkte, Systeme und Experimente – mit dem Problem, dem aktuellen Stand und den Entscheidungen dahinter."
        eyebrow="Work · Auswahl"
        title="Arbeit, die weiterlebt."
      />
      <section className="section-shell">
        <div className="site-container">
          <ProjectList expandedCount={2} headingLevel={2} projects={projects} />
        </div>
      </section>
    </>
  )
}
