/* ============================================================
   PROJECT DETAIL — moodboard + to-do + files + people + invoices
   ============================================================ */
(function () {
const { useState } = React;
const { Icon, Check, IconBtn, Editable, Field, Modal } = window.UI;

const SLOTS = [
  [3, 3, 'Hero reference'], [3, 2, 'Palette'], [3, 2, 'Material / texture'],
  [2, 2, 'Form'], [2, 2, 'Detail'], [2, 3, 'Mood'],
];
const LVL_NEXT = { high: 'med', med: 'low', low: 'high' };

function Moodboard({ pid }) {
  return React.createElement('div', { className: 'moodboard' },
    SLOTS.map(([cs, rs, cap], i) =>
      React.createElement('div', { key: i, className: 'mb-slot', style: { gridColumn: 'span ' + cs, gridRow: 'span ' + rs } },
        React.createElement('image-slot', { id: 'mb-' + pid + '-' + i, style: { width: '100%', height: '100%' }, shape: 'rounded', radius: '10', placeholder: cap }))));
}

/* ---------- files / folders ---------- */
const FOLDERS = [
  { key: 'receipts', label: 'Receipts', icon: 'invoice', hint: 'decor purchases' },
  { key: 'progress', label: 'Progress', icon: 'camera', hint: 'in-progress shots' },
  { key: 'finished', label: 'Finished', icon: 'star', hint: 'ready to post' },
];
function Files({ pid, ws, update }) {
  const files = ws.files || [];
  const add = (folder) => update(d => { const w = d.workspaces[pid]; (w.files || (w.files = [])).push({ id: window.FC.uid(), folder, ready: false }); });
  const del = (id) => update(d => { d.workspaces[pid].files = d.workspaces[pid].files.filter(f => f.id !== id); });
  const toggleReady = (id) => update(d => { const f = d.workspaces[pid].files.find(x => x.id === id); f.ready = !f.ready; });
  return React.createElement('div', { className: 'files-grid' },
    FOLDERS.map(fol => {
      const list = files.filter(f => f.folder === fol.key);
      return React.createElement('div', { key: fol.key, className: 'folder' },
        React.createElement('div', { className: 'folder-head' },
          React.createElement(Icon, { name: fol.icon, className: 'folder-ico' }),
          React.createElement('div', { className: 'folder-titles' },
            React.createElement('span', { className: 'folder-name' }, fol.label),
            React.createElement('span', { className: 'folder-hint' }, fol.hint)),
          React.createElement('button', { className: 'iconbtn', type: 'button', title: 'Add', onClick: () => add(fol.key) }, React.createElement(Icon, { name: 'plus' }))),
        React.createElement('div', { className: 'folder-body' },
          list.map(f => React.createElement('div', { key: f.id, className: 'file-card' + (f.ready ? ' ready' : '') },
            React.createElement('image-slot', { id: 'file-' + pid + '-' + f.id, class: 'file-slot', shape: 'rounded', radius: '8', placeholder: fol.label.toLowerCase() }),
            React.createElement('div', { className: 'file-actions' },
              fol.key === 'finished' && React.createElement('button', { type: 'button', className: 'ready-tag' + (f.ready ? ' on' : ''), onClick: () => toggleReady(f.id) },
                React.createElement(Icon, { name: 'tag' }), f.ready ? 'Ready to post' : 'Mark ready'),
              React.createElement('button', { type: 'button', className: 'iconbtn file-del', title: 'Remove', onClick: () => del(f.id) }, React.createElement(Icon, { name: 'trash' }))))),
          list.length === 0 && React.createElement('button', { className: 'folder-empty', type: 'button', onClick: () => add(fol.key) }, React.createElement(Icon, { name: 'plus' }), 'Add ' + fol.label.toLowerCase())));
    }));
}

/* ---------- collaborators -> rolodex ---------- */
function Collaborators({ pid, ws, update, data }) {
  const { ROLES } = window.FC;
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: '', role: 'Collaborator' });
  const list = ws.collaborators || [];
  const add = () => { if (!draft.name.trim()) return; update(d => { const w = d.workspaces[pid]; (w.collaborators || (w.collaborators = [])).push({ id: window.FC.uid(), name: draft.name.trim(), role: draft.role, linked: false }); }); setDraft({ name: '', role: 'Collaborator' }); setAdding(false); };
  const del = (id) => update(d => { d.workspaces[pid].collaborators = d.workspaces[pid].collaborators.filter(c => c.id !== id); });
  const toRolodex = (c) => update(d => {
    const exists = d.people.find(p => p.name.toLowerCase() === c.name.toLowerCase());
    if (!exists) d.people.push({ id: window.FC.uid(), name: c.name, industry: c.role === 'Vendor' ? 'Vendor' : 'Other', roles: [c.role], email: '', phone: '', ig: '', project: pid, fav: false, notes: 'Added from ' + (d.projects.find(p => p.id === pid) || {}).title });
    const col = d.workspaces[pid].collaborators.find(x => x.id === c.id); if (col) col.linked = true;
  });
  return React.createElement('div', { className: 'card side-card' },
    React.createElement('div', { className: 'side-card-head' },
      React.createElement('span', { className: 'eyebrow' }, 'Working with'),
      React.createElement('button', { className: 'iconbtn', type: 'button', title: 'Add', onClick: () => setAdding(a => !a) }, React.createElement(Icon, { name: 'plus' }))),
    React.createElement('div', { className: 'collab-list' },
      list.map(c => React.createElement('div', { key: c.id, className: 'collab-row' },
        React.createElement('div', { className: 'collab-id' },
          React.createElement('span', { className: 'collab-name' }, c.name),
          React.createElement('span', { className: 'collab-role' }, c.role)),
        c.linked
          ? React.createElement('span', { className: 'collab-linked', title: 'In Rolodex' }, React.createElement(Icon, { name: 'check' }), 'Rolodex')
          : React.createElement('button', { className: 'collab-add', type: 'button', onClick: () => toRolodex(c) }, React.createElement(Icon, { name: 'plus' }), 'Rolodex'),
        React.createElement('button', { className: 'iconbtn collab-del', type: 'button', title: 'Remove', onClick: () => del(c.id) }, React.createElement(Icon, { name: 'close' })))),
      list.length === 0 && !adding && React.createElement('div', { className: 'empty' }, 'Vendors, talent, guest list\u2026')),
    adding && React.createElement('div', { className: 'collab-form' },
      React.createElement('input', { autoFocus: true, placeholder: 'Name', value: draft.name, onChange: e => setDraft({ ...draft, name: e.target.value }), onKeyDown: e => { if (e.key === 'Enter') add(); } }),
      React.createElement('select', { value: draft.role, onChange: e => setDraft({ ...draft, role: e.target.value }) }, ROLES.map(r => React.createElement('option', { key: r, value: r }, r))),
      React.createElement('button', { className: 'btn sm', type: 'button', onClick: add }, 'Add')));
}

