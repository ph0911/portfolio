import type { MetadataRoute } from "next"
import { getLogEntries, getProjects } from "@/lib/content"

const siteUrl = "https://www.pascalheue.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/log`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/resume`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
  ]
  const projects: MetadataRoute.Sitemap = getProjects().map(project => ({
    url: `${siteUrl}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.6,
  }))
  const logEntries: MetadataRoute.Sitemap = getLogEntries().map(entry => ({
    url: `${siteUrl}/log/${entry.slug}`,
    lastModified: `${entry.publishedAt}T00:00:00.000Z`,
    changeFrequency: "never",
    priority: 0.6,
  }))

  return [...staticPages, ...projects, ...logEntries]
}
