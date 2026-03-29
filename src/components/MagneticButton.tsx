import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MagneticButton({ href, onClick, children, className = '', style }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const magnetic = magneticRef.current;
    if (!button || !magnetic) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: Event) => {
      const event = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = 80; // Magnetic distance

      const distToMouse = Math.sqrt(
        Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2)
      );

      if (distToMouse < distance) {
        const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        mouseX = Math.cos(angle) * (distance - distToMouse) * 0.3;
        mouseY = Math.sin(angle) * (distance - distToMouse) * 0.3;
      } else {
        mouseX = 0;
        mouseY = 0;
      }

      gsap.to(magnetic, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.75)',
      });
    };

    const onMouseLeave = () => {
      gsap.to(magnetic, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.75)',
      });
    };

    button.addEventListener('mousemove', onMouseMove as EventListener);
    button.addEventListener('mouseleave', onMouseLeave as EventListener);

    return () => {
      button.removeEventListener('mousemove', onMouseMove as EventListener);
      button.removeEventListener('mouseleave', onMouseLeave as EventListener);
    };
  }, []);

  const Element = href ? 'a' : 'button';

  return (
    <Element
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div ref={magneticRef} className="relative">
        {children}
      </div>
    </Element>
  );
}
