import { PersonCard } from '@/features/movies/components/listing/person-card';
import GetPeople from '@/features/person/services/getPeople';
import { PaginationDemo } from '@/shared/components/pagination';
import { getTranslations } from 'next-intl/server';
import { Users, SearchX } from 'lucide-react';
import { PageHeader } from '@/shared/components/page-header';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'People' });
  return { title: t('title') };
}

export default async function PeoplePage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Props) {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'People' });
  const tc = await getTranslations({ locale, namespace: 'Common' });

  const data = await GetPeople({
    page: searchParams.page ? Number(searchParams.page) : undefined,
  });

  const currentPage = data?.page ?? 1;
  const totalPages = data?.total_pages ?? 1;
  const totalResults = data?.total_results ?? 0;

  return (
    <div className="flex flex-col flex-1 bg-background">
      <PageHeader
        title={t('title')}
        description={t('description')}
        icon={Users}
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
        {!data?.results?.length && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
            <SearchX className="size-10 text-muted-foreground/60" />
            <p className="text-lg font-semibold text-foreground">{tc('noResultsTitle')}</p>
            <p className="max-w-sm text-sm text-muted-foreground">{tc('noResultsDesc')}</p>
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
