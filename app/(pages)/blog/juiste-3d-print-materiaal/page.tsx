
import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/juiste-3d-print-materiaal";
const utm = "?utm_source=blog&utm_medium=cta&utm_campaign=juiste-3d-print-materiaal";
const contactHref = `/contact${utm}`;
const toolHref = `/materials${utm}#material-suggestion-tool`;
const pricingHref = `/pricing${utm}`;
const publishedDate = "2024-09-10"
const dateModified = "2026-02-04"

export const metadata: Metadata = {
  title: "Hoe kies je het juiste 3D print materiaal? | X3DPrints",
  description:
    "How-to gids die je stap voor stap helpt het juiste 3D print materiaal te kiezen op basis van omgeving, gebruik en budget. Inclusief scenario&apos;s voor PLA, PETG en TPU.",
  alternates: { canonical },
  openGraph: {
    title: "Juiste materiaal voor 3D print: praktische beslissingsgids",
    description:
      "Gebruik deze gids om te bepalen of PLA Matte, PETG of TPU past bij jouw project. Inclusief flow, scenario&apos;s en interne links naar materialen en pricing.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["juiste materiaal voor 3D print", "3D print materiaal kiezen", "how-to"],
    images: [
      { url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Overzicht van 3D print materialen door X3DPrints" },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-to: kies het juiste 3D print materiaal",
    description: "Van PLA Matte tot PETG en TPU: zo bepaal je het beste materiaal voor jouw 3D print opdracht.",
    images: ["/images/og-home.jpg"],
  },
}

const decisionSteps = [
  {
    title: "Wordt het object binnen of buiten gebruikt?",
    detail:
      "Binnen = PLA varianten volstaan meestal. Outdoor of zones met direct zonlicht vragen PETG of technische materialen voor UV- en vochtbestendigheid.",
  },
  {
    title: "Komt het onderdeel in warme of koude zones?",
    detail:
      "Tot ca. 55 ?C blijft PLA maatvast; daarboven schakelen we naar PETG of PA. In vrieskou blijft PETG slagvaster dan PLA.",
  },
  {
    title: "Decoratief of functioneel?",
    detail:
      "Voor zichtwerk primeert de afwerking (PLA Matte, Silk, Marble). Voor brackets, behuizingen of tooling primeert mechanische prestatie (PETG of PLA Tough+).",
  },
  {
    title: "Moet het stijf of flexibel zijn?",
    detail:
      "Starre onderdelen = PLA of PETG. Grip, demping of kabelmanagement vraagt TPU of hybride prints met PLA-frames en TPU-inlays.",
  },
]

const materialMappings = [
  {
    material: "PLA Matte",
    bestFor: ["Marketing & interieur", "Hobbyprojecten", "Fotoshoot props"],
    why:
      "Matte afwerking camoufleert laaglijnen en oogt premium zonder nabewerking. Ideaal voor indoor zichtwerk met strak budget.",
    links: [
      { label: "Filament Vrijdag: PLA", href: "/blog/filament-vrijdag-pla" },
      { label: "PLA Matte fiche", href: "/materials/pla-matte" },
    ],
  },
  {
    material: "PETG",
    bestFor: ["Functionele onderdelen", "Warme of zonnige zones", "Outdoor projecten"],
    why:
      "PETG blijft maatvast tot ongeveer 80 ?C, is slagvaster dan PLA en weerstaat vocht beter. Onze go-to voor auto-interieurs, covers en jig tooling.",
    links: [
      { label: "Filament Vrijdag: PETG", href: "/blog/filament-vrijdag-petg" },
      { label: "PETG materiaalpagina", href: "/materials/petg" },
    ],
  },
  {
    material: "TPU",
    bestFor: ["Demping", "Grips", "Flexibele houders"],
    why:
      "TPU (Shore 95A) veert terug na impact en zorgt voor antislip. Perfect voor kabelhouders, bumpers en inserts in combinatiedelen.",
    links: [
      { label: "Filament Vrijdag: TPU", href: "/blog/filament-vrijdag-tpu" },
      { label: "TPU fiche", href: "/materials/tpu" },
    ],
  },
]

const scenarios = [
  {
    title: "Onderdeel in de auto",
    recommendation:
      "Kies PETG of PLA Tough+. PETG blijft stabiel in de zon en rond ventilatieroosters. Voor clips gebruiken we vaak PETG met lichte infill om spanningen op te vangen.",
    links: [
      { label: "Vergelijk PLA vs PETG", href: "/blog/pla-vs-petg" },
      { label: "Vraag PETG advies", href: "/contact?material=PETG" },
    ],
  },
  {
    title: "Display voor mijn winkel",
    recommendation:
      "PLA Matte voor basisstructuur, PLA Silk+ of Marble voor accenten. Combineer met PLA Wood of Metal afhankelijk van branding. Gebruik de Material Suggestion Tool voor varianten.",
    links: [
      { label: "Materialenbibliotheek", href: "/materials" },
      { label: "PLA Silk+ editie", href: "/blog/filament-vrijdag-pla-silk-plus" },
    ],
  },
  {
    title: "Flexibele kabelhouder",
    recommendation:
      "TPU 95A levert spanning ?n grip. Voor extra structuur printen we PLA frames met TPU-inserts zodat je clip vormvast blijft maar toch flexibel is.",
    links: [
      { label: "TPU use cases", href: "/blog/use-cases-tpu" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
    ],
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Hoe kies je het juiste 3D print materiaal?",
  description:
    "Stap-voor-stap gids van X3DPrints om het juiste 3D print materiaal te bepalen. Vergelijk PLA Matte, PETG en TPU op toepassing, omgeving en budget.",
  datePublished: publishedDate,
  dateModified,
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
      url: "https://www.x3dprints.be/og-x3dprints.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

export default function RightMaterialGuidePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(140%_80%_at_50%_-10%,rgba(34,197,94,0.18),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="space-y-4">
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
                <li className="font-medium text-slate-900">Juiste 3D print materiaal</li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">How-to</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe kies je het juiste 3D print materiaal?
            </h1>
            <p className="text-lg text-slate-700">
              Deze gids loodst je door vier beslissingen: omgeving, temperatuur, functie en flexibiliteit. We linken meteen door naar
              onze materiaalpagina&apos;s, pricing en contact zodat je sneller beslist en geen revisierondes verliest.
            </p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href={toolHref}>Materialen kiezen</ShimmerButton>
              <Link
                href={`/3d-printen${utm}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Naar de 3D-printen pillar
              </Link>
              <Link
                href={`/pricing${utm}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Zie impact op prijs
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-300 hover:bg-slate-50"
              >
                Vraag offerte/advies
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Stap-voor-stap flow</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Van context naar materiaal</h2>
              <p className="mt-2 text-sm text-slate-600">
                Gebruik onderstaande vragen als korte checklist. Aan het einde weet je of PLA Matte, PETG of TPU de basis vormt en of
                we specials zoals Silk+, Marble, Wood of Glow moeten toevoegen.
              </p>
              <ol className="mt-6 space-y-4 text-sm text-slate-700">
                {decisionSteps.map((step, index) => (
                  <li key={step.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Stap {index + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="flex flex-col gap-4 border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Volgende stap</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Check prijs & kies materiaal</h2>
              <p className="mt-2 text-sm text-slate-700">
                Test je model in de calculator en laat de Material Suggestion Tool alvast drie opties invullen. Dat versnelt de intake.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton
                href={pricingHref}
                event={{ action: "cta_click", category: "blog_mid", label: "pricing_juiste_materiaal_mid" }}
              >
                Naar pricing
              </ShimmerButton>
              <ShimmerButton
                href={toolHref}
                event={{ action: "cta_click", category: "blog_mid", label: "tool_juiste_materiaal_mid" }}
              >
                Start materiaaladvies
              </ShimmerButton>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Materiaal mapping</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Wanneer kies je welke blend?</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {materialMappings.map((item) => (
                  <div key={item.material} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{item.material}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Best voor</p>
                    <ul className="mt-1 space-y-1 text-sm text-slate-600">
                      {item.bestFor.map((use) => (
                        <li key={use} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm text-slate-600">{item.why}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {item.links.map((link) => (
                        <Link
                          key={`${item.material}-${link.href}`}
                          href={link.href}
                          className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Scenario&apos;s</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Wat past bij jouw vraag?</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{scenario.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{scenario.recommendation}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {scenario.links.map((link) => (
                        <Link
                          key={`${scenario.title}-${link.href}`}
                          href={link.href}
                          className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Kosten & planning</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Materiaalimpact op prijs</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA is onze baseline. Specials (Silk, Marble, Glow) vragen extra machine-uren of duurdere spoelen. PETG en TPU vragen
                tragere prints en extra droogtijd. Gebruik de pricingpagina voor budgetindicaties of plan een intake voor exacte
                cijfers.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton href="/pricing">Bekijk pricing & calculator</ShimmerButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Plan materiaal intake
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Verder lezen</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Resources</h2>
              <p className="mt-2 text-sm text-slate-600">
                Combineer deze gids met onze eigen artikelen en betrouwbare externe documentatie.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Intern</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>
                      <Link href="/blog/filament-vrijdag-pla-wood" className="text-indigo-600 transition hover:text-indigo-500">
                        PLA Wood & specials
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/filament-vrijdag-pla-glow" className="text-indigo-600 transition hover:text-indigo-500">
                        PLA Glow gids
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/filament-vrijdag-pla-marble" className="text-indigo-600 transition hover:text-indigo-500">
                        PLA Marble toepassingen
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Extern</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>
                      <a
                        href="https://wiki.bambulab.com/en/filament/pla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 transition hover:text-indigo-500"
                      >
                        Bambu Lab PLA gids
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wiki.bambulab.com/en/filament/petg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 transition hover:text-indigo-500"
                      >
                        Bambu Lab PETG notes
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://help.prusa3d.com/article/different-nozzle-types_2193"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 transition hover:text-indigo-500"
                      >
                        Prusa: nozzle types
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je nog tussen twee materialen?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vertel waar het onderdeel terechtkomt en we simuleren materiaal- en prijsimpact. Je krijgt een
                  duidelijke aanbeveling ?n backupoptie zodat stakeholders kunnen beslissen.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk prijzen & workflow
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}




