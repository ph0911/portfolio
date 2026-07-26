import { AboutSection } from "@/components/home/about-section"
import { FocusSection } from "@/components/home/focus-section"
import { Hero } from "@/components/home/hero"
import { LogSection } from "@/components/home/log-section"
import { WorkSection } from "@/components/home/work-section"
import {
  getFeaturedProjects,
  getProjects,
  getRecentLogEntries,
} from "@/lib/content"

export default function HomePage() {
  const projects = getProjects()
  const featuredProjects = getFeaturedProjects()
  const recentEntries = getRecentLogEntries(4)
  const focusProject =
    projects.find(project => project.slug === "evo-ios") ?? projects[0]

  return (
    <>
      <Hero />
      {focusProject ? <FocusSection project={focusProject} /> : null}
      <WorkSection projects={featuredProjects} />
      <LogSection entries={recentEntries} projects={projects} />
      <AboutSection />
    </>
  )
}
