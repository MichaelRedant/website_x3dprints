import type { Metadata } from "next"
import ContactPage from "@/app/(pages)/contact/page"
import { EN_METADATA } from "@/app/(pages)/contact/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function ContactPageEn() {
  return <ContactPage localeOverride="en" />
}

