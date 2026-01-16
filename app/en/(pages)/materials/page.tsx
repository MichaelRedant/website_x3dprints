import type { Metadata } from "next"
import MaterialsPage from "@/app/(pages)/materials/page"

export const metadata: Metadata = {
  title: "3D printing materials (PLA, PETG, TPU) | X3DPrints",
  description:
    "3D printing materials in Flanders: PLA Matte/Silk/Wood, PETG, TPU and specials. See properties, colours and stock and get free material advice.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/materials",
    languages: {
      en: "https://www.x3dprints.be/en/materials",
      "nl-BE": "https://www.x3dprints.be/materials",
    },
  },
  openGraph: {
    title: "3D printing materials | X3DPrints",
    description:
      "3D printing materials: PLA variants, PETG and TPU with colours, specs and stock status.",
    url: "https://www.x3dprints.be/en/materials",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    siteName: "X3DPrints",
    locale: "en_BE",
  },
  twitter: { card: "summary_large_image" },
}

export default function MaterialsPageEn() {
  return <MaterialsPage searchParams={{ lang: "en" }} />
}
