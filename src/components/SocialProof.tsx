import { Star, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Thomas R.',
    avatar: 'T',
    color: '#00c07f',
    platform: 'Fortuneo',
    amount: '80 €',
    text: 'Reçu mes 80 € en 3 semaines nickel. Le tuto est clair, zéro prise de tête.',
  },
  {
    name: 'Julie D.',
    avatar: 'J',
    color: '#6366f1',
    platform: 'Trade Republic',
    amount: '10 €',
    text: 'Compte ouvert en 10 minutes, 10 € en actions crédités dès le 1er investissement. Simple et rapide.',
  },
  {
    name: 'Camille T.',
    avatar: 'C',
    color: '#f0b90b',
    platform: 'OKX',
    amount: '200 €',
    text: 'KYC validé en 5 min, bonus débloqué progressivement. Zéro friction, exactement comme décrit.',
  },
];

export function SocialProof() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Counter bar */}
        <div className="flex items-center justify-around gap-2 mb-10 px-2 py-4 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
          <Stat icon={<Users size={14} />} value="100+" label="parrainages" color="#10b981" />
          <div className="w-px h-7 bg-white/[0.07]" />
          <Stat icon={<TrendingUp size={14} />} value="330 €" label="max cumulable" color="#0ea5e9" />
          <div className="w-px h-7 bg-white/[0.07]" />
          <Stat icon={<ShieldCheck size={14} />} value="100%" label="vérifiés" color="#6366f1" />
          <div className="w-px h-7 bg-white/[0.07]" />
          <Stat icon={<Star size={14} />} value="4.9/5" label="satisfaction" color="#f0b90b" />
        </div>

        {/* Section title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            💬 Ils ont validé leur parrainage
          </div>
          <h2 className="text-xl font-black text-white">Ce qu'ils en disent</h2>
        </div>

        {/* Testimonials — vertical stack on mobile */}
        <div className="flex flex-col gap-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border p-4 flex gap-3 items-start"
              style={{ borderColor: `${t.color}20`, background: `${t.color}06` }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black"
                style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}
              >
                {t.avatar}
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs font-bold">{t.name}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: `${t.color}15`, color: t.color }}>{t.platform}</span>
                  </div>
                  <span className="font-black text-sm flex-shrink-0" style={{ color: t.color }}>{t.amount}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={10} fill="#f0b90b" stroke="none" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-400 text-xs leading-relaxed">"{t.text}"</p>
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
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex items-center gap-1" style={{ color }}>
        {icon}
        <span className="font-black text-white text-sm">{value}</span>
      </div>
      <span className="text-slate-500 text-[10px] leading-tight">{label}</span>
    </div>
  );
}
