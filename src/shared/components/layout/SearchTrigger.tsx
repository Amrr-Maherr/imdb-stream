'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { useIsMac } from '@/shared/hooks/useIsMac';
import { cn } from '@/shared/utils/utils';

type SearchTriggerProps = {
  onOpen: () => void;
  /** Renders the trigger for the transparent (over hero) header state. */
  transparent?: boolean;
};

export default function SearchTrigger({ onOpen, transparent }: SearchTriggerProps) {
  const t = useTranslations('Header');
  const isMac = useIsMac();

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          'hidden h-9 w-56 items-center gap-2 rounded-lg border px-3 text-start text-sm transition-colors lg:flex xl:w-72',
          transparent
            ? 'border-white/30 bg-black/30 text-white/90 backdrop-blur-sm hover:border-white/50 hover:bg-black/40'
            : 'border-input bg-background/60 text-muted-foreground hover:border-ring/60 hover:bg-muted/50'
        )}
      >
        <Search
          className={cn('size-4 shrink-0', transparent ? 'text-white/80' : 'text-muted-foreground')}
          aria-hidden="true"
        />
        <span className="truncate">{t('searchTriggerPlaceholder')}</span>
        <kbd
          className={cn(
            'ms-auto shrink-0 rounded border px-1.5 py-0.5 font-sans text-[10px] leading-none',
            transparent
              ? 'border-white/30 bg-white/10 text-white/80'
              : 'border-border bg-muted text-muted-foreground'
          )}
        >
          {isMac ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onOpen}
        aria-label={t('search')}
        className={cn('lg:hidden', transparent && 'text-white hover:bg-white/15 hover:text-white')}
      >
        <Search className="size-4" />
      </Button>
    </>
  );
}
