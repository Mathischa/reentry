import { useEffect, useRef } from 'react';

export function AnimatedBlobCursor() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot || isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Pulse effect
      if (isHovering) {
        cursor.style.boxShadow = `
          0 0 0 8px rgba(14,165,233,0.3),
          0 0 0 12px rgba(99,102,241,0.1),
          0 0 20px rgba(14,165,233,0.4)
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const raf = requestAnimationFrame(animate);

    // Hover detection
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea');
    const onHover = () => {
      isHovering = true;
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursor.style.background = 'rgba(14,165,233,0.2)';
      cursor.style.borderColor = '#0ea5e9';
    };
    const onHoverOut = () => {
      isHovering = false;
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'transparent';
      cursor.style.borderColor = 'rgba(14,165,233,0.6)';
      cursor.style.boxShadow = '0 0 0 2px rgba(14,165,233,0.3)';
    };

    interactives.forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)', boxShadow: '0 0 8px rgba(14,165,233,0.8)' }}
      />
      {/* Outer blob circle */}
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          borderColor: 'rgba(14,165,233,0.6)',
          boxShadow: '0 0 0 2px rgba(14,165,233,0.3), inset 0 0 10px rgba(14,165,233,0.1)',
          background: 'transparent',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
    </>
  );
}
