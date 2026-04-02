import { useRef } from 'react';
import { useInView } from '../hooks';
import { Link2, UserCheck, Wallet, Gift } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <Link2 size={24} />,
    title: 'Récupère un lien de parrainage',
    desc: 'Demande un lien à un ami déjà client, ou trouve-en un sur ParrainBoost. Ce lien est OBLIGATOIRE — sans lui, la prime n\'est pas comptabilisée.',
    color: '#0ea5e9',
    tip: 'Ne passe jamais par le site directement sans le lien de parrainage.',
  },
  {
    num: '02',
    icon: <UserCheck size={24} />,
    title: 'Crée ton compte & valide ton identité',
    desc: 'Inscris-toi via le lien, remplis le formulaire et envoie tes documents (CNI + justificatif domicile). La vérification prend généralement 24 à 72h.',
    color: '#10b981',
    tip: 'Fais-le dès l\'inscription pour éviter les retards lors du retrait.',
  },
  {
    num: '03',
    icon: <Wallet size={24} />,
    title: 'Valide les conditions',
    desc: 'Selon la plateforme : commander une carte, faire 1 à 3 paiements, déposer un montant minimal, ou placer un pari. Chaque condition est détaillée dans nos tutoriels.',
    color: '#6366f1',
    tip: 'La plupart des banques ne demandent aucun dépôt — juste utiliser la carte.',
  },
  {
    num: '04',
    icon: <Gift size={24} />,
    title: 'Encaisse ta prime',
    desc: 'La prime est créditée automatiquement sur ton compte après validation. Pour les banques : 2 à 3 mois. Pour les paris : sous 7 à 72h selon l\'offre.',
    color: '#a855f7',
    tip: 'Tu peux retirer la prime directement par virement sans condition supplémentaire (sauf paris sportifs).',
  },
];

export function Process() {
  return (
    <section id="comment" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
            🚀 Simple & rapide
          </div>
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-sub mx-auto">En 4 étapes simples, tu peux encaisser des centaines d'euros de primes de parrainage. Voici comment.</p>
        </div>

        {/* Steps — vertical timeline on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%)] right-[calc(12.5%)] h-px"
            style={{ background: 'linear-gradient(90deg,#0ea5e9,#10b981,#6366f1,#a855f7)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => <StepCard key={i} step={s} index={i} />)}
          </div>
        </div>

        {/* Key rules banner */}
        <div className="mt-16 p-6 rounded-3xl border border-white/[0.06] bg-white/[0.02]">
          <h3 className="text-white font-bold text-lg mb-4 text-center">⚡ Règles d'or du parrainage</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔗', text: 'Toujours utiliser le lien de parrainage — jamais passer directement par le site' },
              { icon: '📄', text: 'Envoyer tes documents KYC dès l\'inscription pour éviter les blocages' },
              { icon: '⏰', text: 'Respecter les délais — la plupart des conditions doivent être remplies dans les 3 premiers mois' },
              { icon: '💳', text: 'Pour les banques : activer la carte ET faire les paiements requis' },
              { icon: '🚫', text: 'Ne pas avoir déjà eu un compte sur la plateforme (même ancien)' },
              { icon: '📧', text: 'Vérifier tes emails régulièrement — la banque peut demander des documents supplémentaires' },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-xl flex-shrink-0">{r.icon}</span>
                <p className="text-slate-400 text-sm leading-snug">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step: s, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [, inView] = useInView(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Number circle */}
      <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 relative"
        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white"
          style={{ background: s.color }}>
          {s.num}
        </div>
        <div style={{ color: s.color }}>{s.icon}</div>
      </div>

      <div className="text-center">
        <h3 className="text-white font-bold text-base mb-2 leading-snug">{s.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.desc}</p>
        <div className="inline-flex items-start gap-2 px-3 py-2 rounded-xl text-xs text-left"
          style={{ background: `${s.color}0d`, border: `1px solid ${s.color}20`, color: s.color }}>
          💡 {s.tip}
        </div>
      </div>
    </div>
  );
}
