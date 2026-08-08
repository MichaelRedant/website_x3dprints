// app/api/contact/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const maxDuration = 30

const MAX_NAME = 80
const MAX_MESSAGE = 3000

type ContactType = "private" | "business"
type Material = "PLA" | "PETG" | "TPU" | "PLA Plus" | "ABS/ASA" | "Nylon" | "PA-CF" | ""
type Locale = "nl" | "en"

type CustomerConfirmationPayload = {
  name: string
  message: string
  quantity: string
  material: string
  requestContext: string
  locale: Locale
}

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

const VACATION_AUTOREPLY_START_UTC = Date.UTC(2026, 7, 11, 22, 0, 0)
const VACATION_AUTOREPLY_END_UTC = Date.UTC(2026, 7, 20, 22, 0, 0)

function isVacationAutoReplyActive(now = new Date()) {
  const time = now.getTime()
  return time >= VACATION_AUTOREPLY_START_UTC && time < VACATION_AUTOREPLY_END_UTC
}

function nl2brEscaped(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>")
}

function buildConfirmationHtml({
  lang,
  title,
  intro,
  badge,
  payload,
  signoffHtml,
  ps,
}: {
  lang: Locale
  title: string
  intro: string
  badge?: string
  payload: CustomerConfirmationPayload
  signoffHtml: string
  ps?: string
}) {
  const labels = lang === "en"
    ? {
        product: "Product/context",
        material: "Material",
        quantity: "Quantity",
        message: "Your message",
      }
    : {
        product: "Product/context",
        material: "Materiaal",
        quantity: "Aantal",
        message: "Je bericht",
      }

  const badgeRow = badge
    ? `<tr><td style="padding-top:14px;"><span style="display:inline-block;border-radius:999px;background:rgba(14,165,233,0.14);border:1px solid rgba(125,211,252,0.35);color:#bae6fd;font-size:12px;font-weight:700;padding:7px 10px;">${escapeHtml(badge)}</span></td></tr>`
    : ""
  const psRow = ps
    ? `<tr><td style="padding-top:10px;font-size:12px;color:#94a3b8;">${escapeHtml(ps)}</td></tr>`
    : ""

  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><title>${escapeHtml(title)}</title></head><body style="margin:0;padding:0;background:#0b1224;font-family:Segoe UI,Arial,sans-serif;color:#e5e7eb;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:radial-gradient(140% 120% at 50% 0%, rgba(99,102,241,0.12), rgba(11,18,36,1));padding:24px 12px;">
<tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:linear-gradient(150deg, rgba(17,24,39,0.94), rgba(15,23,42,0.96));border:1px solid rgba(148,163,184,0.18);border-radius:16px;padding:22px;box-shadow:0 16px 50px rgba(0,0,0,0.25);">
<tr><td style="font-size:14px;letter-spacing:0.3px;color:#a5b4fc;font-weight:600;">X3DPrints</td></tr>
<tr><td style="padding-top:6px;"><div style="font-size:22px;font-weight:800;color:#f8fafc;line-height:1.25;">${escapeHtml(title)}</div></td></tr>
${badgeRow}
<tr><td style="padding-top:12px;font-size:14px;color:#cbd5e1;line-height:1.6;">${escapeHtml(intro)}</td></tr>
<tr><td style="padding-top:18px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 8px;">
<tr><td width="140" style="color:#94a3b8;font-size:13px;">${labels.product}</td><td style="color:#e2e8f0;font-size:14px;font-weight:600;">${escapeHtml(payload.requestContext || "-")}</td></tr>
<tr><td width="140" style="color:#94a3b8;font-size:13px;">${labels.material}</td><td style="color:#e2e8f0;font-size:14px;font-weight:600;">${escapeHtml(payload.material || "-")}</td></tr>
<tr><td width="140" style="color:#94a3b8;font-size:13px;">${labels.quantity}</td><td style="color:#e2e8f0;font-size:14px;">${escapeHtml(payload.quantity || "-")}</td></tr>
<tr><td width="140" style="color:#94a3b8;font-size:13px;vertical-align:top;padding-top:6px;">${labels.message}</td><td style="padding-top:6px;"><div style="background:#0f172a;border:1px solid rgba(148,163,184,0.25);border-radius:10px;padding:12px 14px;color:#e2e8f0;font-size:14px;line-height:1.55;">${nl2brEscaped(payload.message)}</div></td></tr>
</table></td></tr>
<tr><td style="padding-top:18px;font-size:14px;color:#cbd5e1;">${signoffHtml}</td></tr>
${psRow}
</table></td></tr></table></body></html>`
}

function buildCustomerConfirmation(payload: CustomerConfirmationPayload) {
  const product = payload.requestContext || "-"
  const material = payload.material || "-"
  const quantity = payload.quantity || "-"
  const isVacation = isVacationAutoReplyActive()

  if (payload.locale === "en") {
    if (isVacation) {
      const subject = "Your request was received - limited follow-up until 20/08"
      const text = `Hi ${payload.name},

Thanks for your message. Your request was received.

I am on holiday from 12 August through 20 August 2026. New requests will therefore be followed up a little slower than usual. From 21 August I will pick requests back up and come back with pricing, timing or extra questions.

Summary:
- Product/context: ${product}
- Material: ${material}
- Quantity: ${quantity}

Your message:
${payload.message}

If you have extra info, photos, STL/STEP files or a deadline in the meantime, feel free to reply to this email so everything is grouped together when I review your request.

Talk soon,
Michael from X3DPrints`

      return {
        subject,
        text,
        html: buildConfirmationHtml({
          lang: "en",
          title: "Your request was received",
          intro: "I am on holiday from 12 August through 20 August 2026. New requests will be followed up a little slower than usual. From 21 August I will pick requests back up and come back with pricing, timing or extra questions.",
          badge: "Holiday mode: 12/08 - 20/08",
          payload,
          signoffHtml: "Talk soon,<br>Michael from X3DPrints",
        }),
      }
    }

    const subject = "We received your request"
    const text = `Hi ${payload.name},

Thanks for your message. We will review your request and send a concrete reply with pricing and timing soon.

Summary:
- Product/context: ${product}
- Material: ${material}
- Quantity: ${quantity}

Your message:
${payload.message}

Talk soon,
Michael from X3DPrints`

    return {
      subject,
      text,
      html: buildConfirmationHtml({
        lang: "en",
        title: "Thanks for your request",
        intro: "We will review your request and send a concrete proposal with pricing and timing soon. Here is the summary.",
        payload,
        signoffHtml: "Talk soon,<br>Michael from X3DPrints",
      }),
    }
  }

  if (isVacation) {
    const subject = "Je aanvraag is ontvangen - beperkte opvolging t.e.m. 20/08"
    const text = `Hey ${payload.name},

Bedankt voor je bericht! Je aanvraag is goed ontvangen.

Ik ben met vakantie van 12 augustus t.e.m. 20 augustus 2026. Daardoor worden nieuwe aanvragen iets trager opgevolgd dan gewoonlijk. Vanaf 21 augustus neem ik de aanvragen opnieuw verder op en kom ik terug met prijs, timing of bijkomende vragen.

Samenvatting:
- Product/context: ${product}
- Materiaal: ${material}
- Aantal: ${quantity}

Je bericht:
${payload.message}

Heb je intussen extra info, foto's, STL/STEP-bestanden of een deadline? Antwoord gerust op deze mail, dan zit alles meteen samen wanneer ik je aanvraag bekijk.

Tot snel,
Michael van X3DPrints`

    return {
      subject,
      text,
      html: buildConfirmationHtml({
        lang: "nl",
        title: "Je aanvraag is ontvangen",
        intro: "Ik ben met vakantie van 12 augustus t.e.m. 20 augustus 2026. Daardoor worden nieuwe aanvragen iets trager opgevolgd dan gewoonlijk. Vanaf 21 augustus neem ik de aanvragen opnieuw verder op en kom ik terug met prijs, timing of bijkomende vragen.",
        badge: "Vakantiemodus: 12/08 - 20/08",
        payload,
        signoffHtml: "Tot snel,<br>Michael van X3DPrints",
      }),
    }
  }

  const subject = "We hebben je aanvraag ontvangen"
  const text = `Hey ${payload.name},

Bedankt voor je bericht! We bekijken je aanvraag en sturen snel een reactie met prijs en timing.

Samenvatting:
- Product/context: ${product}
- Materiaal: ${material}
- Aantal: ${quantity}

Je bericht:
${payload.message}

Tot snel,
Michael van X3DPrints

P.S. Geen stress als je bestand 'final_v3_definitief.stl' heet, dat zien we wel vaker ;)`

  return {
    subject,
    text,
    html: buildConfirmationHtml({
      lang: "nl",
      title: "Bedankt voor je aanvraag",
      intro: "We bekijken je vraag en sturen snel een concreet voorstel met prijs en timing. Hieronder de samenvatting.",
      payload,
      signoffHtml: "Tot snel,<br>Michael van X3DPrints",
      ps: 'P.S. Geen stress als je bestand "final_v3_definitief.stl" heet, dat zien we wel vaker ;)',
    }),
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    // honeypot
    const hp = String(form.get("hp") || "")
    const website = String(form.get("website") || "")
    if (hp || website) return NextResponse.json({ ok: true })

    // payload
    const type = (String(form.get("type") || "private") as ContactType)
    const material = (String(form.get("material") || "") as Material)
    const locale = String(form.get("locale") || "").toLowerCase() === "en" ? "en" : "nl"

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
      quote: clamp(String(form.get("quote") || "").trim(), 800),
      requestContext: clamp(String(form.get("requestContext") || "").trim(), 120),
      source: clamp(String(form.get("source") || "").trim(), 40),
      locale,
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

    const subjectParts = [
      "[Contact]",
      payload.source === "shop" ? "Shop" : "",
      payload.requestContext || "",
      payload.type === "business" ? "Bedrijf" : "Particulier",
      payload.name,
    ].filter(Boolean)
    const subject = subjectParts.join(" - ")
    const textLines = [
      `Naam: ${payload.name}`,
      `E-mail: ${payload.email}`,
      `Type: ${payload.type}`,
      `Bedrijf: ${payload.company || "-"}`,
      `BTW: ${payload.vat || "-"}`,
      `Adres: ${payload.address || "-"}`,
      `Aantal: ${payload.quantity || "-"}`,
      `Materiaal: ${payload.material || "-"}`,
      `Product/context: ${payload.requestContext || "-"}`,
      `Bron: ${payload.source || "-"}`,
    ]
    if (payload.quote) {
      textLines.push("Indicatieve schatting:")
      textLines.push(payload.quote)
    }
    textLines.push("", "Bericht:", payload.message)
    const text = textLines.join("\n")

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
  ${payload.requestContext ? `<li><strong>Product/context:</strong> ${escapeHtml(payload.requestContext)}</li>` : ""}
  ${payload.source ? `<li><strong>Bron:</strong> ${escapeHtml(payload.source)}</li>` : ""}
  ${payload.quote ? `<li><strong>Indicatieve schatting:</strong> ${escapeHtml(payload.quote)}</li>` : ""}
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

    const confirmation = buildCustomerConfirmation(payload)
    let confirmationMessageId = ""
    try {
      const confirmationInfo = await transporter.sendMail({
        to: payload.email,
        from: env.from,
        replyTo: env.to,
        subject: confirmation.subject,
        text: confirmation.text,
        html: confirmation.html,
      })
      confirmationMessageId = confirmationInfo.messageId || ""
    } catch (confirmationError) {
      console.error("[/api/contact] confirmation mail error:", errorMessage(confirmationError))
    }

    console.log("[/api/contact] mail sent:", info.messageId, "confirmation:", confirmationMessageId || "failed")
    return NextResponse.json({ ok: true, confirmationSent: Boolean(confirmationMessageId) })
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
