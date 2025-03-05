# Pascal Heue Portfolio

Ein minimalistisches, responsives Portfolio mit Next.js, MDX und TailwindCSS, das meine Projekte und Blogbeiträge präsentiert.

## Überblick

Dieses Portfolio wurde mit modernen Technologien entwickelt und bietet eine benutzerfreundliche Oberfläche mit:

- Dynamischen Projektübersichten und detaillierten Projektseiten
- Blogbereich für Artikel zu Entwicklungsthemen
- Responsive Design für alle Geräte (Mobile-First Ansatz)
- Light- und Dark-Mode
- Animierte UI-Elemente für ein verbessertes Benutzererlebnis
- Optimierte Performance durch Next.js

## Tech Stack

- **Next.js**: React-Framework mit SSR und SSG Unterstützung
- **MDX**: Ermöglicht die Nutzung von React-Komponenten in Markdown-Dateien
- **TailwindCSS**: Utility-first CSS-Framework für flexibles Styling
- **shadcn/ui**: Anpassbare UI-Komponenten-Bibliothek
- **Aceternity UI**: Dynamische UI-Komponenten und Animationen
- **TypeScript**: Typsicherheit für robuste Codestruktur

## Features

- **Dynamischer Content**: Blog- und Projektinhalte werden aus MDX-Dateien generiert
- **Modales Routing**: Verbesserte Nutzererfahrung durch Modal-basierte Navigation
- **Preloading**: Strategisches Vorladen von Inhalten für schnellere Navigation
- **Lesemarker**: Visuelle Anzeige des Lesefortschritts in Artikeln
- **Kontaktformular**: Einfache Kontaktmöglichkeit
- **Animierte UI-Elemente**: Bento-Grid, Flip Words, Timeline und mehr

## Projektstruktur

```
app/              # Next.js App-Router Dateien und Seiten
components/       # React-Komponenten
content/          # MDX-Dateien für Projekte und Blogbeiträge
contexts/         # React Context-Provider
hooks/            # Custom React-Hooks
lib/              # Hilfsfunktionen und Utilities
public/           # Statische Assets wie Bilder
```

## Lokale Entwicklung

Installiere die Abhängigkeiten:

```bash
npm install
# oder
yarn install
# oder
pnpm install
```

Starte den Entwicklungsserver:

```bash
npm run dev
# oder
yarn dev
# oder
pnpm dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser, um das Ergebnis zu sehen.

## Deployment

Das Projekt ist für das Deployment auf Vercel optimiert. Es kann mit wenigen Klicks über die [Vercel Platform](https://vercel.com) deployt werden.

Verbinde dein GitHub-Repository mit Vercel für automatisierte Deployments bei jedem Push:

1. Importiere das Repository auf Vercel
2. Vercel erkennt automatisch die Next.js-Konfiguration
3. Das Projekt wird gebaut und deployed

## Performance-Optimierungen

Das Projekt enthält mehrere Optimierungen für eine bessere Benutzererfahrung:

- Preload-Strategien für wichtige Seiten und Inhalte
- Optimierte Bildladezeiten mit next/image
- Modale Navigation mit verbesserten Übergangsanimationen
- Code-Splitting und dynamisches Laden von Komponenten

## Lizenz

© Pascal Heue. Alle Rechte vorbehalten.
