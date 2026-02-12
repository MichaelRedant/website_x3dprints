type HeroMetric = {
  label: string
  value: string | number
}

type HeroMetricsProps = {
  items: HeroMetric[]
  columns?: 3 | 4
}

export default function HeroMetrics({ items, columns = 3 }: HeroMetricsProps) {
  const gridClass = columns === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3"

  return (
    <div className={`mt-6 grid gap-4 ${gridClass}`}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
