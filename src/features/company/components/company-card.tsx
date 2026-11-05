'use client';

import Image from '@/shared/components/ui/image';
import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';
import type { TMDBCompanyDetails } from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';
import { Link } from '@/i18n/navigation';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type CompanyCardProps = {
  company: TMDBCompanyDetails;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const t = useTranslations('Company');
  return (
    <Link
      href={`/company/${slugify(company.name)}/${company.id}`}
      className="group w-[160px] flex-shrink-0 rounded-2xl p-2 transition-colors hover:bg-brand/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:w-[180px]"
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-background/70 p-4 shadow-sm transition-all group-hover:border-brand/40 group-hover:shadow-md">
        {company.logo_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w185${company.logo_path}`}
            alt={company.name}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            sizes="180px"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Building2 className="size-8" />
            <span className="text-xs text-center line-clamp-2">{company.name}</span>
          </div>
        )}
      </div>
      <div className="mt-2 space-y-0.5 text-center">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {company.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {company.origin_country || t('productionCompany')}
        </p>
        {company.description && (
          <p className="text-[10px] text-muted-foreground/50 line-clamp-1 leading-relaxed">
            {company.description}
          </p>
        )}
      </div>
    </Link>
  );
}
