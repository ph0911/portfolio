I want:
1.  A carousel of project cards.
2.  Revolut-style design for the cards and overall section.
3.  Framer Motion for animations (sliding, scaling of active card).
4.  Responsive design (mobile: one prominent card with peeking neighbors; desktop: three cards visible with center one prominent).
5.  Minimalistic, modern, aesthetic.
6.  To be used as a "Projects" section.

**Key Concepts We'll Use:**

*   **State Management (`useState`):** To keep track of the currently active card index.
*   **Framer Motion:**
    *   `motion.div`: For animating elements.
    *   `animate` prop: To define target animation states.
    *   `drag="x"`: For swipe gestures.
    *   `onDragEnd`: To handle snapping after dragging.
    *   `variants`: For more complex animation sequences (optional here, but good to know).
    *   `LayoutGroup` and `layoutId`: Potentially for smoother transitions if elements change position (though direct `x` translation is often simpler for carousels).
*   **Tailwind CSS (Assumed, as it's common with Next.js & shadcn/ui):** For styling. I'll provide class names.
*   **Responsiveness:** Using Tailwind's responsive prefixes (e.g., `md:`, `lg:`).

**Let's define the project data structure first:**

```typescript
// src/types/project.ts (or similar)
export interface Project {
  id: string;
  title: string; // e.g., "E-commerce Platform"
  category: string; // e.g., "Web Development", "Privat" in your example
  description: string; // Short description or tech stack
  imageUrl: string; // Path to project image
  value?: string; // Like the "6.012 €" part, can be any string
  valueLabel?: string; // Like "Konten"
  statusText?: string; // Like "Gehalt"
  statusDetail?: string; // Like "Heute, 11:28"
  statusIcon?: React.ReactNode; // An icon component
  statusValue?: string; // Like "+2.550 €"
  projectUrl?: string; // Link to live project or repo
}
```

**Dummy Project Data (for demonstration):**

```typescript
// In your component file or a separate data file
import { Briefcase, Home, Coffee } from 'lucide-react'; // Example icons

const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'My Portfolio Site',
    category: 'Next.js • Tailwind',
    description: 'The very site you are on!',
    imageUrl: '/images/project-portfolio.jpg', // Replace with actual image
    value: 'Completed',
    valueLabel: 'View Code',
    statusText: 'Personal Project',
    statusDetail: 'Constantly Evolving',
    statusIcon: <Briefcase className="h-5 w-5 text-blue-500" />,
    statusValue: 'Live',
    projectUrl: 'https://github.com/your-repo/portfolio'
  },
  {
    id: '2',
    title: 'Fintech Dashboard UI',
    category: 'React • Figma',
    description: 'Inspired by modern banking apps.',
    imageUrl: '/images/project-fintech.jpg', // Replace with actual image
    value: '2.350 Components',
    valueLabel: 'Explore UI',
    statusText: 'UI/UX Design',
    statusDetail: 'Conceptual',
    statusIcon: <Home className="h-5 w-5 text-green-500" />,
    statusValue: 'High Fidelity',
    projectUrl: '#'
  },
  {
    id: '3',
    title: 'Coffee Shop Locator',
    category: 'Vue.js • Maps API',
    description: 'Find the best coffee near you.',
    imageUrl: '/images/project-coffee.jpg', // Replace with actual image
    value: '3.126 Locations',
    valueLabel: 'Try Demo',
    statusText: 'Side Project',
    statusDetail: 'Beta v0.8',
    statusIcon: <Coffee className="h-5 w-5 text-yellow-700" />,
    statusValue: 'WIP',
    projectUrl: '#'
  },
  // Add more projects
];
```
*Make sure to create a `public/images` folder and add some placeholder images like `project-portfolio.jpg`, `project-fintech.jpg`, `project-coffee.jpg`.*

---

**Component Structure:**

1.  `ProjectCarousel.tsx` (Main component)
2.  `ProjectCard.tsx` (Individual card component)

---

**1. `ProjectCard.tsx`**

```tsx
// src/components/ProjectCard.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types/project'; // Adjust path if needed
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive }) => {
  return (
    <motion.div
      className={`
        relative w-[80vw] md:w-[350px] lg:w-[400px] h-[500px] md:h-[550px]
        rounded-3xl overflow-hidden shadow-2xl
        flex-shrink-0 cursor-grab
        transition-all duration-300 ease-out
      `}
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.7,
        // You can add a slight Y offset for non-active cards if desired
        // y: isActive ? 0 : 10,
      }}
      whileTap={{ cursor: "grabbing" }}
    >
      {/* Background Image */}
      <Image
        src={project.imageUrl}
        alt={project.title}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority={isActive} // Prioritize loading active card image
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 p-6 flex flex-col justify-between text-white">
        {/* Top part (Value & Category) */}
        <div>
          <span className="block text-sm font-light opacity-80">{project.category}</span>
          {project.value && (
            <h2 className="text-4xl md:text-5xl font-bold mt-1">{project.value}</h2>
          )}
          {project.valueLabel && project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent card drag
              className="mt-3 inline-block bg-white/90 hover:bg-white text-black text-sm font-semibold py-2 px-4 rounded-full transition-colors"
            >
              {project.valueLabel} <ExternalLink size={14} className="inline ml-1" />
            </a>
          )}
        </div>

        {/* Bottom part (Status) */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            {project.statusIcon && (
              <div className="bg-white/20 p-2 rounded-full">
                {React.cloneElement(project.statusIcon as React.ReactElement, { className: "h-5 w-5 text-white" })}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-sm">{project.statusText || project.title}</h3>
              {project.statusDetail && (
                <p className="text-xs opacity-80">{project.statusDetail}</p>
              )}
            </div>
            {project.statusValue && (
              <span className="ml-auto text-sm font-medium bg-white/20 px-2 py-1 rounded">
                {project.statusValue}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
```

**Key points for `ProjectCard.tsx`:**

*   **`isActive` prop:** Crucial for scaling and opacity.
*   **Image:** Uses `next/image` for optimization. `objectFit="cover"` is important.
*   **Overlay:** A gradient ensures text readability.
*   **Content Structure:** Mimics the Revolut example's top and bottom sections.
*   **Styling:** Uses Tailwind CSS. Adjust `w-[80vw] md:w-[350px] lg:w-[400px]` and `h-[500px] md:h-[550px]` as needed for your desired card dimensions.
*   **`onClick={(e) => e.stopPropagation()}` on the link:** This is important to prevent the card's drag event from firing when the link is clicked.

---

**2. `ProjectCarousel.tsx`** (Main Component)

```tsx
// src/components/ProjectCarousel.tsx
"use client"; // This is a client component

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project'; // Adjust path
import { Briefcase, Home, Coffee, ArrowLeft, ArrowRight } from 'lucide-react'; // Example icons

// --- DUMMY DATA (Replace with your actual data fetching or import) ---
const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'My Portfolio Site',
    category: 'Next.js • Tailwind',
    description: 'The very site you are on!',
    imageUrl: '/images/project-portfolio.jpg',
    value: 'Completed',
    valueLabel: 'View Code',
    statusText: 'Personal Project',
    statusDetail: 'Constantly Evolving',
    statusIcon: <Briefcase />,
    statusValue: 'Live',
    projectUrl: 'https://github.com/'
  },
  {
    id: '2',
    title: 'Fintech Dashboard UI',
    category: 'React • Figma',
    description: 'Inspired by modern banking apps.',
    imageUrl: '/images/project-fintech.jpg',
    value: '2.350 Components',
    valueLabel: 'Explore UI',
    statusText: 'UI/UX Design',
    statusDetail: 'Conceptual',
    statusIcon: <Home />,
    statusValue: 'High Fidelity',
    projectUrl: '#'
  },
  {
    id: '3',
    title: 'Coffee Shop Locator',
    category: 'Vue.js • Maps API',
    description: 'Find the best coffee near you.',
    imageUrl: '/images/project-coffee.jpg',
    value: '3.126 Locations',
    valueLabel: 'Try Demo',
    statusText: 'Side Project',
    statusDetail: 'Beta v0.8',
    statusIcon: <Coffee />,
    statusValue: 'WIP',
    projectUrl: '#'
  },
  {
    id: '4',
    title: 'AI Writing Assistant',
    category: 'Python • NLP',
    description: 'Generates creative content.',
    imageUrl: '/images/project-ai.jpg', // Add this image
    value: '10k+ Users',
    valueLabel: 'Learn More',
    statusText: 'Startup Idea',
    statusDetail: 'MVP Released',
    statusIcon: <Briefcase />, // Placeholder
    statusValue: 'Seed Stage',
    projectUrl: '#'
  },
];
// --- END DUMMY DATA ---


// Helper to calculate card width and gap (adjust these values)
const CARD_WIDTH_MOBILE = 0.8 * (typeof window !== 'undefined' ? window.innerWidth : 300); // 80vw
const CARD_WIDTH_MD = 350;
const CARD_WIDTH_LG = 400;
const CARD_GAP = 16; // gap-4 in Tailwind = 1rem = 16px

const ProjectCarousel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(dummyProjects); // Load your projects here
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  // Dynamically determine card width based on screen size
  const [currentCardWidth, setCurrentCardWidth] = useState(CARD_WIDTH_LG);

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth < 768) { // Tailwind 'md' breakpoint
        setCurrentCardWidth(0.8 * window.innerWidth);
      } else if (window.innerWidth < 1024) { // Tailwind 'lg' breakpoint
        setCurrentCardWidth(CARD_WIDTH_MD);
      } else {
        setCurrentCardWidth(CARD_WIDTH_LG);
      }
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);
  
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipeThreshold = currentCardWidth / 3; // Min distance for a swipe

    if (Math.abs(offset.x) > swipeThreshold) {
      if (offset.x < 0) { // Swiped left
        setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
      } else { // Swiped right
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    }
    // Snap back if not a strong enough swipe will be handled by the animate prop on dragX
    // For smoother snap, we can directly animate dragX back to 0 or target position
    // But for this carousel, relying on activeIndex to drive the main track's position is simpler.
  };
  
  // Calculate the x offset for the entire track of cards
  // This centers the active card
  const trackOffset = useTransform(dragX, (latestDragX) => {
    if (!carouselWrapperRef.current) return 0;
    
    const wrapperWidth = carouselWrapperRef.current.offsetWidth;
    
    // Base position to center the active card
    let baseOffset = (wrapperWidth / 2) - (currentCardWidth / 2);
    
    // Adjust for activeIndex
    baseOffset -= activeIndex * (currentCardWidth + CARD_GAP);
    
    return baseOffset + latestDragX;
  });

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
  };


  if (!projects.length) {
    return <div>Loading projects...</div>; // Or some placeholder
  }

  return (
    <section className="py-12 md:py-20 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          PROJECTS, REIMAGINED
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 md:mb-12 max-w-2xl mx-auto">
          Explore a curated selection of my work. Swipe or use the arrows to navigate through different projects.
        </p>
      </div>

      <div 
        ref={carouselWrapperRef}
        className="relative w-full h-[550px] md:h-[600px] overflow-hidden select-none"
      >
        <motion.div
          className="flex items-center h-full" // Added items-center
          style={{ x: trackOffset, gap: `${CARD_GAP}px` }} // Use style for gap here due to dynamic x
          drag="x"
          dragConstraints={{
            left: -(projects.length - 1) * (currentCardWidth + CARD_GAP) - (carouselWrapperRef.current ? (carouselWrapperRef.current.offsetWidth / 2) - (currentCardWidth / 2) : 0),
            right: (carouselWrapperRef.current ? (carouselWrapperRef.current.offsetWidth / 2) - (currentCardWidth / 2) : 0),
          }}
          onDragEnd={onDragEnd}
          // This animate prop helps snap the track when activeIndex changes
          animate={{ 
            x: (carouselWrapperRef.current ? (carouselWrapperRef.current.offsetWidth / 2) - (currentCardWidth / 2) : 0) - activeIndex * (currentCardWidth + CARD_GAP)
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={index === activeIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Dots & Arrows */}
      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300
                ${index === activeIndex ? 'bg-blue-500 scale-125' : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'}
              `}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex space-x-4">
            <button 
                onClick={handlePrev} 
                disabled={activeIndex === 0}
                className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous project"
            >
                <ArrowLeft size={20} />
            </button>
            <button 
                onClick={handleNext} 
                disabled={activeIndex === projects.length - 1}
                className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next project"
            >
                <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
