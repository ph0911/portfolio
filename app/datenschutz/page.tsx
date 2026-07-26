import type { Metadata } from "next"
import Link from "next/link"

import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzhinweise für das Portfolio von Pascal Heue, Stand Juli 2026.",
}

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        description="Diese Seite kommt ohne Besucheranalyse, Marketing-Cookies, Kontaktformular und eingebettete Inhalte aus."
        eyebrow="Rechtliches · Stand 26. Juli 2026"
        title="Datenschutz"
      />
      <article className="section-shell">
        <div className="site-container prose prose-neutral max-w-3xl prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.02em]">
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Pascal Heue
            <br />
            Dölziger Weg 9
            <br />
            04205 Leipzig
            <br />
            E-Mail:{" "}
            <Link href="mailto:info@pascalheue.dev">info@pascalheue.dev</Link>
          </p>

          <h2>2. Bereitstellung und Hosting</h2>
          <p>
            Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, USA, gehostet. Beim Aufruf verarbeitet der Hostinganbieter
            technisch notwendige Verbindungs- und Protokolldaten. Dazu können
            insbesondere IP-Adresse, Zeitpunkt, angeforderte Ressource,
            Referrer, Browser- und Systeminformationen gehören.
          </p>
          <p>
            Die Verarbeitung dient der sicheren, stabilen und effizienten
            Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
            DSGVO. Das berechtigte Interesse liegt in Betrieb, Sicherheit und
            Fehleranalyse dieses Angebots. Weitere Informationen stellt Vercel
            in seiner{" "}
            <Link
              href="https://vercel.com/legal/privacy-notice"
              rel="noreferrer"
              target="_blank"
            >
              Privacy Notice
            </Link>{" "}
            bereit.
          </p>

          <h2>3. Keine Besucheranalyse</h2>
          <p>
            Auf dieser Website sind keine Besucheranalyse, kein Nutzerprofiling
            und keine Marketing- oder Social-Media-Pixel eingebunden. Die Seite
            setzt selbst keine Cookies und speichert keine Informationen in
            Local Storage oder vergleichbaren Browser-Speichern. Es erscheint
            daher kein Consent-Banner.
          </p>

          <h2>4. Kontakt per E-Mail</h2>
          <p>
            Bei einer Kontaktaufnahme per E-Mail werden die übermittelten Daten
            zur Bearbeitung der Anfrage verarbeitet. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO, wenn die Anfrage auf einen Vertrag oder
            vorvertragliche Maßnahmen gerichtet ist; andernfalls Art. 6 Abs. 1
            lit. f DSGVO. Die Daten werden gelöscht, sobald die Anfrage
            abschließend bearbeitet ist und keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>

          <h2>5. Externe Links und Feeds</h2>
          <p>
            Externe Dienste wie GitHub oder LinkedIn werden nicht eingebettet.
            Erst beim bewussten Öffnen eines externen Links stellt der Browser
            eine Verbindung zum jeweiligen Anbieter her. RSS- und JSON-Feed
            enthalten dieselben öffentlich sichtbaren Inhalte wie der Dev Log
            und erfassen keine zusätzlichen Daten.
          </p>

          <h2>6. Speicherdauer</h2>
          <p>
            Personenbezogene Daten werden nur so lange verarbeitet, wie es für
            den jeweiligen Zweck erforderlich ist oder gesetzliche
            Aufbewahrungspflichten bestehen. Auf die Speicherdauer technischer
            Hosting-Protokolle hat der Websitebetreiber nur im Rahmen der vom
            Hostinganbieter bereitgestellten Einstellungen Einfluss.
          </p>

          <h2>7. Rechte betroffener Personen</h2>
          <p>
            Im Rahmen der gesetzlichen Voraussetzungen bestehen insbesondere
            Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem besteht
            ein Beschwerderecht bei einer zuständigen
            Datenschutzaufsichtsbehörde.
          </p>
          <p>
            Fragen oder die Ausübung dieser Rechte können an{" "}
            <Link href="mailto:info@pascalheue.dev">info@pascalheue.dev</Link>{" "}
            gerichtet werden.
          </p>
        </div>
      </article>
    </>
  )
}
