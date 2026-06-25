"use client";

import { Slider } from "@/shared/components/ui/slider";
import { MovieCard } from "@/features/movies/components/listing/movie-card";
import type { TMDBMovie } from "@/shared/types/tmdb";

type RelatedMoviesProps = {
  title: string;
  movies: TMDBMovie[];
};

export function RelatedMovies({ title, movies }: RelatedMoviesProps) {
  if (movies.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <Slider
        slidesPerView={4}
        slidesMobilePerView={2}
        spaceBetween={16}
        grabCursor
        freeMode
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Slider>
    </section>
  );
}
