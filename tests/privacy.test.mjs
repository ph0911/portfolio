import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const packageJson = JSON.parse(await readFile("package.json", "utf8"))
const layout = await readFile("app/layout.tsx", "utf8")

test("keeps visitor tracking and form processors out of the website", () => {
  const dependencies = packageJson.dependencies ?? {}

  assert.equal(dependencies["@vercel/analytics"], undefined)
  assert.equal(dependencies["@vercel/speed-insights"], undefined)
  assert.equal(dependencies.resend, undefined)
  assert.doesNotMatch(layout, /Analytics|SpeedInsights/)
})
