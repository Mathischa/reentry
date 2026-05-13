import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import gsap from 'gsap';

const LINKS = [
  { href: '#parrainages', label: 'Mes parrainages' },
  { href: '#comparatif',  label: 'Comparatif'      },
  { href: '#faq',         label: 'FAQ'             },
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
        background: 'rgba(14,11,8,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212,168,67,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      } : {}}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-4" style={{ height: '60px' }}>

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <Logo size={30} />
          <span className="font-bold text-base sm:text-lg tracking-tight leading-none" style={{ color: '#f5ede0' }}>
            Parrain<span style={{ background: 'linear-gradient(120deg,#f0b54a,#d4893a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Boost</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="relative text-sm text-[#7a6a55] hover:text-[#f5ede0] transition-colors whitespace-nowrap group font-medium">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA + burger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a href="#parrainages"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0e0b08] transition-all hover:scale-[1.03] active:scale-95 whitespace-nowrap"
            style={{ borderRadius: 8, background: 'linear-gradient(120deg,#f0b54a,#d4893a)', boxShadow: '0 2px 16px rgba(212,168,67,0.25)' }}>
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
          style={{ background: 'rgba(14,11,8,0.97)', borderTop: '1px solid rgba(212,168,67,0.08)' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center py-3 px-4 text-[#7a6a55] hover:text-[#f5ede0] hover:bg-white/[0.04] transition-all text-sm font-medium" style={{ borderRadius: 8 }}>
              {l.label}
            </a>
          ))}
          <a href="#parrainages" onClick={() => setOpen(false)}
            className="flex items-center justify-center mt-3 py-3 px-4 text-sm font-bold text-[#0e0b08] transition-all active:scale-95"
            style={{ borderRadius: 8, background: 'linear-gradient(120deg,#f0b54a,#d4893a)', boxShadow: '0 4px 16px rgba(212,168,67,0.3)' }}>
            Voir les bonus
          </a>
        </div>
      )}
    </nav>
  );
}
