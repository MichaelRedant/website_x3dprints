import type { Metadata } from "next"
import PricingPage, { EN_METADATA } from "@/app/(pages)/pricing/page"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function PricingPageEn(props: PageProps) {
  return <PricingPage {...props} locale="en" />
}
