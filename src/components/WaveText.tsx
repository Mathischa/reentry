import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function WaveText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('span');

    const animate = () => {
      const time = gsap.getProperty(window, 'scrollY') as number || 0;

      chars.forEach((char, i) => {
        const yMove = Math.sin(time * 0.01 + i * 0.3) * 15;
        const scale = 1 + Math.sin(time * 0.01 + i * 0.3) * 0.1;
        const rotation = Math.sin(time * 0.005 + i * 0.2) * 5;

        gsap.to(char, {
          y: yMove,
          scale,
          rotation,
          duration: 0,
        });
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center gap-1">
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block" style={{ willChange: 'transform' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
