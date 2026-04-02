import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';

type Phase = 'warp' | 'settle' | 'hold' | 'out';

export function Splash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('warp');
  const phaseRef = useRef<Phase>('warp');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setP = (p: Phase) => { setPhase(p); phaseRef.current = p; };

  useEffect(() => {
    const t1 = setTimeout(() => setP('settle'), 1000);
    const t2 = setTimeout(() => setP('hold'),   1700);
    const t3 = setTimeout(() => setP('out'),    2800);
    const t4 = setTimeout(() => onDone(),       3600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  // Warp-speed starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 550;
    const stars = Array.from({ length: N }, () => {
      const z = Math.random();
      return { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z, pz: z };
    });

    let id: number;
    const tick = () => {
      const { width: w, height: h } = canvas;
      const cx = w / 2, cy = h / 2;
      const p = phaseRef.current;
      const speed = p === 'warp' ? 0.030 : p === 'settle' ? 0.008 : p === 'hold' ? 0.0018 : 0.009;
      const trail = p === 'warp' ? 'rgba(7,8,15,0.16)' : 'rgba(7,8,15,0.28)';

      ctx.fillStyle = trail;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0) { s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2; s.z = 1; s.pz = 1; }

        const sx = (s.x / s.z) * cx + cx;
        const sy = (s.y / s.z) * cy + cy;
        const px = (s.x / s.pz) * cx + cx;
        const py = (s.y / s.pz) * cy + cy;

        const brightness = 1 - s.z;
        const size = Math.max(0.3, brightness * 2.6);
        const alpha = Math.min(1, brightness * 1.9);
        const r = Math.round(100 + 155 * brightness);
        const g = Math.round(155 + 100 * brightness);

        ctx.strokeStyle = `rgba(${r},${g},255,${alpha})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      id = requestAnimationFrame(tick);
    };
    tick();

    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#07080f',
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'out' ? 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
        pointerEvents: phase === 'out' ? 'none' : 'all',
      }}
    >
      {/* Starfield canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Nebula blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{
          top: '5%', left: '5%', width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
        <div className="absolute" style={{
          bottom: '5%', right: '5%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
        <div className="absolute" style={{
          top: '35%', right: '15%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Tron perspective grid — bottom */}
      <div className="absolute bottom-0 inset-x-0 h-64 pointer-events-none overflow-hidden"
        style={{ perspective: '300px', perspectiveOrigin: '50% 0%' }}>
        <div style={{
          position: 'absolute', inset: 0,
          transform: 'rotateX(75deg) translateZ(-20px)',
          backgroundImage:
            'linear-gradient(rgba(14,165,233,0.10) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(14,165,233,0.10) 1px, transparent 1px)',
          backgroundSize: '55px 55px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 100%)',
        }} />
      </div>

      {/* Scan line sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.04 }}>
        <div className="w-full"
          style={{
            height: 3,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)',
            animation: 'scan-line 3.5s linear infinite',
          }}
        />
      </div>

      {/* 3D rings + logo */}
      <div className="relative z-10" style={{ perspective: '700px', perspectiveOrigin: '50% 50%' }}>
        <div className="relative flex items-center justify-center" style={{ width: 210, height: 210 }}>

          {/* Large ambient glow */}
          <div className="absolute rounded-full pointer-events-none" style={{
            width: 260, height: 260,
            background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 65%)',
            animation: 'halo-pulse 2.2s ease-in-out infinite',
          }} />

          {/* Outer ring */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'ring-y 3.8s linear infinite' }}>
            <svg width="210" height="210" viewBox="0 0 210 210" fill="none">
              <circle cx="105" cy="105" r="92" stroke="url(#rs1)" strokeWidth="1.5" strokeDasharray="14 8" opacity="0.45" />
              <defs>
                <linearGradient id="rs1" x1="0" y1="0" x2="210" y2="210" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00c2ff"/><stop offset="1" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Middle ring */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'ring-x 2.8s linear infinite reverse' }}>
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              <circle cx="80" cy="80" r="68" stroke="url(#rs2)" strokeWidth="1.5" strokeDasharray="20 6" opacity="0.55" />
              <defs>
                <linearGradient id="rs2" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0ea5e9"/><stop offset="1" stopColor="#a855f7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Inner ring */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'ring-z 1.9s linear infinite' }}>
            <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
              <circle cx="56" cy="56" r="46" stroke="url(#rs3)" strokeWidth="1.5" strokeDasharray="8 10" opacity="0.7" />
              <defs>
                <linearGradient id="rs3" x1="0" y1="0" x2="112" y2="112" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00c2ff"/><stop offset="1" stopColor="#1a4fd6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Halo */}
          <div className="absolute rounded-full" style={{
            width: 155, height: 155,
            background: 'radial-gradient(circle, rgba(14,165,233,0.20) 0%, transparent 70%)',
            animation: 'halo-pulse 1.6s ease-in-out infinite',
          }} />

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ animation: 'logo-in 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.3s both' }}>
            <Logo size={118} />
          </div>
        </div>
      </div>

      {/* Brand + tagline */}
      <div style={{ animation: 'text-in 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.7s both' }}
        className="mt-10 flex flex-col items-center gap-2 relative z-10">
        <span className="text-white font-extrabold text-3xl tracking-tight splash-glitch">
          Parrain<span style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Boost</span>
        </span>
        <span className="text-slate-600 text-[11px] tracking-[0.38em] uppercase font-medium">Guide Parrainages</span>
      </div>

      {/* Loading bar */}
      <div className="mt-10 w-44 h-px bg-white/[0.05] rounded-full overflow-hidden relative z-10">
        <div className="h-full rounded-full" style={{
          background: 'linear-gradient(90deg, #0ea5e9, #6366f1, #a855f7)',
          animation: 'load-bar 2.8s cubic-bezier(0.4,0,0.2,1) 0.2s both',
          boxShadow: '0 0 12px rgba(14,165,233,0.7), 0 0 24px rgba(99,102,241,0.4)',
        }} />
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-10 text-slate-700 text-[9px] tracking-[0.35em] uppercase font-mono z-10"
        style={{ animation: 'text-in 0.5s ease-out 1.2s both' }}>
        Initializing systems...
      </div>
    </div>
  );
}
