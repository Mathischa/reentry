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
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              🎁 Parrainages actifs
            </div>
            <h2 className="section-title">Mes parrainages</h2>
            <p className="section-sub mx-auto">Tous mes codes et liens parrain vérifiés — utilise-les pour encaisser ta prime dès aujourd'hui.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLATFORMS.map((p, i) => <PlatformCard key={p.id} platform={p} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function PlatformCard({ platform: p, index }: { platform: Platform; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [, inView] = useInView(ref, { threshold: 0.1 });
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
      className="group relative rounded-3xl border bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
      style={{
        borderColor: `${p.color}22`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, background 0.3s`,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px -12px ${p.color}33`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent'; }}
    >
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: p.gradient }} />

      <div className="p-7">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <PlatformLogo id={p.id} logo={p.logo} emoji={p.emoji} name={p.name} color={p.color} size={48} className="rounded-2xl flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">{p.name}</h3>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 inline-flex items-center gap-1"
                style={{ color: p.badgeColor, background: `${p.badgeColor}15`, border: `1px solid ${p.badgeColor}30` }}>
                {p.badge === 'App uniquement'
                  ? <><Smartphone size={9} />App uniquement</>
                  : <><Monitor size={9} />Web & App</>}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-2xl p-3 text-center" style={{ background: `${p.color}0d`, border: `1px solid ${p.color}20` }}>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Tu reçois</p>
            <p className="font-black text-xl leading-tight" style={{ color: p.color }}>{p.bonusFilleul}</p>
          </div>
          <div className="rounded-2xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Parrain reçoit</p>
            <p className="font-black text-xl leading-tight text-slate-300">{p.bonusParrain}</p>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.highlight}</p>

        {p.referralCode && (
          <div className="flex items-center justify-between gap-2 mb-4 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <div>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Code parrain</p>
              <span className="font-mono font-bold text-sm tracking-widest" style={{ color: p.color }}>{p.referralCode}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
              style={{ background: copied ? '#10b98120' : `${p.color}15`, color: copied ? '#10b981' : p.color, border: `1px solid ${copied ? '#10b98130' : `${p.color}30`}` }}
            >
              {copied ? <><Check size={10} /> Copié</> : <><Copy size={10} /> Copier</>}
            </button>
          </div>
        )}
        {p.referralUrl && !p.referralCode && (
          <a href={p.referralUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 mb-4"
            style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
            🔗 S'inscrire avec mon lien parrain
          </a>
        )}

        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all mb-1"
          style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}25` }}
        >
          {expanded ? 'Réduire' : 'Voir les détails'}
          <ChevronDown size={13} style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
        </button>

        <div style={{ display: expanded ? 'block' : 'none' }}>
          <div className="pt-4">
            <div className="space-y-2 mb-5">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Conditions clés</p>
              {p.conditions.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                  <span className="text-slate-400 text-xs leading-snug">{c}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs border-t border-white/[0.05] pt-4 mb-4">
              <span className="text-slate-500">{p.minDeposit}</span>
              <span className="text-slate-600 text-[10px]">{p.timeline.slice(0, 35)}...</span>
            </div>

            {p.lastChecked && (
              <p className="text-[10px] text-slate-600 flex items-center gap-1 mb-3">
                <CalendarClock size={9} /> Vérifié sur site officiel · {p.lastChecked}
              </p>
            )}

            <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-2xl text-xs font-semibold text-slate-400 border border-white/[0.07] hover:border-white/20 hover:text-slate-200 transition-all mt-2">
              <ExternalLink size={11} /> Voir l'offre officielle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
