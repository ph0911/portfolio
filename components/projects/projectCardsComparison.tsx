'use client';

import React, { useState } from 'react';
import { ProjectMetadata } from '@/lib/projects';
import MobileProjectCards from './mobileProjectCards';
import StackProjectCards from './stackProjectCards';

interface ProjectCardsComparisonProps {
  projects: ProjectMetadata[];
}

/**
 * Comparison Component for different mobile project card implementations
 * 
 * This component allows you to easily switch between:
 * - Original MobileProjectCards (slide-based)
 * - New StackProjectCards (stack-based with swipe)
 * 
 * Use this for testing and comparison purposes.
 */
const ProjectCardsComparison: React.FC<ProjectCardsComparisonProps> = ({ projects }) => {
  const [activeDemo, setActiveDemo] = useState<'mobile' | 'stack'>('stack');

  if (!projects || projects.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-muted-foreground">No projects available for comparison</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Toggle Controls */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-background p-1">
          <button
            onClick={() => setActiveDemo('mobile')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeDemo === 'mobile'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Original Mobile Cards
          </button>
          <button
            onClick={() => setActiveDemo('stack')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeDemo === 'stack'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Stack Project Cards
          </button>
        </div>
      </div>

      {/* Demo Content */}
      <div className="relative min-h-[400px]">
        {activeDemo === 'mobile' && (
          <div className="space-y-4">
            <h3 className="text-center text-lg font-semibold">Original MobileProjectCards</h3>
            <p className="text-center text-sm text-muted-foreground">
              Slide-based navigation with touch gestures
            </p>
            <MobileProjectCards projects={projects} />
          </div>
        )}

        {activeDemo === 'stack' && (
          <div className="space-y-4">
            <h3 className="text-center text-lg font-semibold">Stack Project Cards</h3>
            <p className="text-center text-sm text-muted-foreground">
              Stack-based cards with swipe-to-dismiss functionality
            </p>
            <StackProjectCards 
              projects={projects}
              sensitivity={150}
              sendToBackOnClick={true}
              randomRotation={false}
            />
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground max-w-md mx-auto">
        <p>
          <strong>Original:</strong> Swipe left/right or use dots to navigate<br/>
          <strong>Stack:</strong> Drag cards to send to back, tap to cycle through
        </p>
      </div>
    </div>
  );
};

export default ProjectCardsComparison;
