import type { Metadata } from "next"
import AboutPage, { EN_METADATA } from "@/app/(pages)/about/page"

export const metadata: Metadata = EN_METADATA

export default function AboutPageEn() {
  return <AboutPage searchParams={{ lang: "en" }} />
}
