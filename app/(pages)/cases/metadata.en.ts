import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D printing case studies | X3DPrints",
  description:
    "Explore X3DPrints case studies: B2B pilots, retail POS, repair workflows and local impact projects with measurable outcomes.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/cases/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/cases/",
      "en-BE": "https://www.x3dprints.be/en/cases/",
      "x-default": "https://www.x3dprints.be/cases/",
    },
  },
  openGraph: {
    title: "3D printing case studies",
    description:
      "Live cases and upcoming pipeline for B2B, retail and repair workflows, including materials, timing and results.",
    url: "https://www.x3dprints.be/en/cases/",
    images: [{ url: "/images/og-cases-en.svg", width: 1200, height: 630, alt: "X3DPrints case studies" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing case studies | X3DPrints",
    description: "Case hub with live projects, publication pipeline and direct intake CTA.",
    images: ["/images/og-cases-en.svg"],
  },
}
