import type { CollectionPart } from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';

export function isTV(part: CollectionPart): boolean {
  return part.media_type === 'tv' || part.original_title === undefined || !part.title;
}

export function getTitle(part: CollectionPart): string {
  return isTV(part) ? (part as any).name || part.original_title || part.title : part.title;
}

export function getHref(part: CollectionPart): string {
  const title = getTitle(part);
  const slug = slugify(title);
  if (isTV(part)) {
    return `/tv-shows/${slug}/${part.id}`;
  }
  return `/movies/${slug}/${part.id}`;
}
