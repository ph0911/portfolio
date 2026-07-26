# Dev-Log veröffentlichen

Der Dev-Log nutzt GitHub Issues als mobile Inbox. Ein Eintrag wird erst durch
ein separates Label bewusst veröffentlicht. Es ist kein CMS, Konto oder
kostenpflichtiger Dienst notwendig.

## Ablauf auf iPhone oder in GitHub Mobile

1. Im Repository **Issues → New issue → Dev-Log-Eintrag** öffnen.
2. Typ, Projekt, Titel, Zusammenfassung, Details und Tags ausfüllen. Der Link
   ist optional.
3. Das Issue erstellen. GitHub vergibt automatisch `content:inbox`; online
   erscheint noch nichts.
4. Den Text im Issue prüfen und anschließend `content:publish` hinzufügen.
5. Die Action validiert den Inhalt, schreibt oder aktualisiert die MDX-Datei auf
   `main` und kommentiert den erfolgreichen Sync. Das Issue bleibt geöffnet.

Änderungen an einem bereits veröffentlichten Issue werden erneut synchronisiert,
solange `content:publish` gesetzt ist. Wird dieses Label entfernt, löscht die
Action ausschließlich den zugehörigen generierten Dev-Log-Eintrag.

## Labels und Berechtigungen

- `content:inbox`: Entwurf aus dem Issue Form; wird nach erfolgreichem Sync
  entfernt.
- `content:publish`: manuelle Freigabe und alleiniger Auslöser für eine
  Veröffentlichung.
- Nur Issues des GitHub-Accounts `ph0911` dürfen publiziert werden.
- Installation und Qualitätsprüfung laufen ohne persistierte
  Checkout-Credentials in einem Read-only-Job. Erst ein davon abhängiger
  Publish-Job erhält Schreibrechte für Repository-Inhalte und Issues; sein Token
  steht nur den Push- und GitHub-CLI-Schritten zur Verfügung.

Die beiden Labels müssen vor dem Rollout einmalig im Repository angelegt werden.
Danach kann der Workflow zunächst mit einem Test-Issue geprüft und anschließend
regulär genutzt werden.

## Validierung und Fehlerverhalten

Pflichtfelder, Längen, Tags, Autor und URLs werden vor einer Content-Änderung
geprüft. Inline-Links akzeptieren ausschließlich `http://` und `https://`.
Referenzlinks werden als Text behandelt, Bilder grundsätzlich neutralisiert.
HTML, MDX-Ausdrücke und geschweifte Klammern werden ebenfalls neutralisiert;
einfaches Markdown einschließlich Zwischenüberschriften in den Details bleibt
erhalten. Dateizugriffe für Publikationen sind auf `content/log` begrenzt.

Bei einem Fehler stoppt die Action ohne Commit, Erfolgs-Kommentar oder
Entfernung des Inbox-Labels. Die Fehlermeldung steht im Action-Log; nach
Korrektur kann das Issue erneut bearbeitet oder das Publish-Label neu gesetzt
werden. Anhänge und über GitHub hochgeladene Bilder werden absichtlich nicht
unterstützt.

## Deployment-Hinweis

Die Action pusht direkt auf `main`. Vercel muss Pushes des GitHub-Actions-Bots
als Production-Deployment akzeptieren. Bei geschütztem `main` braucht der
Workflow eine passende Branch-Rule-Ausnahme; andernfalls schlägt nur der Push
fehl und der Eintrag geht nicht live. Es entstehen keine zusätzlichen Dienste
oder laufenden Kosten.
