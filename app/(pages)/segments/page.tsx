// app/(pages)/segments/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"

type SegmentCard = {
  slug: string
  title: string
  description: string
  highlights: string[]
}

const coreSegments: SegmentCard[] = [
  {
    slug: "segments/3d-printing-prototypes",
    title: "3D printing voor prototypes",
    description:
      "Snelle iteraties met PLA Matte of PLA Tough+ voor functionele tests. Perfect voor designteams en agencies.",
    highlights: [
      "Snelle turnaround en iteraties",
      "Feedback op DFM en materialen",
      "Offerte + planning afgestemd op jouw sprint",
    ],
  },
  {
    slug: "segments/3d-printing-scholen",
    title: "3D printing voor scholen",
    description:
      "Ondersteuning voor STEM- en ontwerptrajecten. Leerlingen sturen STL/STEP in en wij printen met begeleidende tips.",
    highlights: [
      "Educatieve pakketten en bulkprijzen",
      "Material Suggestion Tool voor studenten",
      "Plaats voor coaching en workshops",
    ],
  },
  {
    slug: "segments/3d-printing-modelbouwers",
    title: "3D printing voor modelbouwers",
    description:
      "PLA Wood, Marble en Translucent voor maquettes en scenery. We denken mee over detailniveau en nabewerking.",
    highlights: [
      "Speciale PLA blends (wood, silk, marble)",
      "Tips voor lijm, verf en assemblage",
      "Lokale afhaling voor fragiele stukken",
    ],
  },
  {
    slug: "segments/3d-printing-engineers",
    title: "3D printing voor engineers",
    description:
      "Precisieprints in PLA Tough+ of PETG voor jigs, fixtures en pre-production prototypes. Inclusief meetrapporten.",
    highlights: [
      "Typische tolerantie +/-0,2 mm",
      "Functionaliteit gericht op sterkte en hittebestendigheid",
      "Makkelijk combineren met metaal/elektronica",
    ],
  },
  {
    slug: "segments/3d-printing-marketing",
    title: "3D printing voor marketing & events",
    description:
      "Eye-catching props, awards en merchandising in PLA Silk+, Marble en Translucent voor campagnes en activaties.",
    highlights: [
      "Showpieces klaar voor fotoshoots",
      "Snelle runs voor events en pop-ups",
      "Afhalen in Herzele of verzending in België",
    ],
  },
  {
    slug: "segments/3d-printing-makers",
    title: "3D printing voor makers & hobbyisten",
    description:
      "Lokale ondersteuning voor hobbyprojecten, custom onderdelen en repair-jobs. Flexibele planning en materiaaladvies.",
    highlights: [
      "Combineer prints met elektronica of hout",
      "Kies tussen snelle PLA of duurzame PETG",
      "Afhalen in Herzele of verzending in België",
    ],
  },
  {
    slug: "segments/3d-printing-tabletop",
    title: "3D printing voor tabletop minis",
    description:
      "D&D en Warhammer miniaturen, bases en dice towers met haarscherpe details. Ontwerp van het 3D model niet inbegrepen; aanleveren of ontwerpservice mogelijk.",
    highlights: [
      "0,12-0,16 mm layers voor premium detail",
      "PLA Matte/PETG voor minis en scenery, TPU voor rubber feet",
      "Persoonlijke EV-levering of pakketdienst voor breekbare prints",
    ],
  },
]

