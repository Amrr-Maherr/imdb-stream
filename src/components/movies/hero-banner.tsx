"use client";

import { Slider } from "@/components/ui/slider";
import type { TMDBMovie } from "@/types/tmdb";
import { HeroSlide } from "./hero-slide";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type HeroBannerProps = {
  movies: TMDBMovie[];
};

export function HeroBanner({ movies }: HeroBannerProps) {
  if (!movies?.length) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Slider
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000 }}
        // navigation
        // pagination={{ type: "bullets" }}
        effect="fade"
        className="h-full"
      >
        {movies.map((movie) => (
          <HeroSlide key={movie.id} movie={movie} />
        ))}
      </Slider>
    </section>
  );
}
