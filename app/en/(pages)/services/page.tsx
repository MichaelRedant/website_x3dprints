import type { Metadata } from "next"
import ServicesPage from "@/app/(pages)/services/page"
import { EN_METADATA } from "@/app/(pages)/services/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function ServicesPageEn() {
  return <ServicesPage localeOverride="en" />
}

