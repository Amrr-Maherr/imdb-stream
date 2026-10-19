'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { AdultToggle } from './adult-toggle';
import { FilterSelect } from './filter-select';
import type { FilterConfig } from './types';

export interface FilterField {
  label: string;
  control: ReactNode;
}

export function useFilterControls(config: FilterConfig) {
  const t = useTranslations('Filters');
  const keys = config.paramKeys;

  return {
    genre: (
      <FilterSelect
        paramKey={keys.genre}
        options={config.genres}
        placeholder={t('genre')}
        anyLabel={t('allGenres')}
      />
    ),
    language: (
      <FilterSelect
        paramKey={keys.language}
        options={config.languages}
        placeholder={t('language')}
        anyLabel={t('allLanguages')}
      />
    ),
    year: (
      <FilterSelect
        paramKey={keys.year}
        options={config.years}
        placeholder={t('year')}
        anyLabel={t('allYears')}
        contentClassName="max-h-60"
      />
    ),
    rating: (
      <FilterSelect
        paramKey={keys.rating}
        options={config.ratingOptions}
        placeholder={t('rating')}
        anyLabel={t('any')}
      />
    ),
    country: (
      <FilterSelect
        paramKey={keys.country}
        options={config.countries}
        placeholder={t('country')}
        anyLabel={t('allCountries')}
      />
    ),
    sort: (
      <FilterSelect
        paramKey={keys.sort}
        options={config.sortOptions}
        placeholder={t('sortBy')}
        defaultValue="popularity.desc"
      />
    ),
    adult: <AdultToggle paramKey={keys.adult} />,
  };
}

export function useFilterFields(config: FilterConfig): {
  fields: FilterField[];
  adult: ReactNode;
} {
  const t = useTranslations('Filters');
  const controls = useFilterControls(config);

  return {
    fields: [
      { label: t('genre'), control: controls.genre },
      { label: t('originalLanguage'), control: controls.language },
      { label: t('releaseYear'), control: controls.year },
      { label: t('minimumRating'), control: controls.rating },
      { label: t('regionCountry'), control: controls.country },
      { label: t('sortBy'), control: controls.sort },
    ],
    adult: controls.adult,
  };
}
