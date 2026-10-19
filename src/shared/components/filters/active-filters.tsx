'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/shared/utils/utils';
import { useActiveFilters } from './use-active-filters';
import type { FilterConfig } from './types';

function ActiveFilters({ config, className }: { config: FilterConfig; className?: string }) {
  const t = useTranslations('Filters');
  const { items, clearAll } = useActiveFilters(config);

  if (items.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.clear}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card py-1 pe-2 ps-3 text-xs text-foreground shadow-xs outline-none transition-colors hover:border-foreground/20 hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {item.value ? (
            <>
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </>
          ) : (
            <span className="font-medium">{item.label}</span>
          )}
          <span
            aria-hidden
            className="ms-0.5 flex size-4 items-center justify-center rounded-full text-sm leading-none text-muted-foreground transition-colors group-hover:bg-foreground/10 group-hover:text-foreground"
          >
            ×
          </span>
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        {t('clearFilters')}
      </button>
    </div>
  );
}

export { ActiveFilters };
