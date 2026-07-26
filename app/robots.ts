import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/private/"],
    },
    sitemap: "https://www.pascalheue.dev/sitemap.xml",
    host: "https://www.pascalheue.dev",
  }
}
