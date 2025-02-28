import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'
import { FileText } from 'lucide-react'

export default async function RecentPosts() {
  const posts = await getPosts(4)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Latest Notes</h2>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='font-light mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground tracking-wide'
        >
          <FileText size={16} className="animate-pulse" />
          <span>alle Beiträge</span>
        </Link>
      </div>
    </section>
  )
}