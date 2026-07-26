import Link from "next/link"

import type { Project } from "@/lib/content"
import { getProjectStatusLabel } from "@/lib/presentation"

import { ProjectMark } from "./project-mark"
import { ArrowLink } from "./ui/arrow-link"

type ProjectListProps = {
  projects: Project[]
  expandedCount?: number
  headingLevel?: 2 | 3
}

export function ProjectList({
  projects,
  expandedCount = 2,
  headingLevel = 3,
}: ProjectListProps) {
  const expanded = projects.slice(0, expandedCount)
  const compact = projects.slice(expandedCount)
  const ProjectHeading = headingLevel === 2 ? "h2" : "h3"

  return (
    <div className="mt-12">
      {expanded.map((project, index) => (
        <article
          className="grid gap-8 border-b border-border py-10 first:pt-0 lg:grid-cols-[minmax(17rem,0.8fr)_minmax(22rem,1.1fr)_auto] lg:items-center"
          key={project.slug}
        >
          <div>
            <p className="meta text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <ProjectHeading className="mt-3 font-serif text-5xl tracking-[-0.04em]">
              <Link
                className="hover:text-accent"
                href={`/work/${project.slug}`}
              >
                {project.title}
              </Link>
            </ProjectHeading>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <p className="meta mt-6">{project.stack.join(" · ")}</p>
            <p className="meta mt-3">{getProjectStatusLabel(project.status)}</p>
          </div>
          <ProjectMark mark={project.mark} title={project.title} />
          <div className="lg:justify-self-end">
            <ArrowLink href={`/work/${project.slug}`} tone="accent">
              Case ansehen
            </ArrowLink>
          </div>
        </article>
      ))}

      {compact.length ? (
        <div>
          {compact.map((project, index) => (
            <article
              className="grid gap-3 border-b border-border py-6 md:grid-cols-[3rem_12rem_1fr_14rem_auto] md:items-center"
              key={project.slug}
            >
              <p className="meta text-accent">
                {String(index + expandedCount + 1).padStart(2, "0")}
              </p>
              <ProjectHeading className="font-serif text-3xl tracking-[-0.03em]">
                <Link
                  className="transition-colors hover:text-accent"
                  href={`/work/${project.slug}`}
                >
                  {project.title}
                </Link>
              </ProjectHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <p className="meta">{project.stack.join(" · ")}</p>
              <ArrowLink href={`/work/${project.slug}`}>Öffnen</ArrowLink>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  )
}
