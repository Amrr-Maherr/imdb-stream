'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Monitor, Flag, Globe, ShieldCheck, Info } from 'lucide-react';
import { MovieRating } from '@/features/movies/components/detail/movie-rating';
import { FactsCard, type Fact } from '@/features/movies/components/detail/facts-card';
import { slugify } from '@/shared/utils/slugify';

type TvSidebarProps = {
  voteAverage: number;
  voteCount: number;
  popularity: number;
  status: string;
  type: string;
  originalLanguage: string;
  firstAirDate: string;
  lastAirDate: string | null;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  episodeRuntime: number[];
  networks: { id: number; name: string; logo_path: string | null }[];
  createdBy: string[];
  productionCompanies: { id: number; name: string; logo_path: string | null }[];
  productionCountries: { iso_3166_1: string; name: string }[];
  keywords: { id: number; name: string }[];
  languages: string[];
  translationsCount: number;
  spokenLanguagesCount: number;
  originalName: string;
  name: string;
  inProduction: boolean;
  originCountry: string[];
};

export function TvSidebar({
  voteAverage,
  voteCount,
  popularity,
  status,
  type,
  originalLanguage,
  firstAirDate,
  lastAirDate,
  numberOfSeasons,
  numberOfEpisodes,
  episodeRuntime,
  networks,
  createdBy,
  productionCompanies,
  productionCountries,
  keywords,
  languages,
  translationsCount,
  spokenLanguagesCount,
  originalName,
  name,
  inProduction,
  originCountry,
}: TvSidebarProps) {
  const t = useTranslations('TvDetail');
  const tm = useTranslations('MovieDetail');
  const tc = useTranslations('Common');

  const facts: Fact[] = [];
  if (status) facts.push({ label: t('status'), value: status });
  if (type) facts.push({ label: t('type'), value: type });
  if (firstAirDate) {
    facts.push({
      label: t('firstAirDate'),
      value: new Date(firstAirDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  }
  if (lastAirDate) {
    facts.push({
      label: t('lastAirDate'),
      value: new Date(lastAirDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  }
  if (numberOfSeasons > 0) facts.push({ label: t('seasons'), value: numberOfSeasons });
  if (numberOfEpisodes > 0) facts.push({ label: t('episodes'), value: numberOfEpisodes });
  if (episodeRuntime.length > 0) {
    facts.push({ label: t('episodeRuntime'), value: t('runtimeMin', { runtime: episodeRuntime[0] }) });
  }
  if (originalLanguage) {
    facts.push({ label: tm('originalLanguage'), value: originalLanguage.toUpperCase() });
  }
  if (inProduction) {
    facts.push({
      label: t('inProduction'),
      value: (
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="size-3.5 shrink-0 text-muted-foreground" />
          {tc('yes')}
        </span>
      ),
    });
  }
  if (createdBy.length > 0) {
    facts.push({
      label: t('createdBy'),
      value: (
        <span className="flex flex-col gap-0.5">
          {createdBy.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </span>
      ),
    });
  }
  if (originalName !== name) {
    facts.push({ label: t('originalName'), value: originalName });
  }
  if (originCountry?.length > 0) {
    facts.push({
      label: tm('originCountry'),
      value: (
        <span className="inline-flex items-start gap-1">
          <Flag className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          {originCountry.join(', ')}
        </span>
      ),
    });
  }
  if (productionCountries?.length > 0) {
    facts.push({
      label: tm('productionCountries'),
      value: (
        <span className="inline-flex items-start gap-1">
          <Globe className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          {productionCountries.map((pc) => pc.name).join(', ')}
        </span>
      ),
    });
  }
  if (networks.length > 0) {
    facts.push({
      label: t('network'),
      value: (
        <span className="flex flex-col gap-0.5">
          {networks.map((n) => (
            <Link
              key={n.id}
              href={`/company/${slugify(n.name)}/${n.id}`}
              className="inline-flex items-center gap-1 hover:text-brand transition-colors"
            >
              <Monitor className="size-3.5 shrink-0 text-muted-foreground" />
              {n.name}
            </Link>
          ))}
        </span>
      ),
    });
  }
  if (productionCompanies.length > 0) {
    facts.push({
      label: tm('production'),
      value: (
        <span className="flex flex-col gap-0.5">
          {productionCompanies.map((c) => (
            <Link
              key={c.id}
              href={`/company/${slugify(c.name)}/${c.id}`}
              className="hover:text-brand transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </span>
      ),
    });
  }
  facts.push({
    label: tm('languages'),
    value: tm('languagesCount', { count: spokenLanguagesCount, translations: translationsCount }),
  });

  return (
    <aside className="space-y-8">
      {/* Rating Card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <MovieRating voteAverage={voteAverage} voteCount={voteCount} popularity={popularity} />
      </div>

      {/* TV Facts */}
      <FactsCard title={tm('facts')} icon={<Info className="size-4" />} facts={facts} />

      {/* Keywords */}
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
            {tm('keywords')}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <Link
                key={kw.id}
                href={`/keywords/${slugify(kw.name)}/${kw.id}`}
                className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {kw.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
