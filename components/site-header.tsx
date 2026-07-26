import Link from "next/link"

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/log", label: "Log" },
  { href: "/about", label: "About" },
]

const mailHref =
  "mailto:info@pascalheue.dev?subject=Hallo%20Pascal&body=Hi%20Pascal%2C%0A%0A"

function MailLink() {
  return (
    <Link
      className="site-header__link inline-flex min-h-11 items-center gap-2"
      href={mailHref}
    >
      <svg
        aria-hidden="true"
        className="size-[18px]"
        fill="none"
        viewBox="0 0 24 24"
      >
        <rect
          height="15"
          rx="1"
          stroke="currentColor"
          width="20"
          x="2"
          y="4.5"
        />
        <path d="m3 6 9 7 9-7" stroke="currentColor" />
      </svg>
      <span>Mail</span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container flex h-[5.5rem] items-center justify-between md:h-24">
        <Link
          aria-label="Pascal Heue – Startseite"
          className="font-serif text-[2rem] leading-none tracking-[-0.04em] md:text-[1.7rem]"
          href="/"
        >
          PH
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-12">
            {navigation.map(item => (
              <li key={item.href}>
                <Link className="site-header__link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 md:gap-0">
          <MailLink />

          <details className="site-menu relative md:hidden">
            <summary className="site-header__link flex min-h-11 cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" className="site-menu__icon">
                <i />
                <i />
                <i />
              </span>
              <span>Menü</span>
            </summary>

            <nav
              aria-label="Mobile Navigation"
              className="absolute right-0 top-full z-50 mt-2 w-52 border border-border bg-background p-2 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <ul>
                {navigation.map(item => (
                  <li key={item.href}>
                    <a
                      className="flex min-h-11 items-center justify-between px-3 text-base hover:text-accent"
                      href={item.href}
                    >
                      {item.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
