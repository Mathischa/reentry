import { useState, useRef, useEffect } from 'react';
import { X, Tag, ChevronRight, Brain, Zap, FileText, Check } from 'lucide-react';
import { Logo } from './Logo';
import { Priority } from '../types';
import { ACCENT_COLORS } from '../constants/colors';

interface CheckpointFormProps {
  onSubmit: (data: {
    title: string;
    context: string;
    nextStep: string;
    brainDump: string;
    tags: string[];
    priority: Priority;
    dueDate: number | null;
    accentColor: string;
  }) => void;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

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

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'normal', label: 'Normal', color: '#6b7280' },
  { value: 'high', label: 'High', color: '#f59e0b' },
  { value: 'urgent', label: 'Urgent', color: '#ef4444' },
];

export function CheckpointForm({ onSubmit, onClose }: CheckpointFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [brainDump, setBrainDump] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showBrainDump, setShowBrainDump] = useState(false);
  const [priority, setPriority] = useState<Priority>('normal');
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [dueDate, setDueDate] = useState<number | null>(null);
  const firstInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => firstInputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, [step]);

  const canStep1 = title.trim().length > 0 && context.trim().length > 0;
  const canStep2 = nextStep.trim().length > 0;

  const handleSubmit = () => {
    if (!canStep2) return;
    onSubmit({ title: title.trim(), context: context.trim(), nextStep: nextStep.trim(), brainDump: brainDump.trim(), tags, priority, dueDate, accentColor });
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      if (step === 1 && canStep1) setStep(2);
      else if (step === 2 && canStep2) setStep(3);
      else if (step === 3) handleSubmit();
    }
  };

  const steps = [
    { num: 1 as Step, label: 'What & Where' },
    { num: 2 as Step, label: 'Next step' },
    { num: 3 as Step, label: 'Details' },
  ];

  const fieldClass = 'w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all text-sm';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onKeyDown={handleKeyDown}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full sm:max-w-lg animate-slide-in-right sm:animate-scale-in overflow-hidden rounded-t-2xl sm:rounded-2xl border border-white/[0.08]"
        style={{ background: 'linear-gradient(160deg, #0f0f1c 0%, #0c0c18 100%)', boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}>

        {/* Progress bar */}
        <div className="h-[2px] bg-white/[0.04]">
          <div className="h-full transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-1">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={11} className="text-slate-700" />}
                <button
                  onClick={() => { if (s.num < step || (s.num === 2 && canStep1)) setStep(s.num); }}
                  className={`text-xs font-medium transition-colors ${step === s.num ? 'text-white' : step > s.num ? 'text-indigo-400 hover:text-indigo-300 cursor-pointer' : 'text-slate-700 cursor-default'}`}
                >
                  {s.label}
                </button>
              </div>
            ))}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-600 hover:text-slate-400 transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          {step === 1 && (
            <div className="space-y-4 animate-briefing-in">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                  <Brain size={10} /> What are you working on?
                </label>
                <input ref={el => { firstInputRef.current = el; }} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Fix auth bug in checkout flow" className={fieldClass + ' font-medium'} maxLength={80} />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                  <FileText size={10} /> Where exactly are you?
                </label>
                <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="What you were in the middle of — be specific..." rows={3} className={fieldClass + ' leading-relaxed'} maxLength={400} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-briefing-in">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                  <Zap size={10} /> Exact next action
                </label>
                <input ref={el => { firstInputRef.current = el; }} type="text" value={nextStep} onChange={e => setNextStep(e.target.value)} placeholder='Start with a verb: "Open auth.ts:47 and..."' className={fieldClass + ' font-medium'} maxLength={200} />
                <p className="text-[11px] text-slate-700 mt-1.5 pl-1">Be specific. "Look into it" is useless. "Open auth.ts:47" is gold.</p>
              </div>
              <div>
                <button onClick={() => setShowBrainDump(v => !v)} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  <Brain size={11} /> {showBrainDump ? 'Hide' : 'Add'} brain dump <span className="text-slate-700">(optional)</span>
                </button>
                {showBrainDump && (
                  <textarea value={brainDump} onChange={e => setBrainDump(e.target.value)} placeholder="Half-formed ideas, things NOT to forget..." rows={3} className={fieldClass + ' mt-2 leading-relaxed animate-briefing-in'} maxLength={600} />
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-briefing-in">
              {/* Color picker */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2.5">Color</label>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className="w-6 h-6 rounded-full transition-all duration-150 flex items-center justify-center"
                      style={{
                        backgroundColor: color,
                        boxShadow: accentColor === color ? `0 0 0 2px #0c0c18, 0 0 0 4px ${color}` : 'none',
                        transform: accentColor === color ? 'scale(1.2)' : 'scale(1)',
                      }}
                    >
                      {accentColor === color && <Check size={10} className="text-white" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2.5">Priority</label>
                <div className="flex gap-2">
                  {PRIORITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setPriority(opt.value)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium border transition-all ${priority === opt.value ? 'border-transparent text-white' : 'border-white/[0.07] text-slate-500 hover:text-slate-400 bg-white/[0.02]'}`}
                      style={priority === opt.value ? { background: `${opt.color}25`, borderColor: `${opt.color}50`, color: opt.color } : {}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due date */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2.5">Due date <span className="normal-case font-normal text-slate-700">(optional)</span></label>
                <div className="flex flex-wrap gap-2">
                  {DUE_PRESETS.map(preset => {
                    const val = preset.value();
                    const isSelected = dueDate !== null && Math.abs(dueDate - val) < 86400000;
                    return (
                      <button
                        key={preset.label}
                        onClick={() => setDueDate(isSelected ? null : val)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${isSelected ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' : 'border-white/[0.07] text-slate-500 hover:text-slate-300 bg-white/[0.02] hover:bg-white/[0.05]'}`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                  {dueDate && (
                    <button onClick={() => setDueDate(null)} className="px-3 py-1.5 rounded-xl text-xs border border-white/[0.07] text-slate-600 hover:text-red-400 bg-white/[0.02] transition-colors">
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                  <Tag size={10} /> Tags <span className="normal-case font-normal text-slate-700">(press Enter)</span>
                </label>
                <div className="min-h-[44px] flex flex-wrap items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2 focus-within:border-indigo-500/50 transition-all">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      #{tag}
                      <button onClick={() => setTags(p => p.filter(t => t !== tag))} className="hover:text-white ml-0.5"><X size={9} /></button>
                    </span>
                  ))}
                  <input ref={el => { firstInputRef.current = el; }} type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder={tags.length === 0 ? 'work, frontend, bug...' : ''} className="flex-1 min-w-[100px] bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none" />
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl p-4 border border-white/[0.05] bg-white/[0.02]">
                <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Logo size={11} /> Summary
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                    <p className="text-sm text-white font-medium truncate">{title}</p>
                  </div>
                  <p className="text-xs text-indigo-300 truncate pl-4">{nextStep}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center justify-between">
          <p className="text-[11px] text-slate-700">⌘↵ to continue</p>
          <div className="flex gap-2">
            {step > 1 && (
              <button onClick={() => setStep(s => (s - 1) as Step)} className="px-4 py-2 text-sm text-slate-500 hover:text-white transition-colors">
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(s => (s + 1) as Step)}
                disabled={step === 1 ? !canStep1 : !canStep2}
                className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium rounded-xl transition-all active:scale-95 disabled:opacity-25"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 4px 16px rgba(99,102,241,0.2)' }}
              >
                Continue <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium rounded-xl transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}
              >
                Save checkpoint
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
