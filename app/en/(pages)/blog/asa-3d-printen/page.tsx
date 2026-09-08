import type { Metadata } from "next"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogFaq from "@/components/BlogFaq"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildBreadcrumbSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/asa-3d-printen/"
const dutchCanonical = "https://www.x3dprints.be/blog/asa-3d-printen/"
const publishedDate = "2026-09-08T09:00:00+02:00"
const dateModified = "2026-09-08"

export const metadata: Metadata = {
  title: "ASA 3D printing for UV and outdoor use | X3DPrints",
  description:
    "A practical ASA 3D printing guide covering UV and weather resistance, applications, design rules, ventilation and comparison with PETG, ABS and PC.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": dutchCanonical,
      "en-BE": canonical,
      "x-default": dutchCanonical,
    },
  },
  openGraph: {
    title: "ASA 3D printing: a strong material for outdoor use",
    description:
      "Practical ASA guide covering UV, rain, heat, warping, ventilation and the choice between ASA, PETG, ABS and polycarbonate.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    modifiedTime: publishedDate,
    authors: ["https://www.x3dprints.be/en/about/"],
    tags: ["ASA 3D printing", "ASA filament", "outdoor 3D printing", "UV-resistant 3D printing"],
    images: [
      {
        url: "/images/og-blog-en.svg",
        width: 1200,
        height: 630,
        alt: "ASA 3D printing for outdoor use by X3DPrints",
      },
    ],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASA 3D printing for outdoor use",
    description: "When ASA makes more sense than PETG, ABS or PC, including design and production requirements.",
    images: ["/images/og-blog-en.svg"],
  },
}

const tocItems = [
  { id: "what-is-asa", label: "What is ASA?" },
  { id: "properties", label: "Properties and limitations" },
  { id: "applications", label: "Suitable applications" },
  { id: "comparison", label: "ASA versus PETG, ABS and PC" },
  { id: "design-production", label: "Design and production" },
  { id: "safety", label: "Ventilation and safe printing" },
  { id: "quote", label: "Price and quote input" },
  { id: "service-area", label: "ASA printing in Belgium" },
  { id: "sources", label: "Primary sources" },
  { id: "faq", label: "Frequently asked questions" },
]

const applications = [
  {
    title: "Outdoor enclosures",
    text: "Protective covers for sensors, camera accessories, measuring equipment and electronics exposed to sunlight and rain. Sealing and IP protection still have to be engineered into the part.",
  },
  {
    title: "Facades, gardens and signage",
    text: "Mounting blocks, spacers, nameplates, holders and decorative elements where long-term colour and shape stability matter more than the lowest initial price.",
  },
  {
    title: "Mobility and machinery",
    text: "Non-safety-critical covers, cable guides, dashboard supports and workshop aids that combine heat, UV exposure or frequent handling.",
  },
  {
    title: "Prototypes and small batches",
    text: "Functional validation models and end-use parts in limited quantities, without immediately investing in tooling or a large inventory.",
  },
]

const comparisonRows = [
  {
    material: "ASA",
    outdoor: "Very strong UV and weather resistance",
    heat: "Higher useful range than standard PLA and typically PETG",
    printability: "Demanding: enclosure, adhesion and shrink control",
    choose: "Long-term outdoor use and technical visible parts",
  },
  {
    material: "PETG",
    outdoor: "Good for many outdoor projects",
    heat: "Moderate to good, depending on the grade",
    printability: "More reliable and economical",
    choose: "Functional parts without extreme UV or heat demands",
  },
  {
    material: "ABS",
    outdoor: "Less UV-stable than ASA",
    heat: "Good",
    printability: "Similar shrink and enclosure requirements",
    choose: "Technical indoor applications or acetone finishing",
  },
  {
    material: "PC",
    outdoor: "Depends on the specific blend",
    heat: "Often the strongest option at higher temperatures",
    printability: "Very demanding and moisture-sensitive",
    choose: "High heat or mechanical demands after technical review",
  },
]