const seasonalSegments: SegmentCard[] = [
  {
    slug: "segments/3d-printing-back-to-school",
    title: "Back to School 3D printing",
    description:
      "Pennenhouders, naamplaatjes, bureau organizers en educatieve STEM-modellen. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
    highlights: [
      "PLA Matte/PETG voor klasmateriaal, TPU antislipvoetjes",
      "Batchen van namen/klassen voor consistente kleur",
      "Planning augustus–september zonder overpromise",
    ],
  },
  {
    slug: "segments/3d-printing-vaderdag-moederdag",
    title: "Vaderdag & Moederdag 3D printing",
    description:
      "Gepersonaliseerde sleutelhangers, desk items en naamcadeaus. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
    highlights: [
      "Silk/Matte PLA voor luxe of zachte look; PETG voor sterkere items",
      "Tekstdiepte en afgeronde randen voor dagelijks gebruik",
      "Batchen van namen/initialen voor consistente afwerking",
    ],
  },
  {
    slug: "segments/3d-printing-valentijn",
    title: "3D printing voor Valentijn",
    description:
      "Hartdecor, naamplaatjes en gifts in Silk, Matte en Translucent PLA. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
    highlights: [
      "Silk/Marble voor glansrijke cadeaus, Matte voor zachte pastels",
      "Uitsparingen voor leds/magneten en antislip feet in TPU",
      "Planning richting 14 februari zonder overpromise",
    ],
  },
  {
    slug: "segments/3d-printing-seasonal",
    title: "Seasonal 3D designs",
    description:
      "Herfst/Halloween, lente/Pasen, zomer, winter/kerst decor. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
    highlights: [
      "Silk/Marble/Translucent PLA voor feestelijke looks",
      "Outdoor props in PETG, antislip in TPU",
      "EV-levering met zones of pakketdienst",
    ],
  },
]

