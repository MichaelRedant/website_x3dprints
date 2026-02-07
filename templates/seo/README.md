# SEO Content Templates

Gebruik deze templates als startpunt voor nieuwe routes. Ze leggen de minimum SEO-structuur vast:

- verplichte metadata (`title`, `description`, `alternates.canonical`, `alternates.languages`)
- interne linkslots naar kernpaden
- FAQ-minimum voor segment detailpagina's
- GEO-structuur voor lange pagina's: ToC met anchors, zichtbare `last updated` en bronsectie met `<cite>` links

Bestanden:

- `templates/seo/page-template.md`
- `templates/seo/blog-template.md`
- `templates/seo/segment-template.md`

Guardrails:

- `npm run check:seo:templates` controleert segment- en blogcontracten in source files.
- `npm run check:seo` en `npm run verify` draaien deze check automatisch mee.
