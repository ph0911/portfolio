'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import Link from 'next/link'
import LiquidGlass from '@/components/ui/liquid-glass'
import { motion } from 'framer-motion'

interface MobileNavigationEnhancedProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navigationItems = [
  { href: "/contact", label: "Kontakt" },
  { href: "/posts", label: "Blog" },
  { href: "/projects", label: "Projekte" },
]

export default function MobileNavigationEnhanced({ open, setOpen }: MobileNavigationEnhancedProps) {
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-20 pt-16 p-0 border-none"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          
          {/* Enhanced glass background */}
          <LiquidGlass 
            className="h-full w-full"
            variant="dynamic"
            enableSpecularHighlight={true}
            adaptiveColors={true}
          >
            <nav className="flex flex-col h-full justify-end items-center pb-7 space-y-10 p-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: open ? 1 : 0, 
                    x: open ? 0 : -20 
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="w-full flex justify-center"
                >
                  <Link 
                    href={item.href} 
                    onClick={() => setOpen(false)}
                    className="group relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="-rotate-90 text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {item.label}
                    </motion.div>
                    
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 -rotate-90"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-full h-0.5 bg-blue-500 rounded-full transform translate-y-6" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              
              {/* Enhanced glass decoration at bottom */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: open ? 1 : 0, 
                  scale: open ? 1 : 0.8 
                }}
                transition={{ 
                  delay: 0.4,
                  duration: 0.3,
                  ease: "easeOut"
                }}
                className="mt-8"
              >
                <LiquidGlass 
                  className="w-8 h-8 rounded-full"
                  variant="intense"
                  enableSpecularHighlight={true}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
                  </div>
                </LiquidGlass>
              </motion.div>
            </nav>
          </LiquidGlass>
        </SheetContent>
      </Sheet>
    </div>
  )
}
