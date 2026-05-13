import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Est-ce légal de cumuler plusieurs parrainages ?',
    a: 'Oui, totalement légal. Les programmes de parrainage sont mis en place par les plateformes elles-mêmes pour acquérir de nouveaux clients. Il n\'y a aucune limite légale au nombre de parrainages que tu peux utiliser, tant que tu respectes les conditions de chaque offre (notamment ne pas avoir déjà eu un compte sur la plateforme).',
  },
  {
    q: 'Puis-je parrainer plusieurs personnes et cumuler les primes ?',
    a: 'Absolument. En tant que parrain, tu peux parrainer autant de personnes que tu veux. Plus tu parraines, plus tu gagnes. Certaines plateformes plafonnent le nombre de filleuls par an (ex: Fortuneo limite à 10 filleuls par an), mais c\'est précisé dans leurs CGU.',
  },
  {
    q: 'Que se passe-t-il si je ferme le compte après avoir reçu la prime ?',
    a: 'C\'est techniquement possible mais déconseillé. Certaines banques (notamment Boursorama) peuvent récupérer la prime si le compte est fermé dans les 12 mois suivant l\'ouverture. Lis bien les CGU de chaque offre. En général, attendre 6 à 12 mois est une bonne pratique.',
  },
  {
    q: 'Combien de temps faut-il attendre pour recevoir sa prime ?',
    a: 'Ça dépend de la plateforme. Pour les banques (Fortuneo, Hello bank!) : 2-3 mois après validation. Pour Trade Republic & Revolut : sous 30 jours. Pour OKX : progressivement selon l\'activité de trading.',
  },
  {
    q: 'Est-ce que je dois déclarer ces primes aux impôts ?',
    a: 'Les primes de parrainage bancaires sont considérées comme des avantages ponctuels et ne sont généralement pas imposables si leur montant total reste modéré. Au-delà de certains seuils ou en cas de parrainage massif "professionnel", une déclaration peut être nécessaire. Pour les cryptomonnaies, les plus-values sont soumises à la flat tax de 30%.',
  },
  {
    q: 'Que faire si le lien de parrainage ne fonctionne pas ?',
    a: 'Plusieurs causes possibles : (1) tu as déjà visité le site sans le lien, donc un cookie a été posé — essaie en navigation privée. (2) Le lien a expiré — demande un nouveau lien à ton parrain. (3) Tu as déjà eu un compte — même un ancien compte supprimé peut disqualifier. En cas de doute, contacte le service client de la plateforme et explique la situation.',
  },
  {
    q: 'Comment savoir si mon parrainage a bien été pris en compte ?',
    a: 'La plupart des plateformes confirment l\'attribution du parrainage par email ou dans l\'app. Pour les banques, vérifie dans l\'espace client la section "Parrainage" ou "Offres en cours". Le parrain reçoit aussi une notification quand son filleul s\'inscrit. Si rien n\'apparaît dans les 48h, contacte le support.',
  },
  {
    q: 'Peut-on faire un parrainage avec un membre de sa propre famille ?',
    a: 'Oui, sauf si les deux personnes vivent à la même adresse (certaines banques le refusent pour éviter les fraudes). En pratique, parrainer un frère/sœur ou parent majeur vivant ailleurs fonctionne parfaitement. Évite de créer de faux comptes au même nom/adresse, ce qui constitue une fraude.',
  },
  {
    q: 'Les offres de parrainage changent-elles souvent ?',
    a: 'Oui, très souvent ! Les montants peuvent varier d\'une semaine à l\'autre, surtout pour Revolut dont l\'offre est très dynamique. C\'est pour ça que ParrainBoost met à jour ses informations régulièrement. Avant de s\'inscrire, vérifie toujours le montant du bonus affiché sur la page d\'inscription (lié au code parrainage).',
  },
  {
    q: 'Est-ce qu\'il faut un compte bancaire existant pour s\'inscrire sur ces plateformes ?',
    a: 'Pour les banques en ligne (Fortuneo, Hello bank!), un RIB d\'une autre banque est souvent demandé pour effectuer un premier virement ou vérifier ton identité bancaire, mais aucun dépôt n\'est requis. Pour Revolut, aucun RIB n\'est nécessaire. Pour les exchanges crypto (OKX, Trade Republic), une pièce d\'identité suffit pour l\'inscription.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            ❓ Questions fréquentes
          </div>
          <h2 className="section-title">FAQ Parrainages</h2>
          <p className="section-sub mx-auto">Toutes les réponses aux questions que tu te poses avant de te lancer dans les parrainages.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border transition-all duration-300"
              style={{
                borderColor: open === i ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.06)',
                background: open === i ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm sm:text-base pr-4 leading-snug">{faq.q}</span>
                <span className="flex-shrink-0" style={{ color: open === i ? '#10b981' : '#475569' }}>
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 rounded-3xl border border-white/[0.05] bg-white/[0.02]">
          <p className="text-slate-400 text-sm mb-3">Tu as une question qui n'est pas listée ici ?</p>
          <a href="#newsletter"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)' }}>
            Inscris-toi aux alertes → on répond par email
          </a>
        </div>
      </div>
    </section>
  );
}
