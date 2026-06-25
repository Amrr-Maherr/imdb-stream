import { fetchApi } from "@/shared/services/fetchApi";
import type { TMDBResponse, TMDBMovie } from "@/shared/types/tmdb";
import { HeroBanner } from "./hero-banner";

export async function HeroSection() {
  let movies: TMDBMovie[] = [];

  try {
    const data = await fetchApi<TMDBResponse<TMDBMovie>>({
      endpoint: "trending/movie/week",
      revalidate: 3600,
    });
    movies = data.results;
  } catch {
    return null;
  }

  if (movies.length === 0) return null;

  return <HeroBanner movies={movies} />;
}
