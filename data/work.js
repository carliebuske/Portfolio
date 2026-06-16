/*
 * work.js, the single source of truth for the moodboard.
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
 *   poster     OPTIONAL image path, when set, overrides the tone placeholder
 *   reel       OPTIONAL embed URL (Vimeo/Mux) or local .mp4, leave "" until assets land
 *   gallery    OPTIONAL array of image paths, rendered as a grid on the case page
 *   bundle     OPTIONAL [{name, note}], talent/program names revealed on hover + modal
 *   inDev      OPTIONAL true, frames the case as in-development
 *
 * Swatch/bio tiles (type:"swatch") are the "rest notes": a solid color block
 *   swatchHex  printed small, like a real swatch
 *   bio        one-line voice fragment; clicking opens About
 */

const WORK = [
  {
    id: "pinterest-gemini",
    type: "work",
    tier: 3,
    title: "Gemini × Pinterest",
    client: "Google × Pinterest",
    role: "Creative & Innovation Director",
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
    title: "Google Pixel",
    client: "Google",
    caseMeta: "Pixel 9 + Gemini · Made by Google 2024 · Google / MFG × Ogilvy",
    role: "Creative & Innovation Director",
    dates: "",
    categories: ["ctv", "social", "publisher"],
    tone: "ink",
    poster: "assets/afterparty/title-card.jpg",
    posterPos: "left center",
    reel: "https://vimeo.com/1201441559",
    gallery: [
      "assets/afterparty/keke.jpg",
      "assets/afterparty/drag-game.jpg",
      "assets/afterparty/puppies.jpg",
      "assets/afterparty/talent.jpg",
      "assets/afterparty/trixie.jpg",
      "assets/afterparty/drag-selfie.jpg",
      "assets/afterparty/pixel-sequins.jpg",
    ],
    bundle: [
      { name: "Keke Palmer", note: "host" },
      { name: "Sean Evans", note: "Hot Ones" },
      { name: "Jimmy Butler", note: "Sneaker Shopping" },
      { name: "Trixie Mattel & Monét X Change", note: "Drag Race" },
      { name: "Joe Ando", note: "Circle to Search" },
    ],
    story:
      "The Made by Google launch usually speaks to tech press. We threw it an After Party instead, a live-to-tape, Keke Palmer–hosted variety show that aired on YouTube right after the event, turning Pixel 9 + Gemini into culture with the internet's favorite talent. It outperformed Google's own Gemini benchmark.",
    sections: [
      {
        h: "The opportunity",
        p: "Made by Google announcements typically reach a narrow room, industry and tech press. The opportunity: make the Pixel 9 + Gemini launch land with a far broader, culture-first audience, through the names and faces Gen Z actually follows.",
      },
      {
        h: "The idea",
        p: "Give Pixel and Gemini the coming-out party they deserve. A live-to-tape, 30-minute variety show, hosted by Keke Palmer, that aired on YouTube immediately after the Made by Google event, then broke apart into social.",
      },
      {
        h: "The execution",
        p: "We humanized the new Pixel 9 features by stitching beloved internet IP into segments, hosted by Keke Palmer, with designer Joe Ando using Circle to Search to design a custom look. Built by one combined Google/WPP team (MFG × Ogilvy), adapting and creating in real time. Partners: BuzzFeed, Complex, First We Feast, Paramount.",
        list: [
          "Hot Ones (First We Feast), Sean Evans",
          "Complex Sneaker Shopping, Joe La Puma + Jimmy Butler",
          "BuzzFeed Puppy Interviews",
          "RuPaul's Drag Race, Trixie Mattel & Monét X Change",
        ],
      },
      {
        h: "Why it matters",
        p: "First-of-its-kind for Google, one combined WPP/Google team breaking silos to run creative + media together across paid, owned, and earned (the \"Modern Marketing Mix\"), turning a product keynote into a cultural moment.",
      },
      {
        h: "My role",
        p: "Creative & Innovation Director on the show, in it from ideation through delivery. I helped shape the concept and segments, briefed and partnered with the IP and media partners (BuzzFeed, Complex, First We Feast, Paramount) and the combined Google/WPP team, and worked hand-in-hand with production through pre-pro, the live-to-tape, and post.",
      },
    ],
    results: [
      "Outperformed Google's Gemini Top View benchmark, 3.57% CTR (vs 3.25%) · 3.63% ER (vs 3.57%)",
      "TikTok drove 40% of all views; Top View ran above benchmark",
      "45 pieces of content · 8 talent · 6 platforms · 23 handles",
      "Created an ownable, repeatable \"After Party\" IP for Google",
    ],
    result: "Outperformed Google's own Gemini benchmark",
  },
  {
    id: "farm-to-turntable",
    type: "work",
    tier: 1,
    title: "Farm to Turntable",
    client: "Jean's × Les Enfants du Marché",
    role: "Producer · Hospitality",
    dates: "",
    categories: ["experiential", "social", "production"],
    tone: "almond",
    poster: "assets/jeans/plates.jpg",
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
      "Farm to Turntable, De La Ferme Aux Platines, at Jean's farm in New Hope, PA, with French friends from Les Enfants du Marché. A field dinner that turns into a DJ set: produced end to end, menu to music. Debuted May 2026, with a monthly series to follow.",
    result: "Inaugural farm dinner × DJ series",
  },
  {
    id: "forma-curate",
    type: "work",
    tier: 3,
    title: "Forma Curate",
    client: "Independent",
    role: "Founder · Building",
    dates: "2026, in development",
    categories: ["production"],
    tone: "rustic",
    poster: "",
    reel: "",
    inDev: true,
    liveApp: "forma/index.html",
    story:
      "Forma Curate is the desktop app I'm building (with AI) to run a whole creative studio from one canvas. Part personal assistant and automated calendar synced to G-Suite, part modular bulletin board you can rearrange at will. It holds the entire operation: a task list and project manager, a production tracker with file folders and a finder, a rolodex for guests, vendors, talent, staff, and clients, an invoice creator and receipt holder, plus a journal, sketchbook, and mood board wired to my Pinterest. Basically my brain, organized in one big canvas. Open the case page to play with the live demo.",
    result: "Work in progress · live interactive demo",
  },
  {
    id: "swatch-olive",
    type: "swatch",
    tier: 3,
    swatchHex: "#847949",
    bio: "this year i bought a circular saw and built and installed custom cabinets, shelves and desks in my nyc apt...",
  },
  {
    id: "white-lotus-pixel",
    type: "work",
    tier: 1,
    title: "Pixel × White Lotus",
    client: "Google Pixel × HBO",
    caseMeta: "Pixel + Gemini × HBO's The White Lotus (Max) · Creative & Innovation Director · 2025",
    role: "Creative & Innovation Director",
    dates: "2025",
    categories: ["experiential", "social", "ctv"],
    tone: "olive",
    poster: "assets/whitelotus/loungers.jpg",
    reel: "https://vimeo.com/1201294355",
    clips: [
      "https://vimeo.com/1201294311",
      "https://vimeo.com/1201294313",
      "https://vimeo.com/1201294314",
      "https://vimeo.com/1201294312",
    ],
    // galleryTop: shown BEFORE the sections (sets the mood), rest shown after
    galleryTop: [
      "assets/whitelotus/title-card.jpg",
      "assets/whitelotus/loungers.jpg",
      "assets/whitelotus/temple.jpg",
    ],
    gallery: [
      "assets/whitelotus/evan-pixel.jpeg",
      "assets/whitelotus/gemini-soup.jpg",
      "assets/whitelotus/gemini-names.jpeg",
      "assets/whitelotus/gym-action.jpeg",
      "assets/whitelotus/pixel-ring.jpeg",
      "assets/whitelotus/pixel-poolside.jpg",
    ],
    bundle: [
      { name: "Evan Ross Katz", note: "superfan-creator" },
      { name: "Nicholas Duvernay", note: "show talent" },
    ],
    story:
      "We didn't interrupt the White Lotus fandom, we joined it. An 8-part miniseries that put a Pixel in the hands of the show's most renowned superfan, turning HBO's most-anticipated premiere into a Pixel + Gemini story. 108.6M impressions. A Clio.",
    sections: [
      {
        h: "The idea",
        p: "Rather than interrupt the White Lotus fandom, we joined it, handing the show's most renowned superfan, Evan Ross Katz, a miniseries of his own with a Pixel in hand, casting the phone and Gemini as the ultimate travel companion.",
      },
      {
        h: "What we made",
        p: "An 8-part miniseries with Evan Ross Katz and show talent Nicholas Duvernay, live across Max, Instagram, and TikTok.",
        list: [
          "Tech exclusivity with the franchise",
          "Season 1–3 title sponsorship + finale takeover on Max",
          "Original social creator content",
          "Interactive ad units",
        ],
      },
      {
        h: "My role",
        p: "Creative & Innovation Director on the partnership, in it from ideation through delivery. I built the concept and talent strategy, briefed and partnered closely with HBO/Max and talent, and worked alongside the production team through pre-pro, on set, and post.",
      },
    ],
    results: [
      "108.6M total campaign impressions",
      "130% overdelivery across all placements on Max",
      "61.6K total social engagements",
      "40 added-value brand mentions, 28 talent posts, 6 The White Lotus posts, 6 press mentions",
    ],
    awards: {
      wins: [
        "Digiday Award, Best Use of Influencer Marketing",
        "MarCom Award, Best in Advertising Campaign (Platinum)",
        "Muse Creative Award, Branded Content / Influencer Marketing",
        "Clio Awards, 3× Bronze (Influencer & Talent Storytelling; Digital, Mobile & Social; Use of Influencer & Talent)",
      ],
      more: "Shortlists and finalist nods at Festival of Media North America, OMMA, Smarties, Epica, and Mediapost Planning & Buying Awards.",
    },
    result: "108.6M impressions · Digiday + 3× Clio",
  },
  {
    id: "gemini-leslie-olympics",
    type: "work",
    tier: 1,
    title: "Try it with Gemini × Olympics",
    client: "Google Gemini × NBCUniversal",
    caseMeta: "Google Gemini × NBCUniversal · feat. Leslie Jones · Paris 2024 Olympics · Media Futures Group (Google) / WPP",
    role: "Creative & Innovation Director",
    dates: "2024",
    categories: ["ctv"],
    tone: "blue",
    poster: "assets/olympics/OLYMPICS-LESLIE4.jpeg",
    reel: "https://vimeo.com/1201304029",
    clips: [
      "https://vimeo.com/1201304028",
      "https://vimeo.com/1201304025",
    ],
    gallery: [
      "assets/olympics/leslie-gemini.jpg",
      "assets/olympics/OLYMPICS-LESLIE1.jpeg",
      "assets/olympics/OLYMPICS-LESLIE2.jpeg",
      "assets/olympics/OLYMPICS-LESLIE3.jpeg",
      "assets/olympics/OLYMPICS-LESLIE5.jpeg",
    ],
    bundle: [{ name: "Leslie Jones", note: "host" }],
    story:
      "The Olympics inspire everyone, not just athletes, to try something new. We cast Leslie Jones, the Games' most beloved superfan commentator, and used Gemini to help her act on her Olympic-sized inspirations. A series of :30 CTV spots that ran live inside the Games' commercial breaks, reacting in near-real time.",
    sections: [
      {
        h: "The opportunity",
        p: "Google wanted to show Gemini's breadth during the Paris 2024 Olympics, not as a product demo, but as something that showed up inside the moment. NBC and Peacock's live coverage gave us a live stage.",
      },
      {
        h: "The idea",
        p: "Cast the Games' own superfan commentator, Leslie Jones, and use Gemini to help her act on her Olympic-sized inspirations in real time. :30 CTV spots that aired live inside the commercial breaks, reacting to what was actually happening in the Games rather than sitting as static, pre-made ads.",
      },
      {
        h: "My role",
        p: "Creative & Innovation Director, I concepted the format, briefed and partnered with NBCUniversal, and worked with production through pre-pro, on set, and through post and the live broadcast.",
      },
    ],
    result: "Live in-broadcast Gemini CTV with Leslie Jones · Paris 2024",
  },
  {
    id: "google-one-day-paris",
    type: "work",
    tier: 1,
    title: "Team USA in Paris × Google",
    client: "Google Gemini × Team USA",
    caseMeta: "Google Gemini × Team USA · One Day in Paris social series · Paris 2024 Olympics · Media Futures Group (Google) / WPP",
    role: "Creative & Innovation Director",
    dates: "2024",
    categories: ["social", "production"],
    tone: "blue",
    poster: "assets/olympics/OLYMPICSUS9.png",
    reel: "https://vimeo.com/1201304022",
    gallery: [
      "assets/olympics/cafe-coffee.jpg",
      "assets/olympics/lens.jpg",
      "assets/olympics/gemini-captions.jpg",
      "assets/olympics/team-usa-card.jpg",
      "assets/olympics/athlete-phone.jpg",
      "assets/olympics/monument.jpg",
    ],
    bundle: [
      { name: "Missy Franklin", note: "Team USA" },
      { name: "Jagger Eaton", note: "Team USA" },
      { name: "Dani Aravich", note: "Team USA" },
      { name: "Ilona & Olivia", note: "Team USA" },
    ],
    story:
      "Gemini as a Parisian coach, confidant, and tour guide. Five Team USA athletes used Google AI to navigate a real day in Paris, food, getting around, language, culture, each episode themed to that athlete's own life. 1–2 min hero episodes + :30 cutdowns, using Gemini, Maps, Lens, and Circle to Search.",
    sections: [
      {
        h: "The idea",
        p: "Gemini as a Parisian coach, confidant, and tour guide, given to five Team USA athletes to navigate a real day in the city, each episode shaped by their own interests and personality.",
      },
      {
        h: "The episodes",
        p: "Format: 1–2 min hero videos + :30 cutdowns, using Gemini, Maps, Lens, and Circle to Search.",
        list: [
          "Vintage Shopping with Laurie, fashion",
          "City of Love with Missy Franklin, casual learning + art",
          "Off the Beaten Path with Dani Aravich, ideation + trip planning",
          "Iconic Paris Views with Jagger Eaton, trip planning",
          "Pastry Tour with Ilona & Olivia, food",
        ],
      },
      {
        h: "My role",
        p: "Creative & Innovation Director, I concepted the series, briefed and partnered with Team USA, and worked hands-on with production through pre-pro, on set in Paris, and through post and the social rollout.",
      },
    ],
    result: "Five-episode Team USA social series · Paris 2024",
  },
  {
    id: "culture-creators",
    type: "work",
    hidden: true,
    tier: 2,
    title: "Culture & Creators",
    client: "Google",
    role: "Creative & Innovation Director",
    dates: "2023–Present",
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
      "A bundle of creator-led integrations across the biggest names in culture, produced end to end, talent forward.",
    result: "Multi-program creator slate",
  },
  {
    id: "google-shopping-talent",
    type: "work",
    tier: 2,
    title: "Google Shopping × Jimmy Kimmel",
    client: "Google Shopping × Kimmelot",
    caseMeta:
      "Google Shopping × Kimmelot · hosted by Jimmy Kimmel · Q4 2024 holiday",
    role: "Lead Creative, originated & led the game-show format",
    dates: "2024",
    categories: ["social", "ctv", "experiential"],
    tone: "almond",
    poster: "assets/gameshow/giftit-tilecover.png",
    reel: "assets/gameshow/kimmel-blanco.mp4",
    gallery: [
      "assets/gameshow/shopping-mood9.png",
      "assets/gameshow/shopping-mood14.png",
      "assets/gameshow/shopping-mood5.png",
      "assets/gameshow/shopping-mood1.png",
      "assets/gameshow/shopping-mood2.png",
      "assets/gameshow/shopping-mood3.png",
      "assets/gameshow/shopping-mood4.png",
      "assets/gameshow/shopping-mood6.png",
      "assets/gameshow/shopping-mood8.png",
      "assets/gameshow/shopping-mood10.png",
      "assets/gameshow/shopping-mood11.png",
      "assets/gameshow/shopping-mood12.png",
      "assets/gameshow/shopping-mood13.png",
    ],
    bundle: [
      { name: "Jimmy Kimmel", note: "host" },
      { name: "Atsuko Okatsuka × Ronny Chieng", note: "" },
      { name: "Robin Thede × Roy Wood Jr.", note: "" },
      { name: "Joel Kim Booster × Matt Rogers", note: "" },
      { name: "Kelsey Plum × Kahleah Copper", note: "" },
      { name: "Benny Blanco × Eric André", note: "" },
    ],
    story:
      "We didn't run an ad for Google Shopping, we turned it into must-watch TV. Can You GIFT It? is an original game show hosted by Jimmy Kimmel where the game board is the Shopping Deals page, and finding the best deal is how you win. Five celebrity duos, one peak-season culture moment, 961M impressions, and 530K people taken straight to the Deals page.",
    sections: [
      {
        h: "The opportunity",
        p: "Holiday shopping is the most stressful stretch of the year. Google Shopping wanted to own that tension, positioning itself as the stress-reducer that makes finding the right gift (and the best deal) easy, with a clear business goal: drive incremental usage during the Q4 peak and send traffic to the Shopping Deals page.",
      },
      {
        h: "The idea",
        p: "Game shows are having a cultural resurgence, so rather than interrupt that moment with advertising, we built our own: Can You GIFT It?, an original game show for Google Shopping with a game board built directly from the Shopping Deals page. The creative challenge was to fold real Google Shopping tools and deals messaging into actual game mechanics, so the product is the gameplay, without ever breaking the fun of a real game show.",
      },
      {
        h: "The execution",
        p: "An original game show hosted by Jimmy Kimmel (via Kimmelot), with a game board featuring the live Shopping Deals page, categories, price drops, and trend questions become the rounds (e.g. “What western-themed look had a 65% increase in Google Searches?” → Cowboy Hat). Five celebrity duos already inside a Q4 promo cycle, actors, musicians, comedians, and athletes, played alongside Kimmel, amplified across a social- and digital-first plan anchored by Google's YouTube channel.",
        list: [
          "Atsuko Okatsuka & Ronny Chieng",
          "Robin Thede & Roy Wood Jr.",
          "Joel Kim Booster & Matt Rogers",
          "Kelsey Plum & Kahleah Copper",
          "Benny Blanco & Eric André",
        ],
      },
      {
        h: "Why it worked",
        p: "The product surfaced through genuine gameplay, real deals, real price trends, real search data, so the Shopping integration landed as entertainment, not a demo. It met the brief on both sides: incremental usage during the peak period, and a lift in brand perception through positive viewer sentiment.",
      },
      {
        h: "My role",
        p: "Lead Creative, I originated and led the original game-show format, building the mechanic that turns the Shopping Deals page into the game board and partnering across talent, Kimmelot, and production from concept through delivery.",
      },
    ],
    results: [
      "530K unique visits to the Google Shopping Deals page, the KPI",
      "961M total impressions",
      "163M total views",
      "32M views on Google's YouTube channel",
      "12M IG followers reached via talent",
    ],
    result: "961M impressions · 530K visits to the Deals page",
  },
  {
    id: "goat-talk-search",
    type: "work",
    tier: 1,
    title: "Google Search × GOAT Talk",
    client: "Google Search × Complex",
    caseMeta: "Google Search (Education) × Complex · feat. Wyclef Jean & his daughter Claudinelle · Q4 2025",
    role: "Creative & Innovation Director",
    dates: "Q4 2025",
    categories: ["social", "publisher", "ctv", "production"],
    tone: "deepox",
    poster: "assets/goattalk/table-cards.jpg",
    reel: "https://vimeo.com/1201304026",
    gallery: [
      "assets/goattalk/table-wide.jpg",
      "assets/goattalk/wyclef.jpg",
      "assets/goattalk/daughter-pixel.jpg",
      "assets/goattalk/ai-mode.jpg",
      "assets/goattalk/cards-pixel.jpg",
    ],
    bundle: [
      { name: "Wyclef Jean", note: "" },
      { name: "Claudinelle Jean", note: "daughter" },
    ],
    story:
      "A daughter schools her dad, Wyclef Jean, on the future of search. A special edition of Complex's top-performing show that turned the generation gap into the format, teaching students Google's new AI tools through a debate they actually wanted to watch.",
    sections: [
      {
        h: "The brief",
        p: "Google Search wanted to reach students with its new AI features, AI Mode, AI Overviews, Lens \"Point & Ask,\" and Practice Quizzes, and show how search now handles deeper, layered, follow-up questions. The challenge: make product education feel like culture, not a tutorial.",
      },
      {
        h: "The insight",
        p: "Reach students through nostalgia and the generation gap. Pair a legacy, broadly-beloved artist with his own recently-graduated daughter, and let the kid school the parent on how search works now. The generational dynamic becomes both the hook and the teaching mechanism, Wyclef was perfect for the multi-gen reach.",
      },
      {
        h: "The idea",
        p: "A special edition of GOAT Talk, Complex's top-performing show by views, built so the show's signature card-draw debate stays fully intact. We just let key questions \"double-click\" into real, layered uses of Google's Search AI, so the learning happens inside the banter.",
      },
      {
        h: "The execution",
        p: "Built to live as a full YouTube episode and cut down to run independently on social.",
        list: [
          "\"Powered by Google\" cold open",
          "Three branded segments woven in: AI Mode · Lens Point & Ask · Practice Quizzes",
          "Animated AI Mode motion graphics",
          "Google Pixel phones in both guests' hands throughout",
          "Real use cases on screen, plot summaries via Lens, layered follow-ups in AI Mode, customizable study quizzes",
        ],
      },
      {
        h: "Why it works",
        p: "It doesn't fight the format, it uses GOAT Talk's existing DNA. The product surfaces through genuine questions (a movie's plot, an IMAX debate, \"my dorm room is bleak, help\"), so the education lands as conversation, not a demo.",
      },
      {
        h: "My role",
        p: "Creative & Innovation Director on the partnership, from the generation-gap insight through delivery. I shaped the concept and the format integration that kept GOAT Talk intact, briefed and partnered with Complex and talent, and stayed hands-on with production through pre-pro, the shoot, and the YouTube + social cutdowns.",
      },
    ],
    result: "Product education that played as culture, not a tutorial",
  },
  {
    id: "swatch-blue",
    type: "swatch",
    tier: 3,
    swatchHex: "#B7C5CC",
    bio: "I have 20+ stuffed animals, including Jeffery, a 5-ft giraffe.",
  },
  {
    id: "uniqlo",
    type: "work",
    tier: 2,
    title: "UNIQLO, Wear Your World",
    client: "UNIQLO",
    caseMeta: "UNIQLO · UT graphic-tee launch · 4 markets (LA, SF, NYC, Boston) · 2018 · produced with Factory 360",
    role: "Creative Lead, ideation → pre-production → production → onsite",
    dates: "2018",
    categories: ["experiential", "production"],
    tone: "ink",
    poster: "assets/uniqlo/uniqlo1.jpeg",
    reel: "https://www.youtube.com/watch?v=Is75C1EulJw",
    gallery: [
      "assets/uniqlo/uniqlo2.jpeg",
      "assets/uniqlo/uniqlo3.jpeg",
      "assets/uniqlo/uniqlo4.jpeg",
      "assets/uniqlo/uniqlo5.jpeg",
      "assets/uniqlo/uniqlo6.jpeg",
      "assets/uniqlo/uniqlo7.jpeg",
      "assets/uniqlo/uniqlo8.jpeg",
      "assets/uniqlo/uniqlo9.jpeg",
      "assets/uniqlo/uniqlo10.jpeg",
    ],
    story:
      "UNIQLO's UT graphic tees, turned into a four-city block party. A two-phase street-and-city activation across LA, SF, NYC, and Boston that displayed the tees like artwork and made them the centerpiece of a block-party spectacle, with a free trip to Tokyo on the line. 3.5M+ impressions, 23,759 samples in hands, 6,138 attendees.",
    sections: [
      {
        h: "The opportunity",
        p: "Launch UNIQLO's new collection of UT graphic t-shirts across four markets. The client's criteria were specific: a footprint that fit the urban landscape of each city, that displayed the tees like artwork, while still creating a block-party feel with multiple touchpoints for consumers to engage.",
      },
      {
        h: "The idea",
        p: "Wear Your World, treat the graphic tees as wearable art, and build a two-phase activation that earns the street first, then throws the party. Phase one seeds presence at ground level; phase two converts it into a spectacle.",
      },
      {
        h: "The execution",
        p: "A two-phase activation, owned concept through onsite, events, graphic design, installations, mobile tours, pop-ups, PR stunts, production, and sampling.",
        list: [
          "Phase 1, Street teams distributed promotional clothespins and scratch-off cards on the weekends leading up to each city activation, building presence market by market",
          "Phase 2, #WearYourWorld Block Parties in LA, SF, and NYC transformed the collection into a visual spectacle displaying the UT shirts as art",
          "Activities and photo ops invited passersby in; entrants could win a free trip to Tokyo, doubling as a powerful data-capture driver",
        ],
      },
      {
        h: "My role",
        p: "Creative Lead, ideation through onsite execution across four markets. I originated the 'Wear Your World' concept, led the art direction and environmental design, and ran production from pre-pro through the multi-city tour.",
      },
    ],
    results: [
      "3,587,967 impressions",
      "6,138 attendees",
      "23,759 samples distributed",
      "10,805 RSVPs",
      "24,468 website visitors",
      "3,278 opted in to future mail",
    ],
    result: "3.5M+ impressions · 23,759 samples · four-market activation",
  },
  {
    id: "vrbo",
    type: "work",
    tier: 3,
    title: "Vrbo Partner Summit, Electric Cowboy",
    client: "Vrbo",
    caseMeta: "Vrbo · Annual Partner Summit · Scottsdale, AZ · 2019 · produced with Factory 360",
    role: "Creative Lead, ideation → pre-production → production → onsite",
    dates: "2019",
    categories: ["experiential", "production"],
    tone: "almond",
    poster: "assets/vrbo/vrbo7.jpeg",
    reel: "https://vimeo.com/381546277?fl=pl&fe=cm",
    gallery: [
      "assets/vrbo/vrbo1.jpeg",
      "assets/vrbo/vrbo2.jpeg",
      "assets/vrbo/vrbo3.jpeg",
      "assets/vrbo/vrbo4.jpeg",
      "assets/vrbo/vrbo5.jpeg",
      "assets/vrbo/vrbo6.jpeg",
      "assets/vrbo/vrbo8.jpeg",
      "assets/vrbo/vrbo9.jpeg",
      "assets/vrbo/vrbo10.jpeg",
      "assets/vrbo/vrbo11.jpeg",
      "assets/vrbo/vrbo12.jpeg",
      "assets/vrbo/vrbo13.jpeg",
      "assets/vrbo/vrbo14.jpeg",
      "assets/vrbo/vrbo15.jpeg",
      "assets/vrbo/vrbo16.jpeg",
    ],
    story:
      "Vrbo's top property owners, dropped into an 'Electric Cowboy' world. For the second year of Vrbo's annual Partner Summit, I led the creative for a sold-out conference that fused Scottsdale's western landscape with Vrbo's future-facing tech story, three edge-lit acrylic stages, a western town built entirely from light, and a fireworks-capped opening night. 600 attendees. Sold out.",
    sections: [
      {
        h: "The opportunity",
        p: "The Partner Summit is Vrbo's annual conference, the moment its top property owners come together to learn and collaborate. Year two moved to Scottsdale, AZ. The challenge: take a B2B educational conference and make it feel like a branded experience worthy of Vrbo's innovation story, rooted in its desert setting rather than fighting it.",
      },
      {
        h: "The idea",
        p: "Electric Cowboy, fuse the western surroundings of Scottsdale with the future-focused subject matter of the conference. An art direction that brings tech and western culture together, using materials visually associated with technology and the future so the room itself tells the innovation story.",
      },
      {
        h: "The execution",
        p: "Three stages, three landscapes: each stage design represented a different western landscape, but built from edge-lit acrylic, so the western world was rendered in light and tech, physically embodying Vrbo's dedication to innovation. The opening reception was a western town built from light, with photobooth, electronic music, and a fireworks display.",
        list: [
          "Three edge-lit acrylic stages, each a different western landscape",
          "Opening reception: western town built from light + photobooth + fireworks",
          "Environmental & graphic design",
          "Production & tour management end to end",
        ],
      },
      {
        h: "My role",
        p: "Creative Lead, ideation through onsite execution. I originated the 'Electric Cowboy' concept, led the art direction and environmental design, managed production partnerships, and directed the experience onsite.",
      },
    ],
    results: [
      "600 attendees",
      "Sold-out conference",
    ],
    result: "600-person sold-out conference · originate-and-build experiential",
  },
  {
    id: "salesforce",
    type: "work",
    hidden: true,
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
    tier: 2,
    title: "AZO",
    client: "AZO",
    role: "Creative Direction · Production",
    dates: "2022",
    categories: ["production", "social"],
    tone: "rustic",
    poster: "assets/azo/azo1.jpeg",
    reel: "assets/azo/azo-tvc.mp4",
    gallery: [
      "assets/azo/azo2.jpeg",
      "assets/azo/azo3.jpeg",
      "assets/azo/azo4.jpeg",
      "assets/azo/azo5.jpeg",
      "assets/azo/azo6.jpeg",
      "assets/azo/azo7.jpeg",
      "assets/azo/azo8.jpeg",
      "assets/azo/azo9.jpeg",
      "assets/azo/azo10.jpeg",
      "assets/azo/azo11.jpeg",
      "assets/azo/azo12.jpeg",
      "assets/azo/azo13.jpeg",
      "assets/azo/azo14.jpeg",
      "assets/azo/azo15.jpeg",
      "assets/azo/azo16.jpeg",
      "assets/azo/azo17.jpeg",
      "assets/azo/azo18.jpeg",
      "assets/azo/azo19.jpeg",
    ],
    story:
      "A full-funnel campaign blending product education with brand storytelling, shot end to end with focus on real moments, texture, and the confidence AZO brings to everyday wellness.",
    sections: [
      {
        h: "The approach",
        p: "Creative direction shaped every frame, from product placement to color palette to the emotional beats of each scene. Production handled end to end, balancing brand guidelines with authentic, relatable storytelling.",
      },
      {
        h: "My role",
        p: "Creative Direction + Production. I built the visual language, oversaw the shoot, and shaped post-production to ensure every asset, from TVC to social, felt cohesive and on-brand.",
      },
    ],
    awards: {
      wins: [
        "Comm Awards, Advertising Campaign Category",
      ],
    },
    result: "Award-winning TVC & social campaign · full-funnel production",
  },
  {
    id: "culturelle",
    type: "work",
    tier: 3,
    title: "Women Are Built Different",
    client: "Culturelle",
    caseMeta: "Culturelle × Women Are Built Different · TVC, Social & Digital Campaign",
    role: "Art Direction; Campaign Strategy; Production; On-Set Creative Direction",
    dates: "2023",
    categories: ["production", "ctv", "social"],
    tone: "deepox",
    poster: "assets/culturelle/06222022_CULTURELLE_SHOT_1_9_R2.jpeg",
    reel: "assets/culturelle/tvc-widescreen.mp4",
    gallery: [
      "assets/culturelle/06222022_CULTURELLE_SHOT_2_65_R2.jpeg",
      "assets/culturelle/06222022_CULTURELLE_SHOT_3_267_R2.jpeg",
      "assets/culturelle/06222022_CULTURELLE_SHOT_4_105_R2.jpeg",
      "assets/culturelle/06222022_CULTURELLE_SHOT_4_158_R2.jpeg",
      "assets/culturelle/06222022_CULTURELLE_SHOT_4_84_R2.jpeg",
      "assets/culturelle/06222022_CULTURELLE_SHOT_5_11_R2.jpeg",
      "assets/culturelle/06222022_CULTURELLE_SHOT_7_39_R3.jpeg",
    ],
    story:
      "A bold, color-driven campaign about women's health and resilience. Each scene owned its own Culturelle brand color, pink, green, yellow, building a visual language that's both intimate and commanding. TVC, social, and digital ad campaign built end to end.",
    sections: [
      {
        h: "The idea",
        p: "Women's wellness isn't one-note, it's complex, resilient, built on intention. The campaign gave each story its own bold visual identity: a color universe that made the brand feel expansive and human at once.",
      },
      {
        h: "The approach",
        p: "Art direction shaped the whole campaign. Each scene assigned a distinct Culturelle brand color, hot pink, vibrant green, rich yellow, so the color itself became the storytelling device. The result is a campaign that's visually unmissable and deeply on-brand.",
        list: [
          "TVC (broadcast + digital)",
          "Social & influencer cut-downs",
          "Digital ad campaign",
          "On-set color-first creative direction",
        ],
      },
      {
        h: "My role",
        p: "Art Direction + Campaign Strategy + Production + On-Set Creative Direction. I built the color language and visual strategy from the start, oversaw production through pre-pro and on-set, and ensured every frame honored the Culturelle brand through intentional, bold color.",
      },
    ],
    awards: {
      wins: [
        "Comm Awards, Award of Distinction",
      ],
    },
    result: "Award-winning TVC & social campaign · bold color-first creative",
  },
];

// Exposed globally for the no-build setup (app.js + case.js read this).
window.WORK = WORK;
