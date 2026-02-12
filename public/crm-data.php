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

header("Content-Type: application/json; charset=utf-8");
header("X-Robots-Tag: noindex, nofollow");

crmSessionStart();
crmRequireAuth();

$type = $_GET["type"] ?? "";
$download = isset($_GET["download"]);
$method = $_SERVER["REQUEST_METHOD"] ?? "GET";
$orderMetaFile = crmDataPath("order-meta.json");
$orderMeta = crmReadJsonFile($orderMetaFile);
if (!is_array($orderMeta)) {
  $orderMeta = [];
}

function writeCsv(array $headers, array $rows): void
{
  header("Content-Type: text/csv; charset=utf-8");
  header("Content-Disposition: attachment; filename=\"crm-export.csv\"");
  $out = fopen("php://output", "w");
  fputcsv($out, $headers);
  foreach ($rows as $row) {
    fputcsv($out, $row);
  }
  fclose($out);
  exit;
}

function tableExists(PDO $pdo, string $table): bool
{
  try {
    $stmt = $pdo->query("SHOW TABLES LIKE " . $pdo->quote($table));
    return (bool)$stmt->fetchColumn();
  } catch (Throwable $error) {
    return false;
  }
}

function columnExists(PDO $pdo, string $table, string $column): bool
{
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM {$table} LIKE " . $pdo->quote($column));
    return (bool)$stmt->fetch();
  } catch (Throwable $error) {
    return false;
  }
}

function defaultShippingMethods(): array
{
  return [
    [
      "id" => "be_flat",
      "labelNl" => "Levering in Belgie (tot 3 kg)",
      "labelEn" => "Delivery in Belgium (up to 3 kg)",
      "priceEur" => 7.5,
      "active" => true,
    ],
    [
      "id" => "pickup",
      "labelNl" => "Afhalen op afspraak",
      "labelEn" => "Pickup by appointment",
      "priceEur" => 0,
      "active" => true,
    ],
  ];
}

function generateCrmStateId(): string
{
  try {
    return bin2hex(random_bytes(16));
  } catch (Throwable $error) {
    return uniqid("crm", true);
  }
}

function sanitizeProcessedMap($raw): array
{
  if (!is_array($raw)) {
    return [];
  }
  $next = [];
  foreach ($raw as $key => $value) {
    $ts = trim((string)$key);
    if ($ts === "" || strlen($ts) > 180) {
      continue;
    }
    $next[$ts] = !empty($value);
  }
  return $next;
}

function sanitizeStockItems($raw): array
{
  if (!is_array($raw)) {
    return [];
  }
  $items = [];
  $usedIds = [];
  foreach ($raw as $entry) {
    if (!is_array($entry)) continue;
    $material = trim((string)($entry["material"] ?? ""));
    $color = trim((string)($entry["color"] ?? ""));
    if ($material === "" || $color === "") continue;
    $id = trim((string)($entry["id"] ?? ""));
    if ($id === "" || isset($usedIds[$id])) {
      $id = generateCrmStateId();
    }
    $usedIds[$id] = true;
    $diameter = trim((string)($entry["diameter"] ?? "1.75mm"));
    if ($diameter === "") $diameter = "1.75mm";
    $gramsRaw = $entry["availableGrams"] ?? 0;
    $availableGrams = is_numeric($gramsRaw) ? (int)round((float)$gramsRaw) : 0;
    if ($availableGrams < 0) $availableGrams = 0;
    $supplier = trim((string)($entry["supplier"] ?? ""));
    $notes = trim((string)($entry["notes"] ?? ""));
    $updatedAt = trim((string)($entry["updatedAt"] ?? ""));
    if ($updatedAt === "") {
      $updatedAt = gmdate("c");
    }
    $items[] = [
      "id" => $id,
      "material" => $material,
      "color" => $color,
      "diameter" => $diameter,
      "availableGrams" => $availableGrams,
      "supplier" => $supplier,
      "notes" => $notes,
      "updatedAt" => $updatedAt,
    ];
  }
  return $items;
}

