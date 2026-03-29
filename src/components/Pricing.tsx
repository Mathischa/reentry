import { Check, Zap } from 'lucide-react';
import { useState } from 'react';
import { SectionLabel, GradientText } from './Services';

const PLANS = [
  {
    name: 'Starter', color: '#0ea5e9', monthly: 990, yearly: 792,
    desc: 'Pour les indépendants et petites structures.',
    features: ['Site vitrine 5 pages', 'Design sur-mesure', 'Mobile responsive', 'SEO de base', 'Formulaire de contact', 'Livraison en 2 semaines', '1 révision'],
    cta: 'Choisir Starter',
    popular: false,
  },
  {
    name: 'Pro', color: '#6366f1', monthly: 2490, yearly: 1990, popular: true,
    desc: 'Pour les PME qui veulent performer en ligne.',
    features: ["Jusqu'à 15 pages", 'Design premium + animations', 'SEO avancé + blog', 'Google Analytics', 'Intégration CRM', 'Livraison en 3 semaines', 'Révisions illimitées', 'Support 3 mois'],
    cta: 'Choisir Pro',
  },
  {
    name: 'Sur-mesure', color: '#a855f7', monthly: null, yearly: null,
    desc: 'E-commerce, SaaS, application web complexe.',
    features: ['Périmètre illimité', 'Architecture scalable', 'Authentification & rôles', 'API & intégrations', 'Dashboard admin', 'Tests & CI/CD', 'Support dédié'],
    cta: 'Demander un devis',
    popular: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="tarifs" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Tarifs</SectionLabel>
        <h2 className="section-title">Transparent,<br /><GradientText>sans mauvaises surprises</GradientText></h2>
        <p className="section-sub">Des tarifs fixes. Pas de frais cachés. Pas de surprise en fin de projet.</p>

        {/* Toggle */}
        <div className="flex items-center gap-4 mt-8">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-slate-500'}`}>Au projet</span>
          <button
            onClick={() => setAnnual(v => !v)}
            className={`relative w-12 h-6 rounded-full transition-all ${annual ? 'bg-indigo-500' : 'bg-white/[0.1]'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${annual ? 'left-7' : 'left-1'}`} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-slate-500'}`}>Maintenance annuelle <span className="text-emerald-400 text-xs font-semibold">-20%</span></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {PLANS.map(plan => (
            <div key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all ${plan.popular ? 'border-indigo-500/50 bg-indigo-500/[0.05]' : 'border-white/[0.07] bg-white/[0.02]'}`}
              style={plan.popular ? { boxShadow: '0 0 40px rgba(99,102,241,0.12)' } : {}}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                  <Zap size={11} /> Le plus populaire
                </div>
              )}
              <div className="mb-5">
                <h3 className="font-bold text-xl text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.desc}</p>
              </div>
              <div className="mb-7">
                {plan.monthly ? (
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-white">{(annual ? plan.yearly : plan.monthly)?.toLocaleString('fr-FR')}€</span>
                    <span className="text-slate-600 text-sm mb-1.5">{annual ? '/an' : ' HT'}</span>
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
                className="block text-center py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
                style={plan.popular
                  ? { background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }
                  : { background: 'rgba(255,255,255,0.04)', color: 'white', border: '1px solid rgba(255,255,255,0.08)' }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
