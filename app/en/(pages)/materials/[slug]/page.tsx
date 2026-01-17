import type { Metadata } from "next"
import MaterialDetailPage, {
  generateMetadata as baseGenerateMetadata,
  generateStaticParams,
} from "@/app/(pages)/materials/[slug]/page"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams?: { lang?: string }
}

export { generateStaticParams }

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  return baseGenerateMetadata({
    ...props,
    searchParams: { ...props.searchParams, lang: "en" },
  })
}

export default function MaterialDetailPageEn(props: PageProps) {
  return <MaterialDetailPage {...props} searchParams={{ ...props.searchParams, lang: "en" }} />
}
