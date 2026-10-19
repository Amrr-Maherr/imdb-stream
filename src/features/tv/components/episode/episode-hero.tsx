'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Star, Clock, Calendar, ChevronLeft } from 'lucide-react';
import { FadeIn } from '@/features/movies/components/detail/fade-in';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type EpisodeHeroProps = {
  stillPath: string | null;
  name: string;
  tvName: string;
  tvSlug: string;
  tvId: string;
  seasonNumber: string;
  episodeNumber: number;
  voteAverage: number;
  voteCount: number;
  airDate: string | null;
  runtime: number | null;
};

export function EpisodeHero({
  stillPath,
  name,
  tvName,
  tvSlug,
  tvId,
  seasonNumber,
  episodeNumber,
  voteAverage,
  voteCount,
  airDate,
  runtime,
}: EpisodeHeroProps) {
  const t = useTranslations('TvDetail');
  return (
    <FadeIn>
      <section className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
        {stillPath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/original${stillPath}`}
            alt={name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-card" />
        )}

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-black/40" />

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-12">
          <div className="w-full mx-auto app-container">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-medium text-white/70">
                  {tvName && (
                    <>
                      <Link
                        href={`/tv-shows/${tvSlug}/${tvId}`}
                        className="inline-flex items-center gap-1 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                      >
                        <ChevronLeft className="size-3.5 rtl:rotate-180" />
                        {tvName}
                      </Link>
                      <span className="text-white/40" aria-hidden="true">
                        ·
                      </span>
                    </>
                  )}
                  <Link
                    href={`/tv-shows/${tvSlug}/${tvId}/season/${seasonNumber}`}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                  >
                    {t('season')} {seasonNumber}
                  </Link>
                  <span className="text-white/40" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-white/50">
                    {t('episode')} {episodeNumber}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mt-1 break-words">
                  {name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <Star className="size-4 fill-rating-star text-rating-star" />
                    <span className="text-white font-medium">{voteAverage.toFixed(1)}</span>
                    <span className="text-white/50">({voteCount.toLocaleString()})</span>
                  </span>
                  {airDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {new Date(airDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                  {runtime != null && runtime > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {t('runtimeMin', { runtime })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
