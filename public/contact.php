<?php
// public/contact.php
// Beperkte mail relay voor static hosting (Vimexx). Zorg dat max upload sizes in php.ini ok zijn.

header("Content-Type: application/json; charset=utf-8");
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "Method not allowed"]);
  exit;
}

// Honeypot
if (!empty($_POST["hp"])) {
  echo json_encode(["ok" => true]); exit;
}

function sanitize_filename($name) {
  return preg_replace('/[^a-zA-Z0-9.\-_]/', '_', $name ?? 'upload');
}

$allowed_ext = [".stl",".step",".stp",".igs",".iges"];
$max_files = 6;
$max_total_mb = 30;

$name = $_POST["name"] ?? "";
$email = $_POST["email"] ?? "";
$message = $_POST["message"] ?? "";
$type = $_POST["type"] ?? "private";
$company = $_POST["company"] ?? "";
$vat = $_POST["vat"] ?? "";
$address = $_POST["address"] ?? "";
$quantity = $_POST["quantity"] ?? "";
$material = $_POST["material"] ?? "";

if (!$name || !$email || !$message) {
  http_response_code(400);
  echo json_encode(["ok"=>false,"error"=>"Naam, e-mail en bericht zijn verplicht."]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok"=>false,"error"=>"Ongeldig e-mailadres."]);
  exit;
}

if (!empty($_FILES["files"])) {
  if (count($_FILES["files"]["name"]) > $max_files) {
    http_response_code(400);
    echo json_encode(["ok"=>false,"error"=>"Max $max_files bestanden toegestaan."]);
    exit;
  }
  $total_bytes = 0;
  for ($i=0; $i<count($_FILES["files"]["name"]); $i++) {
    $n = sanitize_filename($_FILES["files"]["name"][$i]);
    $ok = false;
    foreach ($allowed_ext as $ext) {
      if (str_ends_with(strtolower($n), $ext)) { $ok = true; break; }
    }
    if (!$ok) {
      http_response_code(400);
      echo json_encode(["ok"=>false,"error"=>"Ongeldig bestandstype voor $n."]);
      exit;
    }
    $total_bytes += filesize($_FILES["files"]["tmp_name"][$i]);
  }
  if ($total_bytes > $max_total_mb * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(["ok"=>false,"error"=>"Totaal te groot (limiet $max_total_mb MB)."]);
    exit;
  }
}

$to = "info@x3dprints.be";
$subject = "[Contact] ".($type === "business" ? "Bedrijf" : "Particulier")." — ".$name;

// Bouw multipart mail met attachments
$boundary = md5(uniqid(time(), true));
$headers = "From: X3DPrints <no-reply@x3dprints.be>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$body  = "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=\"UTF-8\"\r\n\r\n";
$body .= "<h2>Nieuwe contactaanvraag</h2>";
$body .= "<ul>";
$body .= "<li><strong>Naam:</strong> ".htmlspecialchars($name)."</li>";
$body .= "<li><strong>E-mail:</strong> ".htmlspecialchars($email)."</li>";
$body .= "<li><strong>Type:</strong> ".htmlspecialchars($type)."</li>";
if ($company) $body .= "<li><strong>Bedrijf:</strong> ".htmlspecialchars($company)."</li>";
if ($vat) $body .= "<li><strong>BTW:</strong> ".htmlspecialchars($vat)."</li>";
if ($address) $body .= "<li><strong>Adres:</strong> ".htmlspecialchars($address)."</li>";
if ($quantity) $body .= "<li><strong>Aantal:</strong> ".htmlspecialchars($quantity)."</li>";
if ($material) $body .= "<li><strong>Materiaal:</strong> ".htmlspecialchars($material)."</li>";
$body .= "</ul>";
$body .= "<p><strong>Bericht:</strong></p>";
$body .= "<pre style=\"white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace\">".htmlspecialchars($message)."</pre>";

if (!empty($_FILES["files"])) {
  for ($i=0; $i<count($_FILES["files"]["name"]); $i++) {
    $tmp = $_FILES["files"]["tmp_name"][$i];
    $filename = sanitize_filename($_FILES["files"]["name"][$i]);
    $data = chunk_split(base64_encode(file_get_contents($tmp)));
    $ctype = $_FILES["files"]["type"][$i] ?: "application/octet-stream";
    $body .= "\r\n--$boundary\r\n";
    $body .= "Content-Type: $ctype; name=\"$filename\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
    $body .= $data . "\r\n";
  }
}
$body .= "--$boundary--";

$ok = mail($to, "=?UTF-8?B?".base64_encode($subject)."?=", $body, $headers);
if ($ok) {
  echo json_encode(["ok"=>true]);
} else {
  http_response_code(500);
  echo json_encode(["ok"=>false,"error"=>"Mail verzenden mislukt (server)."]);
}
