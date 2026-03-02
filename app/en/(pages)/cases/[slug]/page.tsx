import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generateStaticParams } from "@/app/(pages)/cases/[slug]/page"
import { getCaseDetailMetadata, renderCaseDetail } from "@/app/(pages)/cases/[slug]/case-detail"

type PageProps = {
  params: Promise<{ slug: string }>
}

export { generateStaticParams }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return getCaseDetailMetadata({ slug, locale: "en" })
}

export default async function CaseDetailPageEn({ params }: PageProps) {
  const { slug } = await params
  const page = renderCaseDetail({ slug, locale: "en" })
  if (!page) notFound()
  return page
}
