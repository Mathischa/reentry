import { useEffect, useRef } from 'react';
import { useInView } from './useInView';
import { CountUp as CountUpClass } from 'countup.js';

interface UseCountUpOptions {
  start?: number;
  duration?: number;
  decimalPlaces?: number;
}

export function useCountUp(
  endValue: number,
  options: UseCountUpOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView] = useInView(ref, { threshold: 0.1 });
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isInView || !ref.current || hasStartedRef.current) return;
    if (!ref.current.textContent) return;

    hasStartedRef.current = true;
    const countUp = new CountUpClass(ref.current as any, endValue, {
      startVal: options.start ?? 0,
      duration: options.duration ?? 2,
      decimalPlaces: options.decimalPlaces ?? 0,
      enableScrollSpy: false,
    });

    countUp.start();
  }, [isInView, endValue, options]);

  return ref;
}
