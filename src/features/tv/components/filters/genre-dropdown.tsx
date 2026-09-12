'use client';

import { Film } from 'lucide-react';
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
    '10759': t('genres.actionAdventure'),
    '16': t('genres.animation'),
    '35': t('genres.comedy'),
    '80': t('genres.crime'),
    '99': t('genres.documentary'),
    '18': t('genres.drama'),
    '10751': t('genres.family'),
    '10762': t('genres.kids'),
    '9648': t('genres.mystery'),
    '10763': t('genres.news'),
    '10764': t('genres.reality'),
    '10765': t('genres.sciFiFantasy'),
    '10766': t('genres.soap'),
    '10767': t('genres.talk'),
    '10768': t('genres.warPolitics'),
    '37': t('genres.western'),
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
        <Film className="size-3.5 shrink-0 text-muted-foreground" />
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
