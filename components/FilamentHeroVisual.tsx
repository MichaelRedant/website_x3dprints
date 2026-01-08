type Props = { className?: string }

export default function FilamentHeroVisual({ className }: Props) {
  const classes = ["filament-hero-visual", className].filter(Boolean).join(" ")
  return (
    <svg
      aria-hidden
      focusable="false"
      className={classes}
      viewBox="0 0 320 240"
    >
      <ellipse
        cx={142}
        cy={210}
        rx={96}
        ry={12}
        className="fill-indigo-200/20 dark:fill-cyan-200/10"
      />
      <g className="filament-printer">
        <rect
          x={42}
          y={108}
          width={170}
          height={100}
          rx={20}
          className="fill-white/35 stroke-indigo-200/70 dark:fill-slate-900/55 dark:stroke-cyan-200/45"
          strokeWidth={5}
        />
        <rect
          x={170}
          y={122}
          width={34}
          height={78}
          rx={12}
          className="fill-white/25 stroke-indigo-200/55 dark:fill-slate-900/45 dark:stroke-cyan-200/40"
          strokeWidth={3}
        />
        <rect
          x={56}
          y={124}
          width={114}
          height={54}
          rx={12}
          className="fill-white/60 stroke-indigo-200/60 dark:fill-slate-900/70 dark:stroke-cyan-200/55"
          strokeWidth={4}
        />
        <rect
          x={64}
          y={132}
          width={98}
          height={30}
          rx={10}
          className="fill-white/70 stroke-indigo-200/55 dark:fill-slate-900/75 dark:stroke-cyan-200/55"
          strokeWidth={3}
        />
        <rect
          x={68}
          y={162}
          width={96}
          height={12}
          rx={5}
          className="fill-white/70 stroke-indigo-200/60 dark:fill-slate-900/80 dark:stroke-cyan-200/60"
          strokeWidth={3}
        />
        <rect
          x={62}
          y={90}
          width={118}
          height={20}
          rx={8}
          className="fill-white/45 stroke-indigo-200/70 dark:fill-slate-900/60 dark:stroke-cyan-200/50"
          strokeWidth={4}
        />
        <rect
          x={118}
          y={84}
          width={22}
          height={22}
          rx={5}
          className="fill-white/55 stroke-indigo-200/70 dark:fill-slate-900/70 dark:stroke-cyan-200/55"
          strokeWidth={4}
        />
        <rect
          x={122}
          y={98}
          width={14}
          height={8}
          rx={2}
          className="fill-white/70 stroke-indigo-200/70 dark:fill-slate-900/75 dark:stroke-cyan-200/55"
          strokeWidth={3}
        />
        <rect
          x={72}
          y={132}
          width={90}
          height={6}
          rx={3}
          className="fill-white/80 stroke-indigo-200/55 dark:fill-slate-900/80 dark:stroke-cyan-200/55"
          strokeWidth={2}
        />
        <line
          x1={78}
          y1={138}
          x2={78}
          y2={170}
          className="stroke-indigo-200/55 dark:stroke-cyan-200/40"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={148}
          y1={138}
          x2={148}
          y2={170}
          className="stroke-indigo-200/55 dark:stroke-cyan-200/40"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <rect
          x={112}
          y={136}
          width={24}
          height={12}
          rx={3}
          className="fill-white/60 stroke-indigo-200/70 dark:fill-slate-900/70 dark:stroke-cyan-200/55"
          strokeWidth={3}
        />
        <path
          d="M124 148 L118 160 L130 160 Z"
          className="fill-indigo-200/80 stroke-indigo-300/70 dark:fill-cyan-200/70 dark:stroke-cyan-200/55"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <rect
          x={146}
          y={132}
          width={26}
          height={16}
          rx={3}
          className="fill-indigo-200/60 stroke-indigo-300/70 dark:fill-cyan-200/40 dark:stroke-cyan-200/60"
          strokeWidth={3}
        />
        <rect
          x={149}
          y={135}
          width={20}
          height={10}
          rx={2}
          className="filament-pulse fill-indigo-200/70 dark:fill-cyan-200/50"
        />
        <circle
          cx={156}
          cy={156}
          r={3}
          className="filament-pulse fill-white/80 dark:fill-cyan-200/60"
        />
        <circle
          cx={84}
          cy={146}
          r={3}
          className="fill-emerald-300/80 dark:fill-cyan-300/70"
        />
        <circle
          cx={96}
          cy={146}
          r={3}
          className="fill-emerald-200/70 dark:fill-cyan-200/60"
        />
        <line
          x1={66}
          y1={168}
          x2={156}
          y2={168}
          className="stroke-indigo-200/60 dark:stroke-cyan-200/45"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <line
          x1={66}
          y1={160}
          x2={156}
          y2={160}
          className="stroke-indigo-200/45 dark:stroke-cyan-200/35"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={70}
          y1={194}
          x2={88}
          y2={194}
          className="stroke-indigo-200/50 dark:stroke-cyan-200/35"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <line
          x1={96}
          y1={194}
          x2={114}
          y2={194}
          className="stroke-indigo-200/50 dark:stroke-cyan-200/35"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <line
          x1={176}
          y1={140}
          x2={196}
          y2={140}
          className="stroke-indigo-200/45 dark:stroke-cyan-200/35"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={176}
          y1={148}
          x2={196}
          y2={148}
          className="stroke-indigo-200/45 dark:stroke-cyan-200/35"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={176}
          y1={156}
          x2={196}
          y2={156}
          className="stroke-indigo-200/45 dark:stroke-cyan-200/35"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <rect
          x={56}
          y={206}
          width={18}
          height={6}
          rx={2}
          className="fill-white/60 stroke-indigo-200/55 dark:fill-slate-900/75 dark:stroke-cyan-200/45"
          strokeWidth={2}
        />
        <rect
          x={148}
          y={206}
          width={18}
          height={6}
          rx={2}
          className="fill-white/60 stroke-indigo-200/55 dark:fill-slate-900/75 dark:stroke-cyan-200/45"
          strokeWidth={2}
        />
        <rect
          x={188}
          y={112}
          width={20}
          height={10}
          rx={4}
          className="fill-white/35 stroke-indigo-200/60 dark:fill-slate-900/55 dark:stroke-cyan-200/45"
          strokeWidth={3}
        />
        <circle
          cx={198}
          cy={118}
          r={3}
          className="fill-white/75 dark:fill-cyan-200/50"
        />
        <rect
          x={196}
          y={118}
          width={12}
          height={78}
          rx={6}
          className="fill-white/25 stroke-indigo-200/50 dark:fill-slate-900/45 dark:stroke-cyan-200/35"
          strokeWidth={3}
        />
      </g>
      <path
        d="M206 82 C 176 100 150 112 132 126"
        className="filament-flow stroke-indigo-300/70 dark:stroke-cyan-200/60"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M202 88 C 176 108 150 120 136 132"
        className="stroke-indigo-200/50 dark:stroke-cyan-200/40"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx={132}
        cy={126}
        r={4}
        className="filament-pulse fill-indigo-200/80 dark:fill-cyan-200/70"
      />
      <g className="filament-spool">
        <circle
          cx={248}
          cy={74}
          r={54}
          className="fill-white/20 stroke-indigo-200/70 dark:fill-slate-900/40 dark:stroke-cyan-200/40"
          strokeWidth={6}
        />
        <circle
          cx={248}
          cy={74}
          r={52}
          fill="none"
          className="stroke-white/70 dark:stroke-white/10"
          strokeWidth={2}
          strokeDasharray="120 220"
          strokeDashoffset="-40"
          strokeLinecap="round"
        />
        <circle
          cx={248}
          cy={74}
          r={52}
          fill="none"
          className="stroke-indigo-300/30 dark:stroke-cyan-200/15"
          strokeWidth={2}
          strokeDasharray="80 260"
          strokeDashoffset="-200"
          strokeLinecap="round"
        />
        <circle
          cx={248}
          cy={74}
          r={40}
          className="fill-white/30 stroke-indigo-200/60 dark:fill-slate-900/50 dark:stroke-cyan-200/50"
          strokeWidth={5}
        />
        <circle
          cx={248}
          cy={74}
          r={34}
          fill="none"
          className="stroke-indigo-200/35 dark:stroke-cyan-200/25"
          strokeWidth={2}
          strokeDasharray="4 8"
        />
        <circle
          cx={248}
          cy={74}
          r={30}
          fill="none"
          className="stroke-indigo-300/40 dark:stroke-cyan-200/30"
          strokeWidth={7}
          strokeDasharray="14 10"
          strokeLinecap="round"
        />
        <circle
          cx={248}
          cy={74}
          r={24}
          fill="none"
          className="stroke-indigo-200/25 dark:stroke-cyan-200/20"
          strokeWidth={2}
          strokeDasharray="2 6"
        />
        <circle
          cx={248}
          cy={74}
          r={16}
          className="fill-white/60 stroke-indigo-200/70 dark:fill-slate-900/60 dark:stroke-cyan-200/60"
          strokeWidth={4}
        />
        <circle
          cx={248}
          cy={74}
          r={7}
          className="fill-white/80 stroke-indigo-200/80 dark:fill-slate-900/70 dark:stroke-cyan-200/60"
          strokeWidth={3}
        />
        <circle
          cx={248}
          cy={74}
          r={48}
          className="filament-pulse fill-indigo-200/20 dark:fill-cyan-200/15"
        />
        <circle cx={248} cy={52} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <circle cx={248} cy={96} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <circle cx={226} cy={74} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <circle cx={270} cy={74} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <circle cx={236} cy={60} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <circle cx={260} cy={60} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <circle cx={236} cy={88} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <circle cx={260} cy={88} r={2.2} className="fill-white/80 dark:fill-slate-900/75" />
        <line
          x1={248}
          y1={22}
          x2={248}
          y2={50}
          className="stroke-indigo-300/60 dark:stroke-cyan-200/50"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <line
          x1={248}
          y1={98}
          x2={248}
          y2={126}
          className="stroke-indigo-300/60 dark:stroke-cyan-200/50"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <line
          x1={196}
          y1={74}
          x2={222}
          y2={74}
          className="stroke-indigo-300/60 dark:stroke-cyan-200/50"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <line
          x1={274}
          y1={74}
          x2={300}
          y2={74}
          className="stroke-indigo-300/60 dark:stroke-cyan-200/50"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
