'use client';

import { useTranslations } from 'next-intl';
import {
  buildYearOptions,
  type FilterConfig,
  type FilterOption,
  type FilterParamKeys,
} from '@/shared/components/filters';

const PARAM_KEYS: FilterParamKeys = {
  genre: 'with_genres',
  language: 'with_original_language',
  year: 'primary_release_year',
  rating: 'vote_average_gte',
  country: 'region',
  sort: 'sort_by',
  page: 'page',
  adult: 'include_adult',
};

const GENRES = [
  ['28', 'action'],
  ['12', 'adventure'],
  ['35', 'comedy'],
  ['18', 'drama'],
  ['27', 'horror'],
  ['878', 'sciFi'],
  ['53', 'thriller'],
  ['16', 'animation'],
  ['10749', 'romance'],
  ['9648', 'mystery'],
  ['14', 'fantasy'],
  ['99', 'documentary'],
  ['80', 'crime'],
  ['10752', 'war'],
  ['10402', 'music'],
  ['36', 'history'],
] as const;

const LANGUAGES = [
  ['en', 'EN'],
  ['ar', 'AR'],
  ['ja', 'JA'],
  ['ko', 'KO'],
  ['fr', 'FR'],
  ['es', 'ES'],
  ['de', 'DE'],
  ['hi', 'HI'],
] as const;

const COUNTRIES = ['US', 'GB', 'KR', 'JP', 'FR', 'DE', 'IN', 'EG'] as const;

const SORT_OPTIONS = [
  ['popularity.desc', 'mostPopular'],
  ['vote_average.desc', 'highestRated'],
  ['primary_release_date.desc', 'newestRelease'],
  ['revenue.desc', 'highestRevenue'],
] as const;

const RATINGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;

export function useMoviesFilterConfig(): FilterConfig {
  const t = useTranslations('Filters');

  const genres: FilterOption[] = GENRES.map(([value, key]) => ({
    value,
    label: t(`genres.${key}`),
  }));

  const languages: FilterOption[] = LANGUAGES.map(([value, badge]) => ({
    value,
    label: t(`languages.${value}`),
    badge,
  }));

  const countries: FilterOption[] = COUNTRIES.map((value) => ({
    value,
    label: t(`countries.${value}`),
  }));

  const sortOptions: FilterOption[] = SORT_OPTIONS.map(([value, key]) => ({
    value,
    label: t(key),
  }));

  const ratingOptions: FilterOption[] = RATINGS.map((value) => ({
    value,
    label: value === '10' ? t('rating10') : t(`rating${value}Plus`),
  }));

  return {
    paramKeys: PARAM_KEYS,
    genres,
    languages,
    countries,
    years: buildYearOptions(),
    ratingOptions,
    sortOptions,
  };
}
