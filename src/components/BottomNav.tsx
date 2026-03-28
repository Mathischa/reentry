import { Plus } from 'lucide-react';
import { FilterTab } from '../types';

interface BottomNavProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
  counts: Record<FilterTab, number>;
  onNewCheckpoint: () => void;
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'blocked', label: 'Blocked' },
  { key: 'done', label: 'Done' },
];

export function BottomNav({ active, onChange, counts, onNewCheckpoint }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-white/[0.06] flex items-stretch"
      style={{
        background: 'rgba(7,7,15,0.95)',
        backdropFilter: 'blur(24px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Left 2 tabs */}
      {TABS.slice(0, 2).map(tab => (
        <TabButton key={tab.key} tab={tab} active={active} count={counts[tab.key]} onChange={onChange} />
      ))}

      {/* Central FAB */}
      <div className="flex flex-col items-center justify-center px-2 py-2">
        <button
          onClick={onNewCheckpoint}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
          }}
        >
          <Plus size={22} className="text-white" />
        </button>
      </div>

      {/* Right 2 tabs */}
      {TABS.slice(2).map(tab => (
        <TabButton key={tab.key} tab={tab} active={active} count={counts[tab.key]} onChange={onChange} />
      ))}
    </nav>
  );
}

function TabButton({
  tab, active, count, onChange,
}: {
  tab: { key: FilterTab; label: string };
  active: FilterTab;
  count: number;
  onChange: (t: FilterTab) => void;
}) {
  const isActive = active === tab.key;
  return (
    <button
      onClick={() => onChange(tab.key)}
      className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-all active:scale-95"
    >
      <span className={`text-xs font-semibold transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-600'}`}>
        {tab.label}
      </span>
      {count > 0 && (
        <span className={`text-[10px] tabular-nums transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-700'}`}>
          {count}
        </span>
      )}
    </button>
  );
}
