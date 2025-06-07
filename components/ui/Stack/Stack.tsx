'use client';
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Image from 'next/image';
import { ProjectMetadata } from '@/lib/projects';
import ProjectCard from '@/components/ui/projectCard';

// Type für Karten-Daten 
type CardData = {
  id: number;
  img: string;
  project?: ProjectMetadata;
};

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: CardData[];
  projectsData?: ProjectMetadata[];
  animationConfig?: { stiffness: number; damping: number };
  useProjectCards?: boolean;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  projectsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  useProjectCards = false
}: StackProps) {
  // Bestimme welche Daten verwendet werden sollen
  const shouldUseProjects = useProjectCards && projectsData.length > 0;
  
  // Für ProjectCards: Verwende optimierte Dimensionen (3:4 Ratio wie original ProjectCard)
  const finalCardDimensions = shouldUseProjects 
    ? { width: 280, height: 373 } 
    : cardDimensions;

  const [cards, setCards] = useState<CardData[]>(
    shouldUseProjects
      ? projectsData.map((project, index) => ({ 
          id: index + 1, 
          img: project.image || '', 
          project 
        }))
      : cardsData.length
      ? cardsData
      : [
        { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
        { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
        { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
        { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
      ]
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative"
        style={{
          width: finalCardDimensions.width,
          height: finalCardDimensions.height,
          perspective: 600,
        }}
      >
      {cards.map((card, index) => {
        // Oberste Karte (index === cards.length - 1) liegt gerade
        // Untere Karten fächern sich nach rechts auf
        const cardPosition = cards.length - index - 1; // 0 = oberste Karte, höhere Werte = tiefer im Stapel
        const rotationAngle = cardPosition * 3; // Jede Karte 3° weiter gedreht
        const offsetX = cardPosition * 8; // Jede Karte 8px weiter nach rechts
        const offsetY = cardPosition * 2; // Leichter Y-Offset für natürlicheren Look
        
        const randomRotate = randomRotation
          ? Math.random() * 6 - 3 // Reduziert für sauberen Look
          : 0;

        // Für ProjectCards: Bestimme ob es die oberste/aktive Karte ist
        const isTopCard = index === cards.length - 1;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className={shouldUseProjects 
                ? "rounded-3xl overflow-hidden shadow-xl" // Schatten wie original ProjectCard
                : "rounded-2xl overflow-hidden border-4 border-white" // Original styling bleibt
              }
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: shouldUseProjects 
                  ? rotationAngle + randomRotate  // Kontrollierte Auffächerung nach rechts
                  : (cards.length - index - 1) * 4 + randomRotate, // Original für normale Cards
                scale: shouldUseProjects 
                  ? 1 - cardPosition * 0.02 // Minimal scale difference für ProjectCards
                  : 1 + index * 0.04 - cards.length * 0.04, // Original für normale Cards  
                transformOrigin: "center center",
                x: shouldUseProjects ? offsetX : 0,
                y: shouldUseProjects ? offsetY : 0,
                zIndex: index,
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: shouldUseProjects ? 400 : animationConfig.stiffness, // Schnellere Animation für ProjectCards
                damping: shouldUseProjects ? 40 : animationConfig.damping,
              }}
              style={{
                width: finalCardDimensions.width,
                height: finalCardDimensions.height,
                willChange: 'transform', // Performance-Optimierung
                // Subtile, gestaffelte Schatten für Tiefeneffekt
                boxShadow: shouldUseProjects 
                  ? `0 ${cardPosition * 2 + 4}px ${cardPosition * 4 + 8}px rgba(0, 0, 0, ${0.08 + cardPosition * 0.02}), 0 ${cardPosition + 2}px ${cardPosition * 2 + 4}px rgba(0, 0, 0, 0.04)`
                  : undefined
              }}
            >
              {shouldUseProjects && card.project ? (
                // Zentrale ProjectCard mit Stack-Variant
                <ProjectCard 
                  project={card.project}
                  isActive={isTopCard}
                  variant="stack"
                  enableNavigation={isTopCard}
                />
              ) : (
                // Original Bild-basierte Karte
                <Image
                  src={card.img}
                  alt={`card-${card.id}`}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              )}
            </motion.div>
          </CardRotate>
        );
      })}
      </div>
    </div>
  );
}