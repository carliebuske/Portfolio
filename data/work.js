/*
 * work.js — the single source of truth for the moodboard.
 *
 * Add a new project = add one object to WORK below. No layout surgery.
 *
 * Fields:
 *   id         unique slug (used in the case-page URL: case.html?id=...)
 *   type       "work" | "swatch"
 *   tier       1 (oversized, leads the board) | 2 (standard) | 3 (smaller)
 *   title      display title
 *   client     client / partner
 *   role       your role
 *   dates      e.g. "2024"
 *   categories any of: experiential, social, ctv, publisher, production
 *   story      2–3 line story (quick-look + case page)
 *   result     one headline result metric
 *   tone       palette key for the placeholder poster (see TONES in styles)
 *   poster     OPTIONAL image path — when set, overrides the tone placeholder
 *   reel       OPTIONAL embed URL (Vimeo/Mux) — leave "" until assets land
 *   bundle     OPTIONAL [{name, note}] — talent/program names revealed on hover + modal
 *   inDev      OPTIONAL true — frames the case as in-development
 *
 * Swatch/bio tiles (type:"swatch") are the "rest notes": a solid color block
 *   swatchHex  printed small, like a real swatch
 *   bio        one-line voice fragment; clicking opens About
 */

const WORK = [
  {
    id: "pinterest-gemini",
    type: "work",
    tier: 1,
    title: "Pinterest × Gemini",
    client: "Google × Pinterest",
    role: "Creative Lead",
    dates: "2024 — Present",
    categories: ["experiential", "social"],
    tone: "oxblood",
    poster: "",
    reel: "",
    story:
      "The back-to-school partnership pairing Pinterest discovery with Gemini. Leading creative and the production systems behind a multi-surface program.",
    result: "Flagship partnership · multi-surface launch",
  },
  {
    id: "made-by-google-afterparty",
    type: "work",
    tier: 1,
    title: "Made by Google After-Party",
    client: "Google",
    role: "Experiential Producer",
    dates: "2024",
    categories: ["experiential", "production"],
    tone: "ink",
    poster: "",
    reel: "",
    story:
      "The post-keynote celebration for the Made by Google launch — experience design, fabrication oversight, and on-site operations end to end.",
    result: "Hero launch moment for the year's flagship event",
  },
  {
    id: "forma-curate",
    type: "work",
    tier: 1,
    title: "Forma Curate",
    client: "Independent",
    role: "Founder · Building",
    dates: "2025 — In development",
    categories: ["production"],
    tone: "rustic",
    poster: "",
    reel: "",
    inDev: true,
    story:
      "An AI production tool for planning, budgeting, and running creative operations — the proof of the “systems that run it” half of the pitch.",
    result: "In active development",
  },
  {
    id: "swatch-olive",
    type: "swatch",
    tier: 2,
    swatchHex: "#847949",
    bio: "I build the experience — and the systems that run it.",
  },
  {
    id: "white-lotus-pixel",
    type: "work",
    tier: 2,
    title: "White Lotus × Pixel",
    client: "Google Pixel",
    role: "Creative Direction · CTV",
    dates: "2024",
    categories: ["ctv", "social"],
    tone: "olive",
    poster: "",
    reel: "",
    story:
      "A culture-forward Pixel integration riding the White Lotus moment across connected TV and social.",
    result: "Tentpole cultural tie-in",
  },
  {
    id: "farm-to-turntable",
    type: "work",
    tier: 2,
    title: "Farm to Turntable",
    client: "Jean's × Les Enfants du Marché",
    role: "Producer · Hospitality",
    dates: "May 2026 (soon to be a monthly series)",
    categories: ["experiential", "social"],
    tone: "almond",
    poster: "",
    reel: "",
    story:
      "Farm to Turntable — De La Ferme Aux Platines — at Jean's farm in New Hope, PA, with French friends from Les Enfants du Marché. A field dinner that turns into a DJ set: produced end to end, menu to music.",
    result: "Inaugural farm dinner × DJ series",
  },
  {
    id: "culture-creators",
    type: "work",
    tier: 2,
    title: "Culture & Creators",
    client: "Google",
    role: "Creative · Production",
    dates: "2023 — Present",
    categories: ["social", "ctv"],
    tone: "mauve",
    poster: "",
    reel: "",
    bundle: [
      { name: "Hot Ones", note: "" },
      { name: "Chicken Shop Date", note: "" },
      { name: "Drag Queen Mocktail Class", note: "" },
      { name: "Joe Ando × Keke Palmer", note: "dress" },
      { name: "New Heights", note: "" },
    ],
    story:
      "A bundle of creator-led integrations across the biggest names in culture — produced end to end, talent forward.",
    result: "Multi-program creator slate",
  },
  {
    id: "google-shopping-talent",
    type: "work",
    tier: 2,
    title: "Google Shopping × Talent",
    client: "Google Shopping",
    role: "Creative · Production",
    dates: "2024",
    categories: ["social", "ctv"],
    tone: "almond",
    poster: "",
    reel: "",
    bundle: [
      { name: "Jimmy Kimmel × Benny Blanco", note: "" },
      { name: "+ more", note: "" },
    ],
    story:
      "Shoppable talent integrations bringing Google Shopping into late-night and creator culture.",
    result: "Talent-led shopping activations",
  },
  {
    id: "complex-google",
    type: "work",
    tier: 2,
    title: "Complex × Google",
    client: "Complex × Google",
    role: "Creative · Production",
    dates: "2023 — 2024",
    categories: ["publisher", "social", "ctv"],
    tone: "deepox",
    poster: "",
    reel: "",
    bundle: [
      { name: "GOAT Talk", note: "Wyclef Jean × Search" },
      { name: "Complex Sneakers", note: "Jimmy Butler × Pixel" },
      { name: "Complex Puppies", note: "× Pixel" },
    ],
    story:
      "A run of Complex franchises reimagined as Google product showcases — GOAT Talk, Sneakers, and Puppies.",
    result: "Three franchise integrations",
  },
  {
    id: "swatch-blue",
    type: "swatch",
    tier: 3,
    swatchHex: "#B7C5CC",
    bio: "Nine years · experiential, creative direction, innovation.",
  },
  {
    id: "uniqlo",
    type: "work",
    tier: 2,
    title: "UNIQLO",
    client: "UNIQLO",
    role: "Senior Art Director",
    dates: "2017 — 2022",
    categories: ["experiential", "production"],
    tone: "ink",
    poster: "",
    reel: "",
    story:
      "Award-winning experiential programs — experience design and fabrication oversight, produced end to end.",
    result: "Award-winning program",
  },
  {
    id: "vrbo",
    type: "work",
    tier: 3,
    title: "VRBO",
    client: "VRBO",
    role: "Senior Art Director",
    dates: "2017 — 2022",
    categories: ["experiential"],
    tone: "almond",
    poster: "",
    reel: "",
    story: "Experiential program produced end to end at Factory 360.",
    result: "National activation",
  },
  {
    id: "salesforce",
    type: "work",
    tier: 3,
    title: "Salesforce",
    client: "Salesforce",
    role: "Senior Art Director",
    dates: "2017 — 2022",
    categories: ["experiential", "production"],
    tone: "mauve",
    poster: "",
    reel: "",
    story: "Conference activations and attendee journeys at scale.",
    result: "Conference-scale experience",
  },
  {
    id: "azo",
    type: "work",
    tier: 3,
    title: "AZO",
    client: "AZO",
    role: "Senior Art Director",
    dates: "2017 — 2022",
    categories: ["production"],
    tone: "rustic",
    poster: "",
    reel: "",
    story: "Brand production work delivered end to end.",
    result: "Full-funnel production",
  },
  {
    id: "culturelle",
    type: "work",
    tier: 3,
    title: "Culturelle",
    client: "Culturelle",
    role: "Senior Art Director",
    dates: "2017 — 2022",
    categories: ["production"],
    tone: "deepox",
    poster: "",
    reel: "",
    story: "Brand production work delivered end to end.",
    result: "Full-funnel production",
  },
];

// Exposed globally for the no-build setup (app.js + case.js read this).
window.WORK = WORK;
