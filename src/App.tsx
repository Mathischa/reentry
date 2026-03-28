import { useState, useMemo } from 'react';
import { SortAsc, Grid, List } from 'lucide-react';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';
import { CheckpointCard } from './components/CheckpointCard';
import { CheckpointForm } from './components/CheckpointForm';
import { ReentryBriefing } from './components/ReentryBriefing';
import { EditModal } from './components/EditModal';
import { FilterTabs } from './components/FilterTabs';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { useCheckpoints } from './hooks/useCheckpoints';
import { sortCheckpoints } from './utils/staleness';
import { Checkpoint, SortMode, ViewMode, FilterTab } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeBriefing, setActiveBriefing] = useState<Checkpoint | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('staleness');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');

  const {
    checkpoints,
    addCheckpoint,
    updateCheckpoint,
    returnToCheckpoint,
    endSession,
    deleteCheckpoint,
    togglePin,
    setStatus,
  } = useCheckpoints();

  // Tab counts (from all checkpoints, independent of search)
  const tabCounts = useMemo(() => ({
    all: checkpoints.length,
    open: checkpoints.filter(c => c.status === 'open').length,
    blocked: checkpoints.filter(c => c.status === 'blocked').length,
    done: checkpoints.filter(c => c.status === 'done').length,
  }), [checkpoints]);

  const filtered = useMemo(() => {
    // 1. Tab filter
    let result = checkpoints;
    if (filterTab === 'open') result = result.filter(c => c.status === 'open');
    else if (filterTab === 'blocked') result = result.filter(c => c.status === 'blocked');
    else if (filterTab === 'done') result = result.filter(c => c.status === 'done');
    else result = result.filter(c => c.status !== 'done'); // "all" hides done by default

    // 2. Search filter
    const q = searchQuery.toLowerCase().trim();
    if (!q) return result;
    return result.filter(cp =>
      cp.title.toLowerCase().includes(q) ||
      cp.context.toLowerCase().includes(q) ||
      cp.nextStep.toLowerCase().includes(q) ||
      cp.tags.some(t => t.includes(q))
    );
  }, [checkpoints, filterTab, searchQuery]);

  const sorted = useMemo(() => sortCheckpoints(filtered, sortMode), [filtered, sortMode]);

  const handleReturn = (id: string) => {
    const cp = checkpoints.find(c => c.id === id);
    if (!cp) return;
    returnToCheckpoint(id);
    setActiveBriefing({ ...cp, isActive: true, lastReturnedAt: Date.now() });
  };

  const handleEndSession = (id: string, note?: string) => {
    endSession(id, note);
    setActiveBriefing(null);
  };

  const handleToggleBlocked = (id: string) => {
    const cp = checkpoints.find(c => c.id === id);
    if (!cp) return;
    setStatus(id, cp.status === 'blocked' ? 'open' : 'blocked');
  };

  const handleMarkDone = (id: string) => {
    setStatus(id, 'done');
  };

  const handleRestore = (id: string) => {
    setStatus(id, 'open');
    if (filterTab === 'done') setFilterTab('open');
  };

  const cycleSortMode = () => {
    const modes: SortMode[] = ['staleness', 'recent', 'alphabetical'];
    setSortMode(modes[(modes.indexOf(sortMode) + 1) % modes.length]);
  };

  const sortLabels: Record<SortMode, string> = {
    staleness: 'Most stale',
    recent: 'Recent',
    alphabetical: 'A → Z',
  };

  const editingCheckpoint = editingId ? checkpoints.find(c => c.id === editingId) : null;
  const hasAny = checkpoints.length > 0;

  return (
    <div className="min-h-screen">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Header onNewCheckpoint={() => setShowForm(true)} checkpointCount={checkpoints.filter(c => c.status !== 'done').length} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-8">
        {!hasAny ? (
          <EmptyState onNewCheckpoint={() => setShowForm(true)} />
        ) : (
          <>
            {/* Filter tabs — desktop/tablet only (mobile uses BottomNav) */}
            <div className="hidden md:block">
              <FilterTabs active={filterTab} onChange={tab => { setFilterTab(tab); setSearchQuery(''); }} counts={tabCounts} />
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${filterTab === 'all' ? 'checkpoints' : filterTab}...`}
                className="flex-1 min-w-[180px] max-w-xs bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2 text-sm text-white placeholder-slate-700 focus:outline-none focus:border-white/[0.14] focus:bg-white/[0.05] transition-all"
              />
              <div className="flex items-center gap-2 ml-auto">
                <button onClick={cycleSortMode} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs text-slate-500 hover:text-slate-300 transition-all">
                  <SortAsc size={12} />{sortLabels[sortMode]}
                </button>
                <div className="flex rounded-xl border border-white/[0.06] overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-white/[0.07] text-white' : 'text-slate-600 hover:text-slate-400 hover:bg-white/[0.04]'}`}>
                    <Grid size={13} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 transition-all ${viewMode === 'list' ? 'bg-white/[0.07] text-white' : 'text-slate-600 hover:text-slate-400 hover:bg-white/[0.04]'}`}>
                    <List size={13} />
                  </button>
                </div>
              </div>
            </div>

            {sortMode === 'staleness' && sorted.length > 0 && filterTab !== 'done' && (
              <p className="text-[11px] text-slate-700 mb-4">Pinned first, then sorted by time since last visit</p>
            )}

            {sorted.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-600">
                  {searchQuery ? `No results for "${searchQuery}"` : `No ${filterTab} checkpoints`}
                </p>
                {searchQuery
                  ? <button onClick={() => setSearchQuery('')} className="text-indigo-500 text-sm mt-2 hover:underline">Clear search</button>
                  : filterTab === 'done'
                  ? <p className="text-slate-700 text-sm mt-2">Complete a checkpoint to see it here</p>
                  : <button onClick={() => setShowForm(true)} className="text-indigo-500 text-sm mt-2 hover:underline">Add one</button>
                }
              </div>
            )}

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' : 'flex flex-col gap-2'}>
              {sorted.map((cp, i) => (
                <CheckpointCard
                  key={cp.id}
                  checkpoint={cp}
                  onReturn={handleReturn}
                  onEdit={setEditingId}
                  onDelete={deleteCheckpoint}
                  onTogglePin={togglePin}
                  onMarkDone={handleMarkDone}
                  onRestore={handleRestore}
                  onToggleBlocked={handleToggleBlocked}
                  listMode={viewMode === 'list'}
                  style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {showForm && (
        <CheckpointForm onSubmit={addCheckpoint} onClose={() => setShowForm(false)} />
      )}

      {activeBriefing && (
        <ReentryBriefing
          checkpoint={activeBriefing}
          onClose={() => setActiveBriefing(null)}
          onEndSession={handleEndSession}
        />
      )}

      {editingCheckpoint && (
        <EditModal
          checkpoint={editingCheckpoint}
          onSave={(id, data) => updateCheckpoint(id, data)}
          onClose={() => setEditingId(null)}
        />
      )}

      <BottomNav
        active={filterTab}
        onChange={tab => { setFilterTab(tab); setSearchQuery(''); }}
        counts={tabCounts}
        onNewCheckpoint={() => setShowForm(true)}
      />
    </div>
  );
}
