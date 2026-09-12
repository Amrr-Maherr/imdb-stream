import { DesktopFilters, MobileBar } from '@/features/tv/components/filters/tv-filters';
import { TvCard } from '@/features/movies/components/listing/tv-card';
import GetTvShows from '@/features/tv/services/getTvShows';
import { PaginationDemo } from '@/shared/components/pagination';
import type { TMDBTV } from '@/shared/types/tmdb';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TvShows' });
  return { title: t('title') };
}

export default async function TvShowsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Props) {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'TvShows' });

  const includeAdult = searchParams.include_adult === 'true';

  const data = await GetTvShows({
    page: searchParams.page ? Number(searchParams.page) : undefined,
    with_genres: searchParams.with_genres as string | undefined,
    with_original_language: searchParams.with_original_language as string | undefined,
    first_air_date_year: searchParams.first_air_date_year
      ? Number(searchParams.first_air_date_year)
      : undefined,
    with_origin_country: searchParams.with_origin_country as string | undefined,
    sort_by: (searchParams.sort_by ?? undefined) as
      'popularity.desc' | 'vote_average.desc' | 'first_air_date.desc' | undefined,
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
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t('title')}</h1>
          <p className="mt-1.5 text-sm md:text-base text-muted-foreground">{t('description')}</p>
        </section>

        <div className="hidden md:block w-full mb-6">
          <DesktopFilters totalResults={totalResults} />
        </div>
        <div className="md:hidden w-full mb-4">
          <MobileBar />
        </div>

        {totalResults > 0 && (
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <p className="text-sm text-muted-foreground">{t('showing', { count: totalResults })}</p>
            <p className="text-xs text-muted-foreground/70">
              {t('pageInfo', { current: currentPage, total: totalPages })}
            </p>
          </div>
        )}

        <section>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 md:gap-4">
            {data?.results?.map((tv: TMDBTV) => (
              <TvCard key={tv.id} tv={tv} />
            ))}
          </div>
        </section>

        <section className="mt-10 md:mt-12 pb-8">
          <PaginationDemo total_pages={totalPages} page={currentPage} />
        </section>
      </main>
    </div>
  );
}
