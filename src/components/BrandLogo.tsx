export function BrandLogo({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-csblack border border-csborder flex items-center justify-center overflow-hidden shadow-lg shadow-black/40 shrink-0"
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="csMotion" x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="csBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A84FF" />
            <stop offset="100%" stopColor="#0066CC" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="120" height="120" fill="#050505" />

        {/* Motion trail streaks (left, like the logo) */}
        <g stroke="url(#csMotion)" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M8 52 L32 52" opacity="0.55" />
          <path d="M4 62 L30 62" opacity="0.80" />
          <path d="M10 72 L32 72" opacity="0.50" />
        </g>

        {/* Phone body — tilted slightly (like the brand logo) */}
        <g transform="translate(60 60) rotate(-14) translate(-22 -40)">
          {/* Outer frame */}
          <rect
            x="0" y="0" width="44" height="80" rx="10" ry="10"
            fill="#F5F5F7" stroke="#F5F5F7" strokeWidth="0"
          />
          {/* Inner screen */}
          <rect
            x="4" y="8" width="36" height="64" rx="4" ry="4"
            fill="#050505"
          />
          {/* Notch */}
          <rect x="15" y="4" width="14" height="3" rx="1.5" fill="#050505" />
          {/* Home indicator / button */}
          <circle cx="22" cy="76" r="2" fill="#050505" />
          {/* Accent screen glow */}
          <rect
            x="4" y="8" width="36" height="64" rx="4" ry="4"
            fill="url(#csBlue)" opacity="0.18"
          />
        </g>

        {/* Motion trail streaks (right) */}
        <g stroke="url(#csMotion)" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M92 82 L108 78" opacity="0.60" />
          <path d="M96 94 L112 88" opacity="0.45" />
        </g>
      </svg>
    </div>
  );
}
