import type { Metadata } from "next"
import HomePage, { EN_METADATA } from "@/app/page"

export const metadata: Metadata = EN_METADATA

export default function HomePageEn() {
  return <HomePage searchParams={{ lang: "en" }} />
}
