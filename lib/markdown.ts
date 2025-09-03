// /lib/markdown.ts
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeSanitize, { defaultSchema, type Schema } from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

/**
 * Breidt het rehype-sanitize Schema type-safely uit met 'protocols'.
 * (Runtime ondersteunt rehype-sanitize dit veld, maar de TS types niet.)
 */
interface SchemaWithProtocols extends Schema {
  protocols?: Record<string, string[]>
}

/**
 * Vertrek van defaultSchema (immutable laten) en maak een uitbreidbare kopie.
 */
const base: SchemaWithProtocols = { ...(defaultSchema as Schema) }

/**
 * Custom sanitize schema gebaseerd op defaultSchema:
 * - laat className toe voor styling
 * - laat id toe op headings (voor anchors/TOC)
 * - laat target/rel toe op links
 * (protocols worden NA het literal toegevoegd om TS2353 te vermijden)
 */
const schema: SchemaWithProtocols = {
  ...base,
  attributes: {
    ...(base.attributes || {}),
    a: [
      ...(base.attributes?.a || []),
      "href",
      "title",
      "rel",
      "target",
      "className",
    ],
    img: [
      ...(base.attributes?.img || []),
      "src",
      "alt",
      "title",
      "width",
      "height",
      "className",
      "loading",
      "decoding",
    ],
    p: [...(base.attributes?.p || []), "className"],
    h1: [...(base.attributes?.h1 || []), "className", "id"],
    h2: [...(base.attributes?.h2 || []), "className", "id"],
    h3: [...(base.attributes?.h3 || []), "className", "id"],
    h4: [...(base.attributes?.h4 || []), "className", "id"],
    h5: [...(base.attributes?.h5 || []), "className", "id"],
    h6: [...(base.attributes?.h6 || []), "className", "id"],
    ul: [...(base.attributes?.ul || []), "className"],
    ol: [...(base.attributes?.ol || []), "className"],
    li: [...(base.attributes?.li || []), "className"],
    blockquote: [...(base.attributes?.blockquote || []), "className"],
    code: [...(base.attributes?.code || []), "className"],
    pre: [...(base.attributes?.pre || []), "className"],
    table: [...(base.attributes?.table || []), "className"],
    thead: [...(base.attributes?.thead || []), "className"],
    tbody: [...(base.attributes?.tbody || []), "className"],
    tr: [...(base.attributes?.tr || []), "className"],
    th: [...(base.attributes?.th || []), "className"],
    td: [...(base.attributes?.td || []), "className"],
    span: [...(base.attributes?.span || []), "className"],
  },
}

// ✔ Voeg 'protocols' toe NA het literal (geen TS2353) en zonder 'any'
schema.protocols = {
  ...(base.protocols || {}),
  href: ["http", "https", "mailto", "tel"],
  src: ["http", "https", "data"], // nodig voor data: URIs (bv. inline SVG)
}

/** Markdown -> veilige HTML string (GFM, raw HTML allowed + sanitized). */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)  // raw HTML in MD toestaan vóór sanitize
    .use(rehypeSlug) // ids op headings (voor anchors/TOC)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(markdown)

  return String(file.value)
}

/**
 * Split een markdown-string op horizontale regels (`---` op eigen regel).
 * Handig om JSX/HTML tussen stukken te injecteren.
 */
export function splitMarkdown(markdown: string): string[] {
  return markdown
    .split(/\r?\n\s*---\s*\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean)
}
