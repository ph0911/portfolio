import type { Project } from "@/lib/content"
import { getProjectStatusLabel } from "@/lib/presentation"

import { SectionHeading } from "@/components/section-heading"
import { ArrowLink } from "@/components/ui/arrow-link"

type FocusSectionProps = {
  project: Project
}

export function FocusSection({ project }: FocusSectionProps) {
  const isEvo = project.slug === "evo-ios"
  const summary = isEvo
    ? "Ein local-first Alltagsbegleiter mit bewusster Cloud- und KI-Grenze."
    : project.summary
  const period = isEvo ? "Juli 2026" : project.period

  return (
    <section className="section-shell">
      <div className="site-container">
        <SectionHeading number="01" title="Gerade im Fokus" />
        <div className="mt-5 grid gap-8 md:grid-cols-[minmax(0,28rem)_1fr]">
          <div>
            <h3 className="font-serif text-4xl tracking-[-0.035em]">
              {project.title}
            </h3>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
              {summary}
            </p>
            <p className="meta mt-5">
              {period} · {getProjectStatusLabel(project.status)}
            </p>
            <div className="mt-6">
              <ArrowLink href={`/work/${project.slug}`} tone="accent">
                Zum aktuellen Stand
              </ArrowLink>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="hidden border-l border-border md:block"
          />
        </div>
      </div>
    </section>
  )
}
