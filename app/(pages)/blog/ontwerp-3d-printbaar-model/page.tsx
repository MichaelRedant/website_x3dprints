import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/ontwerp-3d-printbaar-model"

export const metadata: Metadata = {
  title: "Hoe ontwerp je een 3D printbaar model? | X3DPrints Blog",
  description:
    "Checklist voor printbare ontwerpen: wanddiktes, tolerantie, oriëntatie, support en bestandsformaten. Inclusief tips voor PLA, PETG en TPU.",
  alternates: { canonical },
  openGraph: {
    title: "Hoe ontwerp je een 3D printbaar model?",
    description:
      "Volledige gids met ontwerpprincipes voor 3D prints: wanddiktes, overhangen, snap-fit, tolerantie en exporttips.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Ontwerp 3D printbaar model" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoe ontwerp je een 3D printbaar model?",
    description:
      "Leer hoe je een design printklaar maakt: consistent materiaalgebruik, juiste oriëntatie, support en bestandsformaten.",
    images: ["/images/og-home.jpg"],
  },
}

const fundamentals = [
  {
    title: "Wanddiktes & ribben",
    description:
      "Hanteer 1.2 mm minimum voor PLA/PETG (3 perimeterlijnen) en 2 mm voor TPU. Gebruik ribben of fillets om spanningen te verspreiden.",
  },
  {
    title: "Toleranties",
    description:
      "Voor passtukken nemen we standaard ±0.2 mm. Voor press-fit of scharnieren stemmen we de clearance af op materiaal en laaghoogte.",
  },
  {
    title: "Oriëntatie",
    description:
      "Plaats kritieke oppervlakken verticaal voor een strakke afwerking, en leg mechanische krachten parallel aan de perimeters.",
  },
  {
    title: "Overhang & support",
    description:
      "Beperk overhang tot 55 graden. Voor zichtbare vlakken is een chamfer onder 45 graden mooier dan een recht vlak met support.",
  },
]

const exportChecklist = [
  "Ontwerp parametrisch in CAD zodat aanpassingen later snel kunnen.",
  "Export STL met 0.01 mm resolutie voor organische vormen; STEP meeleveren als de onderdelen nog geüpdatet kunnen worden.",
  "Verwijder dubbele oppervlakken en controleer de mesh op non-manifold edges. Tools als Netfabb of Meshmixer helpen hierbij.",
  "Voeg een korte PDF of atomaire schets toe met kritieke maten en functiebeschrijving.",
]

const materialGuidance = [
  {
    material: "PLA",
    guidance: "Focus op esthetiek: gebruik chamfers, sluit scherpe hoeken af met kleine fillets en zet logo's in reliëf.",
  },
  {
    material: "PETG",
    guidance: "Gebruik dikkere wanden en rond hoeken af. Voeg extra support-pads toe waar de nozzle anders te lang in de lucht hangt.",
  },
  {
    material: "TPU",
    guidance: "Zorg voor gelijkmatige wanddiktes zodat flex consistent blijft. Vermijd scherpe binnenhoeken die scheuren starten.",
  },
]

const snapFitTips = [
  "Gebruik taps toelopende clips met 0.2-0.3 mm clearance per zijde voor PLA, 0.4 mm voor PETG.",
  "Voeg stopblokken toe zodat clips niet verder buigen dan nodig. Zo gaat de clip langer mee.",
  "Plaats de snap-fit langs de printlaagrichting voor maximale sterkte. Bij horizontale clips voeg je ribs toe.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hoe ontwerp je een 3D printbaar model?",
  description:
    "Checklist en richtlijnen om 3D printbare modellen te ontwerpen met focus op wanddiktes, tolerantie, support en bestandsformaten.",
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/Logo.webp",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
}

export default function DesignArticlePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(45,212,191,0.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Ontwerp een 3D printbaar model</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe ontwerp je een 3D printbaar model?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Printbare ontwerpen combineer je in vijf stappen: juiste wanddikte, passende tolerantie, slimme oriëntatie, beperkte support en correcte bestandsformaten. Hier vind je onze studio-richtlijnen.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/viewer">Upload je model</ShimmerButton>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Ontwerpservice
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {fundamentals.map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Export checklist</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {exportChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {materialGuidance.map(({ material, guidance }) => (
            <Reveal key={material}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Materiaal</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{material}</h3>
                <p className="mt-2 text-sm text-slate-600">{guidance}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Snap-fit en assemblage tips</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {snapFitTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Combineer eventueel PLA behuizing met PETG clips voor extra taaiheid. We simuleren graag samen welke delen welk materiaal nodig hebben.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Aanvraag checklist</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li>1. Voeg STL/STEP + referentieafbeelding toe.</li>
                <li>2. Vermeld gewenste materiaal, kleur en afwerking (schuren, primen, lakken).</li>
                <li>3. Geef tolerantie en montage-info mee (bv. past op M4 schroef of PCB van X mm).</li>
                <li>4. Noteer deadline en leveroptie: afhalen Herzele, Bpost of persoonlijke levering.</li>
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Laat ons je ontwerp checken</h2>
                <p className="mt-2 text-sm text-slate-600">
                  We sturen binnen een werkdag feedback over materiaalkeuze en eventuele design tweaks voor printbaarheid.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Vraag review aan</ShimmerButton>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  Bekijk prijzen
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}
