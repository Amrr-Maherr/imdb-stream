'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FadeIn } from '@/features/movies/components/detail/fade-in';

type BiographySectionProps = {
  biography: string;
};

export function BiographySection({ biography }: BiographySectionProps) {
  const t = useTranslations('Person');
  const [expanded, setExpanded] = useState(false);
  if (!biography) return null;

  const longBio = biography.length > 600;

  return (
    <FadeIn>
      <section>
        <h2 className="text-xl font-bold text-foreground mb-3">{t('biography')}</h2>
        <div className="max-w-3xl text-muted-foreground leading-relaxed whitespace-pre-line">
          <span className={!expanded && longBio ? 'line-clamp-[8]' : ''}>{biography}</span>
        </div>
        {longBio && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-brand hover:text-brand/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {expanded ? (
              <>
                {t('showLess')} <ChevronUp className="size-3.5" />
              </>
            ) : (
              <>
                {t('showMore')} <ChevronDown className="size-3.5" />
              </>
            )}
          </button>
        )}
      </section>
    </FadeIn>
  );
}
