'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface MobileNavigationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ open, setOpen }) => {
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="hidden">
          {!open && (  // Bedingung umgekehrt, Button wird nur angezeigt, wenn open=false
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-1 bottom-10 z-[50] h-5 w-5"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
          )}
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-10 pt-16 bg-gray-100 dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 backdrop-blur-sm border-r border-r-white/10 dark:border-r-white/10"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <nav className="flex flex-col h-full justify-end items-center pb-7 space-y-10">
            {/* <Link href="/contact" className="-rotate-90 text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Kontakt</Link> */}
            <Link href="/posts" className="-rotate-90 text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Blog</Link>
            <Link href="/projects" className="-rotate-90 text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Projekte</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavigation