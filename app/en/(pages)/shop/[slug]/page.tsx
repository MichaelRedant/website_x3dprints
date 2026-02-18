import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generateStaticParams } from "@/app/(pages)/shop/[slug]/page"
import { getShopProductBySlug, getShopProducts } from "@/lib/shop-data"
import { pickRelatedProducts } from "@/lib/shop-related"
import { buildShopProductMetadata, renderShopProductPage } from "@/app/(pages)/shop/[slug]/product-page"

export { generateStaticParams }

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
  const products = await getShopProducts("en")
  const seedTags = product.tags?.length ? product.tags : product.categories ?? []
  const relatedProducts = pickRelatedProducts({
    products,
    tags: seedTags,
    excludeSlugs: [product.slug],
    limit: 4,
  })
  return renderShopProductPage({ product, locale: "en", relatedProducts })
}
