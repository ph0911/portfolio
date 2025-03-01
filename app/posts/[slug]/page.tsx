import MDXContent from '@/components/mdx-content'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { ChevronLeft, User, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import ReadingProgress from '@/components/ui/reading-progress'
import ModalWrapper from '@/components/ModalWrapper'


export async function generateStaticParams() {
  const posts = await getPosts()
  const slugs = posts.map(post => ({ slug: post.slug }))

  return slugs
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, image, author, publishedAt, summary } = metadata

  // Content that will be rendered both in modal and normal view
  const PostContent = () => (
    <>
      {image && (
        <div className='relative mb-6 h-60 md:h-96 w-full overflow-hidden shadow-lg rounded-2xl md:rounded-3xl'>
          <Image
            src={image}
            alt={title || ''}
            className='object-cover'
            fill
            priority
          />
        </div>
      )}
      <header>
        <h1 className='text-2xl md:text-3xl font-medium'>{title}</h1>
        <div className="space-y-4">
          
          <div className='mt-4 flex items-stretch gap-3'>
            <div className='block bg-neutral-200 dark:bg-neutral-800 w-1 self-stretch rounded-full'></div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {summary}
            </p>
          </div>
          <p className='mt-2 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-3'>
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
        </div>
      </header>
      <main className='prose prose-sm md:prose-base mt-8 md:mt-16 max-w-full dark:prose-invert'>
        <MDXContent source={content} />
      </main>
    </>
  )

  return (
    <ModalWrapper parentPath="/posts" isActive={true}>
      <section className='pb-16 md:pb-24 pt-4 md:pt-32'>
        <div className='container max-w-3xl'>
          <Link
            href='/posts'
            className='mb-8 md:inline-flex hidden items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
          >
            <ChevronLeft className='h-5 w-5' />
            <span>Blog</span>
          </Link>
          <div className="hidden md:block">
            <ReadingProgress />
          </div>
          
          <PostContent />
        </div>
      </section>
    </ModalWrapper>
  )
}