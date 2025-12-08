import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/3d-printen-op-bestelling"

export const metadata: Metadata = {
  title: "3D printen op bestelling | X3DPrints",
  description:
    "Zo werkt 3D printen op bestelling bij X3DPrints: van aanvraag tot levering, met voorbeelden en tips voor herhaalorders.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen op bestelling: proces & tips",
    description:
      "Leer hoe je een 3D print bestelling start, welke info we nodig hebben en hoe we communiceren over planning, updates en levering.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printen op bestelling" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen op bestelling",
    description:
      "Stap-voor-stap gids voor het bestellen van 3D prints bij X3DPrints, inclusief prijsinschatting, voorbeelden en follow-up.",
    images: ["/images/og-home.jpg"],
  },
}

const steps = [
  {
    title: "Aanvraag & intake",
    body: "Stuur STL/STEP, gewenste aantallen, deadline en eventuele referentiefoto's. Binnen één werkdag krijg je feedback en een prijsinschatting.",
    link: { label: "Upload via viewer", href: "/viewer" },
  },
  {
    title: "Productie & updates",
    body: "Na akkoord plannen we de printslot. Je ontvangt updates per mail (foto of korte video) als je dat wenst. Correcties zijn mogelijk vóór start.",
    link: { label: "Check materialen", href: "/materials" },
  },
  {
    title: "Levering & nazorg",
    body: "Afhalen in Herzele, Bpost of persoonlijke levering in Gent/Aalst. Factuur + herhaalnummer zodat je later makkelijk opnieuw bestelt.",
    link: { label: "Plan levering", href: "/contact" },
  },
]

const reorders = [
  "We bewaren slicer-profielen en G-code (na akkoord) zodat herhaalorders identiek zijn.",
  "Gebruik het bestelnr. of projectnaam bij nieuwe aanvragen; we weten meteen welke instellingen horen.",
  "Combineer meerdere kleine bestellingen tot één batch voor betere prijzen en kortere queue.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "3D printen op bestelling",
  description:
    "Uitleg over het bestelproces bij X3DPrints: intake, productie, levering en herhaalorders.",
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/Logo.webp",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
}

export default function OrderArticlePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(190,24,93,0.16),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">3D printen op bestelling</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen op bestelling: van briefing tot levering
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Zo organiseer je een bestelling bij X3DPrints: welke informatie we nodig hebben, wat je mag verwachten en hoe we herhaaljobs eenvoudiger maken.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/contact">Bestelling starten</ShimmerButton>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk pricing & stappen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Reveal key={step.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Stap</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{step.body}</p>
                <Link
                  href={step.link.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  {step.link.label}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wat we nodig hebben in je briefing</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Bestanden: STL/STEP + referentieafbeelding of schets.</li>
                <li>Materiaal- en kleurvoorkeur, gewenste afwerking (ruw, geschuurd, gelakt).</li>
                <li>Aantal stuks en richtdeadline (met vermelding of er flexibiliteit is).</li>
                <li>Leveroptie: afhalen, Bpost, persoonlijke drop-off.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Herhaalorders & abonnementen</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {reorders.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Idee: combineer je maandelijkse merchandising of onderhoudsonderdelen in één batch. Zo profiteer je van kortere queue en scherpe prijzen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Bestelling klaarzetten?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  We sturen binnen één werkdag een concreet voorstel en bespreken hoe vaak je wil herhalen.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Start bestelling</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk prijzen
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}

