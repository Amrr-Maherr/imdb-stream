import {
  MoviesActiveFilters,
  MoviesFilters,
  MoviesMobileBar,
} from '@/features/movies/components/filters/movies-filters';
import { MovieCard } from '@/features/movies/components/listing/movie-card';
import GetMovies from '@/features/movies/services/getMovies';
import { PaginationDemo } from '@/shared/components/pagination';
import type { TMDBMovie } from '@/shared/types/tmdb';
import { getTranslations } from 'next-intl/server';
import { Film, SearchX } from 'lucide-react';
import { PageHeader } from '@/shared/components/page-header';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Movies' });
  return { title: t('title') };
}

export default async function MoviesPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Props) {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Movies' });
  const tc = await getTranslations({ locale, namespace: 'Common' });

  const includeAdult = searchParams.include_adult === 'true';

  const data = await GetMovies({
    page: searchParams.page ? Number(searchParams.page) : undefined,
    with_genres: searchParams.with_genres as string | undefined,
    with_original_language: searchParams.with_original_language as string | undefined,
    primary_release_year: searchParams.primary_release_year
      ? Number(searchParams.primary_release_year)
      : undefined,
    region: searchParams.region as string | undefined,
    sort_by: searchParams.sort_by as
      | 'popularity.desc'
      | 'vote_average.desc'
      | 'primary_release_date.desc'
      | 'revenue.desc'
      | undefined,
    vote_average_gte: searchParams.vote_average_gte
      ? Number(searchParams.vote_average_gte)
      : undefined,
    include_adult: includeAdult || undefined,
    locale,
  });

  const currentPage = data?.page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const totalResults = data?.total_results ?? 0;

  return (
    <div className="flex flex-col flex-1 bg-background">
      <PageHeader
        title={t('title')}
        description={t('description')}
        icon={Film}
        stats={
          totalResults > 0
            ? [
                t('showing', { count: totalResults.toLocaleString(locale) }),
                t('pageInfo', { current: currentPage, total: totalPages.toLocaleString(locale) }),
              ]
            : []
        }
      />
      <main className="app-container flex flex-1 flex-col py-6 md:py-10">
        <MoviesMobileBar />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <MoviesFilters />

          <div className="flex-1 min-w-0">
            <MoviesActiveFilters className="mb-4" />

            {!data?.results?.length && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
                <SearchX className="size-10 text-muted-foreground/60" />
                <p className="text-lg font-semibold text-foreground">{tc('noResultsTitle')}</p>
                <p className="max-w-sm text-sm text-muted-foreground">{tc('noResultsDesc')}</p>
              </div>
            )}

            <section>
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 md:gap-y-8 xl:grid-cols-5">
                {data?.results?.map((movie: TMDBMovie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            <section className="mt-10 md:mt-12 pb-8">
              <PaginationDemo total_pages={totalPages} page={currentPage} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
