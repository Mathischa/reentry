import { FilterTab } from '../types';

interface FilterTabsProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
  counts: Record<FilterTab, number>;
}

const TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'done', label: 'Done' },
];

export function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-white/[0.05] mb-6 -mx-4 sm:-mx-6 px-4 sm:px-6">
      {TABS.map(tab => {
        const isActive = tab.id === active;
        const count = counts[tab.id];
        const isDone = tab.id === 'done';
        const isBlocked = tab.id === 'blocked';
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
              isActive ? 'text-white' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {tab.label}
            {count > 0 && (
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full tabular-nums ${
                  isActive
                    ? isDone
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isBlocked
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-indigo-500/20 text-indigo-300'
                    : 'bg-white/[0.05] text-slate-600'
                }`}
              >
                {count}
              </span>
            )}
            {/* Active underline */}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full"
                style={{ background: isDone ? '#10b981' : isBlocked ? '#f59e0b' : 'linear-gradient(90deg,#6366f1,#a855f7)' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
