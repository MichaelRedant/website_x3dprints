// app/api/contact/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

// Allowlist voor files
const ALLOWED_EXT = [".stl", ".step", ".stp", ".igs", ".iges"]
const MAX_FILES = 6
const MAX_TOTAL_MB = 30

function extOk(name: string) {
  const n = name.toLowerCase()
  return ALLOWED_EXT.some((e) => n.endsWith(e))
}

function sanitize(name: string) {
  return name.replace(/[^a-z0-9.\-_]/gi, "_")
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    // honeypot
    const hp = String(form.get("hp") || "")
    if (hp) return NextResponse.json({ ok: true })

    // payload
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      type: String(form.get("type") || "private"),
      company: String(form.get("company") || ""),
      vat: String(form.get("vat") || ""),
      address: String(form.get("address") || ""),
      quantity: String(form.get("quantity") || ""),
      material: String(form.get("material") || ""),
    }

    // Validatie basis
    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { ok: false, error: "Naam, e-mail en bericht zijn verplicht." },
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
    const attachments: {
      filename: string
      content: Buffer
      contentType?: string
    }[] = []

    for (const f of picked) {
      const safeName = sanitize(f.name || "upload")
      if (!extOk(safeName)) {
        return NextResponse.json(
          {
            ok: false,
            error: `Ongeldig bestandstype voor ${safeName}. Toegestaan: ${ALLOWED_EXT.join(
              ", ",
            )}`,
          },
          { status: 400 },
        )
      }
      const ab = await f.arrayBuffer()
      const buf = Buffer.from(ab)
      totalBytes += buf.length
      attachments.push({
        filename: safeName,
        content: buf,
        contentType: f.type || "application/octet-stream",
      })
    }

    const totalMB = totalBytes / (1024 * 1024)
    if (totalMB > MAX_TOTAL_MB) {
      return NextResponse.json(
        {
          ok: false,
          error: `Totaal te groot: ${totalMB.toFixed(
            1,
          )} MB (limiet: ${MAX_TOTAL_MB} MB).`,
        },
        { status: 400 },
      )
    }

    // === Mail opzetten met Nodemailer ===
    // Zet deze ENV variabelen in je deployment:
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465, // true voor 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

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
      replyTo: payload.email, // handig voor direct reply
      subject,
      text,
      html,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

// eenvoudige escape om HTML-injectie te voorkomen
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
