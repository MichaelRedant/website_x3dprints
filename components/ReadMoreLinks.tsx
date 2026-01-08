import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"

type ReadMoreLink = { label: string; href: string }

const defaultPrimary: ReadMoreLink[] = [
  { label: "3D print service", href: "/services" },
  { label: "Materialen & richtlijnen", href: "/materials" },
  { label: "Prijzen & calculator", href: "/pricing" },
]

const defaultSecondary: ReadMoreLink[] = [
  { label: "Segmenten & cases", href: "/segments" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Offerte aanvragen", href: "/contact" },
]

type ReadMoreLinksProps = {
  title?: string
  intro?: string
  primaryLinks?: ReadMoreLink[]
  secondaryLinks?: ReadMoreLink[]
}

export default function ReadMoreLinks({
  title = "Aanraders voor je volgende stap",
  intro = "Handige interne links om je project vlotter te plannen, materiaal te kiezen en een offerte te starten.",
  primaryLinks = defaultPrimary,
  secondaryLinks = defaultSecondary,
}: ReadMoreLinksProps) {
  return (
    <section className="px-6 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Verder lezen</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{intro}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Start hier</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {primaryLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-indigo-600 transition hover:text-indigo-500">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Meer context</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {secondaryLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-indigo-600 transition hover:text-indigo-500">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
