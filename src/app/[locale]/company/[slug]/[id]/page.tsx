import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/services/api/fetchApi";
import type {
  TMDBCompanyDetails,
  TMDBCompanyMovie,
  TMDBResponse,
  ExternalIds,
  Image,
} from "@/types/tmdb";
import { ProductionCompanyHero } from "@/components/company/production-company-hero";
import { ProductionCompanyOverview } from "@/components/company/production-company-overview";
import { ProductionCompanyPortfolio } from "@/components/company/production-company-portfolio";
import { ProductionCompanyMedia } from "@/components/company/production-company-media";
import { ProductionCompanyLinks } from "@/components/company/production-company-links";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

async function getCompany(id: string) {
  return fetchApi<TMDBCompanyDetails>({
    endpoint: `company/${id}`,
    revalidate: 86400,
  });
}

async function getCompanyMovies(id: string): Promise<TMDBCompanyMovie[]> {
  try {
    const data = await fetchApi<TMDBResponse<TMDBCompanyMovie>>({
      endpoint: `company/${id}/movies`,
      revalidate: 3600,
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
    });
    return data.logos;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const company = await getCompany(id);
    return {
      title: company.name,
      description: company.description?.slice(0, 160),
    };
  } catch {
    return { title: "Company" };
  }
}

export default async function CompanyPage({ params }: Props) {
  const { id } = await params;

  let company: TMDBCompanyDetails;
  try {
    company = await getCompany(id);
  } catch {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">
            Company not found
          </h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find the company you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const [movies, externalIds, logos] = await Promise.all([
    getCompanyMovies(id),
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
          <ProductionCompanyLinks
            homepage={company.homepage}
            externalIds={externalIds}
          />
        )}
      </div>
    </div>
  );
}
