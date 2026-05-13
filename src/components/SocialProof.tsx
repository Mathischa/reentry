const REVIEWS = [
  {
    name: 'Thomas R.',
    platform: 'Fortuneo',
    amount: '150€',
    text: 'Prime reçue en 6 semaines, zéro frais. Le code a bien fonctionné du premier coup.',
    color: '#00c07f',
  },
  {
    name: 'Léa M.',
    platform: 'Revolut',
    amount: '60€',
    text: 'Inscrite en 10 min, prime créditée sous 3 semaines. Parfait pour commencer.',
    color: '#7c3aed',
  },
  {
    name: 'Julien K.',
    platform: 'Trade Republic',
    amount: '30€',
    text: 'Action gratuite reçue rapidement après le premier dépôt. Simple et efficace.',
    color: '#6366f1',
  },
];

export function SocialProof() {
  return (
    <section className="pt-10 pb-2 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[10px] uppercase tracking-widest font-semibold text-[#4a3f32] mb-5">
          Ce que disent nos utilisateurs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-4"
              style={{
                borderRadius: 10,
                border: `1px solid ${r.color}18`,
                background: 'rgba(255,240,200,0.018)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill="#d4a843">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-[#7a6a55] text-xs leading-relaxed flex-1">"{r.text}"</p>

              <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div>
                  <p className="text-[#ede8df] text-xs font-semibold">{r.name}</p>
                  <p className="text-[9px] uppercase tracking-wider font-medium" style={{ color: r.color }}>{r.platform}</p>
                </div>
                <span
                  className="text-xs font-black"
                  style={{ color: r.color }}
                >
                  +{r.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
