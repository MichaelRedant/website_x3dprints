import type { Metadata } from "next"
import SegmentsPage from "@/app/(pages)/segments/page"
import { EN_METADATA } from "@/app/(pages)/segments/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function SegmentsPageEn() {
  return <SegmentsPage localeOverride="en" />
}

