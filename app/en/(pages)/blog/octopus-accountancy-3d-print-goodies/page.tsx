import type { Metadata } from "next"
import OctopusCasePage from "@/app/(pages)/blog/octopus-accountancy-3d-print-goodies/page"
import { EN_METADATA } from "@/app/(pages)/blog/octopus-accountancy-3d-print-goodies/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function OctopusCasePageEn(props: PageProps) {
  return <OctopusCasePage {...props} locale="en" />
}
