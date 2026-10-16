'use client';

import { Info } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { TVSeasonDetails } from '@/shared/types/tmdb';
import { FactsCard, type Fact } from '@/features/movies/components/detail/facts-card';

type SeasonMetadataProps = {
  season: TVSeasonDetails;
};

export function SeasonMetadata({ season }: SeasonMetadataProps) {
  const t = useTranslations('TvDetail');
  const locale = useLocale();

  const episodes = season.episodes ?? [];
  const runtimes = episodes
    .map((episode) => episode.runtime)
    .filter((runtime): runtime is number => typeof runtime === 'number' && runtime > 0);
  const totalRuntime = runtimes.reduce((total, runtime) => total + runtime, 0);
  const averageRuntime = runtimes.length > 0 ? Math.round(totalRuntime / runtimes.length) : 0;

  const facts: Fact[] = [];
  if (season.air_date) {
    facts.push({
      label: t('airDate'),
      value: new Date(season.air_date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  }
  if (averageRuntime > 0) {
    facts.push({ label: t('averageRuntime'), value: t('runtimeMin', { runtime: averageRuntime }) });
  }
  if (totalRuntime > 0) {
    facts.push({ label: t('totalRuntime'), value: t('runtimeMin', { runtime: totalRuntime }) });
  }

  return <FactsCard title={t('seasonStatistics')} icon={<Info className="size-4" />} facts={facts} />;
}
