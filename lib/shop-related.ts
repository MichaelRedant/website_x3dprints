import type { ShopProduct } from "@/content/shop-products"

function normalizeTags(tags?: string[]): string[] {
  if (!tags?.length) return []
  return tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)
}

function hasOverlap(tags: string[], tagSet: Set<string>) {
  for (const tag of tags) {
    if (tagSet.has(tag)) return true
  }
  return false
}

export function collectTagsForSlugs(products: ShopProduct[], slugs: string[]): string[] {
  const slugSet = new Set(slugs)
  const collected: string[] = []
  for (const product of products) {
    if (!slugSet.has(product.slug)) continue
    if (product.tags?.length) {
      collected.push(...product.tags)
    }
  }
  return normalizeTags(collected)
}

export function pickRelatedProducts({
  products,
  tags,
  excludeSlugs = [],
  limit = 4,
}: {
  products: ShopProduct[]
  tags: string[]
  excludeSlugs?: string[]
  limit?: number
}): ShopProduct[] {
  const excluded = new Set(excludeSlugs)
  const tagSet = new Set(normalizeTags(tags))
  const candidates = products.filter((product) => product.isLive && !excluded.has(product.slug))

  if (tagSet.size === 0) {
    return []
  }

  const related = candidates.filter((product) => hasOverlap(normalizeTags(product.tags), tagSet))
  return related.slice(0, limit)
}
