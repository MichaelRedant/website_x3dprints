// app/api/contact/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const maxDuration = 30

const MAX_NAME = 80
const MAX_MESSAGE = 3000

type ContactType = "private" | "business"
type Material = "PLA" | "PETG" | "TPU" | "PLA Plus" | "ABS/ASA" | "Nylon" | "PA-CF" | ""

function clamp(s: string, max: number) { return s.length > max ? s.slice(0, max) : s }
function isEmail(s: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) }
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function getEnv() {
  const {
    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
    MAIL_TO, MAIL_FROM,
    DKIM_DOMAIN, DKIM_SELECTOR, DKIM_PRIVATE_KEY,
  } = process.env

  if (!SMTP_HOST || !SMTP_PORT) throw new Error("SMTP_HOST en/of SMTP_PORT ontbreken in .env")
  if (!MAIL_TO) throw new Error("MAIL_TO ontbreekt in .env")
  if (!MAIL_FROM) throw new Error("MAIL_FROM ontbreekt in .env")

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: MAIL_TO,
    from: MAIL_FROM,
    dkim: DKIM_DOMAIN && DKIM_SELECTOR && DKIM_PRIVATE_KEY ? {
      domainName: DKIM_DOMAIN,
      keySelector: DKIM_SELECTOR,
      privateKey: DKIM_PRIVATE_KEY,
    } : undefined,
  }
}

function errorMessage(e: unknown): string {
  if (typeof e === "string") return e
  if (e instanceof Error) return e.message
  return "Onbekende fout"
}

function isDevSmtpSoftFail(msgRaw: string) {
  if (process.env.NODE_ENV === "production") return false
  return /ECONNREFUSED|ENOTFOUND|EAI_AGAIN|ETIMEDOUT|ECONNRESET|SMTP_|MAIL_|DKIM_|HOST|PORT/i.test(msgRaw)
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    // honeypot
    const hp = String(form.get("hp") || "")
    if (hp) return NextResponse.json({ ok: true })

    // payload
    const type = (String(form.get("type") || "private") as ContactType)
    const material = (String(form.get("material") || "") as Material)

    const payload = {
      name: clamp(String(form.get("name") || "").trim(), MAX_NAME),
      email: String(form.get("email") || "").trim(),
      message: clamp(String(form.get("message") || "").trim(), MAX_MESSAGE),
      type: type === "business" ? "business" : "private",
      company: clamp(String(form.get("company") || "").trim(), 120),
      vat: clamp(String(form.get("vat") || "").trim(), 40),
      address: clamp(String(form.get("address") || "").trim(), 200),
      quantity: clamp(String(form.get("quantity") || "").trim(), 20),
      material,
    }

    // Basis validatie
    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { ok: false, error: "Naam, e-mail en bericht zijn verplicht." },
        { status: 400 },
      )
    }
    if (!isEmail(payload.email)) {
      return NextResponse.json(
        { ok: false, error: "Ongeldig e-mailadres." },
        { status: 400 },
      )
    }

    // === SMTP Transport (geen attachments meer) ===
    const env = getEnv()
    const transporter = nodemailer.createTransport({
      host: env.host,
      port: env.port,
      secure: env.port === 465,
      auth: env.user && env.pass ? { user: env.user, pass: env.pass } : undefined,
      pool: true,
      maxConnections: 3,
      connectionTimeout: 15_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      dkim: env.dkim,
    })

    try { await transporter.verify() } catch { /* sommige servers weigeren verify() */ }

    const subject = `[Contact] ${payload.type === "business" ? "Bedrijf" : "Particulier"} - ${payload.name}`
    const text = `
Naam: ${payload.name}
E-mail: ${payload.email}
Type: ${payload.type}
Bedrijf: ${payload.company}
BTW: ${payload.vat}
Adres: ${payload.address}
Aantal: ${payload.quantity}
Materiaal: ${payload.material}

Bericht:
${payload.message}
`.trim()

    const html = `
<h2>Nieuwe contactaanvraag</h2>
<ul>
  <li><strong>Naam:</strong> ${escapeHtml(payload.name)}</li>
  <li><strong>E-mail:</strong> ${escapeHtml(payload.email)}</li>
  <li><strong>Type:</strong> ${escapeHtml(payload.type)}</li>
  ${payload.company ? `<li><strong>Bedrijf:</strong> ${escapeHtml(payload.company)}</li>` : ""}
  ${payload.vat ? `<li><strong>BTW:</strong> ${escapeHtml(payload.vat)}</li>` : ""}
  ${payload.address ? `<li><strong>Adres:</strong> ${escapeHtml(payload.address)}</li>` : ""}
  ${payload.quantity ? `<li><strong>Aantal:</strong> ${escapeHtml(payload.quantity)}</li>` : ""}
  ${payload.material ? `<li><strong>Materiaal:</strong> ${escapeHtml(payload.material)}</li>` : ""}
</ul>
<p><strong>Bericht:</strong></p>
<pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace">${escapeHtml(payload.message)}</pre>
`.trim()

    const info = await transporter.sendMail({
      to: env.to,
      from: env.from,
      replyTo: payload.email,
      subject,
      text,
      html,
    })

     console.log("[/api/contact] mail sent:", info.messageId)
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msgRaw = errorMessage(e)
    console.error("[/api/contact] error:", msgRaw)

    if (isDevSmtpSoftFail(msgRaw)) {
      console.warn("[/api/contact] dev SMTP soft-fail: returning ok without mail delivery")
      return NextResponse.json({
        ok: true,
        devMode: true,
        warning: "SMTP lokaal niet beschikbaar; mail is niet verzonden.",
      })
    }

    const userSafe =
      /SMTP_|SMTP|MAIL_|DKIM_|\.env|HOST|PORT/i.test(msgRaw)
        ? "Serverconfiguratie onvolledig. Contacteer beheerder."
        : "Er ging iets mis. Probeer later opnieuw."

    return NextResponse.json({ ok: false, error: userSafe }, { status: 500 })
  }
}
