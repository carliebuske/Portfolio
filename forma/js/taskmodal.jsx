/* ============================================================
   TASK EDITOR — shared add/edit modal (Bulletin + Calendar)
   window.TaskEditor({ task, presetProject, presetDue, onClose })
   ============================================================ */
(function () {
const { useState } = React;
const { Modal, Field, Icon } = window.UI;

function TaskEditor({ task, presetProject, presetDue, onClose }) {
  const { data, update } = window.FC.useStore();
  const { LEVELS } = window.FC;
  const isEdit = !!task;
  const [draft, setDraft] = useState({
    text: task ? task.text : '',
    project: task ? task.project : (presetProject || ''),
    level: task ? task.level : 'med',
    due: task ? task.due : (presetDue || ''),
    notes: task ? task.notes : '',
  });

  const save = () => {
    update(d => { if (isEdit) window.TASKS.patch(d, task, draft); else window.TASKS.add(d, draft); });
    onClose();
  };
  const del = () => { update(d => window.TASKS.remove(d, task)); onClose(); };

  return React.createElement(Modal, {
    title: isEdit ? 'Edit task' : 'New task', sub: 'Connects to its project & calendar',
    onClose, onSave: save },
    React.createElement(Field, { label: 'Task', value: draft.text, onChange: v => setDraft({ ...draft, text: v }), placeholder: 'What needs doing?' }),
    React.createElement(Field, { label: 'Section / project', value: draft.project, onChange: v => setDraft({ ...draft, project: v }), options: window.TASKS.sectionOptions(data) }),
    React.createElement('div', { className: 'field-row' },
      React.createElement(Field, { label: 'Priority', value: draft.level, onChange: v => setDraft({ ...draft, level: v }), options: Object.keys(LEVELS).map(k => ({ value: k, label: LEVELS[k].label })) }),
      React.createElement(Field, { label: 'Due date', value: draft.due, onChange: v => setDraft({ ...draft, due: v }), type: 'date' })),
    React.createElement(Field, { label: 'Notes', value: draft.notes, onChange: v => setDraft({ ...draft, notes: v }), textarea: true, placeholder: 'Details, links, context\u2026' }),
    React.createElement('p', { className: 'pd-hint', style: { marginTop: 10 } },
      'Tasks with a section show on that project page; tasks with a due date show on the calendar.'),
    isEdit && React.createElement('div', { style: { marginTop: 6 } },
      React.createElement('button', { className: 'btn ghost sm', type: 'button', onClick: del, style: { color: 'var(--wine)', borderColor: 'transparent' } },
        React.createElement(Icon, { name: 'trash' }), ' Delete task')));
}

window.TaskEditor = TaskEditor;
})();
