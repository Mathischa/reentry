import { useState } from 'react';
import { Trash2, Pencil, Clock, Hash, ArrowRight, Pin, PinOff, CheckCircle2, RotateCcw, AlertTriangle, Flame, ArrowUp } from 'lucide-react';
import { Checkpoint } from '../types';
import { getStaleness, getDueInfo, formatTotalTime } from '../utils/staleness';

interface CheckpointCardProps {
  checkpoint: Checkpoint;
  onReturn: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onMarkDone: (id: string) => void;
  onRestore: (id: string) => void;
  onToggleBlocked: (id: string) => void;
  style?: React.CSSProperties;
  listMode?: boolean;
}

function PriorityBadge({ priority }: { priority: Checkpoint['priority'] }) {
  if (priority === 'normal') return null;
  if (priority === 'urgent') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-md">
      <Flame size={9} />Urgent
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-md">
      <ArrowUp size={9} />High
    </span>
  );
}

export function CheckpointCard({ checkpoint, onReturn, onEdit, onDelete, onTogglePin, onMarkDone, onRestore, onToggleBlocked, style, listMode }: CheckpointCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const staleness = getStaleness(checkpoint);
  const dueInfo = getDueInfo(checkpoint.dueDate);
  const totalTime = formatTotalTime(checkpoint.sessions);
  const sessionCount = checkpoint.sessions.length;
  const isDone = checkpoint.status === 'done';
  const isBlocked = checkpoint.status === 'blocked';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmDelete) onDelete(checkpoint.id);
    else { setConfirmDelete(true); setTimeout(() => setConfirmDelete(false), 2500); }
  };

  const accentColor = isBlocked ? '#f59e0b' : checkpoint.accentColor;

  if (listMode) {
    return (
      <div
        className={`group relative flex items-center gap-4 rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 border animate-fade-in-up ${isDone ? 'opacity-50' : ''}`}
        style={{ ...style, background: '#0c0c18', borderColor: 'rgba(255,255,255,0.05)' }}
        onClick={() => isDone ? onRestore(checkpoint.id) : onReturn(checkpoint.id)}
      >
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}60` }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`font-medium text-white text-sm truncate ${isDone ? 'line-through text-slate-500' : ''}`}>{checkpoint.title}</p>
            <PriorityBadge priority={checkpoint.priority} />
            {isBlocked && <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" />}
            {checkpoint.isPinned && <Pin size={10} className="text-slate-500 flex-shrink-0" />}
          </div>
          {checkpoint.nextStep && <p className="text-xs text-slate-600 truncate mt-0.5">{checkpoint.nextStep}</p>}
        </div>
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0 text-xs text-slate-600">
          {dueInfo && <span style={{ color: dueInfo.color }}>{dueInfo.label}</span>}
          <span className="flex items-center gap-1"><Clock size={10} />{staleness.timeAway}</span>
          {checkpoint.subTasks.length > 0 && (
            <span className="flex items-center gap-1">
              <CheckCircle2 size={9} />
              {checkpoint.subTasks.filter(t => t.done).length}/{checkpoint.subTasks.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button onClick={e => { e.stopPropagation(); onTogglePin(checkpoint.id); }} className="p-1.5 rounded-lg hover:bg-white/[0.07] text-slate-600 hover:text-slate-300 transition-all">
            {checkpoint.isPinned ? <PinOff size={12} /> : <Pin size={12} />}
          </button>
          <button onClick={e => { e.stopPropagation(); onEdit(checkpoint.id); }} className="p-1.5 rounded-lg hover:bg-white/[0.07] text-slate-600 hover:text-slate-300 transition-all">
            <Pencil size={12} />
          </button>
          <button onClick={handleDelete} className={`p-1.5 rounded-lg transition-all ${confirmDelete ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/[0.07] text-slate-600 hover:text-slate-400'}`}>
            {confirmDelete ? <span className="text-[10px] px-0.5">Sure?</span> : <Trash2 size={12} />}
          </button>
        </div>
        {isDone
          ? <RotateCcw size={13} className="text-slate-700 group-hover:text-slate-500 flex-shrink-0 transition-colors" />
          : <ArrowRight size={13} className="text-slate-700 group-hover:text-slate-500 flex-shrink-0 transition-colors" />
        }
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded-2xl p-5 cursor-pointer transition-all duration-200 border animate-fade-in-up overflow-hidden ${isDone ? 'opacity-60' : ''}`}
      style={{
        ...style,
        background: '#0c0c18',
        borderColor: isBlocked ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
        boxShadow: isDone ? 'none' : `0 4px 20px rgba(0,0,0,0.4)`,
      }}
      onClick={() => isDone ? onRestore(checkpoint.id) : onReturn(checkpoint.id)}
    >
      {/* Accent left bar */}
      <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full opacity-70" style={{ background: accentColor }} />

      {/* Top hover glow line */}
      {!isDone && (
        <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }} />
      )}

      {/* Pin indicator (always visible when pinned) */}
      {checkpoint.isPinned && (
        <div className="absolute top-3 right-3">
          <Pin size={11} className="text-slate-600" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pl-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap pr-6">
            <h3 className={`font-semibold text-[15px] leading-snug ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>{checkpoint.title}</h3>
            <PriorityBadge priority={checkpoint.priority} />
            {isBlocked && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-md">
                <AlertTriangle size={9} />Blocked
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${staleness.textColor} ${staleness.pulse ? 'animate-glow-pulse' : ''}`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: staleness.dotColor }} />
              {staleness.label}
            </span>
            <span className="text-slate-700 text-xs">·</span>
            <span className="text-slate-600 text-xs flex items-center gap-1"><Clock size={10} />{staleness.timeAway}</span>
            {dueInfo && (
              <>
                <span className="text-slate-700 text-xs">·</span>
                <span className={`text-xs font-medium ${dueInfo.urgent ? 'animate-glow-pulse' : ''}`} style={{ color: dueInfo.color }}>{dueInfo.label}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons (hover) */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-150">
        <button onClick={e => { e.stopPropagation(); onTogglePin(checkpoint.id); }} className={`p-1.5 rounded-lg transition-all ${checkpoint.isPinned ? 'text-indigo-400 hover:bg-white/[0.08]' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.08]'}`} title={checkpoint.isPinned ? 'Unpin' : 'Pin'}>
          {checkpoint.isPinned ? <PinOff size={12} /> : <Pin size={12} />}
        </button>
        {!isDone && (
          <button onClick={e => { e.stopPropagation(); onToggleBlocked(checkpoint.id); }} className={`p-1.5 rounded-lg transition-all ${isBlocked ? 'text-amber-400 hover:bg-amber-500/10' : 'text-slate-600 hover:text-amber-400 hover:bg-white/[0.08]'}`} title={isBlocked ? 'Unblock' : 'Mark blocked'}>
            <AlertTriangle size={12} />
          </button>
        )}
        <button onClick={e => { e.stopPropagation(); onEdit(checkpoint.id); }} className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-600 hover:text-slate-300 transition-all" title="Edit">
          <Pencil size={12} />
        </button>
        <button onClick={handleDelete} className={`p-1.5 rounded-lg transition-all ${confirmDelete ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/[0.08] text-slate-600 hover:text-slate-400'}`} title="Delete">
          {confirmDelete ? <span className="text-[10px] px-0.5">Sure?</span> : <Trash2 size={12} />}
        </button>
      </div>

      {/* Content */}
      <div className="pl-3 space-y-2.5">
        {checkpoint.context && (
          <div>
            <p className="text-[10px] font-semibold text-slate-700 uppercase tracking-widest mb-1">Context</p>
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{checkpoint.context}</p>
          </div>
        )}
        {checkpoint.nextStep && (
          <div>
            <p className="text-[10px] font-semibold text-slate-700 uppercase tracking-widest mb-1">Next step</p>
            <p className={`text-sm font-medium leading-relaxed line-clamp-2 ${isDone ? 'text-slate-600' : 'text-white'}`}>{checkpoint.nextStep}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pl-3 mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          {checkpoint.tags.slice(0, 2).map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 text-[10px] text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.04]">
              <Hash size={7} />{tag}
            </span>
          ))}
          {sessionCount > 0 && (
            <span className="text-[10px] text-slate-700">{sessionCount}× · {totalTime}</span>
          )}
          {checkpoint.subTasks.length > 0 && (
            <span className="text-[10px] text-slate-600 flex items-center gap-1">
              <CheckCircle2 size={9} className={checkpoint.subTasks.filter(t => t.done).length === checkpoint.subTasks.length ? 'text-emerald-500' : 'text-slate-600'} />
              {checkpoint.subTasks.filter(t => t.done).length}/{checkpoint.subTasks.length}
            </span>
          )}
        </div>

        {isDone ? (
          <div className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
            <RotateCcw size={11} />Restore
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={e => { e.stopPropagation(); onMarkDone(checkpoint.id); }}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-400 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
              title="Mark as done"
            >
              <CheckCircle2 size={12} />Done
            </button>
            <div className="flex items-center gap-1 text-xs font-medium transition-all opacity-60 group-hover:opacity-100" style={{ color: accentColor }}>
              Return <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
