import type { LogEntryType, ProjectStatus } from "@/lib/content"

const projectStatusLabels: Record<ProjectStatus, string> = {
  active: "In Entwicklung",
  origin: "Origin Story",
  lab: "Lab",
  archive: "Archiv",
}

const logTypeLabels: Record<LogEntryType, string> = {
  progress: "Fortschritt",
  decision: "Entscheidung",
  release: "Release",
  learning: "Learning",
  experiment: "Experiment",
  note: "Notiz",
}

export function getProjectStatusLabel(status: ProjectStatus) {
  return projectStatusLabels[status]
}

export function getLogTypeLabel(type: LogEntryType) {
  return logTypeLabels[type]
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(new Date(`${date}T12:00:00Z`))
}
