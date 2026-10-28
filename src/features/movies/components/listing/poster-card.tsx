'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Badge } from '@/shared/components/ui/badge';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type PosterCardProps = {
  href: string;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  adult?: boolean;
  /** Short facts under the title, e.g. year and language. */
  meta: (string | null | undefined)[];
  genres?: string[];
  showRank?: number;
  /** Short label on the poster, e.g. a release date. */
  badge?: string;
  /** Rendered over the poster (the quick view trigger). */
  overlay?: ReactNode;
};

/**
 * Shared poster tile for movies and TV shows: the artwork leads, with the rating on the
 * poster and only the title plus a single line of facts underneath.
 */
export function PosterCard({
  href,
  title,
  posterPath,
  voteAverage,
  adult,
  meta,
  genres,
  showRank,
  badge,
  overlay,
}: PosterCardProps) {
  const t = useTranslations('Movies');
  const facts = meta.filter(Boolean);

  return (
    <div className="group relative w-full">
      {showRank && (
        <div className="absolute -top-2 -start-2 z-30 flex size-8 items-center justify-center rounded-full bg-brand text-sm font-black text-brand-foreground shadow-lg ring-2 ring-background">
          {showRank}
        </div>
      )}

      <Link
        href={href}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-brand/50">
          {posterPath ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w342${posterPath}`}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 45vw, (max-width: 1280px) 22vw, 220px"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center">
              <span className="text-3xl font-black text-muted-foreground/40">
                {title.charAt(0).toUpperCase()}
              </span>
              <span className="line-clamp-3 text-xs font-medium text-muted-foreground">
                {title}
              </span>
            </div>
          )}

          {adult && (
            <>
              {/* Adults-only blur over the poster. */}
              <div
                className="pointer-events-none absolute inset-0 z-10 bg-background/40 backdrop-blur-md"
                aria-hidden="true"
              />
              <Badge
                role="img"
                aria-label={t('adultBadgeLabel')}
                className="pointer-events-none absolute bottom-2 start-2 z-30 bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm"
              >
                {t('adultBadge')}
              </Badge>
            </>
          )}

          {badge && (
            <span className="absolute start-2 top-2 z-10 rounded-md bg-brand px-1.5 py-0.5 text-[11px] font-bold text-brand-foreground shadow-sm">
              {badge}
            </span>
          )}

          {voteAverage > 0 && (
            <div className="absolute end-2 top-2 z-10 flex items-center gap-0.5 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
              <Star className="size-3 fill-rating-star text-rating-star" />
              <span>{voteAverage.toFixed(1)}</span>
            </div>
          )}

          {/* Genres reveal on hover so they don't cover the artwork at rest */}
          {genres && genres.length > 0 && (
            <div className="absolute inset-x-0 bottom-0 z-10 hidden translate-y-2 flex-wrap gap-1 scrim-bottom p-2 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-2.5 space-y-0.5 px-0.5">
          <h3 className="line-clamp-1 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-brand">
            {title}
          </h3>
          {facts.length > 0 && (
            <p className="line-clamp-1 text-xs text-muted-foreground">{facts.join(' · ')}</p>
          )}
        </div>
      </Link>

      {overlay}
    </div>
  );
}
