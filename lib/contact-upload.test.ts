import { describe, expect, it } from "vitest"

import {
  MODEL_UPLOAD_MAX_FILE_BYTES,
  MODEL_UPLOAD_MAX_FILES,
  MODEL_UPLOAD_MAX_TOTAL_BYTES,
  getModelUploadExtension,
  validateModelUploads,
} from "./contact-upload"

describe("contact model uploads", () => {
  it("accepts STL and 3MF extensions case-insensitively", () => {
    expect(getModelUploadExtension("prototype.STL")).toBe("stl")
    expect(getModelUploadExtension("assembly.3mf")).toBe("3mf")
  })

  it("rejects unsupported file extensions", () => {
    expect(validateModelUploads([{ name: "archive.zip", size: 100 }])).toEqual({
      code: "unsupported_type",
      fileName: "archive.zip",
    })
  })

  it("rejects too many files", () => {
    const files = Array.from({ length: MODEL_UPLOAD_MAX_FILES + 1 }, (_, index) => ({
      name: `part-${index}.stl`,
      size: 100,
    }))
    expect(validateModelUploads(files)).toEqual({ code: "too_many_files" })
  })

  it("rejects a file above the per-file limit", () => {
    expect(
      validateModelUploads([{ name: "large.stl", size: MODEL_UPLOAD_MAX_FILE_BYTES + 1 }]),
    ).toEqual({ code: "file_too_large", fileName: "large.stl" })
  })

  it("rejects files above the combined limit", () => {
    expect(
      validateModelUploads([
        { name: "part-a.stl", size: 8 * 1024 * 1024 },
        { name: "part-b.3mf", size: 8 * 1024 * 1024 },
      ]),
    ).toEqual({ code: "total_too_large" })
  })

  it("accepts files on the combined limit", () => {
    expect(
      validateModelUploads([
        { name: "part-a.stl", size: MODEL_UPLOAD_MAX_FILE_BYTES },
        { name: "part-b.3mf", size: MODEL_UPLOAD_MAX_TOTAL_BYTES - MODEL_UPLOAD_MAX_FILE_BYTES },
      ]),
    ).toBeNull()
  })
})
