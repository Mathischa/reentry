import { useState, useRef } from 'react';
import { useInView } from '../hooks';
import { PLATFORMS, type Platform } from '../data/platforms';
import { ChevronDown, ChevronUp, Smartphone, Monitor, AlertTriangle, Lightbulb, FileText, CheckCircle2 } from 'lucide-react';

export function Portfolio() {
  const [activeId, setActiveId] = useState<string | null>('boursorama');

  return (
    <section id="tutoriels" className="py-24 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-sky-500/30 bg-sky-500/10 text-sky-400">
            📖 Guides pas-à-pas
          </div>
          <h2 className="section-title">Tutoriels détaillés</h2>
          <p className="section-sub mx-auto">Chaque étape expliquée clairement — conditions exactes, documents requis, et astuces pour ne rater aucune prime.</p>
        </div>

        {/* Platform selector tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveId(activeId === p.id ? null : p.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all"
              style={activeId === p.id
                ? { background: p.gradient, color: 'white', boxShadow: `0 4px 20px -4px ${p.color}60` }
                : { background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}30` }}
            >
              {p.emoji} {p.name}
            </button>
          ))}
        </div>

        {/* Tutorial panels */}
        <div className="space-y-4">
          {PLATFORMS.map(p => (
            <TutorialPanel key={p.id} platform={p} open={activeId === p.id} onToggle={() => setActiveId(activeId === p.id ? null : p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TutorialPanel({ platform: p, open, onToggle }: { platform: Platform; open: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [, inView] = useInView(ref, { threshold: 0.05 });

  return (
    <div
      id={`tuto-${p.id}`}
      ref={ref}
      className="rounded-3xl border overflow-hidden transition-all duration-300"
      style={{
        borderColor: open ? `${p.color}40` : `${p.color}15`,
        background: open ? `${p.color}06` : 'rgba(255,255,255,0.015)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, background 0.3s',
        boxShadow: open ? `0 0 40px -16px ${p.color}30` : 'none',
      }}
    >
      {/* Header (always visible — clickable) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
            {p.emoji}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{p.name}</h3>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: p.color, background: `${p.color}15` }}>
                Filleul : {p.bonusFilleul}
              </span>
              <span className="text-xs text-slate-500">Parrain : {p.bonusParrain}</span>
              <span className="text-xs flex items-center gap-1 text-slate-500">
                {p.badge === 'App uniquement' ? <Smartphone size={10} /> : <Monitor size={10} />}
                {p.badge}
              </span>
            </div>
          </div>
        </div>
        <div style={{ color: p.color }}>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-6 pb-8 space-y-8">

          {/* Quick info strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Dépôt min.', value: p.minDeposit },
              { label: 'Délai prime', value: p.timeline.split(' ').slice(0, 4).join(' ') },
              { label: 'Catégorie', value: p.category === 'bank' ? '🏦 Banque' : '🎯 Paris' },
              { label: 'Accès', value: p.badge },
            ].map(info => (
              <div key={info.label} className="rounded-2xl p-3 text-center" style={{ background: `${p.color}08`, border: `1px solid ${p.color}15` }}>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{info.label}</p>
                <p className="text-xs font-semibold text-white">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span style={{ color: p.color }}>📋</span> Tutoriel pas-à-pas
            </h4>
            <div className="space-y-4">
              {p.steps.map(step => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white"
                    style={{ background: p.gradient }}>
                    {step.num}
                  </div>
                  <div className="flex-1 pb-4 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h5 className="font-semibold text-white text-sm">{step.title}</h5>
                      {step.tag && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1"
                          style={{ background: step.tag === 'App' ? '#7c3aed20' : step.tag === 'Web' ? '#0ea5e920' : '#10b98120',
                                   color: step.tag === 'App' ? '#a78bfa' : step.tag === 'Web' ? '#38bdf8' : '#34d399' }}>
                          {step.tag === 'App' ? <Smartphone size={8} /> : step.tag === 'Web' ? <Monitor size={8} /> : null}
                          {step.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents required */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <FileText size={15} style={{ color: p.color }} /> Documents requis
              </h4>
              <div className="space-y-2">
                {p.documents.map((doc, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                    <span className="text-slate-400 text-xs leading-snug">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions complètes */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 size={15} style={{ color: p.color }} /> Conditions complètes
              </h4>
              <div className="space-y-2">
                {p.conditions.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.color }} />
                    <span className="text-slate-400 text-xs leading-snug">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl p-5" style={{ background: `${p.color}08`, border: `1px solid ${p.color}20` }}>
            <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: p.color }}>
              <Lightbulb size={14} /> Astuces & conseils
            </h4>
            <div className="space-y-2">
              {p.tips.map((tip, i) => (
                <p key={i} className="text-slate-400 text-xs leading-relaxed flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">→</span> {tip}
                </p>
              ))}
            </div>
          </div>

          {/* Warning if exists */}
          {p.warning && (
            <div className="rounded-2xl p-4 border border-amber-500/25 bg-amber-500/[0.05] flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-400/90 text-sm leading-relaxed">{p.warning}</p>
            </div>
          )}

          {/* Timeline */}
          <div className="text-center py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-slate-500 text-xs">⏱ {p.timeline}</p>
          </div>
        </div>
      )}
    </div>
  );
}
