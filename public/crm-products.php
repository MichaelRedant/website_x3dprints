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

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

function sanitizeText($value): string
{
  return trim((string)$value);
}

function normalizeAvailability(?string $value): ?string
{
  if (!$value) return null;
  $allowed = ["InStock", "PreOrder", "OutOfStock", "LimitedAvailability"];
  return in_array($value, $allowed, true) ? $value : null;
}

function parseOptionalInt($value): ?int
{
  if ($value === null || $value === "") return null;
  if (!is_numeric($value)) return null;
  return (int)$value;
}

function parsePriceEur($value): ?int
{
  if ($value === null || $value === "") return null;
  if (!is_numeric($value)) return null;
  $amount = (float)$value;
  if ($amount < 0) return null;
  return (int)round($amount * 100);
}

function normalizeTags($value): string
{
  if (!is_string($value)) {
    return "";
  }
  $parts = array_filter(array_map("trim", explode(",", $value)));
  if (!$parts) {
    return "";
  }
  $parts = array_map(fn($tag) => strtolower($tag), $parts);
  $parts = array_values(array_unique($parts));
  return implode(", ", $parts);
}

if ($method === "GET") {
  try {
    $pdo = getPdo();
    $hasDeleted = shopProductsHasDeletedColumn($pdo);
    $hasTags = shopProductsHasTagsColumn($pdo);
    $stmt = $pdo->query(
      "SELECT slug, name_nl, name_en, summary_nl, summary_en, price_cents, availability, image_url, image_alt_nl, image_alt_en,
              lead_time_min, lead_time_max, is_live, sort_order" . ($hasDeleted ? ", is_deleted" : "") . ($hasTags ? ", tags" : "") . "
       FROM shop_products ORDER BY sort_order ASC, id ASC",
    );
    $rows = $stmt->fetchAll();
    $products = array_map(function ($row) {
      return [
        "slug" => $row["slug"],
        "nameNl" => $row["name_nl"],
        "nameEn" => $row["name_en"],
        "summaryNl" => $row["summary_nl"],
        "summaryEn" => $row["summary_en"],
        "priceEur" => round(((int)$row["price_cents"]) / 100, 2),
        "availability" => $row["availability"] ?: null,
        "imageUrl" => $row["image_url"],
        "imageAltNl" => $row["image_alt_nl"],
        "imageAltEn" => $row["image_alt_en"],
        "leadTimeMin" => $row["lead_time_min"] !== null ? (int)$row["lead_time_min"] : null,
        "leadTimeMax" => $row["lead_time_max"] !== null ? (int)$row["lead_time_max"] : null,
        "isLive" => (bool)$row["is_live"],
        "sortOrder" => (int)$row["sort_order"],
        "isDeleted" => array_key_exists("is_deleted", $row) ? (bool)$row["is_deleted"] : false,
        "tags" => array_key_exists("tags", $row) ? (string)$row["tags"] : "",
      ];
    }, $rows);
    jsonResponse($products);
  } catch (Throwable $error) {
    logError("crm_products_list", ["message" => $error->getMessage()]);
    errorResponse("Cannot load products", 500);
  }
}

