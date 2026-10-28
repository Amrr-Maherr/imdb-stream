'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Slider } from '@/shared/components/ui/slider';
import { slugify } from '@/shared/utils/slugify';
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
    <section>
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
                className="group block focus-visible:outline-none"
                aria-label={`${index + 1}. ${item.title}`}
              >
                <div className="flex items-end">
                  <span
                    aria-hidden="true"
                    className="rank-numeral -me-6 min-w-0 flex-1 select-none text-end text-[8rem] font-black leading-[0.75] tracking-tighter text-transparent transition-colors duration-300 group-hover:text-brand/20 md:-me-8 md:text-[11rem]"
                  >
                    {index + 1}
                  </span>
                  <div className="relative z-10 w-[64%] shrink-0">
                    <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-brand/60 group-focus-visible:ring-2 group-focus-visible:ring-brand">
                      {item.posterPath && (
                        <Image
                          src={`${TMDB_IMAGE_BASE}/w342${item.posterPath}`}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 40vw, 200px"
                        />
                      )}
                      {item.voteAverage > 0 && (
                        <span className="absolute end-2 top-2 inline-flex items-center gap-0.5 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                          <Star className="size-3 fill-rating-star text-rating-star" />
                          {item.voteAverage.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ms-auto w-[64%]">
                  <p className="mt-2 line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
                    {item.title}
                  </p>
                  {item.year && <p className="text-xs text-muted-foreground">{item.year}</p>}
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
