# PHP BFF (Vimex hosting)

This folder contains a PHP-based BFF that mirrors the shop API contract.
It is designed for shared hosting with PHP 7.4+ and MySQL.

## Deploy on Vimex
1) Create the subdomain (example: `api.x3dprints.be`).
2) Point the document root to `bff/public` (or keep it at `/api` and copy `bff/public/index.php` + `.htaccess` there).
3) Upload the `bff` folder to the server (recommended: `/public_html/bff`).
4) Import `bff/schema.sql` in MySQL (phpMyAdmin).
5) Copy `bff/.env.example` to `bff/.env` and fill in credentials.

## Required env
- `BFF_DB_HOST`, `BFF_DB_NAME`, `BFF_DB_USER`, `BFF_DB_PASS`
- `BFF_BASE_URL` (e.g. `https://api.x3dprints.be`)
- `SHOP_SITE_URL` (e.g. `https://x3dprints.be`, or use `auto` for local dev)
- `MOLLIE_API_KEY` (set when you want live payments)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `MAIL_FROM` (order emails)
- `CRM_PASSWORD_HASH` (for `/crm` access, use `php -r "echo password_hash('your-password', PASSWORD_DEFAULT);"` to generate)

## Health check
Open `https://api.x3dprints.be/health` to verify the DB connection.
If URL rewriting is unavailable, use `https://api.x3dprints.be/index.php/health`
or `https://api.x3dprints.be/index.php?path=/health`.
Add `&debug=1` to see PHP extension checks.

## Logs
Runtime errors are logged to `bff/storage/logs/bff.log` (create the folder if it doesn't exist).

## Notes
- CORS allowlist defaults to `x3dprints.be`, `www.x3dprints.be`, and `http://localhost:3000`.
- The Mollie webhook URL is `${BFF_BASE_URL}/shop/webhooks/mollie`.
- If Mollie is not configured, checkout will return an error.
- If you already imported the DB, run:
  - `ALTER TABLE shop_orders ADD COLUMN locale VARCHAR(5) NOT NULL DEFAULT 'nl', ADD COLUMN email_sent_at TIMESTAMP NULL DEFAULT NULL;`
  - `ALTER TABLE shop_products ADD COLUMN is_deleted TINYINT(1) NOT NULL DEFAULT 0;`
  - `ALTER TABLE shop_products ADD COLUMN tags TEXT DEFAULT NULL;`