if ($method !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

$payload = readJsonBody();
$action = sanitizeText($payload["action"] ?? "");

if ($action === "") {
  errorResponse("Missing action", 400);
}

function readProductPayload(array $payload, bool $requireSlug = true): array
{
  $input = $payload["product"] ?? null;
  if (!is_array($input)) {
    errorResponse("Missing product payload", 400);
  }
  $slug = sanitizeText($input["slug"] ?? "");
  if ($requireSlug) {
    if ($slug === "" || !preg_match("/^[a-z0-9-]{2,120}$/", $slug)) {
      errorResponse("Invalid slug", 400);
    }
  }
  $nameNl = sanitizeText($input["nameNl"] ?? "");
  $nameEn = sanitizeText($input["nameEn"] ?? "");
  $summaryNl = sanitizeText($input["summaryNl"] ?? "");
  $summaryEn = sanitizeText($input["summaryEn"] ?? "");
  $imageUrl = sanitizeText($input["imageUrl"] ?? "");
  $imageAltNl = sanitizeText($input["imageAltNl"] ?? "");
  $imageAltEn = sanitizeText($input["imageAltEn"] ?? "");
  $priceCents = parsePriceEur($input["priceEur"] ?? null);
  $availability = normalizeAvailability($input["availability"] ?? null);
  $tags = normalizeTags($input["tags"] ?? "");
  $leadTimeMin = parseOptionalInt($input["leadTimeMin"] ?? null);
  $leadTimeMax = parseOptionalInt($input["leadTimeMax"] ?? null);
  $sortOrder = parseOptionalInt($input["sortOrder"] ?? null);
  $isLive = !empty($input["isLive"]);

  if ($nameNl === "" || $nameEn === "" || $summaryNl === "" || $summaryEn === "" || $imageUrl === "" || $imageAltNl === "" || $imageAltEn === "") {
    errorResponse("Missing required fields", 400);
  }
  if ($priceCents === null) {
    errorResponse("Invalid price", 400);
  }
  if ($leadTimeMin !== null && $leadTimeMin < 0) {
    errorResponse("Invalid lead time", 400);
  }
  if ($leadTimeMax !== null && $leadTimeMax < 0) {
    errorResponse("Invalid lead time", 400);
  }
  if ($leadTimeMin !== null && $leadTimeMax !== null && $leadTimeMin > $leadTimeMax) {
    errorResponse("Lead time range invalid", 400);
  }

  return [
    "slug" => $slug,
    "nameNl" => $nameNl,
    "nameEn" => $nameEn,
    "summaryNl" => $summaryNl,
    "summaryEn" => $summaryEn,
    "imageUrl" => $imageUrl,
    "imageAltNl" => $imageAltNl,
    "imageAltEn" => $imageAltEn,
    "priceCents" => $priceCents,
    "availability" => $availability,
    "tags" => $tags,
    "leadTimeMin" => $leadTimeMin,
    "leadTimeMax" => $leadTimeMax,
    "sortOrder" => $sortOrder ?? 0,
    "isLive" => $isLive,
  ];
}

try {
  $pdo = getPdo();
  $hasDeleted = shopProductsHasDeletedColumn($pdo);
  $hasTags = shopProductsHasTagsColumn($pdo);

  if ($action === "create") {
    $product = readProductPayload($payload, true);
    $slug = strtolower($product["slug"]);
    $stmt = $pdo->prepare("SELECT slug FROM shop_products WHERE slug = :slug LIMIT 1");
    $stmt->execute(["slug" => $slug]);
    if ($stmt->fetch()) {
      errorResponse("Slug already exists", 409);
    }
    $columns = "slug, name_nl, name_en, summary_nl, summary_en, price_cents, availability, image_url, image_alt_nl, image_alt_en,
        lead_time_min, lead_time_max, is_live, sort_order" . ($hasDeleted ? ", is_deleted" : "") . ($hasTags ? ", tags" : "");
    $values = ":slug, :name_nl, :name_en, :summary_nl, :summary_en, :price_cents, :availability, :image_url, :image_alt_nl, :image_alt_en,
        :lead_time_min, :lead_time_max, :is_live, :sort_order" . ($hasDeleted ? ", :is_deleted" : "") . ($hasTags ? ", :tags" : "");
    $stmt = $pdo->prepare("INSERT INTO shop_products ({$columns}) VALUES ({$values})");
    $params = [
      "slug" => $slug,
      "name_nl" => $product["nameNl"],
      "name_en" => $product["nameEn"],
      "summary_nl" => $product["summaryNl"],
      "summary_en" => $product["summaryEn"],
      "price_cents" => $product["priceCents"],
      "availability" => $product["availability"],
      "image_url" => $product["imageUrl"],
      "image_alt_nl" => $product["imageAltNl"],
      "image_alt_en" => $product["imageAltEn"],
      "tags" => $product["tags"],
      "lead_time_min" => $product["leadTimeMin"],
      "lead_time_max" => $product["leadTimeMax"],
      "is_live" => $product["isLive"] ? 1 : 0,
      "sort_order" => $product["sortOrder"],
    ];
    if ($hasDeleted) {
      $params["is_deleted"] = 0;
    }
    if (!$hasTags) {
      unset($params["tags"]);
    }
    $stmt->execute($params);
    jsonResponse(["ok" => true]);
  }

  if ($action === "update") {
    $product = readProductPayload($payload, true);
    $slug = strtolower($product["slug"]);
    $stmt = $pdo->prepare("SELECT slug FROM shop_products WHERE slug = :slug LIMIT 1");
    $stmt->execute(["slug" => $slug]);
    if (!$stmt->fetch()) {
      errorResponse("Product not found", 404);
    }
    $stmt = $pdo->prepare(
      "UPDATE shop_products SET
        name_nl = :name_nl,
        name_en = :name_en,
        summary_nl = :summary_nl,
        summary_en = :summary_en,
        price_cents = :price_cents,
        availability = :availability,
        image_url = :image_url,
        image_alt_nl = :image_alt_nl,
        image_alt_en = :image_alt_en,
        " . ($hasTags ? "tags = :tags," : "") . "
        lead_time_min = :lead_time_min,
        lead_time_max = :lead_time_max,
        is_live = :is_live,
        sort_order = :sort_order
       WHERE slug = :slug",
    );
    $params = [
      "slug" => $slug,
      "name_nl" => $product["nameNl"],
      "name_en" => $product["nameEn"],
      "summary_nl" => $product["summaryNl"],
      "summary_en" => $product["summaryEn"],
      "price_cents" => $product["priceCents"],
      "availability" => $product["availability"],
      "image_url" => $product["imageUrl"],
      "image_alt_nl" => $product["imageAltNl"],
      "image_alt_en" => $product["imageAltEn"],
      "tags" => $product["tags"],
      "lead_time_min" => $product["leadTimeMin"],
      "lead_time_max" => $product["leadTimeMax"],
      "is_live" => $product["isLive"] ? 1 : 0,
      "sort_order" => $product["sortOrder"],
    ];
    if (!$hasTags) {
      unset($params["tags"]);
    }
    $stmt->execute($params);
    jsonResponse(["ok" => true]);
  }

  if ($action === "visibility") {
    $slug = strtolower(sanitizeText($payload["slug"] ?? ""));
    if ($slug === "") {
      errorResponse("Missing slug", 400);
    }
    $isLive = !empty($payload["isLive"]);
    $clause = $hasDeleted ? " AND is_deleted = 0" : "";
    $stmt = $pdo->prepare("UPDATE shop_products SET is_live = :is_live WHERE slug = :slug{$clause}");
    $stmt->execute([
      "slug" => $slug,
      "is_live" => $isLive ? 1 : 0,
    ]);
    jsonResponse(["ok" => true]);
  }

  if ($action === "inline-update") {
    $slug = strtolower(sanitizeText($payload["slug"] ?? ""));
    if ($slug === "") {
      errorResponse("Missing slug", 400);
    }
    $priceCents = parsePriceEur($payload["priceEur"] ?? null);
    if ($priceCents === null) {
      errorResponse("Invalid price", 400);
    }
    $availability = normalizeAvailability($payload["availability"] ?? null);
    $clause = $hasDeleted ? " AND is_deleted = 0" : "";
    $exists = $pdo->prepare("SELECT slug FROM shop_products WHERE slug = :slug{$clause} LIMIT 1");
    $exists->execute(["slug" => $slug]);
    if (!$exists->fetch()) {
      errorResponse("Product not found", 404);
    }
    $stmt = $pdo->prepare(
      "UPDATE shop_products
       SET price_cents = :price_cents, availability = :availability
       WHERE slug = :slug{$clause}",
    );
    $stmt->execute([
      "slug" => $slug,
      "price_cents" => $priceCents,
      "availability" => $availability,
    ]);
    jsonResponse(["ok" => true]);
  }

  if ($action === "soft-delete") {
    if (!$hasDeleted) {
      errorResponse("Soft delete requires schema update", 400);
    }
    $slug = strtolower(sanitizeText($payload["slug"] ?? ""));
    if ($slug === "") {
      errorResponse("Missing slug", 400);
    }
    $stmt = $pdo->prepare("UPDATE shop_products SET is_deleted = 1, is_live = 0 WHERE slug = :slug");
    $stmt->execute(["slug" => $slug]);
    jsonResponse(["ok" => true]);
  }

  if ($action === "restore") {
    if (!$hasDeleted) {
      errorResponse("Restore requires schema update", 400);
    }
    $slug = strtolower(sanitizeText($payload["slug"] ?? ""));
    if ($slug === "") {
      errorResponse("Missing slug", 400);
    }
    $stmt = $pdo->prepare("UPDATE shop_products SET is_deleted = 0 WHERE slug = :slug");
    $stmt->execute(["slug" => $slug]);
    jsonResponse(["ok" => true]);
  }

  if ($action === "duplicate") {
    $sourceSlug = strtolower(sanitizeText($payload["sourceSlug"] ?? ""));
    $newSlug = strtolower(sanitizeText($payload["slug"] ?? ""));
    if ($sourceSlug === "" || $newSlug === "") {
      errorResponse("Missing slug", 400);
    }
    if (!preg_match("/^[a-z0-9-]{2,120}$/", $newSlug)) {
      errorResponse("Invalid slug", 400);
    }
    $stmt = $pdo->prepare("SELECT slug, name_nl, name_en, summary_nl, summary_en, price_cents, availability, image_url, image_alt_nl, image_alt_en,
      lead_time_min, lead_time_max, sort_order" . ($hasTags ? ", tags" : "") . " FROM shop_products WHERE slug = :slug LIMIT 1");
    $stmt->execute(["slug" => $sourceSlug]);
    $row = $stmt->fetch();
    if (!$row) {
      errorResponse("Source product not found", 404);
    }
    $check = $pdo->prepare("SELECT slug FROM shop_products WHERE slug = :slug LIMIT 1");
    $check->execute(["slug" => $newSlug]);
    if ($check->fetch()) {
      errorResponse("Slug already exists", 409);
    }
    $columns = "slug, name_nl, name_en, summary_nl, summary_en, price_cents, availability, image_url, image_alt_nl, image_alt_en,
      lead_time_min, lead_time_max, is_live, sort_order" . ($hasDeleted ? ", is_deleted" : "") . ($hasTags ? ", tags" : "");
    $values = ":slug, :name_nl, :name_en, :summary_nl, :summary_en, :price_cents, :availability, :image_url, :image_alt_nl, :image_alt_en,
      :lead_time_min, :lead_time_max, :is_live, :sort_order" . ($hasDeleted ? ", :is_deleted" : "") . ($hasTags ? ", :tags" : "");
    $stmt = $pdo->prepare("INSERT INTO shop_products ({$columns}) VALUES ({$values})");
    $params = [
      "slug" => $newSlug,
      "name_nl" => $row["name_nl"],
      "name_en" => $row["name_en"],
      "summary_nl" => $row["summary_nl"],
      "summary_en" => $row["summary_en"],
      "price_cents" => (int)$row["price_cents"],
      "availability" => $row["availability"],
      "image_url" => $row["image_url"],
      "image_alt_nl" => $row["image_alt_nl"],
      "image_alt_en" => $row["image_alt_en"],
      "lead_time_min" => $row["lead_time_min"],
      "lead_time_max" => $row["lead_time_max"],
      "tags" => $hasTags ? ($row["tags"] ?? "") : "",
      "is_live" => 0,
      "sort_order" => (int)$row["sort_order"] + 1,
    ];
    if ($hasDeleted) {
      $params["is_deleted"] = 0;
    }
    if (!$hasTags) {
      unset($params["tags"]);
    }
    $stmt->execute($params);
    jsonResponse(["ok" => true]);
  }

  if ($action === "delete") {
    $slug = strtolower(sanitizeText($payload["slug"] ?? ""));
    if ($slug === "") {
      errorResponse("Missing slug", 400);
    }
    $stmt = $pdo->prepare("DELETE FROM shop_products WHERE slug = :slug");
    $stmt->execute(["slug" => $slug]);
    jsonResponse(["ok" => true]);
  }

  errorResponse("Unknown action", 400);
} catch (Throwable $error) {
  logError("crm_products_write", ["message" => $error->getMessage(), "action" => $action]);
  errorResponse("Could not update products", 500);
}
