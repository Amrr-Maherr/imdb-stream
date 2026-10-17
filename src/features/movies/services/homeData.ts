import { fetchApi } from '@/shared/services/fetchApi';
import type { TMDBMovie, TMDBPerson, TMDBResponse, TMDBTV } from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';
import type { FeaturedBanner } from '@/features/movies/components/listing/featured-banner-grid';
import type { GenreTile } from '@/features/movies/components/listing/genre-discovery';
import { fetchSpotlightDetail, getSpotlight, type SpotlightViewModel } from './spotlight';

export type HomeData = {
  popular: TMDBMovie[];
  topRated: TMDBMovie[];
  nowPlaying: TMDBMovie[];
  upcoming: TMDBMovie[];
  trendingTv: TMDBTV[];
  popularTv: TMDBTV[];
  airingToday: TMDBTV[];
  popularPeople: TMDBPerson[];
  genreMap: Record<number, string>;
  featuredItems: FeaturedBanner[];
  genreTiles: GenreTile[];
  topRatedTv: TMDBTV[];
  spotlight: SpotlightViewModel | null;
};

type GenreData = {
  map: Record<number, string>;
  movieGenres: { id: number; name: string }[];
};

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

async function fetchGenreData(locale: string): Promise<GenreData> {
  try {
    const [movieRes, tvRes] = await Promise.all([
      fetchApi<{ genres: { id: number; name: string }[] }>({
        endpoint: 'genre/movie/list',
        revalidate: 86400,
        locale,
      }),
      fetchApi<{ genres: { id: number; name: string }[] }>({
        endpoint: 'genre/tv/list',
        revalidate: 86400,
        locale,
      }),
    ]);
    const map: Record<number, string> = {};
    for (const g of movieRes.genres) map[g.id] = g.name;
    for (const g of tvRes.genres) map[g.id] = g.name;
    return { map, movieGenres: movieRes.genres };
  } catch {
    return { map: {}, movieGenres: [] };
  }
}

function movieToBanner(movie: TMDBMovie): FeaturedBanner {
  return {
    id: movie.id,
    href: `/movies/${slugify(movie.title)}/${movie.id}`,
    title: movie.title,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    year: movie.release_date?.slice(0, 4),
  };
}

function tvToBanner(tv: TMDBTV): FeaturedBanner {
  return {
    id: tv.id,
    href: `/tv-shows/${slugify(tv.name)}/${tv.id}`,
    title: tv.name,
    backdropPath: tv.backdrop_path,
    posterPath: tv.poster_path,
    voteAverage: tv.vote_average,
    year: tv.first_air_date?.slice(0, 4),
  };
}

function pickTopRatedTv(...lists: TMDBTV[][]): TMDBTV[] {
  const seen = new Set<number>();
  const merged: TMDBTV[] = [];
  for (const list of lists) {
    for (const item of list) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      merged.push(item);
    }
  }
  return merged
    .filter((item) => item.vote_count > 0)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 12);
}

function buildGenreTiles(
  movieGenres: { id: number; name: string }[],
  movies: TMDBMovie[],
  shows: TMDBTV[]
): GenreTile[] {
  const genreBackdrops: Record<number, string> = {};
  for (const item of movies) {
    for (const gid of item.genre_ids ?? []) {
      if (!genreBackdrops[gid] && item.backdrop_path) genreBackdrops[gid] = item.backdrop_path;
    }
  }
  for (const item of shows) {
    for (const gid of item.genre_ids ?? []) {
      if (!genreBackdrops[gid] && item.backdrop_path) genreBackdrops[gid] = item.backdrop_path;
    }
  }
  return movieGenres
    .filter((genre) => genreBackdrops[genre.id])
    .slice(0, 8)
    .map((genre) => ({
      id: genre.id,
      name: genre.name,
      href: `/movies?with_genres=${genre.id}`,
      backdropPath: genreBackdrops[genre.id],
    }));
}

export async function getHomeData(locale: string): Promise<HomeData> {
  const [
    popular,
    topRated,
    nowPlaying,
    upcoming,
    trendingTv,
    popularTv,
    airingToday,
    popularPeople,
    spotlightDetail,
    genreData,
  ] = await Promise.all([
    safeFetch<TMDBMovie>('movie/popular', locale),
    safeFetch<TMDBMovie>('movie/top_rated', locale),
    safeFetch<TMDBMovie>('movie/now_playing', locale),
    safeFetch<TMDBMovie>('movie/upcoming', locale),
    safeFetch<TMDBTV>('trending/tv/week', locale),
    safeFetch<TMDBTV>('tv/popular', locale),
    safeFetch<TMDBTV>('tv/airing_today', locale),
    safeFetch<TMDBPerson>('person/popular', locale),
    fetchSpotlightDetail(locale),
    fetchGenreData(locale),
  ]);

  const featuredItems: FeaturedBanner[] = [
    ...nowPlaying.slice(0, 2).map(movieToBanner),
    ...trendingTv.slice(0, 2).map(tvToBanner),
    ...popularTv.slice(0, 1).map(tvToBanner),
  ]
    .filter((item) => item.backdropPath)
    .slice(0, 5);

  const genreTiles = buildGenreTiles(
    genreData.movieGenres,
    [...nowPlaying, ...popular, ...topRated, ...upcoming],
    [...trendingTv, ...popularTv, ...airingToday]
  );

  const topRatedTv = pickTopRatedTv(trendingTv, popularTv, airingToday);

  const spotlight = getSpotlight(spotlightDetail, popularPeople);

  return {
    popular,
    topRated,
    nowPlaying,
    upcoming,
    trendingTv,
    popularTv,
    airingToday,
    popularPeople,
    genreMap: genreData.map,
    featuredItems,
    genreTiles,
    topRatedTv,
    spotlight,
  };
}
