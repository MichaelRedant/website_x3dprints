import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"

const canonical = "https://www.x3dprints.be/blog/relatiegeschenken-3d-printen"
const publishedDate = "2025-08-20T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Relatiegeschenken 3D printen voor B2B | X3DPrints Blog",
  description:
    "Relatiegeschenken, bedankjes en team gifts op maat: sleutelhangers, desk organizers en awards in Silk/Matte/PETG. Korte lijnen, ontwerpservice mogelijk.",
  alternates: { canonical },
  openGraph: {
    title: "Relatiegeschenken 3D printen | B2B gifts",
    description:
      "Gepersonaliseerde B2B gifts: sleutelhangers, desk items en awards in Silk/Matte/PETG. Tips voor materiaal, leesbaarheid en levering.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte relatiegeschenken" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relatiegeschenken 3D printen | B2B gifts",
    description: "Custom sleutelhangers, desk items en awards in Silk/Matte/PETG. Materiaal- en leveringtips.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Beste look", value: "PLA Silk/Matte", detail: "Glans of zachte feel" },
  { label: "Sterk", value: "PETG", detail: "Taai voor sleutelhangers/desk" },
  { label: "Grip", value: "TPU 95A", detail: "Antislip pads/voetjes" },
]

const tips = [
  "Silk PLA voor luxe glans; Matte PLA voor zachte feel en leesbare tekst. PETG voor sterkere sleutelhangers of desk items.",
  "Tekstdiepte min. 0,6 mm; rond randen af voor prettige feel. Voeg pockets toe voor magneten of TPU pads.",
  "Layerhoogte 0,16-0,24 mm: nette lijnen zonder lange printtijd. Batch namen/initialen per kleur.",
  "Lever STL/STEP of kies ontwerpservice (EUR 45/uur). Voeg logo als vector of STL in de briefing.",
  "Plan lead time: meestal enkele werkdagen; geef eventdatum en afleverwijze (EV-zones of pakketdienst).",
]

const checklist = [
  "Type gift: sleutelhanger, desk organizer, award, naamplaat.",
  "Materiaal: Silk/Matte PLA (look), PETG (sterk), TPU (grip).",
  "Afwerking: raw of licht geschuurd; primer optioneel voor schilderen.",
  "Branding: logo, naam, QR-code? Geef font/outline mee.",
  "Deadline + leveroptie: EV-zone of pakketdienst.",
]

const faqItems = [
  {
    q: "Kunnen jullie namen, initialen of logo's integreren?",
    a: "Ja. Lever STL/STEP of kies ontwerpservice (EUR 45/uur). We houden minimaal 0,6 mm tekstdiepte en afgeronde randen aan.",
  },
  {
    q: "Welke materialen passen bij relatiegeschenken?",
    a: "Silk PLA voor glansrijke awards, Matte PLA voor zachte feel, PETG voor sterke sleutelhangers/organizers. TPU voor antislip pads.",
  },
  {
    q: "Hoe snel kunnen we leveren voor events?",
    a: "Meestal enkele werkdagen, afhankelijk van oplage en afwerking. Meld je eventdatum; we plannen realistisch zonder overpromise.",
  },
  {
    q: "Kunnen jullie sets batchen met verschillende namen?",
    a: "Ja. We batchen per kleur/naam zodat afwerking consistent is en voegen desgewenst QR-codes of magneten toe.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/vaderdag.webp", alt: "Gepersonaliseerde sleutelhangers B2B gift" },
  { src: "/images/portfolio/vaderdag2.webp", alt: "Desk award in Silk PLA" },
  { src: "/images/portfolio/back2school%20(2).webp", alt: "Gepersonaliseerde desk organizer" },
]

const videos = [
  {
    id: "yEN9ZY75pDg",
    title: "Potloodhouder op aanvraag",
    description: "Timelapse van een gepersonaliseerde pen/desk holder als relatiegeschenk.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Relatiegeschenken 3D printen voor B2B",
  description: metadata.description,
  author: { "@type": "Organization", name: "X3DPrints" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/images/og-home.jpg" },
  },
  datePublished: publishedDate,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  mainEntityOfPage: canonical,
  keywords: [
    "relatiegeschenken 3D printen",
    "B2B gifts 3D print",
    "gepersonaliseerde sleutelhanger",
    "desk organizer 3D print",
    "team gifts",
  ],
}

export default function BlogRelatiegeschenken() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-rose-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Use case · B2B</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Relatiegeschenken 3D printen voor B2B teams
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Relatiegeschenken, bedankjes en team gifts op maat. Sleutelhangers, desk organizers en awards in Silk/Matte/PETG met
              afgeronde randen en duidelijke tekst. Ontwerpbestand niet inbegrepen; lever STL/STEP of kies ontwerpservice (EUR 45/uur).
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?material=pla-silk-plus">Plan relatiegeschenken</ShimmerButton>
              <Link
                href="/segments/3d-printing-marketing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Marketing & events segment
              </Link>
              <Link
                href="/portfolio"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Bekijk portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materialen & settings</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Silk PLA scoort voor glansrijke awards en desk pieces, Matte PLA voor zachte feel en leesbaarheid. PETG is taai voor
                sleutelhangers en organizers. TPU pads zorgen voor grip.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Levering: EV-zones of pakketdienst. Batch namen/initialen zodat kleur en finish consistent zijn. Vraag primer als je
                zelf wil schilderen.
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
                Interne links: bekijk het{" "}
                <Link href="/segments/3d-printing-marketing" className="text-indigo-700 underline">
                  marketing & events segment
                </Link>
                , het{" "}
                <Link href="/segments/3d-printing-seasonal" className="text-indigo-700 underline">
                  seasonal segment
                </Link>{" "}
                (voor kerst/new year sets) en{" "}
                <Link href="/materials#material-suggestion-tool" className="text-indigo-700 underline">
                  Material Suggestion Tool
                </Link>{" "}
                voor advies. Extern kan je inspiratie zoeken op{" "}
                <Link href="https://www.printables.com" target="_blank" rel="noreferrer" className="text-indigo-700 underline">
                  Printables
                </Link>{" "}
                en{" "}
                <Link href="https://ultimaker.com/learn" target="_blank" rel="noreferrer" className="text-indigo-700 underline">
                  Ultimaker Learn
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Voorbeelden</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow ${idx === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === 0 ? 960 : 640}
                      height={idx === 0 ? 540 : 480}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 320px, 100vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600">
                Voorbeelden in Silk/Matte PLA en PETG. Lever STL/STEP of kies ontwerpservice; we batchen namen/initialen per set.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Video</h2>
                  <p className="text-sm text-slate-700">Timelapse van een gepersonaliseerde potloodhouder (lite embed).</p>
                </div>
                <Link
                  href="https://youtu.be/yEN9ZY75pDg"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-indigo-700 underline decoration-indigo-200 underline-offset-2"
                >
                  Open op YouTube -&gt;
                </Link>
              </div>
              <div className="mt-4">
                <VideoGallery videos={videos} highlightIds={["yEN9ZY75pDg"]} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ relatiegeschenken</h2>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}

