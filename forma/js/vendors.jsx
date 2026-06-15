/* ============================================================
   VENDORS — trade discounts, POC, logins
   ============================================================ */
(function () {
const { useState } = React;
const { Icon, Modal, Field, IconBtn } = window.UI;

function Cell({ label, children }) {
  return React.createElement('div', { className: 'vd-cell' },
    React.createElement('div', { className: 'vd-label' }, label),
    React.createElement('div', { className: 'vd-val' }, children));
}

function copy(text) { if (text) navigator.clipboard && navigator.clipboard.writeText(text); }
function normUrl(u) { if (!u) return ''; return /^https?:\/\//i.test(u) ? u : 'https://' + u; }
function prettyUrl(u) { return (u || '').replace(/^https?:\/\//i, '').replace(/\/$/, ''); }

function VendorCard({ v, onEdit, onDelete }) {
  const [show, setShow] = useState(false);
  return React.createElement('div', { className: 'card vendor-card' },
    React.createElement('div', { className: 'vendor-top' },
      React.createElement('div', { className: 'vendor-disc' }, v.discount || '\u2014'),
      React.createElement('div', { className: 'vendor-id' },
        v.website
          ? React.createElement('a', { className: 'vendor-name vendor-link', href: normUrl(v.website), target: '_blank', rel: 'noopener', title: 'Visit ' + prettyUrl(v.website) }, v.name, React.createElement(Icon, { name: 'link', className: 'vn-ext' }))
          : React.createElement('div', { className: 'vendor-name' }, v.name),
        React.createElement('div', { className: 'vendor-cat' }, v.category || 'Vendor')),
      React.createElement('div', { style: { display: 'flex', gap: 1 } },
        React.createElement(IconBtn, { icon: 'edit', onClick: onEdit, title: 'Edit' }),
        React.createElement(IconBtn, { icon: 'trash', onClick: onDelete, title: 'Delete' }))),
    React.createElement('div', { className: 'vendor-detail' },
      React.createElement(Cell, { label: 'Point of contact' }, v.poc || React.createElement('span', { style: { color: 'var(--ink-3)' } }, '\u2014')),
      React.createElement(Cell, { label: 'POC email' },
        v.pocEmail ? React.createElement(React.Fragment, null,
          React.createElement('a', { href: 'mailto:' + v.pocEmail, className: 'mono' }, v.pocEmail),
          React.createElement('button', { className: 'iconbtn copy-btn', onClick: () => copy(v.pocEmail), title: 'Copy', type: 'button' }, React.createElement(Icon, { name: 'copy' })))
        : React.createElement('span', { style: { color: 'var(--ink-3)' } }, '\u2014')),
      React.createElement(Cell, { label: 'POC phone' }, v.pocPhone ? React.createElement('span', { className: 'mono' }, v.pocPhone) : React.createElement('span', { style: { color: 'var(--ink-3)' } }, '\u2014')),
      React.createElement(Cell, { label: 'Login' },
        React.createElement('span', { className: 'mono' }, v.login || '\u2014'),
        v.login && React.createElement('button', { className: 'iconbtn copy-btn', onClick: () => copy(v.login), title: 'Copy', type: 'button' }, React.createElement(Icon, { name: 'copy' }))),
      React.createElement(Cell, { label: 'Password' },
        React.createElement('span', { className: 'mono' }, v.password ? (show ? v.password : '\u2022'.repeat(Math.min(v.password.length, 10))) : '\u2014'),
        v.password && React.createElement(React.Fragment, null,
          React.createElement('button', { className: 'iconbtn reveal-btn', onClick: () => setShow(s => !s), title: show ? 'Hide' : 'Reveal', type: 'button' }, React.createElement(Icon, { name: show ? 'eyeoff' : 'eye' })),
          React.createElement('button', { className: 'iconbtn copy-btn', onClick: () => copy(v.password), title: 'Copy', type: 'button' }, React.createElement(Icon, { name: 'copy' })))),
      v.notes && React.createElement(Cell, { label: 'Notes' }, v.notes)));
}

function Vendors() {
  const { data, update } = window.FC.useStore();
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});

  const open = (v) => { setEditing(v || 'new'); setDraft(v ? { ...v } : { name: '', category: '', discount: '', website: '', poc: '', pocEmail: '', pocPhone: '', login: 'seen@formacurate.com', password: '', notes: '' }); };
  const save = () => {
    update(d => {
      if (editing !== 'new' && editing.id) Object.assign(d.vendors.find(x => x.id === editing.id), draft);
      else d.vendors.push({ id: window.FC.uid(), ...draft });
    });
    setEditing(null);
  };
  const del = (id) => update(d => { d.vendors = d.vendors.filter(x => x.id !== id); });

  const ql = q.toLowerCase();
  const list = data.vendors.filter(v => !ql || [v.name, v.category, v.notes].join(' ').toLowerCase().includes(ql));

  return React.createElement('div', { className: 'wrap' },
    React.createElement('header', { className: 'page-head' },
      React.createElement('div', { className: 'head-row' },
        React.createElement('div', null,
          React.createElement('span', { className: 'eyebrow' }, 'Trade & Sourcing'),
          React.createElement('h1', null, 'Vendors'),
          React.createElement('p', { className: 'sub' }, 'Furniture and home-goods accounts with trade discounts, points of contact, and logins. Stored in this browser only \u2014 keep your master passwords in a real manager.')),
        React.createElement('button', { className: 'btn', onClick: () => open(null), type: 'button' },
          React.createElement('span', { className: 'plus' }, '+'), 'Add vendor'))),

    React.createElement('div', { className: 'toolbar' },
      React.createElement('div', { className: 'search' },
        React.createElement(Icon, { name: 'vendors' }),
        React.createElement('input', { placeholder: 'Search vendors\u2026', value: q, onChange: e => setQ(e.target.value) }))),

    React.createElement('div', { className: 'vendor-list' },
      list.map(v => React.createElement(VendorCard, { key: v.id, v, onEdit: () => open(v), onDelete: () => del(v.id) })),
      list.length === 0 && React.createElement('div', { className: 'empty' }, 'No vendors yet')),

    editing && React.createElement(Modal, {
      title: editing === 'new' ? 'New vendor' : 'Edit vendor', sub: 'Trade account', wide: true,
      onClose: () => setEditing(null), onSave: save },
      React.createElement('div', { className: 'field-row' },
        React.createElement(Field, { label: 'Vendor name', value: draft.name, onChange: v => setDraft({ ...draft, name: v }) }),
        React.createElement(Field, { label: 'Category', value: draft.category, onChange: v => setDraft({ ...draft, category: v }), placeholder: 'Furniture, lighting\u2026' })),
      React.createElement('div', { className: 'field-row' },
        React.createElement(Field, { label: 'Discount', value: draft.discount, onChange: v => setDraft({ ...draft, discount: v }), placeholder: 'e.g. 20% / To Trade' }),
        React.createElement(Field, { label: 'Website URL', value: draft.website, onChange: v => setDraft({ ...draft, website: v }), placeholder: 'https://…' })),
      React.createElement(Field, { label: 'Point of contact', value: draft.poc, onChange: v => setDraft({ ...draft, poc: v }) }),
      React.createElement('div', { className: 'field-row' },
        React.createElement(Field, { label: 'POC email', value: draft.pocEmail, onChange: v => setDraft({ ...draft, pocEmail: v }), type: 'email' }),
        React.createElement(Field, { label: 'POC phone', value: draft.pocPhone, onChange: v => setDraft({ ...draft, pocPhone: v }) })),
      React.createElement('div', { className: 'field-row' },
        React.createElement(Field, { label: 'Login / account email', value: draft.login, onChange: v => setDraft({ ...draft, login: v }) }),
        React.createElement(Field, { label: 'Password', value: draft.password, onChange: v => setDraft({ ...draft, password: v }) })),
      React.createElement(Field, { label: 'Notes', value: draft.notes, onChange: v => setDraft({ ...draft, notes: v }), textarea: true })));
}

window.Vendors = Vendors;
})();
