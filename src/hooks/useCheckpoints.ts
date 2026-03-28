import { useState, useEffect, useCallback } from 'react';
import { Checkpoint, Priority, CheckpointStatus } from '../types';
import { ACCENT_COLORS } from '../constants/colors';

const V1_KEY = 'reentry_checkpoints_v1';
const V2_KEY = 'reentry_checkpoints_v2';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function migrate(cp: any): Checkpoint {
  return {
    priority: 'normal',
    status: 'open',
    dueDate: null,
    isPinned: false,
    completedAt: null,
    ...cp,
    sessions: (cp.sessions ?? []).map((s: any) => ({
      startedAt: s.startedAt,
      endedAt: s.endedAt,
      endNote: s.endNote ?? '',
    })),
  };
}

function loadFromStorage(): Checkpoint[] {
  try {
    const v2 = localStorage.getItem(V2_KEY);
    if (v2) return (JSON.parse(v2) as any[]).map(migrate);
    // Migrate from v1
    const v1 = localStorage.getItem(V1_KEY);
    if (v1) return (JSON.parse(v1) as any[]).map(migrate);
    return [];
  } catch {
    return [];
  }
}

export function useCheckpoints() {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(V2_KEY, JSON.stringify(checkpoints));
    } catch { /* storage full */ }
  }, [checkpoints]);

  const addCheckpoint = useCallback((data: {
    title: string;
    context: string;
    nextStep: string;
    brainDump: string;
    tags: string[];
    priority?: Priority;
    dueDate?: number | null;
    accentColor?: string;
  }): Checkpoint => {
    const now = Date.now();
    const checkpoint: Checkpoint = {
      id: generateId(),
      title: data.title,
      context: data.context,
      nextStep: data.nextStep,
      brainDump: data.brainDump,
      tags: data.tags,
      priority: data.priority ?? 'normal',
      status: 'open',
      dueDate: data.dueDate ?? null,
      isPinned: false,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
      lastReturnedAt: null,
      sessions: [],
      accentColor: data.accentColor ?? ACCENT_COLORS[0],
      isActive: false,
    };
    setCheckpoints(prev => [checkpoint, ...prev]);
    return checkpoint;
  }, []);

  const updateCheckpoint = useCallback((id: string, data: {
    title?: string;
    context?: string;
    nextStep?: string;
    brainDump?: string;
    tags?: string[];
    priority?: Priority;
    status?: CheckpointStatus;
    dueDate?: number | null;
    accentColor?: string;
  }) => {
    setCheckpoints(prev => prev.map(cp => {
      if (cp.id !== id) return cp;
      const updated = { ...cp, ...data, updatedAt: Date.now() };
      if (data.status === 'done' && cp.status !== 'done') updated.completedAt = Date.now();
      if (data.status && data.status !== 'done') updated.completedAt = null;
      return updated;
    }));
  }, []);

  const returnToCheckpoint = useCallback((id: string) => {
    const now = Date.now();
    setCheckpoints(prev => prev.map(cp => {
      if (cp.id !== id) return cp;
      return {
        ...cp,
        lastReturnedAt: now,
        isActive: true,
        updatedAt: now,
        sessions: [...cp.sessions, { startedAt: now, endedAt: null, endNote: '' }],
      };
    }));
  }, []);

  const endSession = useCallback((id: string, note?: string) => {
    const now = Date.now();
    setCheckpoints(prev => prev.map(cp => {
      if (cp.id !== id) return cp;
      const sessions = cp.sessions.map((s, i) =>
        i === cp.sessions.length - 1 && s.endedAt === null
          ? { ...s, endedAt: now, endNote: note ?? '' }
          : s
      );
      return { ...cp, isActive: false, sessions, updatedAt: now };
    }));
  }, []);

  const deleteCheckpoint = useCallback((id: string) => {
    setCheckpoints(prev => prev.filter(cp => cp.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setCheckpoints(prev => prev.map(cp =>
      cp.id === id ? { ...cp, isPinned: !cp.isPinned, updatedAt: Date.now() } : cp
    ));
  }, []);

  const setStatus = useCallback((id: string, status: CheckpointStatus) => {
    const now = Date.now();
    setCheckpoints(prev => prev.map(cp => {
      if (cp.id !== id) return cp;
      return {
        ...cp,
        status,
        completedAt: status === 'done' ? now : null,
        isActive: status === 'done' ? false : cp.isActive,
        updatedAt: now,
      };
    }));
  }, []);

  const setPriority = useCallback((id: string, priority: Priority) => {
    setCheckpoints(prev => prev.map(cp =>
      cp.id === id ? { ...cp, priority, updatedAt: Date.now() } : cp
    ));
  }, []);

  return {
    checkpoints,
    addCheckpoint,
    updateCheckpoint,
    returnToCheckpoint,
    endSession,
    deleteCheckpoint,
    togglePin,
    setStatus,
    setPriority,
  };
}
