import { PersonCard } from "@/features/movies/components/listing/person-card";
import GetPeople from "@/features/person/services/getPeople";
import { PaginationDemo } from "@/shared/components/pagination";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "People" });
  return { title: t("title") };
}

export default async function PeoplePage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Props) {
  const [, searchParams] = await Promise.all([
    paramsPromise,
    searchParamsPromise,
  ]);

  const data = await GetPeople({
    page: searchParams.page ? Number(searchParams.page) : undefined,
  });

  const currentPage = data?.page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const totalResults = data?.total_results ?? 0;

  return (
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            People
          </h1>
          <p className="mt-1.5 text-sm md:text-base text-muted-foreground">
            Discover popular actors, directors, and creators.
          </p>
        </section>

        {totalResults > 0 && (
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <p className="text-sm text-muted-foreground">
              Showing {totalResults.toLocaleString()} people
            </p>
            <p className="text-xs text-muted-foreground/70">
              Page {currentPage} of {totalPages.toLocaleString()}
            </p>
          </div>
        )}

        <section>
          <div className="grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 md:gap-6">
            {data?.results?.map((person: any) => (
              <PersonCard key={person.id} person={person} className="w-full" />
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
