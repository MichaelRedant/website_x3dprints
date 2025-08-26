import type { Metadata } from "next"
import Link from "next/link"
import { Brush, Palette, Printer, Wrench } from "lucide-react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"

export const metadata: Metadata = {
  title: "3D Print Services | FDM, afwerking & montage",
  description: "Professionele FDM-printservice met materiaaladvies, nabewerking en montage.",
  alternates: { canonical: "https://www.x3dprints.be/services" },
  openGraph: {
    title: "3D Print Services",
    description: "Professionele FDM-printservice met materiaaladvies, nabewerking en montage.",
    url: "https://www.x3dprints.be/services",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const services = [
    {
      icon: Printer,
      title: "FDM 3D-printen",
      description: "Strakke prototypes en functionele onderdelen tot 25×25×25 cm.",
    },
    {
      icon: Palette,
      title: "Materiaaladvies",
      description: "We kiezen samen het juiste filament voor jouw toepassing.",
    },
    {
      icon: Brush,
      title: "Nabewerking",
      description: "Schuren, lijmen en lakken voor een nette afwerking.",
    },
    {
      icon: Wrench,
      title: "Montage & test",
      description: "Gemonteerde en gecontroleerde onderdelen, klaar voor gebruik.",
    },
  ]

  const faq = [
    {
      q: "Hoe snel ontvang ik een offerte?",
      a: "Meestal binnen 24 uur na het uploaden van je model.",
    },
    {
      q: "Welke bestanden accepteren jullie?",
      a: "STL of STEP werkt het best; andere formaten op aanvraag.",
    },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  }

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO */}
      <section className="px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Services
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Professionele 3D-printdienst met advies en afwerking op maat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <GlassCard className="h-full p-6">
                  <s.icon className="h-8 w-8 text-slate-900" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Workflow</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600">
                <li>Upload je model en gewenste afwerking</li>
                <li>Materiaaladvies en offerte binnen 24 uur</li>
                <li>Productie en kwaliteitscontrole</li>
                <li>Verzending of afhalen in Herzele</li>
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Veelgestelde vragen</h2>
              <ul className="mt-3 space-y-3 text-slate-600">
                {faq.map((f) => (
                  <li key={f.q}>
                    <h3 className="font-medium text-slate-900">{f.q}</h3>
                    <p className="mt-1 text-sm">{f.a}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Project starten?</h2>
                  <p className="mt-2 max-w-prose text-slate-600">
                    Stuur je model door en ontvang snel een heldere prijs en planning.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="rounded-xl border border-white/20 bg-black px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
                    >
                      Offerte aanvragen
                    </Link>
                    <Link
                      href="/portfolio"
                      className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                    >
                      Portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
