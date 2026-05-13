import { ArrowRight, TrendingUp, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useCountUp } from '../hooks';

const PLATFORMS = [
  { name: 'Hello bank!',    color: '#0ea5e9', logo: 'https://logo.clearbit.com/hellobank.fr',      href: '#banques' },
  { name: 'Fortuneo',       color: '#00c07f', logo: 'https://logo.clearbit.com/fortuneo.fr',       href: '#banques' },
  { name: 'Revolut',        color: '#7c3aed', logo: 'https://logo.clearbit.com/revolut.com',       href: '#banques' },
  { name: 'Trade Republic', color: '#6366f1', logo: 'https://logo.clearbit.com/traderepublic.com', href: '#crypto'  },
  { name: 'OKX',            color: '#f0b90b', logo: 'https://logo.clearbit.com/okx.com',           href: '#crypto'  },
];

export function Hero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const pillsRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const orb1Ref     = useRef<HTMLDivElement>(null);
  const orb2Ref     = useRef<HTMLDivElement>(null);
  const orb3Ref     = useRef<HTMLDivElement>(null);

  /* Parallax orbs on mousemove */
  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const rx = (e.clientX / window.innerWidth  - 0.5) * 30;
      const ry = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(orb1Ref.current, { x: rx * 1.2, y: ry * 1.2, duration: 1.2, ease: 'power2.out' });
      gsap.to(orb2Ref.current, { x: -rx * 0.8, y: -ry * 0.8, duration: 1.5, ease: 'power2.out' });
      gsap.to(orb3Ref.current, { x: rx * 0.5, y: ry * 0.5, duration: 1.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* Entrance animations */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(titleRef.current?.querySelectorAll('[data-word]') ?? [],
        { y: 60, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.08 }, '-=0.2')
      .fromTo(subRef.current,    { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo(pillsRef.current?.children ?? [],
        { y: 16, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.05 }, '-=0.3')
      .fromTo(ctaRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.3')
      .fromTo(statsRef.current?.children ?? [],
        { y: 24, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 }, '-=0.2');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-16 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={orb1Ref} className="absolute top-[15%] left-[10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #10b981, #0ea5e9)' }} />
        <div ref={orb2Ref} className="absolute bottom-[10%] right-[5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full opacity-[0.05] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #6366f1, #a855f7)' }} />
        <div ref={orb3Ref} className="absolute top-[55%] left-[50%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full opacity-[0.04] blur-[90px]"
          style={{ background: 'radial-gradient(circle, #f0b90b, #e60000)' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.055) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Badge */}
      <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400 text-xs sm:text-sm mb-7 sm:mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Mis à jour — Offres vérifiées Avril 2026
      </div>

      {/* Headline */}
      <h1
        ref={titleRef}
        className="font-black tracking-tight leading-[1.04] mb-5 sm:mb-6 max-w-4xl"
        style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', perspective: '600px' }}
      >
        <div className="overflow-hidden mb-1">
          <span data-word className="text-white inline-block">Gagnez&nbsp;</span>
          <span data-word className="inline-block hero-gradient-text">jusqu'à 370€</span>
        </div>
        <div className="overflow-hidden">
          <span data-word className="text-white inline-block">grâce aux&nbsp;</span>
          <span data-word className="inline-block hero-gradient-text">parrainages</span>
        </div>
      </h1>

      <p ref={subRef} className="text-slate-400 text-base sm:text-lg max-w-xl sm:max-w-2xl mb-7 sm:mb-8 leading-relaxed px-2">
        Codes & liens parrain prêts à l'emploi pour encaisser les meilleures primes — banques en ligne, crypto et apps.
      </p>

      {/* Platform pills */}
      <div ref={pillsRef} className="flex items-center gap-2 sm:gap-3 mb-9 sm:mb-10 flex-wrap justify-center px-2">
        {PLATFORMS.map(p => (
          <a key={p.name} href={p.href}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all hover:scale-105"
            style={{ borderColor: `${p.color}33`, background: `${p.color}11`, color: p.color }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${p.color}30`}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
          >
            <LogoPill logo={p.logo} name={p.name} color={p.color} />
            {p.name}
          </a>
        ))}
      </div>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-16 sm:mb-20 w-full sm:w-auto px-4">
        <a href="#banques"
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white transition-all hover:scale-[1.03] active:scale-95"
          style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', boxShadow: '0 8px 32px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
          Voir les offres <ArrowRight size={17} />
        </a>
        <a href="#comparatif"
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-2xl text-sm sm:text-base font-medium text-slate-300 border border-white/[0.08] hover:border-white/[0.18] hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.06]">
          Tableau comparatif
        </a>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl px-2">
        <StatCard icon={<TrendingUp size={14} />}            end={370} suffix="€"        label="Max cumulable filleul"        color="#10b981" />
        <StatCard icon={<span className="text-sm">🏦</span>} end={3}   suffix=" banques" label="Banques actives avril 2026" color="#0ea5e9" />
        <StatCard icon={<span className="text-sm">🟡</span>} end={2}   suffix=" crypto"  label="Exchanges vérifiés"         color="#6366f1" />
        <StatCard icon={<span className="text-sm">✅</span>} end={100} suffix="%"        label="Offres vérifiées en direct"  color="#f0b90b" />
      </div>

      {/* Scroll cue */}
      <a href="#banques" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 transition-colors animate-bounce-slow" aria-label="Scroll">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}

function LogoPill({ logo, name }: { logo: string; name: string; color: string }) {
  const [err, setErr] = useState(false);
  if (!err) return <img src={logo} alt={name} width={16} height={16} className="rounded-sm object-contain" style={{ width: 16, height: 16 }} onError={() => setErr(true)} />;
  return <span style={{ fontSize: 13 }}>{name[0]}</span>;
}

function StatCard({ icon, end, suffix, label, color }: { icon: React.ReactNode; end: number; suffix: string; label: string; color: string }) {
  const ref = useCountUp(end, { duration: 2 });
  return (
    <div className="group px-4 py-3 sm:py-4 rounded-2xl bg-white/[0.025] border border-white/[0.06] text-center transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1] hover:scale-[1.02]"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
      <div className="flex items-center justify-center gap-1.5 mb-1" style={{ color }}>
        {icon}
        <p className="text-lg sm:text-xl font-black tabular-nums">
          <span ref={ref}>0</span>{suffix}
        </p>
      </div>
      <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">{label}</p>
    </div>
  );
}
