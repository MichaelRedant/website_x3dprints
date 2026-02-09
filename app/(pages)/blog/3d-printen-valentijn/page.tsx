import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/3d-printen-valentijn/"
const ogImage = "https://www.x3dprints.be/images/og-home.jpg"
const datePublished = "2025-01-05"
const dateModified = "2026-02-09"

export const metadata: Metadata = {
  title: "3D printen voor Valentijn 2026 | X3DPrints Blog",
  description:
    "Hartdecor, gepersonaliseerde gifts en lichtobjecten voor Valentijn 2026 in Silk, Matte en Translucent PLA. Checklist voor materiaal, leds en leveringsopties. Ontwerpbestand niet inbegrepen.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor Valentijn 2026",
    description:
      "Kies Silk/Matte/Translucent PLA voor Valentijn 2026 gifts, naamplaatjes en lichtobjecten. Tips voor leds, magneten en leverzones.",
  url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte Valentijn decor" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor Valentijn 2026",
    description: "Silk/Matte/Translucent PLA voor Valentijn 2026 hartdecor, naamplaatjes en gifts. Inclusief lever- en materiaalchecklist.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "PLA Silk of Marble voor glansrijke hartvormen en naamplaatjes; Matte PLA voor zachte pastels.",
  "Translucent PLA (wand 1.6-2 mm) voor lichtobjecten met fairy lights; laat ventilatie voor leds.",
  "Integreer oogjes of pin-holes voor magneten en maak tekst minstens 0.6 mm dik voor leesbaarheid.",
  "Ontwerp/model niet inbegrepen: lever STL/STEP of kies ontwerpservice aan EUR 45/uur.",
  "Leveropties: EV-zones of pakketdienst. Breekbare stukken verpakken we gescheiden; afhalen in Herzele kan gratis.",
]

const materialRows = [
  { material: "PLA Silk / Marble", use: "Hartdecor, naamplaatjes, gifts", note: "Luxe look, indoor" },
  { material: "PLA Matte", use: "Zachte pastels en tafeldecor", note: "Strakke finish, snel te printen" },
  { material: "Translucent PLA", use: "Lichtobjecten en lantaarns", note: "Wand 1.6-2 mm, ventilatie voorzien" },
  { material: "PETG", use: "Outdoor of warmere omgeving", note: "Hittebestendiger dan PLA" },
]

const checklist = [
  "Formaat + toepassing (tafelstuk, giftbox, etalage, gadget).",
  "Materiaal: Silk/Marble voor luxe, Matte voor zachte look, Translucent voor licht.",
  "Afwerking: raw, licht geschuurd of geprimed; noteer of je zelf schildert.",
  "Bevestiging: lint, magneet of voetje? Voorzie gaten of pin-holes.",
  "Deadline rond 14 februari 2026 + leveroptie (EV-zone of pakketdienst).",
]

