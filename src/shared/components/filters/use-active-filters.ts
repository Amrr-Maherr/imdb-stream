'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FilterConfig, FilterOption } from './types';

const PAGE_KEY = 'page';
const DEFAULT_SORT = 'popularity.desc';

export interface ActiveFilter {
  id: string;
  label: string;
  value: string;
  clear: () => void;
}

function optionLabel(options: FilterOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function useActiveFilters(config: FilterConfig) {
  const t = useTranslations('Filters');
  const router = useRouter();
  const searchParams = useSearchParams();
  const keys = config.paramKeys;

  function clear(paramKey: string) {
    const params = new URLSearchParams(searchParams);
    params.delete(paramKey);
    params.set(PAGE_KEY, '1');
    router.push(`?${params.toString()}`);
  }

  const items: ActiveFilter[] = [];

  const genre = searchParams.get(keys.genre);
  if (genre) {
    items.push({
      id: keys.genre,
      label: t('genre'),
      value: optionLabel(config.genres, genre),
      clear: () => clear(keys.genre),
    });
  }

  const language = searchParams.get(keys.language);
  if (language) {
    items.push({
      id: keys.language,
      label: t('language'),
      value: optionLabel(config.languages, language),
      clear: () => clear(keys.language),
    });
  }

  const year = searchParams.get(keys.year);
  if (year) {
    items.push({
      id: keys.year,
      label: t('year'),
      value: optionLabel(config.years, year),
      clear: () => clear(keys.year),
    });
  }

  const rating = searchParams.get(keys.rating);
  if (rating) {
    items.push({
      id: keys.rating,
      label: t('rating'),
      value: optionLabel(config.ratingOptions, rating),
      clear: () => clear(keys.rating),
    });
  }

  const country = searchParams.get(keys.country);
  if (country) {
    items.push({
      id: keys.country,
      label: t('country'),
      value: optionLabel(config.countries, country),
      clear: () => clear(keys.country),
    });
  }

  const sort = searchParams.get(keys.sort);
  if (sort && sort !== DEFAULT_SORT) {
    items.push({
      id: keys.sort,
      label: t('sortBy'),
      value: optionLabel(config.sortOptions, sort),
      clear: () => clear(keys.sort),
    });
  }

  if (searchParams.get(keys.adult) === 'true') {
    items.push({
      id: keys.adult,
      label: t('adultContent'),
      value: '',
      clear: () => clear(keys.adult),
    });
  }

  function clearAll() {
    const params = new URLSearchParams(searchParams);
    items.forEach((item) => params.delete(item.id));
    params.set(PAGE_KEY, '1');
    router.push(`?${params.toString()}`);
  }

  return { items, count: items.length, clearAll };
}
