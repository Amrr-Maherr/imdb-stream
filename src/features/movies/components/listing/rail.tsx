'use client';

import { useCallback, useState, type ReactElement, type ReactNode } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import type { LucideIcon } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Slider } from '@/shared/components/ui/slider';

import { SectionHeader } from './section-header';

type Density = 'poster' | 'wide' | 'person';

/**
 * Slides per view by breakpoint. The fractional values leave the next card peeking in,
 * which tells people the row scrolls without needing a hint.
 */
const DENSITY: Record<Density, { base: number; bp: Record<number, { slidesPerView: number }> }> = {
  poster: {
    base: 2.25,
    bp: {
      640: { slidesPerView: 3.25 },
      768: { slidesPerView: 4.25 },
      1024: { slidesPerView: 5.25 },
      1440: { slidesPerView: 6.25 },
    },
  },
  wide: {
    base: 1.25,
    bp: {
      640: { slidesPerView: 2.25 },
      1024: { slidesPerView: 3.25 },
      1440: { slidesPerView: 4.25 },
    },
  },
  person: {
    base: 3.25,
    bp: {
      640: { slidesPerView: 4.25 },
      768: { slidesPerView: 5.25 },
      1024: { slidesPerView: 7.25 },
      1440: { slidesPerView: 8.25 },
    },
  },
};

export type RailProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  icon?: LucideIcon | ReactElement;
  viewAllHref?: string;
  viewAllLabel?: string;
  density?: Density;
  /** Shown next to the arrows, e.g. an average rating chip. */
  extra?: ReactNode;
  className?: string;
  /** Rendered between the heading and the carousel, e.g. a spotlight banner. */
  before?: ReactNode;
  children: ReactNode;
};

/** Section heading plus a horizontal carousel with prev / next arrows. */
export function Rail({
  title,
  subtitle,
  eyebrow,
  icon,
  viewAllHref,
  viewAllLabel,
  density = 'poster',
  extra,
  className,
  before,
  children,
}: RailProps) {
  const t = useTranslations('Common');
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const handleSwiper = useCallback((instance: SwiperClass) => {
    setSwiper(instance);
    const sync = () => setEdges({ start: instance.isBeginning, end: instance.isEnd });
    sync();
    instance.on('progress', sync);
    instance.on('resize', sync);
  }, []);

  const { base, bp } = DENSITY[density];
  const arrowClass =
    'flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-brand hover:bg-brand hover:text-brand-foreground disabled:pointer-events-none disabled:opacity-30';

  return (
    <section className={className}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
        icon={icon}
        viewAllHref={viewAllHref}
        viewAllLabel={viewAllLabel}
        action={
          <>
            {extra}
            <div className="hidden items-center gap-1.5 md:flex">
              <button
                type="button"
                className={arrowClass}
                onClick={() => swiper?.slidePrev()}
                disabled={edges.start}
                aria-label={t('previous')}
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                className={arrowClass}
                onClick={() => swiper?.slideNext()}
                disabled={edges.end}
                aria-label={t('next')}
              >
                <ChevronRight className="size-4 rtl:rotate-180" />
              </button>
            </div>
          </>
        }
      />
      {before}
      {/* rail-pad gives hover lift and rank badges room inside Swiper's clipped box */}
      <div className="rail-pad -mt-3">
        <Slider
          slidesPerView={base}
          breakpoints={bp}
          spaceBetween={density === 'person' ? 16 : 14}
          grabCursor
          speed={500}
          onSwiper={handleSwiper}
        >
          {children}
        </Slider>
      </div>
    </section>
  );
}
