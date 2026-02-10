<?php
declare(strict_types=1);

$bootstrap = __DIR__ . "/bff/src/bootstrap.php";
if (!file_exists($bootstrap)) {
  $bootstrap = __DIR__ . "/../bff/src/bootstrap.php";
}
if (!file_exists($bootstrap)) {
  http_response_code(500);
  header("Content-Type: application/json; charset=utf-8");
  echo json_encode(["error" => "CRM bootstrap not found"]);
  exit;
}

require $bootstrap;
require_once __DIR__ . "/crm-common.php";
$mailerPath = __DIR__ . "/bff/src/Mailer.php";
if (!file_exists($mailerPath)) {
  $mailerPath = __DIR__ . "/../bff/src/Mailer.php";
}
require_once $mailerPath;
$shopServicePath = __DIR__ . "/bff/src/ShopService.php";
if (!file_exists($shopServicePath)) {
  $shopServicePath = __DIR__ . "/../bff/src/ShopService.php";
}
require_once $shopServicePath;

header("Content-Type: application/json; charset=utf-8");
header("X-Robots-Tag: noindex, nofollow");

$secure = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off");
session_name("x3dprints_crm");
session_set_cookie_params([
  "lifetime" => 0,
  "path" => "/",
  "secure" => $secure,
  "httponly" => true,
  "samesite" => "Strict",
]);
session_start();

if (empty($_SESSION["crm_auth"])) {
  http_response_code(401);
  echo json_encode(["error" => "Unauthorized"]);
  exit;
}

