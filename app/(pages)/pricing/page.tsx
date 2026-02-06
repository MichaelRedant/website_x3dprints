// app/(pages)/pricing/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import PriceEstimator from "@/components/PriceEstimator"
import { GRAMS_PER_TIER, calcUnitPrice, type Quality, type Tier } from "@/lib/pricing"
import type { MaterialKey } from "@/lib/materials"
import FaqPromo from "@/components/FaqPromo"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

const NL_METADATA: Metadata = {
  title: "Prijzen 3D printen | X3DPrints",
  description:
    "Transparante prijzen voor 3D printen in PLA (standaard), met opties voor PLA+ varianten, PETG en TPU. Droogbehandeling voor PETG/TPU inbegrepen. Offerte binnen 24 uur.",
  alternates: {
    canonical: "https://www.x3dprints.be/pricing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/pricing/",
      en: "https://www.x3dprints.be/en/pricing/",
      "x-default": "https://www.x3dprints.be/pricing/",
    },
  },
  openGraph: {
    title: "Prijzen 3D printen",
    description:
      "Indicatieve tarieven voor prototypes en kleine series. Materialen: PLA (standaard), PLA+ varianten, PETG en TPU. Levering in heel Belgie.",
    url: "https://www.x3dprints.be/pricing/",
    images: [{ url: "/images/portfolio/2d-6-1-1.webp", width: 1200, height: 630, alt: "Prijzen voor 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prijzen 3D printen",
    description:
      "Indicatieve tarieven voor prototypes en kleine series. Materialen: PLA (standaard), PLA+ varianten, PETG en TPU. Levering in heel Belgie.",
    images: ["/images/portfolio/2d-6-1-1.webp"],
  },
}

export const EN_METADATA: Metadata = {
  title: "3D Printing Prices | X3DPrints",
  description:
    "Transparent pricing for FDM 3D printing in PLA (standard), with PLA+ variants, PETG and TPU options. Drying for PETG/TPU included. Quote within 24 hours.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/pricing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/pricing/",
      en: "https://www.x3dprints.be/en/pricing/",
      "x-default": "https://www.x3dprints.be/pricing/",
    },
  },
  openGraph: {
    title: "3D printing prices",
    description:
      "Indicative rates for prototypes and small batches. Materials: PLA (standard), PLA+ variants, PETG and TPU. Delivery across Belgium.",
    url: "https://www.x3dprints.be/en/pricing/",
    images: [{ url: "/images/portfolio/2d-6-1-1.webp", width: 1200, height: 630, alt: "3D printing prices" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing prices",
    description:
      "Indicative rates for prototypes and small batches. Materials: PLA (standard), PLA+ variants, PETG and TPU. Delivery across Belgium.",
    images: ["/images/portfolio/2d-6-1-1.webp"],
  },
}

export const metadata: Metadata = NL_METADATA

const PRICING_COPY_NL = {
  hero: {
    title: "Prijzen 3D printen",
    body:
      "Richtprijzen: kleine prints starten rond EUR 5, medium rond EUR 20 en grotere stukken rond EUR 49. PLA Matte is standaard; PLA+ varianten, PETG en TPU zijn beschikbaar voor extra look of performance. Droogbehandeling voor PETG/TPU is inbegrepen. Klaar om te bestellen? Vraag meteen je offerte.",
    ctas: {
      quote: "Offerte aanvragen",
      materials: "Materialen & kleuren",
      blog: "Kostenblog",
      tool: "Material Suggestion Tool",
    },
  },
  tiers: {
    baseMaterialLabel: "PLA Matte (standaard)",
    priceLabel: (price: number) => `EUR ${price.toFixed(2)} / stuk`,
    summary:
      "Richtprijzen bij standaard kwaliteit: Small ~ EUR 5, Medium ~ EUR 20, Large ~ EUR 49. Grotere of zwaardere modellen vergen meer materiaal en tijd.",
    note: "Exacte prijs volgt na modelanalyse; we stemmen levering en afwerking af op jouw use-case.",
    items: [
      {
        name: "Small" as Tier,
        size: "ca. 5 x 5 x 5 cm",
        notes: "Kleine onderdelen, clips, testgeometrie.",
      },
      {
        name: "Medium" as Tier,
        size: "ca. 10 x 10 x 10 cm",
        notes: "Prototypes, kleine behuizingen, decor.",
      },
      {
        name: "Large" as Tier,
        size: "ca. 20 x 20 x 20 cm",
        notes: "Grotere delen, brackets, jigs.",
      },
    ],
  },
  mods: {
    material: {
      title: "Materiaal-opslagen",
      items: [
        { label: "PLA+ / specials (Silk, Wood, Marble, Translucent)", mod: "+20%" },
        { label: "PETG (incl. droogbehandeling)", mod: "+20%" },
        { label: "TPU (incl. droogbehandeling)", mod: "+30%" },
      ],
      note: "PETG/TPU worden vooraf gedroogd voor optimale kwaliteit. Deze behandeling is meegerekend.",
    },
    quality: {
      title: "Kwaliteit (layerhoogte)",
      items: [
        { label: "Standaard layerhoogte (0,2-0,28 mm)", mod: "0%" },
        { label: "Fijn (~ 0,16 mm)", mod: "+15%" },
        { label: "Ultra (~ 0,12 mm)", mod: "+25%" },
      ],
      note: "Kies standaard voor functionele prints. Fijner voor visueel werk of strakkere rondingen.",
    },
  },
  shipping: {
    title: "Verzending & levering",
    items: [
      { k: "Persoonlijke levering", v: "Elektrische wagen, veilig voor grote of breekbare prints. Zie zones hieronder." },
      { k: "Afhalen", v: "Gratis (regio Herzele/Gent, in overleg)" },
      { k: "Pakketdienst", v: "Op aanvraag via pakketdienst, afhankelijk van formaat/gewicht." },
    ],
    deliveryTitle: "Persoonlijke levering (EV)",
    zones: [
      { k: "Zone 1 tot 25 km (EV)", v: "Standaard 48-72u: EUR 15" },
      { k: "Zone 2  25-50 km (EV)", v: "Standaard: EUR 30" },
      { k: "Zone 3  50-75 km (EV)", v: "Standaard: EUR 45" },
      { k: "Verder dan 75 km", v: "Maatwerkprijs of pakketdienst, in overleg" },
      { k: "Vertrekpunt", v: "Afstanden gerekend vanaf Herzele (heen en terug)" },
    ],
  },
  design: {
    title: "Ontwerpservice",
    items: [
      { k: "Eigen ontwerp (STL/STEP)", v: "Gratis beoordeling + offerte" },
      { k: "Ontwerp op maat", v: "EUR 45/uur (incl. digitaal voorbeeld voor productie)" },
    ],
    note: "Voor CAD-hertekenen of complexe aanpassingen stemmen we de aanpak vooraf af.",
  },
  cta: {
    title: "Offerte nodig?",
    body: "Upload STL/STEP met een korte beschrijving. Je krijgt snel een voorstel met materiaaladvies, prijs en levertermijn.",
    primary: "Offerte aanvragen",
    secondary: "Services bekijken",
  },
  readMore: {
    title: "Verder verkennen?",
    intro: "Leg prijzen naast materialen, services en voorbeelden voor een snelle beslissing.",
    primary: [
      { label: "3D print service", href: "/services" },
      { label: "Materialen & looks", href: "/materials" },
      { label: "Contact & offerte", href: "/contact" },
    ],
    secondary: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Segments & cases", href: "/segments" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Kostprijs gids", href: "/blog/hoeveel-kost-3d-printen" },
    ],
  },
  faqPromo: {
    title: "Vragen over 3D printen?",
    intro: "Antwoorden over materialen, levertijden, prijzen en onze werkwijze.",
    ctaLabel: "Bekijk de FAQ",
    qaItems: [
      { q: "Welke materialen printen jullie?", a: "Standaard PLA Matte, plus PETG en TPU. Op aanvraag ABS/ASA, Nylon, PA-CF." },
      { q: "Wat is de gebruikelijke doorlooptijd?", a: "Doorgaans enkele werkdagen, afhankelijk van complexiteit en oplage." },
      { q: "Hoe vraag ik een offerte aan?", a: "Bezorg je STL/STEP en korte context via het formulier. Je krijgt snel prijs en timing." },
    ],
  },
  schema: {
    catalogName: "X3DPrints indicatieve 3D-printtarieven",
  },
}

