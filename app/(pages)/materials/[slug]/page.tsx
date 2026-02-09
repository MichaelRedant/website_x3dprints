// app/(pages)/materials/[slug]/page.tsx
import type { Metadata } from "next"
import { MATERIAL_DETAIL_SLUGS } from "@/content/material-details"
import { getMaterialDetailMetadata, renderMaterialDetail } from "./material-detail"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return getMaterialDetailMetadata({ slug, locale: "nl" })
}

export function generateStaticParams(): { slug: string }[] {
  return MATERIAL_DETAIL_SLUGS.map((slug) => ({ slug }))
}

export default async function MaterialDetailPage({ params }: PageProps) {
  const { slug } = await params
  return renderMaterialDetail({ slug, locale: "nl" })
}