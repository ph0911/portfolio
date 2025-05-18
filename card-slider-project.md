Perfekt, ich analysiere nun dein GitHub-Repository „ph0911/portfolio“, insbesondere in Bezug auf:

1. Die aktuelle Projekt-Darstellung und wie die Datenstruktur aufgebaut ist.
2. Die bestehende Mobile-Bottom-Sheet-Animation und allgemeine Animationskonzepte (z. B. Framer Motion Nutzung).
3. Die aktuelle Design-Systematik, Light/Dark-Mode-Handhabung, UI-Entscheidungen sowie die branch `ui/redesign`.

Darauf aufbauend erarbeite ich einen Vorschlag, wie du das neue „Projekt-Slider-Feature“ sowohl für Mobile (mit Swipe- und Loop-Animation) als auch Desktop (ästhetisch skalierbar) sinnvoll implementieren kannst – mit strukturierten Erklärungen, Codebeispielen und Begründungen. Ich melde mich, sobald die Analyse abgeschlossen ist.


# Analyse der aktuellen Implementierung

## Projektübersicht (Datenhaltung und Anzeige)

Die Portfolio-App organisiert **Projektinhalte** als MDX-Dateien im Verzeichnis `content/projects`. Jedes Projekt enthält Meta-Daten (Titel, Zusammenfassung, Bild, Datum etc.) im Frontmatter. Beim Build werden diese MDX-Dateien mittels Gray-Matter ausgelesen und in Objekte überführt. Eine Hilfsfunktion `getProjects()` liest alle Projekt-Metadaten ein und sortiert sie nach Datum, während `getProjectBySlug()` den Inhalt und Metadaten eines einzelnen Projekts lädt. **Vorteil:** Die Projekte sind als **strukturierte Daten** verfügbar (Typ `ProjectMetadata`), was die Trennung von Inhalt und Präsentation ermöglicht.

Für die **Darstellung** der Projekte nutzt das Portfolio einen zweistufigen Ansatz:

* **Bento-Grid für Highlight-Projekte:** Die neuesten oder wichtigsten Projekte (standardmäßig vier) werden in einem **Bento-Grid** Layout präsentiert. Dieses Grid ist in `RecentProjects` implementiert und basiert auf einer speziellen Komponente `BentoGrid`. Die Grid-Komponente erzeugt ein ansprechendes Mosaik: auf Mobilgeräten eine einspaltige Liste, ab `sm` zwei Spalten und ab `md` drei Spalten. Bestimmte Kacheln spannen über zwei Spalten, um visuelle Hervorhebungen zu setzen – im Code wird z.B. für das erste und vierte Projekt `sm:col-span-2` gesetzt. Dadurch ergibt sich ein abwechslungsreiches Layout, das zentrale Projekte hervorhebt. Jede Projektkachel zeigt ein Bild mit überlagertem Verlauf und Text: Titel, kurze Summary und Tags. Ein semitransparenter **Gradient** (hell in Light-Mode, dunkel in Dark-Mode) wird über das Bild gelegt, um den weißen bzw. hellen Text lesbar zu machen. **Hover-Effekt:** Auf größeren Screens gibt es leichte Animationen – in der Bento-Kachel verschiebt sich der Text bei Hover minimal, und in der einfachen Projektliste zoomt das Projektbild sanft heran, während ein Overlay mit Projekttitel erscheint. Diese dezenten Effekte vermitteln Dynamik, ohne das minimalistische Design zu stören.

* **Liste weiterer Projekte:** Ältere oder weniger prominente Projekte werden unterhalb des Grids in einer schlichten Liste aufgeführt. Dies erfolgt z.B. auf der `/projects`-Seite mit dem Abschnitt **„Weitere Projekte“**. Hier nutzt man eine vertikale Liste (`<ul>`) von Listeneinträgen, jeweils mit einem kleinen Vorschaubild (rund, 60px) und den Textinfos daneben. Das Layout ist responsiv: das Vorschaubild wird nur ab `md` angezeigt (auf Mobilgerät verborgen), um Platz zu sparen. Titel und Beschreibung sind in einem flex-Container angeordnet, sodass auf größeren Screens das Datum rechts außen stehen kann. Diese Aufteilung bietet eine klare **visuelle Hierarchie** – die wichtigsten Projekte im aufmerksamkeitsstarken Grid, alle weiteren in einer geordneten, leicht scannbaren Liste. So bleibt die Übersicht übersichtlich und **minimalistisch**, im Sinne des Designs.

## Animationen und Interaktionen auf Mobilgeräten (Mobile „Bottom Sheet“)

Auf Mobilgeräten kommen spezialisierte UI-Patterns zum Einsatz, um trotz des minimalistischen Ansatzes eine gute Navigation und Feedback zu bieten. Ein zentrales Element ist das **Mobile-Navigationsmenü**, intern als *„Mobile Bottom Sheet“* bezeichnet. Implementiert ist es mit der `Sheet`-Komponente aus der shadcn/UI-Bibliothek (basierend auf Radix UI). Dieses **Bottom-Sheet** ist als seitlich einfahrende Leiste realisiert:

* **Aufbau der Bottom-Sheet Navigation:** In `MobileNavigation` wird ein `Sheet` mit `side="left"` verwendet, dessen Inhalt eine schmale vertikale Sidebar darstellt. Die Sidebar ist nur \~2.5rem breit (`w-10`) und hat einen halbtransparenten, verwischten Hintergrund (Tailwind-Klassen `bg-gray-100 bg-opacity-40 backdrop-blur-sm` bzw. entsprechende Dark-Mode-Klassen). Darin sind die Navigationslinks um -90° gedreht angeordnet, sodass der Text vertikal entlang der Leiste steht. Dieser Trick ermöglicht eine **platzsparende** Darstellung: im ausgeklappten Zustand sieht man nur eine schmale Leiste mit vertikalem Text „Projekte“, „Blog“, „Kontakt“. Durch Hover (bzw. auf Touch-Geräten durch die Position) bleibt der Text lesbar. Radix’ Sheet-Komponente übernimmt dabei die Ein- und Ausblend-Animation der Leiste (smoothes Hereinsliden von links), während Tailwind-Utility-Klassen für stilistische Details sorgen (z.B. **Weichzeichner**-Effekt im Hintergrund, leichte Ränder für Tiefenwirkung).

* **Öffnen/Schließen via Button und Swipe:** Damit das Mobile-Menü intuitiv zugänglich ist, gibt es zwei Mechanismen. Erstens einen **Toggle-Button** (Hamburger-Icon) im Header, der für mobile Sichtbarkeiten eingeblendet wird. Dieser Button (mit `aria-label="Toggle navigation"`) öffnet das Sheet mittels eines onClick-Handlers. Zweitens – und hier kommt eine Besonderheit – ist eine **Wischgeste** implementiert: Über den benutzerdefinierten Hook `useSwipe` im `MobileNavigationWrapper` wird ein horizontales Swipe erkannt, um die Sidebar ein- oder auszublenden. Konkret: ein Wischen vom linken Bildschirmrand nach rechts setzt `setNavOpen(true)` und fährt die Navigation heraus; umgekehrt schließt ein Swipe nach links das Menü wieder. Diese Gestensteuerung ahmt native Mobile-Drawer nach und erhöht die Usability (der Nutzer kann die Navigation aufrufen, ohne den kleinen Button exakt treffen zu müssen). Die Implementierung lauscht auf Touch-Start/-Move/-End am gesamten Wrapper-Div, sodass Wischgesten überall auf der Seite erkannt werden. Die Kombination aus Radix Sheet (für die eigentliche Animation und Accessibility) und eigenem Swipe-Hook (für Gesten) zeigt, dass hier **bestehende Lösungen** mit **Custom-Logik** ergänzt wurden – Radix liefert robuste Grundfunktionalität, während die App-spezifische UX (Wischgeste zum Öffnen) individuell hinzugefügt wurde.

