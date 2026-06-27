import type { TMDBMovie, TMDBTV } from "@/shared/types/tmdb";

export type StoredMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  media_type?: string;
};

export const toTMDBMovie = (m: StoredMovie): TMDBMovie => ({
  id: m.id,
  title: m.title,
  poster_path: m.poster_path ?? null,
  backdrop_path: null,
  overview: "",
  release_date: "",
  vote_average: 0,
  vote_count: 0,
  genre_ids: [],
  original_language: "",
  original_title: m.title,
  popularity: 0,
  video: false,
  adult: false,
});

export const toTMDBTV = (m: StoredMovie): TMDBTV => ({
  id: m.id,
  name: m.title,
  poster_path: m.poster_path ?? null,
  backdrop_path: null,
  overview: "",
  first_air_date: "",
  vote_average: 0,
  vote_count: 0,
  genre_ids: [],
  original_language: "",
  original_name: m.title,
  popularity: 0,
  origin_country: [],
});
