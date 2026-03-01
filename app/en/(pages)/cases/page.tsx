import type { Metadata } from "next"
import CasesPage from "@/app/(pages)/cases/CasesPage"
import { EN_METADATA } from "@/app/(pages)/cases/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function CasesPageEn() {
  return <CasesPage locale="en" />
}
