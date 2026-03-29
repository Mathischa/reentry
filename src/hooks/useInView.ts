import { useEffect, useState } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  margin?: string;
}

export function useInView(
  ref: React.RefObject<Element>,
  options: UseInViewOptions = {}
): [boolean, boolean] {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasBeenInView(true);
      }
    }, {
      threshold: options.threshold ?? 0.1,
      rootMargin: options.margin ?? '0px',
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return [isInView, hasBeenInView];
}
