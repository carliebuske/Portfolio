/* ============================================================
   CANVAS KIT — shared modular widget canvas used by Bulletin,
   Journal and Calendar. Draggable + resizable blocks on a
   masonry grid. window.CanvasKit
   ============================================================ */
(function () {
const e = React.createElement;
const { useState, useRef, useLayoutEffect } = React;
const { Icon, Check, Editable } = window.UI;

/* ---------- date helpers ---------- */
function fmtDue(d) {
  if (!d) return null;
  const dt = new Date(d + 'T00:00:00');
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function dueState(d) {
  if (!d) return '';
  const today = new Date('2026-06-11T00:00:00');
  const dt = new Date(d + 'T00:00:00');
  const days = Math.round((dt - today) / 864e5);
  if (days < 0) return 'overdue';
  if (days <= 3) return 'soon';
  return '';
}

/* ---------- masonry: size each grid item to its content ---------- */
function useMasonry(ref, dep) {
  useLayoutEffect(() => {
    const c = ref.current;
    if (!c) return;
    const cs = getComputedStyle(c);
    const rowH = parseFloat(cs.gridAutoRows) || 8;
    const gap = parseFloat(cs.rowGap || cs.gap) || 18;
    const layout = () => {
      c.querySelectorAll('.widget').forEach(w => {
        const inner = w.firstElementChild;
        if (!inner) return;
        const h = inner.getBoundingClientRect().height;
        w.style.gridRowEnd = 'span ' + Math.max(1, Math.ceil((h + gap) / (rowH + gap)));
      });
    };
    layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    const ro = new ResizeObserver(layout);
    c.querySelectorAll('.widget > .widget-inner').forEach(el => ro.observe(el));
    window.addEventListener('resize', layout);
    const t = setTimeout(layout, 400);
    const t2 = setTimeout(layout, 1200);
    return () => { ro.disconnect(); window.removeEventListener('resize', layout); clearTimeout(t); clearTimeout(t2); };
  }, [dep]);
}

/* ---------- common widget bodies ---------- */
function ImageWidget({ w, slotPrefix }) {
  return e('image-slot', { id: (slotPrefix || 'canvas') + '-img-' + w.id, class: 'wg-image', style: { height: (w.tall ? 380 : 240) + 'px' }, shape: 'rect', placeholder: 'drop image' });
}

function QuoteWidget({ w, patch }) {
  return e('div', { className: 'wg-quote-wrap' },
    e('span', { className: 'wg-quote-mark' }, '\u201C'),
    e('div', { className: 'wg-quote' },
      e(Editable, { value: w.text, multiline: true, placeholder: 'A line worth keeping\u2026', onChange: v => patch(w.id, { text: v }) })),
    e('span', { className: 'wg-quote-by' }, '\u2014 ', e(Editable, { value: w.by, placeholder: 'attribution', onChange: v => patch(w.id, { by: v }) })));
}

function GoalWidget({ w, patch }) {
  return e('div', { className: 'wg-goal' + (w.done ? ' done' : '') },
    e(Check, { on: w.done, onClick: () => patch(w.id, { done: !w.done }) }),
    e('div', { className: 'wg-goal-body' },
      e('span', { className: 'eyebrow' }, 'Goal'),
      e('div', { className: 'wg-goal-text' },
        e(Editable, { value: w.text, multiline: true, placeholder: 'Name a goal\u2026', onChange: v => patch(w.id, { text: v }) }))));
}

function ReminderWidget({ w, patch }) {
  const ds = dueState(w.date);
  return e('div', { className: 'wg-reminder' },
    e('div', { className: 'wg-rem-top' }, e(Icon, { name: 'star', className: 'wg-rem-ico' }), e('span', { className: 'eyebrow' }, 'Reminder')),
    e('div', { className: 'wg-rem-text' },
      e(Editable, { value: w.text, multiline: true, placeholder: 'What to remember\u2026', onChange: v => patch(w.id, { text: v }) })),
    e('label', { className: 'wg-rem-date' + (ds ? ' ' + ds : '') },
      e(Icon, { name: 'calendar' }),
      e('span', null, w.date ? fmtDue(w.date) : 'Set date'),
      e('input', { type: 'date', value: w.date || '', onChange: ev => patch(w.id, { date: ev.target.value }) })));
}

function NoteWidget({ w, patch }) {
  return e('div', { className: 'wg-note' },
    e('span', { className: 'eyebrow' }, 'Note'),
    e('div', { className: 'wg-note-text' },
      e(Editable, { value: w.text, multiline: true, placeholder: 'Jot anything \u2014 lists, names of flowers, an idea\u2026', onChange: v => patch(w.id, { text: v }) })));
}

/* Milestones — a "wins" log built from completed goals (newest first) */
function MilestonesWidget() {
  const { data } = window.FC.useStore();
  const buckets = [['weekly', 'Weekly'], ['monthly', 'Monthly'], ['yearly', 'Yearly']];
  let done = [];
  buckets.forEach(([k, label]) => (data.goals[k] || []).forEach(g => { if (g.done) done.push({ ...g, bucket: label }); }));
  done.sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
  return e('div', { className: 'wg-milestones' },
    e('div', { className: 'wg-head' },
      e('div', null,
        e('span', { className: 'eyebrow' }, 'Milestones'),
        e('h2', { className: 'wg-h2' }, 'Wins \u2014 ', e('span', { className: 'count-em' }, done.length))),
      e('a', { className: 'mini-link', href: '#/journal' }, 'Goals ', e(Icon, { name: 'arrow' }))),
    e('div', { className: 'ms-list' },
      done.map(g => e('div', { key: g.id, className: 'ms-row' },
        e('span', { className: 'ms-dot' }),
        e('div', { className: 'ms-body' },
          e('span', { className: 'ms-text' }, g.text || 'Goal'),
          e('span', { className: 'ms-meta' }, g.bucket + (g.doneAt ? ' \u00b7 ' + new Date(g.doneAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''))))),
      done.length === 0 && e('div', { className: 'empty' }, 'Check off a goal \u2014 it lands here as a win')));
}

const COMMON_BODIES = { image: ImageWidget, quote: QuoteWidget, goal: GoalWidget, reminder: ReminderWidget, note: NoteWidget, milestones: MilestonesWidget };
const COMMON_DEFAULTS = (type) => {
  if (type === 'quote') return { text: '', by: '' };
  if (type === 'goal') return { text: '', done: false };
  if (type === 'reminder') return { text: '', date: '' };
  if (type === 'note') return { text: '' };
  return {};
};
const NODATA = { milestones: true, image: true };

const ADD_DEFS = {
  image: ['image', 'Image', 'camera'],
  quote: ['quote', 'Quote', 'journal'],
  goal: ['goal', 'Goal', 'star'],
  reminder: ['reminder', 'Reminder', 'calendar'],
  note: ['note', 'Note', 'journal'],
  milestones: ['milestones', 'Milestones', 'star'],
};

/* ---------- widget shell ---------- */
const GripDots = e('svg', { viewBox: '0 0 16 16', width: 15, height: 15, className: 'grip-svg' },
  e('g', { fill: 'currentColor' }, [[5, 4], [5, 8], [5, 12], [11, 4], [11, 8], [11, 12]].map(([x, y], i) => e('circle', { key: i, cx: x, cy: y, r: 1.35 }))));

function WidgetShell({ w, drag, armed, setArmed, fixedTypes, onResize, onTall, onDelete, children }) {
  const fixed = (fixedTypes || {})[w.type];
  return e('div', {
    className: 'widget ' + (w.size || 'w1') + (w.tall ? ' tall' : '') + ' wt-' + w.type +
      (drag.dragId === w.id ? ' dragging' : '') + (drag.overId === w.id ? ' drag-over' : ''),
    draggable: armed === w.id,
    onDragStart: () => drag.onStart(w.id),
    onDragEnd: () => { drag.onEnd(); setArmed(null); },
    onDragOver: (ev) => { ev.preventDefault(); drag.onOver(w.id); },
    onDrop: (ev) => { ev.preventDefault(); drag.onDrop(w.id); } },
    e('div', { className: 'widget-inner' },
      e('div', { className: 'wb-grip', title: 'Drag to rearrange', onMouseDown: () => setArmed(w.id), onMouseUp: () => setArmed(null) }, GripDots,
        e('div', { className: 'wb-actions', onMouseDown: ev => ev.stopPropagation() },
          e('button', { className: 'wb-btn', type: 'button', title: 'Width', onClick: onResize }, e('span', { className: 'wb-resize' }, '\u2194')),
          e('button', { className: 'wb-btn', type: 'button', title: 'Height', onClick: onTall }, e('span', { className: 'wb-resize' }, '\u2195')),
          !fixed && e('button', { className: 'wb-btn', type: 'button', title: 'Remove', onClick: onDelete }, e(Icon, { name: 'close' })))),
      e('div', { className: 'widget-body' + (w.type === 'image' ? ' img-body' : '') }, children)));
}

/* ---------- add-block menu ---------- */
function AddMenu({ onAdd, types, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const close = (ev) => { if (ref.current && !ref.current.contains(ev.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  const defs = (types || ['image', 'quote', 'goal', 'reminder']).map(t => ADD_DEFS[t]).filter(Boolean);
  return e('div', { className: 'add-block-wrap', ref },
    e('button', { className: 'btn', type: 'button', onClick: () => setOpen(o => !o) }, e('span', { className: 'plus' }, '+'), 'Add block'),
    open && e('div', { className: 'add-menu' },
      e('span', { className: 'add-menu-label' }, label || 'New block'),
      defs.map(([type, lab, ico]) => e('button', { key: type, type: 'button', className: 'add-menu-item', onClick: () => { onAdd(type); setOpen(false); } },
        e(Icon, { name: ico, className: 'ami-ico' }), lab))));
}

/* ---------- the canvas ---------- */
function Canvas({ storeKey, slotPrefix, renderBody, addTypes, fixedTypes, makeDefault, hint, menuLabel, extraDep }) {
  const { data, update } = window.FC.useStore();
  const [armed, setArmed] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);
  const canvasRef = useRef(null);
  const widgets = data[storeKey] || [];
  useMasonry(canvasRef, JSON.stringify(widgets.map(w => [w.id, w.size, w.tall])) + '|' + (extraDep || ''));

  const patch = (id, fields) => update(d => { const x = (d[storeKey] || []).find(b => b.id === id); if (x) Object.assign(x, fields); });
  const addWidget = (type) => update(d => {
    const base = Object.assign({ id: window.FC.uid(), type, size: 'w1' }, (makeDefault && makeDefault(type)) || COMMON_DEFAULTS(type));
    (d[storeKey] || (d[storeKey] = [])).push(base);
  });
  const removeWidget = (id) => update(d => { d[storeKey] = (d[storeKey] || []).filter(b => b.id !== id); });
  const resizeWidget = (id) => update(d => { const x = d[storeKey].find(b => b.id === id); x.size = x.size === 'w1' ? 'w2' : (x.size === 'w2' ? 'wfull' : 'w1'); });
  const tallWidget = (id) => update(d => { const x = d[storeKey].find(b => b.id === id); x.tall = !x.tall; });

  const drag = {
    dragId, overId,
    onStart: (id) => setDragId(id),
    onEnd: () => { setDragId(null); setOverId(null); },
    onOver: (id) => { if (id !== overId) setOverId(id); },
    onDrop: (id) => {
      if (dragId && dragId !== id) update(d => {
        const arr = d[storeKey];
        const fi = arr.findIndex(x => x.id === dragId);
        const ti = arr.findIndex(x => x.id === id);
        if (fi < 0 || ti < 0) return;
        const [m] = arr.splice(fi, 1);
        arr.splice(ti, 0, m);
      });
      setDragId(null); setOverId(null);
    },
  };

  const body = (w) => {
    if (renderBody) { const custom = renderBody(w, { patch }); if (custom) return custom; }
    const Body = COMMON_BODIES[w.type];
    return Body ? e(Body, { w, patch, slotPrefix }) : null;
  };

  return e('div', { className: 'canvas-block' },
    e('div', { className: 'canvas-bar' },
      e('span', { className: 'canvas-hint' }, e('span', { className: 'eyebrow' }, 'Your canvas'), '\u00a0\u00b7 ' + (hint || 'drag blocks by the dots to rearrange')),
      e(AddMenu, { onAdd: addWidget, types: addTypes, label: menuLabel })),
    e('div', { className: 'canvas', ref: canvasRef },
      widgets.map(w => e(WidgetShell, { key: w.id, w, drag, armed, setArmed, fixedTypes,
        onResize: () => resizeWidget(w.id), onTall: () => tallWidget(w.id), onDelete: () => removeWidget(w.id) },
        body(w)))));
}

window.CanvasKit = { useMasonry, WidgetShell, AddMenu, Canvas, GripDots, COMMON_BODIES, COMMON_DEFAULTS, ADD_DEFS, NODATA, fmtDue, dueState };
})();
