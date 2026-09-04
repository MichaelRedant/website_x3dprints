export const MODEL_UPLOAD_ACCEPT = ".stl,.3mf"
export const MODEL_UPLOAD_MAX_FILES = 3
export const MODEL_UPLOAD_MAX_FILE_BYTES = 10 * 1024 * 1024
export const MODEL_UPLOAD_MAX_TOTAL_BYTES = 15 * 1024 * 1024

export type ModelUploadCandidate = {
  name: string
  size: number
}

export type ModelUploadValidationError =
  | { code: "too_many_files" }
  | { code: "unsupported_type"; fileName: string }
  | { code: "file_too_large"; fileName: string }
  | { code: "total_too_large" }

export function getModelUploadExtension(fileName: string): "stl" | "3mf" | null {
  const normalizedName = fileName.replaceAll("\\", "/").split("/").pop() ?? ""
  const extension = normalizedName.split(".").pop()?.toLowerCase()
  return extension === "stl" || extension === "3mf" ? extension : null
}

export function validateModelUploads(
  files: readonly ModelUploadCandidate[],
): ModelUploadValidationError | null {
  if (files.length > MODEL_UPLOAD_MAX_FILES) {
    return { code: "too_many_files" }
  }

  let totalBytes = 0
  for (const file of files) {
    if (!getModelUploadExtension(file.name)) {
      return { code: "unsupported_type", fileName: file.name }
    }
    if (file.size > MODEL_UPLOAD_MAX_FILE_BYTES) {
      return { code: "file_too_large", fileName: file.name }
    }
    totalBytes += file.size
  }

  if (totalBytes > MODEL_UPLOAD_MAX_TOTAL_BYTES) {
    return { code: "total_too_large" }
  }

  return null
}

export function formatUploadSize(bytes: number, locale: "nl" | "en") {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "nl-BE", {
    maximumFractionDigits: 1,
  }).format(bytes / (1024 * 1024)) + " MB"
}
