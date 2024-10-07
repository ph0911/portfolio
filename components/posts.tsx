import Link from 'next/link'

import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

export default function Posts({ posts }: { posts: PostMetadata[] }) {
  return (
    <ul className='flex flex-col gap-8'>
      {posts.map(post => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className='flex items-center gap-4'
          >
            <div className='flex-shrink-0 hidden md:block'>
              <Image
                src={post.image || '/default-avatar.png'} // austauschen
                alt={`Avatar for ${post.title}`}
                className='w-full h-full object-cover rounded-2xl aspect-[1/1]'
                width={60}
                height={60}
              />
            </div>
            <div className='flex-grow min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <div className='max-w-lg'>
                <p className='text-lg font-semibold truncate'>{post.title}</p>
                <p className='mt-1 line-clamp-2 text-sm font-light text-muted-foreground'>
                  {post.summary}
                </p>
              </div>
              {post.publishedAt && (
                <p className='mt-1 text-sm font-light sm:mt-0 sm:ml-4 whitespace-nowrap'>
                  {formatDate(post.publishedAt)}
                </p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}