const intakeItems = [
  "an STL or STEP file, or a clear drawing with all critical dimensions",
  "the use environment: indoors, outdoors, vehicle, machine or facade",
  "sun exposure, expected temperature, moisture and chemical contact",
  "loads, mounting points, preferred colour and quantity",
  "whether dimensional accuracy, appearance or maximum strength matters most",
]

const faqItems = [
  {
    q: "Is ASA the best filament for outdoor use?",
    a: "ASA is a strong choice for sustained UV and weather exposure, but it is not automatically the best or most economical material. PETG is sufficient for many holders and replacement parts. Geometry, temperature, load and required service life determine the final choice.",
  },
  {
    q: "What is the difference between ASA and ABS?",
    a: "ASA and ABS belong to a similar technical material class. ASA generally retains its colour and properties better under UV light and outdoor weather. Both materials shrink while printing and benefit from a controlled, warm print environment.",
  },
  {
    q: "Is an ASA 3D print waterproof?",
    a: "The base material is weather-resistant, but an FDM print is not inherently waterproof. Wall thickness, layer adhesion, seams, screw holes and seals determine whether an enclosure actually keeps water out. An IP rating requires separate validation.",
  },
  {
    q: "Can ASA be used for automotive parts?",
    a: "ASA can suit non-safety-critical covers, holders and interior or exterior details. Parts related to brakes, steering, seat belts, airbags or other safety functions should not be produced without proper engineering and validation.",
  },
  {
    q: "Does X3DPrints keep ASA in stock?",
    a: "ASA is offered on request. X3DPrints first reviews the application, colour, dimensions, quantities and production risk. This avoids specifying a technical material when PETG or another solution would be sufficient.",
  },
  {
    q: "Can ASA parts be delivered across Belgium?",
    a: "Yes. X3DPrints produces in Herzele and delivers throughout Belgium. Collection in Herzele is available by appointment. Projects from Ghent, Antwerp, Hasselt, Genk and other areas receive the same technical review.",
  },
]

const sources = [
  {
    label: "Prusa Knowledge Base: ASA",
    href: "https://help.prusa3d.com/article/asa_1809",
    text: "Official guidance on UV and temperature resistance, warping, enclosure use and ventilation.",
  },
  {
    label: "Bambu Lab: ASA filament",
    href: "https://au.store.bambulab.com/products/asa-filament",
    text: "Product properties and printing conditions for Bambu ASA, including outdoor use and enclosure guidance.",
  },
  {
    label: "UltiMaker / MakerBot Precision ASA data sheet",
    href: "https://ultimaker.com/wp-content/uploads/2023/12/MakerBot-Precision-ASA-3-092020.pdf",
    text: "Technical sheet positioning ASA as a weather-resistant ABS alternative with improved UV stability.",
  },
  {
    label: "NIOSH: approaches to safe 3D printing",
    href: "https://www.cdc.gov/niosh/docs/2024-103/pdfs/2024-103.pdf",
    text: "Practical primary source on emissions, ventilation and engineering controls for additive manufacturing.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "ASA 3D printing: complete guide to outdoor use, UV and heat",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-blog-en.svg",
  inLanguage: "en-BE",
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: `${canonical}#breadcrumb`,
  inLanguage: "en-BE",
  items: [
    { name: "Home", url: "https://www.x3dprints.be/en/" },
    { name: "Knowledge base", url: "https://www.x3dprints.be/en/blog/" },
    { name: "ASA 3D printing", url: canonical },
  ],
})

