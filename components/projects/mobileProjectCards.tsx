'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/ui/projectCard'
import { ProjectMetadata } from '@/lib/projects'

interface MobileProjectCardsProps {
  projects: ProjectMetadata[]
}

const MobileProjectCards: React.FC<MobileProjectCardsProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)

  const minSwipeDistance = 50

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection('next')
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    )
    setTimeout(() => {
      setIsAnimating(false)
      setDirection(null)
    }, 600)
  }, [projects.length, isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection('prev')
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
    setTimeout(() => {
      setIsAnimating(false)
      setDirection(null)
    }, 600)
  }, [projects.length, isAnimating])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide])

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-muted-foreground">Keine Favoriten-Projekte gefunden.</div>
      </div>
    )
  }

  // Get current, next and previous projects for seamless loop
  const currentProject = projects[currentIndex]
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]

  return (
    <div className="w-full relative">
      {/* Card Container */}
      <div 
        className="relative h-auto"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Card Stack Container */}
        <div className="relative w-full">
          {/* Previous Card - Always positioned left, ready for reverse swipe */}
          <motion.div
            className="absolute top-0 z-10"
            style={{ 
              left: 'calc(-67vw - 1rem)', 
              width: 'calc(67vw)' 
            }}
            key={`prev-${currentIndex}`}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ 
              scale: 0.95, 
              opacity: 0.7,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5
            }}
          >
            <ProjectCard 
              project={prevProject} 
              isActive={false}
              className="w-full"
            />
          </motion.div>

          {/* Active Card - Center position */}
          <motion.div
            className="relative z-20"
            style={{ width: 'calc(67vw)' }}
            key={`active-${currentIndex}`}
            initial={direction === 'next' ? 
              { scale: 0.95, opacity: 0.7, x: 'calc(67vw + 1rem)' } : 
              direction === 'prev' ? 
              { scale: 0.95, opacity: 0.7, x: 'calc(-67vw - 1rem)' } :
              { scale: 1, opacity: 1, x: 0 }
            }
            animate={{ 
              scale: 1, 
              opacity: 1, 
              x: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5
            }}
          >
            <ProjectCard 
              project={currentProject} 
              isActive={true}
              className="w-full"
            />
          </motion.div>

          {/* Next Card Preview - Right position */}
          <motion.div
            className="absolute top-0 z-10"
            style={{ 
              left: 'calc(67vw + 1rem)', 
              width: 'calc(67vw)' 
            }}
            key={`next-${currentIndex}`}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ 
              scale: 0.95, 
              opacity: 0.7,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5
            }}
          >
            <ProjectCard 
              project={nextProject} 
              isActive={false}
              className="w-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Page Indicators (Dots) - Centered under the active card */}
      {projects.length > 1 && (
        <div 
          className="flex justify-center mt-8 space-x-3"
          style={{ 
            marginLeft: 0,
            width: 'calc(67vw)',
          }}
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-foreground' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileProjectCards