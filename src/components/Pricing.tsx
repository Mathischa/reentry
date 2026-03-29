import { Check, Zap, ArrowRight } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';

const PLANS = [
  {
    name: 'Essentiel',
    price: 590,
    color: '#0ea5e9',
    desc: 'Idéal pour lancer votre présence en ligne rapidement et efficacement.',
    features: [
      'Site vitrine jusqu\'à 5 pages',
      'Design sur-mesure',
      'Mobile responsive',
      'Formulaire de contact',
      'SEO technique de base',
      'Livraison en 10 jours',
      '2 révisions incluses',
    ],
    cta: 'Choisir Essentiel',
    popular: false,
  },
  {
    name: 'Pro',
    price: 990,
    color: '#6366f1',
    desc: 'Pour les entreprises qui veulent un site performant, soigné et optimisé pour convertir.',
    features: [
      'Site vitrine jusqu\'à 12 pages',
      'Design premium + animations',
      'Mobile-first & performances',
      'SEO avancé + blog optionnel',
      'Google Analytics 4',
      'CMS pour gérer vos contenus',
      'Livraison en 21 jours',
      'Révisions illimitées',
      'Support 1 mois inclus',
    ],
    cta: 'Choisir Pro',
    popular: true,
  },
  {
    name: 'Sur-mesure',
    price: null,
    color: '#a855f7',
    desc: 'Besoin spécifique, projet complexe ou refonte complète ? On s\'adapte à votre situation.',
    features: [
      'Périmètre personnalisé',
      'Architecture et design dédiés',
      'Intégrations tierces (CRM, etc.)',
      'Fonctionnalités avancées',
      'Formation à la prise en main',
      'Contrat de maintenance dispo',
      'Accompagnement long terme',
    ],
    cta: 'Demander un devis',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Tarifs</SectionLabel>
        <h2 className="section-title">Des prix <GradientText>clairs et honnêtes</GradientText></h2>
        <p className="section-sub">Pas de frais cachés. Pas de surprise. Un investissement transparent pour un résultat durable.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 items-start">
          {PLANS.map(plan => (
            <div key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all ${plan.popular
                ? 'border-indigo-500/40 bg-indigo-500/[0.05] md:scale-[1.03]'
                : 'border-white/[0.07] bg-white/[0.02]'}`}
              style={plan.popular ? { boxShadow: '0 0 50px rgba(99,102,241,0.1)' } : {}}>

              {/* Top color line */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${plan.color}70, transparent)` }} />

              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                  <Zap size={11} /> Le plus populaire
                </div>
              )}

              <div className="mb-5">
                <h3 className="font-bold text-xl text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{plan.desc}</p>
              </div>

              <div className="mb-7">
                {plan.price ? (
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-white">{plan.price.toLocaleString('fr-FR')}€</span>
                    <span className="text-slate-600 text-sm mb-1.5">HT</span>
                  </div>
                ) : (
                  <p className="text-2xl font-black text-white">Sur devis</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
                style={plan.popular
                  ? { background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }
                  : { background: 'rgba(255,255,255,0.04)', color: 'white', border: '1px solid rgba(255,255,255,0.08)' }}>
                {plan.cta} <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 text-xs mt-10">
          Paiement en 2 fois disponible · Devis officiel et contrat systématiques · TVA en sus
        </p>
      </div>
    </section>
  );
}
