import { useState, useEffect } from 'react';
import { X, Clock, Brain, Zap, FileText, StopCircle, Play, Timer } from 'lucide-react';
import { Checkpoint } from '../types';
import { getStaleness, formatTotalTime } from '../utils/staleness';
import { useLiveTimer } from '../hooks/useLiveTimer';

interface ReentryBriefingProps {
  checkpoint: Checkpoint;
  onClose: () => void;
  onEndSession: (id: string, note?: string) => void;
}

export function ReentryBriefing({ checkpoint, onClose, onEndSession }: ReentryBriefingProps) {
  const [step, setStep] = useState(0);
  const [sessionActive, setSessionActive] = useState(checkpoint.isActive);
  const [showEndNote, setShowEndNote] = useState(false);
  const [endNote, setEndNote] = useState('');

  const staleness = getStaleness(checkpoint);
  const totalTime = formatTotalTime(checkpoint.sessions);
  const sessionCount = checkpoint.sessions.length;

  // Live timer from the current active session
  const currentSession = checkpoint.sessions[checkpoint.sessions.length - 1];
  const sessionStartedAt = sessionActive && currentSession?.endedAt === null ? currentSession.startedAt : null;
  const elapsed = useLiveTimer(sessionStartedAt);

  useEffect(() => {
    const timings = [80, 400, 750, 1100, 1500];
    const timers = timings.map((delay, i) => setTimeout(() => setStep(i + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleEndSession = () => {
    onEndSession(checkpoint.id, endNote.trim() || undefined);
    setSessionActive(false);
    setShowEndNote(false);
  };

  const timeAwayVerbose = (() => {
    const ms = staleness.msAway;
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(ms / 3600000);
    const days = Math.floor(ms / 86400000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min`;
    if (hours < 24) { const m = minutes % 60; return m > 0 ? `${hours}h ${m}m` : `${hours}h`; }
    const h = hours % 24;
    return h > 0 ? `${days}d ${h}h` : `${days}d`;
  })();

  const show = (n: number) =>
    `transition-all duration-600 ease-out ${step >= n ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`;

  // Last session note (from previous sessions)
  const lastNote = checkpoint.sessions.slice(0, -1).reverse().find(s => s.endNote)?.endNote;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col animate-fade-in overflow-y-auto"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.07) 0%, #07070f 60%)' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 flex-shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
          style={{ borderColor: `${checkpoint.accentColor}40`, color: checkpoint.accentColor, background: `${checkpoint.accentColor}10` }}>
          <span className="w-1.5 h-1.5 rounded-full animate-glow-pulse" style={{ background: checkpoint.accentColor }} />
          {sessionActive ? (
            <span className="flex items-center gap-1.5">
              Session active
              {elapsed && <span className="opacity-70 flex items-center gap-1"><Timer size={10} />{elapsed}</span>}
            </span>
          ) : 'Briefing'}
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/[0.05] text-slate-600 hover:text-slate-300 transition-all">
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-xl mx-auto w-full gap-4">

        {/* Step 1 — Intro */}
        <div className={`w-full text-center mb-2 ${show(1)}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.05] text-sm text-slate-400 mb-5">
            <Clock size={12} />
            Away for <span className={`font-semibold ml-1 ${staleness.textColor}`}>{timeAwayVerbose}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-slate-500 mt-2 flex items-center justify-center gap-2 text-base">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: checkpoint.accentColor }} />
            {checkpoint.title}
          </p>
        </div>

        {/* Step 2 — Context */}
        {checkpoint.context && (
          <div className={`w-full ${show(2)}`}>
            <div className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.025]">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">
                <FileText size={10} /> You were in the middle of
              </div>
              <p className="text-slate-200 text-sm sm:text-[15px] leading-relaxed">{checkpoint.context}</p>
            </div>
          </div>
        )}

        {/* Step 3 — Next step */}
        {checkpoint.nextStep && (
          <div className={`w-full ${show(3)}`}>
            <div className="rounded-2xl p-5 border" style={{ background: `${checkpoint.accentColor}0d`, borderColor: `${checkpoint.accentColor}35` }}>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: `${checkpoint.accentColor}cc` }}>
                <Zap size={10} /> Your exact next step
              </div>
              <p className="text-white text-base sm:text-lg font-semibold leading-relaxed">{checkpoint.nextStep}</p>
            </div>
          </div>
        )}

        {/* Step 4 — Brain dump + last session note */}
        {(checkpoint.brainDump || lastNote) && (
          <div className={`w-full ${show(4)}`}>
            {checkpoint.brainDump && (
              <div className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] mb-3">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">
                  <Brain size={10} /> Brain dump
                </div>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{checkpoint.brainDump}</p>
              </div>
            )}
            {lastNote && (
              <div className="rounded-xl px-4 py-3 border border-white/[0.04] bg-white/[0.015]">
                <p className="text-[10px] font-semibold text-slate-700 uppercase tracking-widest mb-1">Last session note</p>
                <p className="text-slate-500 text-sm italic">"{lastNote}"</p>
              </div>
            )}
          </div>
        )}

        {/* Step 5 — CTA */}
        <div className={`w-full mt-2 ${show(5)}`}>
          {sessionCount > 0 && (
            <p className="text-center text-xs text-slate-700 mb-4">{sessionCount} session{sessionCount !== 1 ? 's' : ''} · {totalTime} total</p>
          )}

          {showEndNote ? (
            <div className="space-y-3 animate-briefing-in">
              <textarea
                autoFocus
                value={endNote}
                onChange={e => setEndNote(e.target.value)}
                placeholder="What did you accomplish? Any notes for next time? (optional)"
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/[0.16] transition-all leading-relaxed"
                maxLength={400}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleEndSession(); }}
              />
              <div className="flex gap-2">
                <button onClick={() => { setEndNote(''); handleEndSession(); }} className="flex-1 py-3 rounded-2xl border border-white/[0.08] text-slate-500 hover:text-white text-sm font-medium transition-all">
                  Skip
                </button>
                <button onClick={handleEndSession} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 text-sm font-medium transition-all">
                  <StopCircle size={15} /> Save & end
                </button>
              </div>
              <p className="text-center text-[11px] text-slate-700">⌘↵ to save</p>
            </div>
          ) : sessionActive ? (
            <button
              onClick={() => setShowEndNote(true)}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-semibold text-red-400 border border-red-500/25 bg-red-500/[0.07] hover:bg-red-500/[0.12] transition-all active:scale-[0.98]"
            >
              <StopCircle size={17} /> End session
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${checkpoint.accentColor}e0, ${checkpoint.accentColor}90)`, boxShadow: `0 8px 32px ${checkpoint.accentColor}35, inset 0 1px 0 rgba(255,255,255,0.12)` }}
            >
              <Play size={17} className="fill-white" /> Start session
            </button>
          )}

          {!showEndNote && <p className="text-center text-[11px] text-slate-700 mt-3">Esc to dismiss</p>}
        </div>
      </div>
    </div>
  );
}
