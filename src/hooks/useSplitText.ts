import { useEffect } from 'react';
import Splitting from 'splitting';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSplitText(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Apply splitting
    (Splitting as any)({
      target: element,
      by: 'chars',
    });

    const chars = element.querySelectorAll('.char');

    gsap.fromTo(
      chars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);
}
