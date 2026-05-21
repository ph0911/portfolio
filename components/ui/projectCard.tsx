'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react' // Using Calendar icon like in slug pages
import { cn } from '@/lib/utils'
import { ProjectMetadata } from '@/lib/projects'
import { Badge } from './badge'

interface ProjectCardProps {
  project: ProjectMetadata
  isActive?: boolean
  className?: string
  variant?: 'default' | 'stack'
  enableNavigation?: boolean
}

export default function ProjectCard({ 
  project, 
  isActive = true, 
  className,
  variant = 'default',
  enableNavigation = true
}: ProjectCardProps) {
  const {
    title,
    image,
    slug,
    tags,
    publishedAt, // Added publishedAt
  } = project
  
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' }) 
    : null;

  // Stack variant optimizations
  const isStackVariant = variant === 'stack';

  const cardContent = (
    <>
      {/* Top Information Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white/80 text-xs z-20">
        {formattedDate && (
          <div className="flex items-center gap-1">
            <Calendar size={isStackVariant ? 12 : 14} />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt={title || 'Project image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          priority={isActive}
        />
      )}

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      
      {/* Content Container: Positioned at the bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white z-10">
        <span className="block text-[9px] uppercase font-semibold tracking-[0.1em] text-white/70 mb-2">
          Dev, Design
        </span>
        <h3 className={cn(
          "font-semibold text-white leading-tight line-clamp-2 break-words",
          isStackVariant ? "text-lg mb-3" : "text-xl"
        )}>
          {title}
        </h3>
        <div className={cn(
          "flex flex-wrap items-center",
          isStackVariant ? "gap-1.5 mt-0" : "gap-2 mt-3"
        )}>
          {tags && tags.length > 0 ? (
            <>
              <Badge variant="glass" size={isStackVariant ? "sm" : "default"}>{tags[0]}</Badge>
              {tags.length > 1 && (
                <Badge variant="glass" size={isStackVariant ? "sm" : "default"}>{tags[1]}</Badge>
              )}
              {tags.length > 2 && (
                <Badge variant="glass" size={isStackVariant ? "sm" : "default"}>+{tags.length - 2}</Badge>
              )}
            </>
          ) : (
            <Badge variant="glass" size={isStackVariant ? "sm" : "default"}>View Project</Badge>
          )}
        </div>
      </div>

      {/* Navigation overlay for stack variant */}
      {isStackVariant && enableNavigation && isActive && (
        <Link 
          href={`/projects/${slug}`} 
          className="absolute inset-0 z-30"
          aria-label={`View ${title} project`}
        />
      )}
    </>
  );

  if (isStackVariant) {
    return (
      <div className={cn("relative w-full h-full rounded-3xl overflow-hidden group", className)}>
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative w-full max-w-xs aspect-[3/4] mx-auto",
        "rounded-3xl overflow-hidden shadow-xl group cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.65,
        scale: isActive ? 1 : 0.9,
        y: 0 
      }}
      whileHover={{ 
        scale: isActive ? 1.03 : 0.92,
        transition: { duration: 0.2 }
      }}
      transition={{
        type: "spring", 
        stiffness: 260, 
        damping: 25,
      }}
    >
      <Link href={`/projects/${slug}`} className="relative block w-full h-full">
        {cardContent}
      </Link>
    </motion.div>
  )
}
