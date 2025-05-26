'use client'

import React from 'react'
import ProjectCard from '@/components/ui/projectCard'
import { ProjectMetadata } from '@/lib/projects'

// Demo data using your existing project structure
const demoProject: ProjectMetadata = {
  title: "Minimalistisches Portfolio",
  summary: "Ein dynamisches, minimalistisches Portfolio, das mit MDX, TailwindCSS und Next.js entwickelt wurde. Moderne Technologien kombiniert für ein responsives und benutzerfreundliches Design.",
  image: "/images/projects/minimalistisches-portfolio.png",
  author: "Pascal Heue",
  publishedAt: "2024-10-11",
  slug: "minimalistisches-portfolio",
  tags: ["Next.js", "MDX", "TailwindCSS", "Shadcn/ui", "Aceternity UI"]
}

const ProjectCardDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="title mb-8">
          Project Card Demo
        </h1>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Active Card */}
          <div className="flex flex-col items-center space-y-3">
            <ProjectCard 
              project={demoProject} 
              isActive={true}
            />
          </div>

          {/* Active Card */}
          <div className="flex flex-col items-center space-y-3">
            <ProjectCard 
              project={demoProject} 
              isActive={true}
            />
          </div>
          
          {/* Another Active Card */}
          <div className="flex flex-col items-center space-y-3">
            <ProjectCard 
              project={{
                ...demoProject,
                title: "Corporate Design",
                summary: "Ein vollständiges Corporate Design für verschiedene Geschäftsbereiche des Unternehmens in einem einheitlichen visuellen Stil.",
                image: "/images/projects/pinder-gmbh-corporate-design.png",
                slug: "pinder-gmbh-corporate-design",
                tags: ["Design", "Branding", "Adobe Illustrator", "Adobe InDesign"],
                publishedAt: "2024-09-15"
              }} 
              isActive={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardDemo