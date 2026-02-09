import type { Metadata } from "next"
import { renderOctopusCase } from "@/app/(pages)/blog/octopus-accountancy-3d-print-goodies/octopus-case-content"
import { EN_METADATA } from "@/app/(pages)/blog/octopus-accountancy-3d-print-goodies/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function OctopusCasePageEn() {
  return renderOctopusCase("en")
}
