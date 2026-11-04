import { getTranslations } from 'next-intl/server';
import { ErrorState } from '@/shared/components/error-state';
import { PaginationDemo } from '@/shared/components/pagination';
import { PageHeader } from '@/shared/components/page-header';
import { MovieCard } from '@/features/movies/components/listing/movie-card';
import { getKeyword, getKeywordMovies } from '@/features/keyword/services/getKeyword';
import type { TMDBMovie } from '@/shared/types/tmdb';
import { Hash } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params;
  try {
    const keyword = await getKeyword(id, locale);
    return { title: keyword.name };
  } catch {
    const t = await getTranslations({ locale, namespace: 'ErrorState' });
    return { title: t('keywordNotFound') };
  }
}

export default async function KeywordPage({ params, searchParams }: Props) {
  const [{ locale, id }, query] = await Promise.all([params, searchParams]);
  const t = await getTranslations({ locale, namespace: 'ErrorState' });
  const tm = await getTranslations({ locale, namespace: 'Movies' });

  const page = query.page ? Number(query.page) : 1;

  let keyword;
  try {
    keyword = await getKeyword(id, locale);
  } catch {
    return (
      <ErrorState
        title={t('keywordNotFound')}
        description={t('keywordNotFoundDesc')}
        actionLabel={t('goHome')}
        actionHref="/"
      />
    );
  }

  const data = await getKeywordMovies(id, locale, page).catch(() => null);
  const movies: TMDBMovie[] = data?.results ?? [];
  const currentPage = data?.page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const totalResults = data?.total_results ?? 0;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <PageHeader
        title={keyword.name}
        icon={Hash}
        stats={
          totalResults > 0
            ? [
                tm('showing', { count: totalResults.toLocaleString(locale) }),
                tm('pageInfo', {
                  current: currentPage,
                  total: totalPages.toLocaleString(locale),
                }),
              ]
            : []
        }
      />
      <main className="app-container flex flex-1 flex-col py-6 md:py-10">
        <section className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.025] p-4 shadow-sm sm:p-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 md:gap-y-8 xl:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {totalPages > 1 && (
          <section className="mt-10 pb-8 md:mt-12">
            <PaginationDemo total_pages={totalPages} page={currentPage} />
          </section>
        )}
      </main>
    </div>
  );
}
