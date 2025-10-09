import React from 'react'
import ProjectCard from '@/components/ui/projectCard'
import { getFavoriteProjects } from '@/lib/projects'

export default async function DesktopProjectCards() {
  const favoriteProjects = await getFavoriteProjects()

  if (favoriteProjects.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-muted-foreground">Keine Favoriten-Projekte gefunden.</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
      {/* Grid Layout für Desktop */}
      <div className="grid grid-cols-3 gap-5">
        {favoriteProjects.map((project, index) => (
        <div 
          key={project.slug} 
          className={`flex flex-col items-center space-y-3 ${
        index % 3 === 1 && favoriteProjects.length >= 3 ? 
        "transform scale-105 z-[1]" : 
        (index % 3 !== 1 && favoriteProjects.length >= 3 ? 
        "transform scale-95" : "")
          }`}
        >
          <ProjectCard 
        project={project} 
        isActive={true}
          />
        </div>
        ))}
      </div>
      </div>
    </div>
  )
}