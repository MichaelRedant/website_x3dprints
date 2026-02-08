import type { Metadata } from "next"

import Link from "next/link"
import Container from "@/components/Container"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ModelViewerClient from "@/components/ModelViewerClient"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import ShimmerButton from "@/components/ShimmerButton"
import { buildHowToSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Realtime 3D Model Viewer for STLs | X3DPrints",
  description:
    "Upload an STL, OBJ or GLB and run fast 3D model print checks before quoting 3D print parts. Everything stays in-browser with validation, privacy and smooth interaction.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/viewer/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/viewer/",
      "en-BE": "https://www.x3dprints.be/en/viewer/",
      "x-default": "https://www.x3dprints.be/viewer/",
    },
  },
  openGraph: {
    title: "Realtime 3D Model Viewer for STLs",
    description:
      "Upload an STL, OBJ or GLB and see immediately how your print looks. Privacy-friendly, performant and in X3DPrints style.",
    url: "https://www.x3dprints.be/en/viewer/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const tocItems = [
    { id: "viewer-canvas", label: "How does the 3D preview work?" },
    { id: "viewer-highlights", label: "Which technical highlights are included?" },
    { id: "viewer-workflow", label: "How do you move from preview to quote?" },
    { id: "viewer-next", label: "What is the fastest next step?" },
    { id: "viewer-sources", label: "Sources and references" },
  ]
  const references = [
    { label: "Three.js documentation", url: "https://threejs.org/docs/" },
    { label: "Google WebGL performance fundamentals", url: "https://developers.google.com/web/fundamentals/performance/rendering" },
    { label: "Schema.org HowTo", url: "https://schema.org/HowTo" },
  ]
  const lastUpdatedLabel = "Last updated: February 6, 2026"

  const bullets = [
    "WebGL viewer with orbit controls and auto-rotate (toggleable)",
    "On-device parsing with STL/OBJ/GLB support up to ~15 MB",
    "Mesh stats for quick sanity checks before your quote request",
  ]

  const highlights = [
    {
      title: "Performance first",
      description:
        "Adaptive pixel density, orbit damping and lightweight shadows keep the viewer smooth - even on mobile.",
    },
    {
      title: "Validation without stress",
      description:
        "We validate file size and formats immediately. Errors show with clear guidance and tips.",
    },
    {
      title: "Privacy by design",
      description:
        "No uploads to servers: the model lives only in the browser and disappears when you refresh or close.",
    },
  ]

  const workflow = [
    {
      step: "1. Upload or drop",
      copy: "Drag your STL, OBJ or GLB into the dropzone. We accept up to ~15 MB for fast previews.",
    },
    {
      step: "2. Inspect the mesh",
      copy: "Rotate, zoom and check vertex/face counts. Instantly see if the model is production-ready.",
    },
    {
      step: "3. Share feedback",
      copy: "Happy? Send the file with your quote request for pricing and planning.",
    },
  ]

  const pageUrl = "https://www.x3dprints.be/en/viewer/"
  const howToJsonLd = buildHowToSchema({
    inLanguage: "en-BE",
    mainEntityOfPage: pageUrl,
    name: "View STL/OBJ in the X3DPrints 3D Viewer",
    description: "Fast in-browser preview without uploads to servers, including mesh stats.",
    steps: workflow.map((item) => ({ name: item.step, text: item.copy })),
    supplyNames: ["STL, OBJ or GLB file (max ~15 MB)"],
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
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden /> New: 3D preview
            </p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              See your 3D model and 3D print in realtime
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Upload your 3D model and explore it in a polished WebGL viewer. Ideal for 3D model print checks and 3D print parts validation before local production. No wait times, no server upload.
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
                href="/en/contact?quote=Viewer%20check%20completed%2C%20requesting%20quote"
                event={{ action: "cta_click", category: "viewer_hero_en", label: "contact_prefill" }}
              >
                Request quote after preview
              </ShimmerButton>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Material Suggestion Tool
              </Link>
              <Link
                href="/en/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                View services
              </Link>
              <Link
                href="/en/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Read the blog
              </Link>
            </div>
            <ContentTableOfContents title="Contents" items={tocItems} className="mt-6 max-w-2xl" />
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
              <GlassCard
                key={item.title}
                className="bg-white/90 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900/70 dark:ring-white/10"
              >
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </Reveal>
        </Container>
      </section>

      <section id="viewer-workflow" className="scroll-mt-28 pb-24">
        <Container>
          <Reveal className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-900">From preview to print</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Use the viewer as a quick sanity check. That way we can move faster together when you request a quote or custom project with a 3D printing Gent production flow.
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
              Tip: share the face/vertex count with your request. It helps us pick suitable print settings immediately.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="viewer-next" className="scroll-mt-28 pb-20">
        <Container>
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">What is your fastest next step?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use your preview as intake context so we can lock material choice and pricing faster.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href="/en/contact?quote=Viewer%20analysis%20completed%2C%20requesting%20pricing"
                  event={{ action: "cta_click", category: "viewer_next_en", label: "contact_prefill" }}
                >
                  Start quote flow
                </ShimmerButton>
                <ShimmerButton
                  href="/en/pricing?utm_source=viewer&utm_medium=cta&utm_campaign=viewer-next-en"
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "viewer_next_en", label: "pricing" }}
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
              <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}

