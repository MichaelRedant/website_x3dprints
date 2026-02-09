import Link from "next/link"
import GlassCard from "@/components/GlassCard"

const COPY = {
  nl: {
    kicker: "Over de maker",
    title: "X3DPrints is een 1-persoonsstudio in Herzele",
    byline: "Door X3DPrints — persoonlijke begeleiding van intake tot oplevering.",
    body:
      "Ik help je met materiaalkeuze, file checks en productieplanning zodat je print meteen bruikbaar is. Je krijgt snelle feedback, duidelijke keuzes en een eerlijk advies over haalbaarheid.",
    primaryCta: { label: "Over X3DPrints", href: "/about" },
    secondaryCta: { label: "Plan een gesprek", href: "/contact" },
  },
  en: {
    kicker: "About the maker",
    title: "X3DPrints is a one-person studio in Herzele",
    byline: "By X3DPrints — hands-on guidance from intake to delivery.",
    body:
      "I help you choose materials, validate files and plan production so your print works right away. Expect fast feedback, clear trade-offs and honest advice on feasibility.",
    primaryCta: { label: "About X3DPrints", href: "/en/about" },
    secondaryCta: { label: "Plan a call", href: "/en/contact" },
  },
} as const

type BlogAuthorNoteProps = {
  locale: "nl" | "en"
}

export default function BlogAuthorNote({ locale }: BlogAuthorNoteProps) {
  const copy = COPY[locale]

  return (
    <section className="px-6 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.kicker}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{copy.title}</h2>
          <p className="mt-2 text-sm font-medium text-slate-600">{copy.byline}</p>
          <p className="mt-3 text-sm text-slate-600">{copy.body}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={copy.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              {copy.primaryCta.label}
            </Link>
            <Link
              href={copy.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100"
            >
              {copy.secondaryCta.label}
            </Link>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}