* **Weitere mobile Interaktionen:** Über das Bottom Sheet hinaus gibt es eine **Floating Action Bar** auf mobilen Geräten (im Code `FloatingDockMobile`). Diese „schwebende“ Leiste enthält Schnellzugriff-Icons (Home, Mail, LinkedIn, Xing, GitHub) und wird unten rechts als runder Button dargestellt. Beim Antippen entfaltet sich der Button in mehrere übereinanderstehende Icon-Buttons – hierbei kommt **Framer Motion** zum Einsatz: Die Icons werden in einer `<AnimatePresence>`-Liste mit `motion.div` einzeln animiert ein- und ausgeblendet. Jedes Icon fade-in/slide-in mit einem leichten Versatz und zeitlich gestaffelt (über `transition` und Exit-Delays je nach Index). Das Ergebnis ist ein sanftes Auftauchen bzw. Zusammenklappen der Schnellzugriffs-Icons, was einen modernen, flüssigen Eindruck vermittelt. Warum dieser Aufwand? Er passt zur **minimalistischen Philosophie** – anstatt eine permanente, raumgreifende Footer-Leiste zu zeigen, wird eine kontextuelle Lösung gewählt: ein einzelner Button, der bei Bedarf die Optionen preisgibt. Die Animationen (Größenveränderung des Buttons-Symbols von einem Pfeil-Icon `IconFoldUp/Down`, sowie das Erscheinen der Links) geben klares Feedback über den Zustand (geöffnet/geschlossen) und wirken **spielerisch**, ohne die Seitenfunktion zu beeinträchtigen.

* **Desktop-Animationen als Kontrast:** Zum Vergleich sei erwähnt, dass auf Desktop die `FloatingDockDesktop` Komponente ein besonderes Hover-Interaction-Pattern implementiert – angelehnt an das macOS Dock. Dabei wird mit Framer Motion `useMotionValue` und `useTransform` die Mausdistanz zu jedem Icon gemessen, um dessen Größe dynamisch zu interpolieren. So vergrößern sich Icons unter dem Mauszeiger (von 40px auf \~60px Durchmesser) und schrumpfen entfernte wieder. Zusätzlich blendet ein Tooltip mit dem Titel bei Hover ein. Diese ausgefeilte Animation zeigt die generelle Herangehensweise im Code: **Framer Motion** wird gezielt eingesetzt, um interaktive Effekte zu erzielen, die mit CSS allein schwer umsetzbar wären. Auf mobilen Geräten bleiben solche aufwendigen Hover-Effekte aus (da Hover dort nicht verfügbar ist), aber für Desktop steigert es die **Usability** (schnelles Erkennen der Icons) und gibt dem ansonsten schlichten Design eine hochwertige Note. Insgesamt nutzt das Projekt also einen **Mix aus CSS-Transitions und Framer-Motion-Animationen**: simple Hover-Zustände (z.B. Bild zoomt bei Hover) werden mit Tailwind-Utilities und Transition-Klassen erreicht, während komplexere, zustandsabhängige Animationen (Floating Dock, Sidebar-Einblendung) über Framer Motion bzw. Radix gesteuert werden.

## Design-Systematik (minimalistisches Design, Light/Dark-Mode, Komponenten)

Das Portfolio verfolgt ein **minimalistisches Design** mit Fokus auf Typografie, Raum und zurückhaltenden Farben. Die Umsetzung stützt sich stark auf TailwindCSS Utility-Klassen und ein konfiguriertes Design-System:

* **Farbschema und Minimalismus:** In der Tailwind-Konfiguration sind benutzerdefinierte CSS-Variablen für Farben definiert (z.B. `--background`, `--foreground`, `--card`, etc.), die über Utility-Klassen wie `bg-background` oder `text-foreground` verwendet werden. Diese Variablen werden vermutlich durch das Design-System (shadcn/ui) initialisiert. Dadurch bleibt die Farbpalette konsistent und leicht anpassbar. Im Light-Mode dominieren helle Hintergründe (weiß/hellgrau) mit dunkler Schrift; im Dark-Mode umgekehrt. Das Design nutzt viele Grautöne statt bunter Farben – z.B. `text-gray-600 dark:text-gray-300` für sekundären Text – was **ruhig** und professionell wirkt. Flächen sind oft semi-transparent und verwischt (z.B. Navbar-Hintergrund `bg-background/75 backdrop-blur-sm`), was einen modernen Touch gibt und gleichzeitig Inhalte hervorhebt, weil der Hintergrund zurücktritt. **Komponenten wie Karten oder Modals sind abgerundet** (`rounded-lg` oder stärker `rounded-3xl`) und haben subtile Schatten/Ränder (im FloatingDock z.B. leichte Border und Shadow), was dem Flat Design etwas Tiefe verleiht. Insgesamt spiegelt die Seite eine klare, **aufgeräumte Ästhetik** wider – keine überfrachteten Elemente, viel Whitespace und einheitliche Stilmittel.

* **Light- und Dark-Mode Implementierung:** Die Webseite unterstützt Dunkelmodus und Hellmodus vollständig. Dies wird mithilfe des `next-themes` Paket realisiert: In `components/providers.tsx` ist ein `<ThemeProvider attribute="class" ...>` konfiguriert. Dadurch wird je nach gewähltem Theme ein entsprechendes Klassenattribut (standardmäßig `class="dark"` für Dark-Mode) auf `<html>` gesetzt. Tailwind ist in der `tailwind.config.ts` entsprechend auf **`darkMode: ['class']`** gestellt, sodass all seine `dark:`-Variant-Klassen auf diese HTML-Klasse reagieren (statt z.B. dem prefers-color-scheme Media-Query). Mit diesem Setup kann die App den Modus programmatisch umschalten. Im Header gibt es einen Theme-Toggle-Button, der via `useTheme()` den aktuellen Modus kennt und mittels `setTheme(...)` zwischen 'light' und 'dark' wechselt. **Technisch:** Beim ersten Render wartet die Komponente, bis das Theme geladen ist (State `mounted` stellt sicher, dass kein falsches Icon vor dem Hydratisieren angezeigt wird). Ein Klick toggelt dann den Modus und damit die `<html>`-Klasse. **Styling im Dark-Mode:** Dank Tailwind sind viele Styles direkt dual ausgeführt – z.B. Buttons verwenden `bg-gray-100 dark:bg-gray-800` etc., Texte `dark:text-white` oder `dark:text-gray-400` wo nötig. Offizielle Tailwind-Doku betont diese Nutzung der `dark:` Varianten, um mit minimalem Aufwand ein Dark-Design zu ermöglichen. Im Ergebnis wechselt die Seite nahtlos das Farbschema, was auch im Komponenten-Code sichtbar ist (häufige Verwendung von Dark-Varianten). Wichtig zu erwähnen: Durch die CSS-Variablen werden sogar komplexere Komponenten global umgefärbt – z.B. `bg-card` referenziert `--card`, welches in Light vs Dark unterschiedlich definiert ist. Somit bleibt der **minimalistische Look** in beiden Modi konsistent erhalten.

