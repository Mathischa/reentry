import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface EmptyStateProps {
  onNewCheckpoint: () => void;
}

export function EmptyState({ onNewCheckpoint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[68vh] px-4 text-center animate-fade-in">

      {/* Hero icon */}
      <div className="relative mb-8 group">
        {/* Outer glow rings */}
        <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl scale-150 animate-pulse-slow" />
        <div className="absolute inset-0 rounded-3xl bg-violet-500/8 blur-3xl scale-[2]" />

        {/* Icon card */}
        <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center border border-white/[0.08]"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 100%)',
            boxShadow: '0 8px 32px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}>
          <Logo size={40} />
        </div>
      </div>

      {/* Copy */}
      <h2 className="text-[26px] font-bold text-white mb-3 tracking-tight">
        Never lose your place again
      </h2>
      <p className="text-slate-400 text-base max-w-sm mb-2 leading-relaxed">
        Drop a checkpoint before you switch tasks. When you come back, you'll know <em className="text-slate-300 not-italic font-medium">exactly</em> where to pick up.
      </p>
      <p className="text-slate-600 text-sm max-w-xs mb-10">
        Takes 30 seconds. Saves you 20 minutes every time.
      </p>

      {/* CTA */}
      <button
        onClick={onNewCheckpoint}
        className="group flex items-center gap-2.5 px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(168,85,247,0.8))',
          boxShadow: '0 4px 24px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        Drop your first checkpoint
        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>

      {/* Feature pills */}
      <div className="mt-16 flex flex-wrap justify-center gap-3 opacity-35">
        {[
          { icon: '⚡', label: 'Instant capture' },
          { icon: '🧠', label: 'Full context' },
          { icon: '🔥', label: 'Staleness tracking' },
          { icon: '✏️', label: 'Editable anytime' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-slate-500 bg-white/[0.03] border border-white/[0.05] px-3 py-1.5 rounded-full">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
