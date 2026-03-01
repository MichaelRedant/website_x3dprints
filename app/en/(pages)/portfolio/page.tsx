import type { Metadata } from "next"
import PortfolioPage from "@/app/(pages)/portfolio/page"
import { EN_METADATA } from "@/app/(pages)/portfolio/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function PortfolioPageEn() {
  return <PortfolioPage localeOverride="en" />
}

