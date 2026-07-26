import type { Project } from "@/lib/content"

import { ProjectList } from "@/components/project-list"
import { SectionHeading } from "@/components/section-heading"

type WorkSectionProps = {
  projects: Project[]
}

export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section className="section-shell">
      <div className="site-container">
        <SectionHeading
          description="Produkte, Experimente und die Entscheidungen, die sie geformt haben."
          number="02"
          title="Ausgewählte Arbeit"
        />
        <ProjectList projects={projects} />
      </div>
    </section>
  )
}
