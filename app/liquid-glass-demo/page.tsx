import LiquidGlass, { LiquidGlassCard, LiquidGlassButton, LiquidGlassNavigation } from '@/components/ui/liquid-glass'
import MorphingNavigation, { TabNavigation } from '@/components/ui/morphing-navigation'
import { FloatingDockEnhanced } from '@/components/ui/floating-dock-enhanced'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconMail,
  IconUser,
  IconBriefcase,
  IconMessage,
} from "@tabler/icons-react"

export default function LiquidGlassDemo() {
  const dockItems = [
    { title: "Home", icon: <IconHome />, href: "/" },
    { title: "Profile", icon: <IconUser />, href: "/profil" },
    { title: "Projects", icon: <IconBriefcase />, href: "/projects" },
    { title: "Contact", icon: <IconMail />, href: "/contact" },
    { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com" },
    { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://linkedin.com" },
  ]

  const navItems = [
    { title: "Home", href: "/", icon: <IconHome /> },
    { title: "Profile", href: "/profil", icon: <IconUser /> },
    { title: "Projects", href: "/projects", icon: <IconBriefcase /> },
    { title: "Contact", href: "/contact", icon: <IconMessage /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
          Liquid Glass Design System
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Inspired by Apple's new design language - Optimized for web
        </p>

        {/* Morphing Navigation Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Morphing Navigation
          </h2>
          <div className="relative h-32">
            <MorphingNavigation 
              items={navItems}
              className="w-fit"
            />
          </div>
        </div>

        {/* Card Examples */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Liquid Glass Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LiquidGlassCard variant="default">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Default Variant
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The standard Liquid Glass effect with balanced translucency and specular highlights.
              </p>
            </LiquidGlassCard>

            <LiquidGlassCard variant="intense">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Intense Variant
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enhanced glass effects with stronger blur and saturation for more prominent elements.
              </p>
            </LiquidGlassCard>

            <LiquidGlassCard variant="subtle">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Subtle Variant
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Minimal glass effects perfect for background elements and subtle overlays.
              </p>
            </LiquidGlassCard>

            <LiquidGlassCard variant="dynamic" adaptiveColors={true}>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Dynamic Variant
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Adaptive colors that respond to theme changes and surrounding content.
              </p>
            </LiquidGlassCard>

            <LiquidGlassCard enableSpecularHighlight={false}>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                No Specular Highlights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Glass effect without mouse tracking for better performance in static contexts.
              </p>
            </LiquidGlassCard>

            <LiquidGlassCard enableHover={false}>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                No Hover Effects
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Static glass card without scale animations for non-interactive content.
              </p>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Button Examples */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Liquid Glass Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <LiquidGlassButton>
              Default Button
            </LiquidGlassButton>
            
            <LiquidGlassButton variant="intense">
              Intense Button
            </LiquidGlassButton>
            
            <LiquidGlassButton variant="dynamic" adaptiveColors={true}>
              Dynamic Button
            </LiquidGlassButton>
            
            <LiquidGlassButton enableSpecularHighlight={false}>
              No Highlights
            </LiquidGlassButton>
          </div>
        </div>

        {/* Navigation Examples */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Navigation Elements
          </h2>
          <div className="space-y-6">
            <LiquidGlassNavigation className="p-4 w-fit mx-auto">
              <div className="flex items-center gap-6">
                <span className="text-gray-700 dark:text-gray-300">Home</span>
                <span className="text-gray-700 dark:text-gray-300">About</span>
                <span className="text-gray-700 dark:text-gray-300">Projects</span>
                <span className="text-gray-700 dark:text-gray-300">Contact</span>
              </div>
            </LiquidGlassNavigation>
          </div>
        </div>

        {/* Floating Dock Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Enhanced Floating Dock
          </h2>
          <div className="relative h-32 flex items-center justify-center">
            <FloatingDockEnhanced 
              items={dockItems}
              desktopClassName="relative"
              mobileClassName="relative"
            />
          </div>
        </div>

        {/* Performance Notes */}
        <div className="mb-16">
          <LiquidGlassCard variant="subtle" className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Performance & Accessibility
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                This Liquid Glass implementation is optimized for web performance:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>GPU-accelerated backdrop-filter effects</li>
                <li>Respect for prefers-reduced-motion</li>
                <li>Adaptive color sampling with theme detection</li>
                <li>Efficient mouse tracking with bounded event listeners</li>
                <li>Fallback support for non-supporting browsers</li>
                <li>Configurable performance modes for different use cases</li>
              </ul>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Usage Examples */}
        <div className="mb-16">
          <LiquidGlassCard variant="default" className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Integration with Your Portfolio
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Replace your current glass components gradually:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Update FloatingDock with FloatingDockEnhanced</li>
                <li>Enhance mobile navigation with LiquidGlassNavigation</li>
                <li>Use LiquidGlassCard for project cards and content sections</li>
                <li>Apply MorphingNavigation for scroll-responsive headers</li>
                <li>Implement adaptive colors for theme-aware components</li>
              </ul>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  )
}
