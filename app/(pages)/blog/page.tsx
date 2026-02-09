import type { Metadata } from "next"
import BlogPage from "./BlogPage"

const NL_METADATA: Metadata = {
  title: "3D print blog & kennisbank | X3DPrints",
  description:
    "Strategische 3D print artikels over kostprijs, materiaalkeuze, ontwerpchecklists en Bambu X1C instellingen. Inclusief links naar calculator en materiaaloverzicht.",
  alternates: {
    canonical: "https://www.x3dprints.be/blog/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/",
      "en-BE": "https://www.x3dprints.be/en/blog/",
      "x-default": "https://www.x3dprints.be/blog/",
    },
  },
  openGraph: {
    title: "3D print blog & kennisbank | X3DPrints",
    description:
      "Leer hoe je 3D print projecten plant: kostenraming, materiaalkeuze, designchecklists en Bambu X1C instellingen. Rechtstreekse links naar prijscalculator en materialen.",
    url: "https://www.x3dprints.be/blog/",
    images: [{ url: "/images/og-blog.jpg", width: 1200, height: 630, alt: "3D print blog X3DPrints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print blog & kennisbank | X3DPrints",
    description: "Strategische content over 3D print kosten, materiaalkeuze, Bambu X1C instellingen en ontwerpaanpak.",
    images: ["/images/og-blog.jpg"],
  },
}

export const metadata: Metadata = NL_METADATA

export default function Page() {
  return <BlogPage locale="nl" />
}
