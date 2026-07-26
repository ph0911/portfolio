import { ArrowLink } from "@/components/ui/arrow-link"

export function Hero() {
  return (
    <section className="site-container pb-10 pt-6">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)] lg:gap-20">
        <div>
          <h1 className="display-title max-w-4xl">
            Ich baue ruhige Software für echte Alltage
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            Pascal Heue verbindet Produktdesign, native Entwicklung und
            local-first Architektur. Hier entstehen Evo, Nomi und die
            Entscheidungen dazwischen.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:gap-10">
            <ArrowLink href="/work/evo-ios" tone="accent">
              Aktuellen Build ansehen
            </ArrowLink>
            <ArrowLink href="/log">Im Dev Log stöbern</ArrowLink>
          </div>
          <p className="meta mt-10">
            Software Developer (Frontend &amp; QA) · CHECK24
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden aspect-square items-center justify-center overflow-hidden lg:flex"
        >
          <div className="absolute inset-8 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-50" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-accent" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-foreground/70" />
          <span className="relative font-serif text-[11rem] leading-none tracking-[-0.08em]">
            PH
          </span>
        </div>
      </div>
    </section>
  )
}
