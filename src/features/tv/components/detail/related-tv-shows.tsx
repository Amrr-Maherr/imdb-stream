'use client';

import { Slider } from '@/shared/components/ui/slider';
import { TvCard } from '@/features/movies/components/listing/tv-card';
import type { TMDBTV } from '@/shared/types/tmdb';
import { SectionTitle } from '@/features/movies/components/detail/movie-section';

type RelatedTvShowsProps = {
  title: string;
  shows: TMDBTV[];
};

export function RelatedTvShows({ title, shows }: RelatedTvShowsProps) {
  if (shows.length === 0) return null;

  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <Slider
        slidesPerView={4}
        slidesMobilePerView={2}
        spaceBetween={16}
        grabCursor
        freeMode
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
      >
        {shows.map((show) => (
          <TvCard key={show.id} tv={show} />
        ))}
      </Slider>
    </section>
  );
}
