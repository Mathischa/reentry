import { Plus, BarChart2, Settings, CalendarDays, LayoutDashboard } from 'lucide-react';
import { Logo } from './Logo';

type AppView = 'board' | 'calendar';

interface HeaderProps {
  onNewCheckpoint: () => void;
  checkpointCount: number;
  onShowStats: () => void;
  onShowSettings: () => void;
  activeView: AppView;
  onViewChange: (v: AppView) => void;
}

const VIEWS: { id: AppView; icon: React.ElementType; label: string }[] = [
  { id: 'board', icon: LayoutDashboard, label: 'Board' },
  { id: 'calendar', icon: CalendarDays, label: 'Calendar' },
];

export function Header({ onNewCheckpoint, checkpointCount, onShowStats, onShowSettings, activeView, onViewChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.05]" style={{ background: 'rgba(7,7,15,0.88)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Logo size={26} />
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-white tracking-tight text-[15px]">ReEntry</span>
            {checkpointCount > 0 && (
              <span className="text-[11px] text-slate-600 tabular-nums">{checkpointCount}</span>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-0.5 ml-4 p-0.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          {VIEWS.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => onViewChange(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeView === id ? 'bg-white/[0.08] text-white' : 'text-slate-600 hover:text-slate-300'}`}>
              <Icon size={12} />{label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button onClick={onShowStats} className="p-2 rounded-xl hover:bg-white/[0.06] text-slate-600 hover:text-slate-300 transition-all" title="Statistics">
            <BarChart2 size={16} />
          </button>
          <button onClick={onShowSettings} className="p-2 rounded-xl hover:bg-white/[0.06] text-slate-600 hover:text-slate-300 transition-all" title="Settings">
            <Settings size={16} />
          </button>
          <button onClick={onNewCheckpoint}
            className="hidden md:flex group items-center gap-2 px-3.5 py-2 ml-1 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(168,85,247,0.8))', boxShadow: '0 2px 16px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.1)', color: 'white' }}>
            <Plus size={14} className="transition-transform group-hover:rotate-90 duration-200" />
            <span>New</span>
          </button>
        </div>
      </div>

      <div className="md:hidden flex border-t border-white/[0.04]">
        {VIEWS.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => onViewChange(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all ${activeView === id ? 'text-white border-b-2 border-indigo-500' : 'text-slate-600'}`}>
            <Icon size={11} />{label}
          </button>
        ))}
      </div>
    </header>
  );
}
