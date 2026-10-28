/**
 * URL slug for a title or name. Keeps letters and digits from every script, so Arabic,
 * CJK or Cyrillic names still produce a usable slug instead of an empty path segment.
 */
export function slugify(text: string): string {
  const slug = (text ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'title';
}
