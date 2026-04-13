CREATE TABLE shop_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  name_nl VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  summary_nl TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  tags TEXT DEFAULT NULL,
  price_cents INT NOT NULL,
  availability VARCHAR(40) DEFAULT NULL,
  stock_count INT DEFAULT NULL,
  purchase_mode VARCHAR(20) NOT NULL DEFAULT 'cart',
  image_url VARCHAR(255) NOT NULL,
  image_alt_nl VARCHAR(255) NOT NULL,
  image_alt_en VARCHAR(255) NOT NULL,
  lead_time_min INT DEFAULT NULL,
  lead_time_max INT DEFAULT NULL,
  is_live TINYINT(1) NOT NULL DEFAULT 0,
  is_deleted TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE shop_carts (
  id CHAR(32) PRIMARY KEY,
  currency CHAR(3) NOT NULL DEFAULT 'EUR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE shop_cart_lines (
  id CHAR(32) PRIMARY KEY,
  cart_id CHAR(32) NOT NULL,
  product_slug VARCHAR(120) NOT NULL,
  quantity INT NOT NULL,
  price_cents INT NOT NULL,
  total_cents INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cart_id (cart_id),
  UNIQUE KEY uniq_cart_product (cart_id, product_slug),
  CONSTRAINT fk_cart_lines_cart FOREIGN KEY (cart_id)
    REFERENCES shop_carts(id) ON DELETE CASCADE
);

CREATE TABLE shop_shipping_methods (
  id VARCHAR(64) PRIMARY KEY,
  label_nl VARCHAR(255) NOT NULL,
  label_en VARCHAR(255) NOT NULL,
  price_cents INT NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE shop_orders (
  id CHAR(32) PRIMARY KEY,
  cart_id CHAR(32) NOT NULL,
  order_code VARCHAR(64) NOT NULL,
  status VARCHAR(40) NOT NULL,
  email VARCHAR(255) NOT NULL,
  locale VARCHAR(5) NOT NULL DEFAULT 'nl',
  shipping_method_id VARCHAR(64) NOT NULL,
  total_cents INT NOT NULL,
  mollie_payment_id VARCHAR(64) DEFAULT NULL,
  email_sent_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_order_code (order_code),
  INDEX idx_mollie_payment (mollie_payment_id)
);

INSERT INTO shop_shipping_methods (id, label_nl, label_en, price_cents, active) VALUES
  ('be_flat', 'Levering in Belgie (tot 3 kg)', 'Delivery in Belgium (up to 3 kg)', 750, 1),
  ('pickup', 'Afhalen op afspraak', 'Pickup by appointment', 0, 1);

INSERT INTO shop_products (
  slug,
  name_nl,
  name_en,
  summary_nl,
  summary_en,
  tags,
  price_cents,
  availability,
  stock_count,
  purchase_mode,
  image_url,
  image_alt_nl,
  image_alt_en,
  lead_time_min,
  lead_time_max,
  is_live,
  sort_order
) VALUES
  (
    'bambu-reusable-spool',
    'Bambu reusable spool',
    'Bambu reusable spool',
    'Originele Bambu reusable spool uit reststock, gecontroleerd en direct klaar voor een refill. Momenteel 13 stuks beschikbaar aan EUR 5.00 per stuk, excl. verzending.',
    'Original Bambu reusable spool from leftover stock, checked and ready for a refill. Currently 13 units available at EUR 5.00 per item, excl. shipping.',
    'bambu, spool, reusable, refill, filament, reststock',
    500,
    'InStock',
    13,
    'inquiry',
    '/images/webshop/reusable_spool.png',
    'Bambu reusable spool uit reststock',
    'Bambu reusable spool from leftover stock',
    1,
    3,
    1,
    10
  );