function fmtDue(d) {
  if (!d) return null;
  const dt = new Date(d + 'T00:00:00');
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function ProjectDetail({ pid }) {
  const { data, update } = window.FC.useStore();
  const { LEVELS } = window.FC;
  const [newTodo, setNewTodo] = useState('');
  const [taskEdit, setTaskEdit] = useState(null);
  const [confirmDel, setConfirmDel] = useState(false);
  const p = data.projects.find(x => x.id === pid);
  if (!p) return React.createElement('div', { className: 'wrap' }, React.createElement('p', null, 'Project not found. ', React.createElement('a', { href: '#/projects', style: { color: 'var(--wine)' } }, 'Back to projects')));
  const ws = data.workspaces[pid] || { notes: '', todos: [], files: [], collaborators: [] };
  const relInvoices = data.invoices.filter(inv => p.title.includes(inv.client) || inv.client.includes(p.title) || (inv.project && p.title && inv.client.includes(p.title.split(' ')[0])));

  const ensure = (d) => d.workspaces[pid] || (d.workspaces[pid] = { notes: '', todos: [], files: [], collaborators: [] });
  const addTodo = () => { if (!newTodo.trim()) return; update(d => { ensure(d).todos.push({ id: window.FC.uid(), text: newTodo.trim(), done: false, level: 'med' }); }); setNewTodo(''); };
  const toggle = (id) => update(d => { const t = d.workspaces[pid].todos.find(x => x.id === id); t.done = !t.done; });
  const cycleLevel = (id) => update(d => { const t = d.workspaces[pid].todos.find(x => x.id === id); t.level = LVL_NEXT[t.level || 'med']; });
  const delTodo = (id) => update(d => { d.workspaces[pid].todos = d.workspaces[pid].todos.filter(x => x.id !== id); });
  const setNotes = (v) => update(d => { ensure(d).notes = v; });
  const setField = (k, v) => update(d => { d.projects.find(x => x.id === pid)[k] = v; });

  const done = ws.todos.filter(t => t.done).length;
  const mkTask = (t) => ({ id: t.id, text: t.text, done: t.done, level: t.level || 'med', due: t.due || '', notes: t.notes || '', project: pid, projTitle: p.title, lane: p.lane, kind: 'todo' });
  const removeProject = () => { update(d => { d.projects = d.projects.filter(x => x.id !== pid); delete d.workspaces[pid]; }); window.location.hash = '#/projects'; };

  return React.createElement('div', { className: 'wrap project-detail' },
    React.createElement('a', { href: '#/projects', className: 'back-link' }, React.createElement(Icon, { name: 'back' }), 'Projects'),

    React.createElement('header', { className: 'pd-head accent-' + p.accent },
      React.createElement('div', { className: 'pd-head-main' },
        React.createElement('span', { className: 'eyebrow' }, window.FC.laneOf(p.lane).label + ' \u00b7 ' + p.location),
        React.createElement('h1', { className: 'pd-title' }, React.createElement(Editable, { value: p.title, onChange: v => { if (v.trim()) setField('title', v.trim()); } }))),
      React.createElement('div', { className: 'pd-head-side' },
        React.createElement('span', { className: 'pd-status' }, React.createElement(Editable, { value: p.status, onChange: v => setField('status', v) })),
        React.createElement('button', { className: 'iconbtn pd-del', type: 'button', title: 'Delete project', onClick: () => setConfirmDel(true) }, React.createElement(Icon, { name: 'trash' })))),

    React.createElement('div', { className: 'pd-grid' },
      React.createElement('div', { className: 'pd-board' },
        React.createElement('div', { className: 'rule-label' }, React.createElement('span', { className: 'eyebrow' }, 'Moodboard \u00b7 drop images to fill')),
        React.createElement(Moodboard, { pid })),

      React.createElement('aside', { className: 'pd-side' },
        React.createElement('div', { className: 'card side-card' },
          React.createElement('div', { className: 'side-card-head' },
            React.createElement('span', { className: 'eyebrow' }, 'To-do'),
            React.createElement('span', { className: 'pd-count' }, done + '/' + ws.todos.length)),
          React.createElement('div', { className: 'pd-todos' },
            ws.todos.map(t => React.createElement('div', { key: t.id, className: 'pd-todo' + (t.done ? ' done' : '') },
              React.createElement(Check, { on: t.done, onClick: () => toggle(t.id) }),
              React.createElement('button', { type: 'button', className: 'lvl-pill ' + (t.level || 'med'), title: 'Priority \u2014 click to change', onClick: () => cycleLevel(t.id) }, (LEVELS[t.level] || LEVELS.med).label[0]),
              React.createElement('span', { className: 'pd-todo-text', onClick: () => setTaskEdit(mkTask(t)) },
                t.text,
                t.due && React.createElement('span', { className: 'pd-todo-due' }, React.createElement(Icon, { name: 'calendar' }), fmtDue(t.due)),
                t.notes && React.createElement(Icon, { name: 'journal', className: 'pd-todo-note' })),
              React.createElement(IconBtn, { icon: 'trash', onClick: () => delTodo(t.id), title: 'Delete' }))),
            ws.todos.length === 0 && React.createElement('div', { className: 'empty' }, 'No tasks yet')),
          React.createElement('div', { className: 'pd-add' },
            React.createElement('input', { value: newTodo, placeholder: 'Add a task\u2026', onChange: e => setNewTodo(e.target.value), onKeyDown: e => { if (e.key === 'Enter') addTodo(); } }),
            React.createElement('button', { className: 'iconbtn', onClick: addTodo, title: 'Add', type: 'button' }, React.createElement(Icon, { name: 'plus' }))),
          React.createElement('p', { className: 'pd-hint' }, 'Click a task to add a due date or notes. High-priority & due tasks appear on your Bulletin and Calendar.')),

        React.createElement(Collaborators, { pid, ws, update, data }),

        React.createElement('div', { className: 'card side-card' },
          React.createElement('span', { className: 'eyebrow' }, 'Notes'),
          React.createElement('div', { className: 'pd-notes' }, React.createElement(Editable, { value: ws.notes, multiline: true, placeholder: 'Direction, sourcing, ideas\u2026', onChange: setNotes }))),

        React.createElement('div', { className: 'card side-card' },
          React.createElement('div', { className: 'side-card-head' },
            React.createElement('span', { className: 'eyebrow' }, 'Invoices'),
            React.createElement('a', { href: '#/invoices', className: 'mini-link' }, 'All ', React.createElement(Icon, { name: 'arrow' }))),
          relInvoices.length
            ? relInvoices.map(inv => React.createElement('a', { key: inv.id, href: '#/invoice/' + inv.id, className: 'pd-inv-row' },
                React.createElement('span', { className: 'pd-inv-num' }, inv.num),
                React.createElement('span', { className: 'pd-inv-proj' }, inv.project),
                React.createElement('span', { className: 'inv-status st-' + inv.status }, inv.status)))
            : React.createElement('a', { href: '#/invoices', className: 'pd-inv-empty' }, 'No linked invoices \u2014 create one')))),

    // files
    React.createElement('section', { className: 'pd-files accent-' + p.accent },
      React.createElement('div', { className: 'rule-label' },
        React.createElement('span', { className: 'eyebrow' }, 'Files \u00b7 receipts, progress & finished'),
        React.createElement('span', { className: 'pin-hint' }, 'Drop photos & receipts into each folder')),
      React.createElement(Files, { pid, ws, update })),

    taskEdit && React.createElement(window.TaskEditor, { task: taskEdit, onClose: () => setTaskEdit(null) }),

    confirmDel && React.createElement(Modal, { title: 'Delete project?', sub: p.title, onClose: () => setConfirmDel(false), onSave: removeProject, saveLabel: 'Delete project' },
      React.createElement('p', { style: { fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)' } },
        'This permanently removes “' + p.title + '” — its moodboard, to-dos, files and collaborators. Invoices are not deleted. This cannot be undone.')));
}

window.ProjectDetail = ProjectDetail;
})();
