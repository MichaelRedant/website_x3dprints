import type { Metadata } from "next"
import { NL_METADATA, renderOctopusCase } from "./octopus-case-content"

export const metadata: Metadata = NL_METADATA
const internalLinkSlots = ["/materials", "/pricing", "/contact"]
const DATE_MODIFIED = "2026-02-08"
void internalLinkSlots
void DATE_MODIFIED

export default function OctopusCasePage() {
  return renderOctopusCase("nl")
}
