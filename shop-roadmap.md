# Shop & CRM Roadmap (Update 2026-02-12)

## 1. Doel en scope
Deze roadmap stuurt de uitbouw van de webshop en CRM zonder SEO-regressies of breuken in de huidige site.

- Shop blijft een add-on op de bestaande website, geen vervanging.
- Architectuur blijft: Next.js static export + PHP BFF + MySQL + Mollie.
- CRM-login flow blijft ongewijzigd (`/crm-auth.php`, session cookie, `CRM_PASSWORD_HASH`).
- NL + EN shoproutes blijven parallel ondersteund.

## 2. Huidige status (as-is)

### 2.1 Shop frontend
- [x] Shop index NL/EN: `/shop`, `/en/shop`
- [x] PDP NL/EN: `/shop/[slug]`, `/en/shop/[slug]`
- [x] Cart + checkout NL/EN (noindex): `/shop/cart`, `/shop/checkout`, EN equivalenten
- [x] Productlist met zoek/filter/sort + quantity + add-to-cart
- [x] Cart/checkout flow met live BFF mode + local demo fallback
- [x] Order success notice + ordercode copy
- [x] Copywriting geoptimaliseerd over listing/PDP/cart/checkout

### 2.2 SEO en indexatie
- [x] `SHOP_INDEXABLE` toggle in `content/shop-products.ts`
- [x] Noindex policy in beide shop layouts (`app/(pages)/shop/layout.tsx`, `app/en/(pages)/shop/layout.tsx`)
- [x] Product schema + breadcrumb schema op PDP
- [x] ItemList schema op shop listing (NL + EN)
- [x] Robots disallow voor cart/checkout/search/param-URL's
- [x] Sitemap ondersteunt conditionele opname van shoproutes wanneer indexable

### 2.3 BFF en checkout
- [x] Product endpoints, cart lifecycle, checkout endpoint
- [x] Mollie redirect flow + webhook pad
- [x] Shipping methods: `be_flat` + `pickup`
- [x] Order opslag + resend email via CRM

### 2.4 CRM admin
- [x] Sidebar + hero metrics + toast stack componenten
- [x] Product CRUD: create/update/visibility/inline-update/soft-delete/restore/duplicate/delete
- [x] Orders: create/update/archive/resend-email + timeline
- [x] Dashboard metrics endpoint (`type=dashboard-metrics`)
- [ ] Klantenmodule (`crm-customers.php` + UI)
- [ ] Strikte order status transition guards server-side
- [ ] Audit log tabel en UI-haakjes

## 3. Niet-onderhandelbare guardrails
- Geen bestaande URL's hernoemen, redirecten of samenvoegen.
- Geen indexatie van cart/checkout/filter/search/account routes.
- Slechts 1 canonieke URL per productslug.
- Geen shopschema's op niet-shoppagina's.
- Geen Node runtime dependency in productiepad.

## 4. Belangrijkste open punten (prioriteit)

### P0 - launchkritisch
1. Beslis live-indexatie moment:
   - `SHOP_INDEXABLE` staat nu op `false` terwijl demo SKU's op `isLive: true` staan.
   - Voor livegang: echte SKU-content klaarzetten en pas dan indexatie aan.
2. Harden order workflow in CRM:
   - server-side whitelist voor status transitions (nu te vrij).
3. Klantenbeheer toevoegen:
   - minimaal read/search + koppeling op order-email.
4. Productdata productieklaar maken:
   - demo-copy vervangen door echte SKU-copy, beelden, specs, pricing.

### P1 - operationeel belangrijk
1. CRM datamodel uitbreiden met categorie/SKU/voorraad-aantallen.
2. Audit trail voor product/order mutaties.
3. E2E monitoring op checkout/webhook/mail + simpele alerting.

### P2 - optimalisatie
1. FAQ op `/shop` + schema.
2. Cross-linking vanuit topblogposts naar relevante SKU's.
3. Conversie-events en funnel dashboards.

## 5. Databasetraject

### 5.1 Basisschema (reeds actief)
Actieve tabellen in scope:
- `shop_products`
- `shop_carts`
- `shop_cart_lines`
- `shop_orders`
- `shop_shipping_methods`

Belangrijke actieve velden:
- Product archive flow: `shop_products.is_deleted`
- Product tags: `shop_products.tags`
- Orders: `locale`, `shipping_method_id`, `total_cents`, `mollie_payment_id`, `created_at`

### 5.2 Aanbevolen volgende migraties (voor CRM v2)
Voer enkel uit na pre-checks in staging.

Pre-checks:
```sql
SHOW COLUMNS FROM shop_products LIKE 'sku';
SHOW COLUMNS FROM shop_products LIKE 'category_id';
SHOW COLUMNS FROM shop_products LIKE 'stock_qty';
SHOW COLUMNS FROM shop_products LIKE 'stock_status';
SHOW TABLES LIKE 'shop_categories';
SHOW TABLES LIKE 'shop_customers';
```

Migraties:
```sql
CREATE TABLE IF NOT EXISTS shop_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  name_nl VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE shop_products
  ADD COLUMN sku VARCHAR(120) NULL,
  ADD COLUMN category_id INT NULL,
  ADD COLUMN stock_qty INT NOT NULL DEFAULT 0,
  ADD COLUMN stock_status VARCHAR(32) NOT NULL DEFAULT 'in_stock';

CREATE UNIQUE INDEX idx_shop_products_sku ON shop_products(sku);
CREATE INDEX idx_shop_products_category_id ON shop_products(category_id);
CREATE INDEX idx_shop_products_stock_status ON shop_products(stock_status);

ALTER TABLE shop_products
  ADD CONSTRAINT fk_shop_products_category
  FOREIGN KEY (category_id) REFERENCES shop_categories(id);

CREATE TABLE IF NOT EXISTS shop_customers (
  id CHAR(32) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(120) NULL,
  last_name VARCHAR(120) NULL,
  phone VARCHAR(64) NULL,
  company VARCHAR(160) NULL,
  vat_number VARCHAR(64) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE shop_orders
  ADD COLUMN customer_id CHAR(32) NULL,
  ADD INDEX idx_shop_orders_status_created_at (status, created_at),
  ADD INDEX idx_shop_orders_email (email);
```

Opmerking:
- Voer `ALTER TABLE` statements niet blind uit op productie als kolommen/indexen al bestaan.
- Gebruik altijd backup + staging-run vooraf.

## 6. API contract status

### Actief
- `GET /shop/products?locale=nl|en`
- `GET /shop/products/{slug}?locale=nl|en`
- `POST /shop/cart`
- `POST /shop/cart/{cartId}/lines`
- `PATCH /shop/cart/{cartId}/lines/{lineId}`
- `DELETE /shop/cart/{cartId}/lines/{lineId}`
- `POST /shop/checkout`

### CRM actief
- `GET|POST|DELETE /crm-auth.php`
- `GET /crm-data.php?type=orders|products|shipping-methods|dashboard-metrics|...`
- `POST /crm-products.php` (actiegebaseerd)
- `POST /crm-orders.php` (actiegebaseerd)

### Nog toe te voegen
- `GET/POST /crm-customers.php`
- Gestandaardiseerde response envelope op alle write endpoints (`{ ok, data, error }`)

## 7. Sprintplanning (bijgewerkt)

### Sprint A - Hardening (kort)
- [ ] Status transition matrix afdwingen in `crm-orders.php`
- [ ] Onbekende statuswaarden blokkeren met nette foutcodes
- [ ] Checkout + webhook + resend-email logging opschonen

Definition of done:
- Geen vrije statusmutaties meer buiten whitelist.
- Geen regressie op bestaande orderupdates in CRM UI.

### Sprint B - Customer module
- [ ] `shop_customers` migratie uitvoeren
- [ ] `crm-customers.php` (list + detail + update)
- [ ] CRM tab "Klanten" met zoek en orderhistoriek

Definition of done:
- Klantrecord op email vindbaar vanuit orderdetail.
- Minstens basis CRUD-update werkt zonder loginwijziging.

### Sprint C - Product inventory v2
- [ ] SKU/category/stock_qty/stock_status actief maken in DB + UI
- [ ] Producttable filters op categorie en stockstatus
- [ ] Inline updates uitbreiden met stock_qty

Definition of done:
- CRM productbeheer ondersteunt volledige inventarisflow zonder hard delete.

### Sprint D - SEO live switch
- [ ] Echte SKU-content publiceren (geen demo-copy)
- [ ] `SHOP_INDEXABLE=true` pas na content + QA
- [ ] Sitemap en canonicals valideren na switch

Definition of done:
- Enkel bedoelde shop URL's indexeren.
- Geen nieuwe coverage/canonical errors in Search Console.

## 8. Go-live checklist (praktisch)
- [ ] `bff/.env` productieklare waarden:
  - `SHOP_SITE_URL=https://x3dprints.be`
  - `BFF_BASE_URL=https://api.x3dprints.be`
  - `MOLLIE_API_KEY=<live>`
  - `APP_DEBUG=false`
- [ ] `CRM_PASSWORD` en SMTP-waarden ingesteld
- [ ] DB schema up-to-date op productie
- [ ] Health check: `/index.php?path=/health&debug=1`
- [ ] End-to-end test:
  - add to cart -> checkout -> Mollie -> return `?order=...`
- [ ] Verify:
  - cart/checkout noindex
  - shoproutes enkel in sitemap als `SHOP_INDEXABLE=true`

## 9. Risico's en mitigatie
| Risico | Impact | Mitigatie |
| --- | --- | --- |
| Te vroege indexatie van demo-shop | Hoog | `SHOP_INDEXABLE` op `false` houden tot echte SKU-live |
| Ongecontroleerde orderstatus updates | Hoog | Transition whitelist server-side |
| Datamodel groeit sneller dan UI | Middel | Gefaseerde migraties + backwards compatible endpoint acties |
| Mollie/webhook regressie | Hoog | E2E tests + retries + logging |
| SEO regressie op bestaande pagina's | Kritiek | Additive routing + canonical/sitemap checks in CI |

## 10. Volgende concrete actie (aanbevolen)
1. Sprint A afronden (status guardrails + logging).
2. Daarna Sprint B (customers) zodat "Bestellingen & Klanten" module volledig is.
3. Pas dan SKU/category/stock migrations breed uitrollen in Sprint C.
4. SEO live switch pas in Sprint D na content-QA.
