import type { Metadata } from "next"
import AboutPage from "@/app/(pages)/about/page"
import { EN_METADATA } from "@/app/(pages)/about/metadata.en"

export const metadata: Metadata = EN_METADATA

const AboutPageWithLocale = AboutPage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof AboutPage>

export default function AboutPageEn() {
  return <AboutPageWithLocale localeOverride="en" />
}

