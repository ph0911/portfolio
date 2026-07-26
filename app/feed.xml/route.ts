import { getLogEntries } from "@/lib/content"

const siteUrl = "https://www.pascalheue.dev"

function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    character =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  )
}

export const dynamic = "force-static"

export function GET() {
  const entries = getLogEntries()
  const items = entries
    .map(entry => {
      const url = `${siteUrl}/log/${entry.slug}`
      const publishedAt = new Date(`${entry.publishedAt}T00:00:00.000Z`)

      return [
        "<item>",
        `<title>${escapeXml(entry.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<description>${escapeXml(entry.summary)}</description>`,
        `<pubDate>${publishedAt.toUTCString()}</pubDate>`,
        ...entry.tags.map(tag => `<category>${escapeXml(tag)}</category>`),
        "</item>",
      ].join("")
    })
    .join("")
  const lastBuildDate = entries[0]
    ? new Date(`${entries[0].publishedAt}T00:00:00.000Z`).toUTCString()
    : new Date(0).toUTCString()
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "<title>Pascal Heue — Dev Log</title>",
    `<link>${siteUrl}/log</link>`,
    "<description>Fortschritte, Entscheidungen und Learnings aus meinen Projekten.</description>",
    "<language>de-DE</language>",
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `<atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "</channel>",
    "</rss>",
  ].join("")

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
