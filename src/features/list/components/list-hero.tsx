'use client';

import { List as ListIcon, Heart, Film } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/features/movies/components/detail/fade-in';

type ListHeroProps = {
  name: string;
  description: string | null;
  itemCount: number;
  favoriteCount: number;
};

export function ListHero({ name, description, itemCount, favoriteCount }: ListHeroProps) {
  const t = useTranslations('List');
  return (
    <FadeIn>
      <section className="relative isolate overflow-hidden border-b border-brand/15 bg-gradient-to-b from-brand/[0.05] to-background pt-20 md:pt-24">
        <div
          className="pointer-events-none absolute -end-24 -top-20 size-96 rounded-full bg-brand/[0.1] blur-3xl"
          aria-hidden="true"
        />
        <div className="app-container relative py-5 md:py-7">
          <div className="relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-card via-card to-brand/[0.06] p-5 shadow-xl shadow-black/[0.04] sm:p-7 md:p-9">
            <div
              className="pointer-events-none absolute -end-12 -top-20 size-64 rounded-full bg-brand/[0.08] blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-4 sm:gap-6">
              <div className="hidden size-20 shrink-0 items-center justify-center rounded-2xl border border-brand/20 bg-brand/[0.1] text-brand shadow-inner shadow-brand/10 sm:flex md:size-24">
                <ListIcon className="size-10 md:size-12" />
              </div>

              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.08] px-3 py-1 text-xs font-bold text-brand">
                  <ListIcon className="size-3.5" />
                  {t('list')}
                </span>
                <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {name}
                </h1>

                {description && (
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 shadow-sm">
                    <Film className="size-3.5 text-brand" />
                    {t('itemCount', { count: itemCount })}
                  </span>
                  {favoriteCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 shadow-sm">
                      <Heart className="size-3.5 text-brand" />
                      {favoriteCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