const PRICING_COPY_EN = {
  hero: {
    title: "3D printing pricing",
    body:
      "Guideline pricing: small prints start around EUR 5, medium around EUR 20 and larger parts around EUR 49. PLA Matte is standard; PLA+ variants, PETG and TPU are available for extra look or performance. Drying for PETG/TPU is included. Ready to order? Request a quote right away.",
    ctas: {
      quote: "Request a quote",
      materials: "Materials & colors",
      blog: "Cost guide",
      tool: "Material Suggestion Tool",
    },
  },
  tiers: {
    baseMaterialLabel: "PLA Matte (standard)",
    priceLabel: (price: number) => `EUR ${price.toFixed(2)} / piece`,
    summary:
      "Guideline prices at standard quality: Small ~ EUR 5, Medium ~ EUR 20, Large ~ EUR 49. Larger or heavier models require more material and time.",
    note: "Final pricing follows after a model check; we align delivery and finish with your use case.",
    items: [
      {
        name: "Small" as Tier,
        size: "approx. 5 x 5 x 5 cm",
        notes: "Small parts, clips, test geometry.",
      },
      {
        name: "Medium" as Tier,
        size: "approx. 10 x 10 x 10 cm",
        notes: "Prototypes, small enclosures, decor.",
      },
      {
        name: "Large" as Tier,
        size: "approx. 20 x 20 x 20 cm",
        notes: "Larger parts, brackets, jigs.",
      },
    ],
  },
  mods: {
    material: {
      title: "Material surcharges",
      items: [
        { label: "PLA+ / specials (Silk, Wood, Marble, Translucent)", mod: "+20%" },
        { label: "PETG (incl. drying)", mod: "+20%" },
        { label: "TPU (incl. drying)", mod: "+30%" },
      ],
      note: "PETG/TPU are dried before printing for optimal quality. This is included.",
    },
    quality: {
      title: "Quality (layer height)",
      items: [
        { label: "Standard layer height (0.2-0.28 mm)", mod: "0%" },
        { label: "Fine (~ 0.16 mm)", mod: "+15%" },
        { label: "Ultra (~ 0.12 mm)", mod: "+25%" },
      ],
      note: "Choose standard for functional prints. Finer works well for visual work or smoother curves.",
    },
  },
  shipping: {
    title: "Shipping and delivery",
    items: [
      { k: "Personal delivery", v: "Electric vehicle, safe for large or fragile prints. See zones below." },
      { k: "Pickup", v: "Free (Herzele/Ghent region, by arrangement)" },
      { k: "Parcel service", v: "On request via carrier, depending on size and weight." },
    ],
    deliveryTitle: "Personal delivery (EV)",
    zones: [
      { k: "Zone 1 up to 25 km (EV)", v: "Standard 48-72h: EUR 15" },
      { k: "Zone 2  25-50 km (EV)", v: "Standard: EUR 30" },
      { k: "Zone 3  50-75 km (EV)", v: "Standard: EUR 45" },
      { k: "Beyond 75 km", v: "Custom quote or carrier shipping, by arrangement" },
      { k: "Starting point", v: "Distances calculated from Herzele (round trip)" },
    ],
  },
  design: {
    title: "Design services",
    items: [
      { k: "Your own design (STL/STEP)", v: "Free review + quote" },
      { k: "Custom design", v: "EUR 45/hour (incl. digital preview for production)" },
    ],
    note: "For CAD redraws or complex edits, we align the approach first.",
  },
  cta: {
    title: "Need a quote?",
    body: "Upload STL/STEP with a short description. You get a fast proposal with material advice, price and lead time.",
    primary: "Request a quote",
    secondary: "View services",
  },
  readMore: {
    title: "Keep exploring?",
    intro: "Pair pricing with materials, services and examples to decide faster.",
    primary: [
      { label: "3D print service", href: "/en/services" },
      { label: "Materials & looks", href: "/en/materials" },
      { label: "Contact & quote", href: "/en/contact" },
    ],
    secondary: [
      { label: "Portfolio", href: "/en/portfolio" },
      { label: "Segments & cases", href: "/en/segments" },
      { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool" },
      { label: "Cost guide", href: "/en/blog/hoeveel-kost-3d-printen" },
    ],
  },
  faqPromo: {
    title: "Questions about 3D printing?",
    intro: "Answers about materials, lead times, pricing and how we work.",
    ctaLabel: "View the FAQ",
    qaItems: [
      { q: "Which materials do you print?", a: "Standard PLA Matte, plus PETG and TPU. ABS/ASA, Nylon, PA-CF on request." },
      { q: "What is the usual lead time?", a: "Typically a few business days, depending on complexity and quantity." },
      { q: "How do I request a quote?", a: "Send your STL/STEP and short context via the form. You get pricing and timing quickly." },
    ],
  },
  schema: {
    catalogName: "X3DPrints indicative 3D printing pricing",
  },
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function Page({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? PRICING_COPY_EN : PRICING_COPY_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)

  const baseMaterial: MaterialKey = "PLA_MATTE"
  const baseQuality: Quality = "Standaard"
  const tierDefs = copy.tiers.items
  const tiers = tierDefs.map((t) => {
    const grams = GRAMS_PER_TIER[t.name]
    const price = calcUnitPrice(t.name, baseMaterial, baseQuality)
    return {
      ...t,
      base: copy.tiers.baseMaterialLabel,
      grams,
      price,
      priceLabel: copy.tiers.priceLabel(price),
    }
  })

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: copy.schema.catalogName,
    itemListElement: tiers.map((t) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `3D print - ${t.name}`,
        description: `${t.size} - ${t.base}`,
        areaServed: "BE",
        provider: { "@type": "LocalBusiness", name: "X3DPrints" },
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: String(t.price),
      },
    })),
  }

  return (
    <main className="relative">
      {/* BG */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO */}
      <section className="px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {copy.hero.title}
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">{copy.hero.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton
                href={localize("/contact")}
                event={{ action: "cta_click", category: "pricing_hero", label: "quote" }}
              >
                {copy.hero.ctas.quote}
              </ShimmerButton>
              <Link
                href={localize("/materials")}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                {copy.hero.ctas.materials}
              </Link>
              <Link
                href={localize("/blog/hoeveel-kost-3d-printen")}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                {copy.hero.ctas.blog}
              </Link>
              <Link
                href={localize("/materials#material-suggestion-tool")}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                {copy.hero.ctas.tool}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIERS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <GlassCard className="h-full p-6 transition-transform hover:-translate-y-1">
                  <div className="text-xs uppercase tracking-wide text-slate-500">{t.name}</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">{t.priceLabel}</div>
                  <div className="mt-1 text-sm text-slate-700">{t.size}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {t.base} - ~{t.grams}g
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{t.notes}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 space-y-1 text-xs text-slate-600">
            <p>{copy.tiers.summary}</p>
            <p>{copy.tiers.note}</p>
          </div>
        </div>
      </section>

      {/* MODIFIERS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.mods.material.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {copy.mods.material.items.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2"
                    >
                      <span>{m.label}</span>
                      <span className="font-semibold">{m.mod}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">{copy.mods.material.note}</p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.mods.quality.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {copy.mods.quality.items.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2"
                    >
                      <span>{m.label}</span>
                      <span className="font-semibold">{m.mod}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">{copy.mods.quality.note}</p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <div className="mt-4">
                <PriceEstimator locale={normalizedLocale} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SHIPPING & DESIGN */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.shipping.title}</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {copy.shipping.items.map((s) => (
                    <div key={s.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{s.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 rounded-xl border border-dashed border-teal-200 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{copy.shipping.deliveryTitle}</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {copy.shipping.zones.map((z) => (
                      <div key={z.k} className="rounded-lg border border-white/60 bg-white/80 p-3 shadow-sm">
                        <div className="text-sm font-semibold text-slate-800">{z.k}</div>
                        <div className="mt-1 text-sm text-slate-700">{z.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.design.title}</h2>
                <dl className="mt-3 grid gap-3">
                  {copy.design.items.map((d) => (
                    <div key={d.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{d.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{d.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-slate-500">{copy.design.note}</p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <ReadMoreLinks
        title={copy.readMore.title}
        intro={copy.readMore.intro}
        primaryLinks={copy.readMore.primary.map((link) => ({ ...link, href: localize(link.href) }))}
        secondaryLinks={copy.readMore.secondary.map((link) => ({ ...link, href: localize(link.href) }))}
      />

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.cta.title}</h2>
              <p className="mt-2 max-w-prose text-slate-600">{copy.cta.body}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={localize("/contact")}
                  event={{ action: "cta_click", category: "pricing_cta", label: "contact" }}
                >
                  {copy.cta.primary}
                </ShimmerButton>
                <Link
                  href={localize("/services")}
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  {copy.cta.secondary}
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <FaqPromo
                className="mt-10"
                title={copy.faqPromo.title}
                intro={copy.faqPromo.intro}
                ctaLabel={copy.faqPromo.ctaLabel}
                qaItems={copy.faqPromo.qaItems}
                href={localize("/faq")}
              />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }} />
    </main>
  )
}
