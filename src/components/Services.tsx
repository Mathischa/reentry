import { useRef, useState } from 'react';
import { useInView } from '../hooks';
import { PLATFORMS, type Platform } from '../data/platforms';
import { CheckCircle, Smartphone, Monitor, CalendarClock, ExternalLink, Copy, Check, ChevronDown } from 'lucide-react';
import { PlatformLogo } from './PlatformLogo';
import { SocialProof } from './SocialProof';

export function Services() {
  return (
    <>
      <SocialProof />

      <section id="parrainages" className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium mb-5 border border-[#d4a843]/20 bg-[#d4a843]/[0.06] text-[#d4a843]" style={{ borderRadius: 20 }}>
              🎁 Parrainages actifs
            </div>
            <h2 className="section-title">Mes parrainages</h2>
            <p className="section-sub mx-auto">Tous mes codes et liens parrain vérifiés — utilise-les pour encaisser ta prime dès aujourd'hui.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORMS.map((p, i) => <PlatformCard key={p.id} platform={p} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function PlatformCard({ platform: p, index }: { platform: Platform; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [, inView] = useInView(ref, { threshold: 0.08 });
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function handleCopy() {
    if (!p.referralCode) return;
    navigator.clipboard.writeText(p.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden flex flex-col"
      style={{
        borderRadius: 14,
        border: `1px solid ${p.color}1a`,
        background: 'rgba(255,240,200,0.022)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 12px rgba(0,0,0,0.3)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s, border-color 0.3s, box-shadow 0.3s`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${p.color}35`;
        el.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${p.color}10`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${p.color}1a`;
        el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 12px rgba(0,0,0,0.3)';
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: p.gradient }} />

      <div className="p-6 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <PlatformLogo id={p.id} logo={p.logo} emoji={p.emoji} name={p.name} color={p.color} size={46} className="flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="font-bold text-[#f5ede0] text-base leading-tight truncate">{p.name}</h3>
            <span
              className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 mt-1"
              style={{ color: p.badgeColor, background: `${p.badgeColor}12`, border: `1px solid ${p.badgeColor}22`, borderRadius: 4 }}
            >
              {p.badge === 'App uniquement' ? <><Smartphone size={8} />App</> : <><Monitor size={8} />Web &amp; App</>}
            </span>
          </div>
        </div>

        {/* Bonus amounts — the star of the show */}
        <div className="flex gap-4 mb-5 pb-5 border-b border-white/[0.05]">
          <div className="flex-1">
            <p className="text-[9px] text-[#5a4d3e] uppercase tracking-widest font-medium mb-1.5">Tu reçois</p>
            <p className="font-black leading-none" style={{ fontSize: '1.9rem', color: p.color }}>{p.bonusFilleul}</p>
          </div>
          <div className="w-px bg-white/[0.05]" />
          <div className="flex-1">
            <p className="text-[9px] text-[#5a4d3e] uppercase tracking-widest font-medium mb-1.5">Parrain reçoit</p>
            <p className="font-bold leading-none text-[#7a6a55]" style={{ fontSize: '1.5rem' }}>{p.bonusParrain}</p>
          </div>
        </div>

        {/* Highlight */}
        <p className="text-[#7a6a55] text-sm leading-relaxed mb-5 flex-1">{p.highlight}</p>

        {/* Referral code */}
        {p.referralCode && (
          <div className="flex items-center justify-between gap-2 mb-4 px-3.5 py-2.5 border border-white/[0.06]" style={{ borderRadius: 8, background: 'rgba(255,240,200,0.025)' }}>
            <div>
              <p className="text-[8px] text-[#5a4d3e] uppercase tracking-widest mb-0.5 font-medium">Code parrain</p>
              <span className="font-mono font-bold text-sm tracking-widest" style={{ color: p.color }}>{p.referralCode}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold transition-all"
              style={{
                borderRadius: 6,
                background: copied ? 'rgba(212,168,67,0.15)' : `${p.color}12`,
                color: copied ? '#d4a843' : p.color,
                border: `1px solid ${copied ? 'rgba(212,168,67,0.25)' : `${p.color}25`}`,
              }}
            >
              {copied ? <><Check size={10} /> Copié</> : <><Copy size={10} /> Copier</>}
            </button>
          </div>
        )}

        {/* TikTok contact (when contactUrl is set) */}
        {p.contactUrl && (
          <a href={p.contactUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all hover:opacity-85 mb-3"
            style={{ borderRadius: 8, background: 'rgba(255,255,255,0.04)', color: '#ede8df', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/></svg>
            Contacte-moi sur TikTok pour le lien
          </a>
        )}

        {/* Referral link (when no code) */}
        {p.referralUrl && !p.referralCode && (
          <a href={p.referralUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all hover:opacity-85 mb-4"
            style={{ borderRadius: 8, background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}28` }}>
            🔗 S'inscrire avec mon lien parrain
          </a>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all"
          style={{ borderRadius: 6, background: 'rgba(255,240,200,0.03)', color: '#7a6a55', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {expanded ? 'Réduire' : 'Voir les conditions'}
          <ChevronDown size={12} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>

        {/* Expanded details */}
        {expanded && (
          <div className="pt-5 mt-1 border-t border-white/[0.05]">
            <p className="text-[9px] text-[#5a4d3e] uppercase tracking-widest font-medium mb-3">Conditions clés</p>
            <div className="space-y-2 mb-4">
              {p.conditions.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={11} className="mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                  <span className="text-[#7a6a55] text-xs leading-snug">{c}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] border-t border-white/[0.04] pt-3 mb-3">
              <span className="text-[#5a4d3e]">{p.minDeposit}</span>
              <span className="text-[#4a3f32]">{p.timeline.slice(0, 32)}…</span>
            </div>

            {p.lastChecked && (
              <p className="text-[9px] text-[#4a3f32] flex items-center gap-1 mb-3">
                <CalendarClock size={9} /> Vérifié · {p.lastChecked}
              </p>
            )}

            <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#5a4d3e] border border-white/[0.06] hover:border-white/[0.14] hover:text-[#ede8df] transition-all"
              style={{ borderRadius: 6 }}>
              <ExternalLink size={10} /> Offre officielle
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
