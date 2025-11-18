// app/(pages)/faq/page.tsx
import type { Metadata } from "next"
import Reveal from "@/components/Reveal"
import Faq from "@/components/Faq"
import GlassOrb from "@/components/GlassOrb"
import { servicesFaq } from "@/content/services-faq"

// --- SEO via Metadata API ---
export const revalidate = 86_400 // 24u cache
export const metadata: Metadata = {
  title: "Veelgestelde vragen 3D printen | X3DPrints",
  description:
    "Antwoorden op veelgestelde vragen over 3D printen, levertijden, materialen, nabehandeling en onze werkwijze. Duidelijk en to-the-point.",
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
  // Optioneel: keywords helpt soms bij niche
  // keywords: ["FAQ 3D printen", "3D print service", "materialen PLA PETG TPU", "levertijd 3D printen"],
}

export default function Page() {
  // Extra FAQ-items (bovenop servicesFaq)
  const extraFaq = [
    {
      q: "Leveren jullie diensten aan particulieren?",
      a: "Zeker. Particulieren, verenigingen én bedrijven kunnen bij ons terecht.",
    },
    {
      q: "Waarom moet ik het aanvraagformulier invullen?",
      a: "We verzamelen meteen de juiste info (materiaal, aantallen, afwerking) om snel een correcte offerte te maken.",
    },
    {
      q: "Hoe verloopt een project van aanvraag tot levering?",
      a: "Na je aanvraag toetsen we de haalbaarheid, sturen we een voorstel en starten we na akkoord met testprint/serieproductie.",
    },
    {
      q: "Helpen jullie bij het maken van een 3D model?",
      a: "Ja. Met schetsen, foto’s of een voorbeeld kunnen we een eenvoudig 3D ontwerp uitwerken.",
    },
    {
      q: "Kunnen jullie 3D-scannen?",
      a: "Nee, maar we kunnen wel metingen en foto’s gebruiken om een 3D model op te maken.",
    },
    {
      q: "Wat is jullie gemiddelde reactietijd?",
      a: "Meestal binnen twee werkdagen. Vermeld het zeker als je project dringend is.",
    },
    { q: "Wat betekent AM?", a: "Additive Manufacturing: onderdelen laag voor laag opbouwen vanuit een 3D model." },
    { q: "Wat is FDM?", a: "Fused Deposition Modeling: gesmolten filament laag voor laag neerleggen." },
    { q: "Wat is SLA?", a: "Stereolithografie: een UV-laser verhardt vloeibare hars tot zeer nauwkeurige onderdelen." },
    { q: "Welke verzendopties zijn er?", a: "Afhalen op afspraak, laten leveren of verzending met BPost." },
    { q: "Waar vind ik voorbeelden van projecten?", a: "Bekijk onze selectie op de portfolio-pagina." },
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
      <section className="relative px-6 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-12 lg:pt-20">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Veelgestelde vragen
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Alles wat je wil weten over onze 3D-printservice: materialen, levertijden, prijzen en workflow.
            </p>
          </Reveal>
        </div>
      </section>

      

      {/* FAQ blok */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Faq city="België" items={faq} />
          </Reveal>

          
        </div>
      </section>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
