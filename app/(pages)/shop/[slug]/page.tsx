import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getShopProductBySlug, getShopProductSlugs } from "@/lib/shop-data"
import { buildShopProductMetadata, renderShopProductPage } from "./product-page"

export async function generateStaticParams() {
  const slugs = await getShopProductSlugs("nl")
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getShopProductBySlug(slug, "nl")
  if (!product) {
    return {
      title: "Product niet gevonden | X3DPrints",
      robots: { index: false, follow: false },
    }
  }
  return buildShopProductMetadata(product, "nl")
}

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getShopProductBySlug(slug, "nl")
  if (!product) return notFound()
  return renderShopProductPage({ product, locale: "nl" })
}
