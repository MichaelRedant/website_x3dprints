import type { Metadata } from "next"
import SegmentsPage, { EN_METADATA } from "@/app/(pages)/segments/page"

export const metadata: Metadata = EN_METADATA

export default function SegmentsPageEn() {
  return <SegmentsPage searchParams={{ lang: "en" }} />
}