if (($_SERVER["REQUEST_METHOD"] ?? "GET") !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

$payload = readJsonBody();
$action = (string)($payload["action"] ?? "update");

$pdo = getPdo();
$metaFile = crmDataPath("order-meta.json");
$meta = crmReadJsonFile($metaFile);
if (!is_array($meta)) {
  $meta = [];
}

function normalizeQuantity(int $quantity): int
{
  if ($quantity < 1) return 1;
  if ($quantity > 100) return 100;
  return $quantity;
}

function generateId(): string
{
  return bin2hex(random_bytes(16));
}

function generateOrderCode(): string
{
  $stamp = gmdate("Ymd");
  $rand = strtoupper(substr(bin2hex(random_bytes(4)), 0, 6));
  return "X3D-" . $stamp . "-" . $rand;
}

function buildShopService(PDO $pdo): ShopService
{
  $config = [
    "siteUrl" => env("SHOP_SITE_URL") ?? "https://x3dprints.be",
    "bffBaseUrl" => env("BFF_BASE_URL") ?? "",
    "mollieKey" => env("MOLLIE_API_KEY") ?? null,
    "debug" => envBool("APP_DEBUG", false),
  ];
  return new ShopService($pdo, $config);
}

function fetchOrderRow(PDO $pdo, string $id): ?array
{
  $stmt = $pdo->prepare(
    "SELECT id, cart_id, order_code, status, email, locale, shipping_method_id, total_cents, mollie_payment_id, created_at
     FROM shop_orders WHERE id = :id LIMIT 1",
  );
  $stmt->execute(["id" => $id]);
  $row = $stmt->fetch();
  return $row ?: null;
}

function fetchOrderLines(PDO $pdo, string $cartId): array
{
  $stmt = $pdo->prepare(
    "SELECT l.product_slug, l.quantity, l.total_cents, p.name_nl, p.name_en
     FROM shop_cart_lines l
     LEFT JOIN shop_products p ON p.slug = l.product_slug
     WHERE l.cart_id = :cart_id
     ORDER BY l.created_at ASC",
  );
  $stmt->execute(["cart_id" => $cartId]);
  return $stmt->fetchAll();
}

function fetchCartLineRows(PDO $pdo, string $cartId): array
{
  $stmt = $pdo->prepare(
    "SELECT id, product_slug, quantity FROM shop_cart_lines WHERE cart_id = :cart_id",
  );
  $stmt->execute(["cart_id" => $cartId]);
  return $stmt->fetchAll();
}

function sumCartTotal(PDO $pdo, string $cartId): int
{
  $stmt = $pdo->prepare("SELECT SUM(total_cents) AS subtotal FROM shop_cart_lines WHERE cart_id = :cart_id");
  $stmt->execute(["cart_id" => $cartId]);
  $row = $stmt->fetch();
  return $row && $row["subtotal"] !== null ? (int)$row["subtotal"] : 0;
}

function fetchShippingMethod(PDO $pdo, string $id): ?array
{
  $stmt = $pdo->prepare("SELECT id, price_cents FROM shop_shipping_methods WHERE id = :id LIMIT 1");
  $stmt->execute(["id" => $id]);
  $row = $stmt->fetch();
  return $row ?: null;
}

function fetchProduct(PDO $pdo, string $slug): ?array
{
  $stmt = $pdo->prepare("SELECT slug, price_cents FROM shop_products WHERE slug = :slug LIMIT 1");
  $stmt->execute(["slug" => $slug]);
  $row = $stmt->fetch();
  return $row ?: null;
}

function mapOrder(array $row, array $lines, array $metaEntry): array
{
  $locale = ($row["locale"] ?? "nl") === "en" ? "en" : "nl";
  $items = [];
  foreach ($lines as $line) {
    $name = $locale === "en" ? ($line["name_en"] ?: $line["product_slug"]) : ($line["name_nl"] ?: $line["product_slug"]);
    $items[] = [
      "productSlug" => $line["product_slug"],
      "name" => $name,
      "quantity" => (int)$line["quantity"],
      "totalEur" => round(((int)$line["total_cents"]) / 100, 2),
    ];
  }
  $itemsSummary = implode(" | ", array_map(function ($item) {
    return $item["name"] . " x" . $item["quantity"];
  }, $items));

  return [
    "id" => $row["id"],
    "orderCode" => $row["order_code"],
    "status" => $row["status"],
    "email" => $row["email"],
    "locale" => $row["locale"],
    "shippingMethodId" => $row["shipping_method_id"],
    "source" => !empty($row["mollie_payment_id"]) ? "mollie" : "manual",
    "totalEur" => round(((int)$row["total_cents"]) / 100, 2),
    "createdAt" => $row["created_at"],
    "items" => $items,
    "itemsSummary" => $itemsSummary,
    "notes" => isset($metaEntry["notes"]) ? (string)$metaEntry["notes"] : "",
    "archived" => !empty($metaEntry["archived"]),
    "timeline" => isset($metaEntry["timeline"]) && is_array($metaEntry["timeline"]) ? $metaEntry["timeline"] : [],
  ];
}

function applyMeta(array $meta, string $id, ?string $notes, ?bool $archived): array
{
  $entry = [];
  if (isset($meta[$id]) && is_array($meta[$id])) {
    $entry = $meta[$id];
  }
  if ($notes !== null) {
    $entry["notes"] = $notes;
  }
  if ($archived !== null) {
    $entry["archived"] = $archived;
  }
  $entry["updatedAt"] = gmdate("c");
  $meta[$id] = $entry;
  return $meta;
}

function appendTimeline(array $meta, string $id, string $status, ?string $note): array
{
  $entry = [];
  if (isset($meta[$id]) && is_array($meta[$id])) {
    $entry = $meta[$id];
  }
  $timeline = [];
  if (isset($entry["timeline"]) && is_array($entry["timeline"])) {
    $timeline = $entry["timeline"];
  }
  $timeline[] = [
    "ts" => gmdate("c"),
    "status" => $status,
    "note" => $note,
  ];
  if (count($timeline) > 50) {
    $timeline = array_slice($timeline, -50);
  }
  $entry["timeline"] = $timeline;
  $entry["updatedAt"] = gmdate("c");
  $meta[$id] = $entry;
  return $meta;
}

function respondWithOrder(PDO $pdo, string $orderId, array $meta): void
{
  $row = fetchOrderRow($pdo, $orderId);
  if (!$row) {
    http_response_code(404);
    echo json_encode(["error" => "Order not found"]);
    exit;
  }
  $lines = fetchOrderLines($pdo, $row["cart_id"]);
  $metaEntry = [];
  if (isset($meta[$orderId]) && is_array($meta[$orderId])) {
    $metaEntry = $meta[$orderId];
  }
  $order = mapOrder($row, $lines, $metaEntry);
  echo json_encode(["ok" => true, "order" => $order]);
  exit;
}

if ($action === "create") {
  $email = trim((string)($payload["email"] ?? ""));
  if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email"]);
    exit;
  }

  $locale = (string)($payload["locale"] ?? "nl");
  $locale = $locale === "en" ? "en" : "nl";

  $shippingMethodId = trim((string)($payload["shippingMethodId"] ?? ""));
  if ($shippingMethodId === "") {
    http_response_code(400);
    echo json_encode(["error" => "Missing shipping method"]);
    exit;
  }
  $shippingMethod = fetchShippingMethod($pdo, $shippingMethodId);
  if (!$shippingMethod) {
    http_response_code(400);
    echo json_encode(["error" => "Shipping method not found"]);
    exit;
  }

  $items = $payload["items"] ?? [];
  if (!is_array($items) || count($items) === 0) {
    http_response_code(400);
    echo json_encode(["error" => "Missing items"]);
    exit;
  }

  $cartId = generateId();
  $stmt = $pdo->prepare("INSERT INTO shop_carts (id, currency) VALUES (:id, 'EUR')");
  $stmt->execute(["id" => $cartId]);

  $subtotalCents = 0;
  $lineCount = 0;
  foreach ($items as $item) {
    $slug = trim((string)($item["productSlug"] ?? ""));
    if ($slug === "") {
      continue;
    }
    $quantity = normalizeQuantity((int)($item["quantity"] ?? 1));
    $product = fetchProduct($pdo, $slug);
    if (!$product) {
      http_response_code(400);
      echo json_encode(["error" => "Unknown product"]);
      exit;
    }
    $priceCents = (int)$product["price_cents"];
    $lineId = generateId();
    $totalCents = $priceCents * $quantity;
    $subtotalCents += $totalCents;
    $lineCount += 1;

    $stmt = $pdo->prepare(
      "INSERT INTO shop_cart_lines (id, cart_id, product_slug, quantity, price_cents, total_cents)
       VALUES (:id, :cart_id, :product_slug, :quantity, :price_cents, :total_cents)",
    );
    $stmt->execute([
      "id" => $lineId,
      "cart_id" => $cartId,
      "product_slug" => $slug,
      "quantity" => $quantity,
      "price_cents" => $priceCents,
      "total_cents" => $totalCents,
    ]);
  }

  if ($lineCount === 0) {
    $stmt = $pdo->prepare("DELETE FROM shop_carts WHERE id = :id");
    $stmt->execute(["id" => $cartId]);
    http_response_code(400);
    echo json_encode(["error" => "Missing items"]);
    exit;
  }

  $shippingCents = (int)$shippingMethod["price_cents"];
  $totalCents = $subtotalCents + $shippingCents;
  $orderId = generateId();
  $orderCode = generateOrderCode();
  $status = trim((string)($payload["status"] ?? "manual"));
  if (!preg_match("/^[a-z_]+$/", $status)) {
    $status = "manual";
  }

  $stmt = $pdo->prepare(
    "INSERT INTO shop_orders (id, cart_id, order_code, status, email, locale, shipping_method_id, total_cents, mollie_payment_id)
     VALUES (:id, :cart_id, :order_code, :status, :email, :locale, :shipping_method_id, :total_cents, NULL)",
  );
  $stmt->execute([
    "id" => $orderId,
    "cart_id" => $cartId,
    "order_code" => $orderCode,
    "status" => $status,
    "email" => $email,
    "locale" => $locale,
    "shipping_method_id" => $shippingMethodId,
    "total_cents" => $totalCents,
  ]);

  $note = isset($payload["statusNote"]) ? trim((string)$payload["statusNote"]) : "Handmatige order aangemaakt";
  $meta = appendTimeline($meta, $orderId, $status, $note);
  crmWriteJsonFile($metaFile, $meta);

  if (isset($payload["notes"])) {
    $notes = trim((string)$payload["notes"]);
    $meta = applyMeta($meta, $orderId, $notes, false);
    crmWriteJsonFile($metaFile, $meta);
  }

  respondWithOrder($pdo, $orderId, $meta);
}

if ($action === "archive" || $action === "delete") {
  $id = trim((string)($payload["id"] ?? ""));
  if ($id === "") {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
  }
  $archived = isset($payload["archived"]) ? (bool)$payload["archived"] : true;
  $meta = applyMeta($meta, $id, null, $archived);
  $meta = appendTimeline($meta, $id, "archived", $archived ? "Order gearchiveerd" : "Order hersteld");
  crmWriteJsonFile($metaFile, $meta);
  respondWithOrder($pdo, $id, $meta);
}

if ($action === "resend-email") {
  $id = trim((string)($payload["id"] ?? ""));
  if ($id === "") {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
  }
  $orderRow = fetchOrderRow($pdo, $id);
  if (!$orderRow) {
    http_response_code(404);
    echo json_encode(["error" => "Order not found"]);
    exit;
  }
  try {
    $service = buildShopService($pdo);
    $service->resendOrderEmails($id);
  } catch (Throwable $error) {
    logError("crm_resend_email", ["message" => $error->getMessage()]);
    http_response_code(500);
    echo json_encode(["error" => "Email resend failed"]);
    exit;
  }

  $meta = appendTimeline($meta, $id, $orderRow["status"] ?: "email", "Ordermails opnieuw verstuurd");
  crmWriteJsonFile($metaFile, $meta);
  respondWithOrder($pdo, $id, $meta);
}

if ($action !== "update") {
  http_response_code(400);
  echo json_encode(["error" => "Unknown action"]);
  exit;
}

$id = trim((string)($payload["id"] ?? ""));
if ($id === "") {
  http_response_code(400);
  echo json_encode(["error" => "Missing id"]);
  exit;
}

$orderRow = fetchOrderRow($pdo, $id);
if (!$orderRow) {
  http_response_code(404);
  echo json_encode(["error" => "Order not found"]);
  exit;
}

$updates = [];
$params = ["id" => $id];
$needsRecalc = !empty($payload["recalculate"]);
$hasItemUpdate = array_key_exists("items", $payload);

if (array_key_exists("status", $payload)) {
  $status = strtolower(trim((string)$payload["status"]));
  if ($status !== "" && preg_match("/^[a-z_]+$/", $status)) {
    $updates[] = "status = :status";
    $params["status"] = $status;
  }
}

if (array_key_exists("email", $payload)) {
  $email = trim((string)$payload["email"]);
  if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email"]);
    exit;
  }
  if ($email !== "") {
    $updates[] = "email = :email";
    $params["email"] = $email;
  }
}

if (array_key_exists("shippingMethodId", $payload)) {
  $methodId = trim((string)$payload["shippingMethodId"]);
  if ($methodId !== "") {
    $method = fetchShippingMethod($pdo, $methodId);
    if (!$method) {
      http_response_code(400);
      echo json_encode(["error" => "Shipping method not found"]);
      exit;
    }
    $updates[] = "shipping_method_id = :shipping_method_id";
    $params["shipping_method_id"] = $methodId;
    $needsRecalc = true;
  }
}

