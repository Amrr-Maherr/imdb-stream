'use client';

import Link from 'next/link';
import { Flame, Info, Play, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TMDBMovie } from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';

type HeroContentProps = {
  movie: TMDBMovie;
  rank: number;
};

export function HeroContent({ movie, rank }: HeroContentProps) {
  const t = useTranslations('Common');
  const releaseYear = movie.release_date?.slice(0, 4);
  const href = `/movies/${slugify(movie.title)}/${movie.id}`;

  return (
    <div className="relative mx-auto h-full app-container">
      <div className="flex h-full max-w-2xl flex-col justify-end pb-28 pt-24 md:pb-36">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand ring-1 ring-brand/30 backdrop-blur-sm">
          <Flame className="size-3.5" />
          {t('trendingRank', { rank })}
        </span>

        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-7xl">
          {movie.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
          {movie.vote_average > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-rating-star px-2 py-0.5 font-bold text-brand-foreground">
              <Star className="size-3.5 fill-current" />
              {movie.vote_average.toFixed(1)}
            </span>
          )}
          {releaseYear && <span className="font-medium text-white">{releaseYear}</span>}
          {movie.original_language && (
            <span className="rounded border border-white/40 px-1.5 py-px text-xs font-semibold uppercase text-white/90">
              {movie.original_language}
            </span>
          )}
        </div>

        {movie.overview && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 line-clamp-3 sm:text-lg">
            {movie.overview}
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-brand-foreground shadow-glow transition-all hover:scale-[1.03] hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Play className="size-4 fill-current" />
            {t('watch')}
          </Link>

          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Info className="size-4" />
            {t('moreInfo')}
          </Link>
        </div>
      </div>
    </div>
  );
}
