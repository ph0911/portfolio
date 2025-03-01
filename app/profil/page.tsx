'use client';

import ModalWrapper from '@/components/ModalWrapper';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import authorImage from '@/public/images/authors/author.png';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Timeline data
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
];

export default function ProfilePage() {
  return (
    <ModalWrapper parentPath="/" isActive>
      <section className='pb-16 md:pb-24 pt-4 md:pt-32'>
        <div className='container max-w-3xl'>
          <Link
            href='/'
            className='mb-8 md:inline-flex hidden items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
          >
            <ChevronLeft className='h-5 w-5' />
            <span>Home</span>
          </Link>
          
          <header className="mb-24">
            <h1 className="title mb-8">Profil</h1>
            
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-10">
              <div className="flex-shrink-0 self-start md:self-auto">
                <Image 
                  src={authorImage}
                  alt="Pascal Heue"
                  className="w-24 h-24 rounded-full object-cover"
                  width={96}
                  height={96}
                  priority
                />
              </div>
              
              <div className="flex flex-col md:justify-center">
                <h2 className="text-2xl font-medium mb-2">Pascal Heue</h2>
                <p className="text-muted-foreground font-light">
                  Frontend-Entwickler & Designer mit Fokus auf moderne Web-Technologien
                </p>
              </div>
            </div>
            
            <div className="prose dark:prose-invert mb-16">
              <p className="">
              Als Kind träumte ich davon, Comiczeichner zu werden. Heute gestalte ich keine Superhelden, sondern digitale Erlebnisse, die genauso fesselnd sind. Mit einem Medientechnik-Abschluss der HTWK Leipzig in der Tasche und der Fähigkeit, Pixelperfektion mit Code zu verbinden, bin ich bereit, die digitale Welt ein Stück aufregender zu machen. <br /> <br />
Meine Superpower? Die Synthese von Grafikdesign, UI/UX-Design und Frontend-Entwicklung. In Projekten und Praktika habe ich gelernt, dass große Ideen nur dann glänzen, wenn sie auch technisch gut umgesetzt sind. Ob es darum geht, ein Corporate Design zum Leben zu erwecken oder eine Website zu entwickeln, die nicht nur gut aussieht, sondern auch perfekt funktioniert – ich stelle mich jeder Herausforderung mit Enthusiasmus und Kreativität. <br /> <br />
Meine Kenntnisse in der Adobe Creative Suite, HTML/CSS, JavaScript sowie Frameworks wie Angular und React ermöglichen es mir, innovative und funktionale Lösungen zu entwickeln. 
Besonders fasziniert mich die Schnittstelle zwischen Design und Technologie. Ich sehe mich als Brückenbauer, der ästhetische Konzepte in nutzerfreundliche Erlebnisse übersetzt. Meine Erfahrungen mit KI-Tools wie ChatGPT und Midjourney haben zudem mein Interesse für zukunftsweisende Technologien geschärft
              </p>
            </div>
          </header>

          <Timeline data={dataTimeline} />
          
          {/* <section className="mb-12">
            <h2 className="title mb-8">Aktueller Fokus</h2>
            <div className="prose dark:prose-invert">
              <p>
                Derzeit konzentriere ich mich auf die Vertiefung meiner Kenntnisse im Bereich Server Components und die Optimierung von Performance-Metriken in Next.js-Anwendungen. Ein besonderer Schwerpunkt liegt auf der Implementierung von barrierefreien UI-Komponenten mit React und TailwindCSS.
              </p>
              <p>
                Parallel dazu experimentiere ich mit verschiedenen Design-Systemen und deren Integration in den Entwicklungsprozess, um konsistente und skalierbare Benutzeroberflächen zu schaffen.
              </p>
            </div>
          </section> */}
        </div>
      </section>
    </ModalWrapper>
  );
}