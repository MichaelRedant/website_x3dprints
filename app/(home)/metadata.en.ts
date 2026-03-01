import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D printing for businesses in Belgium | X3DPrints",
  description:
    "B2B 3D printing in Belgium from Herzele. We produce prototypes, jigs, fixtures and custom parts with clear quotes and reliable lead times.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/",
      "en-BE": "https://www.x3dprints.be/en/",
      "x-default": "https://www.x3dprints.be/",
    },
  },
  openGraph: {
    title: "3D printing for businesses in Belgium | X3DPrints",
    description:
      "From STL/STEP to production-ready prints for business use cases: prototypes, tooling and custom parts in Belgium.",
    url: "https://www.x3dprints.be/en/",
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for businesses in Belgium | X3DPrints",
    description: "B2B 3D printing for prototypes, jigs, fixtures and custom parts in Belgium.",
    images: ["/images/og-home-en.svg"],
  },
}
