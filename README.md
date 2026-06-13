# carlie.wtf — Portfolio

Personal portfolio for Carlie Buske — Experiential Producer & Creative Director.
Warm Swiss editorial system (cream/oxblood), a draggable moodboard of selected
work, quick-look modals, and per-project case pages.

The site is itself a work sample: restraint and order *are* the pitch — builds
the experience and the systems that run it.

## Stack

- **Vite + React** — fast static build
- **Tailwind CSS** — design tokens live in `tailwind.config.js`
- **@dnd-kit** — press-and-hold drag to rearrange the moodboard
- **react-router-dom** — one-page scroll + case sub-pages
- Google Fonts: Archivo (display), Inter (body), Space Mono (labels)

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  data/
    work.js     ← the moodboard config (add work here)
    site.js     ← hero / about / capabilities / clients / awards
  components/   ← Nav, Tile, MoodboardGrid, QuickLookModal, sections/
  pages/        ← Home, CasePage, FormaCurate, NotFound
```

## Adding a new project tile

Everything on the board is driven by the `WORK` array in `src/data/work.js`.
Add one entry — no layout surgery:

```js
{
  id: 'my-project',         // also the case-page URL: /work/my-project
  type: 'work',
  tier: 2,                   // 1 = oversized lead · 2 = standard · 3 = smaller
  title: 'My Project',
  client: 'Client',
  role: 'Creative Lead',
  dates: '2025',
  categories: ['Experiential'],   // drives the filter chips
  story: 'Two or three lines.',
  result: 'One result metric',
  poster: '/posters/my-project.jpg',  // optional — falls back to a styled frame
  reel: '/reels/my-project.mp4',      // optional — Vimeo/Mux URL or local file
  hasCasePage: true,
}
```

- **Posters** are the default state. Drop images in `public/posters/`. With no
  poster, the tile renders a styled placeholder frame (the project name as the
  poster), so nothing ever looks broken before assets land.
- **Reels** lazy-load and play muted on hover (desktop) or when scrolled into
  view (mobile). Prefer embedded Vimeo/Mux URLs over raw files for performance.
- **Bundles** (talent groups) reveal all names on hover and in the modal — set a
  `bundle: [{ name, partner }]` array.
- **Swatch / bio tiles** are the rest notes — edit `SWATCHES` in the same file.

## Design tokens

| Token     | Hex       | Use                                        |
| --------- | --------- | ------------------------------------------ |
| `bone`    | `#F2EEE6` | cream/bone ground (default surface)        |
| `ink`     | `#1C1B19` | near-black type                            |
| `oxblood` | `#7A2E28` | accent — surgical only (links, the period) |
| `caption` | `#B8B2A6` | caption gray / watermark                   |
| `olive`   | `#A8B14A` | swatch tiles only — swap for exact value   |
| `skyblue` | `#B7C5CC` | swatch tiles only — swap for exact value   |

Olive and sky-blue are starter values for the swatch tiles — swap them for the
exact hex from the source docs in `tailwind.config.js`.
