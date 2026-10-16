'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { TVSeasonDetails } from '@/shared/types/tmdb';
import { MovieCast } from '@/features/movies/components/detail/movie-cast';
import { MovieSection } from '@/features/movies/components/detail/movie-section';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { Slider } from '@/shared/components/ui/slider';
import { SeasonEpisodeList } from './season-episode-list';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type SeasonMainContentProps = {
  season: TVSeasonDetails;
  slug: string;
  tvId: string;
  seasonNumber: string;
};

export function SeasonMainContent({ season, slug, tvId, seasonNumber }: SeasonMainContentProps) {
  const tm = useTranslations('MovieDetail');
  const cast = season.credits?.cast ?? [];
  const posters = season.images?.posters ?? [];
  const backdrops = season.images?.backdrops ?? [];
  const photos = [
    ...backdrops.map((image) => ({ image, aspect: 'aspect-video' as const })),
    ...posters.map((image) => ({ image, aspect: 'aspect-[2/3]' as const })),
  ];

  return (
    <div className="flex-1 min-w-0 space-y-10">
      <SeasonEpisodeList
        episodes={season.episodes}
        slug={slug}
        tvId={tvId}
        seasonNumber={seasonNumber}
      />

      {cast.length > 0 && (
        <FadeIn delay={0.1}>
          <MovieCast cast={cast} />
        </FadeIn>
      )}

      {photos.length > 0 && (
        <FadeIn delay={0.15}>
          <MovieSection title={tm('photos')} icon={null}>
            <Slider
              slidesPerView={3}
              slidesMobilePerView={1.5}
              spaceBetween={12}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
            >
              {photos.map(({ image, aspect }) => (
                <div
                  key={image?.file_path}
                  className={`relative ${aspect} w-full overflow-hidden rounded-lg bg-muted`}
                >
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w500${image?.file_path}`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 75vw, 33vw"
                  />
                </div>
              ))}
            </Slider>
          </MovieSection>
        </FadeIn>
      )}
    </div>
  );
}
