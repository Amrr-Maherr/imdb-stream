import { fetchApi } from '@/shared/services/fetchApi';
import type {
  KeywordDetails,
  TMDBMovie,
  TMDBResponse,
} from '@/shared/types/tmdb';

const KEYWORD_REVALIDATE = 86400;

export function getKeyword(id: string | number, locale: string): Promise<KeywordDetails> {
  return fetchApi<KeywordDetails>({
    endpoint: `keyword/${id}`,
    revalidate: KEYWORD_REVALIDATE,
    locale,
  });
}

export function getKeywordMovies(
  id: string | number,
  locale: string,
  page = 1
): Promise<TMDBResponse<TMDBMovie>> {
  return fetchApi<TMDBResponse<TMDBMovie>>({
    endpoint: `keyword/${id}/movies?page=${page}`,
    revalidate: 3600,
    locale,
  });
}
