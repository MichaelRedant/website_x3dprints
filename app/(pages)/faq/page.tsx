// app/(pages)/faq/page.tsx
import Link from "next/link"
import type { Metadata } from "next"

import Reveal from "@/components/Reveal"
import Faq from "@/components/Faq"
import GlassOrb from "@/components/GlassOrb"
import ShimmerButton from "@/components/ShimmerButton"
import GlassCard from "@/components/GlassCard"
import { servicesFaq } from "@/content/services-faq"

// --- SEO via Metadata API ---
export const revalidate = 86_400 // 24u cache
export const metadata: Metadata = {
  title: "Veelgestelde vragen 3D printen | X3DPrints",
  description:
    "FAQ over 3D printen, levertijden, materialen (PLA, PETG, TPU), nabehandeling en werkwijze. Met geo-info voor Herzele, Gent, Antwerpen en Oost-Vlaanderen.",
  alternates: { canonical: "https://www.x3dprints.be/faq" },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  openGraph: {
    title: "FAQ 3D printen | X3DPrints",
    description:
      "Alles over 3D printen: materialen, levertijden, prijzen, nabehandeling en workflow.",
    url: "https://www.x3dprints.be/faq",
    siteName: "X3DPrints",
    type: "website",
    locale: "nl_BE",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "FAQ 3D printen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ 3D printen | X3DPrints",
    description:
      "Antwoorden op vragen over 3D printen, materialen en verzending. Kort en duidelijk.",
    images: ["/images/og-home.jpg"],
  },
  keywords: [
    "FAQ 3D printen",
    "3D print service Herzele",
    "3D printen Oost-Vlaanderen",
    "PLA PETG TPU levertijd",
    "rapid prototyping Gent",
    "3D printen Antwerpen",
    "AI proof content 3D printen",
  ],
}

