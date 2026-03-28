import { Checkpoint, StalenessInfo, StalenessLevel, DueInfo } from '../types';

export function getStaleness(checkpoint: Checkpoint): StalenessInfo {
  const reference = checkpoint.lastReturnedAt ?? checkpoint.createdAt;
  const msAway = Date.now() - reference;
  const minutes = Math.floor(msAway / 60000);
  const hours = Math.floor(msAway / 3600000);
  const days = Math.floor(msAway / 86400000);

  let timeAway: string;
  if (minutes < 1) timeAway = 'just now';
  else if (minutes < 60) timeAway = `${minutes}m ago`;
  else if (hours < 24) {
    const m = minutes % 60;
    timeAway = m > 0 ? `${hours}h ${m}m ago` : `${hours}h ago`;
  } else {
    const h = hours % 24;
    timeAway = h > 0 ? `${days}d ${h}h ago` : `${days}d ago`;
  }

  let level: StalenessLevel, label: string, dotColor: string, textColor: string, glowClass: string, pulse: boolean;

  if (hours < 1)       { level = 'fresh';   label = 'Fresh';   dotColor = '#34d399'; textColor = 'text-emerald-400'; glowClass = 'glow-fresh';   pulse = false; }
  else if (hours < 6)  { level = 'warm';    label = 'Warm';    dotColor = '#fbbf24'; textColor = 'text-yellow-400';  glowClass = 'glow-warm';    pulse = false; }
  else if (hours < 24) { level = 'cooling'; label = 'Cooling'; dotColor = '#fb923c'; textColor = 'text-orange-400';  glowClass = 'glow-cooling'; pulse = false; }
  else if (days < 3)   { level = 'cold';    label = 'Cold';    dotColor = '#f87171'; textColor = 'text-red-400';     glowClass = 'glow-cold';    pulse = true;  }
  else                 { level = 'frozen';  label = 'Frozen';  dotColor = '#c4b5fd'; textColor = 'text-purple-400';  glowClass = 'glow-frozen';  pulse = true;  }

  return { level, label, timeAway, dotColor, textColor, glowClass, pulse, msAway };
}

export function getDueInfo(dueDate: number | null): DueInfo | null {
  if (!dueDate) return null;
  const now = Date.now();
  const diffMs = dueDate - now;
  const diffDays = Math.ceil(diffMs / 86400000);

  if (diffMs < 0) {
    const overdueDays = Math.abs(Math.floor(diffMs / 86400000));
    return { label: overdueDays > 0 ? `Overdue ${overdueDays}d` : 'Overdue', color: '#f87171', urgent: true };
  }
  if (diffDays <= 1) return { label: 'Due today', color: '#fb923c', urgent: true };
  if (diffDays === 2) return { label: 'Due tomorrow', color: '#fbbf24', urgent: false };
  return { label: `Due in ${diffDays - 1}d`, color: '#94a3b8', urgent: false };
}

export function formatTotalTime(sessions: Array<{ startedAt: number; endedAt: number | null }>): string {
  const totalMs = sessions.reduce((acc, s) => acc + ((s.endedAt ?? Date.now()) - s.startedAt), 0);
  const minutes = Math.floor(totalMs / 60000);
  const hours = Math.floor(totalMs / 3600000);
  if (minutes < 1) return '< 1 min';
  if (minutes < 60) return `${minutes} min`;
  const m = minutes % 60;
  return m > 0 ? `${hours}h ${m}m` : `${hours}h`;
}

export function sortCheckpoints(checkpoints: Checkpoint[], mode: import('../types').SortMode): Checkpoint[] {
  const sorted = [...checkpoints].sort((a, b) => {
    // Pinned always first
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    // Blocked before open (within same pin group)
    if (a.status !== b.status) {
      if (a.status === 'blocked') return -1;
      if (b.status === 'blocked') return 1;
    }
    // Then by sort mode
    switch (mode) {
      case 'staleness': {
        const aRef = a.lastReturnedAt ?? a.createdAt;
        const bRef = b.lastReturnedAt ?? b.createdAt;
        return aRef - bRef;
      }
      case 'recent':
        return b.updatedAt - a.updatedAt;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  return sorted;
}
