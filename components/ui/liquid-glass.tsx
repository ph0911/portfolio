'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'intense' | 'subtle' | 'dynamic'
  enableSpecularHighlight?: boolean
  enableHover?: boolean
  adaptiveColors?: boolean
}

export default function LiquidGlass({
  children,
  className = '',
  variant = 'default',
  enableSpecularHighlight = true,
  enableHover = true,
  adaptiveColors = false,
}: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  // Mouse tracking for specular highlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Adaptive background color state
  const [adaptiveColor, setAdaptiveColor] = useState('rgba(255,255,255,0.28)')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced specular highlight with better performance
  const gradient = useTransform(
    [mouseX, mouseY],
    ([x, y]) => 
      enableSpecularHighlight 
        ? `radial-gradient(600px circle at ${x}px ${y}px, ${adaptiveColor} 0%, rgba(255,255,255,0) 60%)`
        : 'none'
  )

  useEffect(() => {
    if (!enableSpecularHighlight || !mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      mouseX.set(x)
      mouseY.set(y)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY, enableSpecularHighlight, mounted])

  // Adaptive color sampling (simplified version)
  useEffect(() => {
    if (!adaptiveColors || !mounted) return
    
    const sampleBackgroundColor = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setAdaptiveColor(
        isDark 
          ? 'rgba(255,255,255,0.15)' 
          : 'rgba(255,255,255,0.35)'
      )
    }
    
    sampleBackgroundColor()
    
    // Listen for theme changes
    const observer = new MutationObserver(sampleBackgroundColor)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [adaptiveColors, mounted])

  const getVariantStyles = () => {
    const baseStyles = "relative overflow-hidden border backdrop-blur-xl backdrop-saturate-150"
    
    switch (variant) {
      case 'intense':
        return cn(
          baseStyles,
          "bg-white/15 dark:bg-white/10 backdrop-blur-2xl backdrop-saturate-200",
          "border-white/20 dark:border-white/15",
          "shadow-2xl shadow-black/10 dark:shadow-black/30"
        )
      case 'subtle':
        return cn(
          baseStyles,
          "bg-white/5 dark:bg-white/5 backdrop-blur-md backdrop-saturate-110",
          "border-white/10 dark:border-white/8",
          "shadow-lg shadow-black/5 dark:shadow-black/20"
        )
      case 'dynamic':
        return cn(
          baseStyles,
          "bg-white/12 dark:bg-white/8 backdrop-blur-xl backdrop-saturate-180",
          "border-white/15 dark:border-white/12",
          "shadow-xl shadow-black/8 dark:shadow-black/25"
        )
      default:
        return cn(
          baseStyles,
          "bg-white/10 dark:bg-white/8 backdrop-blur-xl backdrop-saturate-150",
          "border-white/15 dark:border-white/12",
          "shadow-xl shadow-black/8 dark:shadow-black/25"
        )
    }
  }

  const motionProps = enableHover 
    ? {
        whileHover: { 
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" }
        },
        whileTap: { scale: 0.98 }
      }
    : {}

  if (!mounted) {
    return (
      <div className={cn(getVariantStyles(), className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ 
        backgroundImage: enableSpecularHighlight ? gradient : undefined,
      }}
      className={cn(
        getVariantStyles(),
        "transition-all duration-300 ease-out",
        className
      )}
      {...motionProps}
    >
      {/* Enhanced glass edge glow */}
      <div className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      
      {/* Content with proper layering */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

// Preset components for common use cases
export function LiquidGlassCard({ children, className, ...props }: LiquidGlassProps) {
  return (
    <LiquidGlass 
      className={cn("rounded-2xl p-6", className)} 
      {...props}
    >
      {children}
    </LiquidGlass>
  )
}

export function LiquidGlassButton({ children, className, ...props }: LiquidGlassProps) {
  return (
    <LiquidGlass 
      className={cn("rounded-xl px-4 py-2 cursor-pointer", className)}
      variant="subtle"
      {...props}
    >
      {children}
    </LiquidGlass>
  )
}

export function LiquidGlassNavigation({ children, className, ...props }: LiquidGlassProps) {
  return (
    <LiquidGlass 
      className={cn("rounded-full", className)}
      variant="dynamic"
      adaptiveColors={true}
      {...props}
    >
      {children}
    </LiquidGlass>
  )
}
