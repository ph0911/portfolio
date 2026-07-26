function yamlString(value) {
  return JSON.stringify(value)
}

function yamlList(values) {
  return `[${values.map(yamlString).join(", ")}]`
}

export function renderDevLog({ issue, fields, publishedAt }) {
  const frontmatter = [
    "---",
    "schemaVersion: 1",
    `title: ${yamlString(fields.title)}`,
    `summary: ${yamlString(fields.summary)}`,
    `publishedAt: ${yamlString(publishedAt)}`,
    `type: ${yamlString(fields.type)}`,
    `tags: ${yamlList(fields.tags)}`,
    `sourceIssue: ${yamlString(String(issue.number))}`,
    `sourceUrl: ${yamlString(issue.html_url)}`,
  ]

  if (fields.projectId)
    frontmatter.splice(7, 0, `projectId: ${yamlString(fields.projectId)}`)

  const link = fields.link
    ? `\n\n## Link\n\n[Weitere Informationen](${fields.link})`
    : ""
  return `${frontmatter.join("\n")}\n---\n\n${fields.details}${link}\n`
}
