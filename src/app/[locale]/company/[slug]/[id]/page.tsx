import { getTranslations } from 'next-intl/server';
import { fetchApi } from '@/shared/services/fetchApi';
import { ErrorState } from '@/shared/components/error-state';
import type {
  TMDBCompanyDetails,
  TMDBCompanyMovie,
  TMDBResponse,
  ExternalIds,
  Image,
} from '@/shared/types/tmdb';
import { ProductionCompanyHero } from '@/features/company/components/production-company-hero';
import { ProductionCompanyOverview } from '@/features/company/components/production-company-overview';
import { ProductionCompanyPortfolio } from '@/features/company/components/production-company-portfolio';
import { ProductionCompanyMedia } from '@/features/company/components/production-company-media';
import { ProductionCompanyLinks } from '@/features/company/components/production-company-links';

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

async function getCompany(id: string, locale: string) {
  return fetchApi<TMDBCompanyDetails>({
    endpoint: `company/${id}`,
    revalidate: 86400,
    locale,
  });
}

async function getCompanyMovies(id: string, locale: string): Promise<TMDBCompanyMovie[]> {
  try {
    const data = await fetchApi<TMDBResponse<TMDBCompanyMovie>>({
      endpoint: `company/${id}/movies`,
      revalidate: 3600,
      locale,
    });
    return data.results;
  } catch {
    return [];
  }
}

async function getCompanyExternalIds(id: string): Promise<ExternalIds | null> {
  try {
    return await fetchApi<ExternalIds>({
      endpoint: `company/${id}/external_ids`,
      revalidate: 86400,
      locale: 'en', // external ids don't need translation
    });
  } catch {
    return null;
  }
}

async function getCompanyImages(id: string): Promise<Image[]> {
  try {
    const data = await fetchApi<{ id: number; logos: Image[] }>({
      endpoint: `company/${id}/images`,
      revalidate: 86400,
      locale: 'en', // images don't need translation
    });
    return data.logos;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params;
  try {
    const company = await getCompany(id, locale);
    return {
      title: company.name,
      description: company.description?.slice(0, 160),
    };
  } catch {
    const t = await getTranslations({ locale, namespace: 'ErrorState' });
    return { title: t('companyNotFound') };
  }
}

export default async function CompanyPage({ params }: Props) {
  const { id, locale } = await params;

  const t = await getTranslations({ locale, namespace: 'ErrorState' });

  let company: TMDBCompanyDetails;
  try {
    company = await getCompany(id, locale);
  } catch {
    return (
      <ErrorState
        title={t('companyNotFound')}
        description={t('companyNotFoundDesc')}
        actionLabel={t('goHome')}
        actionHref="/"
      />
    );
  }

  const [movies, externalIds, logos] = await Promise.all([
    getCompanyMovies(id, locale),
    getCompanyExternalIds(id),
    getCompanyImages(id),
  ]);

  return (
    <div className="flex flex-col flex-1 bg-background">
      <ProductionCompanyHero
        name={company.name}
        logoPath={company.logo_path}
        originCountry={company.origin_country}
        headquarters={company.headquarters}
        description={company.description}
        homepage={company.homepage}
        totalProductions={movies.length}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16 space-y-10">
        <ProductionCompanyOverview
          description={company.description}
          originCountry={company.origin_country}
          headquarters={company.headquarters}
          parentCompany={company.parent_company}
          totalProductions={movies.length}
          homepage={company.homepage}
        />

        {movies.length > 0 && <ProductionCompanyPortfolio movies={movies} />}

        {logos.length > 0 && <ProductionCompanyMedia logos={logos} />}

        {(externalIds || company.homepage) && (
          <ProductionCompanyLinks homepage={company.homepage} externalIds={externalIds} />
        )}
      </div>
    </div>
  );
}
