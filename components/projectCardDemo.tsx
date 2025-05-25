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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Project Card Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Minimalistisches Design im Portrait-Format für den zukünftigen Card Slider
          </p>
        </div>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Active Card */}
          <div className="flex flex-col items-center space-y-3">
            <ProjectCard 
              project={demoProject} 
              isActive={true}
            />
            <span className="text-sm text-muted-foreground">Active State</span>
          </div>
          
          {/* Inactive Card (for comparison) */}
          <div className="flex flex-col items-center space-y-3">
            <ProjectCard 
              project={{
                ...demoProject,
                title: "Pinder GmbH Webseite",
                summary: "Eine benutzerfreundliche Webseite für die Pinder Veranstaltungstechnik, die die umfassenden Dienstleistungen professionell und übersichtlich darstellt.",
                image: "/images/projects/pinder-gmbh-webseite.jpeg",
                slug: "pinder-gmbh-webseite",
                tags: ["HTML", "CSS", "JavaScript"],
                publishedAt: "2024-10-10"
              }} 
              isActive={false}
            />
            <span className="text-sm text-muted-foreground">Inactive State</span>
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
            <span className="text-sm text-muted-foreground">Active State</span>
          </div>
        </div>

        {/* Single Card Showcase */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Single Card Showcase
          </h2>
          <div className="flex justify-center">
            <ProjectCard 
              project={{
                ...demoProject,
                title: "Pinder Elektrotechnik",
                summary: "Eine klar strukturierte Webseite, die das breite Leistungsspektrum der Pinder Elektrotechnik verständlich und professionell präsentiert.",
                image: "/images/projects/pinder-elektrotechnik-webseite.jpeg",
                slug: "pinder-elektrotechnik-webseite",
                tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
                publishedAt: "2024-10-09"
              }} 
              isActive={true}
              className="w-80"
            />
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-card/50 rounded-2xl p-8 border border-border/50">
          <h3 className="text-xl font-semibold text-foreground mb-4">Design Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Visual Design</h4>
              <ul className="space-y-1">
                <li>• Portrait-Format (3:4 Seitenverhältnis)</li>
                <li>• Gradient-Overlay für Textlesbarkeit</li>
                <li>• Backdrop-Blur für moderne Ästhetik</li>
                <li>• Konsistente Border-Radius (3xl)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Interaktionen</h4>
              <ul className="space-y-1">
                <li>• Hover-Animationen mit Framer Motion</li>
                <li>• Scale-Effekte für aktive/inaktive States</li>
                <li>• Info-Panel erscheint bei Hover</li>
                <li>• Smooth Transitions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Design System</h4>
              <ul className="space-y-1">
                <li>• Verwendet deine existierenden CSS-Variablen</li>
                <li>• Light/Dark Mode Support</li>
                <li>• Badge-Komponente für Tags</li>
                <li>• Shadcn/ui Design-Sprache</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Datenstruktur</h4>
              <ul className="space-y-1">
                <li>• Nutzt dein ProjectMetadata Interface</li>
                <li>• Automatische Datumsformatierung</li>
                <li>• Tag-Limitierung für sauberes Layout</li>
                <li>• Fallback für fehlende Bilder</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            💡 Hover über die Karten für Interaktionseffekte • Ready für Card Slider Integration
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardDemo