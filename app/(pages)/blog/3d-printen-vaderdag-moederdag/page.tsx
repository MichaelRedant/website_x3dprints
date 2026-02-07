import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/3d-printen-vaderdag-moederdag/"

export const metadata: Metadata = {
  title: "Vaderdag & Moederdag 3D printen | X3DPrints Blog",
  description:
    "Gepersonaliseerde sleutelhangers, desk items en naamcadeaus in Silk/Matte/PETG. Tips voor leesbaarheid, afrondingen en levering (mei-juni).",
  alternates: { canonical },
  openGraph: {
    title: "Vaderdag & Moederdag 3D printen",
    description:
      "Custom gifts met naam/initialen, afgeronde randen en antislipvoetjes. Materiaalkeuzes en leveringtips voor Vaderdag/Moederdag.",
  url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Vaderdag Moederdag 3D prints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaderdag & Moederdag 3D printen",
    description: "Gepersonaliseerde gifts in Silk/Matte/PETG met afgeronde randen en snelle levering.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Silk PLA voor glansrijke gifts, Matte PLA voor zachte look; PETG voor sterkere sleutelhangers/desk items.",
  "Min. 0,6 mm tekstdiepte en afgeronde randen voor prettige feel in dagelijks gebruik.",
  "TPU pads voor antislip; gebruik pockets of geÃ¯ntegreerde voetjes.",
  "Layerhoogte 0,16-0,24 mm voor nette lijnen zonder lange printtijd.",
  "Batch namen/initialen per print-run voor consistente kleur en finish.",
]

const checklist = [
  "Type gift: sleutelhanger, desk organizer, naamplaat of klein decor.",
  "Materiaal: Silk/Matte PLA voor look; PETG voor sterkte; TPU voor grip.",
  "Afwerking: raw of licht geschuurd; primer optioneel als je wil schilderen.",
  "Deadline: Vaderdag/Moederdag (meiâ€“juni) + leveroptie (EV-zone of pakketdienst).",
  "Bestand: STL/STEP. Ontwerp nodig? Ontwerpservice EUR 45/uur.",
]

const faqItems = [
  {
    q: "Kunnen jullie namen en initialen in bulk maken?",
    a: "Ja. Lever een lijst of ontwerp, of kies ontwerpservice. We batchen per kleur zodat alles consistent oogt.",
  },
  {
    q: "Welke materialen gebruiken jullie?",
    a: "Silk PLA voor glans, Matte PLA voor zachte feel, PETG voor sterke sleutelhangers of desk items. TPU voor antislipvoetjes.",
  },
  {
    q: "Hoe snel leveren jullie in mei/juni?",
    a: "Meestal binnen enkele werkdagen, afhankelijk van oplage. Meld je datum; we plannen realistisch zonder overpromise.",
  },
  {
    q: "Is het 3D model inbegrepen?",
    a: "Nee. Lever STL/STEP of kies ontwerpservice (EUR 45/uur). We controleren wanddiktes, tekstdiepte en afrondingen.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/vaderdag.webp", alt: "Vaderdag sleutelhangers" },
  { src: "/images/portfolio/vaderdag2.webp", alt: "Vaderdag desk items" },
  { src: "/images/portfolio/vaderdag3.webp", alt: "Vaderdag naamcadeau" },
  { src: "/images/portfolio/moederdag.webp", alt: "Moederdag Silk PLA cadeau" },
  { src: "/images/portfolio/moederdag2.webp", alt: "Moederdag organizer set" },
  { src: "/images/portfolio/moederdag3.webp", alt: "Moederdag gepersonaliseerd printcadeau" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

  inLanguage: "nl-BE",
  headline: "Vaderdag & Moederdag 3D printen",
  description: metadata.description,
  author: { "@type": "Organization", name: "X3DPrints" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/images/og-home.jpg" },
  },
  datePublished: "2025-03-15",
  dateModified: "2025-03-15",
  image: "https://www.x3dprints.be/images/og-home.jpg",
  mainEntityOfPage: canonical,
  keywords: [
    "3D printen Vaderdag",
    "3D printen Moederdag",
    "gepersonaliseerde gifts",
    "desk items 3D printen",
    "sleutelhangers 3D print",
  ],
}

export default function BlogParentsDay() {
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
              3D printen voor Vaderdag & Moederdag
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Gepersonaliseerde sleutelhangers, desk items en naamcadeaus in Silk, Matte of PETG. Ontwerpbestand niet inbegrepen;
              lever STL/STEP of kies ontwerpservice (EUR 45/uur). Planning richting meiâ€“juni zonder overpromise.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?material=pla-silk">Plan je gift run</ShimmerButton>
              <Link
                href="/segments/3d-printing-vaderdag-moederdag"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Naar het segment
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Prijzen & leverzones
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Silk PLA voor glans, Matte PLA voor een zachte look. Voor sterkere sleutelhangers kan PETG, en TPU voor antislip pads onder desk items.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Levering: EV-zones of pakketdienst. Geef aantallen en namenlijst door; we batchen kleuren voor consistente afwerking.
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
                SEO keyphrases: 3D printen Vaderdag, 3D printen Moederdag, gepersonaliseerde gifts, desk items 3D printen, sleutelhangers 3D print.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Interne links: verwijs naar{" "}
                <Link href="/segments/3d-printing-seasonal" className="text-rose-700 underline">
                  Seasonal segment
                </Link>{" "}
                en{" "}
                <Link href="/materials#material-suggestion-tool" className="text-rose-700 underline">
                  Material Suggestion Tool
                </Link>{" "}
                voor extra advies. Extern kan je inspiratie halen op{" "}
                <Link href="https://www.printables.com" target="_blank" rel="noreferrer" className="text-rose-700 underline">
                  Printables
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
                Voorbeelden in Silk/Matte PLA en PETG. Lever je eigen STL/STEP of kies ontwerpservice voor namen/initialen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ Vaderdag & Moederdag</h2>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}