if ($hasItemUpdate) {
  $itemsPayload = $payload["items"];
  if (!is_array($itemsPayload) || count($itemsPayload) === 0) {
    http_response_code(400);
    echo json_encode(["error" => "Missing items"]);
    exit;
  }

  $itemsBySlug = [];
  foreach ($itemsPayload as $item) {
    if (!is_array($item)) continue;
    $slug = trim((string)($item["productSlug"] ?? ""));
    if ($slug === "") {
      continue;
    }
    $quantity = normalizeQuantity((int)($item["quantity"] ?? 1));
    if (isset($itemsBySlug[$slug])) {
      $itemsBySlug[$slug] += $quantity;
    } else {
      $itemsBySlug[$slug] = $quantity;
    }
  }

  if (!$itemsBySlug) {
    http_response_code(400);
    echo json_encode(["error" => "Missing items"]);
    exit;
  }

  try {
    $pdo->beginTransaction();
    $existingLines = fetchCartLineRows($pdo, $orderRow["cart_id"]);
    $existingMap = [];
    foreach ($existingLines as $line) {
      $existingMap[$line["product_slug"]] = $line;
    }

    foreach ($itemsBySlug as $slug => $quantity) {
      $product = fetchProduct($pdo, $slug);
      if (!$product) {
        $pdo->rollBack();
        http_response_code(400);
        echo json_encode(["error" => "Unknown product"]);
        exit;
      }
      $priceCents = (int)$product["price_cents"];
      $totalCents = $priceCents * $quantity;
      if (isset($existingMap[$slug])) {
        $stmt = $pdo->prepare(
          "UPDATE shop_cart_lines SET quantity = :quantity, price_cents = :price_cents, total_cents = :total_cents WHERE id = :id",
        );
        $stmt->execute([
          "id" => $existingMap[$slug]["id"],
          "quantity" => $quantity,
          "price_cents" => $priceCents,
          "total_cents" => $totalCents,
        ]);
      } else {
        $lineId = generateId();
        $stmt = $pdo->prepare(
          "INSERT INTO shop_cart_lines (id, cart_id, product_slug, quantity, price_cents, total_cents)
           VALUES (:id, :cart_id, :product_slug, :quantity, :price_cents, :total_cents)",
        );
        $stmt->execute([
          "id" => $lineId,
          "cart_id" => $orderRow["cart_id"],
          "product_slug" => $slug,
          "quantity" => $quantity,
          "price_cents" => $priceCents,
          "total_cents" => $totalCents,
        ]);
      }
    }

    foreach ($existingLines as $line) {
      if (!isset($itemsBySlug[$line["product_slug"]])) {
        $stmt = $pdo->prepare("DELETE FROM shop_cart_lines WHERE id = :id");
        $stmt->execute(["id" => $line["id"]]);
      }
    }

    $pdo->commit();
  } catch (Throwable $error) {
    if ($pdo->inTransaction()) {
      $pdo->rollBack();
    }
    logError("crm_order_items", ["message" => $error->getMessage()]);
    http_response_code(500);
    echo json_encode(["error" => "Could not update items"]);
    exit;
  }

  $needsRecalc = true;
}

if ($needsRecalc) {
  $methodId = $params["shipping_method_id"] ?? $orderRow["shipping_method_id"];
  $shippingMethod = $methodId ? fetchShippingMethod($pdo, (string)$methodId) : null;
  $shippingCents = $shippingMethod ? (int)$shippingMethod["price_cents"] : 0;
  $subtotalCents = sumCartTotal($pdo, $orderRow["cart_id"]);
  $totalCents = $subtotalCents + $shippingCents;
  $updates[] = "total_cents = :total_cents";
  $params["total_cents"] = $totalCents;
}

if ($updates) {
  $sql = "UPDATE shop_orders SET " . implode(", ", $updates) . " WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);
}

$notes = array_key_exists("notes", $payload) ? trim((string)$payload["notes"]) : null;
$archived = array_key_exists("archived", $payload) ? (bool)$payload["archived"] : null;
if ($notes !== null || $archived !== null) {
  $meta = applyMeta($meta, $id, $notes, $archived);
  crmWriteJsonFile($metaFile, $meta);
}

$previousStatus = strtolower(trim((string)($payload["previousStatus"] ?? "")));
$currentStatus = $params["status"] ?? $orderRow["status"];
$statusNote = array_key_exists("statusNote", $payload) ? trim((string)$payload["statusNote"]) : "";
if ($statusNote !== "" || ($previousStatus !== "" && $currentStatus !== "" && $previousStatus !== $currentStatus)) {
  $meta = appendTimeline($meta, $id, (string)$currentStatus, $statusNote !== "" ? $statusNote : null);
  crmWriteJsonFile($metaFile, $meta);
}

respondWithOrder($pdo, $id, $meta);
