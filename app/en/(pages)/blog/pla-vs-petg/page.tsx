import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/pla-vs-petg/"

export const metadata: Metadata = {
  title: "PLA vs PETG: which should you choose? | X3DPrints",
  description:
    "Compare PLA and PETG for 3D printing: look, strength, heat resistance and use cases. Includes practical cases and print tips.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/pla-vs-petg/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/pla-vs-petg/",
    },
  },
  openGraph: {
    title: "PLA vs PETG: which should you choose?",
    description: "The definitive comparison between PLA and PETG with notes on look, durability, temperature and cost.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PLA vs PETG comparison" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLA vs PETG: which should you choose?",
    description: "Learn when PLA is enough and when PETG is worth it. With design and print tips.",
    images: ["/images/og-home.jpg"],
  },
}

const highlightCards = [
  {
    title: "Look & finish",
    pla: "PLA is available in matte, silk, marble and wood variants. Ideal for visible parts where colour, texture and detail matter.",
    petg: "PETG has a semi-gloss finish and can be printed translucent. Fewer variants but great for functional prints with a clean look.",
  },
  {
    title: "Temperature & outdoor",
    pla: "Starts to soften around 55-60 C. Perfect for indoor parts that do not sit in the sun or in a hot car.",
    petg: "Holds shape up to ~80 C and handles UV and moisture better. Good for covers, clamps or parts that live outdoors or near heat.",
  },
  {
    title: "Mechanical properties",
    pla: "Rigid and dimensionally accurate, but more brittle under impact. Great for prototypes, housings and decorative parts.",
    petg: "Tough, slightly flexible and more chemically resistant. Ideal for clips, brackets, clamps and functional parts.",
  },
]

const comparisonTable = [
  { property: "Stiffness", pla: "High, keeps sharp details", petg: "Medium, lightly flexible" },
  { property: "Impact resistance", pla: "Medium", petg: "High" },
  { property: "Heat resistance", pla: "Up to ~60 C", petg: "Up to ~80 C" },
  { property: "Chemical resistance", pla: "Limited", petg: "Better against oils and moisture" },
  {
    property: "Surface & detail",
    pla: "Very crisp and matte possible, ideal for visual models",
    petg: "Slight sheen with strong layer bonding; a bit more stringing possible",
  },
  { property: "Cost", pla: "Low (baseline)", petg: "Roughly 20% higher" },
]

const useCases = {
  pla: [
    "Display models, awards and merch in specific colours",
    "Prototypes that are evaluated visually first",
    "Housings and gadgets for indoor use",
    "Architectural maquettes and decorative prints",
  ],
  petg: [
    "Functional parts outdoors or in humid environments",
    "Clamps, holders and brackets that take load",
    "Parts in contact with water, detergents or oils",
    "Covers that end up in cars or near machines",
  ],
}

const switchingTips = [
  {
    title: "Print settings",
    body: "PETG likes 235-250 C nozzle, 70-85 C bed and lower cooling (30-50%). PLA stays around 205-220 C with 60 C bed and full cooling. Start from slicer presets and adjust retraction.",
  },
  {
    title: "Design tweaks",
    body: "For PETG add fillets so stress is not concentrated on corners. For PLA, 1.2 mm walls often suffice; for PETG go to 1.6 mm for extra toughness.",
  },
  {
    title: "Test prints",
    body: "Print a small part in both materials to feel look and strength. We can run the same G-code in two materials so you can compare quickly.",
  },
]

const faq = [
  {
    q: "Can you combine PLA and PETG in one project?",
    a: "Absolutely. Use PLA for visible housings and PETG for hinges, clips or heat-exposed parts. We align tolerances so both materials fit together.",
  },
  {
    q: "Is PETG harder to print?",
    a: "PETG needs drier storage and slightly lower cooling than PLA, but with the right settings it prints very reliably. Expect a small surcharge for material handling and a bit more slicer fine-tuning.",
  },
  {
    q: "Which alternatives do you recommend?",
    a: "For higher heat resistance choose ASA or ABS. For flexible parts: TPU (shore 95A). We discuss these during quoting if your use case requires it.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA vs PETG: which should you choose?",
  description:
    "Compare PLA and PETG for 3D printing: look, strength, heat resistance and use cases. Includes practical cases and print tips.",
  datePublished: "2024-09-01",
  dateModified: "2024-09-01",
  inLanguage: "en-BE",
})

export default function BlogPlaVsPetgEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(99,102,241,0.18),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/en/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">PLA vs PETG</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA vs PETG: which should you choose?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PLA shines when aesthetics and detail matter. PETG thrives when a part needs heat and impact resistance. This guide compares both
              materials step by step so you can choose the right filament for your 3D print: from visual parts to functional components.
            </p>

            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/materials">Compare materials</ShimmerButton>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Request advice
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {highlightCards.map((card) => (
            <Reveal key={card.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-900">PLA</p>
                    <p>{card.pla}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">PETG</p>
                    <p>{card.petg}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">How to pick PLA vs PETG fast</h2>
              <p className="mt-3 text-sm text-slate-600">
                Not sure which way to go? Use this mini decision guide to pick the right filament in minutes.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>
                    <strong>Choose PLA</strong> when you need a <strong>beautiful finish, sharp details</strong> and a <strong>specific colour</strong>.
                    Ideal for prototypes, housings, maquettes and decorative parts.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>
                    <strong>Choose PETG</strong> if the part will be <strong>outdoors</strong>, faces <strong>heat</strong> or needs
                    <strong> impact / flexibility</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>
                    PLA is the most cost-efficient option for prints that are not heavily loaded. For 90% of visual and indoor projects, PLA is the best
                    choice.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>
                    PETG balances looks and durability. It is our go-to for brackets, covers and parts that get handled often or live in warmer places.
                  </span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Side-by-side comparison</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white/80">
                <div className="grid grid-cols-3 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                  <span>Property</span>
                  <span>PLA</span>
                  <span>PETG</span>
                </div>
                <div className="divide-y divide-slate-100 text-sm text-slate-700">
                  {comparisonTable.map((row) => (
                    <div key={row.property} className="grid grid-cols-3 px-4 py-3">
                      <span className="font-medium text-slate-900">{row.property}</span>
                      <span>{row.pla}</span>
                      <span>{row.petg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-900">When PLA is best</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {useCases.pla.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-900">When PETG is best</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {useCases.petg.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{useCase}</span>
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
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Switching from PLA to PETG (or back)</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {switchingTips.map((tip) => (
                  <div key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{tip.body}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want a second opinion?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your model and we will propose PLA, PETG or an alternative with a clear rationale, lead time and price.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Ask for advice</ShimmerButton>
                <Link href="/en/materials" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View all materials
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

