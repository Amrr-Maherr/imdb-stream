export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  adult: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  credit_id: string;
  known_for_department: string;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
};

export type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
};

export type Keyword = {
  id: number;
  name: string;
};

export type ExternalIds = {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  wikidata_id: string | null;
};

export type Image = {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
};

export type MovieImages = {
  backdrops: Image[];
  posters: Image[];
  logos: Image[];
};

export type ReleaseDateItem = {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};

export type ReleaseDatesResult = {
  iso_3166_1: string;
  release_dates: ReleaseDateItem[];
};

export type Review = {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
};

export type Translation = {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: {
    title: string;
    overview: string;
    homepage: string;
    tagline: string;
  };
};

export type AlternativeTitle = {
  iso_3166_1: string;
  title: string;
  type: string;
};

export type WatchProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type WatchProviders = {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
  ads?: WatchProvider[];
};

export type AccountStates = {
  favorite: boolean;
  watchlist: boolean;
  rated: { value: number } | boolean;
};

export type List = {
  id: number;
  name: string;
  description: string;
  favorite_count: number;
  item_count: number;
  list_type: string;
  poster_path: string | null;
};

export type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type CollectionPart = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  adult: boolean;
  video: boolean;
  media_type?: string;
};

export type TMDBCollectionDetails = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: CollectionPart[];
};

export type TMDBMovieDetails = {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  original_title: string;
  runtime: number;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  adult: boolean;
  video: boolean;
  imdb_id: string | null;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection: Collection | null;
  origin_country: string[];

  // append_to_response
  account_states?: AccountStates;
  alternative_titles?: { titles: AlternativeTitle[] };
  credits?: Credits;
  external_ids?: ExternalIds;
  images?: MovieImages;
  keywords?: { keywords: Keyword[] };
  lists?: { results: List[] };
  recommendations?: TMDBResponse<TMDBMovie>;
  release_dates?: { results: ReleaseDatesResult[] };
  reviews?: { results: Review[]; page: number; total_pages: number; total_results: number };
  similar?: TMDBResponse<TMDBMovie>;
  translations?: { translations: Translation[] };
  videos?: { results: Video[] };
  "watch/providers"?: WatchProviders;
};

export type TMDBTV = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  popularity: number;
  origin_country: string[];
};

export type TMDBPerson = {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  known_for: (TMDBMovie | TMDBTV)[];
  adult: boolean;
  gender: number;
};

export type TVSeason = {
  id: number;
  name: string;
  poster_path: string | null;
  season_number: number;
  air_date: string | null;
  episode_count: number;
  overview: string;
  vote_average: number;
};

export type ContentRating = {
  iso_3166_1: string;
  rating: string;
};

export type TVExternalIds = {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  tvdb_id: number | null;
};

export type TMDBTVDetails = {
  id: number;
  name: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  original_name: string;
  genres: Genre[];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  type: string;
  homepage: string;
  in_production: boolean;
  languages: string[];
  networks: { id: number; name: string; logo_path: string | null; origin_country: string }[];
  created_by: { id: number; name: string; credit_id: string }[];
  seasons: TVSeason[];
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];

  // append_to_response
  account_states?: AccountStates;
  aggregate_credits?: Credits;
  alternative_titles?: { results: AlternativeTitle[] };
  content_ratings?: { results: ContentRating[] };
  credits?: Credits;
  external_ids?: TVExternalIds;
  images?: MovieImages;
  keywords?: { results: Keyword[] };
  lists?: { results: List[] };
  recommendations?: TMDBResponse<TMDBTV>;
  reviews?: { results: Review[]; page: number; total_pages: number; total_results: number };
  similar?: TMDBResponse<TMDBTV>;
  translations?: { translations: Translation[] };
  videos?: { results: Video[] };
  "watch/providers"?: WatchProviders;
};

export type PersonCreditCast = {
  id: number;
  title?: string;
  name?: string;
  character: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  overview: string;
  popularity: number;
  credit_id: string;
  media_type: string;
  adult: boolean;
  original_language: string;
};

export type PersonCreditCrew = {
  id: number;
  title?: string;
  name?: string;
  job: string;
  department: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  overview: string;
  popularity: number;
  credit_id: string;
  media_type: string;
  adult: boolean;
  original_language: string;
};

export type PersonCredits = {
  cast: PersonCreditCast[];
  crew: PersonCreditCrew[];
};

export type TMDBPersonDetails = {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  also_known_as: string[];
  gender: number;
  known_for_department: string;
  popularity: number;
  adult: boolean;
  imdb_id: string | null;
  homepage: string | null;

  // append_to_response
  combined_credits?: PersonCredits;
  external_ids?: ExternalIds;
  images?: { profiles: Image[] };
  movie_credits?: PersonCredits;
  tv_credits?: PersonCredits;
  tagged_images?: { results: TaggedImage[] };
  translations?: { translations: Translation[] };
};

export type TaggedImage = {
  id: string;
  image: Image;
  media: { id: number; title?: string; name?: string; media_type: string };
  media_type: string;
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
};

export type TVEpisode = {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  air_date: string | null;
  episode_number: number;
  season_number: number;
  vote_average: number;
  vote_count: number;
  production_code: string;
  runtime: number | null;
  crew: CrewMember[];
  guest_stars: CastMember[];
};

export type TVSeasonDetails = {
  _id: string;
  air_date: string | null;
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
  episodes: TVEpisode[];

  // append_to_response
  videos?: { results: Video[] };
  images?: { posters: Image[]; backdrops: Image[] };
  external_ids?: { tvdb_id: number | null; imdb_id: string | null };
  credits?: Credits;
  aggregate_credits?: Credits;
};

export type TMDBEpisodeDetails = TVEpisode & {
  videos?: { results: Video[] };
  images?: { stills: Image[] };
  external_ids?: { tvdb_id: number | null; imdb_id: string | null };
  credits?: Credits;
};

export type TMDBCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

export type TMDBCompanyDetails = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
  headquarters: string;
  homepage: string;
  description: string;
  parent_company: TMDBCompany | null;
};

export type TMDBCompanyMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  adult: boolean;
  video: boolean;
};

export type TMDBResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
