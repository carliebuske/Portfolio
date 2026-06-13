import { FILTERS } from '../data/work.js'

// Small tactile color-swatch chips. Borrow the moodboard behavior, not the
// Pinterest look — these highlight tiles in place, they don't open landing pages.
const CHIP_DOT = {
  All: 'bg-ink',
  Experiential: 'bg-oxblood',
  CTV: 'bg-olive',
  Production: 'bg-skyblue',
  Hospitality: 'bg-[#C8A24B]',
}

export default function FilterChips({ active, onChange }) {
  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {FILTERS.map((f) => {
        const on = active === f
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            aria-pressed={on}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              on
                ? 'border-ink bg-ink text-bone'
                : 'border-ink/20 bg-transparent text-ink/70 hover:border-ink/50'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10 ${CHIP_DOT[f]}`}
            />
            {f}
          </button>
        )
      })}
    </div>
  )
}
