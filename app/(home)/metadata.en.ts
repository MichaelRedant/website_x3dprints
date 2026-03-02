import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "Custom 3D printing for businesses and individuals | X3DPrints",
  description:
    "From replacement parts and organizers to prototypes, retail items, fidget toys and figurines. Local production in Belgium with fast communication.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/",
      "en-BE": "https://www.x3dprints.be/en/",
      "x-default": "https://www.x3dprints.be/",
    },
  },
  openGraph: {
    title: "Custom 3D printing for businesses and individuals | X3DPrints",
    description:
      "Replacement parts, organizers, prototypes, retail items, fidget toys and figurines. Printed fast and local in Belgium.",
    url: "https://www.x3dprints.be/en/",
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom 3D printing for businesses and individuals | X3DPrints",
    description: "3D printing in Belgium for parts, organizers, prototypes, retail items and more.",
    images: ["/images/og-home-en.svg"],
  },
}
