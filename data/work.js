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
 *   reel       OPTIONAL embed URL (Vimeo/Mux) or local .mp4 — leave "" until assets land
 *   gallery    OPTIONAL array of image paths — rendered as a grid on the case page
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
    dates: "2026",
    categories: ["experiential", "social"],
    tone: "oxblood",
    poster: "",
    reel: "",
    comingSoon: true,
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
    dates: "",
    categories: ["experiential", "production"],
    tone: "ink",
    poster: "",
    reel: "",
    bundle: [
      { name: "Complex Sneakers", note: "Jimmy Butler × Pixel" },
      { name: "Complex Puppies", note: "× Pixel" },
    ],
    story:
      "The post-keynote celebration for the Made by Google launch — experience design, fabrication oversight, and on-site operations end to end.",
    result: "Hero launch moment for the year's flagship event",
  },
  {
    id: "farm-to-turntable",
    type: "work",
    tier: 1,
    title: "Farm to Turntable",
    client: "Jean's × Les Enfants du Marché",
    role: "Producer · Hospitality",
    dates: "",
    categories: ["experiential", "social"],
    tone: "almond",
    poster: "assets/jeans/grill-carrots.jpg",
    reel: "https://vimeo.com/1201115528",
    gallery: [
      "assets/jeans/dinner.jpg",
      "assets/jeans/table.png",
      "assets/jeans/grill-carrots.jpg",
      "assets/jeans/fire-racks.jpg",
      "assets/jeans/produce.jpg",
      "assets/jeans/fire-prep.jpg",
      "assets/jeans/plates.jpg",
      "assets/jeans/chef.jpg",
      "assets/jeans/centerpiece.png",
      "assets/jeans/merch.jpg",
      "assets/jeans/place-card.jpg",
      "assets/jeans/tractor.jpg",
    ],
    story:
      "Farm to Turntable — De La Ferme Aux Platines — at Jean's farm in New Hope, PA, with French friends from Les Enfants du Marché. A field dinner that turns into a DJ set: produced end to end, menu to music. Debuted May 2026, with a monthly series to follow.",
    result: "Inaugural farm dinner × DJ series",
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
    title: "The White Lotus × Pixel",
    client: "Google Pixel × HBO",
    caseMeta: "Pixel + Gemini × HBO's The White Lotus (Max) · Creative & Innovation Lead · 2025",
    role: "Creative & Innovation Lead",
    dates: "2025",
    categories: ["experiential", "social", "ctv"],
    tone: "olive",
    poster: "",
    reel: "https://vimeo.com/1201294355",
    clips: [
      "https://vimeo.com/1201294311",
      "https://vimeo.com/1201294313",
      "https://vimeo.com/1201294314",
      "https://vimeo.com/1201294312",
    ],
    bundle: [
      { name: "Evan Ross Katz", note: "superfan-creator" },
      { name: "Nicholas Duvernay", note: "show talent" },
    ],
    story:
      "We didn't interrupt the White Lotus fandom — we joined it. An 8-part miniseries that put a Pixel in the hands of the show's most renowned superfan, turning HBO's most-anticipated premiere into a Pixel + Gemini story. 108.6M impressions. A Clio.",
    sections: [
      {
        h: "The idea",
        p: "Rather than interrupt the White Lotus fandom, we joined it — handing the show's most renowned superfan, Evan Ross Katz, a miniseries of his own with a Pixel in hand, casting the phone and Gemini as the ultimate travel companion.",
      },
      {
        h: "What we made",
        p: "An 8-part miniseries with Evan Ross Katz and show talent Nicholas Duvernay — live across Max, Instagram, and TikTok.",
        list: [
          "Tech exclusivity with the franchise",
          "Season 1–3 title sponsorship + finale takeover on Max",
          "Original social creator content",
          "Interactive ad units",
        ],
      },
      {
        h: "My role",
        p: "Creative & innovation lead — concept, talent strategy, and cross-platform production from idea through rollout.",
      },
    ],
    results: [
      "108.6M total campaign impressions",
      "130% overdelivery across all placements on Max",
      "61.6K total social engagements",
      "40 added-value brand mentions — 28 talent posts, 6 The White Lotus posts, 6 press mentions",
    ],
    awards: {
      wins: [
        "Digiday Award — Best Use of Influencer Marketing",
        "MarCom Award — Best in Advertising Campaign (Platinum)",
        "Muse Creative Award — Branded Content / Influencer Marketing",
        "Clio Awards — 3× Bronze (Influencer & Talent Storytelling; Digital, Mobile & Social; Use of Influencer & Talent)",
      ],
      more: "Shortlists and finalist nods at Festival of Media North America, OMMA, Smarties, Epica, and Mediapost Planning & Buying Awards.",
    },
    result: "108.6M impressions · Digiday + 3× Clio",
  },
  {
    id: "gemini-paris-olympics",
    type: "work",
    tier: 2,
    title: "Gemini × Paris 2024 Olympics",
    client: "Google Gemini × NBCUniversal",
    caseMeta: "Google Gemini × NBCUniversal Olympics & Team USA · Paris 2024 · Media Futures Group (Google) / WPP",
    role: "Creative & Innovation Lead",
    dates: "2024",
    categories: ["ctv", "social"],
    tone: "blue",
    poster: "",
    reel: "",
    bundle: [
      { name: "Leslie Jones", note: "" },
      { name: "Missy Franklin", note: "Team USA" },
      { name: "Jagger Eaton", note: "Team USA" },
      { name: "Dani Aravich", note: "Team USA" },
    ],
    story:
      "Two pieces of Google's Gemini story for the Paris 2024 Olympics: a live CTV series with Leslie Jones that aired inside the Games' commercial breaks, and One Day in Paris, where five Team USA athletes used Gemini to navigate the city.",
    sections: [
      {
        h: "Context",
        p: "Google's Paris 2024 partnership — across NBC, Peacock, and Team USA — was built to show the breadth of its AI. My work focused on two pieces of that program.",
      },
      {
        h: "Try It with Gemini · feat. Leslie Jones",
        p: "The Olympics inspire everyone, not just athletes, to try something new — so we cast Leslie Jones, the Games' resident superfan commentator, and used Gemini to help her act on her Olympic-sized inspirations. A series of :30 CTV spots that ran live, inside the Olympics' commercial breaks, reacting to the Games in near-real time rather than sitting as static pre-made ads.",
      },
      {
        h: "One Day in Paris · Team USA social series",
        p: "Gemini as a Parisian coach, confidant, and tour guide. Five Team USA athletes used Google AI to navigate a real day in Paris — food, getting around, language, culture — each episode themed to that athlete's own interests. Format: 1–2 min hero videos + :30 cutdowns, using Gemini, Maps, Lens, and Circle to Search.",
        list: [
          "Vintage Shopping with Laurie — fashion",
          "City of Love with Missy Franklin — casual learning + art",
          "Off the Beaten Path with Dani Aravich — ideation + trip planning",
          "Iconic Paris Views with Jagger Eaton — trip planning",
          "Pastry Tour with Ilona & Olivia — food",
        ],
      },
      {
        h: "My role",
        p: "Creative & innovation lead across both pieces — concept, talent, and production from idea through the broadcast and social cutdowns.",
      },
    ],
    result: "Live in-broadcast CTV with Leslie Jones + a Team USA social series",
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
    id: "goat-talk-search",
    type: "work",
    tier: 2,
    title: "GOAT Talk × Google Search",
    client: "Google Search × Complex",
    caseMeta: "Google Search (Education) × Complex · feat. Wyclef Jean & his daughter Claudinelle · Q4 2025",
    role: "Creative & Innovation Lead",
    dates: "Q4 2025",
    categories: ["social", "publisher", "ctv"],
    tone: "deepox",
    poster: "",
    reel: "",
    bundle: [
      { name: "Wyclef Jean", note: "" },
      { name: "Claudinelle Jean", note: "daughter" },
    ],
    story:
      "A daughter schools her dad — Wyclef Jean — on the future of search. A special edition of Complex's top-performing show that turned the generation gap into the format, teaching students Google's new AI tools through a debate they actually wanted to watch.",
    sections: [
      {
        h: "The brief",
        p: "Google Search wanted to reach students with its new AI features — AI Mode, AI Overviews, Lens \"Point & Ask,\" and Practice Quizzes — and show how search now handles deeper, layered, follow-up questions. The challenge: make product education feel like culture, not a tutorial.",
      },
      {
        h: "The insight",
        p: "Reach students through nostalgia and the generation gap. Pair a legacy, broadly-beloved artist with his own recently-graduated daughter, and let the kid school the parent on how search works now. The generational dynamic becomes both the hook and the teaching mechanism — Wyclef was perfect for the multi-gen reach.",
      },
      {
        h: "The idea",
        p: "A special edition of GOAT Talk — Complex's top-performing show by views — built so the show's signature card-draw debate stays fully intact. We just let key questions \"double-click\" into real, layered uses of Google's Search AI, so the learning happens inside the banter.",
      },
      {
        h: "The execution",
        p: "Built to live as a full YouTube episode and cut down to run independently on social.",
        list: [
          "\"Powered by Google\" cold open",
          "Three branded segments woven in: AI Mode · Lens Point & Ask · Practice Quizzes",
          "Animated AI Mode motion graphics",
          "Google Pixel phones in both guests' hands throughout",
          "Real use cases on screen — plot summaries via Lens, layered follow-ups in AI Mode, customizable study quizzes",
        ],
      },
      {
        h: "Why it works",
        p: "It doesn't fight the format — it uses GOAT Talk's existing DNA. The product surfaces through genuine questions (a movie's plot, an IMAX debate, \"my dorm room is bleak — help\"), so the education lands as conversation, not a demo.",
      },
      {
        h: "My role",
        p: "Led creative and innovation on the partnership — the generation-gap insight, the format integration that kept GOAT Talk intact, talent strategy, and production oversight from concept through the YouTube and social cutdowns.",
      },
    ],
    result: "Product education that played as culture, not a tutorial",
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
    dates: "2019",
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
    dates: "2019",
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
    dates: "2018",
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
    dates: "2022",
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
    dates: "2023",
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