export default function Asa3dPrintingPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_42%_at_75%_0%,rgba(245,158,11,0.18),transparent_72%),radial-gradient(70%_35%_at_10%_22%,rgba(14,165,233,0.13),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <Link href="/en/blog" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Knowledge base
              </Link>{" "}
              <span aria-hidden>/</span> ASA 3D printing
            </nav>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.34em] text-amber-700">Material guide</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              ASA 3D printing for outdoor, UV and demanding applications
            </h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
              ASA is a technical filament for parts exposed to sunlight, rain and temperature cycles over time. It is especially
              useful for outdoor enclosures, mounting parts and small batches, but requires a controlled print environment,
              appropriate ventilation and a design that accounts for shrinkage.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Published and last updated on 8 September 2026 by X3DPrints in Herzele, Belgium.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ShimmerButton href="/en/contact?material=ABS%2FASA">Request an ASA quote</ShimmerButton>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Compare materials
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Key strength", "UV and weather resistance"],
              ["Production", "On request after application review"],
              ["Service", "Collect in Herzele or delivery in Belgium"],
            ].map(([label, value]) => (
              <GlassCard key={label} className="border border-white/50 bg-white/80 p-5 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
              </GlassCard>
            ))}
          </div>

          <ContentTableOfContents items={tocItems} title="In this guide" className="mt-8" />
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="what-is-asa" className="scroll-mt-28 text-2xl font-bold text-slate-900">What is ASA filament?</h2>
              <p className="mt-4 leading-7 text-slate-700">
                ASA stands for acrylonitrile styrene acrylate. Its processing and technical behaviour are similar to ABS, but it
                was developed to handle ultraviolet light and outdoor weather more effectively. It generally remains useful and
                visually stable for longer when exposed to sunlight.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                ASA is not an automatic replacement for every filament. A simple part under cover may be more economical in
                <Link href="/en/blog/filament-vrijdag-petg" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">PETG</Link>.
                For higher heat or exceptional mechanical demands, <Link href="/en/blog/filament-vrijdag-pc" className="font-semibold text-indigo-600 underline underline-offset-4">polycarbonate</Link> may be more suitable.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-amber-200/70 bg-amber-50/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="properties" className="scroll-mt-28 text-2xl font-bold text-slate-900">Properties and limitations</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li><strong>Strong at:</strong> UV stability, weather resistance, toughness and technical visible parts.</li>
                <li><strong>Not inherently:</strong> waterproof, food-safe, flame-retardant or certified for regulated use.</li>
                <li><strong>Grade-dependent:</strong> heat, impact and chemical resistance vary by manufacturer and colour.</li>
                <li><strong>Important:</strong> print orientation and layer adhesion still determine final part strength.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 id="applications" className="scroll-mt-28 text-3xl font-bold text-slate-900">
              Commercially useful parts to print in ASA
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              ASA earns its premium when a part will remain outdoors or combines UV and heat. These are realistic use cases,
              not guarantees without reviewing the load and geometry.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {applications.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="comparison" className="scroll-mt-28 text-3xl font-bold text-slate-900">ASA versus PETG, ABS and PC</h2>
              <p className="mt-3 leading-7 text-slate-700">
                The correct material follows from the use environment, not a filament ranking. The comparison is qualitative;
                the technical data sheet for the selected grade remains authoritative.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-[860px] divide-y divide-slate-200 text-left text-sm">
                  <thead>
                    <tr className="text-slate-600">
                      <th className="py-3 pr-5">Material</th>
                      <th className="py-3 pr-5">Outdoor and UV</th>
                      <th className="py-3 pr-5">Heat</th>
                      <th className="py-3 pr-5">Printability</th>
                      <th className="py-3">Best suited to</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {comparisonRows.map((row) => (
                      <tr key={row.material}>
                        <th className="py-4 pr-5 font-bold text-slate-900">{row.material}</th>
                        <td className="py-4 pr-5">{row.outdoor}</td>
                        <td className="py-4 pr-5">{row.heat}</td>
                        <td className="py-4 pr-5">{row.printability}</td>
                        <td className="py-4">{row.choose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="design-production" className="scroll-mt-28 text-2xl font-bold text-slate-900">Design and production requirements</h2>
              <p className="mt-4 leading-7 text-slate-700">
                ASA shrinks noticeably while cooling. An enclosed printer maintains a warmer environment and reduces warping
                and layer cracking. Wide flat sections, sharp internal corners and uneven wall thickness increase risk.
              </p>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>Use radiused corners, consistent walls and adequate ribs.</li>
                <li>Allow clearance for fitting and thermal expansion.</li>
                <li>Add drainage, seals and threaded inserts where the application requires them.</li>
                <li>Follow the filament maker&apos;s profile; typical ASA profiles use roughly 250-270 deg C nozzle and 90-110 deg C bed temperatures.</li>
                <li>Validate a critical segment before committing to a large or dimensionally sensitive part.</li>
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-rose-200/70 bg-rose-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="safety" className="scroll-mt-28 text-2xl font-bold text-slate-900">Ventilation is not optional</h2>
              <p className="mt-4 leading-7 text-slate-700">
                FDM printing can emit ultrafine particles and volatile compounds. A standard enclosure helps control
                temperature, but it is not automatically an emissions control. NIOSH recommends source extraction, suitable
                filtration and adequate ventilation as engineering measures.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                ASA should therefore not run unattended in a living room, bedroom or ordinary office. Always follow the safety
                data sheet for the exact filament and the printer manufacturer&apos;s instructions.
              </p>
              <Link
                href="https://www.cdc.gov/niosh/docs/2024-103/pdfs/2024-103.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex font-semibold text-indigo-700 underline underline-offset-4"
              >
                Read the NIOSH safe 3D printing guide
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="quote" className="scroll-mt-28 text-2xl font-bold text-slate-900">What does ASA 3D printing cost?</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Price depends on material volume, print time, size, supports, finishing, risk allowance and quantity. ASA can
                cost more than PETG because preparation takes longer and large geometries carry more production risk. Use the
                <Link href="/en/pricing" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">pricing page</Link>
                as a starting point; a firm price follows file review and slicing.
              </p>
              <div className="mt-6"><ShimmerButton href="/en/contact?material=ABS%2FASA">Have your ASA project reviewed</ShimmerButton></div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-sky-200/70 bg-sky-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">Send this for an accurate quote</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                {intakeItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                No 3D model yet? Explore <Link href="/en/3d-modelleren" className="font-semibold text-indigo-600 underline underline-offset-4">3D modelling</Link> or
                have an existing object assessed for <Link href="/en/3d-scannen" className="font-semibold text-indigo-600 underline underline-offset-4">3D scanning</Link> first.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="service-area" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                ASA 3D printing from Herzele, delivered across Belgium
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                X3DPrints is a one-person studio in Herzele. Production does not take place in every city listed here: projects
                are prepared in Herzele and then collected by appointment or shipped. See service information for
                <Link href="/en/3d-printen-in-herzele" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Herzele</Link>,
                <Link href="/en/3d-printen-in-gent" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Ghent</Link>,
                <Link href="/en/3d-printen-in-antwerpen" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Antwerp</Link>,
                <Link href="/en/3d-printen-in-hasselt" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Hasselt</Link> and
                <Link href="/en/3d-printen-in-genk" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Genk</Link>, or browse the full
                <Link href="/en/locaties" className="ml-1 font-semibold text-indigo-600 underline underline-offset-4">delivery area</Link>.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="sources" className="scroll-mt-28 text-2xl font-bold text-slate-900">Primary sources and technical data</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Material properties vary by brand and grade. Always check the technical and safety data for the filament that
                will actually be used alongside this guide.
              </p>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {sources.map((source) => (
                  <li key={source.href} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                    <cite className="not-italic">
                      <Link href={source.href} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-700 underline underline-offset-4">
                        {source.label}
                      </Link>
                    </cite>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{source.text}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogFaq
        title="Frequently asked questions about ASA 3D printing"
        items={faqItems}
        inLanguage="en-BE"
        sectionId="faq"
        mainEntityOfPage={canonical}
      />

      <BlogAuthorNote locale="en" />
      <ReadMoreLinks
        pageType="blog"
        title="From material choice to a reliable part"
        intro="Compare alternatives, review realistic applications and have your file checked before production."
        primaryLinks={[
          { label: "3D printing service", href: "/services" },
          { label: "PETG as a practical alternative", href: "/blog/filament-vrijdag-petg" },
          { label: "Request an ASA quote", href: "/contact?material=ABS%2FASA" },
        ]}
        secondaryLinks={[
          { label: "How does 3D scanning work?", href: "/blog/hoe-werkt-3d-scanning" },
          { label: "3D printed parts for outdoor use", href: "/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik" },
          { label: "Compare strong 3D printing materials", href: "/blog/sterke-3d-print-materialen" },
          { label: "Portfolio", href: "/portfolio" },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  )
}
