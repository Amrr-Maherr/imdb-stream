'use client';

import { Award, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Rail, type RailProps } from './rail';

type PremiumRowProps = Omit<RailProps, 'density' | 'icon' | 'extra'> & {
  averageRating?: number;
};

/** Critically acclaimed row: award icon plus the row's average rating. */
export function PremiumRow({ averageRating, ...props }: PremiumRowProps) {
  const t = useTranslations('Common');

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/[0.08] via-card to-card p-4 shadow-xl shadow-black/[0.05] sm:p-6">
      <div
        className="pointer-events-none absolute -end-24 -top-32 size-80 rounded-full bg-brand/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <Rail
        className="relative"
        icon={Award}
        extra={
          averageRating ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1.5 text-sm font-bold text-foreground">
              <Star className="size-4 fill-rating-star text-rating-star" />
              {averageRating.toFixed(1)}
              <span className="text-xs font-medium text-muted-foreground">{t('avg')}</span>
            </span>
          ) : null
        }
        {...props}
      />
    </div>
  );
}
