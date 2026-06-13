import { PROFILE } from '../../data/site.js'

// Render a string with [bracketed] words highlighted in oxblood.
function Highlight({ text }) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return parts.map((p, i) =>
    p.startsWith('[') && p.endsWith(']') ? (
      <span key={i} className="text-oxblood">
        {p.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

export default function Hero() {
  return (
    <section id="top" className="pt-10 md:pt-16">
      {/* Top meta row */}
      <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-label text-caption">
        <span>{PROFILE.location}</span>
        <span className="hidden gap-5 sm:flex">
          <span>{PROFILE.domain}</span>
          <a href={`mailto:${PROFILE.email}`} className="text-ink/60 hover:text-oxblood">
            {PROFILE.email}
          </a>
        </span>
      </div>

      {/* Name lockup — type only, let it land */}
      <h1 className="font-display text-[18vw] font-black leading-[0.85] tracking-tight sm:text-[14vw] lg:text-[10.5rem]">
        <span className="block">{PROFILE.name[0]}</span>
        <span className="block">
          {PROFILE.name[1]}
          <span className="text-oxblood">.</span>
        </span>
      </h1>

      <div className="mt-8 flex flex-col gap-1 border-t border-ink/80 pt-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
          {PROFILE.title}
        </p>
        <span className="font-mono text-[11px] uppercase tracking-label text-caption">
          {PROFILE.years}
        </span>
      </div>

      <p className="mt-10 max-w-3xl font-display text-2xl font-semibold leading-[1.15] tracking-tight md:text-4xl md:leading-[1.12]">
        <Highlight text={PROFILE.oneLiner} />
      </p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
        {PROFILE.intro}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a
          href="#work"
          className="font-mono text-[12px] uppercase tracking-label text-oxblood hover:opacity-70"
        >
          ↓ Selected work
        </a>
        <a
          href="#contact"
          className="font-mono text-[12px] uppercase tracking-label text-ink/60 hover:text-ink"
        >
          Get in touch
        </a>
      </div>
    </section>
  )
}
