import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCountUp } from '../hooks';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 24;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const spans = titleRef.current.querySelectorAll('span[data-word]');
    gsap.fromTo(spans,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-28 pb-20 overflow-hidden">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #10b981, #0ea5e9)', transform: 'translate(var(--mx,0), var(--my,0))', transition: 'transform 0.4s ease' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #6366f1, #a855f7)', transition: 'transform 0.4s ease' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400 text-sm mb-8 animate-fade-in">
        <Zap size={13} className="fill-emerald-400" />
        Mis à jour en temps réel — Offres vérifiées Avril 2026
      </div>

      {/* Headline */}
      <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-[1.05] mb-6 max-w-5xl">
        <div className="overflow-hidden mb-1">
          <span data-word className="text-white inline-block">Gagnez</span>{' '}
          <span data-word className="inline-block" style={{ background: 'linear-gradient(135deg,#10b981 0%,#0ea5e9 60%,#6366f1 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>jusqu'à 680€</span>
        </div>
        <div className="overflow-hidden">
          <span data-word className="text-white inline-block">grâce aux</span>{' '}
          <span data-word className="inline-block" style={{ background: 'linear-gradient(135deg,#10b981 0%,#0ea5e9 60%,#6366f1 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>parrainages</span>
        </div>
      </h1>

      <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-5 leading-relaxed">
        Guides complets, conditions réelles et tutoriels pas-à-pas pour encaisser les meilleures primes de parrainage des banques et sites de paris.
      </p>

      {/* Platform logos row */}
      <div className="flex items-center gap-3 sm:gap-4 mb-10 flex-wrap justify-center">
        {[
          { name: 'Boursorama', color: '#00b4d8', emoji: '🏦' },
          { name: 'Fortuneo', color: '#00c07f', emoji: '💚' },
          { name: 'Revolut', color: '#7c3aed', emoji: '⚡' },
          { name: 'Betclic', color: '#e8001c', emoji: '⚽' },
          { name: 'Winamax', color: '#d97706', emoji: '🃏' },
        ].map(p => (
          <span key={p.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
            style={{ borderColor: `${p.color}33`, background: `${p.color}11`, color: p.color }}>
            {p.emoji} {p.name}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
        <a href="#banques"
          className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-white transition-all active:scale-95 hover:scale-[1.03]"
          style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)', boxShadow: '0 8px 32px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
          Voir les offres banques <ArrowRight size={18} />
        </a>
        <a href="#comparatif"
          className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-medium text-slate-300 border border-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.06]">
          Tableau comparatif
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        <StatCard icon={<TrendingUp size={15} />} end={680} suffix="€" label="Max (BNP 350€ + Monabanq 330€)" color="#10b981" />
        <StatCard icon={<span className="text-sm">🏦</span>} end={7} suffix=" banques" label="Offres actives (avril 2026)" color="#0ea5e9" />
        <StatCard icon={<span className="text-sm">🎯</span>} end={7} suffix=" paris" label="Bookmakers agréés ANJ" color="#6366f1" />
        <StatCard icon={<Shield size={15} />} end={100} suffix="%" label="Montants vérifiés site officiel" color="#a855f7" />
      </div>
    </section>
  );
}

function StatCard({ icon, end, suffix, label, color }: { icon: React.ReactNode; end: number; suffix: string; label: string; color: string }) {
  const ref = useCountUp(end, { duration: 2 });
  return (
    <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center min-w-[130px]">
      <div className="flex items-center justify-center gap-1 mb-0.5" style={{ color }}>
        {icon}
        <p className="text-xl font-black">
          <span ref={ref}>0</span>{suffix}
        </p>
      </div>
      <p className="text-xs text-slate-600">{label}</p>
    </div>
  );
}
