export type Priority = 'urgent' | 'high' | 'normal';
export type CheckpointStatus = 'open' | 'blocked' | 'done';
export type FilterTab = 'all' | 'open' | 'blocked' | 'done';

export interface Session {
  startedAt: number;
  endedAt: number | null;
  endNote?: string;
}

export interface Checkpoint {
  id: string;
  title: string;
  context: string;
  nextStep: string;
  brainDump: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  lastReturnedAt: number | null;
  sessions: Session[];
  accentColor: string;
  isActive: boolean;
  // new fields
  priority: Priority;
  status: CheckpointStatus;
  dueDate: number | null;
  isPinned: boolean;
  completedAt: number | null;
}

export type StalenessLevel = 'fresh' | 'warm' | 'cooling' | 'cold' | 'frozen';

export interface StalenessInfo {
  level: StalenessLevel;
  label: string;
  timeAway: string;
  dotColor: string;
  textColor: string;
  glowClass: string;
  pulse: boolean;
  msAway: number;
}

export interface DueInfo {
  label: string;
  color: string;
  urgent: boolean;
}

export type ViewMode = 'grid' | 'list';
export type SortMode = 'staleness' | 'recent' | 'alphabetical';
