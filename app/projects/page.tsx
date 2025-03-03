import RecentProjects from '@/components/recent-projects'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { IconChevronLeft } from '@tabler/icons-react'
import Image from 'next/image'
import { ProjectPreload } from '@/components/preload'

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

        <h2 className='subtitle mb-4'>Weitere Projekte</h2>
        <ul className='flex flex-col gap-8'>
          {olderProjects.map(project => (
            <li key={project.slug}>
              <ProjectPreload slug={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className='flex items-center gap-4'
              >
                <div className='flex-shrink-0 hidden md:block'>
                  <Image
                    src={project.image || '/default-avatar.png'}
                    alt={`Avatar for ${project.title}`}
                    className='w-full h-full object-cover rounded-2xl aspect-[1/1]'
                    width={60}
                    height={60}
                  />
                </div>
                <div className='flex-grow min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                  <div className='max-w-lg'>
                    <p className='text-lg font-semibold truncate'>{project.title}</p>
                    <p className='mt-1 line-clamp-2 text-sm font-light text-muted-foreground'>
                      {project.summary}
                    </p>
                  </div>
                  {project.publishedAt && (
                    <p className='mt-1 text-sm font-light sm:mt-0 sm:ml-4 whitespace-nowrap'>
                      {formatDate(project.publishedAt)}
                    </p>
                  )}
                </div>
              </Link>
              </ProjectPreload>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}