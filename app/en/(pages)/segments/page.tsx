import type { Metadata } from "next"
import SegmentsPage from "@/app/(pages)/segments/page"
import { EN_METADATA } from "@/app/(pages)/segments/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function SegmentsPageEn(props: PageProps) {
  return <SegmentsPage {...props} locale="en" />
}
