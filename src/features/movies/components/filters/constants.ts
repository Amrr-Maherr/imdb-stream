import { Sparkles, Star, ChevronDown, Hash, Film, Tv, Monitor, BookOpen, type LucideIcon } from "lucide-react"

export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Romance",
  "Mystery",
  "Fantasy",
  "Documentary",
  "Crime",
  "War",
  "Music",
  "History",
]

export const LANGUAGES = ["English", "Arabic", "Japanese", "Korean", "French", "Spanish", "German", "Hindi"]

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "South Korea",
  "Japan",
  "France",
  "Germany",
  "India",
  "Egypt",
]

export interface SortOption {
  value: string
  label: string
  icon: LucideIcon
}

export const SORT_OPTIONS: SortOption[] = [
  { value: "popularity", label: "Popularity", icon: Sparkles },
  { value: "rating", label: "Rating", icon: Star },
  { value: "releaseDate", label: "Release Date", icon: ChevronDown },
  { value: "title", label: "Title", icon: Hash },
]

export interface ContentType {
  value: string
  label: string
  icon: LucideIcon
}

export const CONTENT_TYPES = [
  { value: "movie", label: "Movie", icon: Film },
  { value: "tv", label: "TV Show", icon: Tv },
  { value: "anime", label: "Anime", icon: Monitor },
  { value: "documentary", label: "Documentary", icon: BookOpen },
] as const satisfies readonly ContentType[]

export const CONTENT_TYPE_ICONS: Record<string, LucideIcon> = {
  movie: Film,
  tv: Tv,
  anime: Monitor,
  documentary: BookOpen,
}

export const MOCK_GENRES = ["Action", "Sci-Fi"]
export const MOCK_LANGUAGE = "English"
export const MOCK_COUNTRY = "United States"
export const MOCK_SORT = "Popularity"
export const MOCK_YEAR_FROM = "2020"
export const MOCK_YEAR_TO = "2024"
export const MOCK_MIN_RATING = 7
export const MOCK_RUNTIME_MIN = 90
export const MOCK_RUNTIME_MAX = 180
export const MOCK_CONTENT_TYPE = "movie"
export const MOCK_ACTIVE_COUNT = 6

export const LANGUAGE_ICONS: Record<string, string> = {
  English: "EN",
  Arabic: "AR",
  Japanese: "JA",
  Korean: "KO",
  French: "FR",
  Spanish: "ES",
  German: "DE",
  Hindi: "HI",
}
