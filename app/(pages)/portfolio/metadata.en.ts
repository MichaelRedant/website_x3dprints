import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D printing portfolio & case studies | X3DPrints",
  description:
    "See real-world 3D printing projects: functional parts, merchandising and gifts produced in Herzele (Ghent).",
  alternates: {
    canonical: "https://www.x3dprints.be/en/portfolio/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/portfolio/",
      "en-BE": "https://www.x3dprints.be/en/portfolio/",
      "x-default": "https://www.x3dprints.be/portfolio/",
    },
  },
  openGraph: {
    title: "3D printing portfolio & case studies | X3DPrints",
    description:
      "Photo series and timelapses of custom 3D prints: prototypes, merchandising and personalized gifts from the Herzele studio.",
    url: "https://www.x3dprints.be/en/portfolio/",
    images: [{ url: "/images/og-portfolio-en.svg", width: 1200, height: 630, alt: "3D printing portfolio projects" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing portfolio & case studies | X3DPrints",
    description:
      "Functional prototypes, merchandising and gifts: see how X3DPrints delivers projects for SMEs, events and designers.",
    images: ["/images/og-portfolio-en.svg"],
  },
}

