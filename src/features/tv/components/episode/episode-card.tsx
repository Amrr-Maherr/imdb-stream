'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Star, Play } from 'lucide-react';
import type { TVEpisode } from '@/shared/types/tmdb';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type EpisodeCardProps = {
  episode: TVEpisode;
  slug: string;
  tvId: string;
  seasonNumber: string;
};

export function EpisodeCard({ episode, slug, tvId, seasonNumber }: EpisodeCardProps) {
  const t = useTranslations('TvDetail');
  const tc = useTranslations('Common');

  return (
    <Link
      href={`/tv-shows/${slug}/${tvId}/season/${seasonNumber}/episode/${episode.episode_number}`}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted mb-2">
        {episode.still_path ? (
          <>
            <Image
              src={`${TMDB_IMAGE_BASE}/w300${episode.still_path}`}
              alt={episode.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105"
              sizes="(max-width: 640px) 60vw, 240px"
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
        <div className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {episode.episode_number}
        </div>
      </div>

      <p className="text-sm font-medium leading-tight text-foreground truncate transition-colors group-hover:text-brand">
        {episode.name}
      </p>

      {(episode.vote_count > 0 || (episode.runtime != null && episode.runtime > 0)) && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          {episode.vote_count > 0 && (
            <span className="flex items-center gap-1">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {episode.vote_average.toFixed(1)}
            </span>
          )}
          {episode.vote_count > 0 && episode.runtime != null && episode.runtime > 0 && (
            <span className="text-muted-foreground/50" aria-hidden="true">
              ·
            </span>
          )}
          {episode.runtime != null && episode.runtime > 0 && (
            <span>{t('runtimeMin', { runtime: episode.runtime })}</span>
          )}
        </div>
      )}
    </Link>
  );
}
