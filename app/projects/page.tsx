import RecentProjects from '@/components/recent-projects'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { IconChevronLeft } from '@tabler/icons-react'

export default async function ProjectsPage() {
  const allProjects = await getProjects()
  const olderProjects = allProjects.slice(4)

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
      <Link
          href='/'
          className='mb-4 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <IconChevronLeft className='h-5 w-5' />
          <span>Home</span>
        </Link>

        <RecentProjects showAllProjectsLink={false} />

        <h2 className='subtitle mb-4'>Ältere Projekte</h2>
        <ul className='flex flex-col gap-8'>
          {olderProjects.map(project => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className='flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row'
              >
                <div className='max-w-lg'>
                  <h3 className='text-lg font-semibold'>{project.title}</h3>
                  <p className='mt-1 line-clamp-2 text-sm text-muted-foreground'>
                    {project.summary}
                  </p>
                </div>
                {project.publishedAt && (
                  <p className='mt-1 text-sm font-light whitespace-nowrap'>
                    {formatDate(project.publishedAt)}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}