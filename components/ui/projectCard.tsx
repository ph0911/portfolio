'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
  } = project

  const primaryTag = tags && tags.length > 0 ? tags[0] : null;
  const secondaryInfo = tags && tags.length > 1 ? tags[1] : 'View Project';

  return (
    <motion.div
      className={cn(
        "relative w-full max-w-sm aspect-[3/4] mx-auto", // Aspect ratio for portrait card
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
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        
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
          <div className="mt-3">
            <span className="inline-block bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
              {secondaryInfo}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard