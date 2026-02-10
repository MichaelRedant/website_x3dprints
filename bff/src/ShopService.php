<?php
declare(strict_types=1);

require_once __DIR__ . "/Mailer.php";

class ShopService
{
  private PDO $pdo;
  private string $siteUrl;
  private string $bffBaseUrl;
  private ?string $mollieKey;
  private bool $debug;
  private ?SmtpMailer $mailer;

  public function __construct(PDO $pdo, array $config)
  {
    $this->pdo = $pdo;
    $this->siteUrl = rtrim($config["siteUrl"] ?? "https://x3dprints.be", "/");
    $this->bffBaseUrl = rtrim($config["bffBaseUrl"] ?? "", "/");
    $this->mollieKey = $config["mollieKey"] ?? null;
    $this->debug = (bool)($config["debug"] ?? false);
    $this->mailer = SmtpMailer::fromEnv();
  }

  public function health(bool $debug = false): array
  {
    $this->pdo->query("SELECT 1");
    $payload = ["ok" => true];
    if ($debug) {
      $payload["php"] = PHP_VERSION;
      $payload["extensions"] = [
        "curl" => extension_loaded("curl"),
        "openssl" => extension_loaded("openssl"),
        "pdo_mysql" => extension_loaded("pdo_mysql"),
      ];
      $payload["mollieConfigured"] = $this->mollieKey !== null && $this->mollieKey !== "";
      $payload["bffBaseUrl"] = $this->bffBaseUrl;
    }
    return $payload;
  }

  public function listProducts(string $locale): array
  {
    $stmt = $this->pdo->query(
      "SELECT slug, name_nl, name_en, summary_nl, summary_en, price_cents, availability, image_url, image_alt_nl, image_alt_en
       FROM shop_products WHERE is_live = 1 ORDER BY sort_order ASC, id ASC",
    );
    $rows = $stmt->fetchAll();

    return array_map(fn($row) => $this->mapProduct($row, $locale), $rows);
  }

  public function getProduct(string $slug, string $locale): ?array
  {
    $stmt = $this->pdo->prepare(
      "SELECT slug, name_nl, name_en, summary_nl, summary_en, price_cents, availability, image_url, image_alt_nl, image_alt_en
       FROM shop_products WHERE slug = :slug AND is_live = 1 LIMIT 1",
    );
    $stmt->execute(["slug" => $slug]);
    $row = $stmt->fetch();
    if (!$row) {
      return null;
    }
    return $this->mapProduct($row, $locale);
  }

  public function createCart(string $locale): array
  {
    $cartId = $this->generateId();
    $stmt = $this->pdo->prepare(
      "INSERT INTO shop_carts (id, currency) VALUES (:id, 'EUR')",
    );
    $stmt->execute(["id" => $cartId]);
    return $this->buildCartResponse($cartId, $locale);
  }

  public function addLine(string $cartId, string $productSlug, int $quantity, string $locale): array
  {
    $this->assertCartExists($cartId);
    $product = $this->fetchProductRow($productSlug);
    if (!$product) {
      throw new RuntimeException("Product not found");
    }

    $quantity = $this->normalizeQuantity($quantity);
    $priceCents = (int)$product["price_cents"];

    $line = $this->fetchLineByProduct($cartId, $productSlug);
    if ($line) {
      $newQuantity = $line["quantity"] + $quantity;
      $this->updateLineQuantity($line["id"], $newQuantity, $priceCents);
    } else {
      $lineId = $this->generateId();
      $totalCents = $priceCents * $quantity;
      $stmt = $this->pdo->prepare(
        "INSERT INTO shop_cart_lines (id, cart_id, product_slug, quantity, price_cents, total_cents)
         VALUES (:id, :cart_id, :product_slug, :quantity, :price_cents, :total_cents)",
      );
      $stmt->execute([
        "id" => $lineId,
        "cart_id" => $cartId,
        "product_slug" => $productSlug,
        "quantity" => $quantity,
        "price_cents" => $priceCents,
        "total_cents" => $totalCents,
      ]);
    }

    return $this->buildCartResponse($cartId, $locale);
  }

