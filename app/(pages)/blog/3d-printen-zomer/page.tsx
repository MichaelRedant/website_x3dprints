import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-zomer/"
const datePublished = "2024-07-15"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Laatst bijgewerkt: 18 februari 2026"

export const metadata: Metadata = {
  title: "3D printen voor zomerdecor 2026 | X3DPrints Blog",
  description:
    "3D printen voor zomer 2026: terrasdecor, eventprops, tafeldecor en functionele onderdelen in PLA, PETG en TPU. Inclusief materiaalkeuze, checklist en FAQ.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor zomerdecor 2026",
    description:
      "Praktische gids voor zomerprints met duidelijke materiaalkeuze voor indoor en outdoor toepassingen.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte zomerdecoratie" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor zomerdecor 2026",
    description:
      "Gids voor zomer 3D prints met materiaaladvies, planning en checklist voor betrouwbare uitvoering.",
    images: ["/images/og-home.jpg"],
  },
}

const materialRows = [
  { material: "PLA Matte/Silk", use: "Indoor zomerdecor en tafelelementen", note: "Nette visuele afwerking voor binnen" },
  { material: "PETG", use: "Outdoor decor, houders en praktische onderdelen", note: "Beter tegen zon en vocht dan PLA" },
  { material: "TPU", use: "Antislip voeten en flexibele contactpunten", note: "Goed voor grip en demping" },
]

const materialTips = [
  "Voor buitengebruik kies je bij voorkeur PETG om vervorming door warmte te beperken.",
  "Voor visuele indoor stukken met kleurimpact werkt PLA Matte of Silk goed.",
  "Gebruik TPU waar antislip of lichte flexibiliteit nodig is.",
  "Houd rekening met wanddikte en montagepunten voor transport naar events.",
  "Model niet inbegrepen: STL/STEP aanleveren of ontwerpservice aanvragen.",
]

const useCases = [
  {
    title: "Events en festivals",
    body: "Branding props, standonderdelen en custom houders voor tijdelijke opstellingen.",
  },
  {
    title: "Horeca en retail",
    body: "Tafeldecor, menuhouders, QR-stands en seizoensgebonden presentatie-elementen.",
  },
  {
    title: "Particulier en tuin",
    body: "Unieke zomerdecoratie, plantenaccessoires en functionele kleine tools.",
  },
]

const workflowSteps = [
  {
    title: "1. Input",
    body: "Je levert STL/STEP of referentie met afmetingen, kleuren en deadline.",
  },
  {
    title: "2. Materiaaladvies",
    body: "We bepalen per toepassing of PLA, PETG of TPU technisch het beste past.",
  },
  {
    title: "3. Productie",
    body: "We printen, controleren passing en bereiden eventuele nabewerking voor.",
  },
  {
    title: "4. Oplevering",
    body: "Afhalen in Herzele of verzending in beschermde verpakking.",
  },
]

const checklist = [
  "Gebruik: decor, display, functioneel onderdeel of eventprop.",
  "Binnen of buiten gebruik duidelijk aangeven.",
  "Materiaalkeuze: PLA, PETG of TPU op basis van omstandigheden.",
  "Montagewijze en bevestigingspunten vooraf meegeven.",
  "Deadline en levervoorkeur expliciet vermelden.",
]

const faqItems = [
  {
    q: "Welk materiaal is best voor zomerdecor buiten?",
    a: "Voor buitengebruik is PETG doorgaans de veiligste keuze door betere hitte- en vochtbestendigheid.",
  },
  {
    q: "Kunnen jullie ook kleine B2B series printen voor events?",
    a: "Ja. Kleine en middelgrote batches voor events en retail zijn mogelijk met consistente output.",
  },
  {
    q: "Is het ontwerp inbegrepen in de printprijs?",
    a: "Nee. Je levert STL/STEP aan of kiest ontwerpservice aan EUR 45/uur.",
  },
  {
    q: "Kunnen antislip onderdelen ook 3D geprint worden?",
    a: "Ja. TPU is geschikt voor antislip voeten en flexibele contactpunten.",
  },
  {
    q: "Hoe plan ik best richting een zomerevent?",
    a: "Start tijdig zodat materiaalkeuze, testprint en levering zonder tijdsdruk gebeuren.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/summer1.webp", alt: "3D geprinte zomerdecor set 1" },
  { src: "/images/portfolio/Summer2.webp", alt: "3D geprinte zomerdecor set 2" },
  { src: "/images/portfolio/Summer3.webp", alt: "3D geprinte zomerdecor set 3" },
  { src: "/images/portfolio/Summer4.webp", alt: "3D geprinte zomerdecor set 4" },
  { src: "/images/portfolio/Summer5.webp", alt: "3D geprinte zomerdecor set 5" },
  { src: "/images/portfolio/Summer6.webp", alt: "3D geprinte zomerdecor set 6" },
  { src: "/images/portfolio/Summer7.webp", alt: "3D geprinte zomerdecor set 7" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor zomerdecor 2026",
  description: metadata.description ?? "",
  datePublished,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

export default function BlogSummer() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-sky-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor zomerdecor 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Wil je snel zomerdecor of eventprops laten maken met 3D printen? Deze gids geeft je direct de juiste
              materiaalkeuze voor binnen en buiten, plus een praktische aanpak voor planning en levering.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?quote=Zomerproject%202026">Plan je zomerprints 2026</ShimmerButton>
              <Link
                href="/segments/3d-printing-seasonal"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Naar seasonal segment
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Snelle sectienavigatie" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#zomer-materialen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materialen
              </Link>
              <Link href="#zomer-toepassingen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Toepassingen
              </Link>
              <Link href="#zomer-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#zomer-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                FAQ
              </Link>
              <Link href="#sources" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Bronnen
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="zomer-materialen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materiaalkeuze voor zomerprints</h2>
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
                {materialTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Twijfel je over zonbestendigheid of montage? Gebruik de{" "}
                <Link href="/materials#material-suggestion-tool" className="font-semibold text-amber-700 underline underline-offset-2">
                  material suggestion tool
                </Link>{" "}
                of neem direct contact op.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Bestanden en voorbereiding</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL of STEP is aanbevolen voor snelle productie. Geef gebruiksomgeving, temperatuurbelasting en montagepunten
                mee, zodat we technisch correct kunnen adviseren.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Bestanden: STL of STEP.</li>
                <li>Ontwerpservice mogelijk: EUR 45/uur.</li>
                <li>Ontwerpbestand niet inbegrepen in print-only prijs.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/3d-modellen-vinden"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Waar vind je modellen?
                </Link>
                <Link
                  href="/contact?quote=STL%20zomerproject"
                  className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                >
                  Stuur je bestand door
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="zomer-toepassingen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Toepassingen voor zomerprojecten</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {useCases.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{item.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-sm ${idx === inspirationImages.length - 1 ? "sm:col-span-2" : ""}`}
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
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="zomer-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning voor zomerevents en levermomenten</h2>
              <p className="mt-3 text-sm text-slate-700">
                Door vroege intake kunnen materiaalkeuze en productie op tijd worden afgestemd op je eventdatum of retailmoment.
                Zo vermijd je tijdsdruk in piekweken.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {workflowSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?quote=Zomerdeadline">Vraag timing en offerte</ShimmerButton>
                <Link
                  href="/pricing"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Bekijk prijzen
                </Link>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Aanvraagchecklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="zomer-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printen voor zomer</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <article key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-4">
                    <h3 className="font-semibold text-slate-800">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </article>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="zomer-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-2xl font-bold tracking-tight text-slate-900">
                Bronnen en referenties
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-amber-700 transition hover:text-amber-600"
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
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
