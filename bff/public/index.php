<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$bootstrap = $root . "/src/bootstrap.php";
$service = $root . "/src/ShopService.php";

if (!file_exists($bootstrap)) {
  $root = $root . "/bff";
  $bootstrap = $root . "/src/bootstrap.php";
  $service = $root . "/src/ShopService.php";
}

if (!file_exists($bootstrap)) {
  http_response_code(500);
  header("Content-Type: text/plain; charset=utf-8");
  echo "BFF bootstrap not found. Check deployment paths.";
  exit;
}

if (isset($_GET["debug"]) && $_GET["debug"] === "1") {
  ini_set("display_errors", "1");
  ini_set("display_startup_errors", "1");
  error_reporting(E_ALL);
}

require $bootstrap;
require $root . "/src/Mailer.php";
require $service;

applyCors();

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";
if ($method === "POST" && isset($_SERVER["HTTP_X_HTTP_METHOD_OVERRIDE"])) {
  $method = strtoupper($_SERVER["HTTP_X_HTTP_METHOD_OVERRIDE"]);
}

if ($method === "OPTIONS") {
  http_response_code(204);
  exit;
}

$path = parse_url($_SERVER["REQUEST_URI"] ?? "/", PHP_URL_PATH) ?? "/";
$path = rtrim($path, "/");
if ($path === "") {
  $path = "/";
}
$path = preg_replace("#^/index\\.php#","", $path);
if ($path === "") {
  $path = "/";
}
if (isset($_GET["path"]) && is_string($_GET["path"])) {
  $pathOverride = "/" . ltrim($_GET["path"], "/");
  $path = $pathOverride;
}

$locale = $_GET["locale"] ?? "nl";
$locale = $locale === "en" ? "en" : "nl";

$scheme = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http";
$host = $_SERVER["HTTP_HOST"] ?? "";
$bffBaseUrl = env("BFF_BASE_URL");
if (!$bffBaseUrl && $host) {
  $isLocalHost = strpos($host, "localhost") === 0 || strpos($host, "127.0.0.1") === 0;
  if (envBool("APP_DEBUG", false) && $isLocalHost) {
    $bffBaseUrl = $scheme . "://" . $host;
  } else {
    logError("bff_base_url_missing", ["host" => $host]);
    $bffBaseUrl = "";
  }
}

$siteUrl = env("SHOP_SITE_URL");
if ($siteUrl === null || $siteUrl === "" || strtolower($siteUrl) === "auto") {
  if ($host) {
    $lowerHost = strtolower($host);
    $isLocalHost = strpos($lowerHost, "localhost") === 0 || strpos($lowerHost, "127.0.0.1") === 0;
    if ($isLocalHost) {
      $siteUrl = $scheme . "://" . $host;
    } else {
      $isApiSubdomain = strpos($lowerHost, "api.") === 0;
      $isX3dprints = substr($lowerHost, -12) === "x3dprints.be";
      $siteUrl = ($isApiSubdomain && $isX3dprints) ? "https://x3dprints.be" : "https://x3dprints.be";
    }
  }
}
if (!$siteUrl) {
  $siteUrl = "https://x3dprints.be";
}

$service = new ShopService(getPdo(), [
  "siteUrl" => $siteUrl,
  "bffBaseUrl" => $bffBaseUrl,
  "mollieKey" => env("MOLLIE_API_KEY"),
  "debug" => envBool("APP_DEBUG", false),
]);

try {
  if ($method === "GET" && $path === "/health") {
    $debug = envBool("APP_DEBUG", false) || (isset($_GET["debug"]) && $_GET["debug"] === "1");
    jsonResponse($service->health($debug));
  }

  if ($method === "GET" && $path === "/shop/products") {
    jsonResponse(["products" => $service->listProducts($locale)]);
  }

  if ($method === "GET" && preg_match("#^/shop/products/([^/]+)$#", $path, $matches)) {
    $product = $service->getProduct($matches[1], $locale);
    if (!$product) {
      errorResponse("Product not found", 404);
    }
    jsonResponse(["product" => $product]);
  }

  if ($method === "POST" && $path === "/shop/cart") {
    jsonResponse($service->createCart($locale));
  }

  if ($method === "POST" && preg_match("#^/shop/cart/([^/]+)/lines$#", $path, $matches)) {
    $payload = readJsonBody();
    $slug = (string)($payload["productSlug"] ?? "");
    $quantity = (int)($payload["quantity"] ?? 1);
    if ($slug === "") {
      errorResponse("Missing productSlug", 400);
    }
    jsonResponse($service->addLine($matches[1], $slug, $quantity, $locale));
  }

  if ($method === "PATCH" && preg_match("#^/shop/cart/([^/]+)/lines/([^/]+)$#", $path, $matches)) {
    $payload = readJsonBody();
    $quantity = (int)($payload["quantity"] ?? 1);
    jsonResponse($service->updateLine($matches[1], $matches[2], $quantity, $locale));
  }

  if ($method === "DELETE" && preg_match("#^/shop/cart/([^/]+)/lines/([^/]+)$#", $path, $matches)) {
    jsonResponse($service->removeLine($matches[1], $matches[2], $locale));
  }

  if ($method === "POST" && $path === "/shop/checkout") {
    $payload = readJsonBody();
    $cartId = (string)($payload["cartId"] ?? "");
    $email = (string)($payload["email"] ?? "");
    $shippingMethodId = (string)($payload["shippingMethodId"] ?? "");
    if ($cartId === "" || $email === "" || $shippingMethodId === "") {
      errorResponse("Missing checkout data", 400);
    }
    jsonResponse($service->startCheckout($cartId, $email, $shippingMethodId, $locale));
  }

  if ($method === "POST" && $path === "/shop/webhooks/mollie") {
    $payload = readJsonBody();
    $paymentId = $payload["id"] ?? ($_POST["id"] ?? ($_GET["id"] ?? ""));
    if (!$paymentId) {
      errorResponse("Missing payment id", 400);
    }
    jsonResponse($service->handleMollieWebhook((string)$paymentId));
  }

  errorResponse("Not found", 404);
} catch (RuntimeException $error) {
  logError("runtime", [
    "message" => $error->getMessage(),
    "path" => $path,
    "method" => $method,
  ]);
  errorResponse($error->getMessage(), 400);
} catch (Throwable $error) {
  logError("fatal", [
    "message" => $error->getMessage(),
    "path" => $path,
    "method" => $method,
  ]);
  $detail = envBool("APP_DEBUG", false) ? $error->getMessage() : null;
  errorResponse("Server error", 500, $detail);
}
