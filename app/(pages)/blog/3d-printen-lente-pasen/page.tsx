import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-lente-pasen/"
const datePublished = "2024-03-15"
const dateModified = "2026-02-08"

export const metadata: Metadata = {
  title: "3D printen voor lente en Pasen | X3DPrints Blog",
  description:
    "Pastel decor, paasornamenten en lichtobjecten in Silk, Matte en Translucent PLA. Tips voor supports, magneten, levering en ontwerpservice (model niet inbegrepen).",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor lente en Pasen",
    description:
      "Eieren, konijnen, bloemdecor en lantaarns in pastel PLA of Translucent. Slicer-tips, afwerking en leverzones.",
  url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte paasdecor" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor lente en Pasen",
    description: "Pastel PLA en Translucent lantaarns, met tips voor supports, magneten en levering.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Gebruik Silk of Matte PLA in pastelkleuren voor eieren, konijnen en ornamenten; Translucent voor lichtobjecten.",
  "Layerhoogte 0,16-0,2 mm; houd wanddikte >1,2 mm voor stevige hangers aan takken.",
  "Integreer oogjes of pin-holes voor haakjes/magneten zodat ornamenten niet breken.",
  "Ontwerp/model niet inbegrepen: lever STL/STEP of kies ontwerpservice aan €45/uur.",
  "Voor buiten decor: kies PETG voor betere UV/vocht bestendigheid en vermijd donkere kleuren in volle zon.",
]

const checklist = [
  "Noteer formaat en ophangwijze (lint, haak, magneet) en of er leds/batterijen in moeten.",
  "Materiaalkeuze: pastel Silk/Matte PLA voor look, Translucent voor glow, PETG voor outdoor.",
  "Afwerking: raw, licht geschuurd of geprimed. Vermeld of je direct wil schilderen.",
  "Leveroptie: EV-zone of pakketdienst; afhalen kan. Geef deadline en bestemming mee.",
]

