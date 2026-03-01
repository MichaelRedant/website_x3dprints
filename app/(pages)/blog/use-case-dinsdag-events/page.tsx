import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ } from "@/content/blog-faq"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-events/"
const publishedDate = "2025-12-30T08:00:00+01:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ["use-case-dinsdag-events"]

export const metadata: Metadata = {
  title: "Use Case Dinsdag #6: 3D printen voor evenementen, expo & beurzen",
  description:
    "Schaalbare branding, props en marketingdisplays voor events. Leer wanneer PLA, PETG en TPU werken, hoe je warmte en transport aankan en waar de grenzen liggen.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #6: Events, expo & beurs 3D prints",
    description:
      "Gids voor eventbureaus en standbouwers: materiaalkeuze, spotlight realiteit, modulaire designs en kost/timing voor FDM prints.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D printen voor evenementen",
      "3D print props",
      "marketing displays 3D printen",
      "Use Case Dinsdag",
    ],
    images: [{ url: "/images/og-home-nl.svg", width: 1200, height: 630, alt: "Event props en expo displays" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: 3D printen voor evenementen",
    description:
      "Wanneer gebruik je PLA Matte, Marble of PETG voor branding, props en standbouwers? Deze gids geeft antwoorden.",
    images: ["/images/og-home-nl.svg"],
  },
}

const heroStats = [
  { label: "Brand assets", value: "PLA Matte", detail: "Strakke logo's en panelen" },
  { label: "Structureel", value: "PETG", detail: "Mounts, houders, transportproof" },
  { label: "Flex zones", value: "TPU", detail: "Antislip en kabelmanagement" },
]

const eventUseCases = [
  {
    title: "Branding & signage",
    detail:
      "PLA Matte logo's, letters en badges met 3-6 mm dikte. Lage layer visibility en veel kleuren maken het ideaal voor premium stands.",
  },
  {
    title: "Props & demo objecten",
    detail:
      "PLA Marble voor steenachtige trofeeën, PLA Silk+ of PLA Metal voor metallic highlights. Perfect voor fotobooths en productdemo's.",
  },
  {
    title: "Houders en clips",
    detail:
      "PETG voor tablet mounts, sensorhouders en bracket systems. Taai genoeg voor herhaalde montage en transport.",
  },
  {
    title: "Laatste-minuut onderdelen",
    detail:
      "Kabelclips, afstandsbussen en passtukken kunnen binnen uren geprint worden zodat installaties niet stilliggen.",
  },
]

const materialMatrix = [
  {
    name: "PLA Matte",
    use: "Zichtwerk, logo's, props",
    note: "Beste afwerking, let op hotspots >55 °C.",
    link: { label: "PLA Matte gids", href: "/blog/filament-vrijdag-pla" },
  },
  {
    name: "PLA Marble / Silk+ / Metal",
    use: "Eyecatchers, sculpturen, trofeeën",
    note: "Textuur en glans zonder extra lakwerk.",
    link: { label: "PLA Marble", href: "/blog/filament-vrijdag-pla-marble" },
    extra: [
      { label: "PLA Silk+", href: "/blog/filament-vrijdag-pla-silk-plus" },
      { label: "PLA Metal", href: "/blog/filament-vrijdag-pla-metal" },
    ],
  },
  {
    name: "PETG",
    use: "Mounts, houders, structurele stukken",
    note: "Tot ~80 °C stabiel, geschikt voor inserts.",
    link: { label: "PETG gids", href: "/blog/filament-vrijdag-petg" },
  },
  {
    name: "TPU",
    use: "Antislip voeten, flexibele clips, kabelklemmen",
    note: "Perfect voor bescherming van standbouwmateriaal.",
    link: { label: "TPU gids", href: "/blog/filament-vrijdag-tpu" },
  },
]

const designPrinciples = [
  "Booths vragen series van 20-200 stuks. We nesten onderdelen en draaien parallel op meerdere printers.",
  "Kleurconsistentie komt uit de vaste PLA Matte/PETG paletten in /materials.",
  "Transport proof: screw bosses verstevigen, wanden 1.6-2.4 mm, ribben toevoegen, clips in PETG of TPU.",
  "Modulaire opbouw via dovetails, alignment pins en verborgen M3 inserts zodat grote props in segmenten passen.",
]

const popularPrints = [
  { title: "3D logo's voor achterwanden", detail: "PLA Matte of Silk+, 3-6 mm dik, zelfklevend of met pinnen." },
  { title: "Display stands", detail: "PETG voor draagkracht, combineer met PLA covers voor branding." },
  { title: "Vrijstaande props", detail: "PLA Marble voor steenlook, PLA Metal voor industriële feel." },
  { title: "Sensor- en tablet mounts", detail: "PETG + inserts zodat schroeven veilig klemmen." },
  { title: "Kabelmanagement", detail: "TPU clips en PETG kabeldragende stukken voor nette booths." },
]

const avoidList = [
  "Geen volledige aflak- of airbrushprojecten: dat blijft werk voor gespecialiseerde lakkerijen. Zie Finishing Friday.",
  "Geen monolithische props van 1.5 meter: we splitsen alles in modulaire modules met duidelijke verbindingen.",
  "Geen engineering van complete boothconstructies: we leveren onderdelen die integreren in bestaande systemen.",
]

const costTiming = [
  { title: "Deadlines zijn hard", detail: "Parallel printen kan veel, maar grote volumes vragen planning en spoolvoorraad." },
  {
    title: "Printtijd = kostendrijver",
    detail: "PLA is snel, PETG iets trager door hogere temperatuur, TPU is traagst. Kies het juiste materiaal per onderdeel.",
  },
  {
    title: "Voorbereiding wint",
    detail: "Stuur STL/STEP en gewenste finish vroeg door zodat slicing en nesting meteen starten.",
  },
]

