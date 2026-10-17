import { slugify } from '@/shared/utils/slugify';

type CreditTitleSource = { title?: string; name?: string };

type CreditYearSource = { release_date?: string; first_air_date?: string };

type CreditLinkSource = {
  media_type: string;
  id: number;
  title?: string;
  name?: string;
};

export function getTitle(item: CreditTitleSource, t: (key: string) => string): string {
  return item.title || item.name || t('unknown');
}

export function getYear(item: CreditYearSource): string | null {
  const date = item.release_date || item.first_air_date;
  return date ? date.slice(0, 4) : null;
}

export function getHref(item: CreditLinkSource): string {
  const title = item.title || item.name || 'unknown';
  if (item.media_type === 'movie') return `/movies/${slugify(title)}/${item.id}`;
  if (item.media_type === 'tv') return `/tv-shows/${slugify(title)}/${item.id}`;
  return '#';
}
