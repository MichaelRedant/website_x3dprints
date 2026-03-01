import type { Metadata } from "next"
import { renderMaterialsPage } from "@/app/(pages)/materials/materials-page"

export const metadata: Metadata = {
  title: "3D printing materials (PLA, PETG, TPU) | X3DPrints",
  description:
    "3D printing materials in Flanders: PLA Matte/Silk/Wood, PETG, TPU and specials. See properties, colours and stock and get free material advice.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/materials/",
    languages: {
      "en-BE": "https://www.x3dprints.be/en/materials/",
      "nl-BE": "https://www.x3dprints.be/materials/",
      "x-default": "https://www.x3dprints.be/materials/",
    },
  },
  openGraph: {
    title: "3D printing materials | X3DPrints",
    description:
      "3D printing materials: PLA variants, PETG and TPU with colours, specs and stock status.",
    url: "https://www.x3dprints.be/en/materials/",
    images: [
      {
        url: "/images/og-materials-en.svg",
        width: 1200,
        height: 630,
        alt: "3D printing materials at X3DPrints",
      },
    ],
    siteName: "X3DPrints",
    locale: "en_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing materials | X3DPrints",
    description:
      "Compare PLA variants, PETG and TPU by look, strength and practical use for your project.",
    images: ["/images/og-materials-en.svg"],
  },
}

export default function MaterialsPageEn() {
  return renderMaterialsPage({ locale: "en" })
}

