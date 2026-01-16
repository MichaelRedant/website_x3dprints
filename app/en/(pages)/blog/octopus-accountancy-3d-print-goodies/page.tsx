import type { Metadata } from "next"
import OctopusCasePage, { EN_METADATA } from "@/app/(pages)/blog/octopus-accountancy-3d-print-goodies/page"

export const metadata: Metadata = EN_METADATA

export default function OctopusCasePageEn() {
  return <OctopusCasePage searchParams={{ lang: "en" }} />
}
