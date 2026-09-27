import assert from "node:assert/strict"
import { spawn, spawnSync } from "node:child_process"
import { cp, mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

const ROOT = process.cwd()
const PHP_FILES = [
  "model-preview-common.php",
  "model-preview-auth.php",
  "model-preview-manage.php",
  "model-preview-file.php",
  "model-approval.php",
]
const STL = Buffer.from(`solid test
facet normal 0 0 1
  outer loop
    vertex 0 0 0
    vertex 10 0 0
    vertex 0 10 0
  endloop
endfacet
endsolid test
`)

const directory = await mkdtemp(path.join(tmpdir(), "x3d-preview-flow-"))
const port = 18000 + Math.floor(Math.random() * 2000)
const baseUrl = `http://127.0.0.1:${port}`
const testPassword = "integration-test-only"
const hash = spawnSync("php", ["-r", `echo password_hash('${testPassword}', PASSWORD_BCRYPT);`], { encoding: "utf8" })
if (hash.status !== 0 || !hash.stdout.trim()) throw new Error("PHP password_hash kon niet worden uitgevoerd.")

for (const file of PHP_FILES) await cp(path.join(ROOT, "public", file), path.join(directory, file))

const server = spawn("php", ["-S", `127.0.0.1:${port}`, "-t", directory], {
  env: { ...process.env, MODEL_PREVIEW_PASSWORD_HASH: hash.stdout.trim() },
  stdio: "ignore",
})

let cookie = ""
let csrf = ""

async function request(url, options = {}) {
  const headers = new Headers(options.headers)
  if (cookie) headers.set("Cookie", cookie)
  const response = await fetch(`${baseUrl}${url}`, { ...options, headers })
  const setCookie = response.headers.get("set-cookie")
  if (setCookie) cookie = setCookie.split(";", 1)[0]
  return response
}

async function json(response) {
  return await response.json().catch(() => null)
}

async function adminAction(action, body) {
  const response = await request(`/model-preview-manage.php?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
    body: JSON.stringify(body),
  })
  const payload = await json(response)
  assert.equal(response.ok, true, payload?.error ?? `${action} is mislukt`)
  assert.equal(payload?.ok, true)
  return payload
}

async function list() {
  const response = await request("/model-preview-manage.php", { cache: "no-store" })
  const payload = await json(response)
  assert.equal(response.ok, true)
  assert.equal(payload?.ok, true)
  csrf = payload.csrf
  return payload.items
}

async function uploadRevision({ projectId = "", version }) {
  const start = await adminAction("start", {
    projectId,
    title: "Mesh handvaten",
    client: "Tom",
    clientEmail: "tom@example.com",
    version,
    note: "Controleer de buitenmaten.",
    unit: "mm",
    days: 14,
    format: "stl",
    size: STL.length,
  })
  const chunkResponse = await request(`/model-preview-manage.php?action=chunk&uploadId=${start.uploadId}&index=0`, {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream", "X-CSRF-Token": csrf },
    body: STL,
  })
  assert.equal(chunkResponse.ok, true, (await json(chunkResponse))?.error)
  const finish = await adminAction("finish", { uploadId: start.uploadId, chunks: 1 })
  return finish.id
}

async function decide(id, revisionId, action) {
  const body = new URLSearchParams({
    id,
    revisionId,
    action,
    name: "Tom Test",
    email: "tom@example.com",
    comment: action === "changes" ? "Pas de boring aan." : "Akkoord.",
    website: "",
  })
  return await request("/model-approval.php", { method: "POST", body })
}

try {
  let ready = false
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    try {
      const response = await fetch(`${baseUrl}/model-preview-auth.php`)
      if (response.ok) { ready = true; break }
    } catch {}
  }
  assert.equal(ready, true, "De tijdelijke PHP-server startte niet.")

  const login = await request("/model-preview-auth.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: testPassword }),
  })
  assert.equal(login.ok, true, "Inloggen op de testserver is mislukt.")
  await list()

  const v1Id = await uploadRevision({ version: "V1" })
  let items = await list()
  const v1 = items.find((item) => item.id === v1Id)
  assert.ok(v1)
  assert.equal(v1.revisionId, v1Id)
  assert.notEqual(v1.projectId, v1.revisionId)

  const manifestResponse = await request(`/model-preview-file.php?id=${v1Id}&file=manifest.json`)
  assert.equal(manifestResponse.ok, true)
  const manifest = await json(manifestResponse)
  assert.equal(manifest.revisionId, v1Id)
  items = await list()
  assert.ok(items.find((item) => item.id === v1Id)?.lastViewedAt)

  const wrongRevision = await decide(v1Id, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "approve")
  assert.equal(wrongRevision.status, 409)
  const approved = await decide(v1Id, v1Id, "approve")
  assert.equal(approved.ok, true)
  items = await list()
  assert.equal(items.find((item) => item.id === v1Id)?.decision, "approve")

  const oldExpiry = Date.parse(items.find((item) => item.id === v1Id).expiresAt)
  await adminAction("extend", { id: v1Id, days: 14 })
  items = await list()
  assert.ok(Date.parse(items.find((item) => item.id === v1Id).expiresAt) > oldExpiry)

  await adminAction("revoke", { id: v1Id })
  assert.equal((await request(`/model-preview-file.php?id=${v1Id}&file=manifest.json`)).status, 410)
  await adminAction("reactivate", { id: v1Id })
  assert.equal((await request(`/model-preview-file.php?id=${v1Id}&file=manifest.json`)).status, 200)

  const v2Id = await uploadRevision({ projectId: v1.projectId, version: "V2" })
  assert.notEqual(v2Id, v1Id)
  items = await list()
  const v2 = items.find((item) => item.id === v2Id)
  assert.equal(v2.projectId, v1.projectId)
  assert.equal(v2.decision, "")
  assert.equal(items.find((item) => item.id === v1Id).decision, "approve")

  const changes = await decide(v2Id, v2Id, "changes")
  assert.equal(changes.ok, true)
  items = await list()
  assert.equal(items.find((item) => item.id === v1Id).decision, "approve")
  assert.equal(items.find((item) => item.id === v2Id).decision, "changes")
  assert.ok(items.find((item) => item.id === v2Id).decisionAt)

  console.log("[model-preview:flow] OK - projecten, revisies, views, beslissingen, verlengen en intrekken werken")
} finally {
  server.kill()
  await rm(directory, { recursive: true, force: true })
}
