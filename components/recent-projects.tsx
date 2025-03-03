import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import { ProjectPreload } from './preload'

export default async function RecentProjects({ showAllProjectsLink = true }) {
  const projects = await getProjects(4)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Featured Work</h2>
        <BentoGrid>
          {projects.map((project, index) => (
            <ProjectPreload slug={project.slug}>
            <BentoGridItem
              key={project.slug}
              link={`/projects/${project.slug}`}
              title={project.title}
              description={project.summary}
              image={project.image || '/placeholder-image.jpg'}
              className={index === 0 || index === 3 ? "sm:col-span-2" : ""}
              tags={project.tags}
            />
            </ProjectPreload>
          ))}
        </BentoGrid>
        {showAllProjectsLink && (
          <Link
            href='/projects'
            className='font-light mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground tracking-wide'
          >
            <Briefcase size={16} className="animate-pulse" />
            <span>alle Projekte</span>
          </Link>
        )}
      </div>
    </section>
  )
}