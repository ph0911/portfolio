'use client'

import { Timeline } from '@/components/ui/timeline'

const dataTimeline = [
  {
    date: "2024",
    title: "Bachelor of Engineering",
    content: (
      <div className='prose dark:prose-invert'>
        <h3 className="font-medium mb-1">Medientechnik, HTWK Leipzig</h3>
        <p>
          B.Eng. Abschluss mit Spezialisierung auf Frontend-Entwicklung und UX Design.
        </p>
        <p>
          Fortgeschrittene Kenntnisse in React, Next.js und Angular mit Fokus auf responsive Webprojekte.
        </p>
      </div>
    ),
  },
  {
    date: "2022",
    title: "Webentwickler & Grafikdesigner",
    content: (
      <div className='prose dark:prose-invert'>
        <h3 className="font-medium mb-1">Veranstaltungstechnik Branche</h3>
        <p>
          Praxissemester und anschließende Teilzeitstelle im Bereich Veranstaltungstechnik.
        </p>
        <p>
          Umsetzung von vier responsiven Webseiten und Erstellung eines umfassenden Corporate-Design-Systems mit Style Guide.
        </p>
      </div>
    ),
  },
  {
    date: "2021",
    title: "Frontend-Entwicklung Spezialisierung",
    content: (
      <div className='prose dark:prose-invert'>
        <h3 className="font-medium mb-1">Hybrid App-Entwicklung</h3>
        <p>
          Fortgeschrittene Webentwicklungsfähigkeiten mit Schwerpunkt auf Hybrid-App-Entwicklung mit Ionic und Angular.
        </p>
        <p>
          Vertiefung des UI/UX-Design-Fachwissens und Erweiterung der Kenntnisse in Adobe Creative Suite.
        </p>
      </div>
    ),
  },
  {
    date: "2020",
    title: "Studentische Hilfskraft",
    content: (
      <div className='prose dark:prose-invert'>
        <h3 className="font-medium mb-1">Pressestelle HTWK Leipzig</h3>
        <p>
          Betreuung von Social-Media-Inhalten und Gestaltung von Werbematerialien für Universitätsveranstaltungen.
        </p>
        <p>
          Weiterentwicklung der JavaScript-Kenntnisse und erste Erkundung von Frontend-Frameworks und responsivem Webdesign.
        </p>
      </div>
    ),
  },
  {
    date: "2019",
    title: "Beginn des Medientechnik-Studiums",
    content: (
      <div className='prose dark:prose-invert'>
        <h3 className="font-medium mb-1">HTWK Leipzig</h3>
        <p>
          Beginn des akademischen Weges in der Medientechnik mit Schwerpunkt auf Grafikdesign und Webtechnologien.
        </p>
        <p>
          Grundlagen in HTML5, CSS3 und JavaScript sowie Einführung in CMS und digitale Designprinzipien.
        </p>
      </div>
    ),
  },
]

export default function ProfileTimeline() {
  return <Timeline data={dataTimeline} />
}
