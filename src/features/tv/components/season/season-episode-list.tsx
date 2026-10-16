'use client';

import { useTranslations } from 'next-intl';
import type { TVEpisode } from '@/shared/types/tmdb';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { SeasonEpisodeCard } from './season-episode-card';

type SeasonEpisodeListProps = {
  episodes: TVEpisode[];
  slug: string;
  tvId: string;
  seasonNumber: string;
};

export function SeasonEpisodeList({
  episodes,
  slug,
  tvId,
  seasonNumber,
}: SeasonEpisodeListProps) {
  const t = useTranslations('TvDetail');

  return (
    <FadeIn>
      <section>
        <h2 className="mb-6 text-xl font-bold text-foreground">{t('episodes')}</h2>
        {episodes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">{t('noEpisodes')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {episodes.map((episode) => (
              <SeasonEpisodeCard
                key={episode.id}
                episode={episode}
                slug={slug}
                tvId={tvId}
                seasonNumber={seasonNumber}
              />
            ))}
          </div>
        )}
      </section>
    </FadeIn>
  );
}