* **Komponentenstruktur und Wiederverwendung:** Das Projekt hat eine klar strukturierte Komponentenhierarchie. Viele **UI-Grundbausteine** sind in `components/ui/` abgelegt – dazu zählen z.B. Button, Badge, Sheet, Timeline etc. Diese wurden offenbar mit shadcn/UI (einer Sammlung von vorgefertigten Tailwind+Radix-Komponenten) erstellt, was Konsistenz in Abständen, Farben und Verhalten garantiert. Beispielsweise wird überall der gleiche Button-Stil verwendet (`<Button variant='ghost' size='sm'>` im Header für den Menü-Button oder im ThemeToggle). Änderungen am Button-Style würden sich global auswirken. **Komplexere Bereiche** der Seite (z.B. die Sektion „Intro“, „SkillsSection“, „RecentProjects“, „Header“, „Footer“) sind als eigenständige Komponenten im `components/` Verzeichnis implementiert und setzen sich aus UI-Bausteinen zusammen. Dieses **Komposition**-Prinzip erleichtert Wartung und Erweiterung: Die `RecentProjects`-Komponente z.B. nutzt intern `BentoGrid` und `BentoGridItem` (UI-Komponenten) und orchestriert nur das Laden der Projektedaten sowie das Hinzufügen des "Alle Projekte"-Links. So bleibt die Logik (Daten holen, filtern) getrennt vom reinen Markup für eine Kachel. Insgesamt folgt das System dem Gedanken eines **Design Systems**: Einheitliche Styles (Farben, Typografie – z.B. einheitliche Font-Families via Next.js Fonts), gekapselte UI-Elemente und responsive Utility-Klassen stellen sicher, dass das Erscheinungsbild stimmig und **skalierbar** ist.

# Konzept: Neuer **Karten-Slider** (Feature-Entwurf)

Auf Basis der bestehenden Struktur soll ein **Karten-Slider** im Stil der Revolut-Beispiele implementiert werden. Dieses Feature würde interaktive Karteikarten (z.B. für Finanzübersichten oder andere Inhalte) darstellen. Wichtig sind ein responsives Verhalten und geschmeidige Animationen, die sich nahtlos ins bestehende minimalistische Design einfügen. Im Folgenden werden **Komponentenaufbau**, **Datenmodell**, **Swipe-Logik**, **Animationen**, **Desktop- vs. Mobile-Verhalten** sowie **Dark/Light-Mode** Überlegungen erläutert – jeweils mit *Was*, *Warum* und *Wie*.

## Komponentenstruktur

**Was:** Wir schlagen eine eigenständige React-Komponente `<CardSlider>` vor, die den gesamten Slider mitsamt Logik kapselt. Darin rendert sie eine Liste von **Karten-Komponenten** (`<Card>`), die jeweils eine einzelne „Karte“ repräsentieren. Jede Karte enthält z.B. ein Hintergrundbild oder -farbe, einen Titel, optional einen Untertitel oder Betrag und ggf. ein kleines Info-Panel am unteren Rand (analog den Revolut-Screenshots, wo unten eine Transaktionsinfo angezeigt wird).

**Warum:** Die Trennung in `CardSlider` (Container mit State/Logik) und `Card` (Präsentation einer einzelnen Karte) erhöht die Wiederverwendbarkeit und Klarheit. Die `<Card>`-Komponente kann einfach gestaltet und auch außerhalb des Sliders benutzt oder getestet werden. Der Slider verwaltet die Indizes, Animationen und Benutzerinteraktionen, ohne vom Darstellungs-Markup der Karte abgelenkt zu sein.

**Wie (Aufbau & Code):**

* `CardSlider` wird als **Client Component** implementiert (weil interaktive Animationen und stateful logic benötigt werden). In Next.js 13 markiert man sie mit `'use client'` am Anfang der Datei, ähnlich wie bei bestehenden interaktiven Komponenten (z.B. `ThemeToggle`).

* Innerhalb von `CardSlider` verwenden wir einen State für den aktuellen Index der aktiven Karte, z.B. `const [currentIndex, setCurrentIndex] = useState(0)`. Außerdem erhalten wir die Daten der Karten als Prop oder holen sie ggf. via Hook. Das **Datenmodell** kann ein einfaches Array von Objekten sein, z.B.:

  ```ts
  type CardData = {
    id: string;
    title: string;
    subtitle?: string;
    amount?: string;
    imageUrl?: string;
    // ...weitere Felder nach Bedarf, z.B. Farbe, Icon etc.
  };
  const cards: CardData[] = [
    { id: 'card1', title: 'Privat', amount: '6.012 €', subtitle: 'Konten', imageUrl: '/images/card1.jpg', info: 'Gehalt\nHeute, 11:28\n+2.550€' },
    { id: 'card2', title: 'Privat', amount: '2.350 €', subtitle: 'Konten', imageUrl: '/images/card2.jpg', info: 'Haushaltsrechnungen\nHeute fällig\n-225€' },
    // ... weitere Karten
  ];
  ```

  Jedes Karten-Objekt enthält die anzuzeigenden Inhalte. Wir verwenden eine **eindeutige ID** für stabile Key-Zuweisungen in React (wichtig beim animierten Wechsel, damit React Karten nicht verwechselt).

* JSX-Struktur von `CardSlider` (vereinfacht):

  ```jsx
  <div className="relative overflow-hidden">
    {cards.map((card, index) => (
      <Card 
        key={card.id} 
        data={card} 
        isActive={index === currentIndex} 
        isPrev={index === (currentIndex - 1 + cards.length) % cards.length} 
        isNext={index === (currentIndex + 1) % cards.length}
      />
    ))}
    {/* Optionale Navigationselemente (z.B. Pfeile oder Dots) */}
  </div>
  ```

  Hier umschließen wir alle Karten in einem Container (`relative overflow-hidden`), der die Sichtbarkeit begrenzt (nur der Ausschnitt für die Karten). Jede `<Card>` erhält Props, die ihren Status relativ zum aktuellen Index anzeigen (aktive Karte, vorherige, nächste). Man kann auch anstelle von isPrev/isNext den Index an die Card geben und relative Position berechnen – je nach Animationsstrategie (dazu mehr im nächsten Abschnitt). Wichtig ist: **nur 3 Karten** (die aktuelle und die beiden Nachbarn) werden voll sichtbar sein; die anderen liegen außerhalb des Sichtbereichs oder werden via CSS/Animation ausgeblendet. Dieses Mapping erlaubt auch ein einfaches Hinzufügen/Entfernen von Karten aus dem Datensatz, ohne die Logik zu ändern.

