import type { Metadata } from "next"
import PricingPage from "@/app/(pages)/pricing/page"
import { EN_METADATA } from "@/app/(pages)/pricing/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function PricingPageEn(props: PageProps) {
  return <PricingPage {...props} searchParams={Promise.resolve({ lang: "en" })} />
}

