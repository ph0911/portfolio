import { getLogEntries } from "@/lib/content"

const siteUrl = "https://www.pascalheue.dev"

export const dynamic = "force-static"

export function GET() {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Pascal Heue — Dev Log",
    home_page_url: `${siteUrl}/log`,
    feed_url: `${siteUrl}/feed.json`,
    description:
      "Fortschritte, Entscheidungen und Learnings aus meinen Projekten.",
    language: "de-DE",
    authors: [
      {
        name: "Pascal Heue",
        url: siteUrl,
      },
    ],
    items: getLogEntries().map(entry => {
      const url = `${siteUrl}/log/${entry.slug}`

      return {
        id: url,
        url,
        title: entry.title,
        summary: entry.summary,
        content_text: entry.body,
        date_published: `${entry.publishedAt}T00:00:00.000Z`,
        tags: entry.tags,
      }
    }),
  }

  return Response.json(feed, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  })
}
