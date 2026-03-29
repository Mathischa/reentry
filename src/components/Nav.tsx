import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const LINKS = [
  { href: '#services',  label: 'Services'  },
  { href: '#processus', label: 'Processus' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#tarifs',    label: 'Tarifs'    },
  { href: '#contact',   label: 'Contact'   },
];

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(7, 8, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      } : {}}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Logo size={34} />
          <span className="font-extrabold text-lg tracking-tight text-white leading-none">Webyra</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 0 20px rgba(14,165,233,0.25)' }}>
            Démarrer un projet
          </a>
          <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-5 pb-5 space-y-1" style={{ background: 'rgba(7,8,15,0.97)' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 px-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all text-sm">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            className="block mt-3 py-3 px-4 rounded-xl text-center text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}>
            Démarrer un projet
          </a>
        </div>
      )}
    </nav>
  );
}

