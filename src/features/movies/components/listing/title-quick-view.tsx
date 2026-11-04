'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Calendar, Eye, Film, Languages, Star, X } from 'lucide-react';
import type { TMDBMovie, TMDBTV } from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Link } from '@/i18n/navigation';
import {
  Dialog,
  DialogClose,
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
  const locale = useLocale();

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

      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/75 backdrop-blur-md"
        className="max-w-4xl gap-0 overflow-hidden rounded-3xl border-border/70 bg-card p-0 shadow-2xl ring-1 ring-brand/10 sm:w-[calc(100%-3rem)] lg:h-[min(40rem,calc(100dvh-2rem))] lg:max-w-5xl"
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <div className="relative shrink-0 overflow-hidden bg-muted lg:w-[40%] lg:border-e lg:border-border/60">
            <div className="relative aspect-[16/9] w-full overflow-hidden lg:hidden">
              {data.backdrop_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w780${data.backdrop_path}`}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : data.poster_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w780${data.poster_path}`}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <Film className="size-8 text-muted-foreground/70" aria-hidden="true" />
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20"
                aria-hidden="true"
              />
              {data.vote_average > 0 && (
                <div className="absolute bottom-3 start-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">
                  <Star className="size-4 fill-rating-star text-rating-star" aria-hidden="true" />
                  {data.vote_average.toFixed(1)}
                  {data.vote_count > 0 && (
                    <span className="text-xs font-medium text-white/70">
                      ({data.vote_count.toLocaleString(locale)})
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="relative hidden h-full w-full overflow-hidden lg:block">
              {data.poster_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w500${data.poster_path}`}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 40vw, 480px"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted p-6 text-center">
                  <Film className="size-8 text-muted-foreground/70" aria-hidden="true" />
                  <span className="line-clamp-3 text-sm font-medium text-muted-foreground">
                    {title}
                  </span>
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/20"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <Badge
                  variant="brand"
                  className="mb-3 rounded-full px-3 py-1 text-xs font-bold shadow-lg"
                >
                  {isMovie ? t('movie') : t('tv')}
                </Badge>
                {data.vote_average > 0 && (
                  <div className="flex items-center gap-2 text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-sm font-bold backdrop-blur-md">
                      <Star
                        className="size-4 fill-rating-star text-rating-star"
                        aria-hidden="true"
                      />
                      {data.vote_average.toFixed(1)}
                    </span>
                    {data.vote_count > 0 && (
                      <span className="text-xs text-white/75">
                        {data.vote_count.toLocaleString(locale)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col bg-gradient-to-br from-card via-card to-brand/[0.04]">
            <DialogClose
              aria-label={t('close')}
              className="absolute end-4 top-4 z-30 inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:border-brand/40 hover:bg-brand/10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <X className="size-4" aria-hidden="true" />
            </DialogClose>

            <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="p-5 sm:p-7 lg:p-8">
                <div className="pe-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="brand" className="rounded-full px-3 py-1 text-[11px] font-bold">
                      {isMovie ? t('movie') : t('tv')}
                    </Badge>
                    {year && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        <Calendar className="size-3.5 text-brand" aria-hidden="true" />
                        {year}
                      </span>
                    )}
                  </div>

                  <DialogTitle
                    title={title}
                    className="mt-4 line-clamp-3 text-3xl leading-[1.1] font-black tracking-tight text-foreground sm:text-4xl"
                  >
                    {title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">{title}</DialogDescription>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {data.vote_average > 0 && (
                      <span className="inline-flex items-center gap-2 rounded-xl border border-brand/25 bg-brand/[0.08] px-3 py-2 text-sm font-bold text-foreground">
                        <Star
                          className="size-4 fill-rating-star text-rating-star"
                          aria-hidden="true"
                        />
                        {data.vote_average.toFixed(1)}
                        <span className="text-xs font-medium text-muted-foreground">
                          {data.vote_count > 0 ? `· ${data.vote_count.toLocaleString(locale)}` : ''}
                        </span>
                      </span>
                    )}
                    {data.original_language && (
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-xs font-semibold text-muted-foreground">
                        <Languages className="size-3.5" aria-hidden="true" />
                        {data.original_language.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {genres.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="rounded-full border border-brand/15 bg-brand/[0.06] px-3 py-1 text-xs font-medium"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}

                {data.overview && (
                  <div className="mt-7 rounded-2xl border border-border/60 bg-muted/35 p-4 sm:p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
                        <Film className="size-4" aria-hidden="true" />
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{t('overview')}</h3>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{data.overview}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-border/60 bg-background/70 p-4 backdrop-blur-sm sm:px-7 sm:py-5 lg:px-8">
              <Button
                asChild
                className="h-11 w-full gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/15 transition-all hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-brand/25 sm:w-auto"
              >
                <Link href={href}>
                  {t('viewDetails')}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
