import type { Metadata } from "next"
import SegmentsPage, { EN_METADATA } from "@/app/(pages)/segments/page"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function SegmentsPageEn(props: PageProps) {
  return <SegmentsPage {...props} locale="en" />
}
