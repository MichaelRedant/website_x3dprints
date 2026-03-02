import type { Metadata } from "next"
import PortfolioPage from "@/app/(pages)/portfolio/page"
import { EN_METADATA } from "@/app/(pages)/portfolio/metadata.en"

export const metadata: Metadata = EN_METADATA

const PortfolioPageWithLocale = PortfolioPage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof PortfolioPage>

export default function PortfolioPageEn() {
  return <PortfolioPageWithLocale localeOverride="en" />
}

