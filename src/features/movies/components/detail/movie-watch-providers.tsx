'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Tv, ShoppingCart, CreditCard, Monitor, ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import type { WatchProvider, WatchProviderRegion, WatchProviders } from '@/shared/types/tmdb';
import { MovieSection } from './movie-section';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type CategoryKey = 'flatrate' | 'rent' | 'buy' | 'free';

type WatchProvidersSectionProps = {
  providers: WatchProviders | null | undefined;
  region?: string;
};

function regionHasProviders(region?: WatchProviderRegion): boolean {
  if (!region) return false;
  return (
    (region.flatrate?.length ?? 0) +
      (region.rent?.length ?? 0) +
      (region.buy?.length ?? 0) +
      (region.free?.length ?? 0) +
      (region.ads?.length ?? 0) >
    0
  );
}

function ProviderGrid({ providers }: { providers: WatchProvider[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {providers.map((provider) => (
        <li key={provider.provider_id} className="w-[76px] shrink-0" title={provider.provider_name}>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
            {provider.logo_path ? (
              <Image
                src={`${TMDB_IMAGE_BASE}/w92${provider.logo_path}`}
                alt={provider.provider_name}
                fill
                className="object-cover"
                sizes="76px"
              />
            ) : null}
          </div>
          <p className="mt-1 text-[11px] leading-tight text-muted-foreground text-center line-clamp-2">
            {provider.provider_name}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function WatchProvidersSection({ providers, region = 'US' }: WatchProvidersSectionProps) {
  const t = useTranslations('MovieDetail');
  const results = providers?.results ?? {};
  const preferred = results[region];
  const activeRegion = regionHasProviders(preferred)
    ? preferred
    : Object.values(results).find(regionHasProviders);

  if (!activeRegion) return null;

  const categories: { key: CategoryKey; label: string; icon: ReactNode }[] = [
    { key: 'flatrate', label: t('stream'), icon: <Tv className="size-4" /> },
    { key: 'rent', label: t('rent'), icon: <CreditCard className="size-4" /> },
    { key: 'buy', label: t('buy'), icon: <ShoppingCart className="size-4" /> },
    { key: 'free', label: t('freeProviders'), icon: <Monitor className="size-4" /> },
  ];

  return (
    <MovieSection title={t('whereToWatch')} icon={<Tv className="size-5" />}>
      <div className="space-y-5 rounded-xl border border-border bg-card p-5">
        {categories.map(({ key, label, icon }) => {
          const list = activeRegion[key];
          if (!list || list.length === 0) return null;
          return (
            <div key={key}>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-muted-foreground">{icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {label}
                </span>
              </div>
              <ProviderGrid providers={list} />
            </div>
          );
        })}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">{t('poweredByJustWatch')}</span>
          {activeRegion.link && (
            <Link
              href={activeRegion.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              <ExternalLink className="size-3.5" />
              {t('seeAllOptions')}
            </Link>
          )}
        </div>
      </div>
    </MovieSection>
  );
}
