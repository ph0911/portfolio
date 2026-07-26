import Link from "next/link"

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  backHref?: string
  backLabel?: string
}

export function PageIntro({
  eyebrow,
  title,
  description,
  backHref,
  backLabel = "Zurück",
}: PageIntroProps) {
  return (
    <header className="site-container pb-14 pt-12 md:pb-20 md:pt-20">
      {backHref ? (
        <Link
          className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          href={backHref}
        >
          <span aria-hidden="true">←</span>
          {backLabel}
        </Link>
      ) : null}
      <p className="meta mb-5 text-accent">{eyebrow}</p>
      <h1 className="section-title max-w-4xl">{title}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
        {description}
      </p>
    </header>
  )
}
