import type { Metadata } from "next"

import Link from "next/link"
import Container from "@/components/Container"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ModelViewerClient from "@/components/ModelViewerClient"
import OrganizerCta from "@/components/OrganizerCta"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import ShimmerButton from "@/components/ShimmerButton"
import { buildHowToSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Realtime 3D Model Viewer voor STL's | X3DPrints",
  description:
    "Upload een STL, OBJ of GLB en check direct je 3D model printen workflow. Valideer 3D print onderdelen lokaal in de browser met privacy en snelle interactie.",
  alternates: {
    canonical: "https://www.x3dprints.be/viewer/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/viewer/",
      "en-BE": "https://www.x3dprints.be/en/viewer/",
      "x-default": "https://www.x3dprints.be/viewer/",
    },
  },
  openGraph: {
    title: "Realtime 3D Model Viewer voor STL's",
    description:
      "Upload een STL, OBJ of GLB en bekijk meteen hoe je print eruitziet. Privacyvriendelijk, performant en in de stijl van X3DPrints.",
    url: "https://www.x3dprints.be/viewer/",
    images: [{ url: "/images/portfolio/20241024_081839-1.jpg", width: 1200, height: 630, alt: "3D viewer" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const tocItems = [
    { id: "viewer-canvas", label: "Hoe werkt de 3D preview?" },
    { id: "viewer-highlights", label: "Welke technische highlights zijn ingebouwd?" },
    { id: "viewer-workflow", label: "Hoe ga je van preview naar offerte?" },
    { id: "viewer-next", label: "Wat is je snelste volgende stap?" },
    { id: "viewer-sources", label: "Bronnen en referenties" },
  ]
  const references = [
    { label: "Three.js documentatie", url: "https://threejs.org/docs/" },
    { label: "Google WebGL performance fundamentals", url: "https://developers.google.com/web/fundamentals/performance/rendering" },
    { label: "Schema.org HowTo", url: "https://schema.org/HowTo" },
  ]
  const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

  const bullets = [
    "WebGL-viewer met orbit controls en auto-rotate (uitschakelbaar)",
    "On-device parsing met STL/OBJ/GLB-ondersteuning tot 15 MB",
    "Mesh stats voor snelle sanity-checks voor je offerte-aanvraag",
  ]

  const highlights = [
    {
      title: "Performance voorop",
      description:
        "Adaptive pixel density, orbit damping en lightweight shadows houden de viewer soepel - ook op mobiel.",
    },
    {
      title: "Validatie zonder stress",
      description:
        "We valideren bestandsgrootte en formaten direct. Fouten verschijnen met duidelijke uitleg en advies.",
    },
    {
      title: "Privacy by design",
      description:
        "Geen upload naar servers: het model leeft enkel in de browser en verdwijnt zodra je refresh of sluit.",
    },
  ]

  const workflow = [
    {
      step: "1. Upload of drop",
      copy: "Sleep je STL, OBJ of GLB in de dropzone. We accepteren tot 15 MB, ideaal voor snelle previews.",
    },
    {
      step: "2. Interpreteer de mesh",
      copy: "Draai, zoom en check vertex/face-count. Zo weet je meteen of het model klaar is voor productie.",
    },
    {
      step: "3. Deel feedback",
      copy: "Tevreden? Stuur het bestand mee via het offerteformulier voor prijs en planning op maat.",
    },
  ]

  const pageUrl = "https://www.x3dprints.be/viewer/"
  const howToJsonLd = buildHowToSchema({
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
    name: "STL/OBJ bekijken in de X3DPrints 3D Viewer",
    description: "Snelle in-browser preview zonder uploads naar servers, inclusief mesh stats.",
    steps: workflow.map((item) => ({ name: item.step, text: item.copy })),
    supplyNames: ["STL, OBJ of GLB bestand (max ~15 MB)"],
    toolNames: ["X3DPrints WebGL viewer"],
  })

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-30%] h-[480px] bg-[radial-gradient(circle_at_top,#1e3a8a33,transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-40%] w-[560px] rounded-full bg-[radial-gradient(circle,#0ea5e944,transparent_70%)] blur-3xl" />

      <section className="py-20 sm:py-24">
        <Container className="relative">
          <Reveal className="max-w-3xl stacked-content">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden /> Nieuw: 3D preview
            </p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Bekijk je 3D model en 3D print realtime in de browser
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Upload je 3D-model en ontdek hoe de print eruitziet in een glanzende WebGL-viewer. Ideaal om 3D model printen
              vooraf te controleren en 3D print onderdelen te valideren. Geen wachttijd, geen upload naar servers.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <ul className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton
                href="/contact?quote=Viewer%20check%20gedaan%2C%20graag%20offerte"
                event={{ action: "cta_click", category: "viewer_hero", label: "contact_prefill" }}
              >
                Vraag offerte na preview
              </ShimmerButton>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Material Suggestion Tool
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Bekijk services
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Lees de blog
              </Link>
            </div>
            <ContentTableOfContents title="Inhoud" items={tocItems} className="mt-6 max-w-2xl" />
          </Reveal>
        </Container>
      </section>

      <section id="viewer-canvas" className="scroll-mt-28 pb-20">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-white/30 bg-white/60 p-4 shadow-2xl backdrop-blur">
              <ModelViewerClient className="h-[520px] w-full rounded-[1.5rem] bg-slate-900/80" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="viewer-highlights" className="scroll-mt-28 pb-20">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-3">
            {highlights.map((item) => (
              <GlassCard key={item.title} className="bg-white/50">
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
              </GlassCard>
            ))}
          </Reveal>
        </Container>
      </section>

      <section id="viewer-workflow" className="scroll-mt-28 pb-24">
        <Container>
          <Reveal className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-900">Van preview naar print</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Gebruik de viewer als snelle sanity-check. Zo kunnen we samen efficienter schakelen wanneer je een offerte
              of maatwerktraject aanvraagt bij een 3D print service Belgie.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {workflow.map((item) => (
                <div
                  key={item.step}
                  className="rounded-3xl border border-slate-200/80 bg-white/70 p-5 text-sm text-slate-600 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.step}</p>
                  <p className="mt-3 text-slate-700">{item.copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Tip: Deel de face/vertex-count bij je aanvraag. Zo kunnen we meteen inschatten welke printinstellingen geschikt zijn.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="viewer-next" className="scroll-mt-28 pb-20">
        <Container>
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Wat is je snelste volgende stap?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Gebruik je preview direct als intake-context. Zo kunnen we materiaal en pricing sneller scherpstellen.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href="/contact?quote=Viewer%20analyse%20voltooid%2C%20ik%20wil%20prijsvoorstel"
                  event={{ action: "cta_click", category: "viewer_next", label: "contact_prefill" }}
                >
                  Start offerteflow
                </ShimmerButton>
                <ShimmerButton
                  href="/pricing?utm_source=viewer&utm_medium=cta&utm_campaign=viewer-next"
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "viewer_next", label: "pricing" }}
                >
                  Open pricing calculator
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </Container>
      </section>

      <section id="viewer-sources" className="scroll-mt-28 pb-20">
        <Container>
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <OrganizerCta />
        </Container>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