export const metadata: Metadata = {
  title: "3D printing per segment | X3DPrints",
  description: "Landingpaginas voor veelgevraagde 3D print segmenten: prototypes, scholen, modelbouwers en engineers.",
  alternates: { canonical: "https://www.x3dprints.be/segments" },
  openGraph: {
    title: "3D printing per segment",
    description: "Vind de juiste 3D print informatie voor prototypes, onderwijs, modelbouwers en engineers.",
    url: "https://www.x3dprints.be/segments",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function SegmentsPage() {
  const quickLinks = [
    { label: "Prototypes & engineers", href: "/segments/3d-printing-prototypes" },
    { label: "Scholen & Back to School", href: "/segments/3d-printing-back-to-school" },
    { label: "Marketing & seasonal", href: "/segments/3d-printing-marketing" },
    { label: "Makers & tabletop", href: "/segments/3d-printing-makers" },
    { label: "Valentijn (jan–feb)", href: "/segments/3d-printing-valentijn" },
  ]

  const relatedBySlug: Record<string, { label: string; href: string }[]> = {
    "segments/3d-printing-prototypes": [
      { label: "Engineers segment", href: "/segments/3d-printing-engineers" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
    ],
    "segments/3d-printing-scholen": [
      { label: "Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Materials", href: "/materials" },
      { label: "Viewer", href: "/viewer" },
    ],
    "segments/3d-printing-back-to-school": [
      { label: "Scholen segment", href: "/segments/3d-printing-scholen" },
      { label: "Back to School blog", href: "/blog/3d-printen-back-to-school" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
    ],
    "segments/3d-printing-modelbouwers": [
      { label: "Seasonal decor", href: "/segments/3d-printing-seasonal" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Materials", href: "/materials" },
    ],
    "segments/3d-printing-engineers": [
      { label: "Prototypes", href: "/segments/3d-printing-prototypes" },
      { label: "Pricing", href: "/pricing" },
      { label: "3D modelleren", href: "/3d-modelleren" },
    ],
    "segments/3d-printing-marketing": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
    ],
    "segments/3d-printing-makers": [
      { label: "Tabletop minis", href: "/segments/3d-printing-tabletop" },
      { label: "Materials", href: "/materials" },
      { label: "Viewer", href: "/viewer" },
    ],
    "segments/3d-printing-tabletop": [
      { label: "Makers & hobby", href: "/segments/3d-printing-makers" },
      { label: "Materials", href: "/materials" },
      { label: "Contact", href: "/contact" },
    ],
    "segments/3d-printing-vaderdag-moederdag": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Vaderdag/Moederdag blog", href: "/blog/3d-printen-vaderdag-moederdag" },
      { label: "Contact", href: "/contact?material=pla-silk-plus" },
    ],
    "segments/3d-printing-valentijn": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Valentijn landing", href: "/valentijn-3d-printen" },
      { label: "Contact", href: "/contact?material=pla-silk-plus" },
    ],
    "segments/3d-printing-seasonal": [
      { label: "Marketing & events", href: "/segments/3d-printing-marketing" },
      { label: "Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Seasonal blogs", href: "/blog" },
    ],
  }

  const relatedLinks = [
    {
      title: "Onderwijs & Back to School",
      items: [
        { label: "Back to School segment", href: "/segments/3d-printing-back-to-school" },
        { label: "Scholen segment", href: "/segments/3d-printing-scholen" },
        { label: "Back to School blog", href: "/blog/3d-printen-back-to-school" },
      ],
    },
    {
      title: "Marketing & seasonal campagnes",
      items: [
        { label: "Marketing & events", href: "/segments/3d-printing-marketing" },
        { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
        { label: "Seasonal blogs", href: "/blog" },
      ],
    },
    {
      title: "Makers, tabletop & hobby",
      items: [
        { label: "Makers & hobbyisten", href: "/segments/3d-printing-makers" },
        { label: "Tabletop minis", href: "/segments/3d-printing-tabletop" },
        { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      ],
    },
  ]
  const allSegments = [...coreSegments, ...seasonalSegments]

  const itemList = allSegments.map((segment, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://www.x3dprints.be/${segment.slug}`,
    name: segment.title,
  }))

  const faq = [
    {
      q: "Welke segmenten bedient X3DPrints?",
      a: "We werken vaak voor prototypes, scholen, modelbouwers, marketing/events en engineers. Elk segment krijgt eigen materiaal- en workflowtips.",
    },
    {
      q: "Kan ik maatwerk vragen buiten deze segmenten?",
      a: "Ja, de segmenten zijn richtinggevend. Deel je toepassing; we kijken naar materiaal, toleranties en planning.",
    },
    {
      q: "Hoe snel krijg ik een voorstel?",
      a: "Meestal binnen 24 uur na STL/STEP en context. Planning stemmen we af op complexiteit en oplage.",
    },
  ]

  const itemListJsonLd = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: itemList }
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <main className="relative overflow-clip px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />
        <div className="absolute -top-32 left-16 h-[24rem] w-[24rem] rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute -bottom-32 right-10 h-[26rem] w-[26rem] rounded-full bg-sky-200/30 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segmenten</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing per doelgroep
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Van prototypes en onderwijs tot modelbouwers, marketingteams en engineers: kies je segment en ontdek hoe X3DPrints het verschil maakt.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-700">
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            Material Suggestion Tool
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            Lees de blog
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-12 max-w-5xl space-y-6">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xl font-semibold text-slate-900">Kernsegmenten</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Prototypes, onderwijs, marketing</span>
        </div>
        {coreSegments.map((segment) => (
          <GlassCard key={segment.slug} className="p-6 sm:p-8">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{segment.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{segment.description}</p>
              </div>
              <Link
                href={`/${segment.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white sm:mt-0"
              >
                Naar segment <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
              {segment.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-5xl space-y-6">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xl font-semibold text-slate-900">Seasonal & campagnes</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Tijdelijke periodes</span>
        </div>
        {seasonalSegments.map((segment) => (
          <GlassCard key={segment.slug} className="p-6 sm:p-8">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Seasonal</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{segment.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{segment.description}</p>
              </div>
              <Link
                href={`/${segment.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white sm:mt-0"
              >
                Naar segment <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
              {segment.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            {relatedBySlug[segment.slug] && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {relatedBySlug[segment.slug].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-5xl space-y-4 px-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Interne links tussen segmenten</h2>
          <p className="mt-2 text-sm text-slate-700">
            Combineer trajecten: back-to-school draait in augustus–september, seasonal campagnes koppelen we aan marketing, en makers vinden vaak ook tabletop of materiaaladvies interessant.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedLinks.map((group) => (
              <div key={group.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-sm font-semibold text-slate-900">{group.title}</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="underline decoration-slate-300 hover:decoration-slate-500">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">FAQ over segmenten</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            {faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-base font-semibold text-slate-900">{item.q}</p>
                <p className="mt-1 text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <ReadMoreLinks
        title="Verder met je segment"
        intro="Kies een segment en koppel het aan materialen, pricing en een concrete aanvraag."
        primaryLinks={[
          { label: "3D print service", href: "/services" },
          { label: "Materialen & richtlijnen", href: "/materials" },
          { label: "Prijzen & calculator", href: "/pricing" },
        ]}
        secondaryLinks={[
          { label: "Portfolio", href: "/portfolio" },
          { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
          { label: "Offerte aanvragen", href: "/contact" },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
    </main>
  )
}
