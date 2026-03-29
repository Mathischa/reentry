import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const glitchEffect = () => {
      // Random glitch
      if (Math.random() < 0.15) {
        const duration = Math.random() * 0.3 + 0.1;
        const offset = Math.random() * 10 - 5;

        gsap.to(element, {
          x: offset,
          duration: duration * 0.5,
          repeat: 1,
          yoyo: true,
        });

        // RGB shift
        gsap.to(element, {
          '--glitch-offset': Math.random() * 4 + 'px',
          duration: duration * 0.6,
        } as any);
      }
    };

    const interval = setInterval(glitchEffect, Math.random() * 3000 + 2000);

    // Hover trigger
    const onMouseEnter = () => {
      gsap.to(element, {
        '--glitch-offset': '8px',
        duration: 0.1,
      } as any);
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        '--glitch-offset': '0px',
        duration: 0.3,
      } as any);
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearInterval(interval);
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={className}
      style={{
        '--glitch-offset': '0px',
        textShadow: `
          var(--glitch-offset) 0 #ff00de,
          calc(var(--glitch-offset) * -1) 0 #00ffff,
          0 0 10px rgba(14, 165, 233, 0.5)
        `,
        position: 'relative',
        willChange: 'transform, text-shadow',
      } as React.CSSProperties}
    >
      {text}

      <style>{`
        @keyframes glitch {
          0%, 100% { clip-path: inset(0); }
          20% { clip-path: inset(10% 0 60% 0); }
          40% { clip-path: inset(40% 0 20% 0); }
          60% { clip-path: inset(15% 0 65% 0); }
          80% { clip-path: inset(50% 0 30% 0); }
        }
      `}</style>
    </div>
  );
}