const faqItems = [
  {
    q: "Maken jullie ook het ontwerp?",
    a: "Ja, optioneel. Het 3D model is niet inbegrepen. Lever STL/STEP of kies ontwerpservice aan EUR 45/uur; we stemmen wanddiktes, tekst en supports af.",
  },
  {
    q: "Welke filamentkleuren raden jullie aan?",
    a: "Silk rood, goud of parel voor luxe gifts. Matte pastel voor zachte look. Translucent voor lantaarns of lichtgevende tafeldecor.",
  },
  {
    q: "Kan ik last-minute nog iets laten printen?",
    a: "Vaak wel, afhankelijk van oplage en afwerking. Vermeld je datum en gewenste levering; we plannen realistisch zonder overpromise.",
  },
  {
    q: "Zijn leds of magneten inbegrepen?",
    a: "Nee. We voorzien wel pin-holes of uitsparingen zodat je ze eenvoudig kunt plaatsen. Voeg link of maat van je leds/magneten toe.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/valentijn2.webp", alt: "3D geprint Valentijn duo decor" },
  { src: "/images/portfolio/valentijn3.webp", alt: "3D geprinte Valentijn hart decor" },
  { src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp", alt: "3D geprint Valentijn figuur articulated" },
  { src: "/images/portfolio/vaas-capsule-planter-scaled.webp", alt: "Valentijn vaas idee" },
  { src: "/images/portfolio/vaas-spiral-2-3-scaled.webp", alt: "Valentijn decor met spiraal" },
]

const valentijnVideos = [
  {
    id: "js1994tDE18",
    title: "Valentijn articulated print",
    description: "Korte video van de articulated Valentijn boy in Silk PLA met flexibele gewrichten.",
  },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 9 februari 2026"

const references = [
  { label: "Ultimaker: Design for FFF 3D printing", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Prusa: Material guide (PLA, PETG, TPU)", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk: STL file format", href: "https://help.autodesk.com/cloudhelp/2014/ENU/Alias/files/GUID-8ABFA3B8-204B-44E0-A50B-BA4C1C3F9BE8.htm" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor Valentijn 2026",
  description: metadata.description ?? "",
  datePublished: datePublished,
  dateModified,
  image: ogImage,
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

export default function BlogValentijn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor Valentijn 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Gepersonaliseerde gifts, tafeldecor en lichtobjecten in Silk, Matte of Translucent PLA. Ontwerpbestand niet inbegrepen; lever STL/STEP of kies ontwerpservice (EUR 45/uur). Levering via EV-zones of pakketdienst.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?material=pla-silk">Plan je Valentijnprint 2026</ShimmerButton>
              <Link
                href="/segments/3d-printing-valentijn"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Naar Valentijn segment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="valentine-materials" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materialen & settings</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Gebruik</th>
                      <th className="py-2 pr-4">Notities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialRows.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.use}</td>
                        <td className="py-3 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Voor tafeldecor kies Silk/Marble PLA, voor zachte cadeaus Matte PLA. Voor lichtobjecten werkt Translucent het best met dunne wanden en een diffuse led. Outdoor? Schakel naar PETG en vermijd donkere kleuren in volle zon.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Levering: EV-zones of pakketdienst. Breekbare delen verpakken we gescheiden; grote decor kan modulair zodat lijmnaden verborgen blijven.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 id="valentine-checklist" className="scroll-mt-28 text-xl font-semibold tracking-tight text-slate-900">
                Checklist
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Extra: voeg je kleurenpalet of PMS/HEX-codes toe; we matchen met Silk/Marble/Translucent varianten. Wil je inspiratie of STL&apos;s zoeken, kijk op{" "}
                <Link
                  href="https://www.printables.com"
                  className="text-rose-700 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Printables (extern)
                </Link>{" "}
                en stuur referenties mee.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="valentine-examples" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Voorbeelden</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow ${idx === inspirationImages.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === inspirationImages.length - 1 ? 960 : 640}
                      height={idx === inspirationImages.length - 1 ? 540 : 480}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 320px, 100vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600">
                Plaatshouders totdat we extra Valentijn foto&apos;s toevoegen. Denk aan hartvormige naamplaatjes, ringenhouders en lantaarns.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="valentine-video" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Video</h2>
                  <p className="text-sm text-slate-700">Bekijk de articulated Valentijn print in actie (lichte embed, speelt op de pagina).</p>
                </div>
                <Link
                  href="https://youtu.be/js1994tDE18"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-rose-700 underline decoration-rose-200 underline-offset-2"
                >
                  Open op YouTube -&gt;
                </Link>
              </div>
              <div className="mt-4">
                <VideoGallery videos={valentijnVideos} highlightIds={["js1994tDE18"]} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="valentine-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Waarom nu plannen?</h2>
              <p className="mt-3 text-sm text-slate-700">
                Valentijn piekt midden februari. Door op tijd te boeken kunnen we modellen optimaliseren (tekstdiepte, wanddikte, magneet/led uitsparingen) en productie inplannen zonder rush fees.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Snelle iteraties op tekst, font en formaat.</li>
                <li>EV-levering voor breekbare sets, pakketdienst voor verder weg.</li>
                <li>Optioneel primer/schuren zodat je meteen kan schilderen.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Belangrijk: ontwerpbestand niet inbegrepen. Lever STL/STEP of laat ons ontwerpen (EUR 45/uur). Voeg deadline + leveroptie toe in{" "}
                <Link href="/contact" className="text-rose-700 underline">
                  je aanvraag
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">SEO inspiratiehoek</h3>
              <p className="mt-2 text-sm text-slate-700">
                Zoek je &quot;3D geprint Valentijn cadeau&quot;, &quot;Silk PLA hart&quot;, &quot;Translucent lantaarn&quot;, &quot;gepersonaliseerde naamplaat&quot; of &quot;Valentijn etalage prop&quot;? Dit artikel bundelt materiaalkeuze (Silk/Matte/Translucent, PETG, TPU) en support-tips.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Populaire opdrachten: naamplaatjes, ring trays, sleutelhangers, tafeldecor met led, QR-ornamenten naar een playlist en giftbox inserts. Wanddikte &gt;1.2 mm voor hangers, 1.6-2 mm voor lichtobjecten.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <ShimmerButton href="/contact?material=pla-silk">Start je Valentijn aanvraag</ShimmerButton>
                <Link
                  href="/segments/3d-printing-valentijn"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Valentijn segment
                </Link>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Material Suggestion Tool
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="valentine-faq" className="scroll-mt-28 px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ Valentijn</h2>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-3">
                    <p className="font-semibold text-slate-800">{item.q}</p>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-700">
                Niet gevonden wat je zoekt? Stuur je vraag en model via{" "}
                <Link href="/contact" className="text-rose-700 underline underline-offset-2">
                  contact
                </Link>{" "}
                met deadline en leveroptie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="valentine-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-2xl font-bold tracking-tight text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-rose-700 hover:text-rose-600"
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogAuthorNote locale="nl" />

      <BlogReadMore />

    </main>
  )
}











