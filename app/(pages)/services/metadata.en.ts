import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "Custom 3D printing in Belgium for businesses and individuals | X3DPrints",
  description:
    "Local 3D printing in Belgium from Herzele for businesses and individuals. Parts, organizers, prototypes, retail items and custom pieces in PLA, PETG or TPU.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/services/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/services/",
      "en-BE": "https://www.x3dprints.be/en/services/",
      "x-default": "https://www.x3dprints.be/services/",
    },
  },
  openGraph: {
    title: "Custom 3D printing in Belgium | X3DPrints",
    description:
      "From functional parts and organizers to prototypes, retail items and custom pieces. Fast follow-up and clear material advice from a local studio.",
    url: "https://www.x3dprints.be/en/services/",
    images: [{ url: "/images/og-services-en.svg", width: 1200, height: 630, alt: "3D printing service in Belgium" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom 3D printing in Belgium",
    description:
      "3D printing for businesses and individuals: parts, organizers, prototypes and custom pieces with clear planning.",
    images: ["/images/og-services-en.svg"],
  },
}
