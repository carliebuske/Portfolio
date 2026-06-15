/* ============================================================
   CALENDAR — weekly cadence <-> monthly. Shared 8-section lanes.
   Month shows EVENTS (meetings) + TASKS (due dates). Everything
   filterable by the same section key. Tasks connect to projects.
   ============================================================ */
(function () {
const { useState } = React;
const { Icon, Modal, Field, IconBtn } = window.UI;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_FULL = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const TODAY = { y: 2026, m: 5, d: 11 };
const KIND_GLYPH = { start: '\u25b8', due: '\u25c6', event: '\u25cf' };
const KIND_LABEL = { start: 'Start', due: 'Due', event: 'Event' };
const REPEATS = [['none', 'Does not repeat'], ['weekly', 'Weekly'], ['biweekly', 'Every 2 weeks'], ['monthly', 'Monthly']];
const REPEAT_LABEL = { weekly: 'Weekly', biweekly: 'Every 2 weeks', monthly: 'Monthly' };

/* ---------- shared section legend (filter) ---------- */
function LaneLegend({ LANES, filter, setFilter }) {
  const toggle = (key) => setFilter(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  return React.createElement('div', { className: 'cal-legend lanes' },
    LANES.map(l => React.createElement('button', { key: l.key, type: 'button',
      className: 'lane-pill tag ' + l.cls + (filter.size && !filter.has(l.key) ? ' dim' : '') + (filter.has(l.key) ? ' on' : ''),
      onClick: () => toggle(l.key) }, React.createElement('span', { className: 'dot' }), l.label)),
    filter.size > 0 && React.createElement('button', { type: 'button', className: 'lane-clear', onClick: () => setFilter(new Set()) }, 'Clear \u00d7'));
}

/* ---------- weekly cadence (repeating rhythm, same lanes) ---------- */
function WeekView({ data, filter, laneOf, onEdit }) {
  const todayDay = DAYS[(new Date(TODAY.y, TODAY.m, TODAY.d).getDay() + 6) % 7];
  return React.createElement('div', { className: 'week-grid' },
    DAYS.map(day => {
      let items = data.weekly[day] || [];
      if (filter.size) items = items.filter(it => filter.has(it.lane));
      return React.createElement('div', { key: day, className: 'week-col' + (day === todayDay ? ' today' : '') },
        React.createElement('div', { className: 'week-col-head' },
          React.createElement('span', { className: 'wc-day' }, DAY_FULL[day]),
          React.createElement('button', { className: 'iconbtn', onClick: () => onEdit({ kind: 'weekly', day, item: null }), title: 'Add', type: 'button' }, React.createElement(Icon, { name: 'plus' }))),
        React.createElement('div', { className: 'week-col-body' },
          items.map(it => { const lane = laneOf(it.lane); return React.createElement('div', { key: it.id, className: 'cal-item accent-' + lane.cls, onClick: () => onEdit({ kind: 'weekly', day, item: it }) },
            React.createElement('span', { className: 'ci-type' }, lane.label),
            React.createElement('span', { className: 'ci-text' }, it.text)); }),
          items.length === 0 && React.createElement('div', { className: 'wc-empty' }, 'Open')));
    }));
}

/* ---------- monthly overview ---------- */
function MonthView({ data, wx, year, month, filter, laneOf, onEvent, onTask, onAdd }) {
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7;
  const daysIn = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const key = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  // events by date (expanding repeats across the visible month)
  const byDate = {};
  const pushOcc = (dateStr, payload) => { (byDate[dateStr] || (byDate[dateStr] = [])).push(payload); };
  data.calEvents.forEach(ev => {
    if (filter.size && !filter.has(ev.lane)) return;
    const rep = ev.repeat && ev.repeat !== 'none' ? ev.repeat : null;
    (ev.dates || []).forEach(de => {
      if (!de.date) return;
      if (!rep) { pushOcc(de.date, { type: 'event', ev, de }); return; }
      const anchor = new Date(de.date + 'T00:00:00');
      for (let d = 1; d <= daysIn; d++) {
        const cur = new Date(year, month, d);
        if (cur < anchor) continue;
        const diff = Math.round((cur - anchor) / 864e5);
        let match = false;
        if (rep === 'weekly') match = diff % 7 === 0;
        else if (rep === 'biweekly') match = diff % 14 === 0;
        else if (rep === 'monthly') match = cur.getDate() === anchor.getDate();
        if (match) pushOcc(key(d), { type: 'event', ev, de, repeated: cur.getTime() !== anchor.getTime() });
      }
    });
  });
  // tasks with due dates
  window.TASKS.gather(data).forEach(t => {
    if (!t.due || t.done) return;
    if (filter.size && !filter.has(t.lane)) return;
    (byDate[t.due] || (byDate[t.due] = [])).push({ type: 'task', task: t });
  });

  return React.createElement('div', { className: 'month' },
    React.createElement('div', { className: 'month-dow' }, DAYS.map(d => React.createElement('span', { key: d }, d))),
    React.createElement('div', { className: 'month-grid' },
      cells.map((d, i) => {
        if (d === null) return React.createElement('div', { key: i, className: 'mcell empty-cell' });
        const k = key(d);
        const items = byDate[k] || [];
        const w = wx && wx.daily[k];
        const isToday = year === TODAY.y && month === TODAY.m && d === TODAY.d;
        return React.createElement('div', { key: i, className: 'mcell' + (isToday ? ' today' : '') },
          React.createElement('div', { className: 'mcell-top' },
            React.createElement('span', { className: 'mcell-date' }, d),
            React.createElement('div', { className: 'mcell-topright' },
              w && React.createElement('span', { className: 'mcell-wx', title: window.WX.wxLabel(w.code) }, window.WX.wxEmoji(w.code), ' ', w.hi + '\u00b0/' + w.lo + '\u00b0'),
              React.createElement('button', { className: 'mcell-add', type: 'button', title: 'Add', onClick: () => onAdd(k) }, React.createElement(Icon, { name: 'plus' })))),
          React.createElement('div', { className: 'mcell-evs' },
            items.map((it, j) => {
              if (it.type === 'event') {
                const lane = laneOf(it.ev.lane);
                return React.createElement('div', { key: 'e' + it.ev.id + j, className: 'mev accent-' + lane.cls, title: lane.label + ' \u00b7 ' + KIND_LABEL[it.de.kind] + (it.de.round ? ' \u00b7 Round ' + it.de.round : '') + (it.ev.repeat && it.ev.repeat !== 'none' ? ' \u00b7 ' + REPEAT_LABEL[it.ev.repeat] : ''),
                  onClick: () => onEvent(it.ev) },
                  React.createElement('span', { className: 'mev-glyph' }, KIND_GLYPH[it.de.kind] || '\u25cf'),
                  React.createElement('span', { className: 'mev-text' }, it.ev.text),
                  it.ev.repeat && it.ev.repeat !== 'none' && React.createElement('span', { className: 'mev-rep', title: REPEAT_LABEL[it.ev.repeat] }, '\u21bb'),
                  it.de.round && React.createElement('span', { className: 'mev-round' }, 'R' + it.de.round));
              }
              const lane = laneOf(it.task.lane);
              return React.createElement('div', { key: 't' + it.task.id + j, className: 'mev mev-task accent-' + lane.cls, title: 'Task \u00b7 ' + it.task.projTitle, onClick: () => onTask(it.task) },
                React.createElement('span', { className: 'mev-check' }),
                React.createElement('span', { className: 'mev-text' }, it.task.text));
            })));
      })));
}

/* ---------- date-rows editor (events: start/due/rounds) ---------- */
function DateRows({ rows, setRows }) {
  const set = (id, k, v) => setRows(rows.map(r => r.id === id ? { ...r, [k]: v } : r));
  const add = () => setRows([...rows, { id: window.FC.uid(), date: '', kind: 'event', round: '' }]);
  const del = (id) => setRows(rows.filter(r => r.id !== id));
  return React.createElement('div', { className: 'date-rows' },
    rows.map(r => React.createElement('div', { key: r.id, className: 'date-row' },
      React.createElement('input', { type: 'date', value: r.date, onChange: e => set(r.id, 'date', e.target.value) }),
      React.createElement('select', { value: r.kind, onChange: e => set(r.id, 'kind', e.target.value) },
        ['event', 'start', 'due'].map(k => React.createElement('option', { key: k, value: k }, KIND_LABEL[k]))),
      React.createElement('input', { className: 'round-in', placeholder: 'Rnd', value: r.round || '', onChange: e => set(r.id, 'round', e.target.value) }),
      React.createElement('button', { className: 'iconbtn', type: 'button', onClick: () => del(r.id), title: 'Remove' }, React.createElement(Icon, { name: 'close' })))),
    React.createElement('button', { className: 'btn ghost sm', type: 'button', onClick: add }, React.createElement('span', { className: 'plus' }, '+'), 'Add date'));
}

/* ---------- event (meeting) editor ---------- */
function EventEditor({ data, event, presetDate, onClose }) {
  const { update } = window.FC.useStore();
  const { LANES } = window.FC;
  const isEdit = !!event;
  const [draft, setDraft] = useState(event ? { lane: event.lane, text: event.text, project: event.project || '', notes: event.notes || '', repeat: event.repeat || 'none' } : { lane: 'jeans', text: '', project: '', notes: '', repeat: 'none' });
  const [rows, setRows] = useState(event ? event.dates.map(d => ({ ...d })) : [{ id: window.FC.uid(), date: presetDate || '', kind: 'event', round: '' }]);
  const projOpts = [{ value: '', label: '\u2014 none \u2014' }].concat(data.projects.filter(p => p.lane === draft.lane).map(p => ({ value: p.id, label: p.title })));

  const save = () => {
    const clean = rows.filter(r => r.date).map(r => ({ id: r.id, date: r.date, kind: r.kind, round: r.round ? Number(r.round) : undefined }));
    update(d => {
      if (isEdit) { const ev = d.calEvents.find(x => x.id === event.id); Object.assign(ev, draft); ev.dates = clean; }
      else d.calEvents.push({ id: window.FC.uid(), ...draft, dates: clean });
    });
    onClose();
  };
  const del = () => { update(d => { d.calEvents = d.calEvents.filter(x => x.id !== event.id); }); onClose(); };

  return React.createElement(Modal, { title: isEdit ? 'Edit event' : 'New event', sub: 'Meeting / event', onClose, onSave: save },
    React.createElement(Field, { label: 'What', value: draft.text, onChange: v => setDraft({ ...draft, text: v }), placeholder: 'e.g. Farm to Turntable' }),
    React.createElement('div', { className: 'field-row' },
      React.createElement(Field, { label: 'Section', value: draft.lane, onChange: v => setDraft({ ...draft, lane: v, project: '' }), options: LANES.map(l => ({ value: l.key, label: l.label })) }),
      React.createElement(Field, { label: 'Project (optional)', value: draft.project, onChange: v => setDraft({ ...draft, project: v }), options: projOpts })),
    React.createElement('div', { className: 'field' },
      React.createElement('label', null, 'Dates \u2014 event, start, due, rounds'),
      React.createElement(DateRows, { rows, setRows })),
    React.createElement(Field, { label: 'Repeat', value: draft.repeat, onChange: v => setDraft({ ...draft, repeat: v }), options: REPEATS.map(([value, label]) => ({ value, label })) }),
    React.createElement(Field, { label: 'Notes', value: draft.notes, onChange: v => setDraft({ ...draft, notes: v }), textarea: true, placeholder: 'Agenda, location, who\u2019s coming\u2026' }),
    isEdit && React.createElement('div', { style: { marginTop: 6 } },
      React.createElement('button', { className: 'btn ghost sm', type: 'button', onClick: del, style: { color: 'var(--wine)', borderColor: 'transparent' } }, React.createElement(Icon, { name: 'trash' }), ' Delete event')));
}

/* ---------- weekly cadence editor ---------- */
function WeeklyEditor({ day, item, onClose }) {
  const { update } = window.FC.useStore();
  const { LANES } = window.FC;
  const [draft, setDraft] = useState(item ? { lane: item.lane, text: item.text } : { lane: 'formacurate', text: '' });
  const save = () => {
    update(d => { const arr = d.weekly[day]; if (item) Object.assign(arr.find(x => x.id === item.id), draft); else arr.push({ id: window.FC.uid(), ...draft }); });
    onClose();
  };
  const del = () => { update(d => { d.weekly[day] = d.weekly[day].filter(x => x.id !== item.id); }); onClose(); };
  return React.createElement(Modal, { title: item ? 'Edit rhythm' : 'New rhythm', sub: 'Weekly \u00b7 ' + DAY_FULL[day], onClose, onSave: save },
    React.createElement(Field, { label: 'What', value: draft.text, onChange: v => setDraft({ ...draft, text: v }) }),
    React.createElement(Field, { label: 'Section', value: draft.lane, onChange: v => setDraft({ ...draft, lane: v }), options: LANES.map(l => ({ value: l.key, label: l.label })) }),
    item && React.createElement('div', { style: { marginTop: 6 } },
      React.createElement('button', { className: 'btn ghost sm', type: 'button', onClick: del, style: { color: 'var(--wine)', borderColor: 'transparent' } }, React.createElement(Icon, { name: 'trash' }), ' Delete')));
}

/* ---------- add chooser (event vs task) ---------- */
function AddChooser({ dateKey, onEvent, onTask, onClose }) {
  const nice = new Date(dateKey + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return React.createElement(Modal, { title: 'Add to ' + nice, sub: 'Calendar', onClose },
    React.createElement('div', { className: 'add-choose' },
      React.createElement('button', { className: 'choose-card', type: 'button', onClick: onEvent },
        React.createElement(Icon, { name: 'calendar' }),
        React.createElement('span', { className: 'cc-title' }, 'Event / meeting'),
        React.createElement('span', { className: 'cc-sub' }, 'Something happening on a date')),
      React.createElement('button', { className: 'choose-card', type: 'button', onClick: onTask },
        React.createElement(Icon, { name: 'check' }),
        React.createElement('span', { className: 'cc-title' }, 'Task'),
        React.createElement('span', { className: 'cc-sub' }, 'A to-do due this day \u00b7 connects to a project'))));
}

function Calendar() {
  const { data } = window.FC.useStore();
  const { LANES, laneOf } = window.FC;
  const wx = window.WX.useWeather();
  const [mode, setMode] = useState('month');
  const [ym, setYm] = useState({ y: TODAY.y, m: TODAY.m });
  const [filter, setFilter] = useState(new Set());
  const [modal, setModal] = useState(null);
  const stepMonth = (dir) => setYm(p => { let m = p.m + dir, y = p.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } return { y, m }; });

  return React.createElement('div', { className: 'wrap' },
    React.createElement('header', { className: 'page-head' },
      React.createElement('div', { className: 'head-row' },
        React.createElement('div', null,
          React.createElement('span', { className: 'eyebrow' }, 'The Rhythm'),
          React.createElement('h1', null, 'Calendar'),
          React.createElement('p', { className: 'sub' }, 'A repeating ideal week, and a month of events + due tasks \u2014 colour-coded by section. Tap a colour in the key to filter both views.')),
        React.createElement('div', { className: 'mode-toggle' },
          React.createElement('button', { type: 'button', className: mode === 'week' ? 'on' : '', onClick: () => setMode('week') }, 'Weekly'),
          React.createElement('button', { type: 'button', className: mode === 'month' ? 'on' : '', onClick: () => setMode('month') }, 'Monthly')))),

    React.createElement('div', { className: 'cal-bar' },
      React.createElement(LaneLegend, { LANES, filter, setFilter }),
      mode === 'month' && React.createElement('div', { className: 'month-nav' },
        React.createElement('button', { className: 'iconbtn', onClick: () => stepMonth(-1), type: 'button' }, React.createElement(Icon, { name: 'back' })),
        React.createElement('span', { className: 'month-label' }, MONTHS[ym.m] + ' ' + ym.y),
        React.createElement('button', { className: 'iconbtn', onClick: () => stepMonth(1), type: 'button' }, React.createElement(Icon, { name: 'arrow' })))),

    mode === 'week'
      ? React.createElement(WeekView, { data, filter, laneOf, onEdit: (ctx) => setModal(ctx) })
      : React.createElement(MonthView, { data, wx, year: ym.y, month: ym.m, filter, laneOf,
          onEvent: (ev) => setModal({ kind: 'event', item: ev }),
          onTask: (t) => setModal({ kind: 'task', task: t }),
          onAdd: (dateKey) => setModal({ kind: 'choose', dateKey }) }),

    modal && modal.kind === 'event' && React.createElement(EventEditor, { data, event: modal.item, presetDate: modal.presetDate, onClose: () => setModal(null) }),
    modal && modal.kind === 'weekly' && React.createElement(WeeklyEditor, { day: modal.day, item: modal.item, onClose: () => setModal(null) }),
    modal && modal.kind === 'task' && React.createElement(window.TaskEditor, { task: modal.task, presetDue: modal.presetDue, onClose: () => setModal(null) }),
    modal && modal.kind === 'choose' && React.createElement(AddChooser, { dateKey: modal.dateKey,
      onEvent: () => setModal({ kind: 'event', item: null, presetDate: modal.dateKey }),
      onTask: () => setModal({ kind: 'task', task: null, presetDue: modal.dateKey }),
      onClose: () => setModal(null) }),

    React.createElement('section', { className: 'calendar-canvas-sect' },
      React.createElement('div', { className: 'rule-label' }, React.createElement('span', { className: 'eyebrow' }, 'Notes, milestones & pins')),
      React.createElement(window.CanvasKit.Canvas, {
        storeKey: 'calendarCanvas', slotPrefix: 'calendar',
        addTypes: ['milestones', 'image', 'note', 'reminder', 'quote'],
        hint: 'milestones, notes & images \u2014 drag to rearrange',
        menuLabel: 'New calendar block' })));
}

window.Calendar = Calendar;
})();
