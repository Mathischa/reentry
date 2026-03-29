import { useState, useEffect, useRef } from 'react';
import { X, Save, Check, Plus, Trash2, Link, CheckSquare, FileText, Clock, ExternalLink } from 'lucide-react';
import { Checkpoint, Priority, CheckpointStatus } from '../types';
import { ACCENT_COLORS } from '../constants/colors';
import { formatTotalTime, formatDate } from '../utils/staleness';

interface EditModalProps {
  checkpoint: Checkpoint;
  onSave: (id: string, data: {
    title: string; context: string; nextStep: string; brainDump: string; tags: string[];
    priority: Priority; status: CheckpointStatus; dueDate: number | null; accentColor: string;
  }) => void;
  onClose: () => void;
  onAddSubTask: (id: string, text: string) => void;
  onToggleSubTask: (id: string, taskId: string) => void;
  onDeleteSubTask: (id: string, taskId: string) => void;
  onAddNote: (id: string, text: string) => void;
  onDeleteNote: (id: string, noteId: string) => void;
  onAddLink: (id: string, url: string) => void;
  onRemoveLink: (id: string, url: string) => void;
}

type Tab = 'edit' | 'tasks' | 'notes' | 'sessions';

function endOfDay(offsetDays: number): number {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

const DUE_PRESETS = [
  { label: 'Today', value: () => endOfDay(0) },
  { label: 'Tomorrow', value: () => endOfDay(1) },
  { label: '3 days', value: () => endOfDay(3) },
  { label: '1 week', value: () => endOfDay(7) },
  { label: '2 weeks', value: () => endOfDay(14) },
];

const STATUS_OPTIONS: { value: CheckpointStatus; label: string; color: string }[] = [
  { value: 'open', label: 'Open', color: '#6366f1' },
  { value: 'blocked', label: 'Blocked', color: '#f59e0b' },
  { value: 'done', label: 'Done', color: '#10b981' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'normal', label: 'Normal', color: '#6b7280' },
  { value: 'high', label: 'High', color: '#f59e0b' },
  { value: 'urgent', label: 'Urgent', color: '#ef4444' },
];

export function EditModal({ checkpoint, onSave, onClose, onAddSubTask, onToggleSubTask, onDeleteSubTask, onAddNote, onDeleteNote, onAddLink, onRemoveLink }: EditModalProps) {
  const [tab, setTab] = useState<Tab>('edit');

  // Edit tab state
  const [title, setTitle] = useState(checkpoint.title);
  const [context, setContext] = useState(checkpoint.context);
  const [nextStep, setNextStep] = useState(checkpoint.nextStep);
  const [brainDump, setBrainDump] = useState(checkpoint.brainDump);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(checkpoint.tags);
  const [priority, setPriority] = useState<Priority>(checkpoint.priority);
  const [status, setStatus] = useState<CheckpointStatus>(checkpoint.status);
  const [dueDate, setDueDate] = useState<number | null>(checkpoint.dueDate);
  const [accentColor, setAccentColor] = useState(checkpoint.accentColor);

  // Tasks tab state
  const [taskInput, setTaskInput] = useState('');

  // Notes tab state
  const [noteInput, setNoteInput] = useState('');

  // Links tab (in Edit tab)
  const [linkInput, setLinkInput] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (tab === 'edit') setTimeout(() => titleRef.current?.focus(), 80); }, [tab]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (tab === 'edit') handleSave(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(checkpoint.id, { title: title.trim(), context: context.trim(), nextStep: nextStep.trim(), brainDump: brainDump.trim(), tags, priority, status, dueDate, accentColor });
    onClose();
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (t && !tags.includes(t) && tags.length < 5) setTags(p => [...p, t]);
      setTagInput('');
    }
    if (e.key === 'Backspace' && !tagInput && tags.length > 0) setTags(p => p.slice(0, -1));
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && taskInput.trim()) {
      e.preventDefault();
      onAddSubTask(checkpoint.id, taskInput.trim());
      setTaskInput('');
    }
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    onAddNote(checkpoint.id, noteInput.trim());
    setNoteInput('');
  };

  const handleAddLink = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && linkInput.trim()) {
      e.preventDefault();
      let url = linkInput.trim();
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
      onAddLink(checkpoint.id, url);
      setLinkInput('');
    }
  };

  const fieldClass = 'w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all';

  const doneTasks = checkpoint.subTasks.filter(t => t.done).length;
  const totalTasks = checkpoint.subTasks.length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: 'edit', label: 'Edit' },
    { id: 'tasks', label: 'Tasks', count: totalTasks },
    { id: 'notes', label: 'Notes', count: checkpoint.notes.length },
    { id: 'sessions', label: 'Sessions', count: checkpoint.sessions.length },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onKeyDown={e => e.stopPropagation()}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#0e0e1a] rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/60 animate-scale-in overflow-hidden">
        <div className="h-[2px] w-full transition-all duration-300" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}30)` }} />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0 border-b border-white/[0.05]">
          <div className="flex items-center gap-0.5">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors relative ${tab === t.id ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}
              >
                {t.label}
                {(t.count ?? 0) > 0 && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full tabular-nums ${tab === t.id ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/[0.05] text-slate-600'}`}>
                    {t.count}
                  </span>
                )}
                {tab === t.id && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-t-full bg-indigo-500" />}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-slate-300 transition-colors mb-2">
            <X size={15} />
          </button>
        </div>

        {/* ─── EDIT TAB ─── */}
        {tab === 'edit' && (
          <div className="px-5 py-4 space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Color</label>
                <div className="flex flex-wrap gap-1.5">
                  {ACCENT_COLORS.map(color => (
                    <button key={color} onClick={() => setAccentColor(color)}
                      className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
                      style={{ backgroundColor: color, boxShadow: accentColor === color ? `0 0 0 1.5px #0e0e1a, 0 0 0 3px ${color}` : 'none', transform: accentColor === color ? 'scale(1.15)' : 'scale(1)' }}>
                      {accentColor === color && <Check size={8} className="text-white" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Priority</label>
                <div className="flex flex-col gap-1">
                  {PRIORITY_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => setPriority(opt.value)}
                      className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-left transition-all ${priority === opt.value ? 'text-white border-transparent' : 'border-white/[0.06] text-slate-600 hover:text-slate-400 bg-white/[0.02]'}`}
                      style={priority === opt.value ? { background: `${opt.color}20`, borderColor: `${opt.color}40`, color: opt.color } : {}}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Status</label>
                <div className="flex flex-col gap-1">
                  {STATUS_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => setStatus(opt.value)}
                      className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-left transition-all ${status === opt.value ? 'text-white border-transparent' : 'border-white/[0.06] text-slate-600 hover:text-slate-400 bg-white/[0.02]'}`}
                      style={status === opt.value ? { background: `${opt.color}20`, borderColor: `${opt.color}40`, color: opt.color } : {}}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Due date</label>
              <div className="flex flex-wrap gap-1.5">
                {DUE_PRESETS.map(preset => {
                  const val = preset.value();
                  const isSelected = dueDate !== null && Math.abs(dueDate - val) < 86400000;
                  return (
                    <button key={preset.label} onClick={() => setDueDate(isSelected ? null : val)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${isSelected ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' : 'border-white/[0.06] text-slate-600 hover:text-slate-300 bg-white/[0.02]'}`}>
                      {preset.label}
                    </button>
                  );
                })}
                {dueDate && <button onClick={() => setDueDate(null)} className="px-2.5 py-1 rounded-lg text-xs border border-white/[0.06] text-slate-600 hover:text-red-400 bg-white/[0.02] transition-colors">Clear</button>}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5">Title</label>
              <input ref={titleRef} value={title} onChange={e => setTitle(e.target.value)} className={fieldClass + ' font-medium'} maxLength={80} />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5">Context</label>
              <textarea value={context} onChange={e => setContext(e.target.value)} rows={3} className={fieldClass + ' leading-relaxed'} maxLength={400} />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5">Next step</label>
              <input value={nextStep} onChange={e => setNextStep(e.target.value)} className={fieldClass + ' font-medium'} maxLength={200} />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5">Brain dump</label>
              <textarea value={brainDump} onChange={e => setBrainDump(e.target.value)} rows={2} placeholder="Optional notes..." className={fieldClass + ' leading-relaxed'} maxLength={600} />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5">Tags</label>
              <div className="min-h-[42px] flex flex-wrap items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2 focus-within:border-indigo-500/50 transition-all">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full">
                    #{tag}
                    <button onClick={() => setTags(p => p.filter(t => t !== tag))} className="hover:text-white ml-0.5"><X size={9} /></button>
                  </span>
                ))}
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder={tags.length === 0 ? 'Add tags...' : ''} className="flex-1 min-w-[80px] bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Link size={9} /> Links</label>
              <div className="space-y-1.5">
                {checkpoint.links.map(url => (
                  <div key={url} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.05] rounded-lg">
                    <ExternalLink size={11} className="text-indigo-400 flex-shrink-0" />
                    <span className="text-xs text-slate-400 truncate flex-1">{url}</span>
                    <button onClick={() => onRemoveLink(checkpoint.id, url)} className="text-slate-700 hover:text-red-400 transition-colors flex-shrink-0"><X size={11} /></button>
                  </div>
                ))}
                <input
                  value={linkInput}
                  onChange={e => setLinkInput(e.target.value)}
                  onKeyDown={handleAddLink}
                  placeholder="Paste a URL and press Enter..."
                  className={fieldClass + ' text-xs'}
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── TASKS TAB ─── */}
        {tab === 'tasks' && (
          <div className="px-5 py-4 space-y-4 max-h-[65vh] overflow-y-auto">
            {totalTasks > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">{doneTasks} of {totalTasks} complete</span>
                  <span className="text-xs font-semibold text-white">{progress}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${checkpoint.accentColor}, ${checkpoint.accentColor}80)` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <input
                autoFocus
                value={taskInput}
                onChange={e => setTaskInput(e.target.value)}
                onKeyDown={handleAddTask}
                placeholder="Add a task and press Enter..."
                className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
              <button
                onClick={() => { if (taskInput.trim()) { onAddSubTask(checkpoint.id, taskInput.trim()); setTaskInput(''); } }}
                className="px-3 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition-all"
              >
                <Plus size={15} />
              </button>
            </div>

            {checkpoint.subTasks.length === 0 ? (
              <div className="text-center py-10">
                <CheckSquare size={28} className="mx-auto text-slate-700 mb-3" />
                <p className="text-sm text-slate-600">No tasks yet</p>
                <p className="text-xs text-slate-700 mt-1">Break your work into small, checkable steps</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {checkpoint.subTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.04] hover:border-white/[0.07] transition-all group"
                  >
                    <button
                      onClick={() => onToggleSubTask(checkpoint.id, task.id)}
                      className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${task.done ? 'border-transparent' : 'border-white/[0.15] hover:border-indigo-500/50'}`}
                      style={task.done ? { background: checkpoint.accentColor } : {}}
                    >
                      {task.done && <Check size={10} className="text-white" strokeWidth={3} />}
                    </button>
                    <span className={`flex-1 text-sm transition-colors ${task.done ? 'line-through text-slate-600' : 'text-slate-300'}`}>
                      {task.text}
                    </span>
                    <button
                      onClick={() => onDeleteSubTask(checkpoint.id, task.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-700 hover:text-red-400 transition-all"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── NOTES TAB ─── */}
        {tab === 'notes' && (
          <div className="px-5 py-4 space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="space-y-2">
              <textarea
                autoFocus
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all leading-relaxed"
                maxLength={500}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAddNote(); }}
              />
              <div className="flex justify-between items-center">
                <p className="text-[11px] text-slate-700">⌘↵ to add</p>
                <button
                  onClick={handleAddNote}
                  disabled={!noteInput.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 disabled:opacity-30 transition-all"
                >
                  <Plus size={11} /> Add note
                </button>
              </div>
            </div>

            {checkpoint.notes.length === 0 ? (
              <div className="text-center py-10">
                <FileText size={28} className="mx-auto text-slate-700 mb-3" />
                <p className="text-sm text-slate-600">No notes yet</p>
                <p className="text-xs text-slate-700 mt-1">Capture thoughts, decisions, and context over time</p>
              </div>
            ) : (
              <div className="space-y-2">
                {[...checkpoint.notes].reverse().map(note => (
                  <div key={note.id} className="group p-4 rounded-xl bg-white/[0.025] border border-white/[0.05] hover:border-white/[0.08] transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-slate-300 leading-relaxed flex-1">{note.text}</p>
                      <button
                        onClick={() => onDeleteNote(checkpoint.id, note.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-700 hover:text-red-400 transition-all flex-shrink-0 mt-0.5"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-700 mt-2">{formatDate(note.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── SESSIONS TAB ─── */}
        {tab === 'sessions' && (
          <div className="px-5 py-4 space-y-3 max-h-[65vh] overflow-y-auto">
            {checkpoint.sessions.length === 0 ? (
              <div className="text-center py-10">
                <Clock size={28} className="mx-auto text-slate-700 mb-3" />
                <p className="text-sm text-slate-600">No sessions yet</p>
                <p className="text-xs text-slate-700 mt-1">Click "Return" on the card to start one</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-slate-600">{checkpoint.sessions.length} session{checkpoint.sessions.length !== 1 ? 's' : ''}</span>
                  <span className="text-xs font-semibold text-white">{formatTotalTime(checkpoint.sessions)} total</span>
                </div>
                <div className="space-y-2">
                  {[...checkpoint.sessions].reverse().map((s, i) => {
                    const duration = s.endedAt ? s.endedAt - s.startedAt : Date.now() - s.startedAt;
                    const mins = Math.floor(duration / 60000);
                    const durationStr = mins < 1 ? '< 1 min' : mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h ${mins % 60}m`;
                    return (
                      <div key={i} className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{formatDate(s.startedAt)}</span>
                          <span className={`text-xs font-semibold tabular-nums ${s.endedAt ? 'text-white' : 'text-emerald-400'}`}>
                            {s.endedAt ? durationStr : 'Active'}
                          </span>
                        </div>
                        {s.endNote && <p className="text-xs text-slate-600 mt-2 italic">"{s.endNote}"</p>}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        {tab === 'edit' && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.05]">
            <p className="text-[11px] text-slate-700">⌘S to save</p>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!title.trim()}
                className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-xl transition-all active:scale-95 disabled:opacity-30"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                <Save size={13} /> Save
              </button>
            </div>
          </div>
        )}
        {tab !== 'edit' && (
          <div className="px-5 py-3 border-t border-white/[0.05]">
            <button onClick={onClose} className="text-sm text-slate-600 hover:text-white transition-colors">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
