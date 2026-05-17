import fs from "node:fs"
import path from "node:path"
import { spawn, spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")
const envPath = path.join(rootDir, ".env")
const statePath = path.join(rootDir, "data", "state.json")
const latestNotificationPath = path.join(rootDir, "data", "latest-notification.json")
const toastScript = path.join(rootDir, "scripts", "show-notification.ps1")
const companionScript = path.join(rootDir, "scripts", "companion-notifier.ps1")
const companionLauncherScript = path.join(rootDir, "scripts", "launch-companion.ps1")

const args = new Set(process.argv.slice(2))

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}

  const result = {}
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/)
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line || line.startsWith("#")) continue
    const index = line.indexOf("=")
    if (index < 0) continue

    const key = line.slice(0, index).trim()
    let value = line.slice(index + 1).trim()
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    result[key] = value
  }
  return result
}

function getConfig() {
  const fileEnv = parseEnvFile(envPath)
  const env = { ...fileEnv, ...process.env }

  return {
    host: env.IMAP_HOST,
    port: Number(env.IMAP_PORT || 993),
    secure: String(env.IMAP_SECURE || "true").toLowerCase() !== "false",
    user: env.IMAP_USER,
    pass: env.IMAP_PASS,
    mailbox: env.IMAP_MAILBOX || "INBOX",
    tlsRejectUnauthorized: String(env.IMAP_TLS_REJECT_UNAUTHORIZED || "true").toLowerCase() !== "false",
    pollIntervalMs: Math.max(15, Number(env.POLL_INTERVAL_SECONDS || 45)) * 1000,
    notifyExistingOnFirstRun: String(env.NOTIFY_EXISTING_ON_FIRST_RUN || "false").toLowerCase() === "true",
    unreadOnly: String(env.NOTIFIER_UNREAD_ONLY || "true").toLowerCase() !== "false",
    allowedFrom: splitCsv(env.NOTIFIER_ALLOWED_FROM),
    subjectKeywords: splitCsv(env.NOTIFIER_SUBJECT_KEYWORDS).map((item) => item.toLowerCase()),
    brand: env.NOTIFIER_BRAND || "X3DPrints",
    durationMs: Number(env.NOTIFIER_DURATION_MS || 6200),
    sound: String(env.NOTIFIER_SOUND || "false").toLowerCase() === "true",
    openUrl: env.NOTIFIER_OPEN_URL || "https://web0147.zxcs.be/roundcube/?_task=mail&_mbox=INBOX",
    monitor: env.NOTIFIER_MONITOR || "primary",
    edge: env.NOTIFIER_EDGE || "right",
    topOffset: Number(env.NOTIFIER_TOP_OFFSET || 28),
    maxNotificationAgeSeconds: Math.max(30, Number(env.NOTIFIER_MAX_NOTIFICATION_AGE_SECONDS || 300)),
  }
}

function splitCsv(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function requireConfig(config) {
  const missing = []
  if (!config.host) missing.push("IMAP_HOST")
  if (!config.user) missing.push("IMAP_USER")
  if (!config.pass) missing.push("IMAP_PASS")

  if (missing.length) {
    throw new Error(
      `Missing ${missing.join(", ")}. Copy config.example.env to .env in ${rootDir} and fill in your mailbox settings.`,
    )
  }
}

function readState() {
  if (!fs.existsSync(statePath)) return { mailboxes: {} }

  try {
    return JSON.parse(fs.readFileSync(statePath, "utf8"))
  } catch {
    return { mailboxes: {} }
  }
}

function writeState(state) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true })
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8")
}

function getAddressLabel(addresses = []) {
  const first = addresses[0]
  if (!first) return "Onbekende afzender"
  if (first.name && first.address) return `${first.name} <${first.address}>`
  return first.name || first.address || "Onbekende afzender"
}

function matchesFilters(message, config) {
  const fromLabel = getAddressLabel(message.envelope?.from).toLowerCase()
  const subject = String(message.envelope?.subject || "").toLowerCase()

  if (config.allowedFrom.length) {
    const fromOk = config.allowedFrom.some((filter) => fromLabel.includes(filter.toLowerCase()))
    if (!fromOk) return false
  }

  if (config.subjectKeywords.length) {
    const subjectOk = config.subjectKeywords.some((keyword) => subject.includes(keyword))
    if (!subjectOk) return false
  }

  return true
}

function createPreview(message, mailbox) {
  const receivedAt = message.internalDate ? new Date(message.internalDate) : new Date()
  const time = receivedAt.toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit" })
  const flags = Array.from(message.flags || [])
  const unread = flags.includes("\\Seen") ? "" : "Nieuw - "
  return `${unread}${mailbox} - ${time}`
}

function isUnread(message) {
  return !Array.from(message.flags || []).includes("\\Seen")
}

function showNotification({ title, sender, subject, preview }, config) {
  fs.mkdirSync(path.dirname(latestNotificationPath), { recursive: true })
  fs.writeFileSync(
    latestNotificationPath,
    `${JSON.stringify(
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        title,
        sender,
        subject,
        preview,
        openUrl: config.openUrl,
      },
      null,
      2,
    )}\n`,
    "utf8",
  )

  const companionParams = [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    companionLauncherScript,
    "-Monitor",
    config.monitor,
    "-Edge",
    config.edge,
    "-TopOffset",
    String(config.topOffset),
    "-DurationMs",
    String(config.durationMs),
    "-OpenUrl",
    config.openUrl,
    "-LatestPath",
    latestNotificationPath,
    "-MaxNotificationAgeSeconds",
    String(config.maxNotificationAgeSeconds),
  ]

  spawnSync("powershell.exe", companionParams, {
    cwd: rootDir,
    stdio: "ignore",
    windowsHide: true,
  })
}

function showLegacyNotification({ title, sender, subject, preview }, config) {
  const params = [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    toastScript,
    "-Title",
    title,
    "-Sender",
    sender,
    "-Subject",
    subject,
    "-Preview",
    preview,
    "-DurationMs",
    String(config.durationMs),
    "-OpenUrl",
    config.openUrl,
    "-Monitor",
    config.monitor,
    "-Edge",
    config.edge,
    "-TopOffset",
    String(config.topOffset),
  ]

  if (config.sound) params.push("-Sound")

  const child = spawn("powershell.exe", params, {
    cwd: rootDir,
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  })
  child.unref()
}

async function importImapFlow() {
  try {
    return await import("imapflow")
  } catch (error) {
    throw new Error(`Missing dependency "imapflow". Run "npm install" in ${rootDir}. ${error.message}`)
  }
}

async function pollMailbox(config) {
  requireConfig(config)

  const { ImapFlow } = await importImapFlow()
  const client = new ImapFlow({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: config.tlsRejectUnauthorized,
    },
    logger: false,
  })

  await client.connect()

  const state = readState()
  const key = `${config.user}:${config.mailbox}`
  const mailboxState = state.mailboxes[key] || {}

  let lock
  let maxUid = Number(mailboxState.lastUid || 0)
  let notified = 0

  try {
    lock = await client.getMailboxLock(config.mailbox)
    const status = await client.status(config.mailbox, { uidNext: true })
    const newestExistingUid = Math.max(0, Number(status.uidNext || 1) - 1)

    if (!mailboxState.initialized && !config.notifyExistingOnFirstRun) {
      state.mailboxes[key] = {
        initialized: true,
        lastUid: newestExistingUid,
        updatedAt: new Date().toISOString(),
      }
      writeState(state)
      return { notified: 0, skippedInitial: true }
    }

    const fromUid = Math.max(1, maxUid + 1)
    if (fromUid > newestExistingUid) {
      state.mailboxes[key] = {
        initialized: true,
        lastUid: Math.max(maxUid, newestExistingUid),
        updatedAt: new Date().toISOString(),
      }
      writeState(state)
      return { notified: 0, skippedInitial: false }
    }

    for await (const message of client.fetch(
      `${fromUid}:*`,
      {
        uid: true,
        envelope: true,
        flags: true,
        internalDate: true,
      },
      { uid: true },
    )) {
      if (!message.uid) continue
      maxUid = Math.max(maxUid, message.uid)

      if (config.unreadOnly && !isUnread(message)) continue
      if (!matchesFilters(message, config)) continue

      showNotification(
        {
          title: config.brand,
          sender: getAddressLabel(message.envelope?.from),
          subject: message.envelope?.subject || "Nieuwe e-mail",
          preview: createPreview(message, config.mailbox),
        },
        config,
      )
      notified += 1
    }

    state.mailboxes[key] = {
      initialized: true,
      lastUid: maxUid,
      updatedAt: new Date().toISOString(),
    }
    writeState(state)
    return { notified, skippedInitial: false }
  } finally {
    if (lock) lock.release()
    await client.logout().catch(() => {})
  }
}

function logSafeConfig(config) {
  console.log({
    host: config.host || null,
    port: config.port,
    secure: config.secure,
    user: config.user || null,
    pass: config.pass ? "[set]" : "[missing]",
    mailbox: config.mailbox,
    tlsRejectUnauthorized: config.tlsRejectUnauthorized,
    pollIntervalSeconds: config.pollIntervalMs / 1000,
    notifyExistingOnFirstRun: config.notifyExistingOnFirstRun,
    unreadOnly: config.unreadOnly,
    allowedFrom: config.allowedFrom,
    subjectKeywords: config.subjectKeywords,
    brand: config.brand,
    durationMs: config.durationMs,
    sound: config.sound,
    openUrl: config.openUrl,
    monitor: config.monitor,
    edge: config.edge,
    topOffset: config.topOffset,
    maxNotificationAgeSeconds: config.maxNotificationAgeSeconds,
  })
}

async function main() {
  const config = getConfig()

  if (args.has("--screen-info")) {
    spawn("powershell.exe", [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      toastScript,
      "-ScreenInfo",
    ], {
      cwd: rootDir,
      stdio: "inherit",
      windowsHide: true,
    })
    return
  }

  if (args.has("--legacy-toast")) {
    showLegacyNotification(
      {
        title: config.brand,
        sender: "X3DPrints inbox",
        subject: "Legacy toast test",
        preview: "Deze gebruikt de oude losse toast-renderer",
      },
      config,
    )
    return
  }

  if (args.has("--test")) {
    showNotification(
      {
        title: config.brand,
        sender: "X3DPrints inbox",
        subject: "Nieuwe offerte-aanvraag ontvangen",
        preview: "Nieuw - Contactformulier - net binnen",
      },
      config,
    )
    return
  }

  if (args.has("--show-config")) {
    logSafeConfig(config)
    return
  }

  if (args.has("--once")) {
    const result = await pollMailbox(config)
    console.log(result.skippedInitial ? "Initial run: existing mail marked as seen." : `Checked inbox. Notifications: ${result.notified}`)
    return
  }

  console.log(`X3DPrints email notifier running. Polling ${config.mailbox} every ${config.pollIntervalMs / 1000}s.`)
  while (true) {
    try {
      const result = await pollMailbox(config)
      if (result.notified) console.log(`${new Date().toISOString()} notifications: ${result.notified}`)
      if (result.skippedInitial) console.log("Initial run: existing mail marked as seen.")
    } catch (error) {
      console.error(`${new Date().toISOString()} ${error.message}`)
    }
    await new Promise((resolve) => setTimeout(resolve, config.pollIntervalMs))
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
