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
        overlayClassName="bg-black/60"
        className="max-w-4xl gap-0 overflow-hidden p-0 lg:h-[min(36rem,calc(100dvh-2rem))] lg:max-w-5xl"
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <div className="relative shrink-0 bg-muted lg:w-[42%] lg:border-e lg:border-border">
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
                  src={`${TMDB_IMAGE_BASE}/w342${data.poster_path}`}
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
            </div>

            <div className="relative hidden h-full w-full overflow-hidden lg:block">
              {data.poster_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w342${data.poster_path}`}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 42vw, 420px"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted p-6 text-center">
                  <Film className="size-8 text-muted-foreground/70" aria-hidden="true" />
                  <span className="line-clamp-3 text-sm font-medium text-muted-foreground">
                    {title}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col">
            <DialogClose
              aria-label={t('close')}
              className="absolute end-3 top-3 z-30 inline-flex size-9 items-center justify-center rounded-full bg-muted text-foreground ring-1 ring-border shadow-sm transition-colors hover:bg-muted/80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <X className="size-4" aria-hidden="true" />
            </DialogClose>

            <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="p-5 sm:p-7 lg:p-8">
                <div className="pe-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-[11px] font-semibold">
                      {isMovie ? t('movie') : t('tv')}
                    </Badge>
                    {year && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Calendar className="size-3.5" aria-hidden="true" />
                        {year}
                      </span>
                    )}
                  </div>

                  <DialogTitle
                    title={title}
                    className="mt-3 line-clamp-3 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl"
                  >
                    {title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">{title}</DialogDescription>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                    {data.vote_average > 0 && (
                      <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                        <Star
                          className="size-3.5 fill-rating-star text-rating-star"
                          aria-hidden="true"
                        />
                        <span>{data.vote_average.toFixed(1)}</span>
                        {data.vote_count > 0 && (
                          <span className="font-normal text-muted-foreground">
                            ({data.vote_count.toLocaleString(locale)})
                          </span>
                        )}
                      </span>
                    )}
                    {data.original_language && (
                      <span className="inline-flex items-center gap-1">
                        <Languages className="size-3.5" aria-hidden="true" />
                        {data.original_language.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {genres.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}

                {data.overview && (
                  <div className="mt-6 border-t border-border/60 pt-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-4 w-1 rounded-full bg-brand" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-foreground">{t('overview')}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{data.overview}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-border/60 p-4 sm:px-7 sm:py-5 lg:px-8">
              <Button
                asChild
                className="h-10 w-full gap-2 bg-brand px-5 font-semibold text-brand-foreground hover:bg-brand/90 sm:w-auto"
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
