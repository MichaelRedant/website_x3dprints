import type { Metadata } from "next"
import { generateStaticParams } from "@/app/(pages)/materials/[slug]/page"
import { getMaterialDetailMetadata, renderMaterialDetail } from "@/app/(pages)/materials/[slug]/material-detail"

type PageProps = {
  params: Promise<{ slug: string }>
}

export { generateStaticParams }

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params
  return getMaterialDetailMetadata({ slug, locale: "en" })
}

export default async function MaterialDetailPageEn({ params }: PageProps) {
  const { slug } = await params
  return renderMaterialDetail({ slug, locale: "en" })
}
