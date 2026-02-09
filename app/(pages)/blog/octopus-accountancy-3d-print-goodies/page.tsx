import type { Metadata } from "next"
import { NL_METADATA, renderOctopusCase } from "./octopus-case-content"

export const metadata: Metadata = NL_METADATA

export default function OctopusCasePage() {
  return renderOctopusCase("nl")
}
