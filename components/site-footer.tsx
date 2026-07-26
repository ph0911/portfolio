import Link from "next/link"

const socialLinks = [
  { href: "https://github.com/ph0911", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/pascal-heue-557305232",
    label: "LinkedIn",
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="site-container py-10 md:py-9">
        <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-16">
          <Link
            aria-label="Pascal Heue – Startseite"
            className="font-serif text-5xl leading-none tracking-[-0.04em]"
            href="/"
          >
            PH
          </Link>

          <div className="font-mono text-xs leading-relaxed text-muted-foreground">
            <p>Pascal Heue · Software Developer · Leipzig</p>
            <p className="mt-1">
              Gebaut als statische Next.js-Seite · ohne Besuchs-Tracking
            </p>
          </div>

          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs">
              {socialLinks.map(item => (
                <li key={item.href}>
                  <Link
                    className="underlined-link"
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="underlined-link"
                  href="mailto:info@pascalheue.dev"
                >
                  Mail
                </Link>
              </li>
              <li>
                <Link className="underlined-link" href="/impressum">
                  Impressum
                </Link>
              </li>
              <li>
                <Link className="underlined-link" href="/datenschutz">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
