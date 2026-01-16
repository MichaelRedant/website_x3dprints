import type { Metadata } from "next"
import ServicesPage, { EN_METADATA } from "@/app/(pages)/services/page"

export const metadata: Metadata = EN_METADATA

export default function ServicesPageEn() {
  return <ServicesPage searchParams={{ lang: "en" }} />
}
