export interface FilterOption {
  value: string;
  label: string;
  badge?: string;
}

export interface FilterParamKeys {
  genre: string;
  language: string;
  year: string;
  rating: string;
  country: string;
  sort: string;
  page: string;
  adult: string;
}

export interface FilterConfig {
  paramKeys: FilterParamKeys;
  genres: FilterOption[];
  languages: FilterOption[];
  countries: FilterOption[];
  years: FilterOption[];
  ratingOptions: FilterOption[];
  sortOptions: FilterOption[];
}
