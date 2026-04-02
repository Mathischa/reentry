import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const LINKS = [
  { href: '#banques',    label: 'Banques'       },
  { href: '#paris',      label: 'Paris Sportifs' },
  { href: '#comment',    label: 'Comment ça marche' },
  { href: '#tutoriels',  label: 'Tutoriels'     },
  { href: '#comparatif', label: 'Comparatif'    },
  { href: '#faq',        label: 'FAQ'           },
];

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(7, 8, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Logo size={32} />
          <span className="font-extrabold text-lg tracking-tight text-white leading-none">
            Parrain<span style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Boost</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors whitespace-nowrap">{l.label}</a>
          ))}
        </div>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <a href="#comparatif" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)', boxShadow: '0 0 20px rgba(16,185,129,0.25)' }}>
            Voir les bonus
          </a>
          <button onClick={() => setOpen(v => !v)} className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-5 pb-5 space-y-1" style={{ background: 'rgba(7,8,15,0.97)' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all text-sm">
              {l.label}
            </a>
          ))}
          <a href="#comparatif" onClick={() => setOpen(false)}
            className="block mt-3 py-3 px-4 rounded-xl text-center text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)' }}>
            Voir les bonus
          </a>
        </div>
      )}
    </nav>
  );
}
