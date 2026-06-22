"use client";

import { Slider } from "@/components/ui/slider";
import type { TVSeason } from "@/types/tmdb";
import { SeasonCard } from "./season-card";

type TvSeasonsProps = {
  seasons: TVSeason[];
  tvId: number;
  tvSlug: string;
};

export function TvSeasons({ seasons, tvId, tvSlug }: TvSeasonsProps) {
  const valid = seasons.filter((s) => s.season_number > 0);
  if (valid.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Seasons</h2>
      <Slider
        slidesPerView={6}
        slidesMobilePerView={2.5}
        spaceBetween={16}
        grabCursor
        freeMode
      >
        {valid.map((season) => (
          <SeasonCard key={season.id} season={season} tvId={tvId} tvSlug={tvSlug} />
        ))}
      </Slider>
    </section>
  );
}
