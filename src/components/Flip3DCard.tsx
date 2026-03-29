import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Flip3DCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export function Flip3DCard({ frontContent, backContent, className = '' }: Flip3DCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  let isFlipped = false;

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const onMouseEnter = () => {
      if (isFlipped) return;
      isFlipped = true;

      gsap.to(card, {
        rotationY: 180,
        duration: 0.6,
        ease: 'back.out',
      });
    };

    const onMouseLeave = () => {
      if (!isFlipped) return;
      isFlipped = false;

      gsap.to(card, {
        rotationY: 0,
        duration: 0.6,
        ease: 'back.out',
      });
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{
        perspective: '1000px',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={cardRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          {frontContent}
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
