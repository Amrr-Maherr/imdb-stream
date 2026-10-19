'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer';
import { useResetFilters } from '@/shared/hooks/useResetFilters';
import { useFilterFields } from './filter-controls';
import type { FilterConfig } from './types';

function MobileBar({ config }: { config: FilterConfig }) {
  return (
    <div className="lg:hidden sticky top-16 z-30 mb-4 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="app-container py-2.5">
        <MobileFilterDrawer config={config} />
      </div>
    </div>
  );
}

function MobileFilterDrawer({ config }: { config: FilterConfig }) {
  const t = useTranslations('Filters');
  const { hasFilters, activeCount, handleReset } = useResetFilters();
  const { fields, adult } = useFilterFields(config);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="default" className="w-full gap-2 bg-card shadow-xs">
          {t('filters')}
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[0.7rem] font-semibold text-brand-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-fit max-h-[70vh] p-0">
        <DrawerHeader className="border-b border-border px-5 py-3.5">
          <DrawerTitle className="text-base font-semibold">{t('filters')}</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-5 overflow-y-auto px-5 py-5">
          {fields.map((field) => (
            <div key={field.label} className="space-y-1.5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {field.label}
              </span>
              {field.control}
            </div>
          ))}
          <div className="space-y-1.5 border-t border-border pt-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
              {t('adultContent')}
            </span>
            {adult}
          </div>
          {hasFilters && (
            <Button variant="outline" size="default" onClick={handleReset} className="w-full">
              {t('resetFilters')}
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { MobileBar, MobileFilterDrawer };
