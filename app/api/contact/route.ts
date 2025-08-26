// app/api/contact/route.ts
import { NextResponse } from "next/server"
import { promises as fs } from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

export const runtime = "nodejs" // we gebruiken fs, dus geen edge

const ALLOWED_EXT = [".stl", ".step", ".stp", ".igs", ".iges"]
const UPLOAD_DIR = "/tmp/x3d-uploads" // lokaal / vercel ephemeral

function sanitize(name: string) {
  return name.replace(/[^a-z0-9.\-_]/gi, "_")
}
function extOk(name: string) {
  const n = name.toLowerCase()
  return ALLOWED_EXT.some(e => n.endsWith(e))
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const hp = String(form.get("hp") || "")
    if (hp) return NextResponse.json({ ok: true }) // honeypot: stilletjes akkoord

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

    const files = form.getAll("files") as File[]
    const saved: { filename: string; path?: string; size: number }[] = []

    if (files.length) {
      await fs.mkdir(UPLOAD_DIR, { recursive: true })
      for (const f of files) {
        const name = sanitize(f.name || "upload")
        if (!extOk(name)) {
          return NextResponse.json({ ok: false, error: `Ongeldig bestandstype voor ${name}` }, { status: 400 })
        }
        const ab = await f.arrayBuffer()
        const buf = Buffer.from(ab)
        const unique = `${Date.now()}-${crypto.randomUUID()}-${name}`
        const filePath = path.join(UPLOAD_DIR, unique)
        await fs.writeFile(filePath, buf)
        saved.push({ filename: name, path: filePath, size: buf.length })
      }
    }

    // TODO: hier kan je mail uitsturen met nodemailer of opslaan in DB
    console.log("CONTACT", payload)
    console.log("FILES", saved)

    return NextResponse.json({ ok: true, count: files.length })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

/*
OPTIE: Vercel Blob i.p.v. /tmp
--------------------------------
1) npm i @vercel/blob
2) Vervang de loop in FILES door:

import { put } from "@vercel/blob"
...
for (const f of files) {
  const name = sanitize(f.name || "upload")
  if (!extOk(name)) return NextResponse.json({ ok:false, error:`Ongeldig type ${name}` }, { status:400 })
  const url = await put(`x3d/${Date.now()}-${crypto.randomUUID()}-${name}`, await f.arrayBuffer(), {
    access: "private",
    contentType: f.type || "application/octet-stream",
  })
  saved.push({ filename: name, path: url, size: f.size })
}

3) Gebruik de teruggegeven URL's in je mail/CRM.
*/
