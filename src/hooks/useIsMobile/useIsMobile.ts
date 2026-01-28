'use client';

import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Initial Setup
    setIsMobile(mql.matches);

    // Listen for changes
    mql.addEventListener('change', onMediaQueryChange);

    return () => mql.removeEventListener('change', onMediaQueryChange);
  }, []);

  return isMobile;
}
