import { useRef, useState } from 'react';
import { X, Download, Upload, Trash2, FileJson, FileText, AlertTriangle, Keyboard } from 'lucide-react';
import { Checkpoint } from '../types';
import { formatTotalTime } from '../utils/staleness';

interface SettingsModalProps {
  checkpoints: Checkpoint[];
  onImport: (data: Checkpoint[]) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function SettingsModal({ checkpoints, onImport, onClearAll, onClose }: SettingsModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(checkpoints, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reentry-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportMarkdown = () => {
    const lines: string[] = ['# ReEntry Checkpoints', `> Exported ${new Date().toLocaleDateString()}`, ''];
    const active = checkpoints.filter(c => c.status !== 'done');
    const done = checkpoints.filter(c => c.status === 'done');

    const renderCp = (cp: Checkpoint) => {
      lines.push(`## ${cp.title}`);
      if (cp.status !== 'open') lines.push(`**Status:** ${cp.status}`);
      if (cp.priority !== 'normal') lines.push(`**Priority:** ${cp.priority}`);
      if (cp.context) lines.push(`\n**Context:** ${cp.context}`);
      if (cp.nextStep) lines.push(`\n**Next step:** ${cp.nextStep}`);
      if (cp.brainDump) lines.push(`\n**Brain dump:**\n${cp.brainDump}`);
      if (cp.subTasks.length > 0) {
        lines.push('\n**Tasks:**');
        cp.subTasks.forEach(t => lines.push(`- [${t.done ? 'x' : ' '}] ${t.text}`));
      }
      if (cp.notes.length > 0) {
        lines.push('\n**Notes:**');
        cp.notes.forEach(n => lines.push(`- ${n.text} *(${new Date(n.createdAt).toLocaleDateString()})*`));
      }
      if (cp.links.length > 0) {
        lines.push('\n**Links:**');
        cp.links.forEach(l => lines.push(`- ${l}`));
      }
      if (cp.sessions.length > 0) {
        lines.push(`\n_${cp.sessions.length} session(s) · ${formatTotalTime(cp.sessions)}_`);
      }
      lines.push('');
    };

    if (active.length > 0) { lines.push('## Active\n'); active.forEach(renderCp); }
    if (done.length > 0) { lines.push('## Done\n'); done.forEach(renderCp); }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reentry-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (!Array.isArray(data)) throw new Error('Expected an array');
        onImport(data);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch {
        setImportError('Invalid file. Please use a ReEntry JSON export.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const SHORTCUTS = [
    { key: '⌘K', desc: 'New checkpoint' },
    { key: '⌘S', desc: 'Save in edit modal' },
    { key: '⌘↵', desc: 'Next step / Save' },
    { key: 'Esc', desc: 'Close modal' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-[#0e0e1a] rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />

        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-semibold text-white">Settings</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-slate-300 transition-colors">
            <X size={15} />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Data */}
          <div>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Data — {checkpoints.length} checkpoints</p>
            <div className="space-y-2">
              <button onClick={exportJSON} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-sm text-slate-300 transition-all text-left">
                <FileJson size={15} className="text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Export as JSON</p>
                  <p className="text-xs text-slate-600 mt-0.5">Full backup, re-importable</p>
                </div>
                <Download size={13} className="ml-auto text-slate-600" />
              </button>
              <button onClick={exportMarkdown} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-sm text-slate-300 transition-all text-left">
                <FileText size={15} className="text-purple-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Export as Markdown</p>
                  <p className="text-xs text-slate-600 mt-0.5">Human-readable, for notes apps</p>
                </div>
                <Download size={13} className="ml-auto text-slate-600" />
              </button>
              <button onClick={() => fileRef.current?.click()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-sm text-slate-300 transition-all text-left">
                <Upload size={15} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Import JSON</p>
                  <p className="text-xs text-slate-600 mt-0.5">Replaces current data</p>
                </div>
              </button>
              <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
              {importError && <p className="text-xs text-red-400 px-1">{importError}</p>}
              {importSuccess && <p className="text-xs text-emerald-400 px-1">Import successful!</p>}
            </div>
          </div>

          {/* Keyboard shortcuts */}
          <div>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Keyboard size={10} /> Shortcuts</p>
            <div className="rounded-xl border border-white/[0.06] overflow-hidden">
              {SHORTCUTS.map(({ key, desc }, i) => (
                <div key={key} className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}>
                  <span className="text-sm text-slate-400">{desc}</span>
                  <kbd className="text-xs bg-white/[0.06] text-slate-400 px-2 py-0.5 rounded-md font-mono border border-white/[0.08]">{key}</kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div>
            <p className="text-[10px] font-semibold text-red-800 uppercase tracking-widest mb-3 flex items-center gap-1.5"><AlertTriangle size={10} /> Danger zone</p>
            {confirmClear ? (
              <div className="flex gap-2">
                <button onClick={() => setConfirmClear(false)} className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-slate-500 hover:text-white text-sm transition-all">Cancel</button>
                <button onClick={() => { onClearAll(); onClose(); }} className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium transition-all">Yes, delete all</button>
              </div>
            ) : (
              <button onClick={() => setConfirmClear(true)} className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/20 text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.08] text-sm transition-all">
                <Trash2 size={14} /> Delete all checkpoints
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
