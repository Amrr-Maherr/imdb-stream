import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/services/api/fetchApi";
import type { TMDBCompanyDetails, TMDBCompanyMovie, TMDBResponse } from "@/types/tmdb";
import { CompanyHero } from "@/components/company/company-hero";
import { CompanyInfo } from "@/components/company/company-info";
import { CompanyFilmography } from "@/components/company/company-filmography";

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
          <h1 className="text-2xl font-bold text-foreground">Company not found</h1>
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

  const movies = await getCompanyMovies(id);

  return (
    <div className="flex flex-col flex-1 bg-background">
      <CompanyHero
        name={company.name}
        logoPath={company.logo_path}
        headquarters={company.headquarters}
        originCountry={company.origin_country}
        homepage={company.homepage}
        description={company.description}
        totalProductions={movies.length}
      />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            <CompanyFilmography movies={movies} />
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <CompanyInfo
              name={company.name}
              originCountry={company.origin_country}
              headquarters={company.headquarters}
              foundedDate={null}
              parentCompany={company.parent_company}
              homepage={company.homepage}
              totalProductions={movies.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
