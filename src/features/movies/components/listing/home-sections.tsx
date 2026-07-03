import { fetchApi } from "@/shared/services/fetchApi";
import type { TMDBResponse, TMDBMovie, TMDBTV, TMDBPerson } from "@/shared/types/tmdb";
import { MediaRow } from "./media-row";
import { FeaturedRow } from "./featured-row";
import { BannerSection } from "./banner-section";
import { PremiumRow } from "./premium-row";
import { MovieCard } from "./movie-card";
import { TvCard } from "./tv-card";
import { PersonCard } from "./person-card";
import {
  ProductionCompaniesSection,
  PlatformsSection,
} from "@/features/company/components/company-section";

interface Props {
  locale: string;
}

async function fetchGenreMap(locale: string): Promise<Record<number, string>> {
  try {
    const [movieRes, tvRes] = await Promise.all([
      fetchApi<{ genres: { id: number; name: string }[] }>({
        endpoint: "genre/movie/list",
        revalidate: 86400,
        locale,
      }),
      fetchApi<{ genres: { id: number; name: string }[] }>({
        endpoint: "genre/tv/list",
        revalidate: 86400,
        locale,
      }),
    ]);
    const map: Record<number, string> = {};
    for (const g of movieRes.genres) map[g.id] = g.name;
    for (const g of tvRes.genres) map[g.id] = g.name;
    return map;
  } catch {
    return {};
  }
}

export async function HomeSections({ locale }: Props) {
  const [
    popular,
    topRated,
    nowPlaying,
    trendingTv,
    popularTv,
    airingToday,
    trendingPeople,
    popularPeople,
    genreMap,
  ] = await Promise.all([
    safeFetch<TMDBMovie>("movie/popular", locale),
    safeFetch<TMDBMovie>("movie/top_rated", locale),
    safeFetch<TMDBMovie>("movie/now_playing", locale),
    safeFetch<TMDBTV>("trending/tv/week", locale),
    safeFetch<TMDBTV>("tv/popular", locale),
    safeFetch<TMDBTV>("tv/airing_today", locale),
    safeFetch<TMDBPerson>("trending/person/week", locale),
    safeFetch<TMDBPerson>("person/popular", locale),
    fetchGenreMap(locale),
  ]);

  return (
    <div className="w-full app-container py-8 space-y-14">
      {/* ── Popular Movies ── Pattern B: Featured Spotlight + Carousel ── */}
      {popular.length > 0 && (
        <FeaturedRow
          title="Popular Movies"
          spotlight={popular[0]}
          genreMap={genreMap}
        >
          {popular.slice(1).map((movie) => (
            <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
          ))}
        </FeaturedRow>
      )}

      {/* ── Top Rated Movies ── Pattern C: Premium Editorial ── */}
      {topRated.length > 0 && (
        <PremiumRow
          title="Top Rated"
          subtitle="The highest-rated movies of all time"
          averageRating={
            topRated.length > 0
              ? topRated.reduce((s, m) => s + m.vote_average, 0) /
                topRated.length
              : undefined
          }
        >
          {topRated.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
          ))}
        </PremiumRow>
      )}

      {/* ── Now Playing ── Pattern D: Banner Section ── */}
      {nowPlaying.length > 0 && (
        <BannerSection
          title="Now Playing"
          subtitle="Currently in theaters and recently released"
        >
          {nowPlaying.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
          ))}
        </BannerSection>
      )}

      {/* ── Production Companies ── */}
      <ProductionCompaniesSection />
      <PlatformsSection />

      {/* ── Trending TV ── Standard carousel ── */}
      {trendingTv.length > 0 && (
        <MediaRow
          title="Trending TV Shows"
          subtitle="This week&apos;s most popular series"
          slidesPerView={5}
          slidesMobilePerView={2.5}
          spaceBetween={14}
        >
          {trendingTv.map((tv) => (
            <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
          ))}
        </MediaRow>
      )}

      {/* ── Popular TV ── Standard carousel with different config ── */}
      {popularTv.length > 0 && (
        <MediaRow
          title="Popular TV"
          subtitle="Most-watched series right now"
          slidesPerView={5}
          slidesMobilePerView={2.5}
          spaceBetween={14}
        >
          {popularTv.map((tv) => (
            <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
          ))}
        </MediaRow>
      )}

      {/* ── Airing Today ── Pattern D: Banner Section ── */}
      {airingToday.length > 0 && (
        <BannerSection
          title="Airing Today"
          subtitle="New episodes and premieres airing today"
        >
          {airingToday.map((tv) => (
            <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
          ))}
        </BannerSection>
      )}

      {/* ── Popular Actors ── Standard carousel ── */}
      {popularPeople.length > 0 && (
        <MediaRow
          title="Popular Actors"
          subtitle="Fan-favorite performers"
          slidesPerView={6}
          slidesMobilePerView={3}
          spaceBetween={16}
        >
          {popularPeople.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </MediaRow>
      )}
    </div>
  );
}

async function safeFetch<T>(endpoint: string, locale: string): Promise<T[]> {
  try {
    const data = await fetchApi<TMDBResponse<T>>({
      endpoint,
      revalidate: 3600,
      locale,
    });
    return data.results;
  } catch {
    return [];
  }
}
