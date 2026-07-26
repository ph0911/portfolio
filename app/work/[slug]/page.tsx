import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { LogList } from "@/components/log-list"
import { MdxContent } from "@/components/mdx-content"
import { PageIntro } from "@/components/page-intro"
import { ProjectMark } from "@/components/project-mark"
import {
  getLogEntriesForProject,
  getProjectBySlug,
  getProjects,
} from "@/lib/content"
import { getProjectStatusLabel } from "@/lib/presentation"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getProjects().map(project => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const entries = getLogEntriesForProject(project.slug)
  const projects = getProjects()

  return (
    <>
      <PageIntro
        backHref="/work"
        backLabel="Alle Projekte"
        description={project.summary}
        eyebrow={`${getProjectStatusLabel(project.status)} · ${project.period}`}
        title={project.title}
      />

      <section className="section-shell">
        <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(24rem,1.25fr)] lg:items-start">
          <div className="space-y-8">
            <ProjectMark mark={project.mark} title={project.title} />
            <dl className="grid gap-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <dt className="meta">Rolle</dt>
                <dd className="mt-2">{project.role}</dd>
              </div>
              <div>
                <dt className="meta">Stack</dt>
                <dd className="mt-2 leading-relaxed">
                  {project.stack.join(" · ")}
                </dd>
              </div>
            </dl>
            {project.links?.length ? (
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {project.links.map(link => (
                  <li key={link.href}>
                    <Link
                      className="underlined-link text-accent"
                      href={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <article className="prose prose-lg prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.025em] prose-p:text-muted-foreground">
            <MdxContent source={project.body} />
          </article>
        </div>
      </section>

      {entries.length ? (
        <section className="section-shell">
          <div className="site-container">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="meta text-accent">Dev Log</p>
                <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em]">
                  Entscheidungen &amp; Fortschritt
                </h2>
              </div>
              <Link className="underlined-link" href="/log">
                Alle Updates <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-8">
              <LogList entries={entries} projects={projects} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
