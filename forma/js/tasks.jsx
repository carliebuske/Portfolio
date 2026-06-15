/* ============================================================
   TASKS — one unified task list across Bulletin / Calendar / Projects.
   A "task" is either a project to-do (workspaces[pid].todos) or a
   standalone Bulletin task (priorities, project === '').
   window.TASKS = { gather, sectionOptions, add, toggle, patch, remove }
   ============================================================ */
(function () {
const { laneOf } = window.FC;

// normalize one task for display; ref tells mutators where it lives
function norm(raw, kind, project, projTitle, lane) {
  return { id: raw.id, text: raw.text, done: !!raw.done, level: raw.level || 'med',
    due: raw.due || '', notes: raw.notes || '', project, projTitle, lane, kind };
}

function gather(data) {
  const out = [];
  data.projects.forEach(p => {
    const ws = data.workspaces[p.id];
    if (!ws) return;
    (ws.todos || []).forEach(t => out.push(norm(t, 'todo', p.id, p.title, p.lane)));
  });
  (data.priorities || []).forEach(t => out.push(norm(t, 'prio', '', 'Bulletin', t.lane || 'admin')));
  return out;
}

// options for the "Section" picker: grouped by lane, value = project id
function sectionOptions(data) {
  const opts = [{ value: '', label: 'General \u00b7 Bulletin only' }];
  window.FC.LANES.forEach(l => {
    data.projects.filter(p => p.lane === l.key).forEach(p => {
      opts.push({ value: p.id, label: l.label + ' \u2014 ' + p.title });
    });
  });
  return opts;
}

function find(d, t) {
  if (t.kind === 'todo') { const ws = d.workspaces[t.project]; return ws ? ws.todos.find(x => x.id === t.id) : null; }
  return d.priorities.find(x => x.id === t.id);
}

function toggle(d, t) { const x = find(d, t); if (x) x.done = !x.done; }
function remove(d, t) {
  if (t.kind === 'todo') { const ws = d.workspaces[t.project]; if (ws) ws.todos = ws.todos.filter(x => x.id !== t.id); }
  else d.priorities = d.priorities.filter(x => x.id !== t.id);
}

// add a brand-new task into the right place
function add(d, { text, level, due, notes, project }) {
  const item = { id: window.FC.uid(), text: text || '', done: false, level: level || 'med', due: due || '', notes: notes || '' };
  if (project && d.workspaces[project]) d.workspaces[project].todos.unshift(item);
  else { item.project = ''; item.lane = 'admin'; d.priorities.unshift(item); }
}

// patch an existing task; if the chosen project changed, MOVE it
function patch(d, t, fields) {
  const targetProject = fields.project !== undefined ? fields.project : t.project;
  const samePlace = (targetProject || '') === (t.project || '');
  const base = find(d, t);
  if (!base) return;
  const merged = { id: base.id, text: fields.text != null ? fields.text : base.text,
    done: base.done, level: fields.level != null ? fields.level : base.level,
    due: fields.due != null ? fields.due : base.due, notes: fields.notes != null ? fields.notes : base.notes };
  if (samePlace) { Object.assign(base, merged); return; }
  // remove from old home, insert into new
  remove(d, t);
  if (targetProject && d.workspaces[targetProject]) d.workspaces[targetProject].todos.unshift(merged);
  else { merged.project = ''; merged.lane = 'admin'; d.priorities.unshift(merged); }
}

window.TASKS = { gather, sectionOptions, add, toggle, patch, remove };
})();
