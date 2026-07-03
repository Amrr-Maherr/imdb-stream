import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "HomePage" });

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
          title={t("popularMovies")}
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
          title={t("topRated")}
          subtitle={t("topRatedDesc")}
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
          title={t("nowPlaying")}
          subtitle={t("nowPlayingDesc")}
        >
          {nowPlaying.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
          ))}
        </BannerSection>
      )}

      {/* ── Production Companies ── */}
      <ProductionCompaniesSection locale={locale} />
      <PlatformsSection locale={locale} />

      {/* ── Trending TV ── Standard carousel ── */}
      {trendingTv.length > 0 && (
        <MediaRow
          title={t("trendingTv")}
          subtitle={t("trendingTvDesc")}
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
          title={t("popularTv")}
          subtitle={t("popularTvDesc")}
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
          title={t("airingToday")}
          subtitle={t("airingTodayDesc")}
        >
          {airingToday.map((tv) => (
            <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
          ))}
        </BannerSection>
      )}

      {/* ── Popular Actors ── Standard carousel ── */}
      {popularPeople.length > 0 && (
        <MediaRow
          title={t("popularActors")}
          subtitle={t("popularActorsDesc")}
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
