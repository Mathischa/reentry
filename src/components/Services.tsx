import { useRef, useState } from 'react';
import { useInView } from '../hooks';
import { BANKS, BETTING, type Platform } from '../data/platforms';
import { CheckCircle, AlertTriangle, Smartphone, Monitor, PauseCircle, CalendarClock, ExternalLink, Copy, Check } from 'lucide-react';

export function Services() {
  return (
    <>
      {/* BANQUES */}
      <section id="banques" className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="🏦 Banques en ligne"
            badgeColor="#0ea5e9"
            title="Offres de parrainage bancaires"
            sub="Ouvre un compte et reçois une prime sans condition de dépôt sur la plupart des offres. Aucun risque financier."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BANKS.map((p, i) => <PlatformCard key={p.id} platform={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* PARIS SPORTIFS */}
      <section id="paris" className="py-24 px-5 sm:px-8" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="🎯 Paris Sportifs"
            badgeColor="#f59e0b"
            title="Offres de parrainage paris & poker"
            sub="Profite des offres de bienvenue et des primes de parrainage sur les plateformes de jeux agréées ANJ (ex-ARJEL)."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {BETTING.map((p, i) => <PlatformCard key={p.id} platform={p} index={i} />)}
          </div>
          <div className="mt-8 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] max-w-2xl mx-auto text-center">
            <p className="text-amber-400/80 text-sm flex items-center justify-center gap-2">
              <AlertTriangle size={15} />
              Jeux d'argent réservés aux majeurs (18+). Jouez de manière responsable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ badge, badgeColor, title, sub }: { badge: string; badgeColor: string; title: string; sub: string }) {
  return (
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
        style={{ color: badgeColor, borderColor: `${badgeColor}33`, background: `${badgeColor}11` }}>
        {badge}
      </div>
      <h2 className="section-title">{title}</h2>
      <p className="section-sub mx-auto">{sub}</p>
    </div>
  );
}

function PlatformCard({ platform: p, index }: { platform: Platform; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [, inView] = useInView(ref, { threshold: 0.1 });
  const [copied, setCopied] = useState(false);

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
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: p.suspended ? '#6b7280' : p.gradient }} />
      {/* Suspended overlay badge */}
      {p.suspended && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold">
          <PauseCircle size={10} /> Offre suspendue
        </div>
      )}

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
              {p.emoji}
            </div>
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

        {/* Bonus amounts */}
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

        {/* Highlight */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.highlight}</p>

        {/* Key conditions */}
        <div className="space-y-2 mb-5">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Conditions clés</p>
          {p.conditions.slice(0, 3).map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: p.color }} />
              <span className="text-slate-400 text-xs leading-snug">{c}</span>
            </div>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs border-t border-white/[0.05] pt-4 mb-4">
          <span className="text-slate-500">{p.minDeposit}</span>
          <span className="text-slate-600 text-[10px]">{p.timeline.slice(0, 35)}...</span>
        </div>

        {/* Last checked */}
        {p.lastChecked && (
          <p className="text-[10px] text-slate-600 flex items-center gap-1 mb-3">
            <CalendarClock size={9} /> Vérifié sur site officiel · {p.lastChecked}
          </p>
        )}

        {/* Referral code / link */}
        {p.referralCode && (
          <div className="flex items-center justify-between gap-2 mb-3 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03]">
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
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 mb-3"
            style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
            🔗 S'inscrire avec mon lien parrain
          </a>
        )}

        {/* CTA */}
        <a href={`#tuto-${p.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-95"
          style={{ background: p.gradient, color: 'white' }}>
          Voir le tutoriel complet →
        </a>
        <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-2xl text-xs font-semibold text-slate-400 border border-white/[0.07] hover:border-white/20 hover:text-slate-200 transition-all mt-2">
          <ExternalLink size={11} /> Voir l'offre officielle
        </a>
      </div>
    </div>
  );
}
