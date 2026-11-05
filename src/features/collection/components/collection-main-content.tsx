'use client';

import Link from 'next/link';
import Image from '@/shared/components/ui/image';
import { Star, Film, Tv, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CollectionPart } from '@/shared/types/tmdb';
import { getHref, getTitle, isTV } from '@/features/collection/utils/collection-helpers';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { SectionTitle } from '@/features/movies/components/detail/movie-section';
import { EmptyState } from '@/shared/components/empty-state';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type CollectionMainContentProps = {
  overview: string;
  parts: CollectionPart[];
};

export function CollectionMainContent({ overview, parts }: CollectionMainContentProps) {
  const t = useTranslations('Collection');
  const td = useTranslations('MovieDetail');
  return (
    <div className="flex-1 min-w-0 space-y-10">
      {/* Overview */}
      {overview && (
        <FadeIn>
          <section className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.035] p-5 shadow-sm sm:p-6">
            <SectionTitle>{td('storyline')}</SectionTitle>
            <p className="leading-relaxed text-muted-foreground">{overview}</p>
          </section>
        </FadeIn>
      )}

      {parts.length > 0 && (
        <FadeIn delay={0.05}>
          <section aria-labelledby="collection-titles-heading">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <SectionTitle className="mb-0 flex-1">
                <span id="collection-titles-heading">{t('titlesInCollection')}</span>
              </SectionTitle>
              <span className="shrink-0 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold text-foreground">
                {t('titlesCount', { count: parts.length })}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-4 xl:grid-cols-5">
              {parts.map((part, index) => {
                const title = getTitle(part);
                const year = part.release_date?.slice(0, 4);
                const href = getHref(part);
                const isTvShow = isTV(part);
                const MediaIcon = isTvShow ? Tv : Film;

                return (
                  <Link
                    key={`${isTvShow ? 'tv' : 'movie'}-${part.id}`}
                    href={href}
                    className="group flex min-w-0 flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-brand/50">
                      {part.poster_path ? (
                        <>
                          <Image
                            src={`${TMDB_IMAGE_BASE}/w342${part.poster_path}`}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                        </>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 p-3 text-center text-muted-foreground">
                          <MediaIcon className="size-8 opacity-40" />
                          <span className="line-clamp-4 text-sm font-medium">{title}</span>
                        </div>
                      )}
                      <span className="absolute start-2 top-2 flex size-7 items-center justify-center rounded-lg bg-black/60 text-[11px] font-bold text-white backdrop-blur-sm">
                        {index + 1}
                      </span>
                      {part.vote_average > 0 && (
                        <div className="absolute end-2 top-2 flex items-center gap-1 rounded-lg bg-background/90 px-2 py-1 text-xs font-bold text-foreground shadow-sm backdrop-blur-sm">
                          <Star className="size-3 fill-rating-star text-rating-star" />
                          <span>{part.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 text-[11px] font-medium text-white">
                        <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full bg-black/45 px-2 py-1 backdrop-blur-sm">
                          <MediaIcon className="size-3 shrink-0" />
                          <span className="truncate">
                            {t(isTvShow ? 'tvShowType' : 'movieType')}
                          </span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-[-90deg]" />
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5 px-0.5">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                        {title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        {year && <span>{year}</span>}
                        {part.original_language && (
                          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                            {part.original_language}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {parts.length === 0 && <EmptyState title={t('collectionEmpty')} className="py-16" />}
    </div>
  );
}
