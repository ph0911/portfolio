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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isActive = true, 
  className 
}) => {
  const {
    title,
    image,
    slug,
    tags,
    publishedAt, // Added publishedAt
  } = project
  
  // Date formatting
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' }) 
    : null;

  return (
    <motion.div
      className={cn(
        "relative w-full max-w-xs aspect-[3/4] mx-auto",
        "rounded-3xl overflow-hidden shadow-xl group cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.65, // Stronger opacity difference
        scale: isActive ? 1 : 0.9,   // More noticeable scale difference
        y: 0 
      }}
      whileHover={{ 
        scale: isActive ? 1.03 : 0.92, // Subtle hover scale
        transition: { duration: 0.2 }
      }}
      transition={{
        type: "spring", 
        stiffness: 260, 
        damping: 25,
      }}
    >
      <Link href={`/projects/${slug}`} className="block w-full h-full">
        {/* Top Information Bar */}
        <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center text-white/80 text-xs z-20">
          {formattedDate && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
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
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            priority={isActive}
          />
        )}

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0  pointer-events-none" />
        
        {/* Content Container: Positioned at the bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white z-10">
          <span className="block text-[10px] uppercase font-semibold tracking-[0.1em] text-white/70 mb-2">
            Dev, Design
          </span>
          <h3 className="text-xl font-semibold text-white leading-tight line-clamp-2 break-words">
            {title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {tags && tags.length > 0 ? (
              <>
                <Badge variant="glass">{tags[0]}</Badge>
                {tags.length > 1 && (
                  <Badge variant="glass">{tags[1]}</Badge>
                )}
                {tags.length > 2 && (
                  <Badge variant="glass">+{tags.length - 2}</Badge>
                )}
              </>
            ) : (
              <Badge variant="glass">View Project</Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard