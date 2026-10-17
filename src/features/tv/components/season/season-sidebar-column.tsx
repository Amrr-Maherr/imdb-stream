'use client';

import { Link2, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TVSeasonDetails, TVSeason } from '@/shared/types/tmdb';
import { MovieSection } from '@/features/movies/components/detail/movie-section';
import { MovieExternalLinks } from '@/features/movies/components/detail/movie-external-links';
import { MovieVideos } from '@/features/movies/components/detail/movie-videos';
import { CrewCard } from '@/features/movies/components/detail/crew-card';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { Slider } from '@/shared/components/ui/slider';
import { TvSeasons } from '@/features/tv/components/detail/tv-seasons';
import { SeasonMetadata } from './season-metadata';
import { seasonCrew } from '@/features/tv/utils/season-credits';

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
  const crew = seasonCrew(season);
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

  return (
    <aside className="w-full space-y-8 lg:sticky lg:top-20 lg:w-80 xl:w-96 lg:flex-shrink-0 lg:self-start">
      <FadeIn delay={0.05}>
        <SeasonMetadata season={season} />
      </FadeIn>

      {crew.length > 0 && (
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
              {crew.slice(0, 20).map((member, index) => (
                <CrewCard
                  key={`${member.credit_id}-${index}`}
                  id={member.id}
                  name={member.name}
                  job={member.job}
                  department={member.department}
                  profilePath={member.profile_path}
                  creditId={member.credit_id}
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
