'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Globe, MapPin, Building2, Film, ExternalLink } from 'lucide-react';
import { slugify } from '@/shared/utils/slugify';

type ProductionCompanyOverviewProps = {
  description: string;
  originCountry: string;
  headquarters: string;
  parentCompany: { id: number; name: string; logo_path: string | null } | null;
  totalProductions: number;
  homepage: string;
};

export function ProductionCompanyOverview({
  description,
  originCountry,
  headquarters,
  parentCompany,
  totalProductions,
  homepage,
}: ProductionCompanyOverviewProps) {
  const t = useTranslations('Company');
  return (
    <section className="space-y-8">
      {description && (
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-brand/[0.045] p-5 sm:p-7">
          <div
            className="pointer-events-none absolute -end-12 -top-16 size-48 rounded-full bg-brand/[0.07] blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/15">
                <Building2 className="size-4" aria-hidden="true" />
              </span>
              <h2 className="text-xl font-black tracking-tight text-foreground">{t('overview')}</h2>
            </div>
            <div className="whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
              {description}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1.5 rounded-full bg-brand" aria-hidden="true" />
          <h2 className="text-xl font-black tracking-tight text-foreground">{t('companyFacts')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {originCountry && (
            <div className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/[0.05]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                <Globe className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                  {t('originCountry')}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{originCountry}</p>
              </div>
            </div>
          )}
          {headquarters && (
            <div className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/[0.05]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                  {t('headquarters')}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{headquarters}</p>
              </div>
            </div>
          )}
          {totalProductions > 0 && (
            <div className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/[0.05]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                <Film className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                  {t('totalProductions')}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{totalProductions}</p>
              </div>
            </div>
          )}
          {parentCompany && (
            <div className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/[0.05]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                  {t('parentCompany')}
                </p>
                <Link
                  href={`/company/${slugify(parentCompany.name)}/${parentCompany.id}`}
                  className="mt-1 block text-sm font-semibold text-foreground transition-colors hover:text-brand"
                >
                  {parentCompany.name}
                </Link>
              </div>
            </div>
          )}
          {homepage && (
            <div className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/[0.05]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                <ExternalLink className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                  {t('website')}
                </p>
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm font-semibold text-foreground transition-colors hover:text-brand"
                >
                  {new URL(homepage).hostname}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
