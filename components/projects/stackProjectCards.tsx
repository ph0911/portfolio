'use client';

import React from 'react';
import Stack from '@/components/ui/Stack/Stack';
import { ProjectMetadata } from '@/lib/projects';

interface StackProjectCardsProps {
  projects: ProjectMetadata[];
  sensitivity?: number;
  randomRotation?: boolean;
  sendToBackOnClick?: boolean;
  className?: string;
}

/**
 * Stack-based Project Cards Component
 * 
 * This component integrates the Stack functionality with ProjectCard design,
 * creating a swipeable stack of project cards. It's designed as a parallel
 * implementation to the existing MobileProjectCards for testing and comparison.
 * 
 * Features:
 * - Preserves all Stack swipe functionality
 * - Uses the full ProjectCard design language
 * - Optimized for mobile touch interactions
 * - Can be used as a drop-in replacement for MobileProjectCards
 */
const StackProjectCards: React.FC<StackProjectCardsProps> = ({
  projects,
  sensitivity = 150,
  randomRotation = false,
  sendToBackOnClick = true,
  className = ""
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-muted-foreground">No projects available</p>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <Stack 
        projectsData={projects}
        useProjectCards={true}
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
};

export default StackProjectCards;