const materialRows = [
  { material: "PLA Silk/Matte", use: "Pastel decor en ornamenten", note: "Visuele finish, indoor" },
  { material: "Translucent PLA", use: "Lichtobjecten en lantaarns", note: "Wanddikte 1,6-2 mm voor glow" },
  { material: "PETG", use: "Outdoor decor", note: "Beter tegen UV en vocht" },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const tocItems = [
  { id: "lente-materials", label: "Materialen & checklist" },
  { id: "lente-examples", label: "Voorbeelden" },
  { id: "lente-why", label: "Waarom nu plannen" },
  { id: "lente-faq", label: "FAQ" },
  { id: "lente-sources", label: "Bronnen en referenties" },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Autodesk: STL file format", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const faqItems = [
  {
    q: "Kunnen jullie gepersonaliseerde paaseieren of naamhangers printen?",
    a: "Ja. Lever een STL/STEP met naam of logo, of laat ons ontwerpen aan €45/uur. We printen in Silk of Matte pastel PLA voor een nette afwerking.",
  },
  {
    q: "Wat is het beste materiaal voor lichtgevende paasdecor?",
    a: "Translucent PLA met wanddikte 1,6-2 mm geeft een zachte gloed. Houd openingen voor leds/batterijen en zorg voor ventilatie bij warme leds.",
  },
  {
    q: "Hoe worden breekbare decorstukken geleverd?",
    a: "We verpakken gescheiden met schuim en leveren via EV-zones (Zone 1 €15, Zone 2 €30, Zone 3 €45) of pakketdienst. Afhalen in Herzele kan gratis.",
  },
  {
    q: "Is het 3D model inbegrepen?",
    a: "Nee. Het ontwerpbestand is niet inbegrepen in de printprijs. Lever STL/STEP of kies onze ontwerpservice aan €45/uur; we optimaliseren wanddiktes en supports.",
  },
  {
    q: "Welke afwerking raden jullie aan?",
    a: "Voor pastel PLA volstaat vaak raw of licht schuren. Wil je schilderen, vraag dan een grijze primer. Voor Translucent lichtobjecten is primer niet nodig.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor lente & Pasen",
  description:
    "Pastel decor, paasornamenten en lichtobjecten in Silk, Matte en Translucent PLA. Tips voor supports, magneten en levering.",
  datePublished,
  dateModified,
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

const inspirationImages = [
  { src: "/images/portfolio/easter1.webp", alt: "3D geprinte paasdecor set 1" },
  { src: "/images/portfolio/Easter2.webp", alt: "3D geprinte paasdecor set 2" },
  { src: "/images/portfolio/Easter3.webp", alt: "3D geprinte paasdecor set 3" },
  { src: "/images/portfolio/Easter4.webp", alt: "3D geprinte paasdecor set 4" },
  { src: "/images/portfolio/Easter5.webp", alt: "3D geprinte paasdecor set 5" },
]

export default function BlogSpringEaster() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-amber-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor lente & Pasen
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Paashangers, eieren, konijnen en bloemdecor in pastel PLA of Translucent. Ontwerpbestand niet inbegrepen; lever
              STL/STEP of kies ontwerpservice (€45/uur). EV-levering voor breekbare ornamenten of pakketdienst als je verder zit.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Plan je paasprints</ShimmerButton>
              <Link
                href="/segments/3d-printing-seasonal"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Naar seasonal segment
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Material Suggestion Tool
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="lente-materials" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Voor tafelcentrumstukken kies je Marble of Silk PLA. Voor buiten decor is PETG beter tegen zon/vocht. Wil je licht
                doorlaten, kies Translucent en vermijd te dikke wanden om hotspots te voorkomen.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Levering: EV-zones of pakketdienst. Breekbare delen verpakken we gescheiden; grote decor kan in modules zodat de
                binnenkant netjes blijft.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Extra: pin-holes voor magneten (2x1 of 3x2 mm) voor displays en paasbomen. Vraag primer als je wil schilderen; anders
                volstaat raw voor pastel PLA.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="lente-examples" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                Foto&apos;s tonen pastel PLA en Translucent paasdecor: eieren, ornamenten, lantaarns en mand/decor sets (Easter1-5).
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="lente-why" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Waarom nu plannen?</h2>
              <p className="mt-3 text-sm text-slate-700">
                Lente- en paasdecor kent piekperiodes in maart-april. Door op tijd te boeken kunnen we ontwerpen optimaliseren
                (wanddikte, supports, splitsing) en levering inplannen voor events of retail.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Snelle iteraties op formaat, bevestigingen en materiaalkeuze.</li>
                <li>EV-levering voor breekbare sets of pakketdienst voor verder weg.</li>
                <li>Optioneel primer/schuren zodat je direct kan schilderen.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Herinnering: het 3D model is niet inbegrepen in de printprijs. Lever STL/STEP of laat ons ontwerpen aan €45/uur.
                Vermeld je eventdatum en leveroptie bij de aanvraag.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">SEO inspiratiehoek</h3>
              <p className="mt-2 text-sm text-slate-700">
                Zoek je “3D geprinte paasdecor”, “3D print paas eieren”, “Translucent paas lantaarn”, “pastel PLA konijn” of
                “custom paas hangers”? Dit artikel bundelt materiaalkeuze (Silk/Matte pastel, Translucent, PETG, TPU) en
                support-tips zodat je snel beslist.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Populaire opdrachten: paasei sets met naam, bunny ornaments, bloem-embellishments, centerpieces, lantaarns met
                fairy lights en antislip feet in TPU voor trays. Wanddikte &gt;1,2 mm voor hangers, 1,6-2 mm voor lantaarns.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <ShimmerButton href="/contact">Start je paasaanvraag</ShimmerButton>
                <Link
                  href="/segments/3d-printing-seasonal"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Seasonal segment
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="lente-faq" className="scroll-mt-28 px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ lente & Pasen</h2>
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
                <Link href="/contact" className="text-indigo-700 underline underline-offset-2">
                  contact
                </Link>{" "}
                met deadline en leveroptie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="lente-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}









