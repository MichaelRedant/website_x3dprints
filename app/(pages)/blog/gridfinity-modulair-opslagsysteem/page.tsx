import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import GlassCard from "@/components/GlassCard"
import OrganizerCta from "@/components/OrganizerCta"
import Faq from "@/components/Faq"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/gridfinity-modulair-opslagsysteem/"
const publishedDate = "2026-01-30T08:00:00+01:00"
const dateModified = "2026-02-08T08:00:00+01:00"

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const references = [
  { label: "Gridfinity specification (GitHub)", href: "https://github.com/gridfinity-unofficial/specification" },
  { label: "Prusa: Materials overview", href: "https://help.prusa3d.com/filament-material-guide" },
]

const GRID_IMAGES = [
  { src: "/images/organizers/modugrid/ModuGrid1.webp", alt: "Gridfinity lade overzicht (bovenaan)", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid2.webp", alt: "Gridfinity lade met schroeven en bits", width: 1600, height: 900 },
  { src: "/images/og-blog-nl.svg", alt: "Gridfinity bakjes met labels en antislip", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid4.webp", alt: "Gridfinity bakjes voor bureau tools", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid5.webp", alt: "Gridfinity detail met labelrand", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid6.webp", alt: "Gridfinity insert met antislip", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid7.webp", alt: "Gridfinity lade in gebruik", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid8.webp", alt: "Custom Gridfinity vak voor multimeter", width: 1600, height: 900 },
]

const FAQ_ITEMS = [
  {
    q: "Heb ik STL-bestanden nodig om Gridfinity te bestellen?",
    a: "Nee. Stuur foto + binnenmaten van je lade of koffer en wat er in moet. Wij modelleren de juiste bins en leveren plug-and-play.",
  },
  {
    q: "Welke magneten passen in Gridfinity?",
    a: "Standaard 6×2 mm magneten in elke hoek. Voor zwaar gebruik kunnen we M3-schroeven voorzien om de baseplate of bins te fixeren.",
  },
  {
    q: "Welk materiaal kies ik voor Gridfinity bins?",
    a: "PLA Matte voor bureaulades en zichtwerk; PETG voor transport/warme omgevingen. Optioneel antislip-bodem en in-print labels.",
  },
  {
    q: "Kun je een custom bin voor één specifieke tool maken?",
    a: "Ja. Stuur een top-down foto, L×B×H (of diameter × hoogte), gewenste oriëntatie en aantal. We tekenen een pocket, delen een preview en passen aan tot het klopt.",
  },
  {
    q: "Werkt Gridfinity in koffers zoals Milwaukee Packout?",
    a: "Ja. We maken baseplates op maat van de koffermaat en houden de 42 mm grid aan. Zo blijven alle bins compatibel met je bestaande setup.",
  },
  {
    q: "Hoe lang duurt levering?",
    a: "Typisch enkele werkdagen na intake, afhankelijk van aantal bins en materiaal. Deel foto + maten + gewenste U-hoogte voor de snelste flow.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Gridfinity: modulair opslagsysteem",
  description:
    "Gridfinity uitgelegd: raster, magneten, labels, toepassingen en hoe X3DPrints maatwerk bins, starterkits en Packout-inlays levert.",
  datePublished: publishedDate,
  dateModified,
  image: "/images/og-blog-nl.svg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: FAQ_ITEMS.map((item) => ({ q: item.q, a: item.a })),
})

export const metadata: Metadata = {
  title: "Gridfinity: modulair opslagsysteem + maatwerk door X3DPrints",
  description:
    "Gridfinity uitgelegd: 42×42-raster, 7 mm hoogtes, magneten, labels, toepassingen en hoe X3DPrints custom bins en Packout-inlays levert.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": "https://www.x3dprints.be/en/blog/gridfinity-modular-storage-system",
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Gridfinity: modulair opslagsysteem | X3DPrints",
    description:
      "Wat Gridfinity is, waarom het werkt en hoe X3DPrints maatwerk bins, starterkits en Packout-inlays ontwerpt en print.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["gridfinity", "tool organizer", "packout inlay", "custom bins"],
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "Gridfinity bins op maat" }],
  },
  twitter: { card: "summary_large_image" },
}

