import { useEffect, useState } from 'react';
import { Logo } from './Logo';

export function Splash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('out'), 2200);
    const t3 = setTimeout(() => onDone(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: '#07080f',
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'out' ? 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
        pointerEvents: phase === 'out' ? 'none' : 'all',
      }}
    >
      {/* 3D Scene */}
      <div style={{ perspective: '700px', perspectiveOrigin: '50% 50%' }}>
        <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>

          {/* Outer ring — rotates on Y axis */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'ring-y 3s linear infinite' }}>
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="78" stroke="url(#s1)" strokeWidth="2.5" strokeDasharray="12 8" opacity="0.5" />
              <defs>
                <linearGradient id="s1" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00c2ff" /><stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Middle ring — rotates on X axis */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'ring-x 2.4s linear infinite reverse' }}>
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="58" stroke="url(#s2)" strokeWidth="2" strokeDasharray="18 6" opacity="0.6" />
              <defs>
                <linearGradient id="s2" x1="0" y1="0" x2="140" y2="140" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0ea5e9" /><stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Inner ring — rotates on Z axis */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'ring-z 1.8s linear infinite' }}>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="38" stroke="url(#s3)" strokeWidth="2" strokeDasharray="8 10" opacity="0.7" />
              <defs>
                <linearGradient id="s3" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00c2ff" /><stop offset="1" stopColor="#1a4fd6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Glow halo */}
          <div className="absolute rounded-full" style={{
            width: 140, height: 140,
            background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)',
            animation: 'halo-pulse 1.6s ease-in-out infinite',
          }} />

          {/* Real logo — transparent background, scale-in */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'logo-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both' }}>
            <Logo height={110} />
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ animation: 'text-in 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.5s both' }} className="mt-10 flex flex-col items-center gap-1">
        <span className="text-slate-500 text-xs tracking-[0.35em] uppercase font-medium">Agence Web</span>
      </div>

      {/* Loading bar */}
      <div className="mt-10 w-36 h-px bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{
          background: 'linear-gradient(90deg, #0ea5e9, #6366f1)',
          animation: 'load-bar 2s cubic-bezier(0.4,0,0.2,1) 0.2s both',
          boxShadow: '0 0 8px rgba(14,165,233,0.6)',
        }} />
      </div>
    </div>
  );
}
