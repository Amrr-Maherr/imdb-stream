/**
 * Routes that render a full-bleed hero (backdrop image / slider) directly
 * underneath the global header.
 *
 * On those pages the header starts transparent (with a dark scrim so the white
 * nav text keeps a WCAG AA contrast ratio) and only switches to the solid
 * style once the user scrolls down. Every other route always uses the solid
 * style.
 */
const HERO_ROUTE_PATTERNS: readonly RegExp[] = [
  /^\/$/, // Home – full screen trending slider
  /^\/movies\/[^/]+\/[^/]+\/?$/, // Movie detail
  /^\/tv-shows\/[^/]+\/[^/]+\/?$/, // TV show detail
  /^\/tv-shows\/[^/]+\/[^/]+\/season\/[^/]+\/?$/, // Season detail
  /^\/tv-shows\/[^/]+\/[^/]+\/season\/[^/]+\/episode\/[^/]+\/?$/, // Episode detail
  /^\/item\/[^/]+\/[^/]+\/[^/]+\/?$/, // Universal movie / TV detail
  /^\/collection\/[^/]+\/[^/]+\/?$/, // Collection detail
];

/**
 * Checks whether the given (locale agnostic) pathname renders a hero.
 */
export function hasHero(pathname: string | null | undefined): boolean {
  if (!pathname) return false;

  const normalized = pathname.split('?')[0].split('#')[0];
  if (!normalized.startsWith('/')) return false;

  return HERO_ROUTE_PATTERNS.some((pattern) => pattern.test(normalized));
}
