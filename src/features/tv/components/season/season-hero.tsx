'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Calendar, ChevronLeft, Star } from 'lucide-react';
import type { TVSeasonDetails } from '@/shared/types/tmdb';
import { FadeIn } from '@/features/movies/components/detail/fade-in';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type SeasonHeroProps = {
  season: TVSeasonDetails;
  backdropPath: string | null;
  tvName: string;
  tvSlug: string;
  tvId: string;
};

export function SeasonHero({ season, backdropPath, tvName, tvSlug, tvId }: SeasonHeroProps) {
  const t = useTranslations('TvDetail');
  const year = season.air_date?.slice(0, 4) ?? null;
  const episodeCount = season.episodes?.length ?? 0;
  const hasRating = season.vote_average > 0;

  return (
    <FadeIn>
      <section className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        {backdropPath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/original${backdropPath}`}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-card" />
        )}

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-6 sm:pb-10 md:pb-14">
          <div className="w-full mx-auto app-container">
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="relative w-[92px] sm:w-[140px] lg:w-[160px] aspect-[2/3] flex-shrink-0 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                {season.poster_path ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w342${season.poster_path}`}
                    alt={season.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 92px, 160px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted p-2 text-center text-xs text-muted-foreground">
                    {season.name}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                {tvName && (
                  <Link
                    href={`/tv-shows/${tvSlug}/${tvId}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <ChevronLeft className="size-3.5 rtl:rotate-180" />
                    {tvName}
                  </Link>
                )}
                <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
                  {season.name}
                </h1>

                {(year || episodeCount > 0 || hasRating) && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
                    {year && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {year}
                      </span>
                    )}
                    {episodeCount > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <span className="text-white/40" aria-hidden="true">
                          ·
                        </span>
                        {t('episodeCount', { count: episodeCount })}
                      </span>
                    )}
                    {hasRating && (
                      <span className="inline-flex items-center gap-1">
                        <span className="text-white/40" aria-hidden="true">
                          ·
                        </span>
                        <Star className="size-3.5 fill-rating-star text-rating-star" />
                        <span className="font-medium text-white">
                          {season.vote_average.toFixed(1)}
                        </span>
                      </span>
                    )}
                  </div>
                )}

                {season.overview && (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 line-clamp-2 sm:line-clamp-3">
                    {season.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
