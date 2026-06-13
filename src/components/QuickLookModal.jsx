import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLockBody } from '../lib/hooks.js'
import { ABOUT } from '../data/site.js'

// One modal language for quick-look + About. Full case studies are full pages.
// Full-screen on mobile, centered panel on desktop.
export default function QuickLookModal({ item, onClose }) {
  const closeRef = useRef(null)
  useLockBody(!!item)

  useEffect(() => {
    if (!item) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])

  if (!item) return null

  const isAbout = item.type === 'swatch'
  const caseHref = item.to || `/work/${item.id}`

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center overflow-y-auto bg-ink/60 backdrop-blur-sm md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={isAbout ? 'About' : `${item.title} quick look`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex min-h-full w-full flex-col bg-bone md:min-h-0 md:max-w-3xl md:rounded-none md:shadow-2xl">
        {/* Close */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 font-mono text-[11px] uppercase tracking-label text-ink/70 outline-none hover:text-oxblood focus-visible:ring-2 focus-visible:ring-oxblood"
        >
          Close ✕
        </button>

        {isAbout ? (
          <AboutBody onClose={onClose} />
        ) : (
          <WorkBody item={item} caseHref={caseHref} onClose={onClose} />
        )}
      </div>
    </div>
  )
}

function WorkBody({ item, caseHref, onClose }) {
  return (
    <>
      {/* Reel / poster */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
        {item.reel ? (
          <video
            src={item.reel}
            poster={item.poster || undefined}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <span className="font-display text-2xl font-extrabold tracking-tight text-bone md:text-4xl">
              {item.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-label text-bone/45">
              Reel — coming soon
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
            {item.title}
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-wider text-caption">
            {item.dates}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-y-2 border-y border-ink/15 py-4 text-sm md:grid-cols-3">
          <Meta label="Client" value={item.client} />
          <Meta label="Role" value={item.role} />
          <Meta label="Result" value={item.result} />
        </dl>

        <p className="max-w-prose text-[15px] leading-relaxed text-ink/85">{item.story}</p>

        {item.bundle ? (
          <div>
            <span className="label">Talent &amp; partners</span>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {item.bundle.map((b) => (
                <li key={b.name} className="text-sm text-ink/85">
                  <span className="font-medium">{b.name}</span>
                  {b.partner ? <span className="text-ink/55"> — {b.partner}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex items-center gap-6 pt-1">
          <Link
            to={caseHref}
            onClick={onClose}
            className="font-mono text-[12px] uppercase tracking-label text-oxblood hover:opacity-70"
          >
            Full case →
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[12px] uppercase tracking-label text-ink/50 hover:text-ink"
          >
            ← Back to board
          </button>
        </div>
      </div>
    </>
  )
}

function AboutBody({ onClose }) {
  return (
    <div className="flex flex-col gap-5 p-6 md:p-10">
      <span className="label">03 / About</span>
      <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        Carlie Buske
      </h2>
      {ABOUT.body.slice(0, 2).map((p, i) => (
        <p key={i} className="max-w-prose text-[15px] leading-relaxed text-ink/85">
          {p}
        </p>
      ))}
      <a
        href="#about"
        onClick={onClose}
        className="font-mono text-[12px] uppercase tracking-label text-oxblood hover:opacity-70"
      >
        Read the full story ↓
      </a>
    </div>
  )
}

function Meta({ label, value }) {
  return (
    <div className="pr-4">
      <dt className="label">{label}</dt>
      <dd className="mt-0.5 text-sm text-ink/90">{value}</dd>
    </div>
  )
}
