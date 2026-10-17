import { slugify } from '@/shared/utils/slugify';

export type ListItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
};

export function getTitle(item: ListItem): string {
  return item.title || item.name || 'Unknown';
}

export function getHref(item: ListItem): string {
  const title = getTitle(item);
  const slug = slugify(title);
  if (item.media_type === 'tv') {
    return `/tv-shows/${slug}/${item.id}`;
  }
  return `/movies/${slug}/${item.id}`;
}
