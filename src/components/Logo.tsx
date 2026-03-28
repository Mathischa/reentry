interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 28, className = '' }: LogoProps) {
  const id = 'reentry-lg';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-label="ReEntry logo"
    >
      <defs>
        <linearGradient id={id} x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b4fc" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
      </defs>

      {/*
        Arc: center (14,14), radius 9
        Start at SVG angle 300° → (14 + 9·cos300°, 14 + 9·sin300°) = (18.5, 6.2)
        End   at SVG angle 240° → (14 + 9·cos240°, 14 + 9·sin240°) = (9.5,  6.2)
        Sweep CW (sweep=1), large-arc=1 → 300° of arc
        At the end (240°, CW), tangent = (-sin240°, cos240°) = (0.866, -0.5) → pointing right+up toward dot ✓
      */}
      <path
        d="M 18.5 6.2 A 9 9 0 1 1 9.5 6.2"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/*
        Arrowhead at (9.5, 6.2), travel direction ≈ (0.866, -0.5)
        Wings 2.5px back in perpendicular directions
      */}
      <path
        d="M 6.2 8.3 L 9.5 6.2 L 8.8 3.1"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Checkpoint dot at start (18.5, 6.2) */}
      <circle cx="18.5" cy="6.2" r="2.6" fill={`url(#${id})`} />
    </svg>
  );
}
