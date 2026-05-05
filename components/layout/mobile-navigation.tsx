'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Newspaper, FolderKanban, ArrowUpRight } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface MobileNavigationProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navItems = [
  {
    href: '/projects',
    label: 'Projekte',
    icon: FolderKanban,
  },
  {
    href: '/posts',
    label: 'Blog',
    icon: Newspaper,
  },
  {
    href: 'mailto:info@pascalheue.dev?subject=Kontakt%20Anfrage%20Website&body=Hey%2C%20',
    label: 'Kontakt',
    icon: Mail,
  },
]

export default function MobileNavigation({ open, setOpen }: MobileNavigationProps) {
  const pathname = usePathname()

  return (
    <div className='md:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side='bottom'
          className='h-auto rounded-t-3xl border-white/15 bg-background/92 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-8 backdrop-blur-xl'
        >
          <SheetTitle className='sr-only'>Navigation Menü</SheetTitle>

          <div className='mx-auto mb-5 h-1.5 w-14 rounded-full bg-muted-foreground/40' />

          <nav className='grid grid-cols-3 gap-2'>
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = href.startsWith('/') && pathname.startsWith(href)

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'group rounded-2xl border p-3 transition-all',
                    'border-white/10 bg-secondary/50 hover:border-primary/40 hover:bg-secondary',
                    isActive && 'border-primary/50 bg-primary/10'
                  )}
                >
                  <div className='mb-2 inline-flex rounded-lg bg-background/70 p-2'>
                    <Icon className='size-4 text-foreground/90' />
                  </div>
                  <p className='text-sm font-medium text-foreground'>{label}</p>
                </Link>
              )
            })}
          </nav>

          <div className='mt-4 rounded-2xl border border-white/10 bg-secondary/30 p-3'>
            <p className='text-xs text-muted-foreground'>Quick Access</p>
            <Link
              href='/'
              onClick={() => setOpen(false)}
              className='mt-2 inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4'
            >
              Startseite
              <ArrowUpRight className='size-3.5' />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
