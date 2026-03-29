import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MorphingShape() {
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const path = svgRef.current;

    // Define multiple paths for morphing
    const paths = [
      'M300 50 Q150 150 300 300 Q450 150 300 50', // Wave
      'M300 0 L400 200 L200 200 Z', // Triangle
      'M300 50 Q380 50 380 130 Q380 210 300 210 Q220 210 220 130 Q220 50 300 50', // Circle
      'M100 100 L500 100 L500 300 L100 300 Z', // Square
    ];

    let currentPathIndex = 0;

    ScrollTrigger.create({
      onUpdate: () => {
        const scrollProgress = gsap.getProperty(window, 'scrollY') as number || 0;
        const pathIndex = Math.floor((scrollProgress % 1200) / 300) % paths.length;

        if (pathIndex !== currentPathIndex) {
          currentPathIndex = pathIndex;
          gsap.to(path, {
            attr: { d: paths[pathIndex] },
            duration: 0.8,
            ease: 'power2.inOut',
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <svg viewBox="0 0 600 300" className="w-32 h-32">
      <defs>
        <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        ref={svgRef}
        d="M300 50 Q150 150 300 300 Q450 150 300 50"
        fill="url(#morphGradient)"
        filter="drop-shadow(0 0 20px rgba(14,165,233,0.4))"
      />
    </svg>
  );
}
