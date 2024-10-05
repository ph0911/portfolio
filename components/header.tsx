import  ThemeToggle  from '@/components/theme-toggle'
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';

import Link from 'next/link';
import { JSX, SVGProps } from 'react'



const logo = {
  name: 'Logo',
  href: '/',
  icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
      fill='currentColor'
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3000 3000"
      {...props}
    >
      <g id="Ebene_1">
        <g>
          <path d="M1505.3,1682.8h111.6s0-223,0-223h-111.6c-61.5,0-111.4,49.9-111.4,111.4h0c0,61.7,49.9,111.6,111.4,111.6Z" />
          <rect x="941.9" y="212.8" width="245" height="239" />
          <path d="M622.1,2850.8h143.8V212.8h-143.8c-55.9,0-101.2,45.3-101.2,101.2v2435.6c0,55.9,45.3,101.2,101.2,101.2Z" />
          <path d="M1393.9,876.3c359.8-1.8,580.6,55.2,580.6,289.7s-40.2,196.6-108,238.5l135.9,176.7c122.7-76.3,201.6-204,201.6-412.3,0-308-270.7-528.9-764.6-514.1h-497.5v2196h245V875.8h207v.5Z" />
          <path d="M1393.9,2850.8h112.4c61.1,0,110.6-49.5,110.6-110.6h0c0-62.2-50.3-112.4-112.3-112.4h-110.7v223Z" />
          <path d="M2638.3,1151c-16-517.2-404.1-951.3-1243.4-936.9v237.7c599.1-23.8,1011.8,306,1012,734.1.2,479.8-465,717.9-894.4,684.7-63.4-4.9-117.5,45.2-117.5,108.8h0c0,56.4,43.1,103.5,99.3,108.7,537.1,49.7,1165.2-256.6,1144.2-937Z" />
        </g>
      </g>
    </svg>
  )
}



export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm">
      <nav className="container flex max-w-3xl items-center justify-between">
        <div className="md:hidden">
          <button className="text-foreground" aria-label="Toggle navigation">
            <IconLayoutSidebarLeftExpand className="size-5" />
          </button>
        </div>
        <div className="hidden md:block">
          <a key={logo.name} href={logo.href} className='text-foreground'>
            <span className='sr-only'>{logo.name}</span>
            <logo.icon aria-hidden='true' className='h-8 w-8' />
          </a>
        </div>
        <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
          <a key={logo.name} href={logo.href} className='text-foreground'>
            <span className='sr-only'>{logo.name}</span>
            <logo.icon aria-hidden='true' className='h-8 w-8' />
          </a>
        </div>
        <ul className="hidden md:flex items-center gap-6 text-sm font-light text-muted-foreground sm:gap-10">
          <li className="transition-colors hover:text-foreground">
            <Link href="/projects">Projekte</Link>
          </li>
          <li className="transition-colors hover:text-foreground">
            <Link href="/posts">Blog</Link>
          </li>
          <li className="transition-colors hover:text-foreground">
            <Link href="/contact">Kontakt</Link>
          </li>
        </ul>
        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}