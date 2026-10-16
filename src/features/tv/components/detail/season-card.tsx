'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { TVSeason } from '@/shared/types/tmdb';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type SeasonCardProps = {
  season: TVSeason;
  tvId: number;
  tvSlug: string;
  isActive?: boolean;
};

export function SeasonCard({ season, tvId, tvSlug, isActive = false }: SeasonCardProps) {
  const t = useTranslations('TvDetail');
  if (season.season_number === 0) return null;

  return (
    <Link
      href={`/tv-shows/${tvSlug}/${tvId}/season/${season.season_number}`}
      aria-current={isActive ? 'page' : undefined}
      className="group w-full focus-visible:outline-none"
    >
      <div
        className={`relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted ${
          isActive ? 'ring-2 ring-brand ring-offset-2 ring-offset-background' : ''
        }`}
      >
        {season.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w342${season.poster_path}`}
            alt={season.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="180px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-2 text-center">
            {season.name}
          </div>
        )}
      </div>
      <div className="mt-2 space-y-0.5">
        <h3
          className={`text-sm font-medium line-clamp-1 leading-tight ${
            isActive ? 'text-brand' : 'text-foreground'
          }`}
        >
          {season.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {t('episodeCount', { count: season.episode_count })}
          {season.air_date && <> · {season.air_date.slice(0, 4)}</>}
        </p>
      </div>
    </Link>
  );
}
