import type { Metadata } from "next"
import Link from "next/link"

import { PageIntro } from "@/components/page-intro"
import { PrintButton } from "@/components/print-button"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Kurzprofil, Erfahrung und ausgewählte Fähigkeiten von Pascal Heue.",
}

const experience = [
  {
    period: "04/2025 – heute",
    organization: "CHECK24",
    title: "Software Developer (Frontend & QA)",
    detail:
      "Produktnahe Frontend-Entwicklung mit React und TypeScript sowie Qualitätssicherung durch automatisierte End-to-End-Tests.",
  },
  {
    period: "2022 – 2023",
    organization: "Pinder GmbH",
    title: "Webdesign & Entwicklung",
    detail:
      "Konzeption und Umsetzung responsiver Unternehmensauftritte sowie eines bereichsübergreifenden Corporate Designs.",
  },
]

const capabilities = [
  "React · Next.js · TypeScript",
  "Swift · SwiftUI · lokale Persistenz",
  "Responsive UI · Designsysteme · Accessibility",
  "End-to-End-Tests · QA · technische Dokumentation",
  "Local-first Architektur · Supabase · Produktprototyping",
]

export default function ResumePage() {
  return (
    <>
      <PageIntro
        backHref="/about"
        backLabel="Über mich"
        description="Produktnaher Software Developer mit Wurzeln in Medientechnik, Gestaltung und Webentwicklung."
        eyebrow="Resume · Stand Juli 2026"
        title="Pascal Heue"
      />

      <div className="site-container mb-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        <PrintButton />
        <Link
          className="underlined-link inline-flex min-h-11 items-center text-sm"
          href="mailto:info@pascalheue.dev"
        >
          info@pascalheue.dev
        </Link>
      </div>

      <section className="section-shell">
        <div className="site-container grid gap-10 md:grid-cols-[13rem_1fr]">
          <h2 className="font-serif text-3xl tracking-[-0.025em]">Erfahrung</h2>
          <ol>
            {experience.map(item => (
              <li
                className="grid gap-4 border-t border-border py-7 first:pt-0 md:grid-cols-[10rem_1fr]"
                key={`${item.period}-${item.organization}`}
              >
                <p className="meta">{item.period}</p>
                <div>
                  <p className="meta text-foreground">{item.organization}</p>
                  <h3 className="mt-2 text-xl">{item.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container grid gap-10 md:grid-cols-[13rem_1fr]">
          <h2 className="font-serif text-3xl tracking-[-0.025em]">
            Ausbildung
          </h2>
          <div className="border-t border-border pt-7">
            <p className="meta">2019 – 2024 · HTWK Leipzig</p>
            <h3 className="mt-2 text-xl">
              Bachelor of Engineering · Medientechnik
            </h3>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container grid gap-10 md:grid-cols-[13rem_1fr]">
          <h2 className="font-serif text-3xl tracking-[-0.025em]">Praxis</h2>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {capabilities.map(capability => (
              <li
                className="border-t border-border pt-4 text-sm leading-relaxed"
                key={capability}
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
