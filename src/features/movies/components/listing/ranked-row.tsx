'use client';

import Image from 'next/image';
import { Film, Star, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Slider } from '@/shared/components/ui/slider';
import { slugify } from '@/shared/utils/slugify';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from './section-header';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type RankedItem = {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  year?: string;
  mediaType: 'movie' | 'tv';
};

type RankedRowProps = {
  title: string;
  subtitle?: string;
  items: RankedItem[];
  viewAllHref?: string;
};

/** "Top 10" row: oversized outlined rank numbers tucked behind each poster. */
export function RankedRow({ title, subtitle, items, viewAllHref }: RankedRowProps) {
  const t = useTranslations('HomePage');

  return (
    <section className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/[0.09] via-card to-card p-4 shadow-xl shadow-black/[0.05] sm:p-6">
      <div
        className="pointer-events-none absolute -end-24 -top-32 size-80 rounded-full bg-brand/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          eyebrow={t('top10')}
          icon={Trophy}
          viewAllHref={viewAllHref}
          viewAllLabel={t('viewAll')}
        />
        <div className="rail-pad -mt-3">
          <Slider
            slidesPerView={1.7}
            breakpoints={{
              640: { slidesPerView: 2.7 },
              1024: { slidesPerView: 3.7 },
              1440: { slidesPerView: 4.3 },
            }}
            spaceBetween={20}
            grabCursor
          >
            {items.slice(0, 10).map((item, index) => {
              const href =
                item.mediaType === 'movie'
                  ? `/movies/${slugify(item.title)}/${item.id}`
                  : `/tv-shows/${slugify(item.title)}/${item.id}`;

              return (
                <Link
                  key={item.id}
                  href={href}
                  className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-card"
                  aria-label={`${index + 1}. ${item.title}`}
                >
                  <div className="flex items-end">
                    <span
                      aria-hidden="true"
                      className="rank-numeral -me-6 min-w-0 flex-1 select-none text-end text-[8rem] font-black leading-[0.75] tracking-tighter text-transparent transition-colors duration-300 group-hover:text-brand/20 md:-me-8 md:text-[11rem]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative z-10 w-[64%] shrink-0">
                      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border/70 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-brand/10 group-hover:ring-brand/60">
                        {item.posterPath ? (
                          <Image
                            src={`${TMDB_IMAGE_BASE}/w342${item.posterPath}`}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 40vw, 200px"
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-muted-foreground">
                            <Film className="size-8 text-brand/70" aria-hidden="true" />
                            <span className="line-clamp-3 text-xs font-semibold">{item.title}</span>
                          </div>
                        )}
                        {item.voteAverage > 0 && (
                          <span className="absolute end-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/75 px-2 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                            <Star className="size-3 fill-rating-star text-rating-star" />
                            {item.voteAverage.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ms-auto w-[64%]">
                    <p className="mt-2 line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-brand">
                      {item.title}
                    </p>
                    {item.year && <p className="text-xs text-muted-foreground">{item.year}</p>}
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}
