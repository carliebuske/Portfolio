// ─────────────────────────────────────────────────────────────────────────────
// SELECTED WORK — moodboard config
//
// Every tile on the board is one entry in this array. To add new work:
//   1. Add an object below (set tier, categories, story, result, assets).
//   2. Drop a poster + reel into /public/posters and /public/reels and point
//      `poster` / `reel` at them.
// No layout surgery required — the grid sizes tiles from `tier` and the board
// always loads in this curated order (Pinterest × Gemini leads).
//
// Tile types:
//   'work'   — poster frame → muted loop on hover → quick-look modal
//   'swatch' — solid color block (rest note) carrying a bio/voice fragment
//
// Tiers (size on the board):  1 = oversized lead · 2 = standard · 3 = smaller
// Categories (filter chips):  Experiential · CTV · Production · Hospitality
// ─────────────────────────────────────────────────────────────────────────────

export const FILTERS = ['All', 'Experiential', 'CTV', 'Production', 'Hospitality']

export const WORK = [
  // ── Tier 1 — lead the board ────────────────────────────────────────────────
  {
    id: 'pinterest-gemini',
    type: 'work',
    tier: 1,
    title: 'Pinterest × Gemini',
    client: 'Google · Pinterest',
    role: 'Creative Lead',
    dates: '2025',
    categories: ['Experiential', 'Production'],
    story:
      'Back-to-school partnership pairing Pinterest discovery with Gemini. Led creative end to end — from the concept through the systems that ran production and planning.',
    result: 'Flagship cross-platform partnership',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
  {
    id: 'made-by-google-afterparty',
    type: 'work',
    tier: 1,
    title: 'Made by Google After-Party',
    client: 'Google',
    role: 'Experiential Producer',
    dates: '2024',
    categories: ['Experiential', 'Production'],
    story:
      'The celebration after the keynote. Designed the attendee journey and ran fabrication, vendors, and on-site ops for a room full of press, partners, and talent.',
    result: 'Hundreds of guests, one night, zero seams',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
  {
    id: 'forma-curate',
    type: 'work',
    tier: 1,
    title: 'Forma Curate',
    client: 'Independent — in development',
    role: 'Founder / Builder',
    dates: '2024 — Present',
    categories: ['Production'],
    story:
      'An AI production tool I am building for planning, budgeting, and running events. The proof of the “systems that run it” half of the pitch.',
    result: 'In active development',
    poster: '',
    reel: '',
    inDevelopment: true,
    hasCasePage: true,
    to: '/forma-curate',
  },

  // ── Tier 2 — standard ──────────────────────────────────────────────────────
  {
    id: 'white-lotus-pixel',
    type: 'work',
    tier: 2,
    title: 'White Lotus × Pixel',
    client: 'Google Pixel',
    role: 'Creative / Production',
    dates: '2024',
    categories: ['CTV'],
    story:
      'A culture-tied Pixel moment built around one of the year’s most talked-about shows. Concept through delivery.',
    result: 'Premium entertainment tie-in',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
  {
    id: 'culture-creators',
    type: 'work',
    tier: 2,
    title: 'Culture & Creators',
    client: 'Google',
    role: 'Creative Lead',
    dates: '2024 — 2025',
    categories: ['CTV', 'Experiential'],
    story:
      'A bundle of creator-driven programs across the Google portfolio. Never hide the talent — the names are the flex.',
    result: 'Multi-creator program slate',
    poster: '',
    reel: '',
    hasCasePage: true,
    bundle: [
      { name: 'Hot Ones', partner: '' },
      { name: 'Chicken Shop Date', partner: '' },
      { name: 'Drag Queen Mocktail Class', partner: '' },
      { name: 'Joe Ando × Keke Palmer', partner: 'custom dress moment' },
      { name: 'New Heights', partner: '' },
    ],
  },
  {
    id: 'google-shopping-talent',
    type: 'work',
    tier: 2,
    title: 'Google Shopping × Talent',
    client: 'Google Shopping',
    role: 'Creative / Production',
    dates: '2024',
    categories: ['CTV'],
    story:
      'Shopping moments built around marquee talent pairings — the kind of cast that earns its own headline.',
    result: 'Talent-led commerce content',
    poster: '',
    reel: '',
    hasCasePage: true,
    bundle: [
      { name: 'Jimmy Kimmel × Benny Blanco', partner: '' },
      { name: '+ more', partner: '' },
    ],
  },
  {
    id: 'complex-google',
    type: 'work',
    tier: 2,
    title: 'Complex × Google',
    client: 'Google · Complex',
    role: 'Creative / Production',
    dates: '2024',
    categories: ['CTV'],
    story:
      'A run of Complex franchises reworked around Google products — sneakers, puppies, and GOAT debates with the right faces attached.',
    result: 'Franchise-native brand integration',
    poster: '',
    reel: '',
    hasCasePage: true,
    bundle: [
      { name: 'GOAT Talk', partner: 'Wyclef Jean × Search' },
      { name: 'Complex Sneakers', partner: 'Jimmy Butler × Pixel' },
      { name: 'Complex Puppies', partner: '× Pixel' },
    ],
  },
  {
    id: 'uniqlo',
    type: 'work',
    tier: 2,
    title: 'UNIQLO',
    client: 'UNIQLO',
    role: 'Senior Art Director',
    dates: '2017 — 2022',
    categories: ['Experiential'],
    story:
      'Award-winning experiential programs — designed the attendee journey and ran it end to end, from fabrication oversight to on-site ops.',
    result: 'Award-winning activation',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
  {
    id: 'farm-to-turntable',
    type: 'work',
    tier: 2,
    title: 'Farm to Turntable',
    client: "Jean's",
    role: 'Producer / Host',
    dates: '2022 — Present',
    categories: ['Hospitality', 'Experiential'],
    story:
      'Private dinners and cultural programming — food, music, and people in a room. Independent hospitality work, including with Jean’s.',
    result: 'Recurring sold-out series',
    poster: '',
    reel: '',
    hasCasePage: true,
  },

  // ── Tier 3 — range + history ───────────────────────────────────────────────
  {
    id: 'vrbo',
    type: 'work',
    tier: 3,
    title: 'VRBO',
    client: 'VRBO',
    role: 'Senior Art Director',
    dates: '2017 — 2022',
    categories: ['Experiential'],
    story: 'Experiential program produced end to end at Factory 360.',
    result: 'National experiential program',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
  {
    id: 'salesforce',
    type: 'work',
    tier: 3,
    title: 'Salesforce',
    client: 'Salesforce',
    role: 'Senior Art Director',
    dates: '2017 — 2022',
    categories: ['Experiential', 'Production'],
    story: 'Conference activations and attendee journeys at scale.',
    result: 'Flagship conference activation',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
  {
    id: 'azo',
    type: 'work',
    tier: 3,
    title: 'AZO',
    client: 'AZO',
    role: 'Art Director',
    dates: '2017 — 2022',
    categories: ['Production'],
    story: 'Brand production work across launch and retail moments.',
    result: 'Brand launch program',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
  {
    id: 'culturelle',
    type: 'work',
    tier: 3,
    title: 'Culturelle',
    client: 'Culturelle',
    role: 'Art Director',
    dates: '2017 — 2022',
    categories: ['Production'],
    story: 'Brand production and content across consumer touchpoints.',
    result: 'Consumer brand program',
    poster: '',
    reel: '',
    hasCasePage: true,
  },
]

// ── Swatch / bio tiles — the "rest notes" that break up the motion ───────────
// These live in the board but are not part of the work array so they never get
// caught by the work filters. They render as solid color blocks with their hex
// printed small, like a real swatch.
export const SWATCHES = [
  {
    id: 'swatch-olive',
    type: 'swatch',
    tier: 3,
    color: 'olive',
    hex: '#A8B14A',
    text: 'Builds the experience — and the systems that run it.',
    // sits high in the board as a breather after the leads
    insertAfter: 'made-by-google-afterparty',
  },
  {
    id: 'swatch-blue',
    type: 'swatch',
    tier: 3,
    color: 'skyblue',
    hex: '#B7C5CC',
    text: 'Nine years. Calm on the surface, deep underneath. → About',
    opensAbout: true,
    insertAfter: 'farm-to-turntable',
  },
]

// Build the curated board: work tiles in order, with swatch tiles slotted in
// at their `insertAfter` anchors. This is the canonical layout the board always
// resets to.
export function buildCuratedBoard() {
  const board = []
  for (const item of WORK) {
    board.push(item)
    for (const sw of SWATCHES) {
      if (sw.insertAfter === item.id) board.push(sw)
    }
  }
  return board
}

export function getWorkBySlug(slug) {
  return WORK.find((w) => w.id === slug) || null
}
