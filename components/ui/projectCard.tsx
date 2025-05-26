'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Layers, CalendarDays } from 'lucide-react' // Added Layers and CalendarDays
import { cn } from '@/lib/utils'
import { ProjectMetadata } from '@/lib/projects'

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

  const primaryTag = tags && tags.length > 0 ? tags[0] : null;
  
  // Date formatting
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' }) 
    : null;

  const secondaryTags = tags ? tags.slice(1) : [];
  const pillStyle = "inline-block bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors";

  return (
    <motion.div
      className={cn(
        "relative w-full max-w-sm aspect-[3/4] mx-auto",
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
              <CalendarDays size={14} />
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
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            priority={isActive}
          />
        )}

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        
        {/* Content Container: Positioned at the bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white z-10">
          {primaryTag && (
            <span className="block text-xs uppercase font-semibold tracking-wider text-white/80 mb-1">
              {primaryTag}
            </span>
          )}
          <h3 className="text-xl font-semibold text-white leading-tight line-clamp-2 break-words">
            {title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {secondaryTags.length > 0 ? (
              <>
                <span className={pillStyle}>{secondaryTags[0]}</span>
                {secondaryTags.length > 1 && ( // If there's at least a second secondary tag
                  <span className={pillStyle}>
                    {/* Display the second tag or a "+X more" indicator */}
                    {secondaryTags.length === 2 ? secondaryTags[1] : `+${secondaryTags.length - 1} more`}
                  </span>
                )}
              </>
            ) : (
              // If there are no secondary tags, always show "View Project"
              <span className={pillStyle}>View Project</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard