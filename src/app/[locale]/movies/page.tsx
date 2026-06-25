import {
  DesktopFilters,
  MobileBar,
} from "@/features/movies/components/filters/movies-filters";
import { MovieCard } from "@/features/movies/components/listing/movie-card";
import GetMovies from "@/features/movies/services/getMovies";
import { PaginationDemo } from "@/shared/components/pagination";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Movies" });
  return { title: t("title") };
}

export default async function MoviesPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Props) {
  const [, searchParams] = await Promise.all([
    paramsPromise,
    searchParamsPromise,
  ]);

  const data = await GetMovies({
    page: searchParams.page as string | undefined,
    with_genres: searchParams.with_genres as string | undefined,
    with_original_language: searchParams.with_original_language as
      | string
      | undefined,
    primary_release_year: searchParams.primary_release_year as
      | string
      | undefined,
    region: searchParams.region as string | undefined,
    sort_by: searchParams.sort_by as string | undefined,
    vote_average_gte: searchParams.vote_average_gte as string | undefined,
  });

  const currentPage = data?.page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const totalResults = data?.total_results ?? 0;

  return (
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Movies
          </h1>
          <p className="mt-1.5 text-sm md:text-base text-muted-foreground">
            Browse thousands of movies and discover new favorites.
          </p>
        </section>

        <div className="hidden md:block w-full mb-6">
          <DesktopFilters />
        </div>
        <div className="md:hidden w-full mb-4">
          <MobileBar />
        </div>

        {totalResults > 0 && (
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <p className="text-sm text-muted-foreground">
              Showing {totalResults.toLocaleString()} movies
            </p>
            <p className="text-xs text-muted-foreground/70">
              Page {currentPage} of {totalPages.toLocaleString()}
            </p>
          </div>
        )}

        <section>
          <div className="flex flex-wrap justify-between gap-3 md:gap-4">
            {data?.results?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
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
