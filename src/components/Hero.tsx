import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCountUp } from '../hooks';

const PILLS = [
  { name: 'Hello bank!',    color: '#0ea5e9', href: '#parrainages' },
  { name: 'Fortuneo',       color: '#00c07f', href: '#parrainages' },
  { name: 'Revolut',        color: '#7c3aed', href: '#parrainages' },
  { name: 'OKX',            color: '#f0b90b', href: '#parrainages' },
  { name: 'Trade Republic', color: '#6366f1', href: '#parrainages' },
  { name: 'Robinhood',      color: '#00c400', href: '#parrainages' },
];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const pillsRef   = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const orb1Ref    = useRef<HTMLDivElement>(null);
  const orb2Ref    = useRef<HTMLDivElement>(null);

  /* Parallax orbs */
  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const rx = (e.clientX / window.innerWidth  - 0.5) * 25;
      const ry = (e.clientY / window.innerHeight - 0.5) * 25;
      gsap.to(orb1Ref.current, { x: rx * 1.1, y: ry * 1.1, duration: 1.4, ease: 'power2.out' });
      gsap.to(orb2Ref.current, { x: -rx * 0.7, y: -ry * 0.7, duration: 1.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* Entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current,  { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(titleRef.current?.children ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, '-=0.2')
      .fromTo(subRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo(pillsRef.current?.children ?? [],
        { y: 14, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.04 }, '-=0.3')
      .fromTo(ctaRef.current?.children ?? [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.3')
      .fromTo(statsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={orb1Ref}
          className="absolute rounded-full"
          style={{ top: '10%', left: '8%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(232,149,42,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div ref={orb2Ref}
          className="absolute rounded-full"
          style={{ bottom: '8%', right: '6%', width: 550, height: 550, background: 'radial-gradient(circle, rgba(154,107,62,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }} />
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(212,168,67,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Live badge */}
      <div ref={badgeRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold tracking-widest uppercase mb-8 sm:mb-10" style={{ borderRadius: 20, border: '1px solid rgba(212,168,67,0.2)', background: 'rgba(212,168,67,0.07)', color: '#d4a843', letterSpacing: '0.1em' }}>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a843] opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4a843]" />
        </span>
        Offres vérifiées — Avril 2026
      </div>

      {/* Headline — DM Serif Display */}
      <div ref={titleRef} className="mb-6 sm:mb-7">
        <div className="overflow-hidden">
          <h1
            className="text-[#f5ede0] block"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(3.2rem, 8.5vw, 6rem)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Gagnez{' '}
            <span className="hero-gradient-text">jusqu'à 510€</span>
          </h1>
        </div>
        <div className="overflow-hidden mt-1">
          <h1
            className="text-[#f5ede0] block"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(3.2rem, 8.5vw, 6rem)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            grâce aux{' '}
            <span className="hero-gradient-text">parrainages</span>
          </h1>
        </div>
      </div>

      <p ref={subRef} className="text-[#7a6a55] text-base sm:text-lg max-w-lg mb-8 sm:mb-10 leading-relaxed">
        Codes &amp; liens parrain vérifiés — banques, crypto et apps. Prêts à l'emploi pour encaisser tes primes aujourd'hui.
      </p>

      {/* Platform pills */}
      <div ref={pillsRef} className="flex items-center gap-2 mb-9 sm:mb-10 flex-wrap justify-center">
        {PILLS.map(p => (
          <a key={p.name} href={p.href}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold border transition-all hover:scale-105"
            style={{
              borderRadius: 6,
              borderColor: `${p.color}28`,
              background: `${p.color}0e`,
              color: p.color,
              letterSpacing: '0.01em',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, opacity: 0.7, flexShrink: 0 }} />
            {p.name}
          </a>
        ))}
      </div>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 mb-16 sm:mb-20 w-full sm:w-auto px-4">
        <a href="#parrainages"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#0e0b08] transition-all hover:scale-[1.03] active:scale-95"
          style={{
            borderRadius: 8,
            background: 'linear-gradient(135deg, #f0b54a, #d4893a)',
            boxShadow: '0 4px 24px rgba(212,168,67,0.3)',
          }}>
          Voir les offres <ArrowRight size={15} />
        </a>
        <a href="#comparatif"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-[#7a6a55] border border-white/[0.08] hover:border-white/[0.16] hover:text-[#ede8df] transition-all bg-white/[0.02] hover:bg-white/[0.04]"
          style={{ borderRadius: 8 }}>
          Tableau comparatif
        </a>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} className="w-full max-w-xl px-4">
        <div className="flex items-center justify-center gap-0 rounded-xl overflow-hidden border border-white/[0.06]"
          style={{ background: 'rgba(255,240,200,0.018)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
          <StatCell end={510} suffix="€" label="Max cumulable" />
          <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <StatCell end={6} suffix="" label="Offres actives" />
          <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <StatCell end={100} suffix="+" label="Parrainages" />
          <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <StatCell end={100} suffix="%" label="Vérifiées" />
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#parrainages" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#4a3f32] hover:text-[#7a6a55] transition-colors animate-bounce-slow" aria-label="Scroll">
        <ChevronDown size={20} />
      </a>
    </section>
  );
}

function StatCell({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useCountUp(end, { duration: 2 });
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-5 px-3 text-center">
      <p className="font-black text-lg sm:text-xl tabular-nums leading-none mb-1" style={{ color: '#d4a843' }}>
        <span ref={ref}>0</span>{suffix}
      </p>
      <p className="text-[9px] text-[#4a3f32] uppercase tracking-widest font-semibold">{label}</p>
    </div>
  );
}
