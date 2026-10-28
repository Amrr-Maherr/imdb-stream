'use client';

import { useTranslations } from 'next-intl';
import { Slider } from '@/shared/components/ui/slider';
import type { TVSeason } from '@/shared/types/tmdb';
import { SeasonCard } from './season-card';
import { SectionTitle } from '@/features/movies/components/detail/movie-section';

type TvSeasonsProps = {
  seasons: TVSeason[];
  tvId: number;
  tvSlug: string;
  currentSeasonNumber?: number;
};

export function TvSeasons({ seasons, tvId, tvSlug, currentSeasonNumber }: TvSeasonsProps) {
  const t = useTranslations('TvDetail');
  const valid = seasons.filter((s) => s.season_number > 0);
  if (valid.length === 0) return null;

  return (
    <section>
      <SectionTitle>{t('seasons')}</SectionTitle>
      <Slider
        slidesPerView={3}
        slidesMobilePerView={2.5}
        spaceBetween={16}
        grabCursor
        freeMode
        className="py-3"
      >
        {valid.map((season) => (
          <SeasonCard
            key={season.id}
            season={season}
            tvId={tvId}
            tvSlug={tvSlug}
            isActive={season.season_number === currentSeasonNumber}
          />
        ))}
      </Slider>
    </section>
  );
}
