import type { TMDBMovie, TMDBTV } from '@/shared/types/tmdb';
import type { SpotlightCredit } from '@/features/movies/services/spotlight';

export function spotlightCreditToMovie(credit: SpotlightCredit): TMDBMovie {
  return {
    id: credit.id,
    title: credit.title,
    overview: '',
    poster_path: credit.posterPath,
    backdrop_path: null,
    release_date: credit.year ?? '',
    vote_average: credit.voteAverage,
    vote_count: credit.voteCount,
    genre_ids: [],
    original_language: '',
    original_title: credit.title,
    popularity: 0,
    video: false,
    adult: false,
  };
}

export function spotlightCreditToTv(credit: SpotlightCredit): TMDBTV {
  return {
    id: credit.id,
    name: credit.title,
    overview: '',
    poster_path: credit.posterPath,
    backdrop_path: null,
    first_air_date: credit.year ?? '',
    vote_average: credit.voteAverage,
    vote_count: credit.voteCount,
    genre_ids: [],
    original_language: '',
    original_name: credit.title,
    popularity: 0,
    origin_country: [],
  };
}
