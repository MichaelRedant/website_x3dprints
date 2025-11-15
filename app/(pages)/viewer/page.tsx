import type { Metadata } from "next"

import Container from "@/components/Container"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ModelViewerClient from "@/components/ModelViewerClient"

export const metadata: Metadata = {
  title: "Realtime 3D Model Viewer voor STL's | X3DPrints",
  description:
    "Upload een STL, OBJ of GLB en bekijk meteen hoe je 3D print oogt. Alles gebeurt lokaal in je browser met validatie, privacy en snelle interactie.",
  alternates: { canonical: "https://www.x3dprints.be/viewer" },
  openGraph: {
    title: "Realtime 3D Model Viewer voor STL's",
    description:
      "Upload een STL, OBJ of GLB en bekijk meteen hoe je print eruitziet. Privacyvriendelijk, performant en in de stijl van X3DPrints.",
    url: "https://www.x3dprints.be/viewer",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const bullets = [
    "WebGL-viewer met orbit controls en auto-rotate (uitschakelbaar)",
    "On-device parsing met STL/OBJ/GLB-ondersteuning tot 15 MB",
    "Mesh stats voor snelle sanity-checks vóór je offerte-aanvraag",
  ]

  const highlights = [
    {
      title: "Performance voorop",
      description:
        "Adaptive pixel density, orbit damping en lightweight shadows houden de viewer soepel — ook op mobiel.",
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

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-30%] h-[480px] bg-[radial-gradient(circle_at_top,#1e3a8a33,transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-40%] w-[560px] rounded-full bg-[radial-gradient(circle,#0ea5e944,transparent_70%)] blur-3xl" />

      <section className="py-20 sm:py-24">
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden /> Nieuw: 3D preview
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Bekijk je 3D print realtime in de browser
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Upload je 3D-model en ontdek hoe de print eruitziet in een glanzende WebGL-viewer. Geen wachttijd, geen upload naar
              servers — wel inzicht in meshkwaliteit en een ervaring in X3DPrints-stijl.
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
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <Reveal>
            <ModelViewerClient />
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
            <h2 className="text-2xl font-semibold text-slate-900">Van preview naar print</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Gebruik de viewer als snelle sanity-check. Zo kunnen we samen efficiënter schakelen wanneer je een offerte of
              maatwerktraject aanvraagt.
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
    </main>
  )
}
