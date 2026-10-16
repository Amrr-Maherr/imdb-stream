'use client';

import { useTranslations } from 'next-intl';
import { ListVideo } from 'lucide-react';
import type { TVEpisode } from '@/shared/types/tmdb';
import { MovieSection } from '@/features/movies/components/detail/movie-section';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { Slider } from '@/shared/components/ui/slider';
import { EpisodeCard } from './episode-card';

type EpisodeMoreEpisodesProps = {
  episodes: TVEpisode[];
  currentEpisodeNumber: number;
  slug: string;
  tvId: string;
  seasonNumber: string;
};

export function EpisodeMoreEpisodes({
  episodes,
  currentEpisodeNumber,
  slug,
  tvId,
  seasonNumber,
}: EpisodeMoreEpisodesProps) {
  const t = useTranslations('TvDetail');
  const others = episodes.filter((episode) => episode.episode_number !== currentEpisodeNumber);

  if (others.length === 0) return null;

  return (
    <FadeIn delay={0.3}>
      <MovieSection title={t('moreEpisodes')} icon={<ListVideo className="size-5" />}>
        <Slider
          slidesPerView={4}
          slidesMobilePerView={1.4}
          spaceBetween={16}
          grabCursor
          freeMode
          className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
        >
          {others.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              slug={slug}
              tvId={tvId}
              seasonNumber={seasonNumber}
            />
          ))}
        </Slider>
      </MovieSection>
    </FadeIn>
  );
}
