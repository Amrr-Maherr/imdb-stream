import {
  DesktopFilters,
  MobileBar,
} from "@/features/tv/components/filters/tv-filters";
import { TvCard } from "@/features/movies/components/listing/tv-card";
import GetTvShows from "@/features/tv/services/getTvShows";
import { PaginationDemo } from "@/shared/components/pagination";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TvShows" });
  return { title: t("title") };
}

export default async function TvShowsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Props) {
  const [, searchParams] = await Promise.all([
    paramsPromise,
    searchParamsPromise,
  ]);

  const includeAdult = searchParams.include_adult === "true";

  const data = await GetTvShows({
    page: searchParams.page ? Number(searchParams.page) : undefined,
    with_genres: searchParams.with_genres as string | undefined,
    with_original_language:
      searchParams.with_original_language as string | undefined,
    first_air_date_year: searchParams.first_air_date_year
      ? Number(searchParams.first_air_date_year)
      : undefined,
    with_origin_country:
      searchParams.with_origin_country as string | undefined,
    sort_by: (searchParams.sort_by ?? undefined) as
      | "popularity.desc"
      | "vote_average.desc"
      | "first_air_date.desc"
      | undefined,
    vote_average_gte: searchParams.vote_average_gte
      ? Number(searchParams.vote_average_gte)
      : undefined,
    include_adult: includeAdult || undefined,
  });

  const currentPage = data?.page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const totalResults = data?.total_results ?? 0;

  return (
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            TV Shows
          </h1>
          <p className="mt-1.5 text-sm md:text-base text-muted-foreground">
            Explore thousands of TV shows and discover your next binge.
          </p>
        </section>

        <div className="hidden md:block w-full mb-6">
          <DesktopFilters totalResults={totalResults} />
        </div>
        <div className="md:hidden w-full mb-4">
          <MobileBar />
        </div>

        {totalResults > 0 && (
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <p className="text-sm text-muted-foreground">
              Showing {totalResults.toLocaleString()} TV shows
            </p>
            <p className="text-xs text-muted-foreground/70">
              Page {currentPage} of {totalPages.toLocaleString()}
            </p>
          </div>
        )}

        <section>
          <div className="flex flex-wrap justify-between gap-3 md:gap-4">
            {data?.results?.map((tv: any) => (
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
