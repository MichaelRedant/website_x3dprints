import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getShopProductBySlug, getShopProductSlugs } from "@/lib/shop-data"
import { buildShopProductMetadata, renderShopProductPage } from "@/app/(pages)/shop/[slug]/product-page"

export async function generateStaticParams() {
  const slugs = await getShopProductSlugs("en")
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getShopProductBySlug(slug, "en")
  if (!product) {
    return {
      title: "Product not found | X3DPrints",
      robots: { index: false, follow: false },
    }
  }
  return buildShopProductMetadata(product, "en")
}

export default async function ShopProductPageEn({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getShopProductBySlug(slug, "en")
  if (!product) return notFound()
  return renderShopProductPage({ product, locale: "en" })
}
