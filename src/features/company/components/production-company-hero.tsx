'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Building2, ExternalLink, Globe, MapPin, Film } from 'lucide-react';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type ProductionCompanyHeroProps = {
  name: string;
  logoPath: string | null;
  originCountry: string;
  headquarters: string;
  description: string;
  homepage: string;
  totalProductions: number;
};

export function ProductionCompanyHero({
  name,
  logoPath,
  originCountry,
  headquarters,
  description,
  homepage,
  totalProductions,
}: ProductionCompanyHeroProps) {
  const t = useTranslations('Company');
  return (
    <section className="relative isolate overflow-hidden border-b border-border/70 bg-background">
      <div
        className="pointer-events-none absolute -end-24 -top-32 size-[28rem] rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="app-container py-6 md:py-10">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/[0.04]">
          <div
            className="pointer-events-none absolute inset-y-0 end-0 hidden w-2/3 bg-gradient-to-l from-brand/10 via-brand/[0.035] to-transparent md:block"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-center md:gap-9 md:p-10">
            <div className="flex shrink-0 justify-center md:justify-start">
              <div className="relative flex aspect-[4/3] w-full max-w-[240px] items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-5 shadow-lg shadow-brand/5 ring-1 ring-brand/10 sm:max-w-[280px] md:w-[260px]">
                {logoPath ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w500${logoPath}`}
                    alt={name}
                    fill
                    className="object-contain p-5"
                    sizes="(max-width: 768px) 80vw, 260px"
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                    <span className="flex size-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Building2 className="size-9" />
                    </span>
                    <span className="line-clamp-2 text-sm font-semibold">{name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1 text-center md:text-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.08] px-3 py-1 text-xs font-bold text-brand">
                <Building2 className="size-3.5" aria-hidden="true" />
                {t('productionCompany')}
              </span>
              <h1 className="mt-4 text-3xl leading-tight font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {name}
              </h1>

              <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                {originCountry && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
                    <Globe className="size-3.5 text-brand" aria-hidden="true" />
                    {originCountry}
                  </span>
                )}
                {headquarters && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
                    <MapPin className="size-3.5 text-brand" aria-hidden="true" />
                    {headquarters}
                  </span>
                )}
                {totalProductions > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
                    <Film className="size-3.5 text-brand" aria-hidden="true" />
                    {totalProductions} {totalProductions === 1 ? t('production') : t('productions')}
                  </span>
                )}
              </div>

              {description && (
                <p className="mx-auto mt-5 line-clamp-3 max-w-3xl text-sm leading-7 text-muted-foreground md:mx-0 md:text-base">
                  {description}
                </p>
              )}

              {homepage && (
                <div className="mt-6 flex justify-center md:justify-start">
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/15 transition-all hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    {t('website')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
