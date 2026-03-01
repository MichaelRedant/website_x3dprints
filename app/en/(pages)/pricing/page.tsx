import type { Metadata } from "next"
import PricingPage from "@/app/(pages)/pricing/page"
import { EN_METADATA } from "@/app/(pages)/pricing/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function PricingPageEn() {
  return <PricingPage localeOverride="en" />
}

