import { Sparkles, Star, Calendar, TrendingUp, type LucideIcon } from "lucide-react"

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
  { value: "popularity.desc", label: "Most Popular", icon: Sparkles },
  { value: "vote_average.desc", label: "Highest Rated", icon: Star },
  { value: "primary_release_date.desc", label: "Newest Release", icon: Calendar },
  { value: "revenue.desc", label: "Highest Revenue", icon: TrendingUp },
]

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
]

export const MOCK_GENRE = "Action"
export const MOCK_LANGUAGE = "English"
export const MOCK_COUNTRY = "United States"
export const MOCK_SORT = "popularity.desc"
export const MOCK_YEAR = "2024"
export const MOCK_RATING = "7"

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
