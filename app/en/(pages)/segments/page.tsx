import type { Metadata } from "next"
import SegmentsPage from "@/app/(pages)/segments/page"
import { EN_METADATA } from "@/app/(pages)/segments/metadata.en"

export const metadata: Metadata = EN_METADATA

const SegmentsPageWithLocale = SegmentsPage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof SegmentsPage>

export default function SegmentsPageEn() {
  return <SegmentsPageWithLocale localeOverride="en" />
}

