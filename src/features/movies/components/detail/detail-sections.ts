/**
 * Anchor ids of the section groups on the detail pages, in page order. Kept in a plain
 * module so server pages can read the arrays (exports of a 'use client' file reach the
 * server as client references, not values).
 */
export type DetailNavKey =
  'overview' | 'seasons' | 'cast' | 'media' | 'reviews' | 'more' | 'details';

export const MOVIE_NAV_SECTIONS: DetailNavKey[] = [
  'overview',
  'cast',
  'media',
  'reviews',
  'more',
  'details',
];

export const TV_NAV_SECTIONS: DetailNavKey[] = [
  'overview',
  'seasons',
  'cast',
  'media',
  'reviews',
  'more',
  'details',
];
