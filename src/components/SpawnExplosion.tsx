import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SpawnExplosion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createExplosion = (x: number, y: number) => {
      const particleCount = 12;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9998';

        const colors = ['#0ea5e9', '#6366f1', '#a855f7'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        document.body.appendChild(particle);

        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        gsap.to(particle, {
          x: tx,
          y: ty,
          opacity: 0,
          scale: 0,
          duration: 0.8 + Math.random() * 0.4,
          ease: 'power2.out',
          onComplete: () => {
            particle.remove();
          },
        });
      }
    };

    // Listen for element spawning
    const observer = new MutationObserver(() => {
      // Create small explosions on mutation
      if (Math.random() < 0.1) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createExplosion(x, y);
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={containerRef} className="contents" />;
}
