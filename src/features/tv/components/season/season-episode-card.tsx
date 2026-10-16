'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Play, Star } from 'lucide-react';
import type { TVEpisode } from '@/shared/types/tmdb';
import { Badge } from '@/shared/components/ui/badge';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const EPISODE_TYPE_KEYS: Record<string, string> = {
  season_premiere: 'episodeTypeSeasonPremiere',
  finale: 'episodeTypeFinale',
  season_finale: 'episodeTypeSeasonFinale',
};

type SeasonEpisodeCardProps = {
  episode: TVEpisode;
  slug: string;
  tvId: string;
  seasonNumber: string;
};

export function SeasonEpisodeCard({
  episode,
  slug,
  tvId,
  seasonNumber,
}: SeasonEpisodeCardProps) {
  const t = useTranslations('TvDetail');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const typeKey = episode.episode_type ? EPISODE_TYPE_KEYS[episode.episode_type] : undefined;
  const showRating = episode.vote_count > 0;
  const runtime = episode.runtime ?? 0;
  const showRuntime = runtime > 0;

  return (
    <Link
      href={`/tv-shows/${slug}/${tvId}/season/${seasonNumber}/episode/${episode.episode_number}`}
      className="group flex gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-4 sm:p-4"
    >
      <div className="relative w-[120px] sm:w-[180px] aspect-video flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        {episode.still_path ? (
          <>
            <Image
              src={`${TMDB_IMAGE_BASE}/w300${episode.still_path}`}
              alt={episode.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 120px, 180px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
                <Play className="size-5 fill-white text-white ltr:ml-0.5 rtl:mr-0.5" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            {tc('noImage')}
          </div>
        )}
        <div className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white rtl:left-auto rtl:right-1.5">
          {episode.episode_number}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
            {episode.name}
          </h3>
          {showRating && (
            <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-rating-star text-rating-star" />
              <span>{episode.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {typeKey && (
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
              {t(typeKey)}
            </Badge>
          )}
          {episode.air_date && (
            <span>
              {new Date(episode.air_date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {showRuntime && (
            <>
              <span className="text-muted-foreground/50" aria-hidden="true">
                ·
              </span>
              <span>{t('runtimeMin', { runtime })}</span>
            </>
          )}
        </div>

        {episode.overview && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {episode.overview}
          </p>
        )}
      </div>
    </Link>
  );
}
