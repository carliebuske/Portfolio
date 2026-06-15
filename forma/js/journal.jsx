/* ============================================================
   JOURNAL & GOALS — diary, goals, moodboard, sketch pad
   ============================================================ */
(function () {
const { useState, useRef, useEffect } = React;
const { Icon, Check, IconBtn, Editable } = window.UI;

const TODAY_ISO = '2026-06-11';
function fmtDate(d) {
  const dt = new Date(d + 'T00:00:00');
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}

/* ---------- sketch pad ---------- */
function SketchPad() {
  const ref = useRef(null);
  const drawing = useRef(false);
  const KEY = 'fc.sketch';
  const [color, setColor] = useState('var(--ink)');
  const colors = [['#2c2630', 'ink'], ['#6e6a3f', 'olive'], ['#6b2a2f', 'wine'], ['#6d8088', 'blue']];

  useEffect(() => {
    const cv = ref.current; const ctx = cv.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = cv.getBoundingClientRect();
    cv.width = rect.width * dpr; cv.height = rect.height * dpr; ctx.scale(dpr, dpr);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 2.2;
    try { const saved = localStorage.getItem(KEY); if (saved) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height); img.src = saved; } } catch (e) {}
  }, []);

  const pos = (e) => { const r = ref.current.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return { x: t.clientX - r.left, y: t.clientY - r.top }; };
  const start = (e) => { e.preventDefault(); drawing.current = true; const ctx = ref.current.getContext('2d'); const p = pos(e); ctx.strokeStyle = getComputedStyle(ref.current).getPropertyValue('--pen') || '#2c2630'; ctx.beginPath(); ctx.moveTo(p.x, p.y); };
  const move = (e) => { if (!drawing.current) return; e.preventDefault(); const ctx = ref.current.getContext('2d'); const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
  const end = () => { if (!drawing.current) return; drawing.current = false; try { localStorage.setItem(KEY, ref.current.toDataURL()); } catch (e) {} };
  const clear = () => { const cv = ref.current; cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); try { localStorage.removeItem(KEY); } catch (e) {} };
  const penColors = { 'var(--ink)': '#2c2630', 'var(--olive)': '#6e6a3f', 'var(--wine)': '#6b2a2f', 'var(--aqua)': '#6d8088' };

  return React.createElement('div', { className: 'sketch-wrap' },
    React.createElement('div', { className: 'sketch-tools' },
      colors.map(([hex, name]) => React.createElement('button', { key: name, type: 'button',
        className: 'pen-swatch' + (color === hex ? ' on' : ''), style: { background: hex },
        onClick: () => { setColor(hex); ref.current.style.setProperty('--pen', hex); } })),
      React.createElement('button', { className: 'btn ghost sm', type: 'button', onClick: clear, style: { marginLeft: 'auto' } }, 'Clear')),
    React.createElement('canvas', { ref, className: 'sketch-canvas', style: { '--pen': '#2c2630' },
      onMouseDown: start, onMouseMove: move, onMouseUp: end, onMouseLeave: end,
      onTouchStart: start, onTouchMove: move, onTouchEnd: end }));
}

