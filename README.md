# Pascal Heue · Living Dev Space

Die zweite Version meines Portfolios ist kein statischer Bewerbungskatalog,
sondern ein öffentlicher Arbeitsraum: ausgewählte Produkte, kurze Fortschritte
und nachvollziehbare Entscheidungen. Der berufliche Backbone bleibt über About
und Resume erhalten.

## Prinzipien

- **Mobile first:** klare Informationshierarchie, native Navigation und große
  Interaktionsflächen ohne clientseitiges Menü-Framework.
- **Content im Alltag:** Dev-Log-Einträge entstehen mobil als GitHub Issue und
  werden erst nach einem manuellen Publish-Label veröffentlicht.
- **Statisch und schnell:** Projekte und Log werden beim Build aus validiertem
  MDX erzeugt. Nur der Druck-Button im Resume benötigt Client-JavaScript.
- **Privacy by default:** keine Besucheranalyse, keine Marketing-Cookies, kein
  Kontaktformular und keine eingebetteten Social-Media-Inhalte.
- **Ohne laufende Zusatzkosten:** Git, GitHub Actions und das vorhandene
  Vercel-Hosting bilden den gesamten Publishing-Weg.

## Lokale Entwicklung

```bash
npm ci
npm run dev
```

Die vollständige Qualitätsprüfung umfasst Lint, TypeScript, Content- und
Security-Tests, Production-Build und Bundle-Budgets:

```bash
npm run check
```

## Struktur

```text
app/                  Seiten, Feeds und SEO-Endpunkte
components/           fokussierte Server- und UI-Komponenten
content/projects/     kuratierte Projekt-Cases
content/log/          kurze, chronologische Dev-Log-Einträge
lib/content/          Zod-Schemas und Content-Selektoren
scripts/dev-log/      sichere Issue-zu-MDX-Pipeline
tests/                Content-, Publishing- und Privacy-Tests
```

Das technische Modell ist in [`docs/architecture.md`](docs/architecture.md)
beschrieben. Der mobile Publishing-Ablauf steht in
[`docs/publishing.md`](docs/publishing.md).
