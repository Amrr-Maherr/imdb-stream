export type FetchApiOptions = {
  endpoint: string;
  cache?: RequestCache;
  revalidate?: number;
  locale: string;
};

export async function fetchApi<T = any>({
  endpoint,
  cache = 'force-cache',
  revalidate,
  locale,
}: FetchApiOptions): Promise<T> {
  const separator = endpoint.includes('?') ? '&' : '?';
  // Most trailers and images exist only in English or without a language tag, so a strict
  // locale filter leaves non-English pages with no trailer, videos or photos.
  const mediaLanguages = endpoint.includes('append_to_response')
    ? `&include_video_language=${locale},en,null&include_image_language=${locale},en,null`
    : '';
  const url = `${process.env.TMDB_BASE_URL}/${endpoint}${separator}api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=true&language=${locale}${mediaLanguages}`;

  const res = await fetch(url, {
    cache,
    next: revalidate ? { revalidate } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${endpoint}`);
  }

  return res.json();
}
