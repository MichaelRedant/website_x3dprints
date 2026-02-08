import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D printing by segment | X3DPrints",
  description: "Landing pages for common 3D printing segments: prototypes, schools, model builders and engineers.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/segments/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/",
      "en-BE": "https://www.x3dprints.be/en/segments/",
      "x-default": "https://www.x3dprints.be/segments/",
    },
  },
  openGraph: {
    title: "3D printing by segment",
    description: "Find the right 3D printing guidance for prototypes, education, model builders and engineers.",
    url: "https://www.x3dprints.be/en/segments/",
    images: [{ url: "/images/og-segments.jpg", width: 1200, height: 630, alt: "3D printing segments by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

