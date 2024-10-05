/* eslint-disable @typescript-eslint/no-unused-vars */
import Intro from '@/components/intro'
import React from 'react'

import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import { Timeline } from '@/components/ui/timeline'


const dataTimeline = [
  {
    title: "2024",
    content: (
      <div className='prose'>
        <p className="text-neutral-800 dark:text-neutral-200">
          B.Eng. Abschluss in Medientechnik (HTWK Leipzig). Spezialisierung: Frontend-Entwicklung und UX Design.
        </p>
        <p className="text-neutral-800 dark:text-neutral-200">
          Vertiefung: React, Next.js, Angular. Fokus auf responsive Webprojekte.
        </p>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className='prose'>
        <p className="text-neutral-800 dark:text-neutral-200">
          Praxissemester und Nebenjob: Webentwickler und Grafikdesigner in der Eventtechnologie.
        </p>
        <p className="text-neutral-800 dark:text-neutral-200">
          Umsetzung: 4 responsive Websites, Corporate Design mit Style Guide.
        </p>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div className='prose'>
        <p className="text-neutral-800 dark:text-neutral-200">
          Fortgeschrittene Webentwicklung. Hybrid-App-Entwicklung mit Ionic/Angular.
        </p>
        <p className="text-neutral-800 dark:text-neutral-200">
          Vertiefung UI/UX-Design. Erweiterung Adobe Creative Suite Skills.
        </p>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div className='prose'>
        <p className="text-neutral-800 dark:text-neutral-200">
          Studentische Hilfskraft: Pressestelle HTWK Leipzig. Social-Media und Event-Design.
        </p>
        <p className="text-neutral-800 dark:text-neutral-200">
          Vertiefung JavaScript, Einstieg Frontend-Frameworks und responsive Webdesign.
        </p>
      </div>
    ),
  },
  {
    title: "2020",
    content: (
      <div className='prose'>
        <p className="text-neutral-800 dark:text-neutral-200">
          Beginn Medientechnik-Studium (HTWK Leipzig). Fokus: Grafikdesign, Webtechnologien.
        </p>
        <p className="text-neutral-800 dark:text-neutral-200">
          Grundlagen: HTML5, CSS3, JavaScript. Einführung CMS und digitales Design.
        </p>
      </div>
    ),
  },
];


export default function Home() {
 
  return (
    <section className='py-24'>
      <div className='container max-w-3xl'>
        <Intro />
        <RecentPosts />
        <Timeline data={dataTimeline} />
        <RecentProjects />
        
        
      </div>
    </section>
  )
}
