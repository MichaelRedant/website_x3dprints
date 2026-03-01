import type { Metadata } from "next"
import CasesPage from "./CasesPage"

export const metadata: Metadata = {
  title: "3D print cases en case studies | X3DPrints",
  description:
    "Ontdek 3D print case studies van X3DPrints: B2B pilots, retail POS, repair workflows en lokale impactcases met meetbare resultaten.",
  alternates: {
    canonical: "https://www.x3dprints.be/cases/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/cases/",
      "en-BE": "https://www.x3dprints.be/en/cases/",
      "x-default": "https://www.x3dprints.be/cases/",
    },
  },
  openGraph: {
    title: "3D print cases en case studies",
    description:
      "Live cases en pipeline voor B2B, retail en repair: inclusief materiaalkeuze, timing, kost en resultaten.",
    url: "https://www.x3dprints.be/cases/",
    images: [{ url: "/images/og-cases-nl.svg", width: 1200, height: 630, alt: "3D print cases van X3DPrints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print cases en case studies | X3DPrints",
    description: "Case hub met live cases, pipeline en directe intake CTA.",
    images: ["/images/og-cases-nl.svg"],
  },
}

export default function Page() {
  return <CasesPage locale="nl" />
}
