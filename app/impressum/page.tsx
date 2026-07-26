import type { Metadata } from "next"
import Link from "next/link"

import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung für das Portfolio von Pascal Heue.",
}

export default function LegalNoticePage() {
  return (
    <>
      <PageIntro
        description="Angaben gemäß § 5 Digitale-Dienste-Gesetz."
        eyebrow="Rechtliches"
        title="Impressum"
      />
      <article className="section-shell">
        <div className="site-container prose prose-neutral max-w-3xl prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.02em]">
          <h2>Anbieter</h2>
          <p>
            Pascal Heue
            <br />
            Dölziger Weg 9
            <br />
            04205 Leipzig
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail:{" "}
            <Link href="mailto:info@pascalheue.dev">info@pascalheue.dev</Link>
          </p>

          <h2>Redaktionell verantwortlich</h2>
          <p>
            Pascal Heue
            <br />
            Anschrift wie oben
          </p>

          <h2>Hinweis zu externen Inhalten</h2>
          <p>
            Dieses Angebot verweist auf externe Websites. Für deren Inhalte sind
            die jeweiligen Anbieter verantwortlich. Externe Links werden bei der
            Veröffentlichung geprüft; eine dauerhafte Kontrolle ist ohne
            konkreten Anlass nicht zumutbar.
          </p>
        </div>
      </article>
    </>
  )
}
