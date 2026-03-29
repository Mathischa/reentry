import { SectionLabel, GradientText } from './Services';
import { SectionTitle } from './SectionTitle';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: '01', title: 'Découverte', desc: "On échange sur votre projet, vos objectifs et votre budget. Appel gratuit de 30 min." },
  { n: '02', title: 'Stratégie & Devis', desc: "On vous propose une stratégie claire et un devis détaillé sous 48h, sans surprise." },
  { n: '03', title: 'Design', desc: "Maquettes Figma de votre site. Vous validez l'identité visuelle avant qu'on code." },
  { n: '04', title: 'Développement', desc: "Intégration précise, code propre, optimisations SEO et performance incluses." },
  { n: '05', title: 'Livraison & Suivi', desc: "Mise en ligne, formation, et support post-lancement. On reste disponibles." },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const steps = containerRef.current.querySelectorAll('[data-step]');
    gsap.fromTo(
      steps,
      { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50) },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          once: true,
        },
      }
    );
  }, []);

  // Animate SVG line
  useEffect(() => {
    if (!svgRef.current) return;

    const length = svgRef.current.getTotalLength();
    svgRef.current.style.strokeDasharray = `${length}`;
    svgRef.current.style.strokeDashoffset = `${length}`;

    ScrollTrigger.create({
      trigger: svgRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.to(svgRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
        });
      },
      once: true,
    });
  }, []);
  return (
    <section id="processus" className="py-24 px-5 sm:px-8" style={{ background: 'linear-gradient(180deg, transparent, rgba(14,165,233,0.03) 50%, transparent)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Notre processus</SectionLabel>
        <SectionTitle>Simple, transparent,<br /><GradientText>sans mauvaises surprises</GradientText></SectionTitle>
        <p className="section-sub">De l'idée à la mise en ligne, voici comment on travaille ensemble.</p>

        <div ref={containerRef} className="mt-16 relative">
          {/* SVG Line */}
          <svg className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 h-full overflow-visible pointer-events-none" style={{ opacity: 0.5 }}>
            <path
              ref={svgRef}
              d={`M 0 0 L 0 ${STEPS.length * 200}`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <div key={step.n} data-step className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* Number bubble */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 0 20px rgba(14,165,233,0.3)' }}>
                  {step.n}
                </div>
                {/* Content */}
                <div className={`flex-1 pb-2 ${i % 2 === 0 ? 'sm:pr-16 sm:text-right sm:self-start' : 'sm:pl-16'}`}>
                  <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                </div>
                {/* Spacer for alternating layout */}
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
