import { MovieCard } from "@/components/movies/movie-card";
import type { TMDBMovie } from "@/types/tmdb";

type RelatedMoviesProps = {
  title: string;
  movies: TMDBMovie[];
};

export function RelatedMovies({ title, movies }: RelatedMoviesProps) {
  if (movies.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
