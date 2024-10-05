/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPosts } from '@/lib/posts'
import PostsWithSearch from '@/components/posts-with-search'
import Link from 'next/link'
import { IconChevronLeft } from '@tabler/icons-react'

export default async function PostsPage() {
  const posts = await getPosts()

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
        <h1 className='title mb-12'>Blog</h1>

        <PostsWithSearch posts={posts} />
      </div> 

    </section>
  )
}