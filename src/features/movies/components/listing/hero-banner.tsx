'use client';

import { useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { useTranslations } from 'next-intl';
import { Slider } from '@/shared/components/ui/slider';
import type { TMDBMovie } from '@/shared/types/tmdb';
import { cn } from '@/shared/utils/utils';
import { HeroSlide } from './hero-slide';

const MAX_SLIDES = 8;
const AUTOPLAY_DELAY = 7000;

type HeroBannerProps = {
  movies: TMDBMovie[];
};

export function HeroBanner({ movies }: HeroBannerProps) {
  const t = useTranslations('Common');
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);

  const slides = movies.filter((movie) => movie.backdrop_path).slice(0, MAX_SLIDES);
  if (!slides.length) return null;

  return (
    <section className="relative h-[92svh] min-h-[560px] w-full overflow-hidden bg-black md:h-screen">
      <Slider
        slidesPerView={1}
        loop
        autoplay={{ delay: AUTOPLAY_DELAY }}
        effect="fade"
        speed={900}
        className="h-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
      >
        {slides.map((movie, index) => (
          <HeroSlide key={movie.id} movie={movie} rank={index + 1} />
        ))}
      </Slider>

      {/* Slide indicators: the active one fills over the autoplay delay */}
      <div className="absolute inset-x-0 bottom-14 z-10 md:bottom-20">
        <div className="mx-auto flex items-center gap-2 app-container">
          {slides.map((movie, index) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => swiperRef.current?.slideToLoop(index)}
              aria-label={t('goToSlide', { index: index + 1 })}
              aria-current={index === active}
              className={cn(
                'relative h-1 overflow-hidden rounded-full bg-white/30 transition-all duration-500 hover:bg-white/50',
                index === active ? 'w-10' : 'w-4'
              )}
            >
              {index === active && (
                <span
                  key={active}
                  className="absolute inset-y-0 start-0 rounded-full bg-brand motion-safe:animate-[hero-progress_linear_forwards] motion-reduce:w-full"
                  style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
