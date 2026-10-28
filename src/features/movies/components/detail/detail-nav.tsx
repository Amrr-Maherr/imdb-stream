'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/utils/utils';

import type { DetailNavKey } from './detail-sections';

type DetailNavProps = {
  sections: DetailNavKey[];
};

/**
 * Sticky in-page navigation for the long movie / TV pages. Only sections that actually
 * rendered get a tab, and the tab of the section in view is highlighted.
 */
export function DetailNav({ sections }: DetailNavProps) {
  const t = useTranslations('DetailNav');
  const [available, setAvailable] = useState<DetailNavKey[]>(sections);
  const [active, setActive] = useState<DetailNavKey>(sections[0]);

  useEffect(() => {
    const present = sections.filter((key) => document.getElementById(key));

    // Callbacks only report sections whose state changed, so keep the full picture here.
    const inBand = new Set<DetailNavKey>();
    let first = true;
    const observer = new IntersectionObserver(
      (entries) => {
        // The first callback reports every observed section, so drop tabs for missing ones here.
        if (first) {
          first = false;
          setAvailable(present);
        }
        for (const entry of entries) {
          const key = entry.target.id as DetailNavKey;
          if (entry.isIntersecting) inBand.add(key);
          else inBand.delete(key);
        }
        // The last section (in page order) that reached the band is the one being read.
        const current = [...present].reverse().find((key) => inBand.has(key));
        if (current) setActive(current);
      },
      // A band just under the sticky bars decides which section is "current".
      { rootMargin: '-140px 0px -60% 0px' }
    );
    present.forEach((key) => observer.observe(document.getElementById(key)!));
    return () => observer.disconnect();
  }, [sections]);

  if (available.length < 2) return null;

  return (
    <nav
      aria-label={t('label')}
      className="sticky top-16 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl"
    >
      <div className="app-container">
        <ul className="scrollbar-none -mb-px flex gap-1 overflow-x-auto">
          {available.map((key) => (
            <li key={key} className="shrink-0">
              <a
                href={`#${key}`}
                aria-current={active === key ? 'location' : undefined}
                onClick={() => setActive(key)}
                className={cn(
                  'inline-flex h-12 items-center border-b-2 px-3 text-sm font-semibold transition-colors md:px-4',
                  active === key
                    ? 'border-brand text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