  public function updateLine(string $cartId, string $lineId, int $quantity, string $locale): array
  {
    $this->assertCartExists($cartId);
    $line = $this->fetchLineById($lineId);
    if (!$line || $line["cart_id"] !== $cartId) {
      throw new RuntimeException("Line not found");
    }

    if ($quantity <= 0) {
      $this->deleteLine($lineId);
    } else {
      $product = $this->fetchProductRow($line["product_slug"]);
      if (!$product) {
        throw new RuntimeException("Product not found");
      }
      $this->updateLineQuantity($lineId, $this->normalizeQuantity($quantity), (int)$product["price_cents"]);
    }

    return $this->buildCartResponse($cartId, $locale);
  }

  public function removeLine(string $cartId, string $lineId, string $locale): array
  {
    $this->assertCartExists($cartId);
    $line = $this->fetchLineById($lineId);
    if (!$line || $line["cart_id"] !== $cartId) {
      throw new RuntimeException("Line not found");
    }
    $this->deleteLine($lineId);
    return $this->buildCartResponse($cartId, $locale);
  }

  public function startCheckout(string $cartId, string $email, string $shippingMethodId, string $locale): array
  {
    $this->assertCartExists($cartId);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      throw new RuntimeException("Invalid email");
    }

    $shippingMethods = $this->listShippingMethods($locale);
    $shippingMethod = null;
    foreach ($shippingMethods as $method) {
      if ($method["id"] === $shippingMethodId) {
        $shippingMethod = $method;
        break;
      }
    }
    if (!$shippingMethod) {
      throw new RuntimeException("Shipping method not found");
    }

    $lines = $this->fetchCartLines($cartId);
    if (!$lines) {
      throw new RuntimeException("Cart is empty");
    }

    $subtotalCents = $this->sumSubtotalCents($lines);
    $shippingCents = (int)round($shippingMethod["price"]["amount"] * 100);
    $totalCents = $subtotalCents + $shippingCents;

    if (!$this->mollieKey) {
      throw new RuntimeException("Mollie not configured");
    }

    $orderId = $this->generateId();
    $orderCode = $this->generateOrderCode();
    $payment = $this->createMolliePayment($orderCode, $cartId, $totalCents, $locale);

    $stmt = $this->pdo->prepare(
      "INSERT INTO shop_orders (id, cart_id, order_code, status, email, locale, shipping_method_id, total_cents, mollie_payment_id)
       VALUES (:id, :cart_id, :order_code, :status, :email, :locale, :shipping_method_id, :total_cents, :mollie_payment_id)",
    );
    $stmt->execute([
      "id" => $orderId,
      "cart_id" => $cartId,
      "order_code" => $orderCode,
      "status" => "pending",
      "email" => $email,
      "locale" => $locale,
      "shipping_method_id" => $shippingMethodId,
      "total_cents" => $totalCents,
      "mollie_payment_id" => $payment["id"],
    ]);

