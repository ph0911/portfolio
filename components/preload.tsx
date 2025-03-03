'use client';

import { useInViewPreload } from '@/hooks/use-in-view-preload';

interface PostPreloadProps {
  slug: string;
  children: React.ReactNode; 
}

interface ProjectPreloadProps {
  slug: string;
  children: React.ReactNode;
}

interface ProfilePreloadProps {
    children: React.ReactNode;
  }

export function PostPreload({ slug, children }: PostPreloadProps) {
  const { ref } = useInViewPreload(`/posts/${slug}`);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

export function ProjectPreload({ slug, children }: ProjectPreloadProps) {
  const { ref } = useInViewPreload(`/projects/${slug}`);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

export function ProfilePreload({ children }: ProfilePreloadProps) {
    const { ref } = useInViewPreload('/profil');
  
    return (
      <div ref={ref}>
        {children}
      </div>
    );
  }