import { useRef } from 'react';
import { useSplitText } from '../hooks/useSplitText';

export function SectionTitle({ children }: { children: React.ReactNode }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useSplitText(titleRef);

  return (
    <h2 ref={titleRef} className="section-title">
      {children}
    </h2>
  );
}
