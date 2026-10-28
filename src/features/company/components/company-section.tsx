import { Building2, MonitorPlay } from 'lucide-react';
import { fetchApi } from '@/shared/services/fetchApi';
import type { TMDBCompanyDetails } from '@/shared/types/tmdb';
import { MediaRow } from '@/features/movies/components/listing/media-row';
import { CompanyCard } from './company-card';

const COMPANY_NS = 'Company';

const STUDIO_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 11725];

const PLATFORM_IDS = [
  18, 43, 49, 56, 62, 67, 68, 69, 70, 82, 84, 85, 172, 213, 352, 386, 753, 828, 10221,
];

async function fetchByIds(ids: number[], locale: string): Promise<TMDBCompanyDetails[]> {
  const results = await Promise.allSettled(
    ids.map((id) =>
      fetchApi<TMDBCompanyDetails>({
        endpoint: `company/${id}`,
        revalidate: 86400,
        locale,
      })
    )
  );
  return results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => (r as PromiseFulfilledResult<TMDBCompanyDetails>).value)
    .filter((c) => c.name);
}

export async function ProductionCompaniesSection({ locale }: { locale: string }) {
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations(COMPANY_NS);
  const companies = await fetchByIds(STUDIO_IDS, locale);
  if (companies.length === 0) return null;

  return (
    <div>
      <MediaRow title={t('productionCompanies')} subtitle={t('majorStudios')} icon={<Building2 />}>
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </MediaRow>
    </div>
  );
}

export async function PlatformsSection({ locale }: { locale: string }) {
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations(COMPANY_NS);
  const platforms = await fetchByIds(PLATFORM_IDS, locale);
  if (platforms.length === 0) return null;

  return (
    <div>
      <MediaRow title={t('platforms')} subtitle={t('networksStreaming')} icon={<MonitorPlay />}>
        {platforms.map((platform) => (
          <CompanyCard key={platform.id} company={platform} />
        ))}
      </MediaRow>
    </div>
  );
}
