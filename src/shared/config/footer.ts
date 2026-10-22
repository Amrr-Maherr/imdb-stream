import type { ComponentProps } from 'react';
import type { Link } from '@/i18n/navigation';

/**
 * The locale aware `Link` accepts either a plain path or a `UrlObject`.
 */
export type FooterHref = ComponentProps<typeof Link>['href'];

export type FooterQuery = Readonly<Record<string, string | number>>;

/**
 * Builds a locale agnostic path with an optional query string.
 *
 * The locale prefix is added by the i18n aware `Link`/`useRouter` helpers, so
 * the resulting value must never contain the locale itself.
 */
export function buildPath(pathname: string, query?: FooterQuery): string {
  if (!query) return pathname;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    params.set(key, String(value));
  }

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

/**
 * Minimum amount of votes a title needs in order to be considered "top rated".
 */
export const TOP_RATED_MIN_VOTES = 200;

export type FooterLinkConfig = {
  /**
   * Translation key. Resolved inside the `Footer` namespace unless
   * `namespace` is provided.
   */
  labelKey: string;
  /** Alternative translation namespace (e.g. `Filters.genres`). */
  namespace?: string;
  href: FooterHref;
  /** Renders the link with the brand accent colour. */
  accent?: boolean;
  /** Appends a trailing arrow to the label. */
  withArrow?: boolean;
};

export type FooterColumnConfig = {
  /** Translation key of the column heading. */
  titleKey: string;
  links: readonly FooterLinkConfig[];
};

export const FEATURED_GENRES = [
  { id: '28', key: 'action' },
  { id: '18', key: 'drama' },
  { id: '35', key: 'comedy' },
  { id: '878', key: 'sciFi' },
  { id: '53', key: 'thriller' },
  { id: '16', key: 'animation' },
] as const;

/**
 * Single source of truth for the footer navigation.
 *
 * Every entry points at a distinct, correctly filtered listing. The `Explore`
 * column was dropped because it duplicated the header navigation.
 */
export const FOOTER_COLUMNS: readonly FooterColumnConfig[] = [
  {
    titleKey: 'discover',
    links: [
      {
        labelKey: 'discoverLinks.popularMovies',
        href: buildPath('/movies', { sort_by: 'popularity.desc' }),
      },
      {
        labelKey: 'discoverLinks.topRated',
        href: buildPath('/movies', {
          sort_by: 'vote_average.desc',
          'vote_count.gte': TOP_RATED_MIN_VOTES,
        }),
      },
      {
        labelKey: 'discoverLinks.newReleases',
        href: buildPath('/movies', { sort_by: 'primary_release_date.desc' }),
      },
      {
        labelKey: 'discoverLinks.popularTv',
        href: buildPath('/tv-shows', { sort_by: 'popularity.desc' }),
      },
    ],
  },
  {
    titleKey: 'genres',
    links: [
      ...FEATURED_GENRES.map((genre) => ({
        labelKey: genre.key,
        namespace: 'Filters.genres',
        href: buildPath('/movies', { with_genres: genre.id }),
      })),
      {
        labelKey: 'allGenres',
        href: buildPath('/movies'),
        accent: true,
        withArrow: true,
      },
    ],
  },
  {
    titleKey: 'company',
    links: [
      { labelKey: 'companyLinks.about', href: buildPath('/about') },
      { labelKey: 'companyLinks.careers', href: buildPath('/careers') },
      { labelKey: 'companyLinks.press', href: buildPath('/press') },
      { labelKey: 'companyLinks.guidelines', href: buildPath('/guidelines') },
      { labelKey: 'companyLinks.subscription', href: buildPath('/subscription') },
    ],
  },
  {
    titleKey: 'support',
    links: [
      { labelKey: 'supportLinks.helpCenter', href: buildPath('/help') },
      { labelKey: 'supportLinks.faq', href: buildPath('/faq') },
      { labelKey: 'supportLinks.contact', href: buildPath('/contact') },
      { labelKey: 'supportLinks.feedback', href: buildPath('/feedback') },
    ],
  },
];
