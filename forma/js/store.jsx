/* ============================================================
   STORE v5 — unified sections (lanes) across Bulletin / Calendar /
   Projects. window.FC = { StoreProvider, useStore, uid, LANES,
   laneOf, projectsByLane, INDUSTRIES, ROLES, LEVELS, ACCENTS }
   ============================================================ */
const { createContext, useContext, useState, useEffect, useCallback, useRef } = React;

const STORE_KEY = 'formaCurate.v5';
const uid = () => Math.random().toString(36).slice(2, 9);

/* ---- the 8 SECTIONS (a.k.a lanes) — shared everywhere ---- */
const LANES = [
  { key: 'jeans',       label: 'Jean\u2019s',       cls: 'wine'  },
  { key: 'formacurate', label: '@formacurate',      cls: 'aqua'  },
  { key: 'carbie',      label: '@car.bie',          cls: 'plum'  },
  { key: 'events',      label: 'Events',            cls: 'ochre' },
  { key: 'interior',    label: 'Interior Design',   cls: 'olive' },
  { key: 'personal',    label: 'Personal',          cls: 'mauve' },
  { key: 'travel',      label: 'Travel',            cls: 'clay'  },
  { key: 'admin',       label: 'Admin',             cls: 'taupe' },
];
const laneOf = (key) => LANES.find(l => l.key === key) || LANES[LANES.length - 1];

const ACCENTS = ['olive', 'aqua', 'wine', 'ochre', 'sage', 'mauve', 'plum', 'clay', 'taupe', 'ink'];
const INDUSTRIES = ['Interior Client', 'Brand', 'Hospitality', 'Music', 'Beverage', 'Media & Press', 'Talent', 'Vendor', 'Other'];
const ROLES = ['Client', 'Guest list', 'Talent', 'Sponsor', 'Press', 'Collaborator', 'Friend', 'Vendor'];
const LEVELS = { high: { label: 'High', cls: 'wine' }, med: { label: 'Medium', cls: 'ochre' }, low: { label: 'Low', cls: 'sage' } };

/* ============================================================ */
const mkWidget = (type, extra) => Object.assign({ id: uid(), type, size: 'w1' }, extra || {});
function defaultBulletin() {
  const w = mkWidget;
  return [
    w('priorities', { size: 'w2' }),
    w('quote', { text: 'Curating form and space; occasionally making a scene worth gathering around.', by: 'Forma Curate' }),
    w('thisweek'),
    w('image', { tall: true }),
    w('goal', { text: 'Land the CR \u00d7 Monastery campaign', done: false }),
    w('reminder', { text: 'Invoice Jean\u2019s \u2014 Farm to Turntable', date: '2026-06-19' }),
    w('image'),
    w('image'),
  ];
}

