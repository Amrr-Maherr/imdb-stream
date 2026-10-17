'use client';

import { Slider } from '@/shared/components/ui/slider';
import type { CrewMember } from '@/shared/types/tmdb';
import { deduplicatedCrew } from '@/features/movies/utils/crew-helpers';
import { CrewCard } from './crew-card';

type MovieCrewSectionProps = {
  crew: CrewMember[];
};

export function MovieCrewSection({ crew }: MovieCrewSectionProps) {
  const filtered = deduplicatedCrew(crew);
  if (filtered.length === 0) return null;

  return (
    <Slider
      slidesPerView={6}
      slidesMobilePerView={3}
      spaceBetween={14}
      grabCursor
      freeMode
      className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
    >
      {filtered.map((m) => (
        <CrewCard
          key={m.credit_id}
          id={m.id}
          name={m.name}
          job={m.job}
          department={m.department}
          profilePath={m.profile_path}
          creditId={m.credit_id}
        />
      ))}
    </Slider>
  );
}
