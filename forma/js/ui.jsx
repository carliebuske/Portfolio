/* ============================================================
   UI — shared components + icons
   exposes window.UI = { Icon, Modal, Field, Check, IconBtn, Tag,
                         Eyebrow, RuleLabel, Editable, useHash }
   ============================================================ */
const { useState: uUseState, useEffect: uUseEffect, useRef: uUseRef } = React;

/* ---------------- icons (stroke, 1.6) ---------------- */
const PATHS = {
  home:     'M3 11.5 12 4l9 7.5M5 10v9h5v-6h4v6h5v-9',
  calendar: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  rolodex:  'M5 5h14v14H5zM5 9h14M9 13h6M9 16h4',
  vendors:  'M4 9 5 5h14l1 4M4 9h16v10H4zM4 9c0 1.6 1.2 2.5 2.5 2.5S9 10.6 9 9c0 1.6 1.1 2.5 2.5 2.5S14 10.6 14 9c0 1.6 1.2 2.5 2.5 2.5S19 10.6 19 9',
  projects: 'M4 7a1 1 0 0 1 1-1h4l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
  invoice:  'M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21zM10 8h4M10 12h4',
  plus:     'M12 5v14M5 12h14',
  close:    'M6 6l12 12M18 6 6 18',
  check:    'M4 12l5 5 11-11',
  edit:     'M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17v3zM14 7l3 3',
  trash:    'M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13',
  arrow:    'M5 12h14M13 6l6 6-6 6',
  back:     'M19 12H5M11 18l-6-6 6-6',
  pin:      'M12 3l2 6h5l-4 4 1.5 6L12 16l-4.5 3L9 13 5 9h5z',
  eye:      'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z',
  eyeoff:   'M3 3l18 18M10.5 6.2A9.7 9.7 0 0 1 12 6c6.5 0 10 6 10 6a16 16 0 0 1-3 3.6M6 7.5A16 16 0 0 0 2 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.5',
  copy:     'M9 9h10v10H9zM5 15V5h10',
  print:    'M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8z',
  mail:     'M3 6h18v12H3zM3 7l9 6 9-6',
  link:     'M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1',
  journal:  'M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM5 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2M9 8h6M9 12h6',
  folder:   'M4 7a1 1 0 0 1 1-1h4l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
  camera:   'M4 8h3l1.5-2h7L17 8h3v12H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  tag:      'M4 4h7l9 9-7 7-9-9zM8 8h.01',
  filter:   'M3 5h18l-7 8v6l-4-2v-4z',
  phone:    'M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  ig:       'M4 4h16v16H4zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM17 7h.01',
  star:     'M12 3l2.6 5.7 6.4.6-4.8 4.3 1.4 6.4L12 17l-5.6 3 1.4-6.4L3 9.3l6.4-.6z',
  search2:  'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5',
};
function Icon({ name, className }) {
  const d = PATHS[name] || '';
  return React.createElement('svg', {
    className, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
  }, d.split('M').filter(Boolean).map((seg, i) =>
    React.createElement('path', { key: i, d: 'M' + seg })
  ));
}

/* ---------------- hash router ---------------- */
function useHash() {
  const [hash, setHash] = uUseState(() => window.location.hash.slice(1) || '/');
  uUseEffect(() => {
    const on = () => { setHash(window.location.hash.slice(1) || '/'); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

/* ---------------- small bits ---------------- */
function Eyebrow({ children, style }) { return React.createElement('span', { className: 'eyebrow', style }, children); }
function RuleLabel({ children }) {
  return React.createElement('div', { className: 'rule-label' }, React.createElement('span', { className: 'eyebrow' }, children));
}
function Tag({ cls, children }) {
  return React.createElement('span', { className: 'tag ' + (cls || '') },
    React.createElement('span', { className: 'dot' }), children);
}
function IconBtn({ icon, onClick, title }) {
  return React.createElement('button', { className: 'iconbtn', onClick, title, type: 'button' }, React.createElement(Icon, { name: icon }));
}
function Check({ on, onClick }) {
  return React.createElement('span', { className: 'checkbox' + (on ? ' on' : ''), onClick, role: 'checkbox', 'aria-checked': on },
    React.createElement(Icon, { name: 'check' }));
}

/* ---------------- modal ---------------- */
function Modal({ title, sub, children, onClose, onSave, saveLabel, wide }) {
  uUseEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);
  return React.createElement('div', { className: 'modal-scrim', onMouseDown: (e) => { if (e.target === e.currentTarget) onClose(); } },
    React.createElement('div', { className: 'modal', style: wide ? { maxWidth: 720 } : null },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('h3', null, title),
          sub && React.createElement('div', { className: 'modal-sub' }, sub)),
        React.createElement(IconBtn, { icon: 'close', onClick: onClose, title: 'Close' })),
      children,
      (onSave || onClose) && React.createElement('div', { className: 'modal-foot' },
        React.createElement('button', { className: 'btn ghost', onClick: onClose, type: 'button' }, 'Cancel'),
        onSave && React.createElement('button', { className: 'btn', onClick: onSave, type: 'button' }, saveLabel || 'Save'))));
}

/* ---------------- field ---------------- */
function Field({ label, value, onChange, type, placeholder, textarea, options }) {
  const common = { value: value == null ? '' : value, placeholder, onChange: (e) => onChange(e.target.value) };
  let control;
  if (textarea) control = React.createElement('textarea', common);
  else if (options) control = React.createElement('select', common, options.map(o =>
    React.createElement('option', { key: o.value, value: o.value }, o.label)));
  else control = React.createElement('input', { ...common, type: type || 'text' });
  return React.createElement('div', { className: 'field' },
    label && React.createElement('label', null, label), control);
}

/* ---------------- inline editable text (blur to save) ---------------- */
function Editable({ value, onChange, className, placeholder, multiline, style }) {
  const ref = uUseRef(null);
  const onBlur = () => { const v = ref.current.innerText.trim(); if (v !== value) onChange(v); };
  return React.createElement(multiline ? 'div' : 'span', {
    ref, className: (className || '') + ' editable', contentEditable: true, suppressContentEditableWarning: true,
    spellCheck: false, onBlur, style,
    'data-placeholder': placeholder,
    onKeyDown: (e) => { if (!multiline && e.key === 'Enter') { e.preventDefault(); ref.current.blur(); } },
  }, value);
}

window.UI = { Icon, Modal, Field, Check, IconBtn, Tag, Eyebrow, RuleLabel, Editable, useHash };
