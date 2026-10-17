'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { TMDBEpisodeDetails } from '@/shared/types/tmdb';
import { Users, Film, Link2 } from 'lucide-react';
import { MovieSection } from '@/features/movies/components/detail/movie-section';
import { MovieVideos } from '@/features/movies/components/detail/movie-videos';
import { MovieExternalLinks } from '@/features/movies/components/detail/movie-external-links';
import { MovieCast } from '@/features/movies/components/detail/movie-cast';
import { CastCard } from '@/features/movies/components/detail/cast-card';
import { MovieCrewSection } from '@/features/movies/components/detail/movie-crew';
import { PRIORITY_JOBS } from '@/features/movies/utils/crew-helpers';
import { getDirector, getProducers, getWriters } from '@/features/tv/utils/episode-crew';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { Slider } from '@/shared/components/ui/slider';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type EpisodeMainContentProps = {
  ep: TMDBEpisodeDetails;
};

export function EpisodeMainContent({ ep }: EpisodeMainContentProps) {
  const t = useTranslations('TvDetail');
  const stills = ep.images?.stills ?? [];
  const videos = ep.videos?.results ?? [];
  const director = getDirector(ep.crew);
  const writers = getWriters(ep.crew);
  const producers = getProducers(ep.crew);
  const hasKeyCrew = ep.crew.some((m) => PRIORITY_JOBS.includes(m.job));

  const externalIds = ep.external_ids
    ? {
        imdb_id: ep.external_ids.imdb_id,
        facebook_id: null as string | null,
        instagram_id: null as string | null,
        twitter_id: null as string | null,
        wikidata_id: ep.external_ids.wikidata_id ?? null,
      }
    : null;

  return (
    <div className="order-2 flex-1 min-w-0 space-y-10 lg:order-1">
      <FadeIn>
        <section>
          {ep.overview && <p className="text-muted-foreground leading-relaxed">{ep.overview}</p>}

          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-muted-foreground">
            {director && (
              <p>
                <span className="font-medium text-foreground">{t('director')}:</span>{' '}
                {director.name}
              </p>
            )}
            {writers.length > 0 && (
              <p>
                <span className="font-medium text-foreground">
                  {writers.length > 1 ? t('writers') : t('writer')}:
                </span>{' '}
                {writers.map((w) => w.name).join(', ')}
              </p>
            )}
            {producers.length > 0 && (
              <p>
                <span className="font-medium text-foreground">
                  {producers.length > 1 ? t('producers') : t('producer')}:
                </span>{' '}
                {producers.map((p) => p.name).join(', ')}
              </p>
            )}
          </div>
        </section>
      </FadeIn>

      {hasKeyCrew && (
        <FadeIn delay={0.05}>
          <MovieSection title={t('crew')} icon={<Users className="size-5" />}>
            <MovieCrewSection crew={ep.crew} />
          </MovieSection>
        </FadeIn>
      )}

      {(ep.credits?.cast?.length ?? 0) > 0 && (
        <FadeIn delay={0.1}>
          <MovieCast cast={ep.credits?.cast ?? []} />
        </FadeIn>
      )}

      {ep.guest_stars.length > 0 && (
        <FadeIn delay={0.15}>
          <MovieSection title={t('guestStars')} icon={<Users className="size-5" />}>
            <Slider
              slidesPerView={6}
              slidesMobilePerView={3}
              spaceBetween={16}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
            >
              {ep.guest_stars.map((star) => (
                <CastCard
                  key={star.credit_id}
                  id={star.id}
                  name={star.name}
                  character={star.character}
                  profilePath={star.profile_path}
                  creditId={star.credit_id}
                />
              ))}
            </Slider>
          </MovieSection>
        </FadeIn>
      )}

      {videos.length > 0 && (
        <FadeIn delay={0.2}>
          <MovieVideos videos={videos} />
        </FadeIn>
      )}

      {stills.length > 0 && (
        <FadeIn delay={0.25}>
          <MovieSection title={t('episodeImages')} icon={<Film className="size-5" />}>
            <Slider
              slidesPerView={3}
              slidesMobilePerView={1.5}
              spaceBetween={12}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
            >
              {stills.map((img) => (
                <div
                  key={img?.file_path}
                  className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w500${img?.file_path}`}
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

      {externalIds && (
        <FadeIn delay={0.25}>
          <MovieSection title={t('externalLinks')} icon={<Link2 className="size-5" />}>
            <MovieExternalLinks ids={externalIds} homepage={null} />
          </MovieSection>
        </FadeIn>
      )}
    </div>
  );
}
