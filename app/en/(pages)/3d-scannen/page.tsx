import type { Metadata } from "next"
import ScanningPage from "@/app/(pages)/3d-scannen/page"
import { EN_METADATA } from "@/app/(pages)/3d-scannen/metadata.en"

export const metadata: Metadata = EN_METADATA

const ScanningPageWithLocale = ScanningPage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof ScanningPage>

export default function ScanningPageEn() {
  return <ScanningPageWithLocale localeOverride="en" />
}
