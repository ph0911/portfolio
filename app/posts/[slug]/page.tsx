import MDXContent from '@/components/mdx-content'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { IconChevronLeft } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { TracingBeam } from '@/components/ui/tracing-beam'

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
    const { title, image, author, publishedAt } = metadata

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/posts'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <IconChevronLeft className='h-5 w-5' />
          <span>Blog</span>
        </Link>
        {image && (
            <div className='relative mb-6 h-96 w-full overflow-hidden rounded-3xl'>
              <Image
                src={image}
                alt={title || ''}
                className='object-cover max-w-3xl'
                fill
              />
            </div>
          )}

        <TracingBeam >
          
          <header>
            <h1 className='title'>{title}</h1>
            <p className='mt-3 text-xs text-muted-foreground'>
              {author} / {formatDate(publishedAt ?? '')}
            </p>
          </header>

          <main className='prose mt-16 max-w-full dark:prose-invert'>
            <MDXContent source={content} />
          </main>
        </TracingBeam>

      </div>
    </section>
  )
}