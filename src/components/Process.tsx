import { SectionLabel, GradientText } from './Services';

const STEPS = [
  { n: '01', title: 'Découverte', desc: "On échange sur votre projet, vos objectifs et votre budget. Appel gratuit de 30 min." },
  { n: '02', title: 'Stratégie & Devis', desc: "On vous propose une stratégie claire et un devis détaillé sous 48h, sans surprise." },
  { n: '03', title: 'Design', desc: "Maquettes Figma de votre site. Vous validez l'identité visuelle avant qu'on code." },
  { n: '04', title: 'Développement', desc: "Intégration précise, code propre, optimisations SEO et performance incluses." },
  { n: '05', title: 'Livraison & Suivi', desc: "Mise en ligne, formation, et support post-lancement. On reste disponibles." },
];

export function Process() {
  return (
    <section id="processus" className="py-24 px-5 sm:px-8" style={{ background: 'linear-gradient(180deg, transparent, rgba(14,165,233,0.03) 50%, transparent)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Notre processus</SectionLabel>
        <h2 className="section-title">Simple, transparent,<br /><GradientText>sans mauvaises surprises</GradientText></h2>
        <p className="section-sub">De l'idée à la mise en ligne, voici comment on travaille ensemble.</p>

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-white/[0.05] -translate-x-1/2" />

          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <div key={step.n} className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
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