if ($type === "material-stock") {
  $file = crmDataPath("material-stock.json");
  $data = crmReadJsonFile($file);
  if (!$data) {
    $data = new stdClass();
  }
  echo json_encode($data);
  exit;
}

if ($type === "replies") {
  $file = crmDataPath("crm-replies.json");
  $data = crmReadJsonFile($file);
  if ($download) {
    $rows = array_map(function ($item) {
      return [
        $item["ts"] ?? "",
        $item["to"] ?? "",
        $item["subject"] ?? "",
        $item["sent"] ? "true" : "false",
      ];
    }, $data);
    writeCsv(["ts", "to", "subject", "sent"], $rows);
  }
  echo json_encode($data);
  exit;
}

if ($type === "contact-processed") {
  $file = crmDataPath("crm-contact-processed.json");
  if ($method === "GET") {
    echo json_encode(sanitizeProcessedMap(crmReadJsonFile($file)));
    exit;
  }
  if ($method === "POST") {
    $payload = readJsonBody();
    $processed = sanitizeProcessedMap($payload["processed"] ?? []);
    if (!crmWriteJsonFile($file, $processed)) {
      http_response_code(500);
      echo json_encode(["error" => "Cannot save processed map"]);
      exit;
    }
    echo json_encode(["ok" => true, "processed" => $processed]);
    exit;
  }
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

if ($type === "stock-items") {
  $file = crmDataPath("crm-stock-items.json");
  if ($method === "GET") {
    echo json_encode(sanitizeStockItems(crmReadJsonFile($file)));
    exit;
  }
  if ($method === "POST") {
    $payload = readJsonBody();
    $stock = sanitizeStockItems($payload["stock"] ?? []);
    if (!crmWriteJsonFile($file, $stock)) {
      http_response_code(500);
      echo json_encode(["error" => "Cannot save stock items"]);
      exit;
    }
    echo json_encode(["ok" => true, "stock" => $stock]);
    exit;
  }
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

if ($type === "dashboard-metrics") {
  if ($method !== "GET") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
  }
  try {
    $pdo = getPdo();

    $metrics = [
      "revenue7dEur" => 0,
      "revenuePrev7dEur" => 0,
      "revenue30dEur" => 0,
      "revenuePrev30dEur" => 0,
      "orders7d" => 0,
      "ordersPrev7d" => 0,
      "openOrders" => 0,
      "lowStockCount" => 0,
      "processedContacts" => 0,
      "totalContacts" => 0,
    ];

    if (tableExists($pdo, "shop_orders")) {
      $hasCreated = columnExists($pdo, "shop_orders", "created_at");
      $hasTotal = columnExists($pdo, "shop_orders", "total_cents");
      $hasStatus = columnExists($pdo, "shop_orders", "status");

      if ($hasCreated && $hasTotal) {
        $now = new DateTimeImmutable("now", new DateTimeZone("UTC"));
        $from7 = $now->modify("-7 days")->format("Y-m-d H:i:s");
        $from14 = $now->modify("-14 days")->format("Y-m-d H:i:s");
        $from30 = $now->modify("-30 days")->format("Y-m-d H:i:s");
        $from60 = $now->modify("-60 days")->format("Y-m-d H:i:s");

        $stmt = $pdo->prepare(
          "SELECT
            COALESCE(SUM(CASE WHEN created_at >= :from7 THEN total_cents ELSE 0 END), 0) AS rev7,
            COALESCE(SUM(CASE WHEN created_at >= :from14 AND created_at < :from7 THEN total_cents ELSE 0 END), 0) AS revPrev7,
            COALESCE(SUM(CASE WHEN created_at >= :from30 THEN total_cents ELSE 0 END), 0) AS rev30,
            COALESCE(SUM(CASE WHEN created_at >= :from60 AND created_at < :from30 THEN total_cents ELSE 0 END), 0) AS revPrev30,
            COALESCE(SUM(CASE WHEN created_at >= :from7 THEN 1 ELSE 0 END), 0) AS orders7,
            COALESCE(SUM(CASE WHEN created_at >= :from14 AND created_at < :from7 THEN 1 ELSE 0 END), 0) AS ordersPrev7
          FROM shop_orders
          WHERE created_at >= :from60",
        );
        $stmt->execute([
          "from7" => $from7,
          "from14" => $from14,
          "from30" => $from30,
          "from60" => $from60,
        ]);
        $row = $stmt->fetch() ?: [];
        $metrics["revenue7dEur"] = round(((int)($row["rev7"] ?? 0)) / 100, 2);
        $metrics["revenuePrev7dEur"] = round(((int)($row["revPrev7"] ?? 0)) / 100, 2);
        $metrics["revenue30dEur"] = round(((int)($row["rev30"] ?? 0)) / 100, 2);
        $metrics["revenuePrev30dEur"] = round(((int)($row["revPrev30"] ?? 0)) / 100, 2);
        $metrics["orders7d"] = (int)($row["orders7"] ?? 0);
        $metrics["ordersPrev7d"] = (int)($row["ordersPrev7"] ?? 0);
      }

      if ($hasStatus) {
        $closed = ["paidout", "fulfilled", "failed", "canceled", "expired", "refund", "refunded", "charged_back"];
        $placeholders = implode(", ", array_fill(0, count($closed), "?"));
        $stmt = $pdo->prepare("SELECT COUNT(*) AS c FROM shop_orders WHERE LOWER(status) NOT IN ({$placeholders})");
        $stmt->execute($closed);
        $metrics["openOrders"] = (int)($stmt->fetch()["c"] ?? 0);
      }
    }

    $stockItems = sanitizeStockItems(crmReadJsonFile(crmDataPath("crm-stock-items.json")));
    $metrics["lowStockCount"] = count(array_filter($stockItems, function ($item) {
      return (int)($item["availableGrams"] ?? 0) <= 250;
    }));

    $logs = crmReadJsonFile(crmDataPath("contact-log.json"));
    $processedMap = sanitizeProcessedMap(crmReadJsonFile(crmDataPath("crm-contact-processed.json")));
    $metrics["totalContacts"] = is_array($logs) ? count($logs) : 0;
    $processedCount = 0;
    if (is_array($logs)) {
      foreach ($logs as $entry) {
        if (!is_array($entry)) continue;
        $ts = trim((string)($entry["ts"] ?? ""));
        if ($ts !== "" && !empty($processedMap[$ts])) {
          $processedCount++;
        }
      }
    }
    $metrics["processedContacts"] = $processedCount;

    echo json_encode($metrics);
    exit;
  } catch (Throwable $error) {
    logError("crm_dashboard_metrics", ["message" => $error->getMessage()]);
    http_response_code(500);
    echo json_encode(["error" => "Cannot load dashboard metrics"]);
    exit;
  }
}

if ($type === "shipping-methods") {
  try {
    $pdo = getPdo();
    if (!tableExists($pdo, "shop_shipping_methods")) {
      echo json_encode(defaultShippingMethods());
      exit;
    }
    $stmt = $pdo->query(
      "SELECT id, label_nl, label_en, price_cents, active FROM shop_shipping_methods ORDER BY price_cents ASC, id ASC",
    );
    $rows = $stmt->fetchAll();
    $methods = array_map(function ($row) {
      return [
        "id" => $row["id"],
        "labelNl" => $row["label_nl"],
        "labelEn" => $row["label_en"],
        "priceEur" => round(((int)$row["price_cents"]) / 100, 2),
        "active" => (bool)$row["active"],
      ];
    }, $rows);
    echo json_encode($methods);
    exit;
  } catch (Throwable $error) {
    logError("crm_shipping_methods", ["message" => $error->getMessage()]);
    echo json_encode(defaultShippingMethods());
    exit;
  }
}

if ($type === "products") {
  try {
    $pdo = getPdo();
    if (!tableExists($pdo, "shop_products")) {
      echo json_encode([]);
      exit;
    }
    $deletedClause = shopProductsHasDeletedColumn($pdo) ? " WHERE is_deleted = 0" : "";
    $stmt = $pdo->query(
      "SELECT slug, name_nl, name_en, price_cents, is_live FROM shop_products{$deletedClause} ORDER BY sort_order ASC, id ASC",
    );
    $rows = $stmt->fetchAll();
    $products = array_map(function ($row) {
      return [
        "slug" => $row["slug"],
        "nameNl" => $row["name_nl"],
        "nameEn" => $row["name_en"],
        "priceEur" => round(((int)$row["price_cents"]) / 100, 2),
        "isLive" => (bool)$row["is_live"],
      ];
    }, $rows);
    echo json_encode($products);
    exit;
  } catch (Throwable $error) {
    logError("crm_products", ["message" => $error->getMessage()]);
    echo json_encode([]);
    exit;
  }
}

if ($type === "orders") {
  try {
    $pdo = getPdo();
    if (!tableExists($pdo, "shop_orders") || !tableExists($pdo, "shop_cart_lines")) {
      echo json_encode([]);
      exit;
    }
    $hasLocale = columnExists($pdo, "shop_orders", "locale");
    $hasShipping = columnExists($pdo, "shop_orders", "shipping_method_id");
    $hasTotal = columnExists($pdo, "shop_orders", "total_cents");
    $hasMollie = columnExists($pdo, "shop_orders", "mollie_payment_id");
    $hasCreated = columnExists($pdo, "shop_orders", "created_at");

    $selectParts = [
      "id",
      "cart_id",
      "order_code",
      "status",
      "email",
      $hasLocale ? "locale" : "'nl' AS locale",
      $hasShipping ? "shipping_method_id" : "NULL AS shipping_method_id",
      $hasTotal ? "total_cents" : "0 AS total_cents",
      $hasMollie ? "mollie_payment_id" : "NULL AS mollie_payment_id",
      $hasCreated ? "created_at" : "NULL AS created_at",
    ];
    $orderBy = $hasCreated ? "created_at DESC" : "id DESC";

    $stmt = $pdo->query(
      "SELECT " . implode(", ", $selectParts) . " FROM shop_orders ORDER BY {$orderBy} LIMIT 200",
    );
    $orders = [];
    while ($row = $stmt->fetch()) {
      $cartIdStmt = $pdo->prepare(
        "SELECT l.product_slug, l.quantity, l.total_cents, p.name_nl, p.name_en
         FROM shop_cart_lines l
         LEFT JOIN shop_products p ON p.slug = l.product_slug
         WHERE l.cart_id = :cart_id
         ORDER BY l.created_at ASC",
      );
      $cartIdStmt->execute(["cart_id" => $row["cart_id"]]);
      $lines = $cartIdStmt->fetchAll();
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
      $metaEntry = [];
      if (isset($orderMeta[$row["id"]]) && is_array($orderMeta[$row["id"]])) {
        $metaEntry = $orderMeta[$row["id"]];
      }

      $orders[] = [
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

    if ($download) {
      $rows = array_map(function ($item) {
        return [
          $item["orderCode"] ?? "",
          $item["status"] ?? "",
          $item["email"] ?? "",
          $item["totalEur"] ?? "",
          $item["createdAt"] ?? "",
          $item["itemsSummary"] ?? "",
        ];
      }, $orders);
      writeCsv(["order_code", "status", "email", "total_eur", "created_at", "items"], $rows);
    }

    echo json_encode($orders);
    exit;
  } catch (Throwable $error) {
    logError("crm_orders", ["message" => $error->getMessage()]);
    http_response_code(500);
    echo json_encode(["error" => "Cannot load orders"]);
    exit;
  }
}

if ($type === "logs") {
  $file = crmDataPath("contact-log.json");
  echo json_encode(crmReadJsonFile($file));
  exit;
}

http_response_code(400);
echo json_encode(["error" => "Unknown type"]);
