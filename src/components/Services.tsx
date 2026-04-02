import { useRef } from 'react';
import { useInView } from '../hooks';
import { BANKS, BETTING, type Platform } from '../data/platforms';
import { CheckCircle, AlertTriangle, Smartphone, Monitor } from 'lucide-react';

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
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: p.gradient }} />

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

        {/* CTA */}
        <a href={`#tuto-${p.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-95"
          style={{ background: p.gradient, color: 'white' }}>
          Voir le tutoriel complet →
        </a>
      </div>
    </div>
  );
}
