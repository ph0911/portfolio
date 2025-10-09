
import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import DesktopProjectCards from '../projects/desktopProjectCards'
import MobileProjectCards from '../projects/mobileProjectCards'

export default async function RecentProjects({ showAllProjectsLink = true }) {

  return (
    <section className='pb-14'>
      <div>
        <h2 className='title mb-14'>Featured Work</h2>
        <div className='mb-10 md:mb-14'>
          {/* Desktop Version */}
          <div className="hidden md:block">
            <DesktopProjectCards />
          </div>
          
          {/* Mobile Version */}
          <div className="block md:hidden">
            <MobileProjectCards 
              sensitivity={150}
              sendToBackOnClick={false}
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