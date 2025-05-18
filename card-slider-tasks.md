Hier ist die überarbeitete Schritt-für-Schritt-Anleitung, die auf dein Deep Research und deine Codebase zugeschnitten ist:

-----

## Schritt 1: Datenmodell anpassen (falls nötig) und verstehen

  * **Task:** Überprüfen, ob das bestehende `ProjectMetadata` aus `lib/projects.ts` alle notwendigen Felder für die Karten im Slider enthält oder ob minimale Anpassungen sinnvoll sind.

  * **Erklärung:**
    Dein Deep Research (`card-slider-project.md`) beschreibt das Datenmodell für die Karten. Da der Slider deine Projekte darstellen soll, werden wir primär die bestehende `ProjectMetadata` Struktur aus `lib/projects.ts` nutzen. Felder wie `title`, `summary`, `image`, `slug` und `tags` sind bereits vorhanden und ideal für die Karten. Das Revolut-Design dient als Vorlage für Layout und Animation, nicht für den Inhalt.

      * Der Abschnitt "Konzept: Neuer Karten-Slider -\> Komponentenstruktur" im Deep Research schlägt eine `CardData` vor. Wir mappen dies auf deine `ProjectMetadata`.
      * Felder wie `subtitle` oder ein spezifisches `info`-Panel auf der Karte können aus vorhandenen `ProjectMetadata`-Feldern (z.B. `category` oder `summary`) abgeleitet oder als optionale, neue Felder im Frontmatter deiner Projekt-MDX-Dateien hinzugefügt werden, falls du detailliertere Infos direkt auf der Karte anzeigen möchtest, die über den Standard `title` und `summary` hinausgehen. Für eine Revolut-ähnliche Info-Box unten auf der Karte könnten das z.B. die `tags` oder ein kurzer prägnanter Satz sein.

  * **Zu modifizierende Datei (nur zur Überprüfung/ggf. minimalen Erweiterung):** `lib/projects.ts`

  * **Code (Beispielhafte Überprüfung/Anpassung):**

    Dein aktueller `ProjectMetadata` Typ in `lib/projects.ts` ist:

    ```typescript
    // lib/projects.ts
    export type ProjectMetadata = {
      title?: string;
      summary?: string;
      image?: string;
      author?: string; // Wird für die Karte ggf. nicht primär genutzt
      publishedAt?: string; // Wird für die Karte ggf. nicht primär genutzt
      slug: string;
      tags?: string[];
      // projectUrl?: string; // Könnte nützlich sein für einen "Details"-Button auf der Karte
    };
    ```

    Dieser Typ ist bereits sehr gut geeignet. Wir können `title` als Haupttitel der Karte, `summary` für eine kurze Beschreibung oder das Info-Panel und `image` für das Hintergrundbild der Karte verwenden. Die `tags` können ebenfalls auf der Karte angezeigt werden. Ein `projectUrl` (falls nicht schon vorhanden und genutzt) wäre sinnvoll für einen direkten Link, falls die Karte nicht nur zum `/projects/[slug]` routen soll.

    Wenn du spezifische Felder für die Kartenansicht möchtest, die sich vom Standard-`summary` oder den `tags` unterscheiden (z.B. ein sehr kurzer Teaser-Text oder eine Kategoriebezeichnung, die anders als die Tags ist), könntest du `ProjectMetadata` erweitern:

    ```typescript
    // lib/projects.ts (Optionale Erweiterung)
    export type ProjectMetadata = {
      title?: string;
      summary?: string;      // Hauptbeschreibung für die Projektseite
      image?: string;        // Hauptbild des Projekts
      author?: string;
      publishedAt?: string;
      slug: string;
      tags?: string[];
      projectUrl?: string;   // URL zum Live-Projekt oder Repo

      // Optionale Felder speziell für die Card-Slider-Darstellung
      cardCategory?: string; // z.B. "Webentwicklung", "UI Design" - könnte auch aus erstem Tag generiert werden
      cardTeaser?: string;   // Ein sehr kurzer Text für das Info-Panel auf der Karte
      cardImage?: string;    // Eigenes Bild für die Karte, falls abweichend vom Hauptbild
    };
    ```

  * **Hinweise/Empfehlungen:**

      * **Weniger ist mehr:** Für das minimalistische Design deines Portfolios ist es oft besser, mit den vorhandenen Feldern (`title`, `summary`, `image`, `tags`) zu arbeiten, um die Komplexität gering zu halten und die Datenpflege zu vereinfachen. `cardImage` ist nur nötig, wenn das Bild im Slider stark vom Detailbild abweichen soll. `cardCategory` und `cardTeaser` sind optional, wenn du spezifischere Texte auf den Karten möchtest als die allgemeinen Projektinfos.
      * Deine `getProjects()` Funktion in `lib/projects.ts` liest die Metadaten aus den MDX-Dateien. Wenn du neue Felder hinzufügst, müssen diese im Frontmatter der jeweiligen Projekt-MDX-Dateien (`content/projects/*.mdx`) gepflegt werden.
      * Für den Anfang empfehle ich, die bestehenden Felder `title`, `image` (als `cardImageUrl`), `summary` (ggf. gekürzt oder für das Info-Panel) und `tags` zu verwenden.

