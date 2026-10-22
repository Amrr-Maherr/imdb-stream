'use client';

import { useEffect, useState } from 'react';

/**
 * Detects macOS so the search hint can show `⌘K` instead of `Ctrl K`.
 *
 * The value is resolved after mount to avoid a hydration mismatch.
 */
export function useIsMac(): boolean {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const platform =
      (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
        ?.platform ?? navigator.platform;

    setIsMac(/mac|iphone|ipad|ipod/i.test(platform ?? ''));
  }, []);

  return isMac;
}
