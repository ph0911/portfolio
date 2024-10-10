/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'
import Link from 'next/link'

const webDevSkills = [
  {
    title: "HTML5",
    content: "HTML5 ist die neueste Version der Hypertext Markup Language für die Strukturierung von Webinhalten."
  },
  {
    title: "CSS3",
    content: "CSS3 ermöglicht die Gestaltung und das Layout von Webseiten mit fortgeschrittenen Funktionen wie Animationen und Flexbox."
  },
  {
    title: "JavaScript",
    content: "JavaScript ist eine vielseitige Programmiersprache, die das Verhalten und die Interaktivität von Webseiten steuert."
  },
  {
    title: "React",
    content: "React ist eine deklarative, effiziente und flexible JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen."
  },
  {
    title: "Next.js",
    content: "Next.js bietet die beste Entwicklererfahrung für das Erstellen von statischen und serverseitig gerenderten React-Anwendungen."
  },
  {
    title: "Tailwind CSS",
    content: "Tailwind CSS ist ein stark anpassbares, niedrigschwelliges CSS-Framework für die schnelle Erstellung von benutzerdefinierten Designs."
  },
  {
    title: "Bootstrap",
    content: "Bootstrap ist ein beliebtes CSS-Framework, das vorgefertigte Designkomponenten und responsive Grid-Systeme bietet."
  },
  {
    title: "TypeScript",
    content: "TypeScript ist eine streng typisierte Programmiersprache, die auf JavaScript aufbaut und Fehler bereits zur Entwicklungszeit erkennt."
  },
  {
    title: "Angular",
    content: "Angular ist ein Framework zur Erstellung von leistungsfähigen und dynamischen Webanwendungen mit TypeScript."
  },
  {
    title: "Ionic",
    content: "Ionic ist ein Framework für die Erstellung von plattformübergreifenden mobilen Apps mit Webtechnologien."
  },
  {
    title: "PHP",
    content: "PHP ist eine serverseitige Skriptsprache, die besonders für die Webentwicklung geeignet ist."
  },
  {
    title: "SQL",
    content: "SQL ist eine Sprache zur Verwaltung und Abfrage von Datenbanken."
  },
  {
    title: "SQL",
    content: "SQL ist eine Sprache zur Verwaltung und Abfrage von Datenbanken."
  }
]

const designSkills = [

  {
    title: "Photoshop",
    content: "Adobe Photoshop ist der Industriestandard für Bildbearbeitung und Design."
  },
  {
    title: "Illustrator",
    content: "Adobe Illustrator ist ein Vektorgrafik-Editor, der ideal für die Erstellung von Logos und Illustrationen ist."
  },
  {
    title: "InDesign",
    content: "Adobe InDesign ist eine Anwendung für Layout und Desktop-Publishing, besonders nützlich für den Druck von Magazinen und Broschüren."
  },
  {
    title: "Adobe XD",
    content: "Adobe XD ist ein Tool für die Erstellung und das Prototyping von Benutzeroberflächen und Interaktionen."
  },
  {
    title: "Lightroom",
    content: "Adobe Lightroom ist eine Software zur professionellen Verwaltung und Bearbeitung von Fotos."
  },
  {
    title: "Premiere Pro",
    content: "Adobe Premiere Pro ist eine professionelle Software zur Videobearbeitung."
  },
  {
    title: "Davinci Resolve",
    content: "DaVinci Resolve ist eine professionelle Software für Farbkorrektur, Schnitt und Videobearbeitung."
  },
  {
    title: "Figma",
    content: "Figma ist ein cloudbasiertes Design-Tool für die Zusammenarbeit im Team und die Erstellung von UI/UX-Designs."
  }
]

export default function SkillsSection() {

  return (
    <div className="pb-14 md:pb-24">
      <h2 className='hidden md:block title pb-8'>Skills</h2>
      <InfiniteMovingCards
        items={webDevSkills}
        direction="left"
        speed="slow"
      />
      <InfiniteMovingCards
        items={designSkills}
        direction="right"
        speed="slow"
      />

      {/* <Link
        href='/skills'
        className='mt-4 md:mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
      >
        <span>Alle Skills</span>
      </Link> */}
    </div>
  )
}