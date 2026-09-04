import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const TARGET = path.join(OUT_DIR, ".htaccess")
const PHP_USER_INI_TARGET = path.join(OUT_DIR, ".user.ini")

const HTACCESS = `# X3DPrints static export routing for Apache
Options -MultiViews
DirectoryIndex index.html

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
  RewriteRule ^(.+?)/?$ /$1/index.html [L]
</IfModule>
`

const PHP_USER_INI = `upload_max_filesize = 10M
post_max_size = 18M
max_file_uploads = 3
`

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.writeFile(TARGET, HTACCESS, "utf8")
  await fs.writeFile(PHP_USER_INI_TARGET, PHP_USER_INI, "utf8")
  console.log("[postbuild:apache] OK - wrote out/.htaccess and out/.user.ini")
}

main().catch((error) => {
  console.error("[postbuild:htaccess] FAILED")
  console.error(error)
  process.exit(1)
})

