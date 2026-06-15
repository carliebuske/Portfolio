/* ============================================================
   APP — nav shell + hash router + tweaks + mount
   ============================================================ */
(function () {
const { useHash, Icon } = window.UI;
const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakColor, TweakSelect } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "prioCount": 5,
  "accent": "#6b2a2f",
  "headingFont": "Cormorant Garamond"
}/*EDITMODE-END*/;

const FONT_STACKS = {
  'Cormorant Garamond': "'Cormorant Garamond', Georgia, serif",
  'Spectral': "'Spectral', Georgia, serif",
  'Newsreader': "'Newsreader', Georgia, serif",
};
const ACCENTS = [ '#6b2a2f', '#6e6a3f', '#5f7884', '#5e3a54' ]; // oxblood, olive, harbor, plum

const NAV = [
  { href: '#/', icon: 'home', label: 'Bulletin', key: 'priorities' },
  { href: '#/calendar', icon: 'calendar', label: 'Calendar' },
  { href: '#/projects', icon: 'projects', label: 'Projects', key: 'projects' },
  { href: '#/journal', icon: 'journal', label: 'Journal & Goals' },
  { href: '#/rolodex', icon: 'rolodex', label: 'Rolodex', key: 'people' },
  { href: '#/vendors', icon: 'vendors', label: 'Vendors', key: 'vendors' },
  { href: '#/invoices', icon: 'invoice', label: 'Invoices', key: 'invoices' },
];

function Sidebar({ route }) {
  const { data, resetAll } = window.FC.useStore();
  const isActive = (href) => {
    const path = '#/' + (route.split('/')[1] || '');
    if (href === '#/') return route === '/' || route === '';
    return path === href || (href === '#/projects' && route.startsWith('/project')) || (href === '#/invoices' && route.startsWith('/invoice'));
  };
  return React.createElement('aside', { className: 'sidebar' },
    React.createElement('a', { href: '#/', className: 'brand' },
      React.createElement('div', { className: 'mark' }, 'Forma', React.createElement('br'), React.createElement('em', null, 'Curate')),
      React.createElement('div', { className: 'tag' }, 'Form & space \u00b7 NYC')),
    React.createElement('nav', { className: 'nav' },
      NAV.map(n => React.createElement('a', { key: n.href, href: n.href, className: isActive(n.href) ? 'active' : '' },
        React.createElement(Icon, { name: n.icon, className: 'ico' }),
        React.createElement('span', null, n.label),
        n.key && React.createElement('span', { className: 'count' }, (data[n.key] || []).length)))),
    React.createElement('div', { className: 'foot' },
      React.createElement('div', null, data.profile.email),
      React.createElement('button', { onClick: resetAll, type: 'button',
        style: { background: 'none', border: 'none', color: 'var(--ink-3)', padding: '8px 0 0', fontSize: 10, fontFamily: 'var(--mono)', cursor: 'pointer', letterSpacing: '0.06em' } },
        'Reset data')));
}

function Router({ route, tweaks }) {
  const seg = route.split('/').filter(Boolean);
  if (seg[0] === 'calendar') return React.createElement(window.Calendar);
  if (seg[0] === 'projects') return React.createElement(window.Projects);
  if (seg[0] === 'project' && seg[1]) return React.createElement(window.ProjectDetail, { pid: seg[1] });
  if (seg[0] === 'journal') return React.createElement(window.Journal);
  if (seg[0] === 'rolodex') return React.createElement(window.Rolodex);
  if (seg[0] === 'vendors') return React.createElement(window.Vendors);
  if (seg[0] === 'invoices') return React.createElement(window.Invoices);
  if (seg[0] === 'invoice' && seg[1]) return React.createElement(window.InvoiceDetail, { id: seg[1] });
  return React.createElement(window.Dashboard, { tweaks });
}

function App() {
  const route = useHash();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const themeStyle = {
    '--wine': t.accent,
    '--wine-deep': 'color-mix(in oklab, ' + t.accent + ', #000 20%)',
    '--wine-tint': 'color-mix(in oklab, ' + t.accent + ' 14%, transparent)',
    '--serif': FONT_STACKS[t.headingFont] || FONT_STACKS['Cormorant Garamond'],
  };

  return React.createElement('div', { className: 'app', style: themeStyle },
    React.createElement(Sidebar, { route }),
    React.createElement('main', { className: 'main' }, React.createElement(Router, { route, tweaks: t })),
    React.createElement(TweaksPanel, { title: 'Tweaks' },
      React.createElement(TweakSection, { label: 'Bulletin' }),
      React.createElement(TweakSlider, { label: 'Priorities shown', value: t.prioCount, min: 3, max: 12, unit: '', onChange: v => setTweak('prioCount', v) }),
      React.createElement(TweakSection, { label: 'Theme' }),
      React.createElement(TweakColor, { label: 'Accent', value: t.accent, options: ACCENTS, onChange: v => setTweak('accent', v) }),
      React.createElement(TweakSelect, { label: 'Heading font', value: t.headingFont, options: ['Cormorant Garamond', 'Spectral', 'Newsreader'], onChange: v => setTweak('headingFont', v) })));
}

function Root() {
  return React.createElement(window.FC.StoreProvider, null, React.createElement(App));
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Root));
})();
