import type { Metadata } from "next"
import Link from "next/link"

import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Mehr über Pascal Heue, seinen Weg und die Prinzipien hinter seiner Arbeit.",
}

const principles = [
  {
    title: "Local first, Cloud bewusst",
    text: "Produkte sollen ohne perfekte Verbindung nützlich bleiben. Die Cloud ist eine gezielte Ergänzung – kein reflexartiger Ausgangspunkt.",
  },
  {
    title: "KI als Assistenz",
    text: "KI kann Abläufe beschleunigen und neue Wege öffnen. Produktwahrheit, Kontrolle und verständliche Grenzen bleiben beim Menschen.",
  },
  {
    title: "Entscheidungen sichtbar machen",
    text: "Gute Software entsteht aus nachvollziehbaren Abwägungen. Der Dev Log zeigt deshalb nicht nur Ergebnisse, sondern auch den Weg dorthin.",
  },
]

const timeline = [
  {
    period: "seit 2025",
    place: "CHECK24",
    role: "Software Developer (Frontend & QA)",
  },
  {
    period: "2024",
    place: "HTWK Leipzig",
    role: "Bachelor of Engineering · Medientechnik",
  },
  {
    period: "2022–2023",
    place: "Pinder GmbH",
    role: "Webdesign, Entwicklung & Corporate Design",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        description="Ich arbeite an der Schnittstelle von Produkt, Design und Entwicklung. Im Beruf entstehen verlässliche Frontends, in eigenen Projekten ruhige native Produkte."
        eyebrow="04 · Über Pascal"
        title="Software ist für mich Produktarbeit."
      />

      <section className="section-shell">
        <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:gap-20">
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              Zwischen Gestaltung und System
            </h2>
            <div className="mt-7 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Mein Weg begann in der Medientechnik und führte über Corporate
                Design, responsive Websites und Frontend-Entwicklung zu
                eigenständigen Produkten für iOS und macOS.
              </p>
              <p>
                Heute interessieren mich besonders Systeme, die sich ruhig in
                den Alltag einfügen: verständlich im Interface, belastbar in der
                Architektur und ehrlich in ihren Grenzen.
              </p>
            </div>
            <p className="meta mt-8">
              Seit April 2025 · Software Developer (Frontend &amp; QA) bei
              CHECK24
            </p>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
              <Link className="underlined-link text-accent" href="/resume">
                Resume öffnen <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="underlined-link"
                href="mailto:info@pascalheue.dev"
              >
                Mail schreiben <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="border-l border-border pl-6 md:pl-10">
            <h2 className="font-serif text-3xl tracking-[-0.025em]">
              Woran ich glaube
            </h2>
            <ol className="mt-8">
              {principles.map(principle => (
                <li
                  className="border-t border-border py-6 first:border-t-0 first:pt-0"
                  key={principle.title}
                >
                  <h3 className="text-lg">{principle.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {principle.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <h2 className="font-serif text-4xl tracking-[-0.03em]">Kurzvita</h2>
          <dl className="mt-8">
            {timeline.map(item => (
              <div
                className="grid gap-2 border-t border-border py-5 font-mono text-sm sm:grid-cols-[10rem_16rem_1fr]"
                key={`${item.period}-${item.place}`}
              >
                <dt>{item.period}</dt>
                <dd>{item.place}</dd>
                <dd className="text-muted-foreground">{item.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
