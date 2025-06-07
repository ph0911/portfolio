import { getFavoriteProjects } from '@/lib/projects';
import ProjectCardsComparison from '@/components/projects/projectCardsComparison';

export default async function DemoPage() {
  const projects = await getFavoriteProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Project Cards Demo</h1>
          <p className="text-muted-foreground">
            Compare the original mobile cards with the new stack-based implementation
          </p>
        </div>
        
        <ProjectCardsComparison projects={projects} />
        
        <div className="mt-12 p-6 border rounded-lg bg-muted/50">
          <h2 className="text-xl font-semibold mb-4">Implementation Details</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium">Stack Project Cards Features:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Preserves all original Stack swipe functionality</li>
                <li>Integrates full ProjectCard design language</li>
                <li>Uses Next.js Image optimization</li>
                <li>Supports navigation to project details</li>
                <li>Maintains responsive design principles</li>
                <li>Enhanced shadows and animations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Technical Integration:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Created StackProjectCard component for optimized rendering</li>
                <li>Enhanced Badge integration with glass variant</li>
                <li>Preserved drag-and-drop interactions</li>
                <li>Added click-to-navigate for top card only</li>
                <li>Optimized card dimensions (3:4 ratio)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
