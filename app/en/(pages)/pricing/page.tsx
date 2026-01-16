import type { Metadata } from "next"
import PricingPage, { EN_METADATA } from "@/app/(pages)/pricing/page"

export const metadata: Metadata = EN_METADATA

export default function PricingPageEn() {
  return <PricingPage searchParams={{ lang: "en" }} />
}
