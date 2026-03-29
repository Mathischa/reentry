import { useMemo } from 'react';
import { X, Clock, Zap, CheckCircle2, TrendingUp, Activity } from 'lucide-react';
import { Checkpoint } from '../types';
import { formatTotalTime } from '../utils/staleness';

interface StatsModalProps {
  checkpoints: Checkpoint[];
  onClose: () => void;
}

function sessionDurationMs(s: { startedAt: number; endedAt: number | null }): number {
  return (s.endedAt ?? Date.now()) - s.startedAt;
}

export function StatsModal({ checkpoints, onClose }: StatsModalProps) {
  const stats = useMemo(() => {
    const allSessions = checkpoints.flatMap(cp => cp.sessions);
    const completedSessions = allSessions.filter(s => s.endedAt !== null);
    const totalMs = completedSessions.reduce((acc, s) => acc + sessionDurationMs(s), 0);
    const avgMs = completedSessions.length > 0 ? totalMs / completedSessions.length : 0;

    // Sessions last 7 days
    const now = Date.now();
    const days = Array.from({ length: 7 }, (_, i) => {
      const dayStart = now - (6 - i) * 86400000;
      const dayEnd = dayStart + 86400000;
      const count = completedSessions.filter(s => s.startedAt >= dayStart && s.startedAt < dayEnd).length;
      const label = new Date(dayStart).toLocaleDateString([], { weekday: 'short' });
      return { label, count };
    });
    const maxDay = Math.max(...days.map(d => d.count), 1);

    // Top checkpoints by time
    const cpWithTime = checkpoints
      .map(cp => ({
        cp,
        ms: cp.sessions.filter(s => s.endedAt).reduce((acc, s) => acc + sessionDurationMs(s), 0),
      }))
      .filter(x => x.ms > 0)
      .sort((a, b) => b.ms - a.ms)
      .slice(0, 5);
    const maxMs = cpWithTime[0]?.ms ?? 1;

    const byStatus = {
      open: checkpoints.filter(c => c.status === 'open').length,
      blocked: checkpoints.filter(c => c.status === 'blocked').length,
      done: checkpoints.filter(c => c.status === 'done').length,
    };

    const totalSubTasksDone = checkpoints.reduce((acc, cp) => acc + cp.subTasks.filter(t => t.done).length, 0);
    const totalSubTasks = checkpoints.reduce((acc, cp) => acc + cp.subTasks.length, 0);

    return { allSessions, completedSessions, totalMs, avgMs, days, maxDay, cpWithTime, maxMs, byStatus, totalSubTasksDone, totalSubTasks };
  }, [checkpoints]);

  const card = 'rounded-2xl p-4 border border-white/[0.06] bg-white/[0.025]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-[#0e0e1a] rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)' }} />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <Activity size={15} className="text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Statistics</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-slate-300 transition-colors">
            <X size={15} />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Clock, label: 'Total time', value: formatTotalTime(stats.completedSessions.map(s => ({ startedAt: s.startedAt, endedAt: s.endedAt }))) },
              { icon: Zap, label: 'Sessions', value: stats.completedSessions.length.toString() },
              { icon: TrendingUp, label: 'Avg session', value: stats.avgMs > 0 ? formatTotalTime([{ startedAt: 0, endedAt: stats.avgMs }]) : '—' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className={card + ' text-center'}>
                <Icon size={14} className="text-indigo-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white tabular-nums">{value}</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Status breakdown */}
          <div className={card}>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Checkpoints</p>
            <div className="flex gap-3">
              {[
                { label: 'Open', count: stats.byStatus.open, color: '#6366f1' },
                { label: 'Blocked', count: stats.byStatus.blocked, color: '#f59e0b' },
                { label: 'Done', count: stats.byStatus.done, color: '#10b981' },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex-1 text-center">
                  <p className="text-2xl font-bold tabular-nums" style={{ color }}>{count}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            {stats.totalSubTasks > 0 && (
              <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <span className="text-xs text-slate-600 flex items-center gap-1.5"><CheckCircle2 size={11} /> Tasks completed</span>
                <span className="text-xs text-white font-semibold tabular-nums">{stats.totalSubTasksDone} / {stats.totalSubTasks}</span>
              </div>
            )}
          </div>

          {/* Activity last 7 days */}
          <div className={card}>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-4">Activity — last 7 days</p>
            <div className="flex items-end gap-1.5 h-14">
              {stats.days.map(({ label, count }) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-sm transition-all duration-500"
                    style={{
                      height: count > 0 ? `${Math.max((count / stats.maxDay) * 48, 4)}px` : '2px',
                      background: count > 0 ? 'linear-gradient(180deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.05)',
                    }}
                  />
                  <span className="text-[9px] text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top checkpoints by time */}
          {stats.cpWithTime.length > 0 && (
            <div className={card}>
              <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Most time spent</p>
              <div className="space-y-2.5">
                {stats.cpWithTime.map(({ cp, ms }) => (
                  <div key={cp.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cp.accentColor }} />
                        <span className="text-xs text-slate-400 truncate">{cp.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 tabular-nums flex-shrink-0 ml-2">{formatTotalTime([{ startedAt: 0, endedAt: ms }])}</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(ms / stats.maxMs) * 100}%`, background: `linear-gradient(90deg, ${cp.accentColor}cc, ${cp.accentColor}60)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.completedSessions.length === 0 && (
            <div className="text-center py-8 text-slate-600">
              <Activity size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No sessions yet.</p>
              <p className="text-xs mt-1 text-slate-700">Start a session on any checkpoint to see stats.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
