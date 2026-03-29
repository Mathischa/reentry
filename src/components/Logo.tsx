/**
 * Webyra logo — pure SVG, no PNG dependency.
 * Three concentric arcs opening to the right, in blue gradient.
 * Matches the visual identity of the brand logo.
 */

interface LogoProps {
  /** Height in px — width is computed automatically from aspect ratio */
  size?: number;
  /** Show just the mark (arcs + dot) — default */
  className?: string;
}

export function Logo({ size = 40, className = '' }: LogoProps) {
  // ViewBox 120x120, arcs centered at (60, 65), gap on right (~50° opening each side)
  // Outer: r=48, Middle: r=33, Inner: r=19
  // Arc paths computed as large-arc CCW (sweep=0, large=1) from upper-right to lower-right
  const aspect = 120 / 120; // square
  return (
    <svg
      width={size}
      height={Math.round(size * aspect)}
      viewBox="0 0 120 120"
      fill="none"
      aria-label="Webyra"
      role="img"
      className={className}
    >
      <defs>
        <linearGradient id="wlg1" x1="90" y1="28" x2="12" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00c2ff" />
          <stop offset="1" stopColor="#1a6ed6" />
        </linearGradient>
        <linearGradient id="wlg2" x1="81" y1="40" x2="27" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="wlg3" x1="72" y1="51" x2="41" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <filter id="wglow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer arc — r=48, center (60,65), gap ±50° from right horizontal */}
      {/* Point at -50°: (60+48·cos(-50°), 65+48·sin(-50°)) = (90.9, 28.2) */}
      {/* Point at +50°: (90.9, 101.8) */}
      <path
        d="M 90.9 28.2 A 48 48 0 1 0 90.9 101.8"
        stroke="url(#wlg1)"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Middle arc — r=33 */}
      {/* Point at -50°: (60+33·cos(-50°), 65+33·sin(-50°)) = (81.2, 39.7) */}
      {/* Point at +50°: (81.2, 90.3) */}
      <path
        d="M 81.2 39.7 A 33 33 0 1 0 81.2 90.3"
        stroke="url(#wlg2)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Inner arc — r=19 */}
      {/* Point at -50°: (60+19·cos(-50°), 65+19·sin(-50°)) = (72.2, 50.4) */}
      {/* Point at +50°: (72.2, 79.6) */}
      <path
        d="M 72.2 50.4 A 19 19 0 1 0 72.2 79.6"
        stroke="url(#wlg3)"
        strokeWidth="7"
        strokeLinecap="round"
        filter="url(#wglow)"
      />

      {/* Center dot */}
      <circle cx="60" cy="65" r="6" fill="url(#wlg3)" filter="url(#wglow)" />
    </svg>
  );
}
