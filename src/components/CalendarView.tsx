import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, Pin, Flame, ArrowUp } from 'lucide-react';
import { Checkpoint } from '../types';
import { getDueInfo } from '../utils/staleness';

interface CalendarViewProps {
  checkpoints: Checkpoint[];
  onReturn: (id: string) => void;
  onEdit: (id: string) => void;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CalendarView({ checkpoints, onReturn, onEdit }: CalendarViewProps) {
  const [current, setCurrent] = useState(() => new Date());
  const today = new Date();

  const prev = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const next = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  // Build grid: always 6 rows x 7 cols, starting Monday
  const grid = useMemo(() => {
    const first = startOfMonth(current);
    const last = endOfMonth(current);
    // Monday = 0 offset
    let startDay = first.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const days: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(current.getFullYear(), current.getMonth(), d));
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [current]);

  // Map checkpoints to due dates
  const cpByDay = useMemo(() => {
    const map = new Map<string, Checkpoint[]>();
    for (const cp of checkpoints) {
      if (!cp.dueDate || cp.status === 'done') continue;
      const d = new Date(cp.dueDate);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(cp);
    }
    return map;
  }, [checkpoints]);

  // Overdue checkpoints (due before today, not done)
  const overdue = useMemo(() => checkpoints.filter(cp =>
    cp.dueDate && cp.dueDate < Date.now() && cp.status !== 'done'
  ).sort((a, b) => (a.dueDate ?? 0) - (b.dueDate ?? 0)), [checkpoints]);

  // Upcoming next 30 days
  const upcoming = useMemo(() => {
    const end = Date.now() + 30 * 86400000;
    return checkpoints
      .filter(cp => cp.dueDate && cp.dueDate >= Date.now() && cp.dueDate <= end && cp.status !== 'done')
      .sort((a, b) => (a.dueDate ?? 0) - (b.dueDate ?? 0));
  }, [checkpoints]);

  // No due dates
  const noDue = useMemo(() => checkpoints.filter(cp => !cp.dueDate && cp.status !== 'done'), [checkpoints]);

  const getDayCps = (day: Date | null) => {
    if (!day) return [];
    const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
    return cpByDay.get(key) ?? [];
  };

  return (
    <div className="space-y-6">
      {/* Overdue banner */}
      {overdue.length > 0 && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-4">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <AlertTriangle size={11} /> {overdue.length} overdue
          </p>
          <div className="flex flex-col gap-1.5">
            {overdue.map(cp => (
              <OverdueRow key={cp.id} cp={cp} onReturn={onReturn} onEdit={onEdit} />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prev} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition-all">
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-sm font-semibold text-white">
              {current.toLocaleDateString([], { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={next} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition-all">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-slate-700 uppercase tracking-widest py-1">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-0.5">
            {grid.map((day, i) => {
              const cps = getDayCps(day);
              const isToday = day ? isSameDay(day, today) : false;
              const isPast = day ? day < today && !isToday : false;
              return (
                <div
                  key={i}
                  className={`min-h-[72px] sm:min-h-[80px] rounded-xl p-1.5 border transition-all ${
                    !day ? 'border-transparent' :
                    isToday ? 'border-indigo-500/40 bg-indigo-500/[0.06]' :
                    'border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.03]'
                  }`}
                >
                  {day && (
                    <>
                      <span className={`text-[11px] font-semibold block mb-1 ${
                        isToday ? 'text-indigo-400' : isPast ? 'text-slate-700' : 'text-slate-500'
                      }`}>
                        {day.getDate()}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        {cps.slice(0, 3).map(cp => (
                          <button
                            key={cp.id}
                            onClick={() => onReturn(cp.id)}
                            className="w-full text-left px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium truncate transition-all hover:opacity-80 active:scale-95"
                            style={{ background: `${cp.accentColor}20`, color: cp.accentColor, border: `1px solid ${cp.accentColor}30` }}
                            title={cp.title}
                          >
                            {cp.isPinned && '📌 '}{cp.title}
                          </button>
                        ))}
                        {cps.length > 3 && (
                          <span className="text-[9px] text-slate-600 pl-1">+{cps.length - 3} more</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Upcoming */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Upcoming · 30 days</p>
            {upcoming.length === 0 ? (
              <p className="text-xs text-slate-700">Nothing due soon</p>
            ) : (
              <div className="space-y-2">
                {upcoming.map(cp => {
                  const due = getDueInfo(cp.dueDate);
                  return (
                    <button
                      key={cp.id}
                      onClick={() => onReturn(cp.id)}
                      className="w-full text-left flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cp.accentColor }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-medium truncate">{cp.title}</p>
                        {due && <p className="text-[10px] mt-0.5" style={{ color: due.color }}>{due.label}</p>}
                      </div>
                      {cp.priority === 'urgent' && <Flame size={11} className="text-red-400 flex-shrink-0" />}
                      {cp.priority === 'high' && <ArrowUp size={11} className="text-amber-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* No due date */}
          {noDue.length > 0 && (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Clock size={10} /> No due date · {noDue.length}
              </p>
              <div className="space-y-1.5">
                {noDue.slice(0, 8).map(cp => (
                  <button
                    key={cp.id}
                    onClick={() => onEdit(cp.id)}
                    className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cp.accentColor }} />
                    <span className="text-xs text-slate-500 group-hover:text-slate-300 truncate flex-1">{cp.title}</span>
                    {cp.isPinned && <Pin size={9} className="text-slate-700 flex-shrink-0" />}
                  </button>
                ))}
                {noDue.length > 8 && (
                  <p className="text-[10px] text-slate-700 pl-2">+{noDue.length - 8} more</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OverdueRow({ cp, onReturn, onEdit }: { cp: Checkpoint; onReturn: (id: string) => void; onEdit: (id: string) => void }) {
  const due = getDueInfo(cp.dueDate);
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02] border border-red-500/10 group">
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cp.accentColor }} />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-slate-300 font-medium truncate">{cp.title}</span>
        {due && <span className="text-[10px] ml-2" style={{ color: due.color }}>{due.label}</span>}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(cp.id)} className="px-2 py-1 text-[10px] rounded-lg bg-white/[0.05] text-slate-400 hover:text-white transition-all">Edit</button>
        <button onClick={() => onReturn(cp.id)} className="px-2 py-1 text-[10px] rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-all">Return</button>
      </div>
    </div>
  );
}
