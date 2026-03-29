import { Globe, Zap, BarChart2, Wrench, Search, Palette } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from './SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Globe, color: '#0ea5e9', title: 'Site Vitrine',
    desc: 'Une présence en ligne professionnelle qui inspire confiance, rassure vos visiteurs et génère des prises de contact.',
    features: ['Design sur-mesure unique', 'Mobile-first responsive', 'SEO technique inclus', 'CMS pour gérer vos contenus'],
  },
  {
    icon: Palette, color: '#6366f1', title: 'Design & Identité',
    desc: "Maquettes Figma soignées, charte graphique cohérente et expérience utilisateur pensée pour convertir.",
    features: ['Maquettes Figma haute-fidélité', 'Charte graphique complète', 'UX / UI optimisé', 'Révisions incluses'],
  },
  {
    icon: Zap, color: '#f59e0b', title: 'Performance & Vitesse',
    desc: "Un site rapide est mieux référencé et retient davantage vos visiteurs. On optimise chaque milliseconde.",
    features: ['Score Lighthouse 90+', 'Core Web Vitals', 'Images & assets optimisés', 'CDN & hébergement rapide'],
  },
  {
    icon: Search, color: '#10b981', title: 'SEO On-Page',
    desc: "Optimisation technique et éditoriale pour apparaître en tête de Google et générer du trafic qualifié.",
    features: ['Audit SEO complet', 'Balises & structure HTML', 'Plan de contenu', 'Suivi des positions'],
  },
  {
    icon: BarChart2, color: '#a855f7', title: 'Analytics & Suivi',
    desc: "Comprenez vos visiteurs, mesurez vos performances et prenez de meilleures décisions grâce aux données.",
    features: ['Google Analytics 4', 'Tableau de bord dédié', 'Rapports mensuels', 'Suivi des conversions'],
  },
  {
    icon: Wrench, color: '#f43f5e', title: 'Maintenance',
    desc: "Mises à jour, sauvegardes automatiques, monitoring continu et support réactif pour votre sérénité.",
    features: ['Mises à jour régulières', 'Sauvegardes quotidiennes', 'Monitoring 24/7', 'Support prioritaire'],
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('[data-service-card]');
    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="services" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Services</SectionLabel>
        <SectionTitle>Tout ce qu'il faut pour <br /><GradientText>réussir en ligne</GradientText></SectionTitle>
        <p className="section-sub">Nous créons des sites vitrines professionnels qui reflètent votre image et attirent de nouveaux clients.</p>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {SERVICES.map(s => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s }: { service: typeof SERVICES[0] }) {
  const Icon = s.icon;
  return (
    <div data-service-card
      className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }} />
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
        <Icon size={20} style={{ color: s.color }} />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
      <ul className="space-y-1.5">
        {s.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/[0.06] text-sky-400 text-xs font-semibold uppercase tracking-widest mb-5">
      {children}
    </div>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span style={{ background: 'linear-gradient(135deg, #00c2ff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}
