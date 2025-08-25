export default function GlassOrb({ className = "h-40 w-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label="Decoratieve 3D orb">
      <defs>
        <radialGradient id="g0" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* Glow */}
      <g filter="url(#blur)">
        <circle cx="80" cy="84" r="52" fill="url(#g0)" opacity=".6" />
      </g>

      {/* Core */}
      <circle cx="80" cy="80" r="48" fill="url(#g0)" opacity=".95" />

      {/* Ring */}
      <circle cx="80" cy="80" r="50" fill="none" stroke="url(#ring)" strokeWidth="2.4" opacity=".9" />

      {/* Highlights */}
      <ellipse cx="64" cy="56" rx="26" ry="14" fill="url(#shine)" opacity=".65" />
      <ellipse cx="100" cy="104" rx="18" ry="10" fill="#fff" opacity=".06" />
    </svg>
  )
}
