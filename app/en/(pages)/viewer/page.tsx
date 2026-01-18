import type { Metadata } from "next"

import Link from "next/link"
import Container from "@/components/Container"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ModelViewerClient from "@/components/ModelViewerClient"

export const metadata: Metadata = {
  title: "Realtime 3D Model Viewer for STLs | X3DPrints",
  description:
    "Upload an STL, OBJ or GLB and instantly preview your 3D print. Everything stays in your browser with validation, privacy and smooth interaction.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/viewer",
    languages: {
      "nl-BE": "https://www.x3dprints.be/viewer",
      en: "https://www.x3dprints.be/en/viewer",
    },
  },
  openGraph: {
    title: "Realtime 3D Model Viewer for STLs",
    description:
      "Upload an STL, OBJ or GLB and see immediately how your print looks. Privacy-friendly, performant and in X3DPrints style.",
    url: "https://www.x3dprints.be/en/viewer",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",

    inLanguage: ["nl-BE", "en-BE"],
    name: "View STL/OBJ in the X3DPrints 3D Viewer",
    description: "Fast in-browser preview without uploads to servers, including mesh stats.",
    supply: [{ "@type": "HowToSupply", name: "STL, OBJ or GLB file (max ~15 MB)" }],
    step: workflow.map((item) => ({ "@type": "HowToStep", name: item.step, text: item.copy })),
    tool: [{ "@type": "HowToTool", name: "X3DPrints WebGL viewer" }],
  }

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
              See your 3D print in realtime, in the browser
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Upload your 3D model and explore it in a polished WebGL viewer. No wait times, no server upload - just instant mesh insights and an experience in X3DPrints style.
            </p>
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
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Material Suggestion Tool
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Read the blog
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-white/30 bg-white/60 p-4 shadow-2xl backdrop-blur">
              <ModelViewerClient className="h-[520px] w-full rounded-[1.5rem] bg-slate-900/80" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
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

      <section className="pb-24">
        <Container>
          <Reveal className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-900">From preview to print</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Use the viewer as a quick sanity check. That way we can move faster together when you request a quote or custom project.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
