const SAFE_LINK_PATTERN = /^https?:\/\/[^\s<>]+$/i

export function validateHttpUrl(value, fieldName = "Link") {
  const candidate = value.trim()
  if (!candidate) return ""

  let parsed
  try {
    parsed = new URL(candidate)
  } catch {
    throw new Error(`${fieldName} muss eine gültige URL sein.`)
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(`${fieldName} muss http:// oder https:// verwenden.`)
  }

  return parsed.href
}

function escapeMdxSyntax(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;")
}

function neutralizeMarkdownImages(value) {
  const withoutInlineImages = value.replace(
    /!\[([^\]\r\n]*)\]\(((?:[^()\s]+|\([^()\s]*\))+)(?:\s+["'][^"'\r\n]*["'])?\)/g,
    "$1",
  )

  return withoutInlineImages.replace(
    /!\[([^\]\r\n]*)\](?:\[[^\]\r\n]*\])?/g,
    "$1",
  )
}

function neutralizeReferenceDefinitions(value) {
  return value.replace(
    /^ {0,3}\[([^\]\r\n]+)\]:/gm,
    (_match, identifier) => `\\[${identifier}]:`,
  )
}

function sanitizeMarkdownLinks(value) {
  return value.replace(
    /(!?\[[^\]\r\n]*\])\(((?:[^()\s]+|\([^()\s]*\))+)(?:\s+["'][^"'\r\n]*["'])?\)/g,
    (match, label, destination) => {
      const safeLabel = label.replace(/^!/, "")
      if (label.startsWith("!")) return safeLabel.slice(1, -1)
      return SAFE_LINK_PATTERN.test(destination) ? match : safeLabel
    },
  )
}

export function sanitizeMarkdown(value) {
  const normalized = value.replace(/\r\n?/g, "\n").trim()
  const withoutImages = neutralizeMarkdownImages(normalized)
  const withoutReferences = neutralizeReferenceDefinitions(withoutImages)
  const withoutMdxEsm = withoutReferences.replace(
    /^(import|export)(?=\s)/gm,
    "\\$1",
  )
  return escapeMdxSyntax(sanitizeMarkdownLinks(withoutMdxEsm))
}

export function sanitizeText(value) {
  return sanitizeMarkdown(value).replace(/\s+/g, " ").trim()
}
