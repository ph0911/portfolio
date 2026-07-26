import { SectionHeading } from "@/components/section-heading"
import { ArrowLink } from "@/components/ui/arrow-link"

const principles = [
  "Local first, Cloud bewusst",
  "KI als Assistenz",
  "Entscheidungen sichtbar machen",
]

export function AboutSection() {
  return (
    <section className="section-shell">
      <div className="site-container">
        <SectionHeading number="04" title="Über Pascal" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:gap-20">
          <div>
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
              Ich arbeite an der Schnittstelle von Produkt, Design und
              Entwicklung. Im Beruf entstehen verlässliche Frontends, in eigenen
              Projekten ruhige native Produkte.
            </p>
            <p className="meta mt-7">
              Seit April 2025 · Software Developer (Frontend &amp; QA) bei
              CHECK24
            </p>
            <div className="mt-8 flex flex-wrap gap-x-9 gap-y-3">
              <ArrowLink href="/about" tone="accent">
                Mehr über mich
              </ArrowLink>
              <ArrowLink href="/resume">Resume öffnen</ArrowLink>
              <ArrowLink href="mailto:info@pascalheue.dev">
                Mail schreiben
              </ArrowLink>
            </div>
          </div>
          <div className="border-l border-border pl-6 md:pl-10">
            <h3 className="font-serif text-3xl tracking-[-0.025em]">
              Woran ich glaube
            </h3>
            <ul className="mt-5">
              {principles.map(principle => (
                <li
                  className="flex items-center justify-between border-t border-border py-5 text-lg"
                  key={principle}
                >
                  {principle}
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
