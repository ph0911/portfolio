export function issueBody(overrides = {}) {
  const fields = {
    Type: "Decision",
    Project: "Evo iOS",
    Title: "Lokalen Sync stabilisiert",
    Summary: "Der Outbox-Pfad ist jetzt deterministisch.",
    Details:
      "## Kontext\n\n- Offline bleibt **nutzbar**.\n- [PR](https://github.com/ph0911/evo/pull/1)",
    Tags: "swift, local-first",
    Link: "https://github.com/ph0911/evo",
    ...overrides,
  }

  return Object.entries(fields)
    .map(([heading, value]) => `### ${heading}\n\n${value}`)
    .join("\n\n")
}

export function issueEvent(overrides = {}) {
  const issueOverrides = overrides.issue ?? {}
  return {
    action: "labeled",
    label: { name: "content:publish" },
    ...overrides,
    issue: {
      number: 42,
      body: issueBody(),
      created_at: "2026-07-26T08:15:00Z",
      html_url: "https://github.com/ph0911/portfolio/issues/42",
      labels: [{ name: "content:inbox" }, { name: "content:publish" }],
      user: { login: "ph0911" },
      ...issueOverrides,
    },
  }
}
