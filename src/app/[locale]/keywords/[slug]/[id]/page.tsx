import { getTranslations } from 'next-intl/server';
import { ErrorState } from '@/shared/components/error-state';
import { PaginationDemo } from '@/shared/components/pagination';
import { MovieCard } from '@/features/movies/components/listing/movie-card';
import { getKeyword, getKeywordMovies } from '@/features/keyword/services/getKeyword';
import type { TMDBMovie } from '@/shared/types/tmdb';

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
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{keyword.name}</h1>
        </section>

        {totalResults > 0 && (
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <p className="text-sm text-muted-foreground">
              {tm('showing', { count: totalResults })}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {tm('pageInfo', { current: currentPage, total: totalPages })}
            </p>
          </div>
        )}

        <section>
          <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {totalPages > 1 && (
          <section className="mt-10 md:mt-12 pb-8">
            <PaginationDemo total_pages={totalPages} page={currentPage} />
          </section>
        )}
      </main>
    </div>
  );
}
