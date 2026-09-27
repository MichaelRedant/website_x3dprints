import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const TARGET = path.join(OUT_DIR, ".htaccess")
const PREVIEW_DIR = path.join(OUT_DIR, "model-previews")
const PREVIEW_TARGET = path.join(PREVIEW_DIR, ".htaccess")
const UPLOADS_DIR = path.join(PREVIEW_DIR, ".uploads")
const PRIVATE_PAGE_DIRS = [
  path.join(OUT_DIR, "model-preview"),
  path.join(OUT_DIR, "model-preview-admin"),
]

const HTACCESS = `# X3DPrints static export routing for Apache
Options -Indexes -MultiViews
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Strict-Transport-Security "max-age=31536000"
  Header always unset X-Powered-By
</IfModule>

<IfModule mod_mime.c>
  AddType text/css .css
  AddType application/javascript .js .mjs
  AddType application/json .json
  AddType image/svg+xml .svg
  AddType font/woff2 .woff2
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Never rewrite Next static assets or common public files.
  RewriteRule ^_next/ - [L]
  RewriteRule ^images/ - [L]
  RewriteRule ^fonts/ - [L]
  RewriteRule ^data/ - [L]
  RewriteRule ^favicon\\.ico$ - [L]
  RewriteRule ^robots\\.txt$ - [L]
  RewriteRule ^sitemap\\.xml$ - [L]
  RewriteRule ^llms\\.txt$ - [L]

  # Never rewrite requests that already target a real file/folder.
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Map clean URLs to the exported /path/index.html.
  RewriteRule ^$ /index.html [L]
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.+?)/?$ /$1/index.html [L]
</IfModule>
`

const PREVIEW_HTACCESS = `# Runtime model data may only be served through model-preview-file.php.
Options -Indexes

<IfModule mod_authz_core.c>
  Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
  Order allow,deny
  Deny from all
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Robots-Tag "noindex, nofollow, noarchive"
  Header always set Cache-Control "private, no-store, max-age=0"
  Header always set Referrer-Policy "no-referrer"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "DENY"
</IfModule>
`

const DENY_HTACCESS = `# Runtime model data must only be served through the validated PHP gateway.
Options -Indexes

<IfModule mod_authz_core.c>
  Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
  Order allow,deny
  Deny from all
</IfModule>
`

const PRIVATE_PAGE_HTACCESS = `# Sensitive tools and bearer-token pages must not leak through caches or referrers.
<IfModule mod_headers.c>
  Header always set Cache-Control "private, no-store, max-age=0"
  Header always set Pragma "no-cache"
  Header always set X-Robots-Tag "noindex, nofollow, noarchive"
  Header always set Referrer-Policy "no-referrer"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "DENY"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Content-Security-Policy "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'"
</IfModule>
`

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.writeFile(TARGET, HTACCESS, "utf8")
  await fs.mkdir(PREVIEW_DIR, { recursive: true })
  await fs.writeFile(PREVIEW_TARGET, PREVIEW_HTACCESS, "utf8")
  await fs.mkdir(UPLOADS_DIR, { recursive: true })
  await fs.writeFile(path.join(UPLOADS_DIR, ".htaccess"), DENY_HTACCESS, "utf8")
  await Promise.all(PRIVATE_PAGE_DIRS.map(async (directory) => {
    await fs.mkdir(directory, { recursive: true })
    await fs.writeFile(path.join(directory, ".htaccess"), PRIVATE_PAGE_HTACCESS, "utf8")
  }))
  console.log("[postbuild:apache] OK - wrote routing, private-page headers and model-data protections")
}

main().catch((error) => {
  console.error("[postbuild:htaccess] FAILED")
  console.error(error)
  process.exit(1)
})

