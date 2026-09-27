const AUTH_ENDPOINT = "/model-preview-auth.php"

async function payload(response: Response) {
  return await response.json().catch(() => null) as { ok?: boolean; authed?: boolean; error?: string } | null
}

export async function modelPreviewCheckAuth() {
  const response = await fetch(AUTH_ENDPOINT, { cache: "no-store", credentials: "same-origin" })
  const body = await payload(response)
  return Boolean(response.ok && body?.authed)
}

export async function modelPreviewLogin(password: string) {
  const response = await fetch(AUTH_ENDPOINT, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
  const body = await payload(response)
  if (!response.ok || !body?.ok) throw new Error(body?.error || "Wachtwoord klopt niet.")
}

export async function modelPreviewLogout() {
  await fetch(AUTH_ENDPOINT, { method: "DELETE", credentials: "same-origin" })
}
