import { Star, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Thomas R.',
    handle: '@thomasr',
    avatar: 'T',
    color: '#10b981',
    platform: 'Fortuneo + Betclic',
    amount: '120 €',
    text: 'Reçu mes 80 € Fortuneo en 3 semaines nickel. Le tuto est clair, zéro prise de tête.',
  },
  {
    name: 'Sarah M.',
    handle: '@sarahm',
    avatar: 'S',
    color: '#0ea5e9',
    platform: 'Winamax + OKX',
    amount: '220 €',
    text: 'J\'avais jamais fait de parrainage avant. Le guide pas à pas m\'a sauvé la mise, tout validé.',
  },
  {
    name: 'Kévin L.',
    handle: '@kevinl',
    avatar: 'K',
    color: '#6366f1',
    platform: 'Trade Republic',
    amount: '10 €',
    text: 'Rapide et simple. 10 min pour créer le compte, les actions sont arrivées direct.',
  },
  {
    name: 'Julie D.',
    handle: '@julied',
    avatar: 'J',
    color: '#f0b90b',
    platform: 'Betclic + Unibet',
    amount: '70 €',
    text: 'Les codes sont bien en évidence, pas besoin de chercher. Copié-collé et c\'est parti.',
  },
  {
    name: 'Alexis B.',
    handle: '@alexisb',
    avatar: 'A',
    color: '#e8001c',
    platform: 'Fortuneo + Revolut',
    amount: '160 €',
    text: 'Je recommande à tous mes amis directement depuis le site. Les liens marchent parfaitement.',
  },
  {
    name: 'Camille T.',
    handle: '@camilleT',
    avatar: 'C',
    color: '#d97706',
    platform: 'Winamax',
    amount: '20 €',
    text: 'Bonus crédité le lendemain du dépôt. Site de confiance, les infos sont toujours à jour.',
  },
];

export function SocialProof() {
  return (
    <section className="py-16 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Counter bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-14">
          <Stat icon={<Users size={16} />} value="100+" label="parrainages validés" color="#10b981" />
          <div className="w-px h-8 bg-white/[0.07] hidden sm:block" />
          <Stat icon={<TrendingUp size={16} />} value="430 €" label="max cumulable" color="#0ea5e9" />
          <div className="w-px h-8 bg-white/[0.07] hidden sm:block" />
          <Stat icon={<ShieldCheck size={16} />} value="100 %" label="offres vérifiées" color="#6366f1" />
          <div className="w-px h-8 bg-white/[0.07] hidden sm:block" />
          <Stat icon={<Star size={16} />} value="4.9 / 5" label="satisfaction" color="#f0b90b" />
        </div>

        {/* Section title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            💬 Ils ont validé leur parrainage
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Ce qu'ils en disent</h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border p-5 flex flex-col gap-3"
              style={{ borderColor: `${t.color}20`, background: `${t.color}06` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={12} fill="#f0b90b" stroke="none" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.text}"</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: `${t.color}25`, color: t.color, border: `1px solid ${t.color}30` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">{t.name}</p>
                    <p className="text-slate-600 text-[10px]">{t.handle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm" style={{ color: t.color }}>{t.amount}</p>
                  <p className="text-slate-600 text-[10px]">{t.platform}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Stat({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
        {icon}
      </div>
      <div>
        <p className="font-black text-white text-lg leading-tight">{value}</p>
        <p className="text-slate-500 text-xs">{label}</p>
      </div>
    </div>
  );
}