-----

## Schritt 2: `<ProjectSliderCard>` Komponente erstellen

  * **Task:** Erstelle die React-Komponente, die eine einzelne Projektkarte im Slider darstellt.

  * **Erklärung:**
    Diese Komponente ist für die visuelle Darstellung einer einzelnen Karte zuständig. Sie erhält die Projektdaten (`ProjectMetadata`) und einen Status (`isActive`) als Props. Das Design orientiert sich an den im Deep Research beschriebenen Revolut-Beispielen (Layout, Bild mit Overlay, abgerundete Ecken, Textplatzierung), aber mit Projektinhalten.

      * Das Deep Research (Abschnitt "Komponentenstruktur -\> Wie (Aufbau & Code) -\> Die `<Card>`-Komponente selbst") liefert hierfür eine gute Grundlage.

  * **Zu erstellende Datei:** `components/ui/ProjectSliderCard.tsx`

  * **Code:**

    ```tsx
    // components/ui/ProjectSliderCard.tsx
    "use client";

    import Image from 'next/image';
    import Link from 'next/link';
    import { motion } from 'framer-motion';
    import { ProjectMetadata } from '@/lib/projects';
    import { cn } from '@/lib/utils';
    import { Badge } from '@/components/ui/badge'; // Nutze deine bestehende Badge-Komponente

    interface ProjectSliderCardProps {
      project: ProjectMetadata;
      isActive: boolean;
    }

    const ProjectSliderCard: React.FC<ProjectSliderCardProps> = ({ project, isActive }) => {
      const {
        title,
        summary,
        image, // Hauptbild des Projekts wird für die Karte verwendet
        slug,
        tags,
        cardCategory, // Optionales Feld aus Schritt 1
        cardTeaser    // Optionales Feld aus Schritt 1
      } = project;

      const displayImageUrl = image || '/images/project-placeholder.jpg'; // Fallback-Bild sicherstellen

      // Bestimme den Text für das untere Info-Panel
      // Priorisiere cardTeaser, dann summary (gekürzt), dann Tags
      let infoPanelContent: React.ReactNode = null;
      if (cardTeaser) {
        infoPanelContent = <p className="text-xs text-neutral-200 dark:text-neutral-300 line-clamp-2">{cardTeaser}</p>;
      } else if (summary) {
        infoPanelContent = <p className="text-xs text-neutral-200 dark:text-neutral-300 line-clamp-2">{summary}</p>;
      } else if (tags && tags.length > 0) {
        infoPanelContent = (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 3).map((tag) => ( // Zeige max. 3 Tags im Info-Panel
              <Badge key={tag} variant="secondary" className="text-xs rounded-full bg-white/10 dark:bg-black/20 text-white dark:text-neutral-300 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        );
      }

      return (
        <motion.div
          className={cn(
            "relative w-[calc(100vw_-_64px)] sm:w-[320px] md:w-[350px] lg:w-[380px] aspect-[3/4.5] md:aspect-[3/4.2]", // Seitenverhältnis anpassbar
            "rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 cursor-grab group" // group für Hover-Effekte
          )}
          // Framer Motion Varianten werden vom Parent (CardSlider) gesteuert
        >
          <Link href={`/projects/${slug}`} className="block w-full h-full">
            {/* Hintergrundbild */}
            <Image
              src={displayImageUrl}
              alt={title || 'Projektbild'}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 320px, (max-width: 1024px) 350px, 380px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105" // Zoom-Effekt bei Hover
              priority={isActive}
            />

            {/* Gradient-Overlay gemäß Deep Research */}
            <div
              className={cn(
                "absolute inset-0 pointer-events-none",
                "bg-gradient-to-b from-transparent via-black/5 dark:via-black/20 to-black/60 dark:to-black/70" // Angepasster Gradient für Lesbarkeit
              )}
            />
             {/* Optional: Backdrop Blur, wie im Deep Research erwähnt */}
            <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />


            {/* Textinhalte */}
            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-white z-[3]">
              <div>
                {cardCategory && (
                  <span className="block text-xs font-medium text-amber-400 dark:text-amber-300 mb-1 uppercase tracking-wider">
                    {cardCategory}
                  </span>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-shadow-sm">
                  {title}
                </h3>
              </div>

              {/* Unteres Info-Panel */}
              {infoPanelContent && (
                <div className="mt-3 bg-black/30 dark:bg-black/50 backdrop-blur-md p-3 rounded-lg shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  {infoPanelContent}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      );
    };

    export default ProjectSliderCard;
    ```

  * **Hinweise/Empfehlungen:**

      * **Styling:** Die Klassen `w-[calc(100vw_-_64px)] sm:w-[320px]...` und `aspect-[3/4.5]...` sind anpassbar, um die gewünschten Kartenproportionen zu erzielen. Das `calc(100vw_-_64px)` für Mobile sorgt dafür, dass links und rechts etwas Platz bleibt, damit Nachbarkarten "peeken" können (32px Padding auf jeder Seite des Containers angenommen).
      * **Gradient & Blur:** Der Gradient (`bg-gradient-to-b...`) und der optionale `backdrop-blur-[1px]` wurden gemäß Deep Research und für gute Lesbarkeit auf verschiedenen Bildern gewählt. Teste dies mit deinen Projektbildern. Dein `bento-grid.tsx` verwendet bereits einen ähnlichen Gradienten.
      * **Info-Panel:** Das Info-Panel wird hier nur bei Hover auf der Karte eingeblendet (`opacity-0 group-hover:opacity-100`), um das Design im Ruhezustand cleaner zu halten, was zu deinem minimalistischen Ansatz passt. Das Deep Research zeigte ein permanentes Info-Panel. Du kannst das `opacity-0 group-hover:opacity-100` entfernen, wenn es immer sichtbar sein soll.
      * **`project.image` vs. `project.cardImage`:** Der Code verwendet `project.image`. Wenn du das optionale `cardImage`-Feld aus Schritt 1 nutzen willst, ändere `const displayImageUrl = image || ...` zu `const displayImageUrl = cardImage || image || ...`.
      * **`Badge` Komponente:** Ich habe deine bestehende `Badge` Komponente für die Darstellung von Tags im Info-Panel verwendet, falls `cardTeaser` und `summary` nicht vorhanden sind. Du kannst das Styling der Badges hier anpassen (`variant="secondary" bg-white/10...`).
      * **Text Shadow:** Ein leichter Textschatten (`text-shadow-sm` - musst du ggf. in deiner `tailwind.config.ts` definieren, z.B. unter `theme.extend.textShadow`) kann die Lesbarkeit von weißem Text auf komplexen Bildern verbessern.

