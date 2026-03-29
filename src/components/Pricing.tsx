import { Check, ArrowRight } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';

const FEATURES = [
  'Site vitrine jusqu\'à 8 pages',
  'Design sur-mesure et moderne',
  'Mobile responsive & rapide',
  'Formulaire de contact intégré',
  'SEO technique de base',
  'Nom de domaine + hébergement conseillés',
  'Livraison en 14 jours',
  'Révisions incluses',
];

export function Pricing() {
  return (
    <section id="tarifs" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Tarifs</SectionLabel>
        <h2 className="section-title">Un prix <GradientText>clair et honnête</GradientText></h2>
        <p className="section-sub">Pas de frais cachés. Pas de surprise. Un investissement transparent pour un résultat durable.</p>

        <div className="flex justify-center mt-14">
          <div className="relative rounded-2xl p-10 border border-sky-500/30 bg-sky-500/[0.04] max-w-md w-full"
            style={{ boxShadow: '0 0 60px rgba(14,165,233,0.08)' }}>

            {/* Top color line */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, transparent, #0ea5e970, transparent)' }} />

            <div className="mb-6">
              <h3 className="font-bold text-2xl text-white mb-2">Site Vitrine</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Tout ce qu'il faut pour lancer votre présence en ligne avec un site professionnel, soigné et performant.</p>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-white">700€</span>
                <span className="text-slate-600 text-sm mb-2">HT</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">Paiement en 2 fois disponible</p>
            </div>

            <ul className="space-y-3 mb-9">
              {FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check size={14} className="flex-shrink-0 mt-0.5 text-sky-400" />
                  {f}
                </li>
              ))}
            </ul>

            <a href="#contact"
              className="flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 text-white"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 24px rgba(14,165,233,0.3)' }}>
              Démarrer mon projet <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-10">
          Devis officiel et contrat systématiques · TVA en sus
        </p>
      </div>
    </section>
  );
}
