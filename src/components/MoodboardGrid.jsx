import { useMemo, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { buildCuratedBoard } from '../data/work.js'
import Tile from './Tile.jsx'
import FilterChips from './FilterChips.jsx'

// Does a board item pass the active filter? Swatches + the "All" filter always
// pass so the rest notes stay in place and the board never looks broken.
function matchesFilter(item, filter) {
  if (filter === 'All') return true
  if (item.type === 'swatch') return false
  return item.categories?.includes(filter)
}

export default function MoodboardGrid({ onOpen }) {
  // Default load is ALWAYS the curated, tiered order (Pinterest × Gemini leads).
  const curated = useMemo(() => buildCuratedBoard(), [])
  const [order, setOrder] = useState(curated)
  const [filter, setFilter] = useState('All')
  const [shuffled, setShuffled] = useState(false)

  // Press-and-hold to pick up a tile — the delay disambiguates a tap/click
  // (opens the case) from a drag (moves the tile), and lets touch scroll win
  // when the finger moves before the hold lands.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setOrder((items) => {
      const from = items.findIndex((i) => i.id === active.id)
      const to = items.findIndex((i) => i.id === over.id)
      return arrayMove(items, from, to)
    })
    setShuffled(true)
  }

  function reset() {
    setOrder(curated)
    setShuffled(false)
  }

  const ids = order.map((i) => i.id)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <FilterChips active={filter} onChange={setFilter} />
        <button
          type="button"
          onClick={reset}
          disabled={!shuffled}
          className={`font-mono text-[11px] uppercase tracking-label transition-opacity ${
            shuffled ? 'text-oxblood hover:opacity-70' : 'pointer-events-none opacity-0'
          }`}
        >
          ↺ Reset layout
        </button>
      </div>

      <p className="mb-5 font-mono text-[10px] uppercase tracking-wider text-caption">
        Press &amp; hold a tile to rearrange the board · tap to open
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-3 [grid-auto-flow:dense] [grid-auto-rows:8.5rem] md:grid-cols-3 md:[grid-auto-rows:10rem] lg:grid-cols-4 lg:[grid-auto-rows:12rem]">
            {order.map((item) => (
              <Tile
                key={item.id}
                item={item}
                onOpen={onOpen}
                dim={!matchesFilter(item, filter)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
