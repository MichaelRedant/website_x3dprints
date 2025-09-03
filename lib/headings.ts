// /lib/headings.ts
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import type { Root, Heading, Text } from "mdast"
import GithubSlugger from "github-slugger"

/**
 * Tekstinhoud van een MDAST-heading samenvoegen (zonder HTML).
 */
function stringifyHeading(node: Heading): string {
  const parts: string[] = []
  for (const child of node.children) {
    if ((child as Text).value) parts.push((child as Text).value as string)
  }
  return parts.join(" ").trim()
}

export type TOCItem = {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Extract H2/H3 headings uit markdown en genereer id's
 * die matchen met `rehype-slug` (via github-slugger).
 */
export async function extractHeadings(
  markdown: string,
  levels: Array<2 | 3> = [2, 3],
): Promise<TOCItem[]> {
  const file = await unified().use(remarkParse).use(remarkGfm).parse(markdown)
  const tree = file as Root
  const slugger = new GithubSlugger()

  const items: TOCItem[] = []
  for (const node of tree.children) {
    if (node.type === "heading") {
      const h = node as Heading
      if (h.depth === 2 || h.depth === 3) {
        if (!levels.includes(h.depth as 2 | 3)) continue
        const text = stringifyHeading(h)
        if (!text) continue
        const id = slugger.slug(text) // matcht rehype-slug
        items.push({ id, text, level: h.depth as 2 | 3 })
      }
    }
  }
  return items
}
