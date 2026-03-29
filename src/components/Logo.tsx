/**
 * Renders logo.png with white background removed via SVG feColorMatrix filter.
 * Works on any dark background without a white rectangle.
 */
export function Logo({ height = 40, className = '' }: { height?: number; className?: string }) {
  // Logo is ~400×470px → aspect ratio ≈ 0.851
  const width = Math.round(height * 0.851);
  const id = `logo-wt-${height}`; // unique per size to avoid SVG id collisions

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-label="Webyra"
      role="img"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          {/* Step 1 — make white/near-white pixels transparent */}
          <feColorMatrix
            type="matrix"
            result="noWhite"
            values="1  0  0  0  0
                    0  1  0  0  0
                    0  0  1  0  0
                   -1 -1 -1  0  3"
          />
          {/* Step 2 — brighten remaining colors for dark-background visibility */}
          <feColorMatrix
            in="noWhite"
            type="matrix"
            values="1.6  0    0    0  0
                    0    1.6  0    0  0
                    0    0    1.6  0  0
                    0    0    0    1  0"
          />
        </filter>
      </defs>
      <image
        href="/logo.png"
        x="0"
        y="0"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        filter={`url(#${id})`}
      />
    </svg>
  );
}