/* ---------- goals ---------- */
function GoalList({ which }) {
  const { data, update } = window.FC.useStore();
  const [txt, setTxt] = useState('');
  const [showDone, setShowDone] = useState(false);
  const list = data.goals[which] || [];
  const active = list.filter(g => !g.done);
  const done = list.filter(g => g.done);
  const add = () => { if (!txt.trim()) return; update(d => d.goals[which].push({ id: window.FC.uid(), text: txt.trim(), done: false })); setTxt(''); };
  const toggle = (id) => update(d => { const g = d.goals[which].find(x => x.id === id); g.done = !g.done; g.doneAt = g.done ? Date.now() : null; });
  const del = (id) => update(d => { d.goals[which] = d.goals[which].filter(x => x.id !== id); });
  return React.createElement('div', null,
    React.createElement('div', { className: 'goal-list' },
      active.map(g => React.createElement('div', { key: g.id, className: 'goal-row' },
        React.createElement(Check, { on: g.done, onClick: () => toggle(g.id) }),
        React.createElement('span', { className: 'goal-text' }, g.text),
        React.createElement(IconBtn, { icon: 'trash', onClick: () => del(g.id), title: 'Delete' }))),
      active.length === 0 && React.createElement('div', { className: 'empty' }, 'No active goals \u2014 add one')),
    React.createElement('div', { className: 'pd-add' },
      React.createElement('input', { value: txt, placeholder: 'Add a goal\u2026', onChange: e => setTxt(e.target.value), onKeyDown: e => { if (e.key === 'Enter') add(); } }),
      React.createElement('button', { className: 'iconbtn', onClick: add, title: 'Add', type: 'button' }, React.createElement(Icon, { name: 'plus' }))),
    done.length > 0 && React.createElement('div', { className: 'goals-done' },
      React.createElement('button', { className: 'done-toggle', type: 'button', onClick: () => setShowDone(s => !s) },
        React.createElement(Icon, { name: 'check' }),
        React.createElement('span', null, 'Completed'),
        React.createElement('span', { className: 'done-count' }, done.length),
        React.createElement(Icon, { name: showDone ? 'back' : 'arrow', className: showDone ? 'arc-up' : 'arc-down' })),
      showDone && React.createElement('div', { className: 'goal-list done-list' },
        done.map(g => React.createElement('div', { key: g.id, className: 'goal-row done' },
          React.createElement(Check, { on: true, onClick: () => toggle(g.id) }),
          React.createElement('span', { className: 'goal-text' }, g.text),
          React.createElement(IconBtn, { icon: 'trash', onClick: () => del(g.id), title: 'Delete' }))))));
}

