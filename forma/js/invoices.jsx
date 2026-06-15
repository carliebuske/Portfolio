/* ============================================================
   INVOICES — tracker + printable template
   ============================================================ */
(function () {
const { useState } = React;
const { Icon, Modal, Field, IconBtn, Editable } = window.UI;

const STATUSES = ['to-make', 'sent', 'paid'];
const STATUS_LABEL = { 'to-make': 'To make', 'sent': 'Sent', 'paid': 'Paid' };

function money(n) {
  const v = parseFloat(n);
  if (isNaN(v)) return '';
  return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function invoiceTotal(inv) {
  return (inv.items || []).reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0), 0);
}

/* ---------------- TRACKER ---------------- */
function Invoices() {
  const { data, update } = window.FC.useStore();
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});

  const cycle = (id) => update(d => { const inv = d.invoices.find(x => x.id === id); inv.status = STATUSES[(STATUSES.indexOf(inv.status) + 1) % STATUSES.length]; });
  const del = (id) => update(d => { d.invoices = d.invoices.filter(x => x.id !== id); });
  const open = () => {
    const n = 'FC-' + (1042 + data.invoices.length);
    setDraft({ num: n, client: '', project: '', due: '', status: 'to-make' });
    setEditing(true);
  };
  const save = () => {
    update(d => { d.invoices.unshift({ id: window.FC.uid(), ...draft, items: [{ id: window.FC.uid(), desc: draft.project || 'Services', qty: 1, rate: '' }], notes: '' }); });
    setEditing(false);
  };

  const list = data.invoices.filter(inv => filter === 'all' || inv.status === filter);
  const counts = STATUSES.reduce((o, s) => (o[s] = data.invoices.filter(i => i.status === s).length, o), {});

  return React.createElement('div', { className: 'wrap' },
    React.createElement('header', { className: 'page-head' },
      React.createElement('div', { className: 'head-row' },
        React.createElement('div', null,
          React.createElement('span', { className: 'eyebrow' }, 'The Ledger'),
          React.createElement('h1', null, 'Invoices'),
          React.createElement('p', { className: 'sub' }, 'Track what to make, what\u2019s out, and what\u2019s paid. Open any invoice for a clean template you can fill and print to PDF.')),
        React.createElement('button', { className: 'btn', onClick: open, type: 'button' },
          React.createElement('span', { className: 'plus' }, '+'), 'New invoice'))),

    React.createElement('div', { className: 'filter-chips', style: { marginBottom: 22 } },
      React.createElement('button', { type: 'button', className: 'chip' + (filter === 'all' ? ' on' : ''), onClick: () => setFilter('all') }, 'All \u00b7 ' + data.invoices.length),
      STATUSES.map(s => React.createElement('button', { key: s, type: 'button', className: 'chip' + (filter === s ? ' on' : ''), onClick: () => setFilter(s) }, STATUS_LABEL[s] + ' \u00b7 ' + counts[s]))),

    React.createElement('div', { className: 'inv-table' },
      React.createElement('div', { className: 'inv-row inv-head' },
        React.createElement('span', null, 'No.'), React.createElement('span', null, 'Client'),
        React.createElement('span', null, 'Project'), React.createElement('span', null, 'Due'),
        React.createElement('span', null, 'Total'), React.createElement('span', null, 'Status'), React.createElement('span', null, '')),
      list.map(inv => React.createElement('div', { key: inv.id, className: 'inv-row' },
        React.createElement('a', { href: '#/invoice/' + inv.id, className: 'inv-num' }, inv.num),
        React.createElement('span', null, inv.client || '\u2014'),
        React.createElement('span', { className: 'inv-proj' }, inv.project || '\u2014'),
        React.createElement('span', { className: 'mono-cell' }, inv.due || '\u2014'),
        React.createElement('span', { className: 'mono-cell' }, money(invoiceTotal(inv)) || '\u2014'),
        React.createElement('button', { className: 'inv-status st-' + inv.status, onClick: () => cycle(inv.id), title: 'Click to advance', type: 'button' }, STATUS_LABEL[inv.status]),
        React.createElement('div', { className: 'inv-row-actions' },
          React.createElement('a', { href: '#/invoice/' + inv.id, className: 'iconbtn', title: 'Open' }, React.createElement(Icon, { name: 'arrow' })),
          React.createElement(IconBtn, { icon: 'trash', onClick: () => del(inv.id), title: 'Delete' })))),
      list.length === 0 && React.createElement('div', { className: 'empty', style: { margin: 20 } }, 'Nothing here')),

    editing && React.createElement(Modal, { title: 'New invoice', sub: 'Ledger', onClose: () => setEditing(false), onSave: save },
      React.createElement('div', { className: 'field-row' },
        React.createElement(Field, { label: 'Invoice no.', value: draft.num, onChange: v => setDraft({ ...draft, num: v }) }),
        React.createElement(Field, { label: 'Due date', value: draft.due, onChange: v => setDraft({ ...draft, due: v }), type: 'date' })),
      React.createElement(Field, { label: 'Client', value: draft.client, onChange: v => setDraft({ ...draft, client: v }) }),
      React.createElement(Field, { label: 'Project', value: draft.project, onChange: v => setDraft({ ...draft, project: v }) })));
}

