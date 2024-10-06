'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

import Link from 'next/link'


interface MobileNavigationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ open, setOpen }) => {
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        
        <SheetContent
          side="left"
          className="w-10 pt-16 bg-gray-100 dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 backdrop-blur-sm border-r border-r-white/10 dark:border-r-white/10"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <nav className="flex flex-col h-full justify-end items-center pb-7 space-y-10">
            <Link href="mailto:info@pascalheue.dev?subject=Kontakt%20Anfrage%20Website&body=Hey%2C%20" className="-rotate-90 text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Kontakt</Link>
            <Link href="/posts" className="-rotate-90 text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Blog</Link>
            <Link href="/projects" className="-rotate-90 text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Projekte</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavigation