import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()

async function read(relativePath) {
  try {
    return await fs.readFile(path.join(ROOT, relativePath), "utf8")
  } catch {
    throw new Error(`${relativePath} ontbreekt`)
  }
}

function requirePattern(failures, source, pattern, message) {
  if (!pattern.test(source)) failures.push(message)
}

async function main() {
  const [auth, common, manage, fileGateway, approval, apache, cli, viewer] = await Promise.all([
    read("public/model-preview-auth.php"),
    read("public/model-preview-common.php"),
    read("public/model-preview-manage.php"),
    read("public/model-preview-file.php"),
    read("public/model-approval.php"),
    read("scripts/write-apache-htaccess.mjs"),
    read("scripts/create-model-preview.mjs"),
    read("components/SharedModelPreview.tsx"),
  ])
  const failures = []

  requirePattern(failures, auth, /MODEL_PREVIEW_PASSWORD_HASH/, "hash-configuratie voor het adminwachtwoord ontbreekt")
  requirePattern(failures, auth, /password_verify\s*\(/, "password_verify ontbreekt")
  requirePattern(failures, auth, /modelPreviewConsumeRateSlot\('auth'/, "login-rate-limit ontbreekt")
  if (/getenv\(\s*['"]MODEL_PREVIEW_PASSWORD['"]\s*\)/.test(auth)) {
    failures.push("een plaintext MODEL_PREVIEW_PASSWORD fallback is niet toegestaan")
  }

  requirePattern(failures, common, /use_only_cookies/, "cookie-only sessies ontbreken")
  requirePattern(failures, common, /session_regenerate_id\s*\(true\)/, "sessie-ID wordt niet vernieuwd na login")
  requirePattern(failures, common, /model_preview_login_at/, "absolute sessieverval ontbreekt")
  requirePattern(failures, common, /model_preview_last_seen/, "inactieve sessieverval ontbreekt")
  requirePattern(failures, common, /Content-Security-Policy/, "CSP-responseheader ontbreekt")
  requirePattern(failures, common, /flock\s*\(/, "atomaire rate limiting ontbreekt")
  requirePattern(failures, common, /function modelPreviewUpdateState/, "atomaire revisiestatus ontbreekt")

  requirePattern(failures, manage, /modelPreviewRequireCsrf/, "CSRF-bescherming ontbreekt")
  requirePattern(failures, manage, /MODEL_PREVIEW_MAX_BYTES/, "server-side uploadlimiet ontbreekt")
  requirePattern(failures, manage, /expectedChunks/, "strikte chunkcontrole ontbreekt")
  requirePattern(failures, manage, /modelPreviewUploadOwner/, "uploads zijn niet aan de adminsessie gekoppeld")
  requirePattern(failures, manage, /disk_free_space/, "vrije-schijfruimtecontrole ontbreekt")
  requirePattern(failures, manage, /modelPreviewProtectDirectory/, "deny-all bescherming voor modelmappen ontbreekt")
  requirePattern(failures, manage, /modelPreviewValidateModel/, "inhoudsvalidatie voor 3D-bestanden ontbreekt")
  requirePattern(failures, manage, /modelPreviewContainsExternalUri/, "GLB-bestanden worden niet op externe resources gecontroleerd")
  requirePattern(failures, manage, /\$action === 'cancel'/, "afgebroken uploads kunnen niet onmiddellijk worden opgeruimd")
  requirePattern(failures, manage, /bin2hex\(random_bytes\(16\)\)/, "previewtokens zijn korter dan 128 bit")
  requirePattern(failures, manage, /'projectId'/, "projectgroepering ontbreekt")
  requirePattern(failures, manage, /\['extend', 'revoke', 'reactivate', 'resend'\]/, "beheeracties voor revisielinks ontbreken")

  requirePattern(failures, fileGateway, /file !== \$manifestFile/, "gateway controleert het aangevraagde bestand niet tegen het manifest")
  requirePattern(failures, approval, /HTTP_SEC_FETCH_SITE/, "same-origin controle voor reacties ontbreekt")
  requirePattern(failures, approval, /modelPreviewConsumeRateSlot\('approval'/, "rate limiting voor reacties ontbreekt")
  requirePattern(failures, approval, /decisionRevisionId/, "beslissingen zijn niet aan een revisie gekoppeld")
  requirePattern(failures, approval, /modelPreviewUpdateState/, "beslissingen worden niet atomair bewaard")
  requirePattern(failures, apache, /Require all denied/, "Apache deny-all fallback voor runtimebestanden ontbreekt")
  requirePattern(failures, apache, /PRIVATE_PAGE_HTACCESS/, "no-store beveiligingsheaders voor privépagina's ontbreken")
  requirePattern(failures, apache, /Strict-Transport-Security/, "sitebrede HSTS-header ontbreekt")
  requirePattern(failures, apache, /Options -Indexes -MultiViews/, "sitebrede directorylisting is niet uitgeschakeld")
  requirePattern(failures, cli, /randomBytes\(16\)/, "de CLI-generator gebruikt geen 128-bit previewtoken")
  requirePattern(failures, cli, /expiresAt/, "de CLI-generator maakt previews zonder vervaldatum")
  requirePattern(failures, cli, /revisionId: id/, "de CLI-generator maakt geen onafhankelijke revisies")
  requirePattern(failures, cli, /Require all denied/, "de CLI-generator beschermt previewmappen niet met deny-all")
  requirePattern(failures, viewer, /model-preview-file\.php\?id=/, "de viewer gebruikt de beveiligde bestandsgateway niet")
  if (/fetch\(`\/model-previews\//.test(viewer) || /loadRemoteModel\(`\/model-previews\//.test(viewer)) {
    failures.push("de viewer mag runtimebestanden niet rechtstreeks uit /model-previews ophalen")
  }

  if (failures.length > 0) {
    console.error("[security:model-preview] FAILED:")
    for (const failure of failures) console.error(`  - ${failure}`)
    process.exit(1)
  }

  console.log("[security:model-preview] OK - auth, uploads, tokens, bestanden en privéheaders zijn afgedekt")
}

main().catch((error) => {
  console.error("[security:model-preview] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
