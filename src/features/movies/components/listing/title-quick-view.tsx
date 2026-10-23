'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, Calendar, Eye, Languages, Star } from 'lucide-react';
import type { TMDBMovie, TMDBTV } from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';
import { Badge } from '@/shared/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type MediaType = 'movie' | 'tv';

type TitleQuickViewProps =
  | { mediaType: 'movie'; data: TMDBMovie; genreMap?: Record<number, string> }
  | { mediaType: 'tv'; data: TMDBTV; genreMap?: Record<number, string> };

export function TitleQuickView(props: TitleQuickViewProps) {
  const { data, genreMap } = props;
  const t = useTranslations('QuickView');

  const isMovie = 'title' in data;
  const title = isMovie ? data.title : data.name;
  const date = isMovie ? data.release_date : data.first_air_date;
  const year = date?.slice(0, 4);
  const genres = (data.genre_ids ?? [])
    .map((id) => genreMap?.[id])
    .filter((name): name is string => Boolean(name));
  const href = isMovie
    ? `/movies/${slugify(title)}/${data.id}`
    : `/tv-shows/${slugify(title)}/${data.id}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={t('open')}
          className="pointer-events-none md:block hidden absolute inset-x-0 top-0 z-20 flex aspect-[2/3] items-center justify-center rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <span className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md ring-1 ring-border backdrop-blur-sm">
            <Eye className="size-3.5" />
            {t('open')}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl gap-0 p-0 lg:max-w-5xl" closeLabel={t('close')}>
        <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
          {data.backdrop_path && (
            <Image
              src={`${TMDB_IMAGE_BASE}/w780${data.backdrop_path}`}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 sm:p-6">
            {data.poster_path && (
              <div className="relative hidden aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-border sm:block">
                <Image
                  src={`${TMDB_IMAGE_BASE}/w342${data.poster_path}`}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl font-bold leading-tight sm:text-2xl">
                {title}
              </DialogTitle>
              <DialogDescription className="sr-only">{title}</DialogDescription>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {year && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {year}
                  </span>
                )}
                {data.vote_average > 0 && (
                  <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                    <Star className="size-3.5 fill-rating-star text-rating-star" />
                    {data.vote_average.toFixed(1)}
                  </span>
                )}
                {data.vote_count > 0 && <span>({data.vote_count.toLocaleString()})</span>}
                {data.original_language && (
                  <span className="inline-flex items-center gap-1">
                    <Languages className="size-3.5" />
                    {data.original_language.toUpperCase()}
                  </span>
                )}
              </div>
              {genres.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-h-[45vh] space-y-5 overflow-y-auto p-5 sm:p-6">
          {data.overview && (
            <p className="text-sm leading-relaxed text-muted-foreground">{data.overview}</p>
          )}

          <div className="flex flex-wrap gap-2">
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
            >
              {t('viewDetails')}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
