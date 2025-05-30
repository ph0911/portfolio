/* eslint-disable @typescript-eslint/no-unused-vars */
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import DesktopProjectCards from '../projects/desktopProjectCards'


export default async function RecentProjects({ showAllProjectsLink = true }) {
  const projects = await getProjects(4)

  return (
    <section className='pb-14'>
      <div>
        <h2 className='title mb-14'>Featured Work</h2>
        <div className='mb-14'>
          <DesktopProjectCards />
        </div>
        {showAllProjectsLink && (
          <Link
            href='/projects'
            className='font-light inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground tracking-wide'
          >
            <Briefcase size={16} className="animate-pulse" />
            <span>alle Projekte</span>
          </Link>
        )}
      </div>
    </section>
  )
}