const choose3dPrinting = [
  {
    title: "Kies 3D printen wanneer",
    bullets: [
      "Organische vormen of custom texturen nodig zijn.",
      "Je meerdere identieke stukken binnen dagen nodig hebt.",
      "Lichte, veilige materialen belangrijk zijn voor transport.",
      "Een textuur zoals marble, wood of metal sheen gewenst is.",
    ],
  },
  {
    title: "Vermijd 3D printen wanneer",
    bullets: [
      "Massieve vlakke panelen nodig zijn (kies dan hout of foam).",
      "Load-bearing onderdelen jaren buiten moeten overleven.",
      "UV-buitenprops meer dan één seizoen moeten doorstaan.",
    ],
  },
]

const ctaLinks = [
  { label: "Materialenoverzicht", href: "/materials" },
  { label: "PLA Matte gids", href: "/blog/filament-vrijdag-pla" },
  { label: "PETG gids", href: "/blog/filament-vrijdag-petg" },
  { label: "TPU gids", href: "/blog/filament-vrijdag-tpu" },
  { label: "Prijsinschatting", href: "/pricing" },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const references = [
  { label: "Ultimaker: Design for FFF 3D printing", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Prusa: Material guide (PLA, PETG, TPU)", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Bambu Lab: PETG filament guide", href: "https://wiki.bambulab.com/en/filament/petg" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Use Case Dinsdag #6: 3D printen voor evenementen, expo en beurzen",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
})

function SectionDivider() {
  return (
    <div className="mx-auto my-12 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Use Case Dinsdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function UseCaseDinsdagEventsPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(59,130,246,0.14),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Use Case Dinsdag</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Events & beurzen</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #6</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor evenementen, expo en beurzen: snel, schaalbaar en impactvol.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Deadlines verschuiven niet, maar props, branding en demo-objecten moeten licht, stevig en reproduceerbaar zijn.
              Daarom gebruiken eventbureaus en standbouwers steeds vaker FDM-printen voor visuele statements en slimme montages.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=use-case-events">Vraag event-advies</ShimmerButton>
              <Link
                href="/segments/3d-printing-marketing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Segment marketing & events
              </Link>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenoverzicht
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 30 december 2025 - Use Case Dinsdag.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <SectionDivider />

      <section id="events-use-cases" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {eventUseCases.map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-materials" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Materialen voor expo&apos;s en beurzen</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {materialMatrix.map((material) => (
                  <div key={material.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{material.name}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      <span className="font-semibold">Gebruik:</span> {material.use}
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Let op:</span> {material.note}
                    </p>
                    <Link
                      href={material.link.href}
                      className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {material.link.label}
                      <span aria-hidden className="ml-2">-&gt;</span>
                    </Link>
                    {material.extra ? (
                      <div className="mt-2 flex flex-wrap gap-3 text-sm font-semibold text-indigo-600">
                        {material.extra.map((extra) => (
                          <Link key={extra.href} href={extra.href} className="transition hover:text-indigo-500">
                            {extra.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Gebruik</th>
                      <th className="py-2 pr-4">Let op</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialMatrix.map((material) => (
                      <tr key={material.name}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{material.name}</td>
                        <td className="py-3 pr-4">{material.use}</td>
                        <td className="py-3 pr-4">{material.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-heat" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">3. Spotlight realiteit: warmte en vervorming</h2>
              <p className="text-sm text-slate-600">
                LED spots van 3500-6000 lumen warmen objecten snel op tot 45-60 °C. Vermijd PLA vlak onder spots, gebruik PETG
                voor houders dichtbij warmtebronnen en combineer materialen: PLA Matte cover plus PETG kern voor ribben en
                hittebestendigheid.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Referentie voor materiaalgedrag vind je in{" "}
                <Link
                  href="https://wiki.bambulab.com/en/materials"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Bambu Lab materiaalprofielen
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-design" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Designprincipes voor event-producties</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {designPrinciples.map((principle) => (
                  <li key={principle} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    {principle}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-popular" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {popularPrints.map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-avoid" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Wat we niet doen</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {avoidList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Meer over finishing in{" "}
                <Link
                  href="/blog/finishing-friday-schuren-primen-lakken"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Finishing Friday
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-cost" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Kost en timing</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {costTiming.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Raadpleeg{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                voor een realistische raming per batch.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Wanneer kies je 3D printen?</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {choose3dPrinting.map((block) => (
                  <div key={block.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{block.title}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {block.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-when" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Conclusie: event-superpower</h2>
              <p className="text-sm text-slate-600">
                Events vragen snelheid, creativiteit en flexibiliteit. FDM is het Zwitsers zakmes voor marketingteams: het levert
                prototypes, productiemiddelen en visuele effecten in hetzelfde traject. Wanneer materiaalkeuze en montage juist
                zijn, oogt een print professioneler dan foam of hout en overleeft hij transport en breakdown.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="events-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        {reference.label}
                      </a>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  Props, branding elementen of boothonderdelen nodig?
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL/STEP, vermeld aantallen en leverdata. We plannen parallelle prints, adviseren materialen en leveren
                  transportklare sets.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-indigo-600">
                  {ctaLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="transition hover:text-indigo-500">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=use-case-events">Start intake</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Upload via viewer
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <BlogFaq title={faq.title} items={faq.items} mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="nl" />


    </main>
  )
}








