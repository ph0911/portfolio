import React from 'react';
import Stack from '@/components/ui/Stack/Stack';
import { getFavoriteProjects } from '@/lib/projects';

interface MobileProjectCardsProps {
  sensitivity?: number;
  randomRotation?: boolean;
  sendToBackOnClick?: boolean;
  className?: string;
}

/**
 * Mobile Project Cards Component (Stack-based)
 * 
 * This component integrates the Stack functionality with ProjectCard design,
 * creating a swipeable stack of project cards optimized for mobile interactions.
 * 
 * Features:
 * - Preserves all Stack swipe functionality
 * - Uses the centralized ProjectCard design 
 * - Optimized for mobile touch interactions
 * - Clean stack-based card management
 * - Loads favorite projects data internally (consistent with DesktopProjectCards)
 */
export default async function MobileProjectCards({
  sensitivity = 150,
  randomRotation = false,
  sendToBackOnClick = true,
  className = ""
}: MobileProjectCardsProps) {
  const favoriteProjects = await getFavoriteProjects();

  if (!favoriteProjects || favoriteProjects.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-muted-foreground">Keine Favoriten-Projekte gefunden.</p>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <Stack 
        projectsData={favoriteProjects}
        sensitivity={sensitivity}
        sendToBackOnClick={sendToBackOnClick}
        randomRotation={randomRotation}
        animationConfig={{
          stiffness: 400,
          damping: 40
        }}
      />
    </div>
  );
}