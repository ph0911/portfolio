📌 Projektübersicht: Trade Republic-Style Modal für Next.js

⚡ Ziel:
Ein responsives Bottom-Sheet-Modal, das sich an das Design und die UX von Trade Republic anlehnt.
Das Modal wird auf mobilen Geräten als Overlay geöffnet und kann per Swipe nach unten geschlossen werden.
Auf Desktop bleibt die Ansicht unverändert als normale Seite mit Header & Footer.

1️⃣ Was soll erreicht werden?

✅ Wiederverwendbares Modal, das für verschiedene Inhalte genutzt werden kann, z. B. für:
	•	Blogposts (/blog/[slug])
	•	Projekte (/projects/[slug])
	•	Weitere zukünftige Anwendungsfälle.
✅ Optimierte mobile UX:
	•	Modal öffnet sich von unten nach oben mit einer sanften Animation.
	•	Nutzer kann innerhalb des Modals frei scrollen.
	•	Modal schließt sich durch gezieltes Wischen nach unten, wenn die richtige Bedingung erfüllt ist.
✅ Natürliche Benutzerführung:
	•	Header & Footer werden innerhalb des Modals ausgeblendet (wie bei Trade Republic).
	•	Auf Desktop bleibt der Aufbau klassisch mit Header & Footer.
✅ Sanfte „Gummiband“-Animation, um ein hochwertiges Nutzungserlebnis zu erzeugen.

2️⃣ Wie soll es umgesetzt werden?
	•	Next.js für das Routing → Jede Modal-Ansicht ist technisch eine eigene Seite (pages/blog/[slug] etc.), aber erscheint auf Mobile als Modal.
	•	Framer Motion für Animationen → Das Modal soll flüssig ein- und ausgeblendet werden.
	•	Event-Handling für Scroll-Logik:
	•	Scrollen im Modal bleibt normal, ohne versehentliches Schließen.
	•	Modal schließt sich nur, wenn Nutzer von oben nach unten zieht und die untere Hälfte des Bildschirms erreicht.
	•	Lässt der Nutzer los, bevor er die Hälfte erreicht, springt das Modal sanft zurück nach oben.
	•	Conditional Rendering für Mobile & Desktop:
	•	Mobile → Modal-Ansicht mit Overlay & Swipe-to-Close.
	•	Desktop → Klassische Seite mit Header/Footer.

3️⃣ Anforderungen & Bedingungen

✅ Modal darf sich nicht beim Scrollen im Inhalt schließen, sondern nur per gezieltem Swipe.
✅ Schließen durch Wischen nach unten ist nur möglich, wenn der Nutzer eine der folgenden Aktionen ausführt:
	•	Am Anfang des Inhalts ist und nach unten wischt.
	•	Den „Handle“ oben am Modal greift und bewusst nach unten zieht (unabhängig vom Scroll-Status).
✅ Das Modal schließt sich erst, wenn es über die Hälfte des Bildschirms gezogen wurde.
	•	Falls der Nutzer vorher loslässt, springt es sanft zurück nach oben.
✅ Das Modal sollte sich nahtlos anfühlen, ohne abrupte Bewegungen (hohe UX-Qualität).

4️⃣ Modal-Design (inspiriert von Trade Republic)
	•	Grundlayout:
	•	Abgerundete obere Kanten für ein modernes Design.
	•	Leicht transparenter Hintergrund (50% Opazität) für Fokus-Effekt.
	•	Fixierte Position (keine komplette Seitenneuladen, bleibt als Overlay).
	•	Animationen & Bewegungen:
	•	Modal erscheint von unten nach oben (sanfte Feder-Animation).
	•	Schließen durch Wischen nach unten, aber nur wenn:
	•	Nutzer ganz oben im Scrollbereich ist.
	•	Nutzer den oberen Handle zieht (unabhängig vom Scroll-Status).
	•	Springt zurück nach oben, wenn zu früh losgelassen.
	•	Schließt sich, wenn es über die Bildschirmmitte gezogen wird.
	•	Nutzerinteraktion & Steuerung:
	•	Handle-Bar oben sichtbar → Nutzer kann jederzeit zum Schließen ziehen.
	•	Kein „X“-Button, da nur Wischbewegung zum Schließen verwendet wird.
	•	Inhalt bleibt normal scrollbar.

5️⃣ Ziel!

🎯 UX-Perfektion nach Trade Republic-Standard:
✅ Mobile Nutzerführung ist intuitiv & nahtlos.
✅ Flüssige Bewegung & sanfte Rückführung, falls Nutzer zu früh loslässt.
✅ Flexibel & erweiterbar für verschiedene Inhaltsarten.
✅ Optimale Mischung aus Animationen, Gestensteuerung & Bedienbarkeit.

6️⃣ Warnungen (Was muss vermieden werden!)

⚠ Scroll-Fehlverhalten vermeiden
	•	Das Modal darf nicht schließen, wenn der Nutzer nur nach unten scrollt.
	•	Lösung: Schließen nur erlauben, wenn der Nutzer am oberen Ende ist oder explizit den Handle zieht.

⚠ Nicht zu abrupt schließen
	•	Falsches Verhalten: Modal sofort verschwinden lassen.
	•	Richtig: Sanfte Übergänge mit Feder-Effekt verwenden.

⚠ Kein „Gefangensein“ im Modal
	•	Falsches Verhalten: Nutzer kann nicht raus, weil das Schließen zu kompliziert ist.
	•	Richtig: Jederzeit Wischen zum Schließen ermöglichen, solange die Bedingungen erfüllt sind.

⚠ Desktop muss normal bleiben
	•	Das Modal darf nur auf mobilen Geräten aktiv sein.
	•	Auf Desktop bleibt es eine normale Unterseite mit Header/Footer.

🚀 Fazit

Diese Lösung stellt sicher, dass das Modal 1:1 wie in Trade Republic funktioniert:
✅ Optimale Mobile-UX mit natürlichem Bottom-Sheet-Feeling.
✅ Gesteuerte Swipe-Down-Logik für sanftes & kontrolliertes Schließen.
✅ Desktop bleibt unverändert mit klassischem Seitenlayout.
✅ Perfekt für Blogposts, Projekte & erweiterbare Modal-Anwendungen.

🔥 Diese Beschreibung kannst du 1:1 einer anderen KI geben – sie versteht sofort, was gebaut werden soll!
🚀 Fehlt noch etwas oder bist du damit happy? 😊