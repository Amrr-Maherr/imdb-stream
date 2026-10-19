'use client';

import { useTranslations } from 'next-intl';
import { useResetFilters } from '@/shared/hooks/useResetFilters';
import { useFilterFields } from './filter-controls';
import type { FilterConfig } from './types';

function FilterSidebar({ config }: { config: FilterConfig }) {
  const t = useTranslations('Filters');
  const { hasFilters, activeCount, handleReset } = useResetFilters();
  const { fields, adult } = useFilterFields(config);

  return (
    <aside className="hidden lg:block w-full lg:w-72 xl:w-80 shrink-0">
      <div className="lg:sticky lg:top-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold leading-none text-foreground">{t('filters')}</h2>
            {activeCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[0.7rem] font-semibold text-brand-foreground">
                {activeCount}
              </span>
            )}
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('clearFilters')}
            </button>
          )}
        </div>

        <div className="space-y-4 px-5 py-5">
          {fields.map((field) => (
            <div key={field.label} className="space-y-1.5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {field.label}
              </span>
              {field.control}
            </div>
          ))}
        </div>

        <div className="border-t border-border bg-muted/40 px-5 py-3.5">{adult}</div>
      </div>
    </aside>
  );
}

export { FilterSidebar };
