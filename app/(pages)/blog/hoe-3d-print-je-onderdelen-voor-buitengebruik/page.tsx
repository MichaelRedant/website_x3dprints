import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik"
const publishedDate = "2025-11-21T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Hoe 3D print je onderdelen voor buitengebruik? | X3DPrints",
  description:
    "How-to gids voor tuin, gevel, fietsen en sensoren. Leer waarom PLA buiten faalt, wanneer je PETG of TPU kiest en hoe je onderdelen bevestigt voor langdurig gebruik.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor buiten: materialen, bevestiging en ontwerp",
    description:
      "Praktische gids voor outdoor 3D prints. Van PETG en TPU tot combinatiestructuren en bevestigingstips voor tuin, gevel, sensoren en auto-interieur.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["3D print outdoor", "PETG", "TPU", "buitenprojecten"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Outdoor 3D print advies door X3DPrints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-to: 3D print onderdelen voor buitengebruik",
    description: "Materialen, bevestiging en ontwerpregels zodat je prints zon, regen en trillingen overleven.",
    images: ["/images/og-home.jpg"],
  },
}

const attachmentTips = [
  {
    title: "Schroefgaten met speling",
    detail:
      "Voeg 0.2-0.3 mm marge toe voor PETG, 0.3-0.5 mm voor PLA covers en 0.1-0.2 mm voor TPU. Zo kan het materiaal uitzetten zonder scheuren.",
  },
  {
    title: "Messing inserts en hardware",
    detail:
      "Gebruik inserts of captive nuts voor onderdelen die trekkracht of regelmatige montage krijgen. Schroeven rechtstreeks in plastic lossen buiten snel.",
  },
  {
    title: "Nokken en kliksystemen",
    detail:
      "Laat onderdelen mechanisch ankeren via nokken of dovetails. Je verdeelt de belasting en vermijdt zichtbare schroeven.",
  },
  {
    title: "Drainage en afschuining",
    detail:
      "Voorzie afschuiningen of gaten zodat water weg kan. Stilstaand water versnelt degradatie en bevordert algvorming.",
  },
]

const bestPractices = [
  {
    title: "UV en weer",
    description:
      "PETG is UV-stabieler dan PLA maar niet onsterfelijk. Vermijd dat kritieke details continu in direct zonlicht staan of scherm ze af met covers.",
  },
  {
    title: "Warmtebeheer",
    description:
      "Zuidgevels of dashboards tikken 50-70 degrees C aan. Daar houdt PLA op; PETG en TPU blijven bruikbaar maar krijgen liever luchtcirculatie.",
  },
  {
    title: "Redundante montage",
    description:
      "Gebruik minimaal twee bevestigingspunten of een rail. Enkelvoudige schroefpunten scheuren sneller uit door wind en vibraties.",
  },
]

const scenarioMatrix = [
  { application: "Tuinsensor of weerstation", material: "PETG", reason: "Vocht en UV-bestendig, blijft maatvast rond 80 degrees C." },
  { application: "Gevelstuk of decor", material: "PLA cover + PETG kern", reason: "Esthetiek buiten, maar sterke kern voor montage." },
  { application: "Fietshouder of clamp", material: "TPU of PETG", reason: "TPU voor grip; PETG voor stijve basis of montageplaat." },
  { application: "Auto-interieur", material: "PETG", reason: "Vormvast bij hoge temperaturen achter glas." },
  { application: "Trillende componenten", material: "TPU", reason: "Dempt vibraties en verdeelt belasting rond schroeven." },
]

