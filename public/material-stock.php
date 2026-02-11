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

$payload = readJsonBody();
$key = (string)($payload["key"] ?? "");
$label = (string)($payload["label"] ?? "");
$reset = !empty($payload["reset"]);
$inStock = isset($payload["inStock"]) ? (bool)$payload["inStock"] : null;

if ($key === "" || $label === "") {
  http_response_code(400);
  echo json_encode(["error" => "Missing payload"]);
  exit;
}

$file = crmDataPath("material-stock.json");
$data = crmReadJsonFile($file);

if ($reset) {
  if (isset($data[$key][$label])) {
    unset($data[$key][$label]);
    if (empty($data[$key])) {
      unset($data[$key]);
    }
  }
} else {
  if (!isset($data[$key]) || !is_array($data[$key])) {
    $data[$key] = [];
  }
  $data[$key][$label] = $inStock === null ? true : $inStock;
}

crmWriteJsonFile($file, $data);
echo json_encode(["ok" => true]);
