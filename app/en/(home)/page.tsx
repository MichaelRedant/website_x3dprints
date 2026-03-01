import type { Metadata } from "next"
import HomePage from "@/app/(home)/page"
import { EN_METADATA } from "@/app/(home)/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function HomePageEn() {
  return <HomePage localeOverride="en" />
}