const externalResources = [
  {
    label: "Bambu Lab PETG guide",
    href: "https://wiki.bambulab.com/en/filament/petg",
    description: "OfficiAle parameters voor PETG, inclusief droogadvies en AMS tips.",
  },
  {
    label: "Prusa: prints voorbereiden voor outdoor gebruik",
    href: "https://help.prusa3d.com/article/how-to-prepare-prints-for-outdoor-use_2175",
    description: "Aanvullende tips rond lakken, UV-coatings en materiaalkeuze.",
  },
  {
    label: "Ultimaker: PETG vs PLA comparison",
    href: "https://support.makerbot.com/s/article/1667336228714",
    description: "Vergelijking tussen PLA en PETG over hitte en vochtbestendigheid.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hoe 3D print je onderdelen voor buitengebruik?",
  description:
    "Praktische gids voor outdoor 3D print projecten met PETG, TPU en hybride constructies. Inclusief bevestigingstips en kostinschatting.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/images/og-home.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

export default function OutdoorPrintingGuidePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_60%_at_50%_-10%,rgba(16,185,129,0.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pt-16 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">How-to gids</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe 3D print je onderdelen voor buitengebruik?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Outdoor 3D prints lijken simpel, tot zon, regen en temperatuurschommelingen hun werk doen. In deze gids leer je
              welke materialen standhouden, hoe je bevestigt zonder scheuren en waar PLA toch een rol speelt zonder vroegtijdige
              degradatie.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?material=PETG">Plan een outdoor print</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5"
              >
                Bekijk materialen
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5"
              >
                Bekijk prijzen & calculator
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Publicatiedatum 21 november 2025 - Onderdeel van de X3DPrints knowledge hub met links naar materiaalblogs en
              productieaanpak.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Waarom PLA buiten bijna altijd fout loopt</h2>
              <p className="mt-3 text-sm text-slate-600">
                PLA is fantastisch voor interieur, displays en prototypes, maar buiten brokkelt het razendsnel af. UV-licht tast
                de polymeren aan, vocht kruipt in micro-scheurtjes en rond 55 degrees C wordt PLA alweer zacht. Een zonnige gevel of een
                auto-interieur haalt dat probleemloos.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- T_g rond 55-60 degrees C: dashboards, serres en zwarte gevels halen die temperatuur probleemloos.</li>
                <li>- UV zorgt voor verkleuring en broosheid na enkele weken.</li>
                <li>- Temperatuurschommelingen veroorzaken micro-scheuren, zeker rond schroefpunten.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Wil je het toch proberen? Lees eerst de{" "}
                <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PLA blog
                </Link>{" "}
                voor alle waarschuwingen rond warmte en UV. Gebruik PLA enkel als decoratieve cover die over een PETG kern schuift.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PETG: de betrouwbare keuze voor buiten</h2>
              <p className="mt-3 text-sm text-slate-600">
                PETG combineert taaiheid met chemische bestendigheid en blijft maatvast tot ongeveer 80 degrees C. Perfect voor
                behuizingen, sensoren, tuinverlichting en fietsklemmen die buiten blijven staan.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- Beter bestand tegen UV en vocht dan PLA.</li>
                <li>- Buigt voor het breekt, ideaal voor klemmen of sensormounts.</li>
                <li>- Beschikbaar in translucent varianten voor verlichting.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Typische toepassingen: sensorkasten, tuinverlichting, brackets aan fietsen of gevels en voertuigelementen zonder
                extreme hitte. Duik dieper in de{" "}
                <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PETG blog
                </Link>{" "}
                voor studio-instellingen en droogtips.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                Extra lektuur:{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/petg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline"
                >
                  Bambu Lab PETG handleiding
                </Link>{" "}
                over vochtbeheer en AMS-profielen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">TPU: grip, demping en tolerantie</h2>
              <p className="mt-3 text-sm text-slate-600">
                Flexibele onderdelen die buiten gebruikt worden? TPU vangt trillingen op, zorgt voor grip en sluitingen. Perfect
                voor kabeldoorvoeren, sleeves, afdichtingen en rubberachtige klemmen rond buizen of regenpijpen.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- Blijft elastisch in weer en wind, zolang wanden niet extreem dun zijn.</li>
                <li>- Combineert goed met PETG frames voor hybride klemmen.</li>
                <li>- Afhankelijk van de blend UV-stabiel genoeg voor buiten.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Meer praktijkvoorbeelden en instellingen vind je in{" "}
                <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Filament Vrijdag: TPU
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Hybride constructies: PLA + PETG + TPU</h2>
              <p className="mt-3 text-sm text-slate-600">
                Soms wil je PLA Matte of Marble look buiten, maar met de zekerheid van PETG. Dat kan door de rollen slim te
                verdelen:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- PLA cover als zichtdeel, PETG kern voor sterkte.</li>
                <li>- TPU inserts voor klemkracht of trillingsdemping.</li>
                <li>- PETG basis met PLA Marble ornamenten die je snel kan vervangen.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Voorbeeld: gevelsensor met PLA Matte cover, PETG body en TPU kabeldoorvoeren. Zo combineer je esthetiek en
                functionaliteit zonder dat het geheel na zes maanden loslaat.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe bevestig je outdoor onderdelen?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Het juiste filament is een goed begin, maar veel falen is te wijten aan montage. Volg deze best practices:
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {attachmentTips.map((tip) => (
                  <div key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{tip.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {bestPractices.map((practice, index) => (
            <Reveal key={practice.title} delay={index * 0.05}>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Best practice</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{practice.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{practice.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Materiaalkeuze per scenario</h2>
              <p className="mt-2 text-sm text-slate-600">
                Gebruik dit overzicht als startpunt. De exacte keuze hangt af van formaat, bevestiging en budget.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Toepassing</th>
                      <th className="py-2 pr-4">Beste materiaal</th>
                      <th className="py-2 pr-4">Waarom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scenarioMatrix.map((row) => (
                      <tr key={row.application}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.application}</td>
                        <td className="py-3 pr-4">{row.material}</td>
                        <td className="py-3 pr-4">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Nog twijfels? Gebruik de{" "}
                <Link href="/materials#material-suggestion-tool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Material Suggestion Tool
                </Link>{" "}
                of vraag meteen advies op maat.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wat kost een buitenbestendig project?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Outdoor prints vragen meestal PETG of TPU, dikkere wanden en inserts. Dat verhoogt vooral de machine-uren. Check
                het{" "}
                <Link href="/materials" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  materialenoverzicht
                </Link>{" "}
                en de{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  pricing & calculator
                </Link>{" "}
                om te zien hoe materiaalkeuze doorweegt.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- PETG en TPU printen trager dan PLA, wat meer machine-uren betekent.</li>
                <li>- Inserts, ribben of redundanties verhogen de printtijd maar voorkomen service calls achteraf.</li>
                <li>- We stemmen wanddikte en infil op gebruik: dikker waar last zit, lichter waar het enkel zichtwerk is.</li>
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Externe bronnen</h2>
              <p className="mt-2 text-sm text-slate-600">Meer lezen? Deze bronnen bevestigen onze aanbevelingen:</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {externalResources.map((resource) => (
                  <li key={resource.href} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <Link
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {resource.label}
                    </Link>
                    <p className="mt-1">{resource.description}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Wil je zeker zijn dat je ontwerp buiten overleeft?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Upload je STL/STEP en vertel hoe het onderdeel gebruikt wordt (zon, trillingen, montage). We sturen een eerlijk
                  voorstel met materiaalkeuze, bevestigingstips en budgetindicatie.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=outdoor-printing">Plan outdoor advies</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">
                  Upload bestanden via de viewer
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

