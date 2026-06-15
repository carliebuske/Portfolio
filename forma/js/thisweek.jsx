/* ============================================================
   THIS WEEK — a visual highlights timeline (scrapbook, not tasks).
   One highlight per day; multi-day trips span days.
   Exposes window.ThisWeekWidget
   ============================================================ */
(function () {
const e = React.createElement;
const { useState } = React;
const { Icon, Modal, Field } = window.UI;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_FULL = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
const KINDS = {
  trip:       { label: 'Trip',       cls: 'clay' },
  event:      { label: 'Event',      cls: 'ochre' },
  experience: { label: 'Experience', cls: 'aqua' },
  memory:     { label: 'Memory',     cls: 'mauve' },
  rest:       { label: 'Rest',       cls: 'sage' },
};
const idx = (d) => DAYS.indexOf(d);

function HighlightCard({ h, onEdit }) {
  const k = KINDS[h.kind] || KINDS.experience;
  const multi = h.start !== h.end;
  return e('div', { className: 'tl-hl k-' + k.cls, onClick: onEdit },
    e('div', { className: 'tl-hl-main' },
      e('span', { className: 'tl-hl-dot' }),
      e('span', { className: 'tl-hl-title' }, h.title || 'Untitled'),
      multi && e('span', { className: 'tl-range' }, h.start + '\u2013' + h.end)),
    h.subtitle && e('div', { className: 'tl-hl-sub' }, h.subtitle));
}

function ThisWeekWidget() {
  const { data, update } = window.FC.useStore();
  const [editing, setEditing] = useState(null); // null | 'new' | entry
  const [draft, setDraft] = useState({});
  const highlights = data.weekHighlights || [];

  const open = (h) => {
    setEditing(h || 'new');
    setDraft(h ? { ...h } : { title: '', subtitle: '', kind: 'experience', start: 'Mon', end: 'Mon' });
  };
  const save = () => {
    let d2 = { ...draft };
    if (idx(d2.end) < idx(d2.start)) d2.end = d2.start;
    update(d => {
      if (editing !== 'new' && editing.id) Object.assign(d.weekHighlights.find(x => x.id === editing.id), d2);
      else (d.weekHighlights || (d.weekHighlights = [])).push({ id: window.FC.uid(), ...d2 });
    });
    setEditing(null);
  };
  const del = () => { update(d => { d.weekHighlights = d.weekHighlights.filter(x => x.id !== editing.id); }); setEditing(null); };

  const todayDay = 'Thu';

  return e(React.Fragment, null,
    e('div', { className: 'wg-head' },
      e('div', null,
        e('span', { className: 'eyebrow' }, 'This Week'),
        e('h2', { className: 'wg-h2' }, 'Highlights')),
      e('button', { className: 'btn sm', type: 'button', onClick: () => open(null) }, e('span', { className: 'plus' }, '+'), 'Add')),

    e('div', { className: 'timeline' },
      DAYS.map((day, i) => {
        const active = highlights.filter(h => idx(h.start) <= i && i <= idx(h.end));
        const starting = active.filter(h => h.start === day);
        const cont = active.filter(h => h.start !== day);
        const railK = active.length ? (KINDS[active[0].kind] || KINDS.experience) : null;
        const isToday = day === todayDay;
        return e('div', { className: 'tl-row' + (active.length ? ' on' : '') + (isToday ? ' today' : ''), key: day },
          e('div', { className: 'tl-day' }, e('span', { className: 'tl-day-abbr' }, day), isToday && e('span', { className: 'tl-today' }, 'today')),
          e('div', { className: 'tl-body' },
            starting.map(h => e(HighlightCard, { key: h.id, h, onEdit: () => open(h) })),
            (!starting.length && cont.length) ? cont.map(h => e('div', { key: h.id, className: 'tl-cont k-' + (KINDS[h.kind] || KINDS.experience).cls, onClick: () => open(h) },
              e('span', { className: 'tl-hl-dot' }),
              e('span', { className: 'tl-cont-text' }, h.end === day ? 'back from ' + h.title : h.title))) : null,
            (!starting.length && !cont.length) ? e('div', { className: 'tl-open' }, '\u00b7') : null));
      })),

    editing && e(Modal, {
      title: editing === 'new' ? 'New highlight' : 'Edit highlight', sub: 'This week \u00b7 a memory worth keeping',
      onClose: () => setEditing(null), onSave: save },
      e(Field, { label: 'What happened', value: draft.title, onChange: v => setDraft({ ...draft, title: v }), placeholder: 'e.g. South Carolina with Max' }),
      e(Field, { label: 'Where / detail', value: draft.subtitle, onChange: v => setDraft({ ...draft, subtitle: v }), placeholder: 'Charleston \u00b7 long weekend away' }),
      e('div', { className: 'field-row' },
        e(Field, { label: 'Kind', value: draft.kind, onChange: v => setDraft({ ...draft, kind: v }), options: Object.keys(KINDS).map(k => ({ value: k, label: KINDS[k].label })) }),
        e('div', { className: 'field' })),
      e('div', { className: 'field-row' },
        e(Field, { label: 'From', value: draft.start, onChange: v => setDraft({ ...draft, start: v }), options: DAYS.map(d => ({ value: d, label: DAY_FULL[d] })) }),
        e(Field, { label: 'To', value: draft.end, onChange: v => setDraft({ ...draft, end: v }), options: DAYS.map(d => ({ value: d, label: DAY_FULL[d] })) })),
      editing !== 'new' && editing.id && e('div', { style: { marginTop: 14 } },
        e('button', { className: 'btn ghost sm', type: 'button', onClick: del, style: { color: 'var(--wine)', borderColor: 'transparent' } }, e(Icon, { name: 'trash' }), ' Delete highlight'))));
}

window.ThisWeekWidget = ThisWeekWidget;
})();
