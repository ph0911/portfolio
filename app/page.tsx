/* eslint-disable @typescript-eslint/no-unused-vars */
import Intro from '@/components/intro'
import React from 'react'

import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import { Timeline } from '@/components/ui/timeline'
import SkillsSection from '@/components/skills-section'




const dataTimeline = [
  {
    title: "2024",
    content: (
      <div className='prose dark:prose-invert text-md '>
        <p>
          B.Eng. Abschluss in Medientechnik (HTWK Leipzig). Spezialisierung: Frontend-Entwicklung und UX Design.
        </p>
        <p>
          Vertiefung: React, Next.js, Angular. Fokus auf responsive Webprojekte.
        </p>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className='prose dark:prose-invert text-md '>
        <p>
          Praxissemester und Nebenjob: Webentwickler und Grafikdesigner in der Eventtechnologie.
        </p>
        <p >
          Umsetzung: 4 responsive Websites, Corporate Design mit Style Guide.
        </p>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div className='prose dark:prose-invert text-md '>
        <p >
          Fortgeschrittene Webentwicklung. Hybrid-App-Entwicklung mit Ionic/Angular.
        </p>
        <p>
          Vertiefung UI/UX-Design. Erweiterung Adobe Creative Suite Skills.
        </p>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div className='prose dark:prose-invert text-md '>
        <p>
          Studentische Hilfskraft: Pressestelle HTWK Leipzig. Social-Media und Event-Design.
        </p>
        <p >
          Vertiefung JavaScript, Einstieg Frontend-Frameworks und responsive Webdesign.
        </p>
      </div>
    ),
  },
  {
    title: "2020",
    content: (
      <div className='prose dark:prose-invert text-md '>
        <p>
          Beginn Medientechnik-Studium (HTWK Leipzig). Fokus: Grafikdesign, Webtechnologien.
        </p>
        <p>
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
        <SkillsSection />
        <RecentPosts />

        <Timeline data={dataTimeline} />
        <RecentProjects />


      </div>
    </section>
  )
}
