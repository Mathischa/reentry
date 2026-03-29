import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const LINKS = {
  Services: ['Site Vitrine Essentiel', 'Site Vitrine Pro', 'SEO & Performance', 'Design & Identité', 'Maintenance'],
  Entreprise: ['Portfolio', 'Notre processus', 'Tarifs', 'FAQ'],
  Contact: ['mathis.chatillon@edu.ece.fr', '07 82 52 25 97', 'France & International', 'Devis gratuit'],
};

const SOCIALS = [
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Github, href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-8 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-4">
              <WebyraLogo size={34} />
              <span className="font-bold text-xl text-white tracking-tight">Webyra</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Agence web spécialisée dans la création de sites vitrines sur-mesure. Design premium, code propre, résultats mesurables.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href }) => (
                <a key={href + Icon.name} href={href}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7 border-t border-white/[0.05]">
          <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Webyra. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            {['Mentions légales', 'Politique de confidentialité', 'CGV'].map(l => (
              <a key={l} href="#" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function WebyraLogo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="fg1" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00c2ff" />
          <stop offset="1" stopColor="#1a4fd6" />
        </linearGradient>
        <linearGradient id="fg2" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path d="M 95 25 A 52 52 0 1 0 25 95" stroke="url(#fg1)" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.9"/>
      <path d="M 82 35 A 36 36 0 1 0 35 82" stroke="url(#fg1)" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M 68 46 A 20 20 0 1 0 46 68" stroke="url(#fg2)" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.95"/>
      <circle cx="60" cy="60" r="7" fill="url(#fg2)" />
    </svg>
  );
}