```

**Key points for `ProjectCarousel.tsx`:**

*   **`"use client"`:** Necessary because it uses `useState`, `useRef`, `useEffect` and Framer Motion hooks.
*   **`activeIndex`:** State to control the current card.
*   **`carouselWrapperRef`:** To get the width of the viewport for centering calculations.
*   **`currentCardWidth`:** Dynamically set based on screen size. This is important for responsive calculations.
*   **`trackOffset` Calculation:** This is the core logic for positioning the draggable track. It aims to center the `activeIndex` card within the `carouselWrapperRef`.
    *   `wrapperWidth / 2`: Midpoint of the viewport.
    *   `currentCardWidth / 2`: Half-width of a card.
    *   `(wrapperWidth / 2) - (currentCardWidth / 2)`: This gives the `x` position where a card's left edge should be for it to be centered.
    *   `activeIndex * (currentCardWidth + CARD_GAP)`: Offset based on which card is active and the gap.
    *   `latestDragX`: Current drag offset applied on top.
*   **`motion.div` (Track):**
    *   `drag="x"` enables horizontal dragging.
    *   `dragConstraints`: Prevents dragging too far. The calculation here aims to keep the cards within a reasonable bound.
    *   `onDragEnd`: Updates `activeIndex` based on swipe gesture.
    *   `animate={{ x: ... }}`: This prop ensures that when `activeIndex` changes (either by swipe or dot click), the track animates smoothly to the new correct position. The calculation is similar to `trackOffset`'s base without the `dragX`.
    *   `transition`: Spring animation for a nice feel.
    *   `style={{ x: trackOffset, gap: ... }}`: `gap` is applied via style because Tailwind's `gap-*` classes don't work directly with `x` translations in this manner.
*   **Navigation:** Dots and optional arrows for changing slides.
*   **Responsiveness:**
    *   Card widths adjust.
    *   The centering logic inherently handles different numbers of "peeking" cards. On mobile, with a wider card relative to the screen, less of the neighbors will peek. On desktop, with narrower cards, more will be visible. The key is that the *active* card is centered.
*   **Text Content:** Added a title and description for the section.

---

**How to Use:**

1.  Create the `Project.ts` type definition.
2.  Create `ProjectCard.tsx` and `ProjectCarousel.tsx` in your `src/components` directory.
3.  Create a `public/images` folder and add your project images (e.g., `project-portfolio.jpg`, `project-fintech.jpg`, etc.).
4.  Import and use `ProjectCarousel` in any page:

    ```tsx
    // In pages/index.tsx or any other page
    import ProjectCarousel from '@/components/ProjectCarousel';

    export default function HomePage() {
      return (
        <div>
          {/* Other page content */}
          <ProjectCarousel />
          {/* Other page content */}
        </div>
      );
    }
    ```
5.  Install `lucide-react` if you haven't: `npm install lucide-react` or `yarn add lucide-react`.
6.  Ensure Framer Motion is installed: `npm install framer-motion` or `yarn add framer-motion`.

**Styling Notes & Customization:**

*   **Colors & Fonts:** The example uses generic `neutral` colors. You'll want to adjust these to match your portfolio's theme (e.g., using your primary color for active dots, button accents).
*   **Card Dimensions:** Play with `CARD_WIDTH_MOBILE`, `CARD_WIDTH_MD`, `CARD_WIDTH_LG`, and the `h-` classes on `ProjectCard` to get the aspect ratio and size you like.
*   **Desktop View (3 cards):** The current setup centers the *active* card. On desktop, this means you'll naturally see parts of the adjacent cards. If you want to strictly show *exactly three* cards with the middle one active and larger, the logic for `trackOffset` and `dragConstraints` might need slight adjustments, or you might set a fixed width for the `carouselWrapperRef` on desktop to fit exactly three cards plus gaps. The current approach is more flexible and generally looks good.
*   **shadcn/ui:**
    *   You could use `Card` from shadcn/ui as a base for `ProjectCard` if you want, but you'd likely override many of its styles for this specific design.
    *   `Button` from shadcn/ui could be used for the "View Code" / "Explore UI" buttons and the navigation arrows for consistent styling if you're using shadcn elsewhere.

This should give you a very solid foundation. Remember to replace dummy data and image paths with your actual project information! Let me know if you have questions as you implement it.