'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Tv } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getHref, getTitle, type ListItem } from '@/features/list/utils/list-helpers';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { SectionTitle } from '@/features/movies/components/detail/movie-section';
import { EmptyState } from '@/shared/components/empty-state';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type ListMainContentProps = {
  name: string;
  description: string | null;
  items: ListItem[];
};

export function ListMainContent({ name, description, items }: ListMainContentProps) {
  const t = useTranslations('List');
  const isMovie = items.every((item) => item.media_type === 'movie');
  const isTV = items.every((item) => item.media_type === 'tv');

  return (
    <div className="flex-1 min-w-0 space-y-10">
      {/* Description */}
      {description && (
        <FadeIn>
          <section className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.035] p-5 shadow-sm sm:p-6">
            <SectionTitle>{t('about')}</SectionTitle>
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          </section>
        </FadeIn>
      )}

      {/* Items grid */}
      {items.length > 0 && (
        <FadeIn delay={0.05}>
          <section className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.025] p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <SectionTitle className="mb-0 flex-1">
                {isMovie ? t('movies') : isTV ? t('tvShows') : t('titles')}
              </SectionTitle>
              <span className="shrink-0 rounded-full border border-brand/15 bg-background/80 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {items.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((item) => {
                const title = getTitle(item);
                const year = (item.release_date || item.first_air_date || '').slice(0, 4);
                const href = getHref(item);

                return (
                  <Link key={item.id} href={href} className="group flex flex-col">
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-brand/50">
                      {item.poster_path ? (
                        <Image
                          src={`${TMDB_IMAGE_BASE}/w342${item.poster_path}`}
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
                      {item.vote_average > 0 && (
                        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-bold rounded bg-background/80 text-foreground backdrop-blur-sm">
                          <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
                          <span>{item.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      <h3 className="text-sm font-semibold text-foreground line-clamp-1 leading-tight group-hover:text-brand transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                        {year && <span>{year}</span>}
                        <span className="flex items-center gap-0.5">
                          <Star className="size-3 fill-rating-star text-rating-star" />
                          <span>{item.vote_average.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {items.length === 0 && <EmptyState title={t('empty')} className="py-16" />}
    </div>
  );
}
