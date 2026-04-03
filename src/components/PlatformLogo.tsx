import { useState } from 'react';

interface PlatformLogoProps {
  logo?: string;
  emoji: string;
  name: string;
  color: string;
  size?: number;
  className?: string;
}

export function PlatformLogo({ logo, emoji, name, color, size = 36, className = '' }: PlatformLogoProps) {
  const [error, setError] = useState(false);

  if (logo && !error) {
    return (
      <img
        src={logo}
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
