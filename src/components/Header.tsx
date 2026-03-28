import { Plus } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onNewCheckpoint: () => void;
  checkpointCount: number;
}

export function Header({ onNewCheckpoint, checkpointCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.05]" style={{ background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo size={26} />
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-white tracking-tight text-[15px]">ReEntry</span>
            {checkpointCount > 0 && (
              <span className="text-[11px] text-slate-600 tabular-nums">{checkpointCount}</span>
            )}
          </div>
        </div>

        {/* Hidden on mobile — bottom nav has the FAB */}
        <button
          onClick={onNewCheckpoint}
          className="hidden md:flex group items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(168,85,247,0.8))',
            boxShadow: '0 2px 16px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
            color: 'white',
          }}
        >
          <Plus size={14} className="transition-transform group-hover:rotate-90 duration-200" />
          <span>New checkpoint</span>
        </button>
      </div>
    </header>
  );
}
