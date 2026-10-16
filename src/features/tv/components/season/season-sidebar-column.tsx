'use client';

import { Star, Users, Link2, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TVSeasonDetails, TVSeason } from '@/shared/types/tmdb';
import { MovieSection } from '@/features/movies/components/detail/movie-section';
import { MovieExternalLinks } from '@/features/movies/components/detail/movie-external-links';
import { MovieVideos } from '@/features/movies/components/detail/movie-videos';
import { CrewCard } from '@/features/movies/components/detail/crew-card';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { Slider } from '@/shared/components/ui/slider';
import { TvSeasons } from '@/features/tv/components/detail/tv-seasons';
import { FactsCard, type Fact } from '@/features/movies/components/detail/facts-card';

type SeasonSidebarColumnProps = {
  season: TVSeasonDetails;
  allSeasons: TVSeason[];
  tvSlug: string;
  tvId: string;
  currentSeasonNumber: number;
};

export function SeasonSidebarColumn({
  season,
  allSeasons,
  tvSlug,
  tvId,
  currentSeasonNumber,
}: SeasonSidebarColumnProps) {
  const t = useTranslations('TvDetail');
  const tm = useTranslations('MovieDetail');
  const allCrew = season.aggregate_credits?.crew ?? season.credits?.crew ?? [];
  const videos = season.videos?.results ?? [];

  const externalIds = season.external_ids
    ? {
        imdb_id: season.external_ids.imdb_id,
        facebook_id: null as string | null,
        instagram_id: null as string | null,
        twitter_id: null as string | null,
        wikidata_id: null as string | null,
      }
    : null;

  const facts: Fact[] = [];
  if (season.air_date) {
    facts.push({
      label: t('airDate'),
      value: new Date(season.air_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  }
  facts.push({ label: t('episodes'), value: season.episodes.length });
  if (season.vote_average > 0) {
    facts.push({
      label: t('voteAverage'),
      value: (
        <span className="inline-flex items-center gap-1.5">
          <Star className="size-3.5 fill-rating-star text-rating-star" />
          <span className="font-medium">{season.vote_average.toFixed(1)}</span>
        </span>
      ),
    });
  }

  return (
    <aside className="order-1 w-full space-y-8 lg:sticky lg:top-20 lg:order-2 lg:w-80 xl:w-96 lg:flex-shrink-0 lg:self-start">
      <FadeIn delay={0.05}>
        <FactsCard title={t('seasonStatistics')} icon={<Info className="size-4" />} facts={facts} />
      </FadeIn>

      {allCrew.length > 0 && (
        <FadeIn delay={0.1}>
          <MovieSection title={t('crew')} icon={<Users className="size-5" />}>
            <Slider
              slidesPerView={3}
              slidesMobilePerView={4}
              spaceBetween={14}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-0 px-4 sm:px-0 pb-8"
            >
              {allCrew.slice(0, 20).map((m, idx) => (
                <CrewCard
                  key={`${m.credit_id}-${idx}`}
                  id={m.id}
                  name={m.name}
                  job={m.job}
                  department={m.department}
                  profilePath={m.profile_path}
                  creditId={m.credit_id}
                />
              ))}
            </Slider>
          </MovieSection>
        </FadeIn>
      )}

      {videos.length > 0 && (
        <FadeIn delay={0.15}>
          <MovieSection title={tm('videos')} icon={null}>
            <MovieVideos videos={videos} />
          </MovieSection>
        </FadeIn>
      )}

      {allSeasons?.length > 1 && (
        <FadeIn delay={0.2}>
          <TvSeasons
            seasons={allSeasons}
            tvId={Number(tvId)}
            tvSlug={tvSlug}
            currentSeasonNumber={currentSeasonNumber}
          />
        </FadeIn>
      )}

      {externalIds && (
        <FadeIn delay={0.25}>
          <MovieSection title={t('externalLinks')} icon={<Link2 className="size-5" />}>
            <MovieExternalLinks ids={externalIds} homepage={null} />
          </MovieSection>
        </FadeIn>
      )}
    </aside>
  );
}
