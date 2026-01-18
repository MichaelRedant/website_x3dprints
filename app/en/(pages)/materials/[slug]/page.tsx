import type { Metadata } from "next"
import MaterialDetailPage, {
  generateMetadata as baseGenerateMetadata,
  generateStaticParams,
} from "@/app/(pages)/materials/[slug]/page"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ lang?: string } | undefined>
}

export { generateStaticParams }

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  return baseGenerateMetadata({ ...props, locale: "en" })
}

export default function MaterialDetailPageEn(props: PageProps) {
  return <MaterialDetailPage {...props} locale="en" />
}
