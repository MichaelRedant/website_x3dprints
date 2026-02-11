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
  image_url,
  image_alt_nl,
  image_alt_en,
  lead_time_min,
  lead_time_max,
  is_live,
  sort_order
) VALUES
  (
    'demo-desk-clip',
    'Demo bureaublad clip',
    'Demo desk clip',
    'Compacte kabelclip voor je bureau. Demo-item om de shopflow te testen.',
    'Compact desk cable clip. Demo item for testing the shop flow.',
    'desk, cable, office',
    1250,
    'PreOrder',
    '/images/filament/pla_basic_domino-tuya.webp',
    'Demo bureaublad clip',
    'Demo desk clip',
    5,
    10,
    1,
    10
  ),
  (
    'demo-tool-organizer',
    'Demo tool organizer',
    'Demo tool organizer',
    'Compact organizerbakje als tweede demo voor layout en flow.',
    'Compact organizer tray as a second demo for layout and flow.',
    'organizer, tools, desk',
    2495,
    'PreOrder',
    '/images/filament/petg_1.webp',
    'Demo tool organizer',
    'Demo tool organizer',
    7,
    12,
    1,
    20
  );
