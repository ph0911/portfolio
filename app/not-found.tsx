import Link from "next/link"

export default function NotFoundPage() {
  return (
    <section className="site-container flex min-h-[65vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="meta text-accent">404 · Nicht gefunden</p>
        <h1 className="section-title mt-5">Diese Spur endet hier.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Die angeforderte Seite existiert nicht oder ist in den neuen Living
          Dev Space umgezogen.
        </p>
        <Link
          className="underlined-link mt-8 inline-flex min-h-11 items-center gap-4 text-accent"
          href="/"
        >
          Zur Startseite <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
