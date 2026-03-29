import { ExternalLink, Star } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';
import { SectionTitle } from './SectionTitle';
import { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Portfolio</SectionLabel>
        <SectionTitle>Notre <GradientText>première réalisation</GradientText></SectionTitle>
        <p className="section-sub">Un projet livré avec soin. D'autres sont en cours — le vôtre pourrait être le prochain.</p>

        <div className="mt-14 max-w-2xl mx-auto">
          <PortfolioCard />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-5">Vous voulez un site comme celui-là ?</p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:scale-[1.03] active:scale-95"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 6px 24px rgba(14,165,233,0.28)' }}>
            Démarrer mon projet <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    VanillaTilt.init(card, {
      max: 8,
      scale: 1.02,
      speed: 300,
    });

    return () => {
      if ((card as any).vanillaTilt) {
        (card as any).vanillaTilt.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    if (!card || !spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      spotlight.style.left = x + 'px';
      spotlight.style.top = y + 'px';
      spotlight.style.opacity = '0.6';
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href="https://www.rongfa.fr"
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02] transition-all duration-300"
      style={{ boxShadow: '0 8px 32px rgba(14,165,233,0.1)' }}
    >
      {/* Browser chrome mockup */}
      <div className="relative h-64 sm:h-80 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0ea5e915, #6366f110)' }}>
        {/* Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.4), transparent)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="absolute inset-5 rounded-xl border border-white/[0.07] bg-[#0a0b14] overflow-hidden shadow-2xl">
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05] bg-white/[0.02]">
            <div className="flex gap-1.5">
              {['#f43f5e', '#f59e0b', '#10b981'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />)}
            </div>
            <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.05] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500/60 flex-shrink-0" />
              <span className="text-slate-500 text-xs font-mono">www.rongfa.fr</span>
            </div>
          </div>
          {/* Fake page content */}
          <div className="p-5 space-y-3">
            <div className="h-6 rounded-lg w-1/2" style={{ background: 'linear-gradient(90deg, #0ea5e930, #6366f120)' }} />
            <div className="h-3 rounded w-3/4 bg-white/[0.04]" />
            <div className="h-3 rounded w-2/3 bg-white/[0.03]" />
            <div className="grid grid-cols-3 gap-3 mt-5">
              {['#0ea5e9', '#6366f1', '#a855f7'].map((c, i) => (
                <div key={i} className="rounded-lg h-16" style={{ background: `${c}12`, border: `1px solid ${c}20` }}>
                  <div className="m-2 h-2 rounded" style={{ background: `${c}30`, width: '60%' }} />
                  <div className="m-2 mt-1 h-2 rounded" style={{ background: `${c}18`, width: '40%' }} />
                </div>
              ))}
            </div>
            <div className="h-8 rounded-lg w-36 mt-2" style={{ background: 'linear-gradient(135deg, #0ea5e930, #6366f125)' }} />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.12))' }}>
          <div className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 24px rgba(14,165,233,0.4)' }}>
            <ExternalLink size={15} /> Visiter le site
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white font-bold text-xl">Rongfa</h3>
            <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
              style={{ background: 'rgba(14,165,233,0.12)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)' }}>
              Site Vitrine
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md">
            Création complète du site vitrine pour Rongfa. Design sur-mesure, optimisation SEO et intégration d'un espace de contact performant.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['React', 'Tailwind CSS', 'SEO', 'Figma', 'Mobile-first'].map(t => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-500 border border-white/[0.06]">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
        </div>
      </div>
    </a>
  );
}
