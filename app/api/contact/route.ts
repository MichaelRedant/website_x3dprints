// app/api/contact/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

/** Nodemailer vereist Node runtime. */
export const runtime = "nodejs"

/** ===== Config & constraints ===== */
const ALLOWED_EXT = [".stl", ".step", ".stp", ".igs", ".iges"] as const
const ALLOWED_MIME = [
  "application/octet-stream", // veel CAD uploads komen zo binnen
  "model/stl",
  "application/iges",
  "application/step",
]
const MAX_FILES = 6
const MAX_TOTAL_MB = 30
const MAX_NAME = 80
const MAX_MESSAGE = 3000

type ContactType = "private" | "business"
type Material = "PLA" | "PETG" | "TPU" | "PLA Plus" | "ABS/ASA" | "Nylon" | "PA-CF" | ""

/** ===== Helpers ===== */
function extOk(name: string) {
  const n = name.toLowerCase()
  return ALLOWED_EXT.some((e) => n.endsWith(e))
}
function sanitize(name: string) {
  // alleen veilige chars in bestandsnaam
  return name.replace(/[^a-z0-9.\-_]/gi, "_")
}
function clamp(s: string, max: number) {
  return s.length > max ? s.slice(0, max) : s
}
function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)
}
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/** ===== Main handler ===== */
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
      material: material,
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

    // Files -> attachments (Buffer, geen disk I/O)
    const picked = form.getAll("files") as File[]
    if (picked.length > MAX_FILES) {
      return NextResponse.json(
        { ok: false, error: `Max ${MAX_FILES} bestanden toegestaan.` },
        { status: 400 },
      )
    }

    let totalBytes = 0
    const attachments: { filename: string; content: Buffer; contentType?: string }[] = []

    for (const f of picked) {
      const safeName = sanitize(f.name || "upload").slice(0, 120)
      if (!extOk(safeName)) {
        return NextResponse.json(
          {
            ok: false,
            error: `Ongeldig bestandstype voor ${safeName}. Toegestaan: ${ALLOWED_EXT.join(", ")}`,
          },
          { status: 400 },
        )
      }

      const ab = await f.arrayBuffer()
      const buf = Buffer.from(ab)
      totalBytes += buf.length

      // MIME hint check (niet doorslaggevend, maar nuttig)
      const typeOk = !f.type || ALLOWED_MIME.includes(f.type)
      if (!typeOk) {
        return NextResponse.json(
          { ok: false, error: `Bestandstype niet toegestaan: ${f.type || "onbekend"}` },
          { status: 400 },
        )
      }

      attachments.push({
        filename: safeName,
        content: buf,
        contentType: f.type || "application/octet-stream",
      })
    }

    const totalMB = totalBytes / (1024 * 1024)
    if (totalMB > MAX_TOTAL_MB) {
      return NextResponse.json(
        { ok: false, error: `Totaal te groot: ${totalMB.toFixed(1)} MB (limiet: ${MAX_TOTAL_MB} MB).` },
        { status: 400 },
      )
    }

    /** ===== Nodemailer transport =====
     * Zet env vars in productie:
     * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM
     * (Optioneel) DKIM_DOMAIN, DKIM_SELECTOR, DKIM_PRIVATE_KEY
     */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
      pool: true,
      maxConnections: 3,
      connectionTimeout: 15_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      // DKIM (optioneel)
      dkim:
        process.env.DKIM_DOMAIN &&
        process.env.DKIM_SELECTOR &&
        process.env.DKIM_PRIVATE_KEY
          ? {
              domainName: process.env.DKIM_DOMAIN,
              keySelector: process.env.DKIM_SELECTOR,
              privateKey: process.env.DKIM_PRIVATE_KEY,
            }
          : undefined,
    })

    // optioneel: verify connectie (kan je ook overslaan voor snelheid)
    try {
      await transporter.verify()
    } catch {
      // niet hard falen: sommige SMTP servers weigeren verify()
    }

    const to = process.env.MAIL_TO || "info@x3dprints.be"
    const from = process.env.MAIL_FROM || `X3DPrints <no-reply@x3dprints.be>`
    const subject = `[Contact] ${payload.type === "business" ? "Bedrijf" : "Particulier"} — ${payload.name}`

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

Bijlagen: ${attachments.length}
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
  <li><strong>Bijlagen:</strong> ${attachments.length}</li>
</ul>
<p><strong>Bericht:</strong></p>
<pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace">${escapeHtml(payload.message)}</pre>
`.trim()

    await transporter.sendMail({
      to,
      from,
      replyTo: payload.email,
      subject,
      text,
      html,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[/api/contact] error:", err)
    return NextResponse.json({ ok: false, error: "Er ging iets mis. Probeer later opnieuw." }, { status: 500 })
  }
}
