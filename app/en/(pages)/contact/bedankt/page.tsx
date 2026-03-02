import type { Metadata } from "next"
import ContactThankYouPage from "@/app/(pages)/contact/bedankt/page"
import { EN_METADATA } from "@/app/(pages)/contact/bedankt/metadata.en"

export const metadata: Metadata = EN_METADATA

const ContactThankYouPageWithLocale = ContactThankYouPage as unknown as (
  props: { localeOverride: "en" }
) => ReturnType<typeof ContactThankYouPage>

export default function ContactThankYouPageEn() {
  return <ContactThankYouPageWithLocale localeOverride="en" />
}
