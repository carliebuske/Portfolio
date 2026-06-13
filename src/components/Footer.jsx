import { PROFILE } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-ink/10 pt-10">
      <div className="flex items-end justify-between">
        <span className="font-mono text-[11px] uppercase tracking-label text-caption">
          © {new Date().getFullYear()} Carlie Buske
        </span>
        <span className="font-mono text-[11px] uppercase tracking-label text-caption">
          References on request
        </span>
      </div>

      {/* Oversized lowercase watermark */}
      <div className="pointer-events-none select-none pb-2 pt-6 text-center sm:text-left">
        <span className="font-display text-[22vw] font-black leading-none tracking-tight text-caption/40 lg:text-[16rem]">
          {PROFILE.domain}
        </span>
      </div>
    </footer>
  )
}
