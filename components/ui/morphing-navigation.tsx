'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import LiquidGlass from './liquid-glass'
import { cn } from '@/lib/utils'

interface MorphingNavigationProps {
  items: { title: string; href: string; icon?: React.ReactNode }[]
  className?: string
  position?: 'top' | 'bottom'
}

export default function MorphingNavigation({ 
  items, 
  className,
  position = 'top' 
}: MorphingNavigationProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform navigation height based on scroll
  const navHeight = useTransform(scrollY, [0, 100], [80, 60])
  const navPadding = useTransform(scrollY, [0, 100], [24, 16])
  const fontSize = useTransform(scrollY, [0, 100], [16, 14])
  const navOpacity = useTransform(scrollY, [0, 50], [0.95, 0.85])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className={cn(
        "fixed z-50 left-1/2 transform -translate-x-1/2",
        position === 'top' ? 'top-4' : 'bottom-4',
        className
      )}>
        <div className="flex items-center gap-6 px-6 py-4 rounded-2xl">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      style={{
        height: navHeight,
        opacity: navOpacity,
      }}
      className={cn(
        "fixed z-50 left-1/2 transform -translate-x-1/2",
        position === 'top' ? 'top-4' : 'bottom-4',
        className
      )}
    >
      <LiquidGlass
        className="h-full rounded-2xl"
        variant="dynamic"
        enableSpecularHighlight={true}
        adaptiveColors={true}
      >
        <motion.div
          style={{
            padding: navPadding,
          }}
          className="flex items-center justify-center gap-6 h-full"
        >
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative"
            >
              <motion.div
                style={{ fontSize }}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon && (
                  <span className="w-4 h-4">{item.icon}</span>
                )}
                <span className="font-medium">{item.title}</span>
              </motion.div>
              
              {/* Active indicator */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </motion.div>
      </LiquidGlass>
    </motion.nav>
  )
}

// Variant for tab-style navigation
export function TabNavigation({ 
  items, 
  activeItem, 
  onItemChange, 
  className 
}: {
  items: { id: string; title: string; icon?: React.ReactNode }[]
  activeItem: string
  onItemChange: (id: string) => void
  className?: string
}) {
  return (
    <LiquidGlass
      className={cn("flex rounded-2xl p-1", className)}
      variant="subtle"
      enableSpecularHighlight={true}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemChange(item.id)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
            "text-gray-600 dark:text-gray-300",
            activeItem === item.id && "text-gray-900 dark:text-gray-100"
          )}
        >
          {/* Active background */}
          {activeItem === item.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-xl"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
              <LiquidGlass
                className="w-full h-full rounded-xl"
                variant="intense"
                enableSpecularHighlight={false}
              >
                <div className="w-full h-full" />
              </LiquidGlass>
            </motion.div>
          )}
          
          <div className="relative z-10 flex items-center gap-2">
            {item.icon && (
              <span className="w-4 h-4">{item.icon}</span>
            )}
            <span className="font-medium">{item.title}</span>
          </div>
        </button>
      ))}
    </LiquidGlass>
  )
}
