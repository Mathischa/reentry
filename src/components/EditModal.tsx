import { useState, useEffect, useRef } from 'react';
import { X, Save, Check } from 'lucide-react';
import { Checkpoint, Priority, CheckpointStatus } from '../types';
import { ACCENT_COLORS } from '../constants/colors';

interface EditModalProps {
  checkpoint: Checkpoint;
  onSave: (id: string, data: {
    title: string; context: string; nextStep: string; brainDump: string; tags: string[];
    priority: Priority; status: CheckpointStatus; dueDate: number | null; accentColor: string;
  }) => void;
  onClose: () => void;
}

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

export function EditModal({ checkpoint, onSave, onClose }: EditModalProps) {
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
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => titleRef.current?.focus(), 80); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleSave(); }
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

  const fieldClass = 'w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onKeyDown={e => e.stopPropagation()}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#0e0e1a] rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/60 animate-scale-in overflow-hidden">
        {/* Color stripe — updates live */}
        <div className="h-[2px] w-full transition-all duration-300" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}30)` }} />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-semibold text-white">Edit checkpoint</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-slate-300 transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 space-y-4 max-h-[72vh] overflow-y-auto">

          {/* Color + Priority + Status row */}
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

          {/* Due date */}
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

          {/* Text fields */}
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

          {/* Tags */}
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
        </div>

        {/* Footer */}
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
      </div>
    </div>
  );
}
