/* ============================================================
   PROJECTS — overview, grouped by the 8 shared sections.
   Add new projects (+ in header and per-section), and quick-add
   tasks straight from each project card.
   ============================================================ */
(function () {
const { useState } = React;
const { Icon, Modal, Field } = window.UI;

function ProjectCard({ p, ws }) {
  const { update } = window.FC.useStore();
  const [adding, setAdding] = useState(false);
  const [task, setTask] = useState('');
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(p.title);
  const [confirmDel, setConfirmDel] = useState(false);
  const todos = (ws && ws.todos) || [];
  const done = todos.filter(t => t.done).length;
  const pct = todos.length ? Math.round(done / todos.length * 100) : 0;
  const open = todos.filter(t => !t.done);

  const addTask = () => {
    if (!task.trim()) return;
    update(d => {
      const w = d.workspaces[p.id] || (d.workspaces[p.id] = { notes: '', todos: [], files: [], collaborators: [] });
      w.todos.push({ id: window.FC.uid(), text: task.trim(), done: false, level: 'med', due: '', notes: '' });
    });
    setTask('');
  };
  const saveName = () => {
    const v = name.trim();
    if (v && v !== p.title) update(d => { const x = d.projects.find(pr => pr.id === p.id); if (x) x.title = v; });
    else setName(p.title);
    setRenaming(false);
  };
  const removeProject = () => update(d => { d.projects = d.projects.filter(pr => pr.id !== p.id); delete d.workspaces[p.id]; });

  return React.createElement('div', { className: 'card proj-card accent-' + p.accent },
    confirmDel && React.createElement('div', { className: 'proj-confirm', onClick: e => e.stopPropagation() },
      React.createElement('span', null, 'Delete “' + p.title + '”?'),
      React.createElement('div', { className: 'proj-confirm-btns' },
        React.createElement('button', { className: 'btn ghost sm', type: 'button', onClick: () => setConfirmDel(false) }, 'Cancel'),
        React.createElement('button', { className: 'btn sm danger', type: 'button', onClick: removeProject }, 'Delete'))),
    React.createElement('a', { href: '#/project/' + p.id, className: 'proj-body', onClick: e => { if (renaming) e.preventDefault(); } },
      React.createElement('div', { className: 'proj-top' },
        React.createElement('div', { className: 'proj-top-text' },
          React.createElement('span', { className: 'proj-loc' }, p.location),
          renaming
            ? React.createElement('input', { className: 'proj-rename', autoFocus: true, value: name,
                onClick: e => { e.preventDefault(); e.stopPropagation(); },
                onChange: e => setName(e.target.value),
                onKeyDown: e => { if (e.key === 'Enter') { e.preventDefault(); saveName(); } if (e.key === 'Escape') { setName(p.title); setRenaming(false); } },
                onBlur: saveName })
            : React.createElement('h3', { className: 'proj-title' }, p.title)),
        React.createElement('span', { className: 'proj-status' }, p.status)),
      React.createElement('div', { className: 'proj-next' },
        open.length
          ? React.createElement(React.Fragment, null,
              React.createElement('span', { className: 'pn-label' }, 'Next'),
              React.createElement('span', { className: 'pn-task' }, open[0].text))
          : React.createElement('span', { className: 'pn-label' }, todos.length ? 'All clear \u2713' : 'No tasks yet')),
      React.createElement('div', { className: 'proj-foot' },
        React.createElement('div', { className: 'proj-bar' },
          React.createElement('span', { style: { width: pct + '%' } })),
        React.createElement('span', { className: 'proj-count' }, done + '/' + todos.length),
        React.createElement(Icon, { name: 'arrow', className: 'proj-arrow' }))),
    React.createElement('div', { className: 'proj-quick' },
      adding
        ? React.createElement('div', { className: 'proj-quick-form' },
            React.createElement('input', { autoFocus: true, value: task, placeholder: 'New task\u2026',
              onChange: e => setTask(e.target.value),
              onKeyDown: e => { if (e.key === 'Enter') addTask(); if (e.key === 'Escape') { setAdding(false); setTask(''); } },
              onBlur: () => { if (!task.trim()) setAdding(false); } }),
            React.createElement('button', { className: 'iconbtn', type: 'button', title: 'Add task', onMouseDown: e => e.preventDefault(), onClick: addTask }, React.createElement(Icon, { name: 'plus' })))
        : React.createElement(React.Fragment, null,
            React.createElement('button', { className: 'proj-quick-btn', type: 'button', onClick: () => setAdding(true) },
              React.createElement(Icon, { name: 'plus' }), 'Add task'),
            React.createElement('div', { className: 'proj-quick-actions' },
              React.createElement('button', { className: 'iconbtn', type: 'button', title: 'Rename project', onClick: () => { setName(p.title); setRenaming(true); } }, React.createElement(Icon, { name: 'edit' })),
              React.createElement('button', { className: 'iconbtn', type: 'button', title: 'Delete project', onClick: () => setConfirmDel(true) }, React.createElement(Icon, { name: 'trash' }))))));
}

function NewProjectModal({ presetLane, onClose }) {
  const { update } = window.FC.useStore();
  const { LANES, laneOf } = window.FC;
  const [draft, setDraft] = useState({ title: '', location: '', lane: presetLane || 'interior', status: 'In progress' });
  const save = () => {
    if (!draft.title.trim()) return;
    const id = window.FC.uid();
    update(d => {
      d.projects.push({ id, lane: draft.lane, title: draft.title.trim(), location: draft.location.trim() || laneOf(draft.lane).label, accent: laneOf(draft.lane).cls, status: draft.status.trim() || 'In progress' });
      d.workspaces[id] = { notes: '', todos: [], files: [], collaborators: [] };
    });
    onClose();
    window.location.hash = '#/project/' + id;
  };
  return React.createElement(Modal, { title: 'New project', sub: 'Projects', onClose, onSave: save, saveLabel: 'Create project' },
    React.createElement(Field, { label: 'Project name', value: draft.title, onChange: v => setDraft({ ...draft, title: v }), placeholder: 'e.g. Soho Loft' }),
    React.createElement('div', { className: 'field-row' },
      React.createElement(Field, { label: 'Location / client', value: draft.location, onChange: v => setDraft({ ...draft, location: v }), placeholder: 'New York, NY' }),
      React.createElement(Field, { label: 'Status', value: draft.status, onChange: v => setDraft({ ...draft, status: v }), placeholder: 'In progress' })),
    React.createElement(Field, { label: 'Section', value: draft.lane, onChange: v => setDraft({ ...draft, lane: v }), options: LANES.map(l => ({ value: l.key, label: l.label })) }),
    React.createElement('p', { className: 'pd-hint', style: { marginTop: 4 } }, 'Creates a project page with its own moodboard, to-dos, files and invoicing.'));
}

function Projects() {
  const { data } = window.FC.useStore();
  const { LANES } = window.FC;
  const [modal, setModal] = useState(null); // null | { lane }

  return React.createElement('div', { className: 'wrap' },
    React.createElement('header', { className: 'page-head' },
      React.createElement('div', { className: 'head-row' },
        React.createElement('div', null,
          React.createElement('span', { className: 'eyebrow' }, 'The Work'),
          React.createElement('h1', null, 'Projects'),
          React.createElement('p', { className: 'sub' }, 'Grouped by section. Every project has its own page \u2014 moodboard, to-dos, files and invoicing. Tasks here connect to your Bulletin and Calendar.')),
        React.createElement('button', { className: 'btn', type: 'button', onClick: () => setModal({ lane: null }) }, React.createElement('span', { className: 'plus' }, '+'), 'New project'))),

    LANES.map(l => {
      const list = data.projects.filter(p => p.lane === l.key);
      if (!list.length) return null;
      return React.createElement('section', { key: l.key, className: 'proj-group' },
        React.createElement('div', { className: 'rule-label' },
          React.createElement('span', { className: 'eyebrow' },
            React.createElement('span', { className: 'sect-dot ' + l.cls }), l.label),
          React.createElement('button', { className: 'sect-add', type: 'button', title: 'Add project to ' + l.label, onClick: () => setModal({ lane: l.key }) },
            React.createElement(Icon, { name: 'plus' }))),
        React.createElement('div', { className: 'proj-grid' },
          list.map(p => React.createElement(ProjectCard, { key: p.id, p, ws: data.workspaces[p.id] })),
          React.createElement('button', { className: 'proj-add-card', type: 'button', onClick: () => setModal({ lane: l.key }) },
            React.createElement(Icon, { name: 'plus' }), 'Add project')));
    }),

    modal && React.createElement(NewProjectModal, { presetLane: modal.lane, onClose: () => setModal(null) }));
}

window.Projects = Projects;
})();
