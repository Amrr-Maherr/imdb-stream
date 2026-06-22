"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import type { CastMember } from "@/types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CastCarouselProps = {
  cast: CastMember[];
};

export function CastCarousel({ cast }: CastCarouselProps) {
  if (cast.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6">Top Cast</h2>
      <Slider
        slidesPerView={6}
        spaceBetween={6}
        grabCursor
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
      >
        {cast.map((person) => (
          <div key={person.credit_id} className="w-[130px] flex-shrink-0">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
              {person.profile_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w185${person.profile_path}`}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="130px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-xs p-2 text-center">
                  {person.name}
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {person.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