export default function GridfinityBlogNl() {
  return (
    <main className="px-6 pb-16 sm:px-8 lg:px-12">
      <article className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-4 pt-10 sm:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Gridfinity · gids</p>
          <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Gridfinity: het modulaire opslagsysteem dat werkplaatsen, hobbyruimtes en bedrijven transformeert
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-200">
            Waarom het 42×42×7‑mm raster zoveel fans heeft en hoe X3DPrints custom bins, starterkits en Packout-inlays ontwerpt zodat jij orde en
            tijdswinst koopt – niet plastic.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span>{lastUpdatedLabel}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
              Gridfinity explained
            </span>
          </div>
        </header>

      <BlogContentOverview locale="nl" />

        <section id="grid-what" className="scroll-mt-28 space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Wat is Gridfinity?</h2>
          <p>
            Gridfinity gebruikt een gestandaardiseerd raster van 42 × 42 mm en hoogte-eenheden van 7 mm. Bins passen per gridcel en stapelen per
            U‑unit. Magnet pockets voor 6×2‑mm magneten zorgen dat trays vastliggen; M3-schroeven kunnen voor extra fixatie. Labelranden (bv. 9‑mm
            tape) houden alles visueel helder. PLA of PETG zijn ideaal: strak, stevig en snel te printen.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Compatibel tussen ontwerpers en printers – alles blijft uitwisselbaar.</li>
            <li>Customiseerbaar tot op de millimeter: elke tool krijgt een eigen pocket.</li>
            <li>Schaalbaar van één lade tot een volledige muur of Packout-koffer.</li>
          </ul>
        </section>

        <section id="grid-why" className="scroll-mt-28 space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Waarom zo populair?</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong>Modulaire perfectie:</strong> het 42‑mm raster houdt baseplates en bins compatibel.
            </li>
            <li>
              <strong>Personaliseerbaar:</strong> elke tool kan een exact passende bin krijgen.
            </li>
            <li>
              <strong>Schaalbaar:</strong> start klein, breid uit zonder standaarden te breken.
            </li>
          </ol>
          <p>Geschikt voor hobbyisten, elektriciens, houtbewerkers, modelbouwers én industriële flows.</p>
        </section>

        <section className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {GRID_IMAGES.slice(0, 3).map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl border border-white/60 shadow ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {GRID_IMAGES.slice(3, 6).map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl border border-white/60 shadow ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Deze beelden tonen combinaties van labelzones, antislip en custom pockets voor meetapparatuur, hobby en werkplaats.
          </p>
        </section>

        <section id="grid-specs" className="scroll-mt-28 space-y-4 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gridfinity in cijfers</h2>
          <GlassCard className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-4">Spec</th>
                  <th className="py-2 pr-4">Waarde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">Grid raster</td>
                  <td className="py-3 pr-4">42 × 42 mm</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">Hoogte-unit</td>
                  <td className="py-3 pr-4">7 mm (U‑unit)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">Magnet pockets</td>
                  <td className="py-3 pr-4">6 × 2 mm</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">Nominale binbreedte</td>
                  <td className="py-3 pr-4">41,5 mm</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">Labelrand</td>
                  <td className="py-3 pr-4">9‑mm tape</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">Materialen</td>
                  <td className="py-3 pr-4">PLA of PETG</td>
                </tr>
              </tbody>
            </table>
          </GlassCard>
        </section>

        <section id="grid-core" className="scroll-mt-28 space-y-4 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technische kern</h2>
          <GlassCard className="space-y-2">
            <p>
              <strong>Raster & maten:</strong> 42×42 mm, 7‑mm U’s; nominale binbreedte 41,5 mm voor soepele fit.
            </p>
            <p>
              <strong>Magneten:</strong> 6×2‑mm magnet pockets in hoeken; optioneel M3-schroeven voor transport.
            </p>
            <p>
              <strong>Labels:</strong> labelrand compatibel met 9‑mm tape voor snelle herkenning.
            </p>
            <p>
              <strong>Materialen:</strong> PLA Matte voor bureaulades; PETG voor transport of warmere omgevingen.
            </p>
            <p>
              <strong>Generators:</strong> online tools (GridfinityCreator, Perplexing Labs) en parametrische libs (Build123d, CadQuery, OpenSCAD) maken
              custom bins in minuten.
            </p>
          </GlassCard>
        </section>

        <section id="grid-use" className="scroll-mt-28 space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Toepassingen</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Hobby & makerspaces:</strong> 3D‑printer accessoires, bits, elektronica, miniaturen.
            </li>
            <li>
              <strong>Professioneel:</strong> magazijn, servicewagens, productie, elektrische componenten.
            </li>
            <li>
              <strong>Thuis:</strong> make‑up, kantoor, naaigerief, keukenlades.
            </li>
          </ul>
          <p>
            Integraties met koffersystemen (Milwaukee Packout, DeWALT ToughSystem, Stanley TSTAK) zijn booming: print baseplates die exact in een
            koffer passen en behoud het 42‑mm raster. Wij maken Packout‑compatibele Gridfinity inlays die de hoogte‑units van je koffer respecteren.
          </p>
        </section>

        <section id="grid-challenges" className="scroll-mt-28 space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Uitdagingen & oplossingen</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Hygiëne:</strong> voor food-toepassingen minder geschikt; voor tools en parts ideaal.
            </li>
            <li>
              <strong>Dode ruimte:</strong> gebruik half-pitch bins of custom baseplates op je lade-afmeting.
            </li>
            <li>
              <strong>Stabiliteit:</strong> magneten + antislip + M3 voor verticale koffers of transport.
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {GRID_IMAGES.slice(0, 4).map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl border border-white/60 shadow ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Deze beelden tonen combinaties van labelzones, antislip en custom pockets voor meetapparatuur, hobby en werkplaats.
          </p>
        </section>

        <section id="grid-why-us" className="scroll-mt-28 space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Waarom X3DPrints?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Starter kits om meteen te beginnen zonder zelf te printen.</li>
            <li>Sector-specifieke sets (elektriciens, makers, industrie).</li>
            <li>Packout-compatibele inlays op maat.</li>
            <li>Custom bins op basis van jouw toolfoto + maten + gewenste oriëntatie.</li>
            <li>Volledig ingerichte lades voor rust en efficiëntie.</li>
          </ul>
          <p>
            Wij printen en ontwerpen vanuit Herzele (
            <Link href="https://www.herzele.be" target="_blank" rel="noreferrer" className="text-indigo-700 underline">
              herzele.be
            </Link>
            ) en leveren in heel Vlaanderen.
          </p>
        </section>

        <section className="space-y-4">
          <GlassCard className="space-y-3 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Klaar voor een rustige lade of koffer?</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              Kies een starterkit of laat een custom Gridfinity pocket modelleren. Eén intake, één vaste indeling.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/organizers/modugrid"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Bekijk Gridfinity opties
              </Link>
              <Link
                href="/contact?material=modugrid"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Start een intake
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Material Suggestion Tool
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Bekijk pricing
              </Link>
            </div>
          </GlassCard>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Volgende stap</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <GlassCard className="space-y-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Vraag een custom Gridfinity bin aan</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">Foto + binnenmaten + gewenste hoogte (U) en label/antislip-optie.</p>
              <Link href="/contact?material=modugrid" className="text-sm font-semibold text-cyan-700 underline hover:text-cyan-900">
                Contact met prefill
              </Link>
            </GlassCard>
            <GlassCard className="space-y-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Zie onze Gridfinity cases</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">Check de organizers hub en kies bundels of een custom intake.</p>
              <Link href="/organizers/modugrid" className="text-sm font-semibold text-cyan-700 underline hover:text-cyan-900">
                Naar Gridfinity pagina
              </Link>
            </GlassCard>
          </div>
          <OrganizerCta locale="nl" />

          <div id="grid-sources" className="scroll-mt-28 mt-8">
            <GlassCard className="space-y-4 p-6">
              <h2 id="sources" className="text-xl font-semibold text-slate-900 dark:text-white">Bronnen en referenties</h2>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-[#0B0F1A]/80">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cyan-700 hover:text-cyan-900 dark:text-cyan-200"
                      >
                        {reference.label}
                      </a>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="mt-8">
            <Faq items={FAQ_ITEMS} title="Veelgestelde vragen over Gridfinity" />
          </div>
        </section>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}



