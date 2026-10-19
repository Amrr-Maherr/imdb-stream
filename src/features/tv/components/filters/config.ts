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
  year: 'first_air_date_year',
  rating: 'vote_average_gte',
  country: 'with_origin_country',
  sort: 'sort_by',
  page: 'page',
  adult: 'include_adult',
};

const GENRES = [
  ['10759', 'actionAdventure'],
  ['16', 'animation'],
  ['35', 'comedy'],
  ['80', 'crime'],
  ['99', 'documentary'],
  ['18', 'drama'],
  ['10751', 'family'],
  ['10762', 'kids'],
  ['9648', 'mystery'],
  ['10763', 'news'],
  ['10764', 'reality'],
  ['10765', 'sciFiFantasy'],
  ['10766', 'soap'],
  ['10767', 'talk'],
  ['10768', 'warPolitics'],
  ['37', 'western'],
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
  ['first_air_date.desc', 'newestRelease'],
] as const;

const RATINGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;

export function useTvFilterConfig(): FilterConfig {
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
