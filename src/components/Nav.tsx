import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import gsap from 'gsap';

const LINKS = [
  { href: '#banques',    label: 'Banques'    },
  { href: '#crypto',     label: 'Crypto'     },
  { href: '#autres',     label: 'Autres apps'},
  { href: '#comparatif', label: 'Comparatif' },
  { href: '#faq',        label: 'FAQ'        },
];

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mobileRef.current; if (!el) return;
    if (open) {
      gsap.fromTo(el,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
      );
      gsap.fromTo(el.querySelectorAll('a, button'),
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.035, ease: 'power2.out', delay: 0.05 }
      );
    }
  }, [open]);

  /* Close on resize to desktop */
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(7,8,15,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      } : {}}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-4" style={{ height: '60px' }}>

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <Logo size={30} />
          <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none">
            Parrain<span style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Boost</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="relative text-sm text-slate-400 hover:text-white transition-colors whitespace-nowrap group">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA + burger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a href="#banques"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.04] active:scale-95 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', boxShadow: '0 0 20px rgba(16,185,129,0.25)' }}>
            Voir les bonus
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.07] transition-all"
            aria-label="Menu">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div ref={mobileRef} className="lg:hidden px-4 pb-5 pt-2 space-y-1"
          style={{ background: 'rgba(7,8,15,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center py-3 px-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href="#banques" onClick={() => setOpen(false)}
            className="flex items-center justify-center mt-3 py-3.5 px-4 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}>
            Voir les bonus
          </a>
        </div>
      )}
    </nav>
  );
}
