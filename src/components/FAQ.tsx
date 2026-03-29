import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';

const FAQS = [
  { q: "Combien de temps pour livrer mon site ?", a: "Un site vitrine standard est livré en 2 à 3 semaines. Un projet e-commerce ou application web prend 4 à 8 semaines selon la complexité. On vous donne une date ferme dès la signature." },
  { q: "Je n'ai pas de logo ni de charte graphique, c'est un problème ?", a: "Pas du tout. On peut créer votre identité visuelle complète (logo, couleurs, typographies) avant de démarrer le site. On vous conseille aussi sur des options simples et efficaces." },
  { q: "Que se passe-t-il après la livraison ?", a: "On vous forme à la gestion de votre site (30 min). Vous recevez tous les accès. On reste disponibles pendant 1 à 3 mois selon le pack. Un contrat de maintenance est disponible en option." },
  { q: "Puis-je modifier le site moi-même après livraison ?", a: "Oui, si un CMS est intégré (WordPress, Sanity...), vous pouvez modifier textes et images sans coder. Pour les projets React/Next.js, on vous fournit la documentation et reste disponible." },
  { q: "Vous travaillez avec quel type de clients ?", a: "PME, startups, artisans, associations, indépendants. Du restaurant local à la startup tech. Notre point commun : des clients qui veulent un résultat sérieux." },
  { q: "Comment se passe le paiement ?", a: "30% à la signature, 40% à la validation des maquettes, 30% à la livraison. Virement ou carte bancaire. Devis officiel et contrat systématiques." },
  { q: "Mon site sera-t-il bien référencé sur Google ?", a: "Le SEO technique est inclus dans tous nos projets (balises, vitesse, structure, sitemap). Pour une stratégie SEO complète (contenu, backlinks), on propose un accompagnement mensuel dédié." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="section-title">Questions <GradientText>fréquentes</GradientText></h2>
        <div className="mt-10 space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className={`rounded-2xl border transition-all duration-200 ${open === i ? 'border-sky-500/25 bg-sky-500/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'}`}>
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-semibold text-sm sm:text-base transition-colors ${open === i ? 'text-white' : 'text-slate-300'}`}>{faq.q}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all" style={{ background: open === i ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'rgba(255,255,255,0.05)' }}>
                  {open === i ? <Minus size={12} className="text-white" /> : <Plus size={12} className="text-slate-400" />}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
