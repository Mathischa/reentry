import { useEffect, useRef, useState, useCallback } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);

  const exit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 680);
  }, [exiting, onComplete]);

  // Starfield — particles flying toward viewer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    type Star = { x: number; y: number; z: number; vz: number; r: number; hue: number };
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: (Math.random() - 0.5) * 2800,
      y: (Math.random() - 0.5) * 2800,
      z: Math.random() * 1400 + 100,
      vz: -(Math.random() * 2 + 0.4),
      r: Math.random() * 1.4 + 0.2,
      hue: Math.random() > 0.45 ? 237 : 270,
    }));

    const FOV = 500;
    let live = true;

    const tick = () => {
      if (!live) return;
      const { width: W, height: H } = canvas;
      ctx.fillStyle = 'rgba(7,7,15,0.15)';
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        s.z += s.vz;
        if (s.z < 1) {
          s.z = 1400;
          s.x = (Math.random() - 0.5) * 2800;
          s.y = (Math.random() - 0.5) * 2800;
        }
        const sc = FOV / (FOV + s.z);
        const px = W / 2 + s.x * sc;
        const py = H / 2 + s.y * sc;
        if (px < -20 || px > W + 20 || py < -20 || py > H + 20) continue;
        const alpha = Math.min(sc * 1.5, 0.95);
        const radius = Math.max(s.r * sc, 0.3);

        // Streak effect for fast stars
        if (sc > 0.6) {
          const prevSc = FOV / (FOV + s.z - s.vz * 8);
          const px0 = W / 2 + s.x * prevSc;
          const py0 = H / 2 + s.y * prevSc;
          ctx.beginPath();
          ctx.moveTo(px0, py0);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `hsla(${s.hue}, 75%, 80%, ${alpha * 0.4})`;
          ctx.lineWidth = radius;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 82%, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => { live = false; cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);

  // Animation phases
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 120),
      setTimeout(() => setPhase(2), 620),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1600),
    ];
    const exitT = setTimeout(exit, 3400);
    return () => { timers.forEach(clearTimeout); clearTimeout(exitT); };
  }, [exit]);

  const spring = (n: number, delay = '0s') => ({
    transition: `opacity 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay}, transform 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay}`,
    opacity: phase >= n ? 1 : 0,
    transform: phase >= n ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.82)',
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={exit}
      style={{
        background: '#07070f',
        transition: 'opacity 0.68s ease, transform 0.68s cubic-bezier(0.4,0,0.2,1)',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.06)' : 'scale(1)',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 3D orbital rings */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '540px' }}
      >
        <div className="splash-orbit">
          <div className="splash-ring sr1" />
          <div className="splash-ring sr2" />
          <div className="splash-ring sr3" />
          {/* Orbiting glows */}
          <div className="splash-node sn1" />
          <div className="splash-node sn2" />
        </div>
      </div>

      {/* Deep ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)',
          filter: 'blur(30px)',
          transition: 'opacity 1.2s ease',
          opacity: phase >= 1 ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6" onClick={e => e.stopPropagation()}>

        {/* Logo with glow halo */}
        <div className="relative" style={spring(1)}>
          <div
            className="absolute pointer-events-none"
            style={{
              inset: -40, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(165,180,252,0.28) 0%, transparent 60%)',
              filter: 'blur(14px)',
            }}
          />
          <svg viewBox="0 0 56 56" width="96" height="96" fill="none">
            <defs>
              <linearGradient id="sp-lg" x1="4" y1="4" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a5b4fc" />
                <stop offset="1" stopColor="#e879f9" />
              </linearGradient>
              <filter id="sp-glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g filter="url(#sp-glow)">
              <path d="M 37 12.4 A 18 18 0 1 1 19 12.4" stroke="url(#sp-lg)" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 12.4 16.6 L 19 12.4 L 17.6 6.2" stroke="url(#sp-lg)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="37" cy="12.4" r="5.2" fill="url(#sp-lg)" />
            </g>
          </svg>
        </div>

        {/* Title with gradient */}
        <div style={spring(2, '0.04s')}>
          <h1
            className="text-5xl sm:text-6xl font-bold tracking-tight leading-none"
            style={{
              background: 'linear-gradient(155deg, #f8fafc 15%, #a5b4fc 55%, #e879f9 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ReEntry
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="text-slate-600 text-sm sm:text-base tracking-wide"
          style={{ transition: 'opacity 0.65s ease', opacity: phase >= 3 ? 1 : 0 }}
        >
          Pick up exactly where you left off
        </p>

        {/* Loader dots */}
        <div
          className="flex gap-2 mt-2"
          style={{ transition: 'opacity 0.5s ease 0.15s', opacity: phase >= 4 ? 1 : 0 }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                animation: `sp-bounce 1.35s ease-in-out ${i * 0.21}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Skip hint */}
        <p
          className="text-slate-800 text-[11px] tracking-widest uppercase mt-3"
          style={{ transition: 'opacity 0.5s ease 0.6s', opacity: phase >= 4 ? 1 : 0 }}
        >
          tap to continue
        </p>
      </div>
    </div>
  );
}
