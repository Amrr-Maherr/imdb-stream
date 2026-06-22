"use client";

import { Slider } from "@/components/ui/slider";
import type { CastMember } from "@/types/tmdb";
import { CastCard } from "./cast-card";

type MovieCastProps = {
  cast: CastMember[];
};

export function MovieCast({ cast }: MovieCastProps) {
  const topCast = cast
    .filter((c) => c.known_for_department === "Acting")
;
  if (topCast.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Top Cast</h2>
      <Slider
        slidesPerView={5}
        slidesMobilePerView={2}
        spaceBetween={16}
        grabCursor
        freeMode
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
      >
        {topCast.map((person) => (
          <CastCard
            key={person.credit_id}
            name={person.name}
            character={person.character}
            profilePath={person.profile_path}
            creditId={person.credit_id}
          />
        ))}
      </Slider>
    </section>
  );
}
