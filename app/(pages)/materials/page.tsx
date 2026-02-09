// app/(pages)/materials/page.tsx
import type { Metadata } from "next"
import { renderMaterialsPage } from "./materials-page"

export const metadata: Metadata = {
  title: "3D print materialen en 3D print materiaal kiezen | X3DPrints",
  description:
    "Vergelijk 3D print materialen in Vlaanderen: PLA Matte/Silk/Wood, PETG, TPU en specials. Gebruik de Material Suggestion Tool om te kiezen op basis van sterkte, look en prijsimpact.",
  alternates: {
    canonical: "https://www.x3dprints.be/materials/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/materials/",
      "en-BE": "https://www.x3dprints.be/en/materials/",
      "x-default": "https://www.x3dprints.be/materials/",
    },
  },
  openGraph: {
    title: "3D print materialen | PLA, PETG en TPU bij X3DPrints",
    description:
      "3D print materiaal kiezen: vergelijk PLA-varianten, PETG en TPU met kleuren, specs, voorraadstatus en advies via de Material Suggestion Tool.",
    url: "https://www.x3dprints.be/materials/",
    images: [
      {
        url: "/images/filament/petg_1.webp",
        width: 1200,
        height: 630,
        alt: "Materialen voor 3D printen bij X3DPrints",
      },
    ],
    siteName: "X3DPrints",
    locale: "nl_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print materialen | X3DPrints",
    description:
      "Vergelijk 3D print materiaal: PLA-varianten, PETG en TPU met kleuren, specs en voorraadstatus.",
    images: ["/images/filament/petg_1.webp"],
  },
}

export default function MaterialsPage() {
  return renderMaterialsPage({ locale: "nl" })
}