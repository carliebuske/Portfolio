import { useState } from 'react'
import { PROFILE } from '../data/site.js'

const LINKS = [
  { no: '00', label: 'Intro', href: '#top' },
  { no: '01', label: 'Selected Work', href: '#work' },
  { no: '02', label: 'Capabilities', href: '#capabilities' },
  { no: '03', label: 'About', href: '#about' },
  { no: '04', label: 'Clients + Awards', href: '#clients' },
  { no: '05', label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bone/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-editorial items-center justify-between px-5 py-3 md:px-8">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          Carlie Buske<span className="text-oxblood">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {LINKS.slice(1).map((l) => (
            <a
              key={l.no}
              href={l.href}
              className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink/60 transition-colors hover:text-ink"
            >
              <span className="text-oxblood/70">{l.no}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu"
          className="font-mono text-[11px] uppercase tracking-label text-ink lg:hidden"
        >
          {open ? 'Close ✕' : 'Menu ☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-ink/10 bg-bone px-5 py-4 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.no}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 py-2 font-mono text-[13px] uppercase tracking-wider text-ink/80"
            >
              <span className="text-oxblood/70">{l.no}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
