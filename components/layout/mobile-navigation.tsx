'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Newspaper, BriefcaseBusiness, Palette } from 'lucide-react'

interface MobileNavigationProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navigationItems = [
  { href: '/projects', label: 'Projekte', icon: BriefcaseBusiness },
  { href: '/posts', label: 'Blog', icon: Newspaper },
  { href: 'mailto:info@pascalheue.dev?subject=Kontakt%20Anfrage%20Website&body=Hey%2C%20', label: 'Kontakt', icon: Mail },
]

export default function MobileNavigation({ open, setOpen }: MobileNavigationProps) {
  const pathname = usePathname()

  return (
    <div className="md:hidden pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-sm rounded-3xl border border-white/10 bg-background/75 p-2 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav-links"
            className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-foreground/5 text-foreground transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            <Palette className="size-5 transition group-hover:scale-105" />
            <span className="sr-only">Navigation ein- oder ausklappen</span>
          </button>

          <div
            id="mobile-nav-links"
            className={`grid overflow-hidden transition-all duration-300 ${open ? 'max-h-56 opacity-100' : 'max-h-12 opacity-95'}`}
          >
            <div className={`grid gap-2 ${open ? 'grid-cols-1' : 'grid-cols-3'}`}>
              {navigationItems.map((item) => {
                const isActive = item.href.startsWith('/') && pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                      isActive
                        ? 'border-yellow-400/50 bg-yellow-400/10 text-foreground'
                        : 'border-white/10 bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground'
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className={open ? 'inline' : 'sr-only'}>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
