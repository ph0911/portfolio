import assert from "node:assert/strict"
import test from "node:test"
import nextConfig from "../next.config.mjs"

test("legacy project details map to retained replacement pages", async () => {
  const redirects = await nextConfig.redirects()
  const destinations = new Map(
    redirects.map(({ source, destination }) => [source, destination]),
  )
  const expected = {
    "/projects/minimalistisches-portfolio": "/work/portfolio-v1",
    "/projects/pinder-cases-webseite": "/work/pinder-digital-brand",
    "/projects/pinder-elektrotechnik-webseite": "/work/pinder-digital-brand",
    "/projects/pinder-gmbh-corporate-design": "/work/pinder-digital-brand",
    "/projects/pinder-gmbh-webseite": "/work/pinder-digital-brand",
    "/projects/pinder-veranstaltungstechnik-webseite":
      "/work/pinder-digital-brand",
  }

  for (const [source, destination] of Object.entries(expected)) {
    assert.equal(destinations.get(source), destination)
  }
})

test("unknown retired details fall back to their collection", async () => {
  const redirects = await nextConfig.redirects()
  const destinations = new Map(
    redirects.map(({ source, destination }) => [source, destination]),
  )

  assert.equal(destinations.get("/projects/:slug"), "/work")
  assert.equal(destinations.get("/posts/:slug"), "/log")
})