export default function Page() {
  // Extra FAQ-items (bovenop servicesFaq)
  const extraFaq = [
    {
      q: "Leveren jullie diensten aan particulieren?",
      a: "Zeker. Particulieren, verenigingen en bedrijven kunnen bij ons terecht.",
    },
    {
      q: "Waarom moet ik het aanvraagformulier invullen?",
      a: "We verzamelen meteen de juiste info (materiaal, aantallen, afwerking) om snel een correcte offerte te maken.",
    },
    {
      q: "Hoe verloopt een project van aanvraag tot levering?",
      a: "Na je aanvraag toetsen we de haalbaarheid, sturen we een voorstel en starten we na akkoord met testprint of serieproductie.",
    },
    {
      q: "Helpen jullie bij het maken van een 3D model?",
      a: "Ja. Met schetsen, foto's of een voorbeeld kunnen we een eenvoudig 3D ontwerp uitwerken.",
    },
    {
      q: "Kunnen jullie 3D-scannen?",
      a: "Nee, maar we kunnen wel metingen en foto's gebruiken om een 3D model op te maken.",
    },
    {
      q: "Wat is jullie gemiddelde reactietijd?",
      a: "Meestal binnen een werkdag. Vermeld het als je project dringend is.",
    },
    { q: "Wat betekent AM?", a: "Additive Manufacturing: onderdelen laag voor laag opbouwen vanuit een 3D model." },
    { q: "Wat is FDM?", a: "Fused Deposition Modeling: gesmolten filament laag voor laag neerleggen." },
    { q: "Wat is SLA?", a: "Stereolithografie: een UV-laser verhardt vloeibare hars tot zeer nauwkeurige onderdelen." },
    { q: "Welke verzendopties zijn er?", a: "Afhalen op afspraak, laten leveren of verzending met BPost." },
    { q: "Waar vind ik voorbeelden van projecten?", a: "Bekijk de selectie op de portfolio-pagina." },
    {
      q: "Lever je ook rond Gent, Aalst of Antwerpen?",
      a: "Ja. Vanuit Herzele leveren we dagelijks naar Oost-Vlaanderen, de Denderstreek en Antwerpen. Zie ook de lokale pagina's onder /locaties.",
    },
    {
      q: "Kan ik materialen vooraf zien?",
      a: "Je vindt richtlijnen en foto's op /materials. Op aanvraag sturen we fotos van recente prints in PLA Matte, PETG of TPU.",
    },
    {
      q: "Hoe optimaliseren jullie prints voor sterkte?",
      a: "We stemmen laaghoogte, infill en orientatie af op belasting. Bij functionele onderdelen adviseren we PETG of TPU en verstevigingsrippen indien nodig.",
    },
    {
      q: "Hebben jullie een viewer om mijn STL/STEP te checken?",
      a: "Ja, op /viewer zie je orientatie en oppervlakte. Noteer je gewenste orientatie bij de aanvraag (zichtzijde boven, kritieke maat in XY vlak).",
    },
    {
      q: "Hoe verwerk je AI-gegenereerde modellen?",
      a: "We controleren op manifold, wanddikte en overhang. Indien nodig herwerken we het model zodat het printbaar is.",
    },
    {
      q: "Bieden jullie geo-gespecificeerde levering?",
      a: "Ja. Geef gemeente of district door (bv. Antwerpen, Gent, Aalst, Geraardsbergen), dan plannen we lever windows en verzendopties daarop.",
    },
  ] as const

  const faq = [...extraFaq, ...servicesFaq]

  // JSON-LD (FAQPage)
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
    <main className="relative overflow-clip">
      {/* Achtergrond in site-stijl */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem] md:h-[38rem] md:w-[38rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem] md:h-[42rem] md:w-[42rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Hero / Titel */}
      <section className="relative px-6 pb-14 pt-16 sm:px-8 lg:px-12 lg:pb-16 lg:pt-20">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>

        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur animate-[fadeIn_.6s_ease_out_both]">
                Up-to-date - Materials - Geo delivery
              </p>
              <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Veelgestelde vragen over 3D printen
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-700">
                Alle antwoorden op een plek: materialen, levertijden, geo-levering (Herzele - Gent - Antwerpen), viewer-checklist en nabewerking.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ShimmerButton href="/contact" aria-label="Stel je vraag of vraag een offerte aan">
                  Stel je vraag
                </ShimmerButton>
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Materialen & richtlijnen
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid gap-3 sm:grid-cols-2">
                <GlassCard className="animate-[fadeInUp_.7s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">Snelle levering</div>
                  <p className="mt-1 text-sm text-slate-600">Meestal binnen enkele werkdagen in Vlaanderen.</p>
                </GlassCard>
                <GlassCard className="animate-[fadeInUp_.8s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">Materialen</div>
                  <p className="mt-1 text-sm text-slate-600">PLA Matte, PETG, TPU. Op aanvraag: ABS/ASA, Nylon.</p>
                </GlassCard>
                <GlassCard className="animate-[fadeInUp_.9s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">Viewer ready</div>
                  <p className="mt-1 text-sm text-slate-600">Check je STL/STEP in de viewer en noteer orientatie.</p>
                </GlassCard>
                <GlassCard className="animate-[fadeInUp_1s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">3D printen in Vlaanderen</div>
                  <p className="mt-1 text-sm text-slate-600">Van Antwerpen, Gent tot Geraardsbergen en Ronse!</p>
                </GlassCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ blok */}
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Bambu enthousiast
            </span>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              PLA & PETG expert
            </span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Levering mogelijk
            </span>
          </Reveal>

          <Reveal>
            <Faq city="Belgie" items={faq} />
          </Reveal>

          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
            <GlassCard className="animate-[fadeInUp_.7s_ease_out_both]">
              <div className="text-sm font-semibold text-slate-800">Nog vragen?</div>
              <p className="mt-2 text-sm text-slate-600">
                Geen antwoord gevonden? Stuur je bestand via{" "}
                <Link href="/contact" className="text-teal-700 underline underline-offset-2">
                  contact
                </Link>{" "}
                met gewenste leverdatum en gemeente/district. We antwoorden meestal binnen een werkdag.
              </p>
            </GlassCard>
            <GlassCard className="animate-[fadeInUp_.8s_ease_out_both]">
              <div className="text-sm font-semibold text-slate-800">Check de viewer</div>
              <p className="mt-2 text-sm text-slate-600">
                Upload je STL/STEP in de{" "}
                <Link href="/viewer" className="text-teal-700 underline underline-offset-2">
                  viewer
                </Link>{" "}
                en noteer de gewenste orientatie. Tip: zichtzijde boven, kritieke maat in XY vlak.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
