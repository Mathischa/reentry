import { Logo } from './Logo';

const LINKS = {
  Parrainages: ['Fortuneo', 'Hello bank!', 'Revolut', 'OKX', 'Trade Republic', 'Robinhood'],
  Navigation: ['Comparatif', 'FAQ'],
  Légal: ['Mentions légales', 'Politique de confidentialité'],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-8 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <Logo size={34} />
              <span className="font-bold text-xl tracking-tight" style={{ color: '#f5ede0' }}>
                Parrain<span style={{ background: 'linear-gradient(120deg,#f0b54a,#d4893a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Boost</span>
              </span>
            </a>
            <p className="text-[#7a6a55] text-sm leading-relaxed mb-4">
              Guide des meilleures offres de parrainage bancaires, crypto et apps en France. Conditions et alertes bonus.
            </p>
            <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.05]">
              <p className="text-amber-500/70 text-xs leading-relaxed">
                ⚠️ Les montants des offres de parrainage sont susceptibles de changer à tout moment. Vérifiez toujours les conditions sur le site officiel de chaque plateforme.
              </p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-[#d4a843] font-semibold text-xs uppercase tracking-wider mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[#7a6a55] text-sm hover:text-[#f5ede0] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.05]">
          <p className="text-[#4a3f32] text-xs">© {new Date().getFullYear()} ParrainBoost · Site indépendant, non affilié aux plateformes mentionnées.</p>
          <p className="text-[#3a3028] text-xs">Offres susceptibles de changer — vérifiez toujours sur le site officiel.</p>
        </div>
      </div>
    </footer>
  );
}
