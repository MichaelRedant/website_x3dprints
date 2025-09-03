// components/Faq.tsx
interface FaqItem {
  q: string
  a: string
}

interface Props {
  city: string
  items: FaqItem[]
  className?: string
}

export default function Faq({ city, items, className = "" }: Props) {
  return (
    <section
      aria-labelledby="faq-title"
      className={["relative mx-auto max-w-3xl", className].join(" ")}
    >
      <div className="rounded-3xl bg-white/45 p-6 sm:p-8 ring-1 ring-white/30 backdrop-blur-xl shadow-glass">
        <h2
          id="faq-title"
          className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Veelgestelde vragen over 3D printen in {city}
        </h2>
        <dl className="mt-6 space-y-6">
          {items.map((item, i) => (
            <div key={i}>
              <dt className="font-semibold text-slate-900 dark:text-white">
                {item.q}
              </dt>
              <dd className="mt-1 text-slate-700 dark:text-slate-300">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </section>
  )
}

