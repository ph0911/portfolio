type SectionHeadingProps = {
  number: string
  title: string
  description?: string
}

export function SectionHeading({
  number,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header>
      <div className="section-rail">
        <span>{number}</span>
      </div>
      <h2 className="section-title mt-2">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  )
}
