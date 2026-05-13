import { useEffect, useRef } from 'react';

export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight ? (scrollTop / docHeight) * 100 : 0;
      barRef.current.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[9998] transition-all duration-100"
      style={{ height: 2, background: 'linear-gradient(90deg, #f0b54a, #d4893a, #b8692a)', width: '0%' }}
    />
  );
}
