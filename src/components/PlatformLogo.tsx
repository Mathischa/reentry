import { useState } from 'react';
import fortuneoImg    from '../img/fortuneo.png';
import helloBankImg   from '../img/hellobank.png';
import okxImg         from '../img/okx.png';
import robinhoodImg   from '../img/robinhood.png';

const LOCAL: Record<string, string> = {
  fortuneo:      fortuneoImg,
  hellobank:     helloBankImg,
  okx:           okxImg,
  robinhood:     robinhoodImg,
};

interface PlatformLogoProps {
  id: string;
  logo?: string;
  emoji: string;
  name: string;
  color: string;
  size?: number;
  className?: string;
}

export function PlatformLogo({ id, logo, emoji, name, color, size = 36, className = '' }: PlatformLogoProps) {
  const [error, setError] = useState(false);
  const src = LOCAL[id] || logo;

  if (src && !error) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className={`rounded-xl object-contain ${className}`}
        style={{ width: size, height: size, background: `${color}15`, border: `1px solid ${color}25`, padding: 4 }}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-xl ${className}`}
      style={{ width: size, height: size, background: `${color}15`, border: `1px solid ${color}30`, fontSize: size * 0.5 }}>
      {emoji}
    </div>
  );
}
