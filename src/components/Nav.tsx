import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#processus', label: 'Processus' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#contact', label: 'Contact' },
];

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={scrolled ? { background: 'rgba(7,8,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <WebyraLogo size={38} />
          <span className="font-bold text-xl tracking-tight text-white">Webyra</span>
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

function WebyraLogo({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="wg1" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00c2ff" />
          <stop offset="1" stopColor="#1a4fd6" />
        </linearGradient>
        <linearGradient id="wg2" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {/* Outer arc */}
      <path d="M 95 25 A 52 52 0 1 0 25 95" stroke="url(#wg1)" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.9"/>
      {/* Middle arc */}
      <path d="M 82 35 A 36 36 0 1 0 35 82" stroke="url(#wg1)" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.7"/>
      {/* Inner arc */}
      <path d="M 68 46 A 20 20 0 1 0 46 68" stroke="url(#wg2)" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.95"/>
      {/* Center dot */}
      <circle cx="60" cy="60" r="7" fill="url(#wg2)" />
    </svg>
  );
}