-----

## Schritt 3: `<CardSlider>` Hauptkomponente erstellen

  * **Task:** Erstelle die Komponente, die den Slider und seine Logik (Navigation, Animation, Responsivität) verwaltet.

  * **Erklärung:**
    Diese Komponente, wie im Deep Research ("Konzept: Neuer Karten-Slider") ausführlich beschrieben, ist das Herzstück des Features. Sie lädt die Projektdaten, verwaltet den `activeIndex`, implementiert die Swipe-Funktionalität mit Framer Motion und steuert die Animationen der einzelnen Karten. Sie muss responsiv sein und den Dark/Light-Mode berücksichtigen.

      * **Swipe-Logik mit Framer Motion:** Das Deep Research empfiehlt `drag="x"` und `onDragEnd` für die Swipe-Geste. Die Animation der Karten (Position, Skalierung, Opazität) wird über Framer Motion Variants gesteuert, die sich ändern, wenn `activeIndex` aktualisiert wird.
      * **Animationen und visuelle Effekte:** Skalierung der Nachbarkarten, sanftes Ein-/Ausfaden und ein Snap-Effekt sind zentrale Elemente.
      * **Responsives Verhalten:** Mobile soll Swipe-basiert sein, Desktop könnte alternative Navigation (Pfeile) nutzen und mehr Karten gleichzeitig zeigen.
      * **Dark-/Light-Mode-Styling:** Nutzt die bestehenden Tailwind-Variablen.

  * **Zu erstellende Datei:** `components/ProjectCardSlider.tsx` (um Verwechslung mit anderen Slidern zu vermeiden)

  * **Code:**

    ```tsx
    // components/ProjectCardSlider.tsx
    "use client";

    import React, { useState, useRef, useEffect, useCallback } from 'react';
    import { motion, useAnimation, PanInfo } from 'framer-motion';
    import ProjectSliderCard from '@/components/ui/ProjectSliderCard';
    import { ProjectMetadata, getProjects } from '@/lib/projects';
    import { ArrowLeft, ArrowRight } from 'lucide-react';
    import { cn } from '@/lib/utils';
    import { useMobileViewportContext } from '@/contexts/mobile-viewport-context'; // Dein Hook für Mobile-Erkennung

    const CARD_GAP_MOBILE = 16; // px
    const CARD_GAP_DESKTOP = 24; // px
    const PEEK_OFFSET_MOBILE = 32; // px, wie viel Platz an den Seiten für das Peeking bleibt

    interface ProjectCardSliderProps {
      className?: string;
      sectionTitle?: string;
      sectionDescription?: string;
      maxProjects?: number; // Maximale Anzahl an Projekten im Slider
    }

    const ProjectCardSlider: React.FC<ProjectCardSliderProps> = ({
      className,
      sectionTitle = "Meine Projekte", // Titel anpassbar
      sectionDescription = "Eine Auswahl meiner Arbeiten – interaktiv erlebbar.", // Beschreibung anpassbar
      maxProjects = 7, // Standardmäßig bis zu 7 Projekte laden
    }) => {
      const [projects, setProjects] = useState<ProjectMetadata[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [activeIndex, setActiveIndex] = useState(0);
      const controls = useAnimation();
      const carouselWrapperRef = useRef<HTMLDivElement>(null);
      const dragConstraintsRef = useRef({ left: 0, right: 0 });

      const { isMobile, mounted } = useMobileViewportContext(); // Dein Hook

      // Lade Projekte
      useEffect(() => {
        const fetchProjectsData = async () => {
          setIsLoading(true);
          try {
            const fetchedProjects = await getProjects(maxProjects);
            const suitableProjects = fetchedProjects.filter(p => p.image || p.cardImage);
            setProjects(suitableProjects);
            if (suitableProjects.length > 0) {
                 // Starte in der Mitte, falls gewünscht und mehr als eine Karte vorhanden ist
                // setActiveIndex(Math.floor(suitableProjects.length / 2));
                setActiveIndex(0); // Oder starte immer mit der ersten Karte
            }
          } catch (error) {
            console.error("Fehler beim Laden der Projekte für den Slider:", error);
          }
          setIsLoading(false);
        };
        fetchProjectsData();
      }, [maxProjects]);

      // Berechne die Breite der Karten und die Constraints für das Dragging
      const [currentCardWidth, setCurrentCardWidth] = useState(300);
      const [currentGap, setCurrentGap] = useState(CARD_GAP_DESKTOP);

      useEffect(() => {
        if (!carouselWrapperRef.current || projects.length === 0) return;

        const wrapperWidth = carouselWrapperRef.current.offsetWidth;
        let newCardWidth;

        if (isMobile) {
          setCurrentGap(CARD_GAP_MOBILE);
          newCardWidth = wrapperWidth - 2 * PEEK_OFFSET_MOBILE; // Karte füllt fast den Viewport, lässt Platz zum Peeken
        } else {
          setCurrentGap(CARD_GAP_DESKTOP);
          // Desktop: Ziel ist es, die aktive Karte zentriert und Nachbarn sichtbar zu haben
          // Basierend auf Konzept "Desktop Ansicht" (3 Karten sichtbar)
          const cardsToShow = 3; // Oder eine andere Zahl, je nach Design
          newCardWidth = (wrapperWidth - (cardsToShow - 1) * CARD_GAP_DESKTOP) / cardsToShow;
          // Limitiere die Breite, um nicht zu groß zu werden
          newCardWidth = Math.min(newCardWidth, 380); // Max. Breite von ProjectSliderCard
        }
        setCurrentCardWidth(Math.max(newCardWidth, 280)); // Mindestbreite sicherstellen

      }, [isMobile, projects, carouselWrapperRef.current?.offsetWidth]);


      useEffect(() => {
        if (projects.length === 0 || !carouselWrapperRef.current) return;

        const wrapperWidth = carouselWrapperRef.current.offsetWidth;

        // Position, um die aktive Karte zu zentrieren
        const centralPosition = (wrapperWidth / 2) - (currentCardWidth / 2);
        const totalContentWidth = projects.length * currentCardWidth + (projects.length - 1) * currentGap;

        const newX = centralPosition - activeIndex * (currentCardWidth + currentGap);
        controls.start({ x: newX });

        // Update drag constraints
        // Rechte Grenze: Erste Karte ist zentriert
        const rightConstraint = centralPosition;
        // Linke Grenze: Letzte Karte ist zentriert
        const leftConstraint = centralPosition - (totalContentWidth - currentCardWidth);
        dragConstraintsRef.current = { left: Math.min(0, leftConstraint), right: Math.max(0, rightConstraint) };

      }, [activeIndex, projects, currentCardWidth, currentGap, controls, carouselWrapperRef.current?.offsetWidth]);


      const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset, velocity } = info;
        const swipeThreshold = currentCardWidth / 4; // Schwellenwert für Swipe

        if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 200) {
          if (offset.x < 0 || velocity.x < -100) { // Swipe nach links
            setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
          } else if (offset.x > 0 || velocity.x > 100) { // Swipe nach rechts
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
        } else {
          // Snap back zur aktuellen activeIndex Position
           if (carouselWrapperRef.current) {
            const wrapperWidth = carouselWrapperRef.current.offsetWidth;
            const centralPosition = (wrapperWidth / 2) - (currentCardWidth / 2);
            const targetX = centralPosition - activeIndex * (currentCardWidth + currentGap);
            controls.start({ x: targetX });
          }
        }
      };

      const navigate = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else {
          setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
        }
      };

      // Animation Variants für die Karten, wie im Deep Research beschrieben
      const cardVariants = {
        enterFromRight: { x: '100%', scale: 0.75, opacity: 0.6 },
        center: { x: '0%', scale: 1, opacity: 1, zIndex: 10 }, // Aktive Karte hat höheren zIndex
        exitToLeft: { x: '-100%', scale: 0.75, opacity: 0.6 },
        // Für die umgekehrte Richtung
        enterFromLeft: { x: '-100%', scale: 0.75, opacity: 0.6 },
        exitToRight: { x: '100%', scale: 0.75, opacity: 0.6 },
      };

      if (!mounted) { // Warte bis der Viewport-Hook initialisiert ist
        return <div className="h-[600px] w-full flex items-center justify-center text-muted-foreground">Slider lädt...</div>;
      }

      if (isLoading) {
        return <div className="h-[600px] w-full flex items-center justify-center text-muted-foreground">Projekte werden geladen...</div>;
      }

      if (projects.length === 0) {
        return <div className="h-[600px] w-full flex items-center justify-center text-muted-foreground">Keine Projekte für den Slider gefunden.</div>;
      }

      return (
        <section className={cn("py-12 md:py-20 w-full overflow-hidden", className)}>
          {(sectionTitle || sectionDescription) && (
            <div className="container mx-auto px-4 text-center mb-8 md:mb-12">
              {sectionTitle && <h2 className="text-3xl md:text-4xl font-bold mb-3">{sectionTitle}</h2>}
              {sectionDescription && <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{sectionDescription}</p>}
            </div>
          )}

          <div
            ref={carouselWrapperRef}
            className="relative w-full h-[500px] md:h-[580px] flex items-center justify-center" // Höhe an Kartengröße anpassen
          >
            {/* Navigationspfeile (Desktop) */}
            {!isMobile && (
              <>
                <button
                  onClick={() => navigate('prev')}
                  disabled={activeIndex === 0}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/70 dark:bg-neutral-800/70 hover:bg-background dark:hover:bg-neutral-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Vorheriges Projekt"
                >
                  <ArrowLeft size={24} className="text-foreground" />
                </button>
                <button
                  onClick={() => navigate('next')}
                  disabled={activeIndex === projects.length - 1}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/70 dark:bg-neutral-800/70 hover:bg-background dark:hover:bg-neutral-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Nächstes Projekt"
                >
                  <ArrowRight size={24} className="text-foreground" />
                </button>
              </>
            )}

            {/* Der Track für die Karten (Swipe-fähig) */}
            {/* Dieser Ansatz mit absolut positionierten Karten und Variants ist näher am Deep Research */}
            <div className="relative w-full h-full flex items-center overflow-hidden">
              {projects.map((project, index) => {
                const offset = index - activeIndex;
                let animateState = 'center';
                if (offset < 0) animateState = 'exitToLeft';
                if (offset > 0) animateState = 'enterFromRight'; // wird eigentlich exitToRight, aber wir zeigen nur 3
                                                              // Korrekter:
                if (offset === -1) animateState = 'exitToLeft'; // Vorherige Karte
                else if (offset === 0) animateState = 'center'; // Aktive Karte
                else if (offset === 1) animateState = 'enterFromRight'; // Nächste Karte
                else if (offset < -1) animateState = 'exitToLeft'; // Weit links, ausgeblendet
                else if (offset > 1) animateState = 'enterFromRight'; // Weit rechts, ausgeblendet


                // Sichtbarkeit: Nur aktive und direkte Nachbarn rendern oder zumindest animieren.
                // Für Performance bei vielen Karten: nur 3-5 Karten gleichzeitig im DOM halten.
                // Hier: Wir rendern alle, aber Framer Motion optimiert die Animationen.
                // Die `isActive` Prop wird für die ProjectSliderCard weiterhin genutzt für interne Styles/Priorisierung.
                if (Math.abs(offset) > 2 && projects.length > 5) return null; // Bei vielen Karten nur die nächsten +/-2 rendern

                return (
                  <motion.div
                    key={project.id || index}
                    className="absolute w-full h-full flex justify-center items-center" // Zentriert die Karte im Slot
                    custom={index > activeIndex ? 1 : -1} // Für unterschiedliche Enter/Exit Richtungen
                    variants={cardVariants}
                    initial={false} // Framer Motion soll den Initialzustand nicht beim ersten Rendern setzen, sondern direkt animieren
                    animate={
                      index === activeIndex ? 'center' :
                      index === activeIndex - 1 ? 'exitToLeft' :
                      index === activeIndex + 1 ? 'enterFromRight' :
                      index < activeIndex ? 'exitToLeft' : 'enterFromRight' // Fallback für weiter entfernte Karten
                    }
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 35, mass:0.7 },
                      opacity: { duration: 0.3 },
                      scale: { type: "spring", stiffness: 300, damping: 30, mass:0.5 },
                    }}
                    // Drag-Handling für den gesamten Stack (optional, wenn jede Karte dragbar sein soll, besser einen Container draggen)
                    // Hier ist der Container nicht dragbar, da die Karten selbst `cursor-grab` haben
                    // und wir einen zentralen Swipe-Handler auf einem Wrapper-Div um die Karten legen.
                  >
                    <ProjectSliderCard
                      project={project}
                      isActive={index === activeIndex}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>


          {/* Pagination Dots (optional, aber gut für Übersicht) */}
          {projects.length > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? 'bg-orange-500 dark:bg-amber-400 scale-125' : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
                  )}
                  aria-label={`Gehe zu Projekt ${index + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      );
    };

    export default ProjectCardSlider;
    ```

  * **Hinweise/Empfehlungen:**

      * **Daten laden:** Der Code oben enthält ein `useEffect` zum Laden der Projekte mit `getProjects(maxProjects)`. Du kannst `maxProjects` anpassen oder die Projekte direkt als Prop übergeben, wenn sie an anderer Stelle geladen werden.
      * **Responsivität der Kartenbreite:** Die `useEffect`-Hooks für `currentCardWidth` und `currentGap` sowie die Berechnung von `newX` und `dragConstraintsRef` versuchen, die Karten responsiv und zentriert darzustellen. Das ist eine komplexe Logik, die Feintuning erfordern kann, um auf allen Bildschirmgrößen perfekt auszusehen.
          * Das Deep Research schlug vor, **nur 3 Karten** (aktive und Nachbarn) sichtbar zu halten oder per CSS/Animation auszublenden. Der obige Code mit `variants` versucht, dieses Verhalten nachzubilden. Karten, die weiter als +/-1 vom `activeIndex` entfernt sind, erhalten `exitToLeft` oder `enterFromRight` und sollten entsprechend positioniert und skaliert werden. Bei sehr vielen Karten (`projects.length > 5`) werden Karten, die weiter als 2 Positionen entfernt sind, aus dem Rendering genommen (`return null`), um die Performance zu verbessern.
      * **Swipe-Logik:** Der hier gezeigte Ansatz für die Hauptkomponente verwendet einen `motion.div` Wrapper um die absolut positionierten Karten, der selbst *nicht* `drag="x"` hat. Stattdessen ist vorgesehen, die Drag-Gesten auf einem übergeordneten Element zu erfassen, das dann `setActiveIndex` steuert, und die `ProjectSliderCard` Komponenten animieren dann basierend auf ihrem neuen `animate`-Status (`center`, `exitToLeft`, `enterFromRight`). Dieser Ansatz ist konzeptionell näher an dem im Deep Research beschriebenen "Hybrid-Variante" mit Variants.
          * **Alternative für Swipe:** Du könntest auch den äußeren `div`-Container (der die `projects.map` enthält) mit `drag="x"` und `onDragEnd={handleDragEnd}` versehen, um einen einzelnen durchgehenden Track zu ziehen. Dann müsste `dragConstraintsRef` verwendet und die `animate={{ x: ... }}`-Logik angepasst werden, um den gesamten Track zu verschieben, statt einzelne Karten per Variants zu animieren. Die aktuelle Lösung mit Variants ist oft flexibler für individuelle Kartenanimationen.
      * **`useMobileViewportContext`:** Ich habe angenommen, dass du diesen Hook (oder einen ähnlichen) bereits hast oder erstellen kannst, basierend auf deiner `hooks/use-mobile-viewport.ts`-Datei. Er wird verwendet, um die Pfeilnavigation auf dem Desktop anzuzeigen.
      * **Animationen (`cardVariants`):** Die `variants` sind direkt aus dem Deep Research übernommen (`enterFromRight`, `center`, `exitToLeft`). Die `transition` Props können für ein weicheres oder federnderes Verhalten angepasst werden.
      * **Endlos-Schleife:** Eine Endlos-Schleife wurde im Deep Research erwähnt, ist aber für eine Projektübersicht nicht zwingend notwendig und würde die Komplexität erhöhen (Duplizieren von Elementen, Reset des Indexes). Der aktuelle Code implementiert keine Endlosschleife.

-----

## Schritt 4: Integration in die Seite

  * **Task:** Füge die `ProjectCardSlider`-Komponente zu einer deiner Seiten hinzu, z.B. der Startseite.

  * **Erklärung:**
    Der Slider soll als neuer Abschnitt zur Präsentation deiner Projekte dienen. Er kann die bestehende `RecentProjects`-Bento-Grid-Komponente ersetzen oder ergänzen.

  * **Zu modifizierende Datei:** z.B. `app/page.tsx`

  * **Code (Beispiel für `app/page.tsx`):**

    ```tsx
    // app/page.tsx
    import Intro from '@/components/intro';
    import RecentPosts from '@/components/recent-posts';
    // Die alte RecentProjects Komponente wird durch den ProjectCardSlider ersetzt oder ergänzt
    // import RecentProjects from '@/components/recent-projects';
    import SkillsSection from '@/components/skills-section';
    import ProjectCardSlider from '@/components/ProjectCardSlider'; // Neue Komponente
    import { getProjects } from '@/lib/projects'; // Falls du Projekte vorab laden und übergeben willst

    export default async function Home() {
      // Option: Lade Projekte hier, wenn du sie direkt übergeben möchtest
      // const sliderProjects = await getProjects(7); // Lade z.B. 7 Projekte

      return (
        // Haupt-Layout-Container deiner Seite
        // Der ProjectCardSlider sollte idealerweise die volle Breite nutzen können,
        // daher ggf. außerhalb des inneren 'container max-w-3xl' platzieren,
        // wenn der Slider-Hintergrund oder die "peekenden" Karten bis zum Rand gehen sollen.
        <>
          <section className="py-12 md:py-16"> {/* Weniger Padding oben, wenn Header fixiert ist */}
            <div className="container max-w-3xl">
              <Intro />
              <SkillsSection />
            </div>
          </section>

          {/* Hier den neuen Projekt-Slider einfügen */}
          {/* Variante 1: Slider lädt seine eigenen Daten */}
          <ProjectCardSlider
            className="mb-12 md:mb-24" // Abstand nach unten
            sectionTitle="Meine Projekte im Überblick"
            sectionDescription="Wische durch eine Auswahl meiner Arbeiten oder nutze die Pfeile zur Navigation."
            maxProjects={7} // Wie viele Projekte im Slider angezeigt werden sollen
          />

          {/* Variante 2: Slider erhält Daten als Prop (wenn oben geladen) */}
          {/* <ProjectCardSlider
            initialProjects={sliderProjects}
            className="mb-12 md:mb-24"
            // ... weitere Props
          /> */}

          <section className="pb-24">
            <div className="container max-w-3xl">
              <RecentPosts />
              {/* Optional: Das alte BentoGrid für "Weitere Projekte" oder eine andere Sektion behalten */}
              {/* <div className="mt-16">
                <h2 className='title mb-12'>Weitere ausgewählte Arbeiten</h2>
                <RecentProjects showAllProjectsLink={true} />
              </div> */}
            </div>
          </section>
        </>
      );
    }
    ```

  * **Hinweise/Empfehlungen:**

      * **Platzierung:** Überlege dir genau, wo der Slider am besten in deine Seitenstruktur passt. Wenn er die volle Bildschirmbreite für das Peeking der Karten nutzen soll, platziere ihn außerhalb des `container max-w-3xl` Divs, das du für andere Sektionen verwendest. Der innere Text (`sectionTitle`, `sectionDescription`) kann dann immer noch einen Container haben.
      * **Styling von Titeln/Beschreibungen:** Die Props `sectionTitle` und `sectionDescription` im `ProjectCardSlider` erlauben es dir, individuelle Texte für den Slider-Abschnitt zu setzen. Das Styling dafür (`text-3xl md:text-4xl font-bold mb-3` etc.) ist ein Vorschlag und sollte an deine bestehenden Titel-Styles (z.B. `.title` und `.subtitle` aus `globals.css`) angepasst werden.
      * **Anzahl der Projekte:** Über die `maxProjects`-Prop kannst du steuern, wie viele Projekte geladen und im Slider angezeigt werden.

-----

## Schritt 5: Styling, Dark/Light Mode und Feinschliff

  * **Task:** Stelle sicher, dass der Slider in beiden Themes (Light/Dark) gut aussieht und sich nahtlos in das bestehende Design einfügt. Passe Animationen und Übergänge für ein optimales Benutzererlebnis an.

  * **Erklärung:**
    Dein Projekt nutzt bereits `next-themes` und TailwindCSS für den Dark Mode. Die neuen Komponenten sollten diese Infrastruktur nutzen.

      * **Farben:** Verwende Tailwind-Farbvariablen (`bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground` etc.), die in deiner `tailwind.config.ts` und `globals.css` definiert sind. Das Deep Research betont dies im Abschnitt "Dark-/Light-Mode-Styling".
      * **Gradient-Overlay:** Das Overlay auf den Karten muss in beiden Modi funktionieren, um Textlesbarkeit zu gewährleisten. Der Code in `ProjectSliderCard.tsx` enthält bereits Dark-Mode-Varianten für den Gradienten (`dark:via-black/20 to-black/60 dark:to-black/70`).
      * **Animationen:** Feinabstimmung der `transition`-Parameter (stiffness, damping, duration) in Framer Motion für `ProjectCardSlider.tsx` und `ProjectSliderCard.tsx` kann das Look-and-Feel erheblich verbessern.

  * **Zu modifizierende Dateien:**

      * `components/ui/ProjectSliderCard.tsx` (für Karten-spezifisches Styling)
      * `components/ProjectCardSlider.tsx` (für Slider-Container und Navigations-Styling)
      * `app/globals.css` oder `tailwind.config.ts` (falls neue globale Styles oder Utility-Klassen benötigt werden)

  * **Code-Beispiele (Anpassungen):**

      * **Sicherstellen der Farbverwendung:**
        Überprüfe, ob alle Text- und Hintergrundfarben in den neuen Komponenten deine Theme-Variablen nutzen, z.B.:

        ```css
        /* In ProjectSliderCard.tsx für Text auf der Karte */
        className="text-white" /* Oder spezifischer, falls das Overlay nicht immer dunkel genug ist */

        /* In ProjectCardSlider.tsx für Navigationspfeile (Beispiel) */
        className="bg-background/70 dark:bg-neutral-800/70 text-foreground"
        ```

      * **Gradient-Anpassung (falls nötig):**
        In `ProjectSliderCard.tsx`, wenn der Standardgradient nicht optimal ist:

        ```tsx
        // className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 dark:via-black/20 to-black/60 dark:to-black/70 z-[1]" />
        // Experimentiere mit den via- und to-Werten sowie deren Transparenz.
        // Das Deep Research schlug vor: from-transparent via-white/20 to-white/60 dark:via-black/30 dark:to-black/60
        // Das kann besser sein, wenn die Bilder selbst sehr dunkel sind und du im Light Mode einen helleren Verlauf über dem Bild brauchst,
        // damit weißer Text darauf noch lesbar ist. Der aktuelle Vorschlag oben ist ein Kompromiss.
        ```

  * **Hinweise/Empfehlungen:**

      * **Konsistenz:** Achte darauf, dass Abstände, Schriftgrößen und Rundungen der neuen Slider-Komponenten mit dem Rest deines Portfolios übereinstimmen. Du nutzt bereits `shadcn/ui` und hast ein etabliertes Design-System.
      * **Testen:** Teste den Slider gründlich auf verschiedenen Geräten und in beiden Themes. Achte auf Lesbarkeit, Performance und Benutzerfreundlichkeit der Swipe-Geste und der Pfeilnavigation.
      * **Performance von Animationen:** Halte die Animationen flüssig. `transform` und `opacity` sind in der Regel performanter als z.B. das Animieren von `width` oder `height` (obwohl Framer Motion dies oft gut handhabt). Die Skalierung (`scale`) ist auch sehr performant.

-----

Diese detaillierte Anleitung, basierend auf deinem Deep Research und deiner Codebase, sollte dir helfen, das Karten-Slider-Feature erfolgreich zu implementieren. Denke daran, die Code-Snippets als Grundlage zu nehmen und sie gegebenenfalls weiter an deine spezifischen Anforderungen und dein bestehendes Styling anzupassen. Viel Erfolg\!