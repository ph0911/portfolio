'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { PanelLeft } from 'lucide-react'
import Link from 'next/link'

interface MobileNavigationSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileNavigationSidebar({ 
  open, 
  setOpen
}: MobileNavigationSidebarProps) {
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          variant="sidebar"
          hideCloseButton={true}
          pushContent={true}
          className="w-12 pt-0 px-0 flex flex-col h-screen"
        >
          <div className="w-full h-full flex flex-col">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          
          {/* Header Area - für das Icon */}
          <div className="h-24 flex items-center justify-center">
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-sm hover:bg-muted/50 transition-all duration-300"
              aria-label="Close navigation"
            >
              <PanelLeft className="size-5 sidebar-icon transition-opacity duration-300 text-muted-foreground" style={{ opacity: 1 }} />
            </button>
          </div>

          {/* Navigation Content - wie original */}
          <div className="flex-1 flex flex-col justify-end items-center pb-7 space-y-10">
            <Link 
              href="mailto:info@pascalheue.dev?subject=Kontakt%20Anfrage%20Website&body=Hey%2C%20" 
              className="-rotate-90 text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              Kontakt
            </Link>
            <Link 
              href="/posts" 
              className="-rotate-90 text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/projects" 
              className="-rotate-90 text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              Projekte
            </Link>
          </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
