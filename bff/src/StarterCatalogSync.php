<?php
declare(strict_types=1);

function loadStarterCatalog(): array
{
  $path = BFF_ROOT . "/catalog/starter-catalog.php";
  if (!file_exists($path)) {
    throw new RuntimeException("Starter catalog not found");
  }

  $catalog = require $path;
  if (!is_array($catalog)) {
    throw new RuntimeException("Starter catalog is invalid");
  }

  return $catalog;
}

function normalizeStarterCatalogProduct(array $product): array
{
  $slug = strtolower(trim((string)($product["slug"] ?? "")));
  if ($slug === "" || !preg_match("/^[a-z0-9-]{2,120}$/", $slug)) {
    throw new RuntimeException("Starter catalog contains an invalid slug");
  }

  $priceCents = (int)($product["priceCents"] ?? 0);
  if ($priceCents < 0) {
    throw new RuntimeException("Starter catalog contains an invalid price");
  }

  $stockCount = array_key_exists("stockCount", $product) && $product["stockCount"] !== null
    ? max(0, (int)$product["stockCount"])
    : null;

  $purchaseMode = ($product["purchaseMode"] ?? "cart") === "inquiry" ? "inquiry" : "cart";
  $availability = $product["availability"] ?? null;
  $availability = in_array($availability, ["InStock", "PreOrder", "OutOfStock", "LimitedAvailability"], true)
    ? $availability
    : null;

  return [
    "slug" => $slug,
    "nameNl" => trim((string)($product["nameNl"] ?? "")),
    "nameEn" => trim((string)($product["nameEn"] ?? "")),
    "summaryNl" => trim((string)($product["summaryNl"] ?? "")),
    "summaryEn" => trim((string)($product["summaryEn"] ?? "")),
    "tags" => trim((string)($product["tags"] ?? "")),
    "priceCents" => $priceCents,
    "availability" => $availability,
    "stockCount" => $stockCount,
    "purchaseMode" => $purchaseMode,
    "imageUrl" => trim((string)($product["imageUrl"] ?? "")),
    "imageAltNl" => trim((string)($product["imageAltNl"] ?? "")),
    "imageAltEn" => trim((string)($product["imageAltEn"] ?? "")),
    "leadTimeMin" => array_key_exists("leadTimeMin", $product) && $product["leadTimeMin"] !== null ? (int)$product["leadTimeMin"] : null,
    "leadTimeMax" => array_key_exists("leadTimeMax", $product) && $product["leadTimeMax"] !== null ? (int)$product["leadTimeMax"] : null,
    "isLive" => !empty($product["isLive"]),
    "sortOrder" => array_key_exists("sortOrder", $product) ? (int)$product["sortOrder"] : 0,
  ];
}

