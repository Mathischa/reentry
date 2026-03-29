import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-24 pb-16 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #0ea5e9, #1a4fd6)', transform: 'translate(var(--mx,0), var(--my,0))' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.08] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #6366f1, #a855f7)', transform: 'translate(calc(var(--mx,0) * -0.6), calc(var(--my,0) * -0.6))' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.07) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/25 bg-sky-500/[0.08] text-sky-400 text-sm mb-8 animate-fade-in">
        <Sparkles size={14} />
        Agence web &amp; digital — France
      </div>

      {/* Headline */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl">
        <span className="text-white">Des sites web qui</span>
        <br />
        <span style={{ background: 'linear-gradient(135deg, #00c2ff 0%, #6366f1 60%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          convertissent vraiment
        </span>
      </h1>

      <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
        Webyra conçoit des sites vitrine, e-commerce et applications web sur-mesure. Design premium, code propre, résultats mesurables.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
        <a href="#contact"
          className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-white transition-all active:scale-95 hover:scale-[1.03]"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 8px 32px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
          Démarrer mon projet <ArrowRight size={18} />
        </a>
        <a href="#portfolio"
          className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-medium text-slate-300 border border-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.06]">
          Voir nos réalisations
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {[
          { n: '50+', label: 'Projets livrés' },
          { n: '100%', label: 'Clients satisfaits' },
          { n: '< 48h', label: 'Réponse garantie' },
          { n: '3 ans', label: "d'expérience" },
        ].map(s => (
          <div key={s.label} className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-black text-white" style={{ background: 'linear-gradient(135deg,#00c2ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.n}</p>
            <p className="text-xs text-slate-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
