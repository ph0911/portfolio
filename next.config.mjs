import { dirname } from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/projects/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
      {
        source: "/posts/:slug",
        destination: "/log/:slug",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/posts",
        destination: "/log",
        permanent: true,
      },
      {
        source: "/profil",
        destination: "/about",
        permanent: true,
      },
    ]
  },
  async headers() {
    const isProduction = process.env.VERCEL_ENV === "production"
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "connect-src 'self'",
          "font-src 'self' data:",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "img-src 'self' data: blob:",
          "object-src 'none'",
          `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
          "style-src 'self' 'unsafe-inline'",
        ].join("; "),
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
    ]

    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          ...(isProduction
            ? []
            : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ]
  },
}

export default nextConfig
