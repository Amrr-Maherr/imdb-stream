import { fetchApi } from "@/services/api/fetchApi";
import type { TMDBCompanyDetails } from "@/types/tmdb";
import { MediaRow } from "@/components/movies/media-row";
import { CompanyCard } from "./company-card";

const STUDIO_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 11725,
];

const PLATFORM_IDS = [
  18, 43, 49, 56, 62, 67, 68, 69, 70, 82, 84, 85, 172, 213, 352, 386, 753, 828, 10221,
];

async function fetchByIds(ids: number[]): Promise<TMDBCompanyDetails[]> {
  const results = await Promise.allSettled(
    ids.map((id) =>
      fetchApi<TMDBCompanyDetails>({
        endpoint: `company/${id}`,
        revalidate: 86400,
      }),
    ),
  );
  return results
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<TMDBCompanyDetails>).value)
    .filter((c) => c.name);
}

export async function ProductionCompaniesSection() {
  const companies = await fetchByIds(STUDIO_IDS);
  if (companies.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-brand" />
        <h2 className="text-2xl font-bold text-foreground">
          Production Companies
        </h2>
      </div>
      <MediaRow title="Studios">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </MediaRow>
    </div>
  );
}

export async function PlatformsSection() {
  const platforms = await fetchByIds(PLATFORM_IDS);
  if (platforms.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-brand" />
        <h2 className="text-2xl font-bold text-foreground">
          Platforms
        </h2>
      </div>
      <MediaRow title="Networks & Streaming">
        {platforms.map((platform) => (
          <CompanyCard key={platform.id} company={platform} />
        ))}
      </MediaRow>
    </div>
  );
}