function seed() {
  const td = (text, level, due, notes) => ({ id: uid(), text, done: false, level: level || 'med', due: due || '', notes: notes || '' });
  return {
    profile: {
      name: 'Forma Curate',
      bio: 'Curating form and space; occasionally making a scene worth gathering around.',
      location: 'New York, NY', email: 'seen@formacurate.com',
    },

    /* ---------- BULLETIN canvas widgets (draggable journal blocks) ---------- */
    bulletin: defaultBulletin(),

    /* ---------- JOURNAL canvas (modular blocks) ---------- */
    journalCanvas: [
      mkWidget('image', { tall: true }),
      mkWidget('quote', { text: 'Gather what is beautiful; the rest will follow.', by: '' }),
      mkWidget('reminder', { text: 'Press flowers from the foraging shoot', date: '2026-06-15' }),
    ],

    /* ---------- CALENDAR canvas (modular blocks) ---------- */
    calendarCanvas: [
      mkWidget('milestones', { size: 'w2' }),
      mkWidget('image', { tall: true }),
      mkWidget('note', { text: '' }),
    ],

    /* standalone "general" bulletin tasks (no project) */
    priorities: [
      { id: uid(), text: 'Block a planning morning this week', project: '', lane: 'admin', level: 'low', due: '', done: false },
    ],

    /* ---------- PROJECTS (each belongs to a section/lane) ---------- */
    projects: [
      { id: 'evans',   lane: 'interior', title: 'Evans Home',           location: 'California',     accent: 'olive', status: 'In progress' },
      { id: 'rachel',  lane: 'interior', title: 'Rachel\u2019s Apartment', location: 'London',      accent: 'olive', status: 'In progress' },
      { id: 'myapt',   lane: 'interior', title: 'My Apartment',         location: 'New York, NY',   accent: 'olive', status: 'Ongoing' },
      { id: 'abby',    lane: 'interior', title: 'Abby\u2019s Home',      location: 'Connecticut',    accent: 'olive', status: 'In progress' },
      { id: 'jeans-ops',       lane: 'jeans', title: 'Org Chart & Operations', location: 'Jean\u2019s', accent: 'wine', status: 'Active' },
      { id: 'jeans-events',    lane: 'jeans', title: 'Events',           location: 'Jean\u2019s \u00b7 ongoing', accent: 'wine', status: 'Active' },
      { id: 'jeans-campaigns', lane: 'jeans', title: 'Campaigns',        location: 'Jean\u2019s \u00b7 retainer', accent: 'wine', status: 'Upcoming' },
      { id: 'formacurate', lane: 'formacurate', title: '@formacurate',   location: 'Content channel', accent: 'aqua', status: 'Ongoing' },
      { id: 'carbie',      lane: 'carbie',      title: '@car.bie',       location: 'Content channel', accent: 'plum', status: 'Ongoing' },
      { id: 'cr-monastery', lane: 'events', title: 'Cynthia Rowley \u00d7 Monastery', location: 'Brand campaign', accent: 'ochre', status: 'Building' },
      { id: 'personal', lane: 'personal', title: 'Personal & Home',      location: 'At home \u00b7 life', accent: 'mauve', status: 'Ongoing' },
      { id: 'travel',   lane: 'travel',   title: 'Travel',               location: 'Trips & plans',  accent: 'clay', status: 'Ongoing' },
      { id: 'cowboy',   lane: 'admin',    title: 'Cowboy Bar',           location: 'Bend, Oregon \u00b7 Phil (freelance)', accent: 'taupe', status: 'In progress' },
      { id: 'adminops', lane: 'admin',    title: 'Admin & Operations',   location: 'Studio ops',     accent: 'taupe', status: 'Ongoing' },
    ],

    /* ---------- project workspaces (the single source of tasks) ---------- */
    workspaces: {
      evans:  { notes: 'Full home. Coastal-modern, warm minimalism.', todos: [ td('Confirm furniture plan w/ Evans', 'high', '2026-06-23'), td('Source dining lighting (Schoolhouse)', 'med'), { id: uid(), text: 'Send moodboard for living room', done: true, level: 'med', due: '', notes: '' } ], files: [], collaborators: [ { id: uid(), name: 'Evans Family', role: 'Client', linked: true } ] },
      rachel: { notes: 'Pied-\u00e0-terre. English eclectic, layered.', todos: [ { id: uid(), text: 'Measure + floor plan', done: true, level: 'med', due: '', notes: '' }, td('Vintage sourcing \u2014 1stDibs + Chairish', 'high') ], files: [], collaborators: [] },
      myapt:  { notes: 'Also the content engine: DIY shelves, cabinets, palettes.', todos: [ { id: uid(), text: 'Shoot DIY shelves & cabinets', done: true, level: 'med', due: '', notes: '' } ], files: [], collaborators: [] },
      abby:   { notes: 'Family home, Connecticut.', todos: [ td('Initial walkthrough notes', 'med') ], files: [], collaborators: [] },
      'jeans-ops': { notes: 'Org chart + operating system for Jean\u2019s.', todos: [ td('Draft org chart', 'high', '2026-06-22', 'Roles, reporting lines, who owns events vs ops.'), td('Document roles + SOPs', 'med') ], files: [], collaborators: [] },
      'jeans-events': { notes: 'Recurring events programming.', todos: [ td('Farm to Turntable run-of-show', 'high', '2026-06-20'), td('Invoice Farm to Turntable', 'high', '2026-06-19', 'Event design + production fee.') ], files: [], collaborators: [] },
      'jeans-campaigns': { notes: 'Retainer campaigns \u2014 incoming.', todos: [ td('Come up with an event/campaign for Jean\u2019s', 'med'), td('Scope retainer deliverables', 'med') ], files: [], collaborators: [] },
      formacurate: { notes: 'Main account \u2014 interiors, foraging, palettes.', todos: [ td('Foraging reel', 'med', '', 'Gathered stems from Tue shoot.'), td('Southampton carousel', 'med', '2026-06-17'), td('Two color-palette carousels', 'med'), td('Post DIY shelves & cabinets (my apt)', 'low', '2026-06-26'), td('Post the antiques house from Eze village', 'low') ], files: [], collaborators: [] },
      carbie: { notes: 'Second account \u2014 events, travel, weddings.', todos: [ td('Gather, edit & post Kylie\u2019s wedding pics', 'high', '2026-06-24'), td('Edit & post Southampton', 'med', '2026-06-17'), td('Post Japan', 'low') ], files: [], collaborators: [] },
      'cr-monastery': { notes: 'Refined social campaign. Define pillars + shot list.', todos: [ td('Build refined CR \u00d7 Monastery campaign', 'high', '2026-06-30', 'Concept, pillars, shot list, deliverables.'), td('Present to CR + Monastery', 'low') ], files: [], collaborators: [ { id: uid(), name: 'Cynthia Rowley', role: 'Collaborator', linked: true }, { id: uid(), name: 'Monastery', role: 'Collaborator', linked: true } ] },
      personal: { notes: 'Home, family, birthdays, life admin.', todos: [ td('Deep clean + laundry', 'low', '2026-06-14'), td('Mom\u2019s birthday \u2014 plan something', 'med', '2026-06-27') ], files: [], collaborators: [] },
      travel: { notes: 'Trips and conflicts to protect the calendar.', todos: [ td('Weekend upstate \u2014 book stay', 'low', '2026-06-21') ], files: [], collaborators: [] },
      cowboy: { notes: 'Freelance design \u2014 cowboy bar in Bend, OR for Phil.', todos: [ td('Make Phil his cowboy bar merch', 'high', '2026-06-18'), td('Send Phil merch proofs', 'med') ], files: [], collaborators: [ { id: uid(), name: 'Phil', role: 'Client', linked: true } ] },
      adminops: { notes: 'Invoicing, inbox, studio operations.', todos: [ td('Weekly invoicing block', 'med') ], files: [], collaborators: [] },
    },

    /* ---------- weekly cadence (coloured by section/lane) ---------- */
    weekly: {
      Mon: [ { id: uid(), lane: 'admin', text: 'Plan the week \u00b7 ideas' }, { id: uid(), lane: 'admin', text: 'Inbox + invoicing block' } ],
      Tue: [ { id: uid(), lane: 'formacurate', text: 'Content shoot day' }, { id: uid(), lane: 'formacurate', text: 'Forage / source stems' } ],
      Wed: [ { id: uid(), lane: 'formacurate', text: 'Edit + cut reels' }, { id: uid(), lane: 'carbie', text: 'Draft captions' } ],
      Thu: [ { id: uid(), lane: 'formacurate', text: 'Post day \u2014 @formacurate' }, { id: uid(), lane: 'interior', text: 'Client / project work' } ],
      Fri: [ { id: uid(), lane: 'carbie', text: 'Post day \u2014 @car.bie' }, { id: uid(), lane: 'admin', text: 'Send invoices + follow-ups' } ],
      Sat: [ { id: uid(), lane: 'events', text: 'Events / scout spaces' } ],
      Sun: [ { id: uid(), lane: 'personal', text: 'Gather inspiration \u00b7 rest' } ],
    },

    /* ---------- THIS WEEK highlights (scrapbook timeline: trips, experiences, memories) ----------
       { id, title, subtitle, kind, start, end }  — kind: trip|event|experience|memory|rest */
    weekHighlights: [
      { id: uid(), title: 'Foraging shoot', subtitle: 'Upstate \u00b7 stems for the reel', kind: 'experience', start: 'Tue', end: 'Tue' },
      { id: uid(), title: 'Dinner with the girls', subtitle: 'West Village \u00b7 late one', kind: 'memory', start: 'Wed', end: 'Wed' },
      { id: uid(), title: 'South Carolina with Max', subtitle: 'Charleston \u00b7 long weekend away', kind: 'trip', start: 'Thu', end: 'Sun' },
    ],

    /* ---------- calendar EVENTS / meetings (separate from tasks) ----------
       { id, lane, text, project?, notes, dates:[{id,date,kind,round}] } */
    calEvents: [
      { id: uid(), lane: 'jeans', text: 'Scout space \u2014 downtown loft', project: 'jeans-events', notes: 'Raw loft, good light, ~80 cap.', dates: [{ id: uid(), date: '2026-06-13', kind: 'event' }] },
      { id: uid(), lane: 'formacurate', text: 'Foraging shoot', project: 'formacurate', notes: '', dates: [{ id: uid(), date: '2026-06-14', kind: 'event' }] },
      { id: uid(), lane: 'jeans', text: 'Farm to Turntable', project: 'jeans-events', notes: 'Run-of-show + DJ load-in 4pm.', dates: [{ id: uid(), date: '2026-06-20', kind: 'event' }] },
      { id: uid(), lane: 'travel', text: 'Weekend upstate', project: 'travel', notes: 'Out of town \u2014 no meetings.', dates: [{ id: uid(), date: '2026-06-21', kind: 'start' }, { id: uid(), date: '2026-06-22', kind: 'due' }] },
      { id: uid(), lane: 'personal', text: 'Mom\u2019s birthday \ud83c\udf82', project: 'personal', notes: '', dates: [{ id: uid(), date: '2026-06-27', kind: 'event' }] },
    ],

    /* ---------- ROLODEX ---------- */
    people: [
      { id: uid(), name: 'Kylie', industry: 'Talent', roles: ['Talent', 'Guest list'], email: '', phone: '', ig: '', project: 'carbie', fav: true, notes: 'Wedding content for @car.bie.' },
      { id: uid(), name: 'Evans Family', industry: 'Interior Client', roles: ['Client'], email: '', phone: '', ig: '', project: 'evans', fav: true, notes: 'Full home \u2014 California.' },
      { id: uid(), name: 'Rachel', industry: 'Interior Client', roles: ['Client'], email: '', phone: '', ig: '', project: 'rachel', fav: false, notes: 'Pied-\u00e0-terre, London.' },
      { id: uid(), name: 'Abby', industry: 'Interior Client', roles: ['Client'], email: '', phone: '', ig: '', project: 'abby', fav: false, notes: 'Family home, Connecticut.' },
      { id: uid(), name: 'Cynthia Rowley', industry: 'Brand', groups: ['Brand', 'Talent'], roles: ['Sponsor', 'Collaborator'], email: '', phone: '', ig: '', project: 'cr-monastery', fav: true, notes: 'CR \u00d7 Monastery social campaign.' },
      { id: uid(), name: 'Monastery', industry: 'Brand', roles: ['Collaborator'], email: '', phone: '', ig: '', project: 'cr-monastery', fav: false, notes: 'Co-brand on campaign.' },
      { id: uid(), name: 'Jean\u2019s', industry: 'Hospitality', groups: ['Hospitality', 'Beverage', 'Music'], roles: ['Client'], email: '', phone: '', ig: '', project: 'jeans-ops', fav: true, notes: 'Retainer + events + ops.' },
      { id: uid(), name: 'Phil', industry: 'Other', roles: ['Client'], email: '', phone: '', ig: '', project: 'cowboy', fav: false, notes: 'Cowboy bar, Bend OR.' },
      { id: uid(), name: '[ DJ / artist ]', industry: 'Music', roles: ['Collaborator'], email: '', phone: '', ig: '', project: '', fav: false, notes: 'For event programming + sets.' },
      { id: uid(), name: '[ Spirits brand ]', industry: 'Beverage', roles: ['Sponsor'], email: '', phone: '', ig: '', project: '', fav: false, notes: 'Event sponsorship + bar partner.' },
      { id: uid(), name: '[ Editor / outlet ]', industry: 'Media & Press', roles: ['Press'], email: '', phone: '', ig: '', project: '', fav: false, notes: 'Press for events + interiors.' },
    ],

    /* ---------- VENDORS ---------- */
    vendors: [
      { id: uid(), name: '1stDibs Trade', category: 'Antiques & vintage', discount: '15%', poc: 'Trade desk', pocEmail: 'trade@example.com', pocPhone: '', website: 'https://www.1stdibs.com/trade', login: 'seen@formacurate.com', password: '', notes: 'Vintage + antique sourcing.' },
      { id: uid(), name: 'Chairish Trade', category: 'Vintage furniture', discount: '20%', poc: '', pocEmail: '', pocPhone: '', website: 'https://www.chairish.com/trade', login: 'seen@formacurate.com', password: '', notes: '' },
      { id: uid(), name: 'Lulu and Georgia', category: 'Furniture & rugs', discount: 'To Trade', poc: '', pocEmail: '', pocPhone: '', website: 'https://luluandgeorgia.com', login: 'seen@formacurate.com', password: '', notes: '' },
      { id: uid(), name: 'Schoolhouse', category: 'Lighting & hardware', discount: '15%', poc: '', pocEmail: '', pocPhone: '', website: 'https://schoolhouse.com', login: 'seen@formacurate.com', password: '', notes: '' },
      { id: uid(), name: 'Rejuvenation', category: 'Hardware & lighting', discount: 'Trade', poc: '', pocEmail: '', pocPhone: '', website: 'https://www.rejuvenation.com', login: 'seen@formacurate.com', password: '', notes: '' },
    ],

    /* ---------- INVOICES ---------- */
    invoices: [
      { id: uid(), num: 'FC-1042', client: 'Jean\u2019s', project: 'Farm to Turntable event', due: '2026-06-19', status: 'to-make', items: [ { id: uid(), desc: 'Event design + production', qty: 1, rate: '' } ], notes: '' },
      { id: uid(), num: 'FC-1041', client: 'Evans Family', project: 'Living + dining concept', due: '', status: 'to-make', items: [ { id: uid(), desc: 'Design fee \u2014 phase 1', qty: 1, rate: '' } ], notes: '' },
      { id: uid(), num: 'FC-1040', client: 'Phil \u00b7 Cowboy Bar', project: 'Merch design', due: '', status: 'to-make', items: [ { id: uid(), desc: 'Merch design package', qty: 1, rate: '' } ], notes: '' },
    ],

    /* ---------- JOURNAL & GOALS ---------- */
    journal: [
      { id: uid(), date: '2026-06-10', text: 'Pulled stems for the foraging reel this morning \u2014 the light in the studio was unreal. Need to lock the Jean\u2019s org chart this week.', mood: 'Inspired' },
    ],
    goals: {
      weekly:  [ { id: uid(), text: 'Post 3\u00d7 on @formacurate', done: false }, { id: uid(), text: 'Finish Jean\u2019s org chart', done: false }, { id: uid(), text: 'Send 2 invoices', done: false } ],
      monthly: [ { id: uid(), text: 'Land the CR \u00d7 Monastery campaign', done: false }, { id: uid(), text: 'Grow @formacurate to next milestone', done: false } ],
      yearly:  [ { id: uid(), text: 'Sign the Jean\u2019s retainer', done: false }, { id: uid(), text: 'Host 4 signature Forma Curate gatherings', done: false }, { id: uid(), text: 'Build a real team / org', done: false } ],
    },
    journalNotes: '',
  };
}

