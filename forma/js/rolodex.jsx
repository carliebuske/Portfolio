/* ============================================================
   ROLODEX — people: multi-group network, multi-select filters,
   interior-client section linked to projects. No card photos.
   ============================================================ */
(function () {
const { useState } = React;
const { Icon, Modal, Field, IconBtn } = window.UI;

const IND_CLS = {
  'Interior Client': 'olive', 'Brand': 'mauve', 'Hospitality': 'wine', 'Music': 'plum',
  'Beverage': 'clay', 'Media & Press': 'aqua', 'Talent': 'ochre', 'Vendor': 'taupe', 'Other': 'sage',
};
const groupsOf = (p) => (p.groups && p.groups.length ? p.groups : [p.industry]).filter(Boolean);

function PersonCard({ person, project, onEdit, onDelete, onFav }) {
  const igHandle = (person.ig || '').replace(/^@/, '');
  const groups = groupsOf(person);
  return React.createElement('div', { className: 'card person-card no-photo' },
    React.createElement('div', { className: 'pc-actions' },
      React.createElement('button', { className: 'fav-btn' + (person.fav ? ' on' : ''), type: 'button', title: 'Favourite', onClick: onFav }, React.createElement(Icon, { name: 'star' })),
      React.createElement(IconBtn, { icon: 'edit', onClick: onEdit, title: 'Edit' }),
      React.createElement(IconBtn, { icon: 'trash', onClick: onDelete, title: 'Delete' })),
    React.createElement('div', { className: 'pc-body' },
      React.createElement('h3', { className: 'pc-name' }, person.name),
      React.createElement('div', { className: 'pc-tags' },
        groups.map((g, i) => React.createElement('span', { key: i, className: 'tag ' + (IND_CLS[g] || 'taupe') }, React.createElement('span', { className: 'dot' }), g))),
      person.roles && person.roles.length > 0 && React.createElement('div', { className: 'pc-roles' },
        person.roles.map((r, i) => React.createElement('span', { key: i, className: 'role-chip' }, r))),
      React.createElement('div', { className: 'pc-contacts' },
        person.email && React.createElement('a', { className: 'pc-line', href: 'mailto:' + person.email }, React.createElement(Icon, { name: 'mail' }), React.createElement('span', null, person.email)),
        person.phone && React.createElement('a', { className: 'pc-line', href: 'tel:' + person.phone }, React.createElement(Icon, { name: 'phone' }), React.createElement('span', null, person.phone)),
        igHandle && React.createElement('a', { className: 'pc-line', href: 'https://instagram.com/' + igHandle, target: '_blank', rel: 'noopener' }, React.createElement(Icon, { name: 'ig' }), React.createElement('span', null, '@' + igHandle))),
      person.notes && React.createElement('p', { className: 'pc-notes' }, person.notes),
      project && React.createElement('a', { className: 'pc-project', href: '#/project/' + project.id }, React.createElement(Icon, { name: 'projects' }), project.title, React.createElement(Icon, { name: 'arrow', className: 'pc-proj-arrow' }))));
}

function Rolodex() {
  const { data, update } = window.FC.useStore();
  const { INDUSTRIES } = window.FC;
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(new Set()); // multi-select industries/groups
  const [sort, setSort] = useState('az');
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});

  const toggleFilter = (g) => setSel(prev => { const n = new Set(prev); n.has(g) ? n.delete(g) : n.add(g); return n; });
  const projectOf = (p) => data.projects.find(x => x.id === p.project);

  const open = (p) => {
    setEditing(p || 'new');
    setDraft(p ? { ...p, groups: groupsOf(p), rolesStr: (p.roles || []).join(', ') }
      : { name: '', groups: ['Other'], rolesStr: '', email: '', phone: '', ig: '', project: '', notes: '', fav: false });
  };
  const toggleGroup = (g) => setDraft(d => {
    const has = (d.groups || []).includes(g);
    const groups = has ? d.groups.filter(x => x !== g) : [...(d.groups || []), g];
    return { ...d, groups };
  });
  const save = () => {
    const roles = draft.rolesStr.split(',').map(s => s.trim()).filter(Boolean);
    let groups = (draft.groups && draft.groups.length) ? draft.groups : ['Other'];
    const { rolesStr, ...rest } = draft;
    const record = { ...rest, roles, groups, industry: groups[0] };
    update(d => {
      if (editing !== 'new' && editing.id) Object.assign(d.people.find(x => x.id === editing.id), record);
      else d.people.push({ id: window.FC.uid(), ...record });
    });
    setEditing(null);
  };
  const del = (id) => update(d => { d.people = d.people.filter(x => x.id !== id); });
  const fav = (id) => update(d => { const p = d.people.find(x => x.id === id); p.fav = !p.fav; });

  const ql = q.toLowerCase();
  const matches = (p) => !ql || [p.name, groupsOf(p).join(' '), (p.roles || []).join(' '), p.notes].join(' ').toLowerCase().includes(ql);
  const inFilter = (p) => sel.size === 0 || groupsOf(p).some(g => sel.has(g));

  const clients = data.people.filter(p => groupsOf(p).includes('Interior Client') && matches(p));

  let network = data.people.filter(p => matches(p) && inFilter(p));
  network = [...network].sort((a, b) => sort === 'fav' ? (b.fav - a.fav) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));

  const editForm = editing && React.createElement(Modal, {
    title: editing === 'new' ? 'New person' : 'Edit person', sub: 'Rolodex', wide: true,
    onClose: () => setEditing(null), onSave: save },
    React.createElement(Field, { label: 'Name', value: draft.name, onChange: v => setDraft({ ...draft, name: v }) }),
    React.createElement('div', { className: 'field' },
      React.createElement('label', null, 'Network groups \u2014 choose any'),
      React.createElement('div', { className: 'group-pick' },
        INDUSTRIES.map(g => React.createElement('button', { key: g, type: 'button',
          className: 'chip group-chip ' + (IND_CLS[g] || 'taupe') + ((draft.groups || []).includes(g) ? ' on' : ''),
          onClick: () => toggleGroup(g) },
          React.createElement('span', { className: 'cdot ' + (IND_CLS[g] || 'taupe') }), g,
          (draft.groups || []).includes(g) && React.createElement('span', { className: 'chip-check' }, '\u2713'))))),
    React.createElement(Field, { label: 'Roles (comma-separated)', value: draft.rolesStr, onChange: v => setDraft({ ...draft, rolesStr: v }), placeholder: 'Client, Guest list, Talent\u2026' }),
    React.createElement('div', { className: 'field-row' },
      React.createElement(Field, { label: 'Email', value: draft.email, onChange: v => setDraft({ ...draft, email: v }), type: 'email' }),
      React.createElement(Field, { label: 'Phone', value: draft.phone, onChange: v => setDraft({ ...draft, phone: v }) })),
    React.createElement('div', { className: 'field-row' },
      React.createElement(Field, { label: 'Instagram', value: draft.ig, onChange: v => setDraft({ ...draft, ig: v }), placeholder: '@handle' }),
      React.createElement(Field, { label: 'Linked project', value: draft.project, onChange: v => setDraft({ ...draft, project: v }), options: [{ value: '', label: '\u2014 none \u2014' }].concat(data.projects.map(p => ({ value: p.id, label: p.title }))) })),
    React.createElement(Field, { label: 'Notes', value: draft.notes, onChange: v => setDraft({ ...draft, notes: v }), textarea: true }));

  return React.createElement('div', { className: 'wrap' },
    React.createElement('header', { className: 'page-head' },
      React.createElement('div', { className: 'head-row' },
        React.createElement('div', null,
          React.createElement('span', { className: 'eyebrow' }, 'The Rolodex'),
          React.createElement('h1', null, 'People'),
          React.createElement('p', { className: 'sub' }, 'Everyone in the Forma Curate orbit \u2014 clients, talent, brands, hospitality, music, beverage and press. Assign each person to as many network groups as fit.')),
        React.createElement('button', { className: 'btn', onClick: () => open(null), type: 'button' }, React.createElement('span', { className: 'plus' }, '+'), 'Add person'))),

    clients.length > 0 && React.createElement('section', { className: 'rolo-net' },
      React.createElement('div', { className: 'rule-label' }, React.createElement('span', { className: 'eyebrow' }, 'Interior Clients \u00b7 ' + clients.length)),
      React.createElement('div', { className: 'contact-grid' },
        clients.map(p => React.createElement(PersonCard, { key: p.id, person: p, project: projectOf(p), onEdit: () => open(p), onDelete: () => del(p.id), onFav: () => fav(p.id) })))),

    React.createElement('div', { className: 'rule-label' }, React.createElement('span', { className: 'eyebrow' }, 'Network \u00b7 ' + network.length)),
    React.createElement('div', { className: 'toolbar' },
      React.createElement('div', { className: 'search' },
        React.createElement(Icon, { name: 'search2' }),
        React.createElement('input', { placeholder: 'Search people\u2026', value: q, onChange: e => setQ(e.target.value) })),
      React.createElement('select', { className: 'sort-select', value: sort, onChange: e => setSort(e.target.value) },
        React.createElement('option', { value: 'az' }, 'A \u2013 Z'),
        React.createElement('option', { value: 'fav' }, 'Favourites first'))),
    React.createElement('div', { className: 'filter-row' },
      React.createElement('div', { className: 'filter-chips', style: { marginBottom: 0 } },
        React.createElement('button', { type: 'button', className: 'chip' + (sel.size === 0 ? ' on' : ''), onClick: () => setSel(new Set()) }, 'All'),
        INDUSTRIES.map(g => React.createElement('button', { key: g, type: 'button',
          className: 'chip group-chip ' + (IND_CLS[g] || 'taupe') + (sel.has(g) ? ' on' : ''),
          onClick: () => toggleFilter(g) },
          React.createElement('span', { className: 'cdot ' + (IND_CLS[g] || 'taupe') }), g,
          sel.has(g) && React.createElement('span', { className: 'chip-check' }, '\u2713')))),
      sel.size > 0 && React.createElement('span', { className: 'filter-meta' }, sel.size + ' selected \u00b7 ', React.createElement('button', { type: 'button', className: 'linkish', onClick: () => setSel(new Set()) }, 'clear'))),

    React.createElement('div', { className: 'contact-grid', style: { marginTop: 22 } },
      network.map(p => React.createElement(PersonCard, { key: p.id, person: p, project: projectOf(p), onEdit: () => open(p), onDelete: () => del(p.id), onFav: () => fav(p.id) })),
      network.length === 0 && React.createElement('div', { className: 'empty' }, 'No one matches \u2014 try another filter')),

    editForm);
}

window.Rolodex = Rolodex;
})();
