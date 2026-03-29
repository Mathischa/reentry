import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from './Logo';

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
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <Logo size={38} />
              <span className="font-extrabold text-xl tracking-tight text-white">Webyra</span>
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

