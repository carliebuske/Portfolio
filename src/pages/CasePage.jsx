import { useParams, Link, Navigate } from 'react-router-dom'
import { getWorkBySlug } from '../data/work.js'
import { PROFILE } from '../data/site.js'

// Per-project case template: full-bleed reel (click for sound) → client / role /
// dates → 2–3 line story → one result → back to grid.
export default function CasePage() {
  const { slug } = useParams()
  const item = getWorkBySlug(slug)

  // Forma Curate has its own dedicated page.
  if (slug === 'forma-curate') return <Navigate to="/forma-curate" replace />
  if (!item) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-bone">
      {/* Minimal chrome */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-editorial items-center justify-between px-5 py-3 md:px-8">
          <Link to="/" className="font-display text-lg font-extrabold tracking-tight">
            Carlie Buske<span className="text-oxblood">.</span>
          </Link>
          <Link
            to="/#work"
            className="font-mono text-[11px] uppercase tracking-label text-ink/60 hover:text-oxblood"
          >
            ← Back to board
          </Link>
        </div>
      </header>

      {/* Full-bleed reel */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink md:aspect-[21/9]">
        {item.reel ? (
          <video
            src={item.reel}
            poster={item.poster || undefined}
            controls
            playsInline
            muted
            autoPlay
            loop
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
            <span className="font-display text-4xl font-black tracking-tight text-bone md:text-7xl">
              {item.title}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-label text-bone/45">
              Reel — coming soon · click for sound
            </span>
          </div>
        )}
      </div>

      <main className="mx-auto max-w-editorial px-5 py-14 md:px-8 md:py-20">
        <span className="label">01 / Selected Work</span>
        <h1 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
          {item.title}
        </h1>

        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-y-6 border-y border-ink/15 py-6 md:grid-cols-4">
          <Meta label="Client" value={item.client} />
          <Meta label="Role" value={item.role} />
          <Meta label="Dates" value={item.dates} />
          <Meta label="Result" value={item.result} />
        </dl>

        <p className="mt-10 max-w-2xl font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          {item.story}
        </p>

        {item.bundle ? (
          <div className="mt-10 max-w-2xl">
            <span className="label">Talent &amp; partners</span>
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {item.bundle.map((b) => (
                <li key={b.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {b.name}
                  </span>
                  {b.partner ? (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-caption">
                      {b.partner}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Result callout */}
        <div className="mt-14 bg-oxblood px-6 py-10 text-bone md:px-12 md:py-14">
          <span className="font-mono text-[11px] uppercase tracking-label text-bone/55">
            The result
          </span>
          <p className="mt-3 font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {item.result}
          </p>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <Link
            to="/#work"
            className="font-mono text-[12px] uppercase tracking-label text-oxblood hover:opacity-70"
          >
            ← Back to board
          </Link>
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-[12px] uppercase tracking-label text-ink/50 hover:text-ink"
          >
            Get in touch
          </a>
        </div>
      </main>
    </div>
  )
}

function Meta({ label, value }) {
  return (
    <div className="pr-4">
      <dt className="label">{label}</dt>
      <dd className="mt-1 text-sm text-ink/90">{value}</dd>
    </div>
  )
}
