import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/bestanden-voor-3d-printen"

export const metadata: Metadata = {
  title: "Welke bestanden heb je nodig voor 3D printen? | X3DPrints Blog",
  description:
    "STL, STEP of native CAD? Leer welk bestandsformaat je gebruikt voor 3D printen, welke resolutie nodig is en hoe je een complete aanvraag aanlevert.",
  alternates: { canonical },
  openGraph: {
    title: "Welke bestanden heb je nodig voor 3D printen?",
    description:
      "Volledige gids over bestandsformaten, exportinstellingen en mesh-controle voor 3D printen. Inclusief checklist en uploadtips.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Bestanden voor 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welke bestanden heb je nodig voor 3D printen?",
    description:
      "Checklist voor STL/STEP export, meshherstel en documentatie zodat je printaanvraag meteen verwerkt kan worden.",
    images: ["/images/og-home.jpg"],
  },
}

const formatCards = [
  {
    format: "STL",
    description:
      "Ideaal voor definitieve productie. Export met voldoende resolutie (0.01-0.05 mm). Controleer op non-manifold edges en dubbele vlakken voor je uploadt.",
    tips: ["Kies 'Binary STL' voor compactere bestanden", "Splits bewegende onderdelen in losse STL's"],
  },
  {
    format: "STEP",
    description:
      "Perfect wanneer er nog iteraties aankomen. Wij kunnen maten aanpassen, wanddiktes checken en tolerantie nalopen in STEP of native CAD.",
    tips: ["Exporteer op assembly-niveau zodat referentie-origin behouden blijft", "Verwijder niet-relevante bodies (sketch helpers)"],
  },
  {
    format: "Native CAD + PDF",
    description:
      "Voor complexe projecten leveren we graag de originele CAD én een PDF met maatvoering. Zo garanderen we dat pasvlakken en interface-maten correct blijven.",
    tips: ["Gebruik duidelijke layer names", "Voeg materialenlijst of BOM toe wanneer meerdere onderdelen samen horen"],
  },
]

const exportSteps = [
  "Controleer of het model waterdicht is (geen gaten). Tools: Fusion Inspect, SolidWorks Check, Meshmixer.",
  "Verwijder geflipte normals en losstaande triangles. Anders ontstaan print artefacten.",
  "Zet units vast: exporteer in millimeter en zet het ook in de bestandsnaam (bv. bracket-mm-v03.stl).",
  "Comprimeer meerdere bestanden in één zip en voeg een korte readme toe met context (materiaal, aantallen, deadline).",
]

const documentationTips = [
  "Voeg referentiebeelden of renders toe zodat we de gewenste oriëntatie en look begrijpen.",
  "Schrijf tolerantie-notes (bv. gat voor M3 schroef: 2.9 mm) rechtstreeks in het bericht of op een PDF.",
  "Gebruik de viewer om links naar grote cloudbestanden te delen (Dropbox/Drive), zo vermijden we e-mail-limieten.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Welke bestanden heb je nodig voor 3D printen?",
  description:
    "Checklist voor bestandsformaten en exportinstellingen voor 3D printen, inclusief meshcontrole en documentatie.",
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

export default function FilesArticlePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(16,185,129,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-700">Bestanden voor 3D printen</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Welke bestanden heb je nodig voor 3D printen?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Lever je STL voor productie en STEP wanneer je nog aanpassingen verwacht. In deze gids lees je hoe je exporteert, controleert en documenteert voor een snelle offerte.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/viewer">Upload direct</ShimmerButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Vraag ontwerpreview
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {formatCards.map((card) => (
            <Reveal key={card.format}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Formaat</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{card.format}</h2>
                <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
                  {card.tips.map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Export stappenplan</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {exportSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Documentatie & communicatie</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {documentationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Hoe vollediger de info, hoe sneller we prijzen en doorlooptijd kunnen bevestigen. Voeg eventueel een korte video of foto toe van de toepassing.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Drop je bestanden</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Gebruik de viewer voor STL/STEP, wij kijken mee en geven feedback over materiaal, orientatie en prijs.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/viewer">Upload nu</ShimmerButton>
                <Link href="/services" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk ontwerpservice
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}
