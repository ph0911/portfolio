[![Learn - visionOS - Apple Developer](https://tse4.mm.bing.net/th?id=OIP.Wi1GDUz8nRMuhkgAw8AlggHaEK\&pid=Api)](https://developer.apple.com/visionos/learn/)

### 1 | Was Apple gestern mit „Liquid Glass“ vorgestellt hat

Apple beschreibt **Liquid Glass** als ein neues System-Material, das *„reflektiert, refraktiert und sich kontextabhängig verflüssigt“*, um Inhalte stärker in den Vordergrund zu rücken und gleichzeitig Lebendigkeit in alle UI-Ebenen zu bringen ([apple.com][1]).
Kerneigenschaften laut Apple & Presse berichten:

| Eigenschaft                                              | Kurz erklärt                                                                | Nutzen fürs UI                      |
| -------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------- |
| **Transluzenz + Refraktion**                             | Zeigt unterliegenden Content verschwommen und bricht Licht an den Rändern   | Tiefe + Kontextbewusstsein          |
| **Dynamische Farbadaptation**                            | Material nimmt Farbsamples aus Umgebung auf (hell/dunkel, Wallpaper-Farben) | Lesbarkeit, System-Konsistenz       |
| **Echtzeit-Specular-Highlights**                         | Glanz spiegelt sich in Abhängigkeit von Device-Neigung / Pointer-Bewegungen | „Lebendigkeit“, Micro-Feedback      |
| **Morphende Controls**                                   | Tool- & Tab-Bars schrumpfen/expandieren je nach Scrollzustand               | Fokus auf Content, minimaler Chrome |
| **API-Unterstützung**                                    | Neue Materials & Controls in SwiftUI / UIKit / AppKit                       | Schnelle Adoption                   |
| ([apple.com][1], [theverge.com][2], [techcrunch.com][3]) |                                                                             |                                     |

---

### 2 | Designprinzipien, die du beim Nachbauen im Web berücksichtigen solltest

1. **Layering / Elevation**

   * Mindestens **drei Ebenen**: „Hintergrund ↔ Liquid Glass ↔ Content“.
   * Blur & Saturation nur auf der mittleren Ebene; Content bleibt gestochen scharf.

2. **Adaptive Farbtöne**

   * Nutze CSS-Variablen (`--lg-color`) und update sie per JS **live**, z. B. über `document.elementFromPoint()` oder einen Canvas-Sample, um dominante Hintergrundfarben zu erkennen.

3. **Specular Highlight**

   * Ein radialer Verlauf als `::before`-Layer, dessen Mittelpunkt mit Pointer-Koordinaten wandert (`mousemove`) bzw. mit `deviceorientation` rotiert.

4. **Motion & Morphing**

   * Navigation shrink/expand per **IntersectionObserver** + **Framer Motion** (React) für smoothe Height-Tweens.

5. **Performance & Accessibility**

   * Large `backdrop-filter`s triggern GPU — setze `will-change: transform`, clippen (`overflow-hidden`) und skaliere Blur-Radius auf `@media (prefers-reduced-transparency: reduce)` auf 0.
   * Fallback: halb-transparenter Solid-Color-Overlay ohne Blur.

---

### 3 | Quick-Start-Component „LiquidGlass“ (Next.js / Tailwind)

```tsx
// components/LiquidGlass.tsx
'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function LiquidGlass({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  // Cursor-basierte Highlight-Position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const gradient = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(650px at ${x}px ${y}px, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)`
  )

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{ backgroundImage: gradient }}
      className={`
        relative overflow-hidden rounded-3xl border border-white/15
        bg-white/10 backdrop-blur-xl backdrop-saturate-150
        transition-all duration-300 ease-out
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
    >
      {/* Glass-Edge-Glow */}
      <div className="pointer-events-none absolute inset-px rounded-[inherit] bg-white/5" />
      {children}
    </motion.div>
  )
}
```

**Einbindung in Tailwind Config**

```js
// tailwind.config.js
theme: {
  extend: {
    backdropBlur: { 'glass': '24px' },
    backdropSaturate: { 'glass': '180%' },
  }
}
```

---

### 4 | Bausteine für deine Portfolio-Site

| Aufgabe                            | Tipp                                                                          | Tailwind-Snippet                        |
| ---------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------- |
| **Icon-Buttons** mit Glass         | Mehrere Layer wie oben, plus `shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]` | `class="lg-button relative ..."`        |
| **Dock / Navbar** shrink-on-scroll | Wrapper mit `sticky top-0` + `backdrop-blur-glass`; Höhe via Framer Motion    | siehe `ScrollTrigger` Pattern           |
| **Widgets mit Tiefenversatz**      | `translate-z` ersatzweise via `shadow-xl` + Parallax-Scroll (`perspective`)   | `class="[transform-style:preserve-3d]"` |
| **Dark-/ Clear-Mode**              | Steuere `bg-white/10` ↔ `bg-black/20` per `data-theme` Attr.                  | `dark:bg-black/20`                      |

---

### 5 | Weiterführende Ressourcen

* **WWDC-Session »Meet Liquid Glass«** – Detaillierter Blick auf Material-Physik und HIG-Empfehlungen ([developer.apple.com][4])
* **Developer-Doc »Adopting Liquid Glass«** – API-Details, Farb-Samples, Do‘s & Don’ts ([developer.apple.com][5])
* **The Verge & TechCrunch Analysen** – Konkrete Beispiele für animierte Bar-Morphs und Edge-Glow ([theverge.com][2], [techcrunch.com][3])

---

#### TL;DR

Setze **Layer-Blur + lebendige Highlights**, lasse die Komponente **auf Hintergrund & Pointer reagieren**, skaliere Effekte **flüssig** – dann kommst du dem neuen Apple-Look schon sehr nah. Viel Erfolg beim Veredeln deiner Portfolio-Webseite!

[1]: https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ "Apple introduces a delightful and elegant new software design - Apple"
[2]: https://www.theverge.com/news/682636/apple-liquid-design-glass-theme-wwdc-2025 "Apple’s new design language is Liquid Glass | The Verge"
[3]: https://techcrunch.com/2025/06/09/apple-redesigns-its-operating-systems-with-liquid-glass/ "Apple redesigns its operating systems with 'Liquid Glass' at WWDC 25 | TechCrunch"
[4]: https://developer.apple.com/videos/play/wwdc2025/219/?utm_source=chatgpt.com "Meet Liquid Glass - WWDC25 - Videos - Apple Developer"
[5]: https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass?utm_source=chatgpt.com "Adopting Liquid Glass | Apple Developer Documentation"
