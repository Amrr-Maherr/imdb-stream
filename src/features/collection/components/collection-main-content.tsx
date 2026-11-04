'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Calendar, Film, Tv, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CollectionPart } from '@/shared/types/tmdb';
import { getHref, getTitle, isTV } from '@/features/collection/utils/collection-helpers';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { SectionTitle } from '@/features/movies/components/detail/movie-section';
import { EmptyState } from '@/shared/components/empty-state';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type CollectionMainContentProps = {
  name: string;
  overview: string;
  parts: CollectionPart[];
};

export function CollectionMainContent({ name, overview, parts }: CollectionMainContentProps) {
  const t = useTranslations('Collection');
  const td = useTranslations('MovieDetail');
  const tc = useTranslations('Common');
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

      {/* Collection Timeline */}
      {parts.length > 0 && (
        <FadeIn delay={0.05}>
          <section className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.025] p-4 shadow-sm sm:p-6">
            <SectionTitle>{t('collectionTimeline')}</SectionTitle>
            <div className="space-y-3">
              {parts.map((part, index) => {
                const title = getTitle(part);
                const year = part.release_date?.slice(0, 4);
                const href = getHref(part);
                const MediaIcon = isTV(part) ? Tv : Film;

                return (
                  <Link
                    key={part.id}
                    href={href}
                    className="group flex gap-4 rounded-2xl border border-border/70 bg-background/60 p-3 transition-all hover:border-brand/30 hover:bg-brand/[0.035] hover:shadow-md sm:p-4"
                  >
                    <div className="relative w-[100px] sm:w-[120px] aspect-[2/3] flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      {part.poster_path ? (
                        <>
                          <Image
                            src={`${TMDB_IMAGE_BASE}/w185${part.poster_path}`}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                              <Play className="size-5 text-white ml-0.5" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          {tc('noImage')}
                        </div>
                      )}
                      <div className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        #{index + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                          {title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                          <Star className="size-3 fill-rating-star text-rating-star" />
                          <span>{part.vote_average.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MediaIcon className="size-3" />
                        {year && (
                          <>
                            <span>{year}</span>
                          </>
                        )}
                        {part.original_language && (
                          <>
                            <span className="text-muted-foreground/50">·</span>
                            <span className="uppercase">{part.original_language}</span>
                          </>
                        )}
                      </div>

                      {part.overview && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {part.overview}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Grid of all collection items */}
      {parts.length > 0 && (
        <FadeIn delay={0.1}>
          <section className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.025] p-4 shadow-sm sm:p-6">
            <SectionTitle>{t('titlesInCollection')}</SectionTitle>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {parts.map((part, index) => {
                const title = getTitle(part);
                const year = part.release_date?.slice(0, 4);
                const href = getHref(part);

                return (
                  <Link key={part.id} href={href} className="group flex flex-col">
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-brand/50">
                      {part.poster_path ? (
                        <Image
                          src={`${TMDB_IMAGE_BASE}/w342${part.poster_path}`}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-2 text-center">
                          {title}
                        </div>
                      )}
                      {part.vote_average > 0 && (
                        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-bold rounded bg-background/80 text-foreground backdrop-blur-sm">
                          <Star className="size-2.5 fill-rating-star text-rating-star" />
                          <span>{part.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <h3 className="text-sm font-semibold text-foreground line-clamp-1 leading-tight group-hover:text-brand transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                        {year && <span>{year}</span>}
                        <span className="flex items-center gap-0.5">
                          <Star className="size-3 fill-rating-star text-rating-star" />
                          <span>{part.vote_average.toFixed(1)}</span>
                        </span>
                        {part.original_language && (
                          <span className="text-[10px] text-muted-foreground/60 uppercase">
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
