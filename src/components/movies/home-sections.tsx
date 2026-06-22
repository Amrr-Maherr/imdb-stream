import { fetchApi } from "@/services/api/fetchApi";
import type { TMDBResponse, TMDBMovie, TMDBTV, TMDBPerson } from "@/types/tmdb";
import { MediaRow } from "./media-row";
import { MovieCard } from "./movie-card";
import { TvCard } from "./tv-card";
import { PersonCard } from "./person-card";
import {
  ProductionCompaniesSection,
  PlatformsSection,
} from "@/components/company/company-section";

export async function HomeSections() {
  const [
    popular,
    topRated,
    nowPlaying,
    trendingTv,
    popularTv,
    airingToday,
    trendingPeople,
    popularPeople,
  ] = await Promise.all([
    safeFetch<TMDBMovie>("movie/popular"),
    safeFetch<TMDBMovie>("movie/top_rated"),
    safeFetch<TMDBMovie>("movie/now_playing"),
    safeFetch<TMDBTV>("trending/tv/week"),
    safeFetch<TMDBTV>("tv/popular"),
    safeFetch<TMDBTV>("tv/airing_today"),
    safeFetch<TMDBPerson>("trending/person/week"),
    safeFetch<TMDBPerson>("person/popular"),
  ]);

  return (
    <div className="w-full app-container py-8 space-y-12">
      {/* Movies */}
      <div className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-brand" />
          <h2 className="text-2xl font-bold text-foreground">Movies</h2>
        </div>
        {popular.length > 0 && (
          <MediaRow title="Popular">
            {popular.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MediaRow>
        )}
        {topRated.length > 0 && (
          <MediaRow title="Top Rated">
            {topRated.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MediaRow>
        )}
        {nowPlaying.length > 0 && (
          <MediaRow title="Now Playing">
            {nowPlaying.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MediaRow>
        )}
      </div>

      {/* Production Companies */}
      <ProductionCompaniesSection />
      <PlatformsSection />

      {/* TV Shows */}
      <div className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-brand" />
          <h2 className="text-2xl font-bold text-foreground">TV Shows</h2>
        </div>
        {trendingTv.length > 0 && (
          <MediaRow title="Trending">
            {trendingTv.map((tv) => (
              <TvCard key={tv.id} tv={tv} />
            ))}
          </MediaRow>
        )}
        {popularTv.length > 0 && (
          <MediaRow title="Popular">
            {popularTv.map((tv) => (
              <TvCard key={tv.id} tv={tv} />
            ))}
          </MediaRow>
        )}
        {airingToday.length > 0 && (
          <MediaRow title="Airing Today">
            {airingToday.map((tv) => (
              <TvCard key={tv.id} tv={tv} />
            ))}
          </MediaRow>
        )}
      </div>

      {/* Actors */}
      <div className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-brand" />
          <h2 className="text-2xl font-bold text-foreground">Actors</h2>
        </div>
        {trendingPeople.length > 0 && (
          <MediaRow title="Trending">
            {trendingPeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </MediaRow>
        )}
        {popularPeople.length > 0 && (
          <MediaRow title="Popular">
            {popularPeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </MediaRow>
        )}
      </div>
    </div>
  );
}

async function safeFetch<T>(endpoint: string): Promise<T[]> {
  try {
    const data = await fetchApi<TMDBResponse<T>>({
      endpoint,
      revalidate: 3600,
    });
    return data.results;
  } catch {
    return [];
  }
}
