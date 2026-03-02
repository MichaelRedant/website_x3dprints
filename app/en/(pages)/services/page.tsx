import type { Metadata } from "next"
import ServicesPage from "@/app/(pages)/services/page"
import { EN_METADATA } from "@/app/(pages)/services/metadata.en"

export const metadata: Metadata = EN_METADATA

const ServicesPageWithLocale = ServicesPage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof ServicesPage>

export default function ServicesPageEn() {
  return <ServicesPageWithLocale localeOverride="en" />
}

