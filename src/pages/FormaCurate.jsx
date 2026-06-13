import { Link } from 'react-router-dom'
import { PROFILE } from '../data/site.js'

// Forma Curate — dedicated case page. The proof of the "systems that run it"
// half of the pitch. Framed as in-progress. Uses the dark oxblood/cream state
// from the cover letter.
const PILLARS = [
  {
    k: 'Plan',
    d: 'Briefs, timelines, and run-of-show generated and kept in sync — the producer’s brain, structured.',
  },
  {
    k: 'Budget',
    d: 'Live budgets and vendor tracking that update as scope moves, so the number is never a surprise.',
  },
  {
    k: 'Produce',
    d: 'Fabrication, staffing, and on-site ops coordinated from one place — the systems that run the room.',
  },
]

export default function FormaCurate() {
  return (
    <div className="min-h-screen bg-bone">
      <header className="sticky top-0 z-40 border-b border-bone/10 bg-oxblood/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-editorial items-center justify-between px-5 py-3 md:px-8">
          <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-bone">
            Carlie Buske<span className="text-bone/60">.</span>
          </Link>
          <Link
            to="/#work"
            className="font-mono text-[11px] uppercase tracking-label text-bone/70 hover:text-bone"
          >
            ← Back to board
          </Link>
        </div>
      </header>

      {/* Oxblood hero band */}
      <section className="bg-oxblood px-5 pb-20 pt-16 text-bone md:px-8 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-editorial">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-label text-bone/60">
              Independent
            </span>
            <span className="rounded-full border border-bone/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-bone/80">
              ● In development
            </span>
          </div>
          <h1 className="mt-6 font-display text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
            Forma
            <br />
            Curate
          </h1>
          <p className="mt-8 max-w-2xl font-display text-xl font-semibold leading-snug tracking-tight text-bone/90 md:text-3xl">
            An AI production tool I’m building — so the systems that run an experience
            are as considered as the experience itself.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-editorial px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-xl space-y-5">
            <span className="label">The premise</span>
            <p className="font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
              I’ve run enough programs to know the work is half creative, half
              operations. Forma Curate is the operations half, given the same craft.
            </p>
            <p className="text-[15px] leading-relaxed text-ink/80">
              It’s where my years of producing meet the custom AI systems I now build
              for creative operations at Google — planning, budgeting, and production,
              made faster and far less brittle.
            </p>
            <p className="text-[15px] leading-relaxed text-ink/80">
              It’s early and intentionally in-progress. The point isn’t a finished
              product; it’s the proof that I build the experience and the systems that
              run it.
            </p>
          </div>

          <div className="space-y-6">
            {PILLARS.map((p, i) => (
              <div key={p.k} className="border-t border-ink/15 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-wider text-oxblood">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{p.k}</h3>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{p.d}</p>
              </div>
            ))}

            <div className="border-t border-ink/15 pt-4">
              <span className="label">Status</span>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
                Building in the open. Want a walkthrough of where it stands?{' '}
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-oxblood underline decoration-1 underline-offset-2 hover:opacity-70"
                >
                  {PROFILE.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Link
            to="/#work"
            className="font-mono text-[12px] uppercase tracking-label text-oxblood hover:opacity-70"
          >
            ← Back to board
          </Link>
        </div>
      </main>
    </div>
  )
}
