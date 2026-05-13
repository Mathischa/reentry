import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Mes parrainages', href: '#parrainages' },
  { label: 'Comparatif', href: '#comparatif' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Alertes', href: '#contact' },
];

const PLATFORMS_LIST = ['Fortuneo', 'Hello bank!', 'Revolut', 'OKX', 'Trade Republic', 'Robinhood'];

export function Footer() {
  return (
    <footer className="px-5 sm:px-8 pb-10" style={{ borderTop: '1px solid rgba(212,168,67,0.08)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Main footer grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 py-14">

          {/* Brand — col-span-2 on sm */}
          <div className="col-span-2 sm:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <Logo size={30} />
              <span className="font-bold text-lg tracking-tight" style={{ color: '#f5ede0' }}>
                Parrain<span style={{ background: 'linear-gradient(120deg,#f0b54a,#d4893a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Boost</span>
              </span>
            </a>
            <p className="text-[#5a4d3e] text-sm leading-relaxed max-w-xs mb-5">
              Guide indépendant des meilleures offres de parrainage — banques, crypto et apps. Codes et liens vérifiés directement sur les sites officiels.
            </p>
            <div className="flex items-start gap-2 p-3.5" style={{ borderRadius: 8, border: '1px solid rgba(212,168,67,0.1)', background: 'rgba(212,168,67,0.04)' }}>
              <span className="text-[#d4a843] text-xs leading-none mt-0.5">⚠</span>
              <p className="text-[#5a4d3e] text-xs leading-relaxed">
                Les montants peuvent changer à tout moment. Vérifiez toujours sur le site officiel de chaque plateforme.
              </p>
            </div>
          </div>

          {/* Plateformes */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d4a843] mb-4">Plateformes</p>
            <ul className="space-y-2.5">
              {PLATFORMS_LIST.map(p => (
                <li key={p}>
                  <a href="#parrainages" className="text-[#5a4d3e] text-sm hover:text-[#f5ede0] transition-colors">{p}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d4a843] mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-[#5a4d3e] text-sm hover:text-[#f5ede0] transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d4a843] mb-4">Contact</p>
              <a href="https://www.tiktok.com/@parrainboost" target="_blank" rel="noopener noreferrer"
                className="text-[#5a4d3e] text-sm hover:text-[#f5ede0] transition-colors flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/></svg>
                @parrainboost
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-5" style={{ borderTop: '1px solid rgba(212,168,67,0.06)' }}>
          <p className="text-[#3a3028] text-xs">© {new Date().getFullYear()} ParrainBoost · Site indépendant, non affilié aux plateformes mentionnées.</p>
          <p className="text-[#3a3028] text-xs">Données vérifiées Avril 2026</p>
        </div>

      </div>
    </footer>
  );
}
