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
    <Rail
      icon={Award}
      extra={
        averageRating ? (
          <span className="hidden items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-sm font-bold text-brand ring-1 ring-brand/25 sm:inline-flex">
            <Star className="size-4 fill-current" />
            {averageRating.toFixed(1)}
            <span className="text-xs font-medium opacity-70">{t('avg')}</span>
          </span>
        ) : null
      }
      {...props}
    />
  );
}
