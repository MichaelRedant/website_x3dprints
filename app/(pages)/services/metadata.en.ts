import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D Print Service in Belgium | X3DPrints",
  description:
    "Local FDM 3D printing from Herzele for 3D model print projects and small to large batches in PLA, PETG or TPU, including support for 3D printing Gent teams.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/services/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/services/",
      "en-BE": "https://www.x3dprints.be/en/services/",
      "x-default": "https://www.x3dprints.be/services/",
    },
  },
  openGraph: {
    title: "3D print service in Belgium",
    description:
      "Small to large batches, fast follow-up and pragmatic advice on material and design for 3D printing Gent and Belgium projects.",
    url: "https://www.x3dprints.be/en/services/",
    images: [{ url: "/images/og-services-en.svg", width: 1200, height: 630, alt: "3D printing service in Belgium" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print service in Belgium",
    description:
      "Small to large batches, fast follow-up and pragmatic advice on material and design for 3D printing Gent and Belgium projects.",
    images: ["/images/og-services-en.svg"],
  },
}
