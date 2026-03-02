import type { Metadata } from "next"
import PricingPage from "@/app/(pages)/pricing/page"
import { EN_METADATA } from "@/app/(pages)/pricing/metadata.en"

export const metadata: Metadata = EN_METADATA

const PricingPageWithLocale = PricingPage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof PricingPage>

export default function PricingPageEn() {
  return <PricingPageWithLocale localeOverride="en" />
}

