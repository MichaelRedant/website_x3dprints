import type { Metadata } from "next"
import AboutPage from "@/app/(pages)/about/page"
import { EN_METADATA } from "@/app/(pages)/about/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function AboutPageEn() {
  return <AboutPage localeOverride="en" />
}

