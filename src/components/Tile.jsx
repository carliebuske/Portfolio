import { useRef, useState, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useInView, useIsTouch } from '../lib/hooks.js'

// Tier → grid footprint. Base grid is 2 cols (mobile) up to 4 (desktop);
// tier 1 leads at 2×2, tier 2 is a tall standard, tier 3 is a small square.
const TIER_SPAN = {
  1: 'col-span-2 row-span-2',
  2: 'col-span-1 row-span-2',
  3: 'col-span-1 row-span-1',
}

// Placeholder poster tones (warm neutral only — color is reserved for swatch
// tiles). Darker, bolder tiles read as the leads.
const TIER_POSTER = {
  1: { bg: 'bg-ink', text: 'text-bone', sub: 'text-bone/45' },
  2: { bg: 'bg-[#D2CBBC]', text: 'text-ink', sub: 'text-ink/45' },
  3: { bg: 'bg-[#E4DED2]', text: 'text-ink', sub: 'text-ink/40' },
}

const SWATCH_BG = {
  olive: 'bg-olive',
  skyblue: 'bg-skyblue',
}

// ── Media: poster frame by default; muted loop on hover (desktop) / in-view
// (mobile). Falls back to the styled poster placeholder when no reel exists. ──
function TileMedia({ item, active }) {
  const videoRef = useRef(null)
  const tone = TIER_POSTER[item.tier] || TIER_POSTER[2]

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) {
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [active])

  return (
    <div className={`absolute inset-0 ${tone.bg}`}>
      {item.poster ? (
        <img
          src={item.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {item.reel ? (
        <video
          ref={videoRef}
          src={item.reel}
          poster={item.poster || undefined}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      {/* Poster placeholder content (project name as the frame) */}
      {!item.poster && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
          <span className={`label ${tone.sub}`}>
            {item.inDevelopment ? 'In Development' : item.client}
          </span>
          <div>
            <h3
              className={`font-display font-extrabold leading-[0.95] tracking-tight ${tone.text} ${
                item.tier === 1
                  ? 'text-3xl md:text-4xl lg:text-5xl'
                  : item.tier === 2
                  ? 'text-xl md:text-2xl'
                  : 'text-base md:text-lg'
              }`}
            >
              {item.title}
            </h3>
            <span className={`mt-2 block font-mono text-[10px] tracking-wider ${tone.sub}`}>
              {item.dates}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Work tile ────────────────────────────────────────────────────────────────
function WorkTile({ item, onOpen, listeners, isDragging }) {
  const isTouch = useIsTouch()
  const [hover, setHover] = useState(false)
  const [inViewRef, inView] = useInView()
  const active = isTouch ? inView : hover

  return (
    <button
      type="button"
      ref={inViewRef}
      onClick={() => !isDragging && onOpen(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`${item.title} — quick look`}
      className="group relative block h-full w-full overflow-hidden bg-ink/5 text-left outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-oxblood"
      {...listeners}
    >
      <TileMedia item={item} active={active} />

      {/* Subtle oxblood hover state */}
      <span
        className={`pointer-events-none absolute inset-0 border-2 transition-colors duration-300 ${
          active ? 'border-oxblood' : 'border-transparent'
        }`}
      />

      {/* Quick-look affordance + bundle reveal on hover/in-view */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 transition-opacity duration-300 ${
          active && (item.bundle || item.tier === 1) ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {item.bundle ? (
          <ul className="mb-1 space-y-0.5">
            {item.bundle.map((b) => (
              <li key={b.name} className="font-mono text-[10px] uppercase tracking-wider text-bone">
                {b.name}
                {b.partner ? <span className="text-bone/55"> — {b.partner}</span> : null}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="font-mono text-[10px] uppercase tracking-label text-bone/80">
          Quick look →
        </span>
      </div>
    </button>
  )
}

// ── Swatch / bio tile (rest note) ────────────────────────────────────────────
function SwatchTile({ item, onOpen, listeners, isDragging }) {
  const isLink = item.opensAbout
  const Comp = isLink ? 'button' : 'div'
  return (
    <Comp
      type={isLink ? 'button' : undefined}
      onClick={isLink ? () => !isDragging && onOpen(item) : undefined}
      className={`relative flex h-full w-full flex-col justify-between p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ink/60 md:p-5 ${
        SWATCH_BG[item.color]
      } ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
      {...listeners}
    >
      <span className="font-mono text-[10px] uppercase tracking-label text-ink/55">
        {item.hex}
      </span>
      <p className="font-display text-sm font-semibold leading-snug text-ink md:text-base">
        {item.text}
      </p>
    </Comp>
  )
}

// ── Sortable wrapper ─────────────────────────────────────────────────────────
export default function Tile({ item, onOpen, dim = false }) {
  // Note: we intentionally don't spread dnd-kit's `attributes` (role/tabIndex
  // for keyboard drag) onto the wrapper — it already contains a real <button>,
  // and doing so would create nested button roles + a duplicate tab stop.
  // Keyboard users get full access via the inner control; drag is touch/mouse.
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const span = TIER_SPAN[item.tier] || TIER_SPAN[2]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${span} select-none transition-opacity duration-300 ${
        isDragging ? 'tile-dragging opacity-80' : dim ? 'opacity-25' : 'opacity-100'
      }`}
    >
      {item.type === 'swatch' ? (
        <SwatchTile item={item} onOpen={onOpen} listeners={listeners} isDragging={isDragging} />
      ) : (
        <WorkTile item={item} onOpen={onOpen} listeners={listeners} isDragging={isDragging} />
      )}
    </div>
  )
}
