# Portfolio V2 · Architektur

## Zielbild

Portfolio V2 trennt kuratierte Langform-Cases von einem leichten, laufenden Dev
Log. Beide Content-Typen liegen versioniert im Repository und werden beim Build
streng validiert. Damit bleibt die ausgelieferte Website statisch, während neue
Updates ohne lokalen Editor möglich sind.

## Content-Fluss

```text
GitHub Issue Form
  → content:inbox
  → manuelle Freigabe mit content:publish
  → Autor-, Feld-, URL- und MDX-Validierung
  → deterministische Datei in content/log
  → Production-Build und Deployment
```

Das Entfernen von `content:publish` entfernt ausschließlich den aus diesem Issue
erzeugten Eintrag. Dateien werden über `sourceIssue` zugeordnet; der Prozess ist
idempotent.

## Laufzeitgrenzen

- Seiten, Cases, Log, Sitemap, RSS und JSON Feed werden statisch erzeugt.
- Ein kleiner Client-Button unterstützt nur den Browser-Druck des Resume.
- Es gibt keine Datenbank, keinen Runtime-CMS-Client und keinen Form-Endpunkt.
- Externe Profile sind normale Links und werden nicht eingebettet.
- Content-Dateien dürfen keine vertraulichen IDs, Schlüssel, Kundendaten oder
  persönliche Gesundheits- und Finanzdaten enthalten.

## Qualität und Performance

`npm run check` prüft Quellcode, Typen, Content-Schemas, Publishing-Sicherheit,
Privacy-Grenzen, Production-Build und statische Asset-Budgets. Die gleichen
Prüfungen laufen bei Pull Requests und Pushes auf `main`.

Die Budgets begrenzen das gesamte statische Build-Paket, das pro Route
ausgelieferte JavaScript einschließlich gemeinsamer Next.js-Chunks, lokale Fonts
und die maximale Größe einzelner Assets. Das Route-Budget wird auf den
komprimierten gzip-Transfer angewendet. Anpassungen an den Grenzen müssen
gemeinsam mit einer begründeten Architekturänderung reviewt werden.

## Betrieb

GitHub ist Redaktions-Inbox und Source of Truth; Vercel liefert die bestehende
Next.js-Site aus. Das Publishing benötigt keine zusätzliche SaaS-Laufzeit. Nach
der ersten Aktivierung muss geprüft werden, ob direkte Bot-Pushes auf `main` das
Production-Deployment auslösen; falls nicht, ist der Content-Workflow auf einen
expliziten Deployment-Hook oder einen Pull-Request-Fluss umzustellen.
