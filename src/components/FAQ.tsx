import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Est-ce légal de cumuler plusieurs parrainages ?',
    a: 'Oui, totalement légal. Les programmes de parrainage sont mis en place par les plateformes elles-mêmes pour acquérir de nouveaux clients. Il n\'y a aucune limite légale au nombre de parrainages que tu peux utiliser, tant que tu respectes les conditions de chaque offre.',
  },
  {
    q: 'Puis-je parrainer plusieurs personnes et cumuler les primes parrain ?',
    a: 'Absolument. Tu peux parrainer autant de personnes que tu veux. Certaines plateformes plafonnent le nombre de filleuls par an (ex : Fortuneo limite à 10 filleuls), mais c\'est précisé dans leurs CGU.',
  },
  {
    q: 'Que se passe-t-il si je ferme le compte après avoir reçu la prime ?',
    a: 'Techniquement possible mais déconseillé. Certaines banques peuvent récupérer la prime si le compte est fermé dans les 12 mois suivant l\'ouverture. Lis les CGU de chaque offre. En général, attendre 6 à 12 mois est une bonne pratique.',
  },
  {
    q: 'Combien de temps faut-il attendre pour recevoir sa prime ?',
    a: 'Ça dépend de la plateforme. Pour Fortuneo et Hello bank! : 2–3 mois après validation. Pour Revolut et Trade Republic : sous 30 jours. Pour OKX : progressivement selon l\'activité de trading.',
  },
  {
    q: 'Est-ce que je dois déclarer ces primes aux impôts ?',
    a: 'Les primes bancaires sont généralement des avantages ponctuels non imposables si leur montant reste modéré. Pour les cryptomonnaies, les plus-values sont soumises à la flat tax de 30%. En cas de doute, consultez un conseiller fiscal.',
  },
  {
    q: 'Que faire si le lien de parrainage ne fonctionne pas ?',
    a: 'Plusieurs causes possibles : (1) tu as déjà visité le site sans le lien — essaie en navigation privée. (2) Le lien a expiré. (3) Tu as déjà eu un compte — même un ancien compte supprimé peut disqualifier. En cas de doute, contacte le support de la plateforme.',
  },
  {
    q: 'Peut-on faire un parrainage avec un membre de sa propre famille ?',
    a: 'Oui, sauf si les deux personnes vivent à la même adresse (certaines banques le refusent pour éviter les fraudes). En pratique, parrainer un frère/sœur ou parent majeur vivant ailleurs fonctionne parfaitement.',
  },
  {
    q: 'Les offres changent-elles souvent ?',
    a: 'Oui, très souvent — surtout pour Revolut dont l\'offre est très dynamique. Avant de s\'inscrire, vérifie toujours le montant affiché sur la page d\'inscription liée au code parrain.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 px-5 sm:px-8" style={{ borderTop: '1px solid rgba(212,168,67,0.06)' }}>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-14">
          <div className="section-label">Questions fréquentes</div>
          <h2 className="section-title">Tout ce que vous voulez savoir</h2>
          <p className="section-sub mx-auto">Avant de vous lancer dans les parrainages.</p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: 10,
                  border: `1px solid ${isOpen ? 'rgba(212,168,67,0.2)' : 'rgba(212,168,67,0.07)'}`,
                  background: isOpen ? 'rgba(212,168,67,0.04)' : 'rgba(255,240,200,0.015)',
                  transition: 'border-color 0.25s, background 0.25s',
                }}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-semibold text-[#f5ede0] text-sm sm:text-base leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 mt-0.5 transition-transform duration-300"
                    style={{ color: isOpen ? '#d4a843' : '#4a3f32', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  />
                </button>

                <div style={{
                  maxHeight: isOpen ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <p className="px-6 pb-5 text-[#7a6a55] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