/* ---------------- PRINTABLE INVOICE ---------------- */
function InvoiceDetail({ id }) {
  const { data, update } = window.FC.useStore();
  const inv = data.invoices.find(x => x.id === id);
  if (!inv) return React.createElement('div', { className: 'wrap' }, React.createElement('a', { href: '#/invoices' }, 'Back to invoices'));

  const setF = (k, v) => update(d => { d.invoices.find(x => x.id === id)[k] = v; });
  const setItem = (iid, k, v) => update(d => { d.invoices.find(x => x.id === id).items.find(x => x.id === iid)[k] = v; });
  const addItem = () => update(d => { d.invoices.find(x => x.id === id).items.push({ id: window.FC.uid(), desc: '', qty: 1, rate: '' }); });
  const delItem = (iid) => update(d => { const x = d.invoices.find(x => x.id === id); x.items = x.items.filter(i => i.id !== iid); });
  const total = invoiceTotal(inv);

  return React.createElement('div', { className: 'wrap inv-detail-wrap' },
    React.createElement('div', { className: 'inv-toolbar no-print' },
      React.createElement('a', { href: '#/invoices', className: 'back-link', style: { margin: 0 } }, React.createElement(Icon, { name: 'back' }), 'Invoices'),
      React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
        React.createElement('select', { className: 'st-select inv-status st-' + inv.status, value: inv.status, onChange: e => setF('status', e.target.value) },
          STATUSES.map(s => React.createElement('option', { key: s, value: s }, STATUS_LABEL[s]))),
        React.createElement('button', { className: 'btn', onClick: () => window.print(), type: 'button' }, React.createElement(Icon, { name: 'print' }), 'Print / PDF'))),

    React.createElement('div', { className: 'invoice-sheet' },
      React.createElement('div', { className: 'inv-letterhead' },
        React.createElement('div', null,
          React.createElement('div', { className: 'inv-mark' }, 'Forma ', React.createElement('em', null, 'Curate')),
          React.createElement('div', { className: 'inv-tagline' }, 'Interior design \u00b7 events \u00b7 tablescapes \u00b7 florals')),
        React.createElement('div', { className: 'inv-from' },
          React.createElement('div', null, 'New York, NY'),
          React.createElement('div', null, data.profile.email))),

      React.createElement('div', { className: 'inv-meta-row' },
        React.createElement('div', null,
          React.createElement('div', { className: 'inv-meta-label' }, 'Billed to'),
          React.createElement('div', { className: 'inv-billto' }, React.createElement(Editable, { value: inv.client, placeholder: 'Client name', onChange: v => setF('client', v) })),
          React.createElement('div', { className: 'inv-billto-sub' }, React.createElement(Editable, { value: inv.project, placeholder: 'Project / description', onChange: v => setF('project', v) }))),
        React.createElement('div', { className: 'inv-meta-right' },
          React.createElement('div', { className: 'inv-meta-pair' }, React.createElement('span', null, 'Invoice'), React.createElement('strong', null, React.createElement(Editable, { value: inv.num, onChange: v => setF('num', v) }))),
          React.createElement('div', { className: 'inv-meta-pair' }, React.createElement('span', null, 'Date due'), React.createElement('strong', null, React.createElement(Editable, { value: inv.due, placeholder: 'YYYY-MM-DD', onChange: v => setF('due', v) }))),
          React.createElement('div', { className: 'inv-meta-pair' }, React.createElement('span', null, 'Status'), React.createElement('strong', null, STATUS_LABEL[inv.status])))),

      React.createElement('div', { className: 'inv-items' },
        React.createElement('div', { className: 'ii-head' },
          React.createElement('span', null, 'Description'), React.createElement('span', null, 'Qty'),
          React.createElement('span', null, 'Rate'), React.createElement('span', null, 'Amount'), React.createElement('span', { className: 'no-print' }, '')),
        inv.items.map(it => React.createElement('div', { key: it.id, className: 'ii-row' },
          React.createElement('input', { className: 'ii-desc', value: it.desc, placeholder: 'Description of work', onChange: e => setItem(it.id, 'desc', e.target.value) }),
          React.createElement('input', { className: 'ii-qty', value: it.qty, onChange: e => setItem(it.id, 'qty', e.target.value) }),
          React.createElement('input', { className: 'ii-rate', value: it.rate, placeholder: '0.00', onChange: e => setItem(it.id, 'rate', e.target.value) }),
          React.createElement('span', { className: 'ii-amt' }, money((parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0)) || '\u2014'),
          React.createElement('button', { className: 'iconbtn no-print', onClick: () => delItem(it.id), type: 'button', title: 'Remove' }, React.createElement(Icon, { name: 'close' })))),
        React.createElement('button', { className: 'btn ghost sm no-print ii-add', onClick: addItem, type: 'button' }, React.createElement('span', { className: 'plus' }, '+'), 'Add line')),

      React.createElement('div', { className: 'inv-total-row' },
        React.createElement('div', { className: 'inv-total-box' },
          React.createElement('span', null, 'Total due'),
          React.createElement('strong', null, money(total) || '$0.00'))),

      React.createElement('div', { className: 'inv-notes' },
        React.createElement('div', { className: 'inv-meta-label' }, 'Notes'),
        React.createElement('div', { className: 'inv-notes-body' }, React.createElement(Editable, { value: inv.notes, multiline: true, placeholder: 'Payment terms, thank-you note\u2026', onChange: v => setF('notes', v) }))),

      React.createElement('div', { className: 'inv-foot' }, 'Thank you \u2014 Forma Curate')));
}

window.Invoices = Invoices;
window.InvoiceDetail = InvoiceDetail;
})();
