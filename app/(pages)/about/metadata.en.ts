import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "About X3DPrints | 3D print studio in Herzele",
  description:
    "Meet X3DPrints: a compact 3D printing studio in Herzele for prototypes and small to large batches. Direct contact, honest material advice and clean finishing.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/about/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/about",
      "en-BE": "https://www.x3dprints.be/en/about",
      "x-default": "https://www.x3dprints.be/about",
    },
  },
  openGraph: {
    title: "About X3DPrints",
    description:
      "Compact 3D printing studio in Herzele. PLA as standard, with PETG, ABS/ASA, Nylon and PA-CF when the project demands it.",
    url: "https://www.x3dprints.be/en/about",
    images: [{ url: "/images/og-home.svg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

