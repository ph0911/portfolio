'use client'

import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface MobileNavigationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navItems = [
  {
    href: '/profil',
    label: 'Profil',
  },
  {
    href: '/projects',
    label: 'Projekte',
  },
  {
    href: '/posts',
    label: 'Blog',
  },
  {
    href: 'mailto:info@pascalheue.dev?subject=Kontakt%20Anfrage%20Website&body=Hey%2C%20',
    label: 'Kontakt',
  },
]

export default function MobileNavigation({ open, setOpen }: MobileNavigationProps) {
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[min(84vw,21rem)] overflow-hidden border-r border-foreground/10 bg-background/90 px-6 pb-7 pt-8 shadow-2xl backdrop-blur-xl dark:border-white/10 [&>button]:right-6 [&>button]:top-7 [&>button]:rounded-full [&>button]:border [&>button]:border-foreground/10 [&>button]:bg-background/80 [&>button]:p-2 [&>button]:opacity-100 [&>button]:shadow-sm"
        >
          <div className="flex h-full min-w-0 flex-col">
            <div className="pr-16">
              <SheetTitle className="font-serif text-3xl font-medium leading-none tracking-wide">
                Wohin?
              </SheetTitle>
              <SheetDescription className="sr-only">
                Mobile Navigation mit Links zu Profil, Projekten, Blog und Kontakt.
              </SheetDescription>
            </div>

            <nav className="mt-10 flex flex-col" aria-label="Mobile Navigation">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 border-b border-foreground/10 py-3 text-left transition-colors hover:border-foreground/25 dark:border-white/10 dark:hover:border-white/25"
                >
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-5">
                      <span className="font-serif text-lg text-muted-foreground transition-colors group-hover:text-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xl font-normal leading-none text-foreground">
                        {item.label}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
