import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function ScrollVelocityEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollY = 0;
    let scrollVelocity = 0;

    const onScroll = () => {
      const scrollY = window.scrollY;
      scrollVelocity = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // Apply skew effect based on velocity
      const skew = Math.max(-20, Math.min(20, scrollVelocity * 0.5));

      gsap.to(container, {
        skewY: skew,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Velocity trail effect
      const trailStrength = Math.min(Math.abs(scrollVelocity) * 0.03, 1);
      container.style.filter = `
        blur(${trailStrength * 2}px)
        brightness(${1 - trailStrength * 0.1})
        hue-rotate(${scrollVelocity * 0.5}deg)
      `;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        willChange: 'transform, filter',
        transformOrigin: 'center center',
      }}
    />
  );
}
