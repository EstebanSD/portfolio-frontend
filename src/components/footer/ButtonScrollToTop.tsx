'use client';

import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { Button } from '../ui';
import { cn } from '@/lib/shadcn/utils';
import { ArrowUpIcon } from 'lucide-react';

export function ButtonScrollToTop() {
  const { isVisible, scrollToTop } = useScrollToTop();

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="outline"
      className={cn(
        'w-10 h-10 p-0 rounded-full',
        'fixed bottom-6 right-6 z-50',
        'backdrop-blur-sm',
        'transition-all duration-200',
        'hover:scale-110 active:scale-95',
        'animate-in fade-in-0 slide-in-from-bottom-1',
      )}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="h-4 w-4" />
    </Button>
  );
}
