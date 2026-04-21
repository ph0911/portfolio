'use client';

import { useHydrated } from '@/hooks/use-hydrated';

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useHydrated();

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
