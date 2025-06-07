/* eslint-disable @typescript-eslint/no-unused-vars */
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { getProjects, getFavoriteProjects } from '@/lib/projects'
import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import DesktopProjectCards from '../projects/desktopProjectCards'
import MobileProjectCards from '../projects/mobileProjectCards'
import StackProjectCards from '../projects/stackProjectCards'

export default async function RecentProjects({ showAllProjectsLink = true }) {
  const projects = await getProjects(4)
  const favoriteProjects = await getFavoriteProjects()

  return (
    <section className='pb-14'>
      <div>
        <h2 className='title mb-14'>Featured Work</h2>
        <div className='mb-14'>
          {/* Desktop Version */}
          <div className="hidden md:block">
            <DesktopProjectCards />
          </div>
          
          {/* Mobile Version */}
          <div className="block md:hidden">
            {/* Original MobileProjectCards for comparison - uncomment to test */}
            {/* <MobileProjectCards projects={favoriteProjects} /> */}
            
            {/* New Stack-based Project Cards - enhanced integration */}
            <StackProjectCards 
              projects={favoriteProjects}
              sensitivity={150}
              sendToBackOnClick={true}
              randomRotation={false}
            />
          </div>
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