* Die `<Card>`-Komponente selbst rendert die in `CardData` enthaltenen Informationen im gewünschten Layout. Beispielsweise:

  ```jsx
  function Card({ data, isActive, isPrev, isNext }) {
    return (
      <div className="card relative w-4/5 max-w-xs aspect-[3/5] mx-auto">
        {/* Hintergrundbild */}
        {data.imageUrl && (
          <Image src={data.imageUrl} alt={data.title} fill className="object-cover rounded-2xl" />
        )}
        {/* Gradient-Overlay und Inhalte */}
        <div className="absolute inset-0 
                        bg-gradient-to-b from-transparent via-white/20 to-white/60 dark:via-black/30 dark:to-black/60 
                        backdrop-blur-[2px] rounded-2xl pointer-events-none">
          {/* ... dieser halbtransparente Verlauf stellt sicher, dass Text lesbar ist */}
        </div>
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-foreground">{data.title}</h3>
          {data.amount && <p className="text-lg font-semibold">{data.amount}</p>}
          {data.subtitle && <p className="text-sm font-light text-muted-foreground">{data.subtitle}</p>}
          {/* Unteres Info-Panel, z.B. Kontobewegung */}
          {data.info && (
            <div className="mt-3 rounded-lg bg-card/90 px-3 py-2 text-sm">
              {data.info.split('\n').map(line => <p key={line}>{line}</p>)}
            </div>
          )}
        </div>
      </div>
    );
  }
  ```

  Dieses Markup ist ein Beispiel: Wir setzen die Card auf \~80% der Containerbreite (`w-4/5 max-w-xs` etwa) und definieren ein festes Seitenverhältnis (z.B. 3:5) für konsistente Kartenhöhen. Die Inhalte (Titel, Betrag etc.) werden am unteren Rand der Karte platziert, ähnlich den Revolut-Layouts. Ein **Gradient-Overlay** (weiß zu transparent, im Dark-Mode schwarz zu transparent) mit `backdrop-blur` liegt über dem Bild, um Kontrast für den Text zu schaffen – analog zum bestehenden Bento-Grid-Item. Das Info-Panel unten (weißer Kasten mit Text) erhält `bg-card/90`, was im Light-Mode ein nahezu weißer, im Dark-Mode ein dunkler Hintergrund ist. Damit folgen wir dem vorhandenen Design-Token für Kartenhintergründe und achten auf **Zugänglichkeit** (90% Deckkraft + abgerundete Ecken sorgen für Lesbarkeit und Ästhetik).

## Swipe-Logik mit Framer Motion

**Was:** Die Kernfunktion auf Mobilgeräten ist das **Wischen** durch die Karten. Nutzer sollen per Swipe-Geste nach links/rechts zur nächsten bzw. vorherigen Karte gelangen. Dies soll flüssig und mit Schleifenfunktion („endloser“ Slider) ablaufen, d.h. nach der letzten Karte kommt wieder die erste von links herein.

**Warum:** Ein Swipe bietet die natürlichste Interaktion für Karussell-artige Inhalte auf Touch-Geräten. Statt Buttons zu klicken, kann der Benutzer direkt den Inhalt verschieben – ein deutlich besseres UX insbesondere bei visuellen Karten. Die Endlos-Schleife verhindert Sackgassen im Slider: Man kann in eine Richtung unbegrenzt weiterwischen, ohne manuell zurückspringen zu müssen, was das **Entdecken aller Karten** fördert.

**Wie:** Wir nutzen **Framer Motion** für die Drag-Interaktion, da es dafür ausgelegt ist und direkt Physik (Trägheit) mitbringt. Konkret werden wir den Container der Karten (`motion.div`) mit `drag="x"` ausstatten, sodass dieser horizontal ziehbar ist. Standardmäßig animiert Framer Motion das Loslassen mit Schwung als Inertia (Momentum) weiter – das heißt, ein kräftiger Swipe lässt die Karte weitergleiten, was sehr natürlich wirkt. Wir können diese Trägheit nutzen und auswerten, wie weit bzw. in welche Richtung geswipt wurde, um dann den Slide-Wechsel einzuleiten.

**Konzept für die Umsetzung:**

* **Drag-Ereignis abfangen:** Am `motion.div` Container hängen wir einen `onDragEnd`-Callback ein, der die Drag-Richtung und -Distanz analysiert. Framer Motion liefert im Event `info.offset.x` oder `info.velocity.x` mit, wodurch wir erkennen können, ob nach links oder rechts gewischt wurde und ob es über einem Schwellenwert liegt. Beispiel:

  ```jsx
  <motion.div drag="x" onDragEnd={(e, info) => {
    if (info.offset.x < -100 || info.velocity.x < -300) {
      // Swipe nach links (nächste Karte)
      setCurrentIndex(prev => (prev + 1) % cards.length);
    } else if (info.offset.x > 100 || info.velocity.x > 300) {
      // Swipe nach rechts (vorherige Karte)
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    }
    // falls kleiner Swipe: kein Indexwechsel (Snap back)
  }}>
    { /* Card items */ }
  </motion.div>
  ```

  Hier definieren wir Schwellwerte: z.B. mehr als \~100px Verschiebung oder eine hohe Wisch-Geschwindigkeit löst den Wechsel aus. Andernfalls „schnappt“ die Karte wieder zurück zur Ausgangsposition. Framer ermöglicht es auch `dragMomentum={false}` zu setzen, wenn man das automatische Weitergleiten unterbinden wollte, aber in diesem Fall wollen wir das Momentum beibehalten, um den **Swipe-Effekt** physikalisch wirken zu lassen (Karten rutschen zum nächsten Snap-Punkt).

* **Animation des Kartenwechsels:** Sobald `currentIndex` geändert wird, müssen die Karten entsprechend neu positioniert werden. Hier gibt es mehrere Ansätze:

  1. **Kontinuierliches Draggen des gesamten Tracks:** Man könnte alle Karten nebeneinander in einer Reihe anordnen (z.B. per flex) und den ganzen Track mit Framer Motion verschieben. Bei einem Indexwechsel würde dann der Track entweder per `animate` zum nächsten Snap gliden, oder wir lassen es ganz dem Drag-Momentum über. Für einen **endlosen** Slider würde man den Track in zwei Sets der Karten duplizieren und beim Übergang vom letzten zum ersten die Position jumpen (dieser Trick wird oft für infinite Carousels genutzt). Das ist relativ aufwändig in der Berechnung der Offsets.
  2. **Diskreter Kartenwechsel mit AnimatePresence:** Ein alternativer Ansatz ist, jeweils **nur drei Karten im DOM** zu haben (aktuelle, vorherige, nächste) und beim Indexwechsel per Framer Motion die ausgehende Karte nach links wegzuschieben und eine neue Karte rechts einzublenden (oder vice versa). Dies kann man mit `AnimatePresence` und Variants gestalten: die „verlassende“ Karte bekommt z.B. Variant `{ x: -100%, opacity: 0}` und wird dann unmounted, während die neue Karte mit `{ x: 100%}` reinkommt und auf `{ x: 0, opacity: 1}` animiert. Vorteil: Man hat jederzeit nur wenige DOM-Elemente und kann die **Unendlichkeit** leicht handhaben, indem man beim letzten Index einfach wieder die erste Karte als „nächste“ einfügt.
  3. **Hybrid-Variante (empfohlen):** Da bereits im FloatingDock Ähnliches getan wurde – dort werden ja mehrere Elemente in Abhängigkeit von `mouseX` transformiert – könnten wir auch für die Karten einen **transformationsbasierten Ansatz** nutzen: Alle Karten werden absolut positioniert im Slider-Container, und wir berechnen für jede einen Ziel-Offset (z.B. die aktive Karte hat `translateX(0)`, die vorherige `-100%` und die nächste `+100%` relativ zur Mitte). Diese Offsets kann man in Framer Motion als **Animate-Prop** oder via Variants ansteuern. Beim Indexwechsel ändern sich die Offsets, und Framer animiert die entsprechenden Karten dorthin. So bewegen sich alle relevanten Karten gleichzeitig. Die „nicht benachbarten“ Karten (weiter zurück oder voraus) können wir ausblenden (opacity 0 oder `display: none`), damit sie nicht störend sind.

Um es greifbar zu machen, ein möglicher Variant-Entwurf:

```js
const variants = {
  enterFromRight: { x: '100%', scale: 0.66, opacity: 0 },
  center:        { x: '0%',    scale: 1,    opacity: 1 },
  exitToLeft:    { x: '-100%', scale: 0.66, opacity: 0 }
};
```

Jede `<Card>`-Komponente bekommt je nach ihrem Status (prev/current/next) eine dieser Variant-Zuweisungen. Die aktive Karte liegt auf `center`, Nachbarn auf den Offscreen-Positionen links/rechts (mit kleinerem Scale = 66%). Beim Wechsel aktualisiert der Parent den `currentIndex`, woraufhin jede Karte ein neues Variant zugewiesen bekommt. Framer Motion animiert den Übergang automatisch mit sanften Standard-Easing. So wandert z.B. die ehemals rechte Karte ins Zentrum und skaliert dabei von 0.66 auf 1, während die alte mittlere nach links raus gleitet und schrumpft. Diese Bewegungen können wir mit Spring-Transitions verfeinern (z.B. `transition: { type: "spring", stiffness: 300, damping: 30 }` für ein leicht federndes Einrasten). Wichtig: Die Karten sollten auch die **Z-Ebene** berücksichtigen – i.d.R. will man die aktive Karte oben halten. Das lässt sich über CSS `z-index` steuern, z.B. aktive Karte `z-10`, Seitenkarten `z-0`, damit Überlappungen (falls z.B. leichte Rotation oder Überschneidung) korrekt dargestellt werden.

* **Endlos-Schleife:** Mit dem obigen Variant-Ansatz ist das Endlos-Prinzip einfach: Durch den Modulo-Index (`(index ± 1 + cards.length) % cards.length`) wird der Index bei Überschreitung automatisch wieder an den Anfang/Ende gesetzt (ein ähnliches Muster sieht man in getPrev/getNext Nutzung). Die **AnimatePresence-Methode** kann man nutzen, um am Ende der Liste nicht hart umzublenden: Man könnte z.B., sobald `currentIndex` von 0 auf `cards.length-1` springt (oder umgekehrt), die Animation so gestalten, dass es wie ein kontinuierlicher Fluss wirkt. Ein üblicher Trick ist, die erste Karte ans Ende zu duplizieren, so dass optisch eine Anschlusskarte vorhanden ist, und nach dem Animationsende den Index zu resetten. In unserem Fall ist es einfacher: wir animieren immer relative Positionen. Wenn `currentIndex` von z.B. 4 auf 0 springt (letzte Karte zu erster Karte), interpretieren die Variants das so, dass die „nächste Karte“ rechts erscheint – was ja die Karte 0 ist – und von rechts nach Mitte fährt. Die vorherige Karte (4) verlässt nach links. Für den Nutzer sieht das wie ein Loop aus, da sofort die Karte 0 als neue Next-Karte genutzt wird. In anderen Worten, der Modulo-Index sorgt bereits für die zyklische Nutzung der Daten im State; wir müssen nur darauf achten, dass **keine spürbare Pause/Lücke** entsteht. Mit Framer Motion sind State-Änderungen grundsätzlich animierbar, solange die Komponenten persistieren. Hier hilft ggf. `layout` oder `layoutId`, aber da wir feste Variants haben, geht es auch so.

Zusammenfassend: Die Swipe-Logik benutzt **Framer Motion Draggable** für die Eingabe und eine Variant-/State-Animation für den eigentlichen Kartenwechsel. Dieses Vorgehen passt zur bisherigen Code-Philosophie, Animationen deklarativ zu steuern (siehe z.B. `whileDrag` oder `onDrag` Patterns in Framer). Es gewährleistet flüssige Übergänge und nutzt Hardwarebeschleunigung (CSS transform), was für mobile Performance wichtig ist.

## Animationen und visuelle Effekte

**Was:** Der Karten-Slider soll nicht nur static wechseln, sondern mit ansprechenden **Animationen** überzeugen. Dazu zählen das **Scalen** der Nachbarkarten, sanftes **Einfaden/Ausfaden**, ggf. ein **Snap-Effekt** beim Loslassen und kleine Details wie Schattenänderungen.

**Warum:** Animationen erfüllen hier zwei Zwecke: Zum einen erhöhen sie die Usability, indem sie den Nutzer visuell führen (man sieht, welche Karte aktiv ist und wo die nächste herkommt). Zum anderen machen sie die Interaktion “greifbar” und elegant – passend zum hochwertigen, modernen Eindruck des Portfolios. Wichtig ist, dass die Animationen **unaufdringlich** bleiben, um das minimalistische Design nicht zu gefährden. Sie sollen **Geschmeidigkeit** vermitteln (die App fühlt sich reaktionsschnell an) und **Kontext** geben (z.B. wohin die Karte gewischt wurde).

**Wie:**

