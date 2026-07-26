import type { Metadata } from "next"
import Link from "next/link"

import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Pascal Heue per E-Mail oder über berufliche Netzwerke erreichen.",
}

const links = [
  {
    label: "E-Mail",
    value: "info@pascalheue.dev",
    href: "mailto:info@pascalheue.dev?subject=Hallo%20Pascal",
  },
  {
    label: "GitHub",
    value: "@ph0911",
    href: "https://github.com/ph0911",
  },
  {
    label: "LinkedIn",
    value: "Pascal Heue",
    href: "https://www.linkedin.com/in/pascal-heue-557305232",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageIntro
        description="Für Produktideen, Zusammenarbeit oder einen fachlichen Austausch ist E-Mail der direkteste Weg."
        eyebrow="Kontakt"
        title="Lass uns über ruhige, nützliche Software sprechen."
      />
      <section className="section-shell">
        <div className="site-container">
          <dl>
            {links.map(item => (
              <div
                className="grid gap-2 border-t border-border py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
                key={item.label}
              >
                <dt className="meta">{item.label}</dt>
                <dd className="text-lg">{item.value}</dd>
                <dd>
                  <Link
                    className="underlined-link inline-flex min-h-11 items-center text-accent"
                    href={item.href}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                  >
                    Öffnen <span aria-hidden="true">→</span>
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Es gibt bewusst kein Kontaktformular. Dadurch werden auf dieser
            Website keine Formulardaten verarbeitet oder gespeichert.
          </p>
        </div>
      </section>
    </>
  )
}
