import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SHOP_PRODUCT_SLUGS } from "@/content/shop-products"
import { getShopProductBySlug, getShopProducts } from "@/lib/shop-data"
import { pickRelatedProducts } from "@/lib/shop-related"
import { buildShopProductMetadata, renderShopProductPage } from "./product-page"

export function generateStaticParams() {
  return SHOP_PRODUCT_SLUGS.map((slug) => ({ slug }))
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
  const products = await getShopProducts("nl")
  const seedTags = product.tags?.length ? product.tags : product.categories ?? []
  const relatedProducts = pickRelatedProducts({
    products,
    tags: seedTags,
    excludeSlugs: [product.slug],
    limit: 4,
  })
  return renderShopProductPage({ product, locale: "nl", relatedProducts })
}
