'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { GENRES, PARAM_KEYS } from './constants';

function GenreDropdown() {
  const t = useTranslations('Filters');
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get(PARAM_KEYS.genre) ?? 'any';

  const genreLabels: Record<string, string> = {
    '28': t('genres.action'),
    '12': t('genres.adventure'),
    '35': t('genres.comedy'),
    '18': t('genres.drama'),
    '27': t('genres.horror'),
    '878': t('genres.sciFi'),
    '53': t('genres.thriller'),
    '16': t('genres.animation'),
    '10749': t('genres.romance'),
    '9648': t('genres.mystery'),
    '14': t('genres.fantasy'),
    '99': t('genres.documentary'),
    '80': t('genres.crime'),
    '10752': t('genres.war'),
    '10402': t('genres.music'),
    '36': t('genres.history'),
  };

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams);
    if (val === 'any') {
      params.delete(PARAM_KEYS.genre);
    } else {
      params.set(PARAM_KEYS.genre, val);
    }
    params.set(PARAM_KEYS.page, '1');
    router.push(`?${params.toString()}`);
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <SelectValue placeholder={t('genre')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">{t('allGenres')}</SelectItem>
        {GENRES.map((genre) => (
          <SelectItem key={genre.value} value={genre.value}>
            {genreLabels[genre.value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { GenreDropdown };
