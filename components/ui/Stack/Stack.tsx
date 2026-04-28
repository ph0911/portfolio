'use client';
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { ProjectMetadata } from '@/lib/projects';
import ProjectCard from '@/components/ui/projectCard';

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
  projectsData: ProjectMetadata[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  animationConfig?: { stiffness: number; damping: number };
}

function getRotationOffset(index: number) {
  return ((index * 37) % 7) - 3
}

export default function Stack({
  projectsData,
  randomRotation = false,
  sensitivity = 200,
  sendToBackOnClick = false,
  animationConfig = { stiffness: 400, damping: 40 }
}: StackProps) {
  const [cards, setCards] = useState(
    projectsData.map((project, index) => ({ 
      id: index + 1, 
      project,
      rotationOffset: randomRotation ? getRotationOffset(index) : 0
    }))
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

  // ProjectCard Dimensionen (3:4 Ratio)
  const cardDimensions = { width: 320, height: 427 };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative"
        style={{
          width: cardDimensions.width,
          height: cardDimensions.height,
          perspective: 600,
        }}
      >
        {cards.map((card, index) => {
          const cardPosition = cards.length - index - 1;
          const rotationAngle = cardPosition * 3;
          const offsetX = cardPosition * 8;
          const offsetY = cardPosition * 2;
          const isTopCard = index === cards.length - 1;
          const boxShadow = `0 ${cardPosition * 2 + 4}px ${cardPosition * 4 + 8}px rgba(0, 0, 0, ${0.08 + cardPosition * 0.02}), 0 ${cardPosition + 2}px ${cardPosition * 2 + 4}px rgba(0, 0, 0, 0.04)`;

          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
            >
              <motion.div
                className="rounded-3xl overflow-hidden shadow-xl"
                onClick={() => sendToBackOnClick && sendToBack(card.id)}
                animate={{
                  rotateZ: rotationAngle + card.rotationOffset,
                  scale: 1 - cardPosition * 0.02,
                  transformOrigin: "center center",
                  x: offsetX,
                  y: offsetY,
                  zIndex: index,
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={{
                  width: cardDimensions.width,
                  height: cardDimensions.height,
                  willChange: 'transform',
                  boxShadow: boxShadow
                }}
              >
                <ProjectCard 
                  project={card.project}
                  isActive={isTopCard}
                  variant="stack"
                  enableNavigation={isTopCard}
                />
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
    </div>
  );
}
