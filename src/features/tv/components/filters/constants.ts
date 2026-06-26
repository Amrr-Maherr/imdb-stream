import { Sparkles, Star, Calendar, type LucideIcon } from "lucide-react";

export type GenreOption = { value: string; label: string };

export const GENRES: GenreOption[] = [
  { value: "10759", label: "Action & Adventure" },
  { value: "16", label: "Animation" },
  { value: "35", label: "Comedy" },
  { value: "80", label: "Crime" },
  { value: "99", label: "Documentary" },
  { value: "18", label: "Drama" },
  { value: "10751", label: "Family" },
  { value: "10762", label: "Kids" },
  { value: "9648", label: "Mystery" },
  { value: "10763", label: "News" },
  { value: "10764", label: "Reality" },
  { value: "10765", label: "Sci-Fi & Fantasy" },
  { value: "10766", label: "Soap" },
  { value: "10767", label: "Talk" },
  { value: "10768", label: "War & Politics" },
  { value: "37", label: "Western" },
];

export type LanguageOption = { value: string; label: string; short: string };

export const LANGUAGES: LanguageOption[] = [
  { value: "en", label: "English", short: "EN" },
  { value: "ar", label: "Arabic", short: "AR" },
  { value: "ja", label: "Japanese", short: "JA" },
  { value: "ko", label: "Korean", short: "KO" },
  { value: "fr", label: "French", short: "FR" },
  { value: "es", label: "Spanish", short: "ES" },
  { value: "de", label: "German", short: "DE" },
  { value: "hi", label: "Hindi", short: "HI" },
];

export type CountryOption = { value: string; label: string };

export const COUNTRIES: CountryOption[] = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "KR", label: "South Korea" },
  { value: "JP", label: "Japan" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "IN", label: "India" },
  { value: "EG", label: "Egypt" },
];

export interface SortOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: "popularity.desc", label: "Most Popular", icon: Sparkles },
  { value: "vote_average.desc", label: "Highest Rated", icon: Star },
  { value: "first_air_date.desc", label: "Newest Release", icon: Calendar },
];

export const RATING_OPTIONS = [
  { value: "0", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
  { value: "6", label: "6+" },
  { value: "7", label: "7+" },
  { value: "8", label: "8+" },
  { value: "9", label: "9+" },
  { value: "10", label: "10" },
];

export const PARAM_KEYS = {
  genre: "with_genres",
  language: "with_original_language",
  year: "first_air_date_year",
  rating: "vote_average_gte",
  country: "with_origin_country",
  sort: "sort_by",
  page: "page",
  adult: "include_adult",
} as const;