function syncStarterCatalog(PDO $pdo): array
{
  $hasDeleted = shopProductsHasDeletedColumn($pdo);
  $hasTags = shopProductsHasTagsColumn($pdo);
  $hasStockCount = shopProductsHasStockCountColumn($pdo);
  $hasPurchaseMode = shopProductsHasPurchaseModeColumn($pdo);

  $created = 0;
  $updated = 0;

  foreach (loadStarterCatalog() as $rawProduct) {
    $product = normalizeStarterCatalogProduct($rawProduct);

    $select = "SELECT slug, is_live, sort_order";
    if ($hasStockCount) {
      $select .= ", stock_count";
    }
    if ($hasPurchaseMode) {
      $select .= ", purchase_mode";
    }
    $stmt = $pdo->prepare($select . " FROM shop_products WHERE slug = :slug LIMIT 1");
    $stmt->execute(["slug" => $product["slug"]]);
    $existing = $stmt->fetch() ?: null;

    if ($existing) {
      $fields = [
        "name_nl = :name_nl",
        "name_en = :name_en",
        "summary_nl = :summary_nl",
        "summary_en = :summary_en",
        "price_cents = :price_cents",
        "availability = :availability",
        "image_url = :image_url",
        "image_alt_nl = :image_alt_nl",
        "image_alt_en = :image_alt_en",
        "lead_time_min = :lead_time_min",
        "lead_time_max = :lead_time_max",
      ];
      if ($hasTags) {
        $fields[] = "tags = :tags";
      }
      if ($hasStockCount) {
        $fields[] = "stock_count = :stock_count";
      }
      if ($hasPurchaseMode) {
        $fields[] = "purchase_mode = :purchase_mode";
      }
      $fields[] = "is_live = :is_live";
      $fields[] = "sort_order = :sort_order";

      $resolvedStockCount = $hasStockCount
        ? (($existing["stock_count"] ?? null) !== null ? (int)$existing["stock_count"] : $product["stockCount"])
        : null;
      $resolvedPurchaseMode = $hasPurchaseMode
        ? (!empty($existing["purchase_mode"]) ? (string)$existing["purchase_mode"] : $product["purchaseMode"])
        : null;

      $update = $pdo->prepare(
        "UPDATE shop_products SET " . implode(", ", $fields) . " WHERE slug = :slug",
      );
      $params = [
        "slug" => $product["slug"],
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
        "stock_count" => $resolvedStockCount,
        "purchase_mode" => $resolvedPurchaseMode,
        "is_live" => !empty($existing["is_live"]) ? 1 : 0,
        "sort_order" => isset($existing["sort_order"]) ? (int)$existing["sort_order"] : $product["sortOrder"],
      ];
      if (!$hasTags) {
        unset($params["tags"]);
      }
      if (!$hasStockCount) {
        unset($params["stock_count"]);
      }
      if (!$hasPurchaseMode) {
        unset($params["purchase_mode"]);
      }

      $update->execute($params);
      $updated += 1;
      continue;
    }

    $columns = [
      "slug",
      "name_nl",
      "name_en",
      "summary_nl",
      "summary_en",
      "price_cents",
      "availability",
      "image_url",
      "image_alt_nl",
      "image_alt_en",
      "lead_time_min",
      "lead_time_max",
      "is_live",
      "sort_order",
    ];
    $values = [
      ":slug",
      ":name_nl",
      ":name_en",
      ":summary_nl",
      ":summary_en",
      ":price_cents",
      ":availability",
      ":image_url",
      ":image_alt_nl",
      ":image_alt_en",
      ":lead_time_min",
      ":lead_time_max",
      ":is_live",
      ":sort_order",
    ];
    if ($hasDeleted) {
      $columns[] = "is_deleted";
      $values[] = ":is_deleted";
    }
    if ($hasTags) {
      $columns[] = "tags";
      $values[] = ":tags";
    }
    if ($hasStockCount) {
      $columns[] = "stock_count";
      $values[] = ":stock_count";
    }
    if ($hasPurchaseMode) {
      $columns[] = "purchase_mode";
      $values[] = ":purchase_mode";
    }

    $insert = $pdo->prepare(
      "INSERT INTO shop_products (" . implode(", ", $columns) . ") VALUES (" . implode(", ", $values) . ")",
    );
    $params = [
      "slug" => $product["slug"],
      "name_nl" => $product["nameNl"],
      "name_en" => $product["nameEn"],
      "summary_nl" => $product["summaryNl"],
      "summary_en" => $product["summaryEn"],
      "price_cents" => $product["priceCents"],
      "availability" => $product["availability"],
      "image_url" => $product["imageUrl"],
      "image_alt_nl" => $product["imageAltNl"],
      "image_alt_en" => $product["imageAltEn"],
      "lead_time_min" => $product["leadTimeMin"],
      "lead_time_max" => $product["leadTimeMax"],
      "is_live" => $product["isLive"] ? 1 : 0,
      "sort_order" => $product["sortOrder"],
      "is_deleted" => 0,
      "tags" => $product["tags"],
      "stock_count" => $product["stockCount"],
      "purchase_mode" => $product["purchaseMode"],
    ];
    if (!$hasDeleted) {
      unset($params["is_deleted"]);
    }
    if (!$hasTags) {
      unset($params["tags"]);
    }
    if (!$hasStockCount) {
      unset($params["stock_count"]);
    }
    if (!$hasPurchaseMode) {
      unset($params["purchase_mode"]);
    }

    $insert->execute($params);
    $created += 1;
  }

  return [
    "ok" => true,
    "created" => $created,
    "updated" => $updated,
    "total" => $created + $updated,
  ];
}
