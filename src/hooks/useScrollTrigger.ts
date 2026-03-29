import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerConfig {
  onEnter?: () => void;
  animation?: (target: Element) => gsap.core.Tween;
  once?: boolean;
}

export function useScrollTrigger(
  ref: React.RefObject<HTMLElement>,
  config: ScrollTriggerConfig = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (config.animation) {
      const animation = config.animation(element);
      ScrollTrigger.create({
        trigger: element,
        animation,
        start: 'top 80%',
        once: config.once !== false,
      });
    } else if (config.onEnter) {
      ScrollTrigger.create({
        trigger: element,
        onEnter: () => config.onEnter?.(),
        start: 'top 80%',
        once: config.once !== false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [config]);
}
