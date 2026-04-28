import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/blog/mdx-content'
import { ChevronLeft, User, Calendar } from 'lucide-react'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import ReadingProgress from '@/components/ui/reading-progress'
import ModalWrapper from '@/components/utility/ModalWrapper'
import { Badge } from '@/components/ui/badge'


export const dynamicParams = false

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))
  return slugs
}

export default async function Project({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) {
    notFound()
  }
  const { metadata, content } = project
  const { title, image, author, publishedAt, summary, tags } = metadata

  const projectContent = (
    <>
      {image && (
        <div className='relative mb-6 h-60 md:h-96 w-full overflow-hidden rounded-2xl md:rounded-3xl'>
          <Image
            src={image}
            alt={title || ''}
            className='object-cover'
            fill
            priority={true}
          />
        </div>
      )}
      <header>
        <h1 className='text-2xl md:text-4xl font-bold tracking-tight'>{title}</h1>
        <div className="space-y-4">
          <p className='mt-4 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-3'>
            <span className="flex items-center gap-1">
              <User size={14} />
              {author}
            </span>
            <span className="inline-block w-1 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full"></span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(publishedAt ?? '')}
            </span>
          </p>
          <div className='flex items-stretch gap-3'>
            <div className='block bg-neutral-200 dark:bg-neutral-800 w-1 self-stretch rounded-full'></div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {summary}
            </p>
          </div>
          
          {/* Tags Section */}
          {tags && tags.length > 0 && (
            <div className="pt-2 overflow-hidden">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    size="sm"
                    className="text-[10px] font-medium flex-shrink-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
      <main className='prose prose-sm md:prose-base mt-8 md:mt-16 max-w-full dark:prose-invert'>
        <MDXContent source={content} />
      </main>
    </>
  )

  return (
    <ModalWrapper parentPath="/projects" isActive={true}>
      <section className='pb-16 md:pb-24 pt-4 md:pt-32'>
        <div className='container max-w-3xl'>
          <Link
            href='/projects'
            className='mb-8 md:inline-flex hidden items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
          >
            <ChevronLeft className='h-5 w-5' />
            <span>Projekte</span>
          </Link>
          <div className="hidden md:block">
            <ReadingProgress />
          </div>
          
          {projectContent}
        </div>
      </section>
    </ModalWrapper>
  )
}
