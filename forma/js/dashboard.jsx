/* ============================================================
   BULLETIN (home) — a flexible visual journal/canvas.
   Uses the shared CanvasKit. Bulletin-only widgets: priorities,
   thisweek. Common blocks (image/quote/goal/reminder) come from
   the kit.
   ============================================================ */
(function () {
const e = React.createElement;
const { useState, Fragment } = React;
const { Icon, Check, IconBtn, Editable } = window.UI;
const { fmtDue, dueState } = window.CanvasKit;

/* ---------- masthead almanac ---------- */
function AlmanacWidget() {
  const wx = window.WX.useWeather();
  const { time, date } = window.WX.useClock();
  return e('div', { className: 'almanac' },
    e('div', { className: 'alm-time' },
      e('span', { className: 'alm-clock' }, time),
      e('span', { className: 'alm-date' }, date)),
    e('div', { className: 'alm-wx' },
      wx
        ? e(Fragment, null,
            e('span', { className: 'alm-emoji' }, window.WX.wxEmoji(wx.current.code)),
            e('span', { className: 'alm-temp' }, wx.current.temp + '\u00b0'),
            e('span', { className: 'alm-cond' }, window.WX.wxLabel(wx.current.code), e('br'), 'New York, NY'))
        : e('span', { className: 'alm-cond' }, 'New York, NY')));
}

/* ---------- a single priority row ---------- */
function BulletinRow({ item, onToggle, onEdit }) {
  const { LEVELS, laneOf } = window.FC;
  const lvl = LEVELS[item.level] || LEVELS.med;
  const lane = laneOf(item.lane);
  const ds = dueState(item.due);
  return e('div', { className: 'prio-row' + (item.done ? ' done' : '') },
    e(Check, { on: item.done, onClick: onToggle }),
    e('div', { className: 'prio-body', onClick: onEdit },
      e('div', { className: 'prio-line1' },
        e('span', { className: 'lvl-pill ' + item.level }, lvl.label),
        e('span', { className: 'prio-text' }, item.text)),
      e('div', { className: 'prio-line2' },
        e('span', { className: 'tag ' + lane.cls }, e('span', { className: 'dot' }), item.projTitle),
        item.due && e('span', { className: 'due-chip ' + ds }, e(Icon, { name: 'calendar' }), fmtDue(item.due)),
        item.notes && e('span', { className: 'has-note', title: item.notes }, e(Icon, { name: 'journal' })))),
    e('div', { className: 'prio-actions' },
      item.project && e('a', { className: 'iconbtn', href: '#/project/' + item.project, title: 'Open project', onClick: ev => ev.stopPropagation() }, e(Icon, { name: 'projects' })),
      e(IconBtn, { icon: 'edit', onClick: onEdit, title: 'Edit' })));
}

/* ---------- priorities widget (Bulletin-only) ---------- */
function PrioritiesWidget({ N, onNew, onEdit }) {
  const { data, update } = window.FC.useStore();
  const [level, setLevel] = useState('All');
  const [showAll, setShowAll] = useState(false);
  let items = window.TASKS.gather(data);
  if (level !== 'All') items = items.filter(i => i.level === level.toLowerCase());
  const lvlRank = { high: 0, med: 1, low: 2 };
  items.sort((a, b) => (a.done - b.done) || (lvlRank[a.level] - lvlRank[b.level]) || ((a.due || '9999') > (b.due || '9999') ? 1 : -1));
  const openCount = items.filter(i => !i.done).length;
  const visible = showAll ? items : items.slice(0, N);
  const toggle = (item) => update(d => window.TASKS.toggle(d, item));
  return e(Fragment, null,
    e('div', { className: 'wg-head' },
      e('div', null,
        e('span', { className: 'eyebrow' }, 'The Bulletin'),
        e('h2', { className: 'wg-h2' }, 'Priorities \u2014 ', e('span', { className: 'count-em' }, openCount + ' open'))),
      e('button', { className: 'btn sm', onClick: onNew, type: 'button' }, e('span', { className: 'plus' }, '+'), 'Add task')),
    e('div', { className: 'filter-chips' },
      ['All', 'High', 'Medium', 'Low'].map(l => e('button', { key: l, type: 'button', className: 'chip lvl-chip ' + l.toLowerCase() + (level === l ? ' on' : ''), onClick: () => setLevel(l) }, l))),
    e('div', { className: 'prio-list' },
      visible.map(item => e(BulletinRow, { key: item.kind + '-' + item.project + '-' + item.id, item, onToggle: () => toggle(item), onEdit: () => onEdit(item) })),
      visible.length === 0 && e('div', { className: 'empty' }, 'Nothing here \u2014 add a task')),
    items.length > N && e('button', { className: 'show-more', type: 'button', onClick: () => setShowAll(s => !s) },
      showAll ? 'Show less' : 'Show ' + (items.length - N) + ' more', e(Icon, { name: showAll ? 'back' : 'arrow', className: showAll ? 'sm-up' : 'sm-down' })));
}

/* ============================================================ */
function Bulletin({ tweaks }) {
  const T = tweaks || { prioCount: 5 };
  const N = T.prioCount || 5;
  const { data, update } = window.FC.useStore();
  const [editing, setEditing] = useState(null); // null | 'new' | task

  const renderBody = (w) => {
    if (w.type === 'priorities') return e(PrioritiesWidget, { N, onNew: () => setEditing('new'), onEdit: (t) => setEditing(t) });
    if (w.type === 'thisweek') return e(window.ThisWeekWidget);
    return null;
  };

  return e('div', { className: 'wrap' },
    e('header', { className: 'masthead' },
      e('div', { className: 'mast-top' },
        e('div', null,
          e('div', { className: 'eyebrow' }, 'Studio Bulletin \u00b7 ' + data.profile.location),
          e('h1', { className: 'mast-title' }, 'Forma ', e('em', null, 'Curate'))),
        e(AlmanacWidget)),
      e('div', { className: 'mast-bio' },
        e(Editable, { value: data.profile.bio, multiline: true, onChange: (v) => update(d => { d.profile.bio = v; }) })),
      e('div', { className: 'mast-meta' },
        e('span', { className: 'mast-email' }, data.profile.email))),

    e(window.CanvasKit.Canvas, {
      storeKey: 'bulletin', slotPrefix: 'bulletin', renderBody,
      addTypes: ['image', 'quote', 'goal', 'reminder'],
      fixedTypes: { priorities: true, thisweek: true },
      menuLabel: 'New journal block',
      extraDep: data.priorities.length + '|' + JSON.stringify(data.workspaces).length }),

    editing && e(window.TaskEditor, { task: editing === 'new' ? null : editing, onClose: () => setEditing(null) }));
}

window.Bulletin = Bulletin;
window.Dashboard = Bulletin;
})();
