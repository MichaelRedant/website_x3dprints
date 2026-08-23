import { promises as fs } from "node:fs"
import path from "node:path"

const outputPath = path.join(process.cwd(), "out", "contact-config.php")
const leadCaptureUrl = (process.env.ESPO_LEAD_CAPTURE_URL || "").trim()
const apiKey = (process.env.ESPO_API_KEY || "").trim()
const webhookId = (process.env.ESPO_EMAIL_WEBHOOK_ID || "").trim()
const webhookSecret = (process.env.ESPO_EMAIL_WEBHOOK_SECRET || "").trim()

if (!leadCaptureUrl && !apiKey && !webhookId && !webhookSecret) {
  console.warn("[contact-config] EspoCRM-configuratie ontbreekt; CRM-koppelingen blijven uitgeschakeld.")
  process.exit(0)
}

if (leadCaptureUrl) {
  const parsed = new URL(leadCaptureUrl)
  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== "crm.x3dprints.be" ||
    !parsed.pathname.startsWith("/api/v1/LeadCapture/")
  ) {
    throw new Error("ESPO_LEAD_CAPTURE_URL is geen geldige HTTPS Lead Capture URL.")
  }
}

const mailConfigValues = [apiKey, webhookId, webhookSecret]
const configuredMailValues = mailConfigValues.filter(Boolean).length
if (configuredMailValues !== 0 && configuredMailValues !== mailConfigValues.length) {
  throw new Error("De EspoCRM mailautomatisering is slechts gedeeltelijk geconfigureerd.")
}

if (apiKey && !/^[a-zA-Z0-9_-]{24,128}$/.test(apiKey)) {
  throw new Error("ESPO_API_KEY heeft een ongeldig formaat.")
}

if (webhookId && !/^[a-zA-Z0-9_-]{10,64}$/.test(webhookId)) {
  throw new Error("ESPO_EMAIL_WEBHOOK_ID heeft een ongeldig formaat.")
}

if (webhookSecret && webhookSecret.length < 24) {
  throw new Error("ESPO_EMAIL_WEBHOOK_SECRET is te kort.")
}

function phpEscape(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("'", "\\'")
}

const php = `<?php
declare(strict_types=1);

if (basename(__FILE__) === basename((string) ($_SERVER['SCRIPT_FILENAME'] ?? ''))) {
    http_response_code(404);
    exit;
}

return [
    'espoLeadCaptureUrl' => '${phpEscape(leadCaptureUrl)}',
    'espoApiBaseUrl' => 'https://crm.x3dprints.be/api/v1',
    'espoApiKey' => '${phpEscape(apiKey)}',
    'espoEmailWebhookId' => '${phpEscape(webhookId)}',
    'espoEmailWebhookSecret' => '${phpEscape(webhookSecret)}',
];
`

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, php, { encoding: "utf8", mode: 0o600 })
console.log("[contact-config] EspoCRM-koppelingen zijn geconfigureerd.")