function Journal() {
  const { data, update } = window.FC.useStore();
  const [goalTab, setGoalTab] = useState('weekly');
  const [showArchive, setShowArchive] = useState(false);
  const [entriesView, setEntriesView] = useState('recent'); // recent | older

  const addEntry = () => update(d => d.journal.unshift({ id: window.FC.uid(), date: TODAY_ISO, text: '', mood: '', archived: false }));
  const setEntry = (id, k, v) => update(d => { const e = d.journal.find(x => x.id === id); e[k] = v; });
  const delEntry = (id) => update(d => { d.journal = d.journal.filter(x => x.id !== id); });
  const archiveEntry = (id) => update(d => { const e = d.journal.find(x => x.id === id); e.archived = true; });
  const restoreEntry = (id) => update(d => { const e = d.journal.find(x => x.id === id); e.archived = false; });

  const active = data.journal.filter(e => !e.archived).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const archived = data.journal.filter(e => e.archived);
  const recent = active.slice(0, 2);
  const older = active.slice(2);

  const entryCard = (e) => React.createElement('article', { key: e.id, className: 'card journal-entry' },
    React.createElement('div', { className: 'je-head' },
      React.createElement('span', { className: 'je-date' }, fmtDate(e.date)),
      React.createElement('span', { className: 'je-mood' }, 'Mood \u00b7 ', React.createElement(Editable, { value: e.mood, placeholder: '\u2014', onChange: v => setEntry(e.id, 'mood', v) })),
      React.createElement(IconBtn, { icon: 'folder', onClick: () => archiveEntry(e.id), title: 'Archive entry' }),
      React.createElement(IconBtn, { icon: 'trash', onClick: () => delEntry(e.id), title: 'Delete' })),
    React.createElement('div', { className: 'je-body' },
      React.createElement(Editable, { value: e.text, multiline: true, placeholder: 'How did today feel? What did you make, see, gather\u2026', onChange: v => setEntry(e.id, 'text', v) })));

  const journalCol = entriesView === 'older'
    ? React.createElement('section', null,
        React.createElement('div', { className: 'board-head' },
          React.createElement('button', { className: 'back-link', type: 'button', onClick: () => setEntriesView('recent') }, React.createElement(Icon, { name: 'back' }), 'Daily Journal'),
          React.createElement('span', { className: 'eyebrow' }, 'Older entries \u00b7 ' + older.length)),
        React.createElement('div', { className: 'journal-entries' },
          older.map(entryCard),
          older.length === 0 && React.createElement('div', { className: 'empty' }, 'No older entries')))
    : React.createElement('section', null,
        React.createElement('div', { className: 'board-head' },
          React.createElement('span', { className: 'eyebrow' }, 'Daily Journal')),
        React.createElement('div', { className: 'journal-entries' },
          recent.map(entryCard),
          recent.length === 0 && React.createElement('div', { className: 'empty' }, 'Start your first entry')),
        React.createElement('div', { className: 'journal-links' },
          React.createElement('button', { className: 'text-link muted', type: 'button', onClick: () => setEntriesView('older') }, 'Past journal entries' + (older.length ? ' (' + older.length + ')' : ''), React.createElement(Icon, { name: 'arrow' })),
          React.createElement('button', { className: 'text-link', type: 'button', onClick: addEntry }, React.createElement('span', { className: 'tl-plus' }, '+'), 'New entry')),
        archived.length > 0 && React.createElement('div', { className: 'archive-block' },
          React.createElement('button', { className: 'archive-toggle', type: 'button', onClick: () => setShowArchive(s => !s) },
            React.createElement(Icon, { name: 'folder' }),
            React.createElement('span', null, 'Archived entries'),
            React.createElement('span', { className: 'archive-count' }, archived.length),
            React.createElement(Icon, { name: showArchive ? 'back' : 'arrow', className: showArchive ? 'arc-up' : 'arc-down' })),
          showArchive && React.createElement('div', { className: 'archive-list' },
            archived.map(en => React.createElement('div', { key: en.id, className: 'archive-row' },
              React.createElement('div', { className: 'arc-main' },
                React.createElement('span', { className: 'arc-date' }, fmtDate(en.date)),
                React.createElement('span', { className: 'arc-preview' }, (en.text || '').slice(0, 90) || 'No text')),
              React.createElement('div', { className: 'arc-actions' },
                React.createElement('button', { className: 'arc-btn', type: 'button', onClick: () => restoreEntry(en.id) }, React.createElement(Icon, { name: 'back' }), 'Restore'),
                React.createElement(IconBtn, { icon: 'trash', onClick: () => delEntry(en.id), title: 'Delete permanently' })))))));

  return React.createElement('div', { className: 'wrap' },
    React.createElement('header', { className: 'page-head' },
      React.createElement('span', { className: 'eyebrow' }, 'The Studio Diary'),
      React.createElement('h1', null, 'Journal & Goals'),
      React.createElement('p', { className: 'sub' }, 'A quiet page \u2014 daily notes, the goals you\u2019re moving toward, a pinboard, and room to scribble.')),

    React.createElement('div', { className: 'journal-grid' },
      journalCol,
      React.createElement('aside', { className: 'journal-side' },
        React.createElement('div', { className: 'board-head' },
          React.createElement('span', { className: 'eyebrow' }, 'Goals')),
        React.createElement('div', { className: 'card side-card' },
          React.createElement('div', { className: 'goal-tabs' },
            [['weekly', 'Weekly'], ['monthly', 'Monthly'], ['yearly', 'Yearly']].map(([k, l]) =>
              React.createElement('button', { key: k, type: 'button', className: goalTab === k ? 'on' : '', onClick: () => setGoalTab(k) }, l))),
          React.createElement(GoalList, { which: goalTab })))),

    React.createElement('section', { className: 'journal-canvas-sect' },
      React.createElement('div', { className: 'rule-label' }, React.createElement('span', { className: 'eyebrow' }, 'Pinboard & blocks')),
      React.createElement(window.CanvasKit.Canvas, {
        storeKey: 'journalCanvas', slotPrefix: 'journal',
        addTypes: ['image', 'quote', 'reminder', 'note', 'milestones'],
        hint: 'drop images, quotes, notes \u2014 drag to rearrange',
        menuLabel: 'New journal block' })),

    React.createElement('section', { className: 'journal-board' },
      React.createElement('div', { className: 'rule-label' }, React.createElement('span', { className: 'eyebrow' }, 'Scribbles & loose notes')),
      React.createElement('div', { className: 'jb-grid' },
        React.createElement('div', { className: 'jb-sketch' },
          React.createElement('span', { className: 'eyebrow', style: { display: 'block', marginBottom: 10 } }, 'Scribble pad'),
          React.createElement(SketchPad)),
        React.createElement('div', { className: 'card jb-notes' },
          React.createElement('span', { className: 'eyebrow', style: { display: 'block', marginBottom: 10 } }, 'Loose notes'),
          React.createElement(Editable, { value: data.journalNotes, multiline: true, placeholder: 'Ideas, lists, lyrics, names of flowers\u2026', onChange: v => update(d => { d.journalNotes = v; }) })))));
}

window.Journal = Journal;
})();
