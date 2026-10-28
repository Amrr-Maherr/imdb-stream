'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Flame, Star, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TMDBMovie } from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';
import { Rail } from './rail';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type FeaturedRowProps = {
  title: string;
  spotlight: TMDBMovie;
  genreMap?: Record<number, string>;
  children?: React.ReactNode;
};

/** Most popular row: the #1 title gets a cinematic banner, the rest follow in a rail. */
export function FeaturedRow({ title, spotlight, genreMap, children }: FeaturedRowProps) {
  const t = useTranslations('HomePage');
  const tc = useTranslations('Common');
  const year = spotlight.release_date?.slice(0, 4);
  const href = `/movies/${slugify(spotlight.title)}/${spotlight.id}`;
  const genres = spotlight.genre_ids
    ?.slice(0, 3)
    .map((id) => genreMap?.[id])
    .filter((name): name is string => Boolean(name));

  const banner = (
    <Link
      href={href}
      className="group relative mb-6 block overflow-hidden rounded-3xl bg-black ring-1 ring-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[2/1] lg:aspect-[3/1]">
        {(spotlight.backdrop_path || spotlight.poster_path) && (
          <Image
            src={
              spotlight.backdrop_path
                ? `${TMDB_IMAGE_BASE}/w1280${spotlight.backdrop_path}`
                : `${TMDB_IMAGE_BASE}/w500${spotlight.poster_path}`
            }
            alt={spotlight.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
        )}
        <div className="pointer-events-none absolute inset-0 scrim-bottom sm:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden scrim-start sm:block" />

        <div className="absolute inset-0 flex items-end p-5 sm:items-center sm:p-8 lg:p-12">
          <div className="flex max-w-xl items-center gap-6">
            {spotlight.poster_path && (
              <div className="relative hidden aspect-2/3 w-36 shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 lg:block xl:w-44">
                <Image
                  src={`${TMDB_IMAGE_BASE}/w342${spotlight.poster_path}`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
            )}
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground">
                <Flame className="size-3.5" />
                {t('mostPopular')}
              </span>
              <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-white text-balance sm:text-4xl">
                {spotlight.title}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/80">
                {spotlight.vote_average > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-rating-star px-2 py-0.5 font-bold text-brand-foreground">
                    <Star className="size-3.5 fill-current" />
                    {spotlight.vote_average.toFixed(1)}
                  </span>
                )}
                {year && <span className="font-medium text-white">{year}</span>}
                {genres?.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-xs backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              {spotlight.overview && (
                <p className="mt-3 hidden text-sm leading-relaxed text-white/80 sm:line-clamp-3">
                  {spotlight.overview}
                </p>
              )}
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                {tc('moreInfo')}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <Rail
      title={title}
      subtitle={t('popularMoviesDesc')}
      icon={TrendingUp}
      viewAllHref="/movies"
      viewAllLabel={t('viewAll')}
      before={banner}
    >
      {children}
    </Rail>
  );
}