    return [
      "checkoutUrl" => $payment["checkoutUrl"],
      "orderCode" => $orderCode,
    ];
  }

  public function handleMollieWebhook(string $paymentId): array
  {
    if (!$this->mollieKey) {
      throw new RuntimeException("Mollie not configured");
    }

    $payment = $this->mollieRequest("GET", "/payments/" . $paymentId);
    $status = $payment["status"] ?? "unknown";

    $order = $this->fetchOrderByPaymentId($paymentId);
    if ($order) {
      $stmt = $this->pdo->prepare(
        "UPDATE shop_orders SET status = :status WHERE id = :id",
      );
      $stmt->execute([
        "status" => $status,
        "id" => $order["id"],
      ]);

      if ($status === "paid" && empty($order["email_sent_at"])) {
        $this->sendOrderEmails($order);
      }
    }

    return ["ok" => true, "status" => $status];
  }

  public function resendOrderEmails(string $orderId): void
  {
    $order = $this->fetchOrderById($orderId);
    if (!$order) {
      throw new RuntimeException("Order not found");
    }
    $this->sendOrderEmails($order);
  }

  public function listShippingMethods(string $locale): array
  {
    $stmt = $this->pdo->query(
      "SELECT id, label_nl, label_en, price_cents FROM shop_shipping_methods WHERE active = 1 ORDER BY price_cents ASC, id ASC",
    );
    $rows = $stmt->fetchAll();
    if (!$rows) {
      return $this->defaultShippingMethods($locale);
    }

    $isEn = $locale === "en";
    return array_map(function ($row) use ($isEn) {
      return [
        "id" => $row["id"],
        "label" => $isEn ? $row["label_en"] : $row["label_nl"],
        "price" => $this->money((int)$row["price_cents"]),
      ];
    }, $rows);
  }

  private function defaultShippingMethods(string $locale): array
  {
    $isEn = $locale === "en";
    return [
      [
        "id" => "be_flat",
        "label" => $isEn ? "Delivery in Belgium (up to 3 kg)" : "Levering in Belgie (tot 3 kg)",
        "price" => $this->money(750),
      ],
      [
        "id" => "pickup",
        "label" => $isEn ? "Pickup by appointment" : "Afhalen op afspraak",
        "price" => $this->money(0),
      ],
    ];
  }

  private function mapProduct(array $row, string $locale): array
  {
    $isEn = $locale === "en";
    return [
      "slug" => $row["slug"],
      "name" => $isEn ? $row["name_en"] : $row["name_nl"],
      "summary" => $isEn ? $row["summary_en"] : $row["summary_nl"],
      "price" => $this->money((int)$row["price_cents"]),
      "availability" => $row["availability"] ?: null,
      "image" => [
        "url" => $row["image_url"],
        "alt" => $isEn ? $row["image_alt_en"] : $row["image_alt_nl"],
      ],
    ];
  }

  private function fetchOrderByPaymentId(string $paymentId): ?array
  {
    $stmt = $this->pdo->prepare(
      "SELECT id, cart_id, order_code, email, locale, shipping_method_id, total_cents, email_sent_at
       FROM shop_orders WHERE mollie_payment_id = :payment_id LIMIT 1",
    );
    $stmt->execute(["payment_id" => $paymentId]);
    $row = $stmt->fetch();
    return $row ?: null;
  }

  private function fetchOrderById(string $orderId): ?array
  {
    $stmt = $this->pdo->prepare(
      "SELECT id, cart_id, order_code, email, locale, shipping_method_id, total_cents, email_sent_at
       FROM shop_orders WHERE id = :id LIMIT 1",
    );
    $stmt->execute(["id" => $orderId]);
    $row = $stmt->fetch();
    return $row ?: null;
  }

  private function fetchOrderLinesWithProducts(string $cartId): array
  {
    $stmt = $this->pdo->prepare(
      "SELECT l.product_slug, l.quantity, l.price_cents, l.total_cents, p.name_nl, p.name_en
       FROM shop_cart_lines l
       LEFT JOIN shop_products p ON p.slug = l.product_slug
       WHERE l.cart_id = :cart_id
       ORDER BY l.created_at ASC",
    );
    $stmt->execute(["cart_id" => $cartId]);
    return $stmt->fetchAll();
  }

  private function fetchShippingMethodById(string $methodId): ?array
  {
    $stmt = $this->pdo->prepare(
      "SELECT id, label_nl, label_en, price_cents FROM shop_shipping_methods WHERE id = :id LIMIT 1",
    );
    $stmt->execute(["id" => $methodId]);
    $row = $stmt->fetch();
    return $row ?: null;
  }

  private function sendOrderEmails(array $order): void
  {
    if (!$this->mailer) {
      logError("mailer_missing");
      return;
    }

    $mailTo = env("MAIL_TO");
    $mailFrom = env("MAIL_FROM");
    if (!$mailTo || !$mailFrom) {
      logError("mail_config_missing");
      return;
    }

    $locale = ($order["locale"] ?? "nl") === "en" ? "en" : "nl";
    $lines = $this->fetchOrderLinesWithProducts($order["cart_id"]);
    $shipping = $this->fetchShippingMethodById($order["shipping_method_id"]);
    $subtotalCents = 0;
    $lineItems = [];
    foreach ($lines as $line) {
      $subtotalCents += (int)$line["total_cents"];
      $name = $locale === "en" ? ($line["name_en"] ?: $line["product_slug"]) : ($line["name_nl"] ?: $line["product_slug"]);
      $lineItems[] = [
        "name" => $name,
        "quantity" => (int)$line["quantity"],
        "total_cents" => (int)$line["total_cents"],
      ];
    }
    $totalCents = (int)$order["total_cents"];
    $shippingCents = max(0, $totalCents - $subtotalCents);

    $shippingLabel = $shipping
      ? ($locale === "en" ? $shipping["label_en"] : $shipping["label_nl"])
      : ($locale === "en" ? "Shipping" : "Verzending");

    $adminSubject = "[Shop order] " . $order["order_code"];
    $customerSubject = $locale === "en"
      ? "Order confirmation " . $order["order_code"]
      : "Bestelbevestiging " . $order["order_code"];

    $adminText = $this->buildAdminText($order, $lineItems, $shippingLabel, $subtotalCents, $shippingCents, $totalCents, $locale);
    $adminHtml = $this->buildAdminHtml($order, $lineItems, $shippingLabel, $subtotalCents, $shippingCents, $totalCents, $locale);

    $customerText = $this->buildCustomerText($order, $lineItems, $shippingLabel, $subtotalCents, $shippingCents, $totalCents, $locale);
    $customerHtml = $this->buildCustomerHtml($order, $lineItems, $shippingLabel, $subtotalCents, $shippingCents, $totalCents, $locale);

    $from = $this->formatMailbox($mailFrom);
    $adminTo = $this->formatMailbox($mailTo);
    $customerTo = $this->formatMailbox($order["email"]);

    try {
      $this->mailer->send([
        "from" => $from,
        "to" => $adminTo,
        "replyTo" => $customerTo,
        "subject" => $adminSubject,
        "text" => $adminText,
        "html" => $adminHtml,
      ]);

      $this->mailer->send([
        "from" => $from,
        "to" => $customerTo,
        "replyTo" => $adminTo,
        "subject" => $customerSubject,
        "text" => $customerText,
        "html" => $customerHtml,
      ]);

      $stmt = $this->pdo->prepare("UPDATE shop_orders SET email_sent_at = NOW() WHERE id = :id");
      $stmt->execute(["id" => $order["id"]]);
    } catch (Throwable $error) {
      logError("mail_failed", [
        "message" => $error->getMessage(),
        "order" => $order["order_code"],
      ]);
    }
  }

  private function buildAdminText(array $order, array $items, string $shippingLabel, int $subtotalCents, int $shippingCents, int $totalCents, string $locale): string
  {
    $lines = [];
    foreach ($items as $item) {
      $lines[] = "- " . $item["name"] . " x" . $item["quantity"] . " (" . $this->formatMoney($item["total_cents"]) . ")";
    }
    return implode("\n", [
      "Nieuwe shop bestelling",
      "Order: " . $order["order_code"],
      "E-mail: " . $order["email"],
      "",
      "Items:",
      implode("\n", $lines),
      "",
      "Subtotaal: " . $this->formatMoney($subtotalCents),
      $shippingLabel . ": " . $this->formatMoney($shippingCents),
      "Totaal: " . $this->formatMoney($totalCents),
    ]);
  }

  private function buildAdminHtml(array $order, array $items, string $shippingLabel, int $subtotalCents, int $shippingCents, int $totalCents, string $locale): string
  {
    $rows = "";
    foreach ($items as $item) {
      $rows .= "<tr><td>" . $this->escapeHtml($item["name"]) . "</td><td>" . $item["quantity"] . "</td><td>" . $this->escapeHtml($this->formatMoney($item["total_cents"])) . "</td></tr>";
    }
    return "
<h2>Nieuwe shop bestelling</h2>
<p><strong>Order:</strong> " . $this->escapeHtml($order["order_code"]) . "</p>
<p><strong>E-mail:</strong> " . $this->escapeHtml($order["email"]) . "</p>
<table style=\"width:100%;border-collapse:collapse\">
  <thead><tr><th align=\"left\">Item</th><th align=\"left\">Aantal</th><th align=\"left\">Totaal</th></tr></thead>
  <tbody>" . $rows . "</tbody>
</table>
<p><strong>Subtotaal:</strong> " . $this->escapeHtml($this->formatMoney($subtotalCents)) . "<br/>
<strong>" . $this->escapeHtml($shippingLabel) . ":</strong> " . $this->escapeHtml($this->formatMoney($shippingCents)) . "<br/>
<strong>Totaal:</strong> " . $this->escapeHtml($this->formatMoney($totalCents)) . "</p>
";
  }

  private function buildCustomerText(array $order, array $items, string $shippingLabel, int $subtotalCents, int $shippingCents, int $totalCents, string $locale): string
  {
    $lines = [];
    foreach ($items as $item) {
      $lines[] = "- " . $item["name"] . " x" . $item["quantity"] . " (" . $this->formatMoney($item["total_cents"]) . ")";
    }

    if ($locale === "en") {
      return implode("\n", [
        "Thanks for your order!",
        "Order code: " . $order["order_code"],
        "",
        "Items:",
        implode("\n", $lines),
        "",
        "Subtotal: " . $this->formatMoney($subtotalCents),
        $shippingLabel . ": " . $this->formatMoney($shippingCents),
        "Total: " . $this->formatMoney($totalCents),
        "",
        "We will follow up shortly with the planning.",
      ]);
    }

    return implode("\n", [
      "Bedankt voor je bestelling!",
      "Ordercode: " . $order["order_code"],
      "",
      "Items:",
      implode("\n", $lines),
      "",
      "Subtotaal: " . $this->formatMoney($subtotalCents),
      $shippingLabel . ": " . $this->formatMoney($shippingCents),
      "Totaal: " . $this->formatMoney($totalCents),
      "",
      "We nemen snel contact op met de planning.",
    ]);
  }

  private function buildCustomerHtml(array $order, array $items, string $shippingLabel, int $subtotalCents, int $shippingCents, int $totalCents, string $locale): string
  {
    $rows = "";
    foreach ($items as $item) {
      $rows .= "<tr><td>" . $this->escapeHtml($item["name"]) . "</td><td>" . $item["quantity"] . "</td><td>" . $this->escapeHtml($this->formatMoney($item["total_cents"])) . "</td></tr>";
    }

    if ($locale === "en") {
      return "
<h2>Thanks for your order!</h2>
<p><strong>Order code:</strong> " . $this->escapeHtml($order["order_code"]) . "</p>
<table style=\"width:100%;border-collapse:collapse\">
  <thead><tr><th align=\"left\">Item</th><th align=\"left\">Qty</th><th align=\"left\">Total</th></tr></thead>
  <tbody>" . $rows . "</tbody>
</table>
<p><strong>Subtotal:</strong> " . $this->escapeHtml($this->formatMoney($subtotalCents)) . "<br/>
<strong>" . $this->escapeHtml($shippingLabel) . ":</strong> " . $this->escapeHtml($this->formatMoney($shippingCents)) . "<br/>
<strong>Total:</strong> " . $this->escapeHtml($this->formatMoney($totalCents)) . "</p>
<p>We will follow up shortly with the planning.</p>
";
    }

    return "
<h2>Bedankt voor je bestelling!</h2>
<p><strong>Ordercode:</strong> " . $this->escapeHtml($order["order_code"]) . "</p>
<table style=\"width:100%;border-collapse:collapse\">
  <thead><tr><th align=\"left\">Item</th><th align=\"left\">Aantal</th><th align=\"left\">Totaal</th></tr></thead>
  <tbody>" . $rows . "</tbody>
</table>
<p><strong>Subtotaal:</strong> " . $this->escapeHtml($this->formatMoney($subtotalCents)) . "<br/>
<strong>" . $this->escapeHtml($shippingLabel) . ":</strong> " . $this->escapeHtml($this->formatMoney($shippingCents)) . "<br/>
<strong>Totaal:</strong> " . $this->escapeHtml($this->formatMoney($totalCents)) . "</p>
<p>We nemen snel contact op met de planning.</p>
";
  }

  private function formatMailbox(string $value): string
  {
    $trimmed = trim($value);
    if (preg_match("/(.*)<([^>]+)>/", $trimmed, $matches)) {
      $name = trim($matches[1], "\" ");
      $email = trim($matches[2]);
      if ($name !== "") {
        return "\"" . $this->escapeHeader($name) . "\" <" . $email . ">";
      }
      return $email;
    }
    return $trimmed;
  }

  private function escapeHeader(string $value): string
  {
    return str_replace(["\r", "\n"], "", $value);
  }

  private function escapeHtml(string $value): string
  {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
  }

  private function formatMoney(int $cents): string
  {
    return "EUR " . number_format($cents / 100, 2, ".", "");
  }

  private function buildCartResponse(string $cartId, string $locale): array
  {
    $lines = $this->fetchCartLines($cartId);
    $shippingMethods = $this->listShippingMethods($locale);
    $shippingCents = 0;
    if ($lines && $shippingMethods) {
      $shippingCents = (int)round($shippingMethods[0]["price"]["amount"] * 100);
    }

    $subtotalCents = $this->sumSubtotalCents($lines);
    $totals = $this->totals($subtotalCents, $shippingCents);

    $linePayload = array_map(function ($line) {
      return [
        "lineId" => $line["id"],
        "productSlug" => $line["product_slug"],
        "quantity" => (int)$line["quantity"],
        "price" => $this->money((int)$line["price_cents"]),
        "total" => $this->money((int)$line["total_cents"]),
      ];
    }, $lines);

    return [
      "cartId" => $cartId,
      "currency" => "EUR",
      "lines" => $linePayload,
      "totals" => $totals,
      "shippingMethods" => $shippingMethods,
    ];
  }

  private function sumSubtotalCents(array $lines): int
  {
    $subtotal = 0;
    foreach ($lines as $line) {
      $subtotal += (int)$line["total_cents"];
    }
    return $subtotal;
  }

  private function totals(int $subtotalCents, int $shippingCents): array
  {
    $totalCents = $subtotalCents + $shippingCents;
    return [
      "subtotal" => $this->money($subtotalCents),
      "shipping" => $this->money($shippingCents),
      "total" => $this->money($totalCents),
    ];
  }

  private function money(int $cents): array
  {
    return [
      "amount" => round($cents / 100, 2),
      "currency" => "EUR",
      "vatApplicable" => false,
    ];
  }

  private function generateId(): string
  {
    return bin2hex(random_bytes(16));
  }

  private function generateOrderCode(): string
  {
    $stamp = gmdate("Ymd");
    $rand = strtoupper(substr(bin2hex(random_bytes(4)), 0, 6));
    return "X3D-" . $stamp . "-" . $rand;
  }

  private function normalizeQuantity(int $quantity): int
  {
    if ($quantity < 1) {
      return 1;
    }
    if ($quantity > 100) {
      return 100;
    }
    return $quantity;
  }

  private function assertCartExists(string $cartId): void
  {
    $stmt = $this->pdo->prepare("SELECT id FROM shop_carts WHERE id = :id LIMIT 1");
    $stmt->execute(["id" => $cartId]);
    if (!$stmt->fetch()) {
      throw new RuntimeException("Cart not found");
    }
  }

  private function fetchProductRow(string $slug): ?array
  {
    $stmt = $this->pdo->prepare(
      "SELECT slug, price_cents FROM shop_products WHERE slug = :slug AND is_live = 1 LIMIT 1",
    );
    $stmt->execute(["slug" => $slug]);
    $row = $stmt->fetch();
    return $row ?: null;
  }

  private function fetchLineByProduct(string $cartId, string $productSlug): ?array
  {
    $stmt = $this->pdo->prepare(
      "SELECT id, quantity FROM shop_cart_lines WHERE cart_id = :cart_id AND product_slug = :product_slug LIMIT 1",
    );
    $stmt->execute([
      "cart_id" => $cartId,
      "product_slug" => $productSlug,
    ]);
    $row = $stmt->fetch();
    return $row ?: null;
  }

  private function fetchLineById(string $lineId): ?array
  {
    $stmt = $this->pdo->prepare(
      "SELECT id, cart_id, product_slug FROM shop_cart_lines WHERE id = :id LIMIT 1",
    );
    $stmt->execute(["id" => $lineId]);
    $row = $stmt->fetch();
    return $row ?: null;
  }

  private function updateLineQuantity(string $lineId, int $quantity, int $priceCents): void
  {
    $totalCents = $priceCents * $quantity;
    $stmt = $this->pdo->prepare(
      "UPDATE shop_cart_lines SET quantity = :quantity, price_cents = :price_cents, total_cents = :total_cents WHERE id = :id",
    );
    $stmt->execute([
      "id" => $lineId,
      "quantity" => $quantity,
      "price_cents" => $priceCents,
      "total_cents" => $totalCents,
    ]);
  }

  private function deleteLine(string $lineId): void
  {
    $stmt = $this->pdo->prepare("DELETE FROM shop_cart_lines WHERE id = :id");
    $stmt->execute(["id" => $lineId]);
  }

  private function fetchCartLines(string $cartId): array
  {
    $stmt = $this->pdo->prepare(
      "SELECT id, product_slug, quantity, price_cents, total_cents FROM shop_cart_lines WHERE cart_id = :cart_id ORDER BY created_at ASC",
    );
    $stmt->execute(["cart_id" => $cartId]);
    return $stmt->fetchAll();
  }

  private function createMolliePayment(string $orderCode, string $cartId, int $totalCents, string $locale): array
  {
    $value = number_format($totalCents / 100, 2, ".", "");
    $redirectPath = $locale === "en" ? "/en/shop/checkout/" : "/shop/checkout/";
    $redirectUrl = $this->siteUrl . $redirectPath . "?order=" . urlencode($orderCode);
    $payload = [
      "amount" => [
        "currency" => "EUR",
        "value" => $value,
      ],
      "description" => "X3DPrints order " . $orderCode,
      "redirectUrl" => $redirectUrl,
      "metadata" => [
        "orderCode" => $orderCode,
        "cartId" => $cartId,
      ],
    ];
    if ($this->bffBaseUrl !== "") {
      $payload["webhookUrl"] = $this->bffBaseUrl . "/shop/webhooks/mollie";
    }

    $response = $this->mollieRequest("POST", "/payments", $payload);
    $checkoutUrl = $response["_links"]["checkout"]["href"] ?? null;
    $paymentId = $response["id"] ?? null;
    if (!$checkoutUrl || !$paymentId) {
      throw new RuntimeException("Mollie response missing checkout url");
    }

    return [
      "id" => $paymentId,
      "checkoutUrl" => $checkoutUrl,
    ];
  }

  private function mollieRequest(string $method, string $path, array $payload = []): array
  {
    $url = "https://api.mollie.com/v2" . $path;
    $headers = [
      "Authorization: Bearer " . $this->mollieKey,
      "Accept: application/json",
    ];

    return $this->httpRequest($method, $url, $payload, $headers);
  }

  private function httpRequest(string $method, string $url, array $payload, array $headers): array
  {
    $body = json_encode($payload, JSON_UNESCAPED_SLASHES);
    $headers[] = "Content-Type: application/json";

    if (!function_exists("curl_init")) {
      $headerLines = implode("\r\n", $headers);
      $options = [
        "http" => [
          "method" => $method,
          "header" => $headerLines,
          "content" => $body,
        ],
      ];
      $context = stream_context_create($options);
      $response = file_get_contents($url, false, $context);
      if ($response === false) {
        throw new RuntimeException("HTTP request failed");
      }
      $decoded = json_decode($response, true);
      if (!is_array($decoded)) {
        throw new RuntimeException("Invalid HTTP response");
      }
      return $decoded;
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);

    $response = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($response === false) {
      $error = curl_error($ch);
      curl_close($ch);
      throw new RuntimeException("HTTP request failed: " . $error);
    }
    curl_close($ch);

    $decoded = json_decode($response, true);
    if (!is_array($decoded)) {
      throw new RuntimeException("Invalid HTTP response");
    }
    if ($status >= 400) {
      $message = $decoded["detail"] ?? $decoded["message"] ?? "Request failed";
      throw new RuntimeException($message);
    }

    return $decoded;
  }
}
