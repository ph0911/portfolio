type ProjectMarkProps = {
  mark: string
  title: string
}

export function ProjectMark({ mark, title }: ProjectMarkProps) {
  return (
    <div
      aria-label={`${title} Monogramm`}
      className="relative flex aspect-[5/3] min-h-52 items-center justify-center overflow-hidden border-y border-border md:min-h-64 md:border"
      role="img"
    >
      <div
        aria-hidden="true"
        className="absolute inset-6 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-px bg-accent"
      />
      <span className="relative font-serif text-[clamp(5rem,12vw,9rem)] leading-none tracking-[-0.08em]">
        {mark}
        <span className="text-accent">.</span>
      </span>
    </div>
  )
}
