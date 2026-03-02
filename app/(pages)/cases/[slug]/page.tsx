import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCaseDetailMetadata, getCaseStaticParams, renderCaseDetail } from "./case-detail"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return getCaseStaticParams()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return getCaseDetailMetadata({ slug, locale: "nl" })
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const page = renderCaseDetail({ slug, locale: "nl" })
  if (!page) notFound()
  return page
}