/* ---------- helpers ---------- */
function projectsByLane(projects) {
  const map = {};
  LANES.forEach(l => { map[l.key] = []; });
  projects.forEach(p => { (map[p.lane] || (map[p.lane] = [])).push(p); });
  return map;
}

/* ============================================================ */
function loadData() {
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) return migrate(JSON.parse(raw)); } catch (e) {}
  return seed();
}
function migrate(d) {
  const s = seed();
  for (const k of Object.keys(s)) if (d[k] === undefined) d[k] = s[k];
  // nested backfills (fields added after a person started using the app)
  const VENDOR_SITES = {
    '1stdibs trade': 'https://www.1stdibs.com/trade', 'chairish trade': 'https://www.chairish.com/trade',
    'lulu and georgia': 'https://luluandgeorgia.com', 'schoolhouse': 'https://schoolhouse.com',
    'rejuvenation': 'https://www.rejuvenation.com',
  };
  (d.vendors || []).forEach(v => {
    if (v.website === undefined) v.website = VENDOR_SITES[(v.name || '').toLowerCase().trim()] || '';
  });
  (d.people || []).forEach(p => {
    if (!p.groups || !p.groups.length) p.groups = p.industry ? [p.industry] : ['Other'];
  });
  (d.journal || []).forEach(e => { if (e.archived === undefined) e.archived = false; });
  return d;
}

const StoreContext = createContext(null);
function StoreProvider({ children }) {
  const [data, setData] = useState(loadData);
  const first = useRef(true);
  useEffect(() => { if (first.current) { first.current = false; return; } try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {} }, [data]);
  const update = useCallback((fn) => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); fn(next); return next; }), []);
  const resetAll = useCallback(() => { if (confirm('Reset all data to the seeded starting point? This clears your edits.')) { localStorage.removeItem(STORE_KEY); setData(seed()); } }, []);
  return React.createElement(StoreContext.Provider, { value: { data, update, resetAll } }, children);
}
function useStore() { return useContext(StoreContext); }

window.FC = { StoreProvider, useStore, uid, LANES, laneOf, projectsByLane, INDUSTRIES, ROLES, LEVELS, ACCENTS };