* **Skalierung und Opazität:** Wie bereits angedeutet, werden die seitlichen Karten standardmäßig um ca. **33% kleiner** dargestellt (Scale \~0.66) und leicht transparent (z.B. Opacity 0.8). Die zentrale Karte ist Scale 1 und vollständig deckend. Diese Unterschiede können wir **statisch via CSS** (für die Ausgangspositionen) und **dynamisch via Framer Motion** (für die Übergänge) kombinieren. Beispielsweise könnte die `.card`-CSS-Klasse der nicht-aktiven Karten bereits `scale-75` (75% Größe) enthalten, und beim Aktivieren entfernen wir das via Motion-Animation. Alternativ – und präziser – regeln wir Scale komplett über Framer Variants wie oben gezeigt. Während der **Drag-Bewegung** lässt sich sogar live reagieren: Framer Motion erlaubt es, `useMotionValue` und `useTransform` zu nutzen, um z.B. den **Abstand der Karte zur Mitte** in eine Scale umzuwandeln. In unserem Fall können wir z.B. die X-Verschiebung des Slider-Containers nutzen, um benachbarte Karten proportional zu skalieren, solange der Nutzer zieht. Einfacher ist jedoch, während des Draggens keine live-Skalierung zu machen (das könnte komplex werden), sondern beim **DragEnd** die Transition vorzunehmen (dann “springen” die Karten in ihre Zielgröße, was aber durch Spring-Animation weich wirkt).
* **Übergangseffekte:** Wir wählen für die Kartenwechsel eine **Feder-Animation** (Spring), ähnlich wie bei nativen iOS/Android-Interaktionen. In Framer Motion kann man das mit `transition={{ type: "spring", stiffness: 500, damping: 40 }}` z.B. erreichen. Das Resultat: die Karte schnellt zügig in die Mitte und schwingt minimal nach, was ein angenehmes Gefühl eines einrastenden Elements gibt. Framer’s Standard beim Drag reicht oft schon aus (es nutzt inertia + spring für Boundaries). Man kann aber Feintuning betreiben, z.B. `dragElastic={0.2}` um das Element weniger aus dem Bereich ziehen zu lassen, falls man Drag-Beschränkungen hat.
* **Depth-Indication:** Die aktive Karte könnte mit **einem kleinen Schatten** oder durch Ebenen-Vorsprung hervorgehoben werden. Etwa: `.active { box-shadow: 0 8px 16px rgba(0,0,0,0.15) }`. Die seitlichen Karten dagegen etwas flacher (kleinerer Schatten oder gar keiner). Dieser Unterschied vermittelt, dass die mittlere Karte “oben” liegt. Wir können den Schattenwechsel ebenfalls animieren (Framer kann CSS-Box-Shadow nicht direkt interpolieren, aber man könnte mit opacity eines pseudo-elements arbeiten, oder einfach via Tailwind-Klassen toggeln, was instant wäre – hier ist Feintuning gefragt).
* **Karten-Ein-/Austritt:** Beim **ersten Laden** des Sliders kann man eine Intro-Animation erwägen: z.B. die mittlere Karte leicht von unten hereinfallen lassen oder von Scale 0.9 auf 1 wachsen lassen, um die Aufmerksamkeit darauf zu lenken. Da die Seite aber insgesamt Inhalte meist ohne extra Intro-Animation anzeigt (der Stil ist eher *calm*), könnte man es auch schlicht halten – die Karten sind initial statisch da. Entscheidet man sich für einen Intro-Effekt, sollte er **kurz und subtil** sein (z.B.  fade-in + slide-up von 20px über 0.3s).
* **Benutzer-Feedback:** Eine kleine, aber wichtige Animation ist das **„Zurückfedern“** bei zu kleinem Swipe. Wenn der Nutzer kurz antippt und nicht weit genug wischt, soll die Karte in ihre Ausgangslage zurückgleiten. Framer Motion macht das automatisch, wenn man den Index nicht ändert – das Element mit `drag` kehrt mittels Federanimation an seinen Ursprung (0) zurück, weil wir keine Index-Änderung triggern. Dieses Verhalten ist out-of-the-box vorhanden (solange `dragMomentum` nicht false ist und `dragConstraints` entsprechend gesetzt sind, was wir hier gar nicht nutzen, da Endlos). Dieses Feedback zeigt: *“Aktion war nicht stark genug”*.
* **Zusätzliche Hinweise:** Wir könnten kleine **Pagination Dots** unter dem Slider platzieren (drei Punkte, wie auf dem Screenshot angedeutet【1†】). Diese zeigen, welche Karte aktiv ist (z.B. aktiver Punkt in `text-foreground`, andere in `text-muted`). Diese Dots kann man ebenfalls animiert aktualisieren (z.B. Fade oder Position), aber auch statisch belassen. Sie dienen primär der Orientierung. Im minimalistischen Design sind solche Indikatoren hilfreich, sollten aber dezent sein (klein und evtl. im Footer-Bereich der Slider-Sektion).
* **Performance:** Alle Animationen sind GPU-beschleunigt (Translate, Scale, Opacity), was auf Mobilgeräten wichtig ist. Wir vermeiden z.B. aufwendige Box-Shadow-Interpolationen im großen Stil. Bei sehr vielen Karten sollte man überlegen, nicht alle Offscreen-Karten gleichzeitig im DOM zu halten. Aber da unser Slider vermutlich eine überschaubare Anzahl (z.B. 5-10 Karten) hat, ist das unkritisch.

Zusammengefasst sorgen gut abgestimmte Animationen dafür, dass der Slider **lebendig und intuitiv** wirkt, ohne vom Inhalt abzulenken. Die Verwendung von Framer Motion garantiert konsistente Timing-Funktionen und erleichtert komplexe Effekte (wie simultanes Verschieben + Skalieren), die mit reinen CSS-Keyframes aufwendiger wären. Auch offizielle Framer Motion Beispiele demonstrieren, wie Drag-Handling und Animation zusammenspielen, z.B. dass ein Element beim Drag automatisch momentum-animiert und man `onDragEnd` zum Umschalten von Komponenten nutzen kann. Wir nutzen diese Mechanismen voll aus.

## Responsives Verhalten (Mobile vs. Desktop)

**Was:** Der Karten-Slider soll auf **verschiedenen Bildschirmgrößen** angemessen funktionieren. Auf Mobilgeräten wie beschrieben via Swipe-Gesten – hier steht die **Interaktion** im Vordergrund. Auf Desktop hingegen ist genug Platz, mehrere Karten gleichzeitig zu zeigen, und Wischgesten sind dort unüblich. Daher soll die Desktop-Variante eine **andere Navigation** bieten, z.B. durch Pfeil-Klick oder Scrollen, und mehr Karten auf einmal sichtbar machen.

**Warum:** Die Nutzererwartung unterscheidet sich je nach Gerät. Mobile Nutzer möchten horizontal scrollbare Inhalte per Finger bewegen; Desktop-Nutzer erwarten oft entweder Scrollbalken oder Buttons (da sie mit Maus oder Trackpad arbeiten). Zudem kann man am großen Bildschirm mehr als eine Karte zeigen, ohne die Darstellung zu überfrachten – das bietet einen sofortigen Überblick. Somit verbessert eine adaptierte Darstellung die **Usability und Nutzung der verfügbaren Fläche**.

**Wie (mobile Ansicht):** Auf **kleinen Viewports** (z.B. `max-width: 768px`) bleibt der bereits beschriebene Swipe-Slider aktiv. CSS-seitig können wir dafür sorgen, dass immer eine Karte im Zentrum und links/rechts leicht sichtbar ist:

* Wir könnten dem Slider-Container einen horizontalen **Padding** geben (z.B. `px-4`), damit an den Rändern etwas Platz ist und die nächste Karte „reinlugt“.
* Alternativ wird die Card-Größe (80% Breite) dafür sorgen, dass automatisch links und rechts \~10% des Containers frei bleiben, wo die Nachbarkarten erscheinen.
* Per CSS Media Queries (Tailwind: `md:` Prefix) können wir **Drag** auf Desktop deaktivieren. Das könnte so geschehen, dass wir in JSX z.B. `drag={isMobile ? "x" : false}` setzen (mit Hilfe von `useMediaQuery` oder einfachen CSS-Klassen, wobei Drag enable/disable eher in JS entschieden wird). Oder wir nutzen zwei verschiedene Renderings: eine `<MobileCardSlider>` und `<DesktopCardSlider>` Logik unter der Haube, die je nach Breakpoint sichtbar/hidden sind. Um es einfach zu halten, kann man auch denselben Komponenten nutzen, aber auf Desktop `pointer-events: none` auf den Drag-Layer geben, sodass Swipe nicht greift.
* **Touch-Optimierungen:** Wichtig für mobile ist `touch-action: pan-y` oder `none` auf dem Slider-Element, damit das Wischen nicht mit dem Seitenscroll kollidiert. Framer Motion setzt evtl. `touch-action: none` automatisch auf draggable Elements, was verhindert, dass der Browser z.B. die horizontale Geste als Back-Navigation interpretiert (besonders auf iOS muss man aufpassen). In jedem Fall sollten wir CSS `overflow-x-hidden` setzen, um visuelles Überschießen zu vermeiden.

**Wie (Desktop Ansicht):** Ab einem gewissen Breakpoint (z.B. `md` oder `lg`) ändern wir das Layout:

* Die Karten können verkleinert dargestellt werden, sodass z.B. **drei Karten nebeneinander** komplett sichtbar sind (ähnlich dem zweiten Revolut-Screenshot【2†】). Beispielsweise könnten wir auf Desktop `.card { width: 300px; }` fixieren und den Slider-Container so breit machen, dass drei Karten + Abstände reinpassen.
* **Navigation:** Da Swipe hier wegfällt, bieten sich zwei Varianten an:

  1. **Scrollen mit Snap:** Wir können den Container scrollbar machen (`overflow-x-auto`) und CSS **Scroll-Snap** verwenden. Tailwind bietet Utilities `snap-x` (für horizontalen Snap) und z.B. `snap-center` für die Kinder. So kann der Nutzer mittels Mausrad oder Trackpad horizontal scrollen; sobald er loslässt, snappt die nächste Karte zentriert. Dieses Verfahren ist naturnah (viele kennen horizontales Scrollen z.B. von Bildergalerien) und erfordert keine neuen Buttons. Wir können es kombinieren mit sichtbaren Scroll-Indikatoren oder Pfeilen, falls gewünscht, aber es funktioniert auch allein. Code-Beispiel:

     ```jsx
     <div className="hidden md:flex overflow-x-auto snap-x snap-mandatory scroll-smooth">
       {cards.map(card => (
         <div key={card.id} className="snap-center px-4">
           <Card data={card} />
         </div>
       ))}
     </div>
     ```

     Hier haben wir bewusst das mobile `<motion.div drag="x">` auf `md:hidden` gesetzt und stattdessen diese `md:flex` Variante eingeblendet. Jedes Card-Item ist ein normaler `<div>` mit `snap-center`, so wird es beim Scroll zentriert eingerastet. `scroll-smooth` sorgt dafür, dass z.B. ein Klick auf Pfeil oder Dot (die via JS `scrollIntoView` auslösen könnten) ebenfalls animiert scrollt.
  2. **Pfeilnavigation/Paginierung:** Wir können links/rechts Buttons über dem Slider einblenden (nur Desktop sichtbar), die bei Klick `setCurrentIndex(currentIndex ± 1)` machen und so den gleichen Mechanismus wie mobile triggern – dann würden die Karten via Framer Motion animiert wechseln, aber eben auf Button-Klick. Das Verhalten wäre analog dem Swipe, nur gesteuert per Klick. Das ist klassische Karussell-Navigation. Alternativ oder ergänzend lassen sich **Pagination-Dots** darstellen (wie erwähnt). Ein aktiver Dot, klickbar für Direktsprung, etc.
* **Mehr als drei Karten:** Falls z.B. 5 Karten vorhanden sind, können wir auf Desktop **alle in einer Reihe** anzeigen (je nach verfügbarem Platz evtl. 4 oder 5 nebeneinander). Revolut scheint in seinem Layout alle verfügbaren Karten gezeigt zu haben, weil drei da waren. In unserem Konzept könnten wir sagen: Zeige max. 3 auf einmal, die restlichen muss man horizontal scrollen. Scroll-Snap sorgt dafür, dass man nicht irgendwo in der Mitte einer Karte bleibt, sondern immer bündig abschließt.
* **Keine Drag-Duplikate nötig:** Mit der Scroll-Lösung können wir den Endlos-Loop auf Desktop vernachlässigen – Nutzer können ja jederzeit zurückscrollen. Ein Loop wäre hier visuell irritierend (wenn man ans Ende scrollt und plötzlich wieder Anfang käme). Stattdessen kann man das Ende schlicht markieren (z.B. letzte Karte dann keine weitere rechts).
* **Adaptive Komponente:** Man könnte `CardSlider` so bauen, dass es beide Modi intern handhabt. Z.B. ein CSS `@media (pointer: fine)` (Desktop) könnte `drag: false` setzen. Simpler: Wir verwenden denselben JSX und steuern per Tailwind:

  * Auf Desktop: `motion.div` könnte weiterhin existieren, aber `drag` wird per Prop deaktiviert, und wir fügen `md:overflow-x-auto md:snap-x md:snap-mandatory` auf das Element. So wird es zum Scroll-Container auf Desktop. Die `<Card>`-Breite kann mit `md:w-auto md:mx-0` angepasst werden (z.B. feste px statt relative).
  * Die Framer-gestützte Index-Logik könnten wir auf Desktop tatsächlich umgehen, indem wir erlauben, dass alle Karten sichtbar sind. In dem Fall müsste `currentIndex` nicht benutzt werden (oder bleibt auf 0). Hier bietet sich fast an, mobil und desktop als zwei getrennte Patterns zu behandeln, um Komplexität zu reduzieren.

**Warum diese Herangehensweise:** Sie nutzt **progressive enhancement** – auf mobilen Geräten der optimierte Swipe, auf Desktop der intuitive Scroll/Click. Beide Varianten respektieren das **Prinzip des minimalistischen Designs**: keine überladenen Controls auf Mobile, keine erzwungene Drag-Interaktion auf Desktop (wo es unüblich ist). Zudem bleiben wir nah an Web-Standards: CSS Scroll Snap ist performant und einfach, Framer Motion Drag fängt Touch-Events robust ab (inkl. Inertia). Diese Kombination deckt die gängigen Use-Cases ab und orientiert sich an bekannten Patterns (Revolut selbst würde am Desktop vermutlich auch alle Karten nebeneinander zeigen, ggf. mit Pfeilen).

## Dark-/Light-Mode-Styling

**Was:** Der Karten-Slider muss in **beiden Design-Modi** ansprechend aussehen. Dazu gehören Farben (Hintergründe, Texte) und Bilder. Die Revolut-ähnlichen Karten enthalten teils Fotos – diese bleiben natürlich gleich, aber die **Überlagerungen und Texte** darauf müssen je nach Modus angepasst sein, damit Lesbarkeit und Ästhetik stimmen.

**Warum:** Ein zentrales Feature des Portfolios ist der Dark-Mode. Alle neuen Komponenten müssen konsistent damit funktionieren, um ein nahtloses Nutzererlebnis zu bieten. Nichts wirkt unausgereifter, als ein Feature, das im Dark-Mode „blendet“ oder falsch formatiert ist. Außerdem sollen wir die existierende **Design-Systematik** nutzen – d.h. vorhandene Farb-Utilities, Variablen und Komponenten – statt eigene Farben hart zu codieren. So bleibt das Erscheinungsbild stringent.

**Wie:** Zum Glück können wir uns stark an den bestehenden Stilen orientieren:

* **Hintergründe:** Verwenden wir `bg-card` für Kartenflächen, `bg-background` für neutrale Flächen. In Tailwind sind diese bereits als CSS-Variable (`--card`, `--background`) hinterlegt, die im Dark-Mode umdefiniert werden. Unsere `<Card>`-Komponente im Beispiel oben nutzt z.B. `bg-card/90` für das Info-Panel – im Light-Mode ist das ein weiß/transparenter Kasten, im Dark-Mode wird `--card` dunkler sein (vermutlich ein Grauton), sodass das Panel dunkler erscheint, analog zum allgemeinen UI (im Code sehen wir z.B. `bg-gray-100 dark:bg-gray-800` an vielen Stellen als Muster).
* **Texte:** Verwenden wir bevorzugt die Utility `text-foreground` für primären Text (diese mappt zu `--foreground` und ist in Dark-Mode automatisch hell). Sekundäre oder gedimmte Texte können `text-muted-foreground` nutzen, ebenfalls via CSS-Variable konfiguriert. Im Card-Beispiel haben wir das schon so vorgesehen (Titel `text-foreground`, Untertitel `text-muted-foreground`). Dadurch passt sich die Schriftfarbe automatisch dem Modus an, genau wie im restlichen Portfolio.
* **Overlay/Gradient:** Wie beim Bento-Grid setzen wir einen Verlauf über die Kartenbilder, der im Light-Mode hell ist (weiß mit Transparenz) und im Dark-Mode dunkler (schwarz mit Transparenz). Im Code oben sieht man `via-white/20 to-white/60 dark:via-black/30 dark:to-black/60`. Dieser Gradient sorgt dafür, dass egal ob das Bild hell oder dunkel ist, der Text darüber genug Kontrast hat. Diese Technik wurde bereits an anderen Stellen genutzt, weil reine weiße Schrift auf hellen Bildstellen im Light-Mode unleserlich wäre – mit der halbtransparenten weißen Schicht wird das Bild abgeblendet. Im Dark-Mode umgekehrt mit Schwarz. Dies ist eine **einfache, aber effektive** Lösung, offizielle Empfehlungen für Bild-Text-Kontrast gehen ebenfalls in Richtung „lege dunkle/helle Overlays auf Bilder“.
* **Icons/Farben:** Sollte die Karte Icons enthalten (z.B. ein Symbol neben "Privat" oder so), nutzen wir möglichst **unabhängige Farben**. Revolut hat z.B. runde Kategorie-Icons (im Screenshot ein lila Symbol für "Gehalt", ein blaues Haus für "Haushaltsrechnungen"). Diese Farben sollten wir entweder aus dem vorhandenen Tailwind-Farbspektrum wählen (z.B. `text-purple-500` etc.) oder als Teil der Daten definieren. Wichtig: Im Dark-Mode könnten grelle Farben auf dunklem Grund sehr leuchten; man kann ggf. dunklere Schattierungen wählen oder ebenfalls leicht transparent zeichnen. Alternativ belässt man die Icons einheitlich (z.B. alle in `text-foreground`), um das Design clean zu halten. Hier würde man sich am bestehenden Design orientieren – momentan verwendet das Portfolio farbige Icons z.B. bei Tech-Stacks oder nicht? (Im FloatingDock sind die Icons grau im Light- und hellgrau im Dark-Mode gehalten – sehr dezent). Für Konsistenz könnten wir die Karten-Icons also auch monochrom (Foreground-Farbe) halten, es sei denn, man möchte gezielt Farbakzente.
* **Zustandsfarben:** Sollte der Slider z.B. aktive vs. inaktive Dots haben, nehmen wir vermutlich `bg-foreground` für den aktiven und `bg-muted` für inaktive (die `muted` Farbe ist im Light hellgrau, im Dark dunkelgrau, also gut für passive Indikatoren).
* **Beispiel Dark-Mode Code:**

  ```jsx
  <h3 className="text-gray-900 dark:text-gray-100 ...">{data.title}</h3>
  ```

  Dies würde den Titel im Light-Mode dunkelgrau (nahe schwarz), im Dark-Mode weiß anzeigen. Da wir aber `text-foreground` (was intern ähnliches tut) nutzen können, bleibt es inhaltlich gleich, aber ausdrucksstärker im Code:

  ```jsx
  <h3 className="text-foreground">{data.title}</h3>
  ```

  (Im Tailwind-Setup des Projekts ist `foreground` auf passende Werte gesetzt). Gleiches gilt für Hintergrund: anstatt explizit `bg-white dark:bg-gray-800` zu schreiben, nehmen wir `bg-card`, das automatisch hell/dunkel ist.
* **Testen auf beiden Themes:** Dank Next-Themes können wir lokal im Browser den Dark-Mode toggeln (oder OS setting), und die Komponente sollte sofort umschalten. Da wir nur vorhandene Farb-Utilities nutzen, erwarten wir keine Probleme. Falls die Kartenbilder selbst im Dark-Mode zu grell wirken, könnte man überlegen, im Dark-Mode das `to-black/60` Overlay etwas stärker zu machen (z.B. 80%). Oftmals lässt man es aber gleich und vertraut darauf, dass der generelle Page-Hintergrund dunkel ist, wodurch helle Bildbereiche nicht so blendend wirken. Bei kritischen Fällen kann man die Variablen nutzen – z.B. `--card-foreground` etc. –, aber vermutlich reicht unser Ansatz.

Abschließend lässt sich sagen, dass das neue Karten-Slider-Feature durch konsequente **Nutzung des bestehenden Design-Systems** nahtlos integriert werden kann. Komponentenstruktur und Datenanbindung lehnen sich an vorhandene Muster (Listen mit map, modulare UI-Komponenten) an. Die Swipe-Logik nutzt bewährte Framer-Motion-Prinzipien, wie sie im Projekt bereits punktuell eingesetzt werden, nun jedoch gebündelt für ein zentrales interaktives Element. Offizielle Ressourcen wie die **Framer Motion Doku zu Drag** bestätigen, dass mit `drag="x"` und Inertia standardmäßig ein realistisches Swipe-Verhalten erzielt wird. Ebenso erleichtern Tailwinds **responsive Utilities und Dark-Varianten** es, mit wenig Aufwand das Layout für verschiedene Geräte und Themes anzupassen.

**Fazit:** Der vorgeschlagene Karten-Slider bietet einen **Mehrwert** in der Darstellung (hervorstechende, interaktive Karten), bleibt aber den Prinzipien des bestehenden Portfolios treu: *minimalistisches Design* (klare Geometrie, wenige Bedienelemente), *responsiv und touch-optimiert* (Swipe auf Mobile, Scroll/Pfeile auf Desktop) und *technologisch konsistent* (Tailwind + Framer Motion + shadcn/UI). Durch gut strukturierte Komponenten und Nutzung vorhandener Patterns (Gradient-Overlay, Theme-Toggling, AnimatePresence-Transitions) lässt sich das Feature schrittweise implementieren und bei Bedarf anpassen – etwa falls die Anzahl der Karten oder ihr Inhalt variiert. So fügt sich der Revolut-inspirierte Slider harmonisch in die Portfolio-Seite ein und unterstreicht zugleich den modernen, professionellen Charakter der Webpräsenz.
