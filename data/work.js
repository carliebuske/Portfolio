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
    title: "Google Pixel — After Party",
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
    tagline: "Tech keynote, meet culture.",
    story:
      "The Made by Google launch usually speaks to tech press. We gave it an after party instead.<br /><br />Hosted by Keke Palmer, the live-to-tape variety show aired immediately after the event, pairing Pixel 9 and Gemini with some of the internet's favorite personalities—from Sean Evans and Jimmy Butler to Trixie Mattel and Monét X Change.<br /><br />The result: a product launch that felt more like culture than a keynote.",
    caseIntro:
      "The Made by Google launch typically speaks to a room full of tech press. We wanted Pixel 9 and Gemini to reach everyone else.<br /><br />So instead of ending the event, we extended it—with After Party, a live-to-tape variety show hosted by Keke Palmer that aired immediately after the keynote and brought Pixel into the worlds people were already paying attention to.",
    sections: [
      {
        h: "The opportunity",
        p: "Pixel launches are built for attention, but attention isn't the same thing as culture.<br /><br />The opportunity was to take a product announcement designed for industry insiders and give it a second life with the audiences actually driving conversation online.",
      },
      {
        h: "The idea",
        p: "Give Pixel and Gemini the coming-out party they deserved.<br /><br />A live-to-tape variety show hosted by Keke Palmer, featuring talent people actually choose to spend time with, released immediately after the keynote and designed to break apart across social.",
      },
      {
        h: "The execution",
        p: "We used beloved internet formats as the delivery system.<br /><br />Sean Evans brought Hot Ones. Jimmy Butler stopped by Sneaker Shopping. Trixie Mattel and Monét X Change entered from the Drag Race universe. Designer Joe Ando used Circle to Search to build a custom look in real time.<br /><br />Every segment translated Pixel features into something more human: entertainment.<br /><br />Built by one combined Google + WPP team alongside BuzzFeed, Complex, First We Feast, and Paramount.",
      },
      {
        h: "Why it matters",
        p: "Most product launches end when the keynote does.<br /><br />This one became a show.<br /><br />After Party proved that product marketing doesn't have to feel like product marketing. It can earn attention the same way everything else does: by being worth watching.",
      },
      {
        h: "My role",
        p: "Creative & Innovation Director from concept through launch.<br /><br />I helped shape the show's format, talent integrations, and creative approach, partnering closely with production, platform partners, media teams, and talent stakeholders from development through live execution and post-production.",
      },
    ],
    resultsHeading: "A few receipts.",
    results: [
      "Outperformed Google's Gemini Top View benchmark, 3.57% CTR (vs 3.25%) · 3.63% ER (vs 3.57%)",
      "TikTok drove 40% of all views; Top View ran above benchmark",
      "45 pieces of content · 8 talent · 6 platforms · 23 handles",
      "Created an ownable, repeatable \"After Party\" IP for Google",
    ],
    result: "Turned a keynote into appointment viewing.",
  },
  {
    id: "farm-to-turntable",
    type: "work",
    tier: 1,
    title: "Farm to Turntable",
    client: "Jean's × Les Enfants du Marché",
    role: "Event Producer · Creative Lead",
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
    tagline: "Dinner first. Dancing later.",
    story:
      "A field dinner that slowly became a dance floor.<br /><br />Created with Les Enfants du Marché and chef Louis Mizb, Farm to Turntable brought a long-table dinner to Jean's farm in New Hope, Pennsylvania, before easing into a sunset DJ set under the open sky.<br /><br />Guests spent the afternoon foraging, pickling, building bouquets, and finding their seats by way of heirloom tomatoes hand-lettered with their names.<br /><br />Everything on the table came from the farm—including the table itself.",
    caseIntro:
      "Farm to Turntable began with a simple question: what happens when a farm dinner refuses to end after dessert?<br /><br />Created alongside Les Enfants du Marché at Jean's farm in New Hope, Pennsylvania, the evening combined seasonal cooking, hands-on experiences, and a DJ set that carried guests from golden hour into the night.<br /><br />Part dinner party. Part field trip. Part dance floor.",
    sections: [
      {
        h: "The opportunity",
        p: "People are craving experiences that feel real again.<br /><br />Not bigger. Not louder. Just thoughtful enough to remember.<br /><br />The goal was to create a gathering that felt deeply connected to place, season, and the people around the table.",
      },
      {
        h: "The idea",
        p: "Let the farm design the event.<br /><br />Guests spent the afternoon wandering the property, foraging, pickling, arranging bouquets, and meeting one another before dinner.<br /><br />When it was time to sit, each place setting was marked with an heirloom tomato hand-lettered with the guest's name.<br /><br />Dinner unfolded in the field before naturally giving way to music, drinks, and dancing.",
      },
      {
        h: "What we made",
        p: "An inaugural dinner and DJ series with Les Enfants du Marché and chef Louis Mizb.<br /><br />Highlights included:",
        list: [
          "Foraging throughout the farm",
          "Seasonal pickling workshops",
          "Build-your-own bouquet stations",
          "Personalized heirloom tomato place cards",
          "Farm-grown tablescapes and florals",
          "Open-fire cooking",
          "Sunset dinner transitioning into a DJ set",
        ],
      },
      {
        h: "The details",
        p: "The tablescape was built almost entirely from materials sourced directly from the farm.<br /><br />Vegetables, flowers, herbs, and natural elements were gathered and arranged to make the landscape feel like an extension of the table itself.<br /><br />Every heirloom tomato was hand-lettered individually. Because sometimes the smallest details are the ones people photograph first.",
      },
      {
        h: "Why it matters",
        p: "The best events don't feel programmed. They feel discovered.<br /><br />Farm to Turntable wasn't about spectacle. It was about giving people a reason to slow down, get a little dirt on their shoes, and stay longer than they planned.",
      },
      {
        h: "My role",
        p: "Event Producer and Creative Lead.<br /><br />I developed the guest experience, activities, tablescape, creative direction, and event flow from arrival through the final song.<br /><br />From hand-lettering every tomato to sourcing materials from the farm itself, the goal was to make every detail feel personal, considered, and connected to the setting.",
      },
    ],
    result: "Proof that dinner parties still work.",
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
    tagline: "A creative operating system built for people who keep too many tabs open.",
    story:
      "Forma Curate started as a question: what if a creative studio lived on a single canvas?<br /><br />Projects, production, calendars, contacts, invoices, notes, sketches, references, and the thousand loose ends that normally live across twenty tabs—all connected in one place.<br /><br />Essentially my brain, but easier to navigate.",
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
    tagline: "We didn't interrupt the fandom. We joined it.",
    story:
      "We didn't interrupt the White Lotus fandom. We joined it.<br /><br />As anticipation for HBO's biggest premiere reached a fever pitch, we handed a Pixel to the show's most devoted superfan and let him take everyone along for the ride.<br /><br />The result was an 8-part miniseries that turned Pixel and Gemini into the ultimate travel companions—and one of the internet's favorite vacation companions.<br /><br />108.6M impressions later, people seemed to enjoy the trip.",
    caseIntro:
      "We didn't interrupt the White Lotus fandom. We joined it.<br /><br />Rather than inserting a brand into the conversation around HBO's most anticipated premiere, we found someone who was already leading it.<br /><br />So we handed White Lotus superfan Evan Ross Katz a Pixel and built a travel series around the experience, turning fandom into storytelling and Pixel into part of the adventure.",
    sections: [
      {
        h: "The opportunity",
        p: "The White Lotus didn't need more advertising.<br /><br />It already had an audience dissecting every frame, theory, outfit, and side-eye online.<br /><br />The opportunity wasn't to create attention. It was to participate in it.",
      },
      {
        h: "The idea",
        p: "Instead of marketing to White Lotus fans, we made something for them.<br /><br />We partnered with Evan Ross Katz, arguably the internet's most dedicated White Lotus correspondent, and sent him into the world with a Pixel in hand.<br /><br />The phone became part travel companion, part storyteller, and part backstage pass.",
      },
      {
        h: "What we made",
        p: "An 8-part social miniseries featuring Evan Ross Katz and White Lotus cast member Nicholas Duvernay, released across Max, Instagram, TikTok, and HBO social channels.<br /><br />The partnership included:",
        list: [
          "Original creator-led content",
          "Pixel and Gemini integrations throughout the series",
          "Franchise sponsorship and season-long presence",
          "Interactive experiences and social extensions",
        ],
      },
      {
        h: "Why it worked",
        p: "People don't want brands in their fandoms.<br /><br />They want brands that understand them.<br /><br />By building with existing fan behavior instead of interrupting it, Pixel became part of the conversation rather than an ad sitting beside it.",
      },
      {
        h: "My role",
        p: "Creative & Innovation Director from pitch through production.<br /><br />I developed the partnership concept and talent approach, worked closely with HBO/Max, talent, and production partners, and helped guide the project from strategy through filming, post-production, and launch.",
      },
    ],
    resultsHeading: "Turns out people like vacationing with Evan Ross Katz.",
    results: [
      "108.6M total campaign impressions",
      "130% overdelivery across all placements on Max",
      "61.6K total social engagements",
      "40 added-value brand mentions, 28 talent posts, 6 The White Lotus posts, 6 press mentions",
    ],
    awardsHeading: "A few souvenirs.",
    awards: {
      wins: [
        "Digiday Award, Best Use of Influencer Marketing",
        "MarCom Award, Best in Advertising Campaign (Platinum)",
        "Muse Creative Award, Branded Content / Influencer Marketing",
        "Clio Awards, 3× Bronze (Influencer & Talent Storytelling; Digital, Mobile & Social; Use of Influencer & Talent)",
      ],
      more: "Shortlists and finalist nods at Festival of Media North America, OMMA, Smarties, Epica, and Mediapost Planning & Buying Awards.",
    },
    result: "108.6 million reasons to pack a Pixel.",
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
