import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { DollarSign, TrendingUp, Flag, Globe, ShieldCheck, Info } from 'lucide-react';
import { MovieRating } from './movie-rating';
import { FactsCard, type Fact } from './facts-card';
import { slugify } from '@/shared/utils/slugify';
import { formatCurrency } from '@/shared/utils/format-currency';
import { formatLongDate } from '@/shared/utils/format-date';

type MovieSidebarProps = {
  voteAverage: number;
  voteCount: number;
  popularity: number;
  budget: number;
  revenue: number;
  status: string;
  originalLanguage: string;
  releaseDate: string;
  originalTitle: string;
  title: string;
  productionCompanies: { id: number; name: string; logo_path: string | null }[];
  productionCountries: { iso_3166_1: string; name: string }[];
  keywords: { id: number; name: string }[];
  translationsCount: number;
  spokenLanguagesCount: number;
  originCountry: string[];
  adult: boolean;
};

export function MovieSidebar({
  voteAverage,
  voteCount,
  popularity,
  budget,
  revenue,
  status,
  originalLanguage,
  releaseDate,
  originalTitle,
  title,
  productionCompanies,
  productionCountries,
  keywords,
  translationsCount,
  spokenLanguagesCount,
  originCountry,
  adult,
}: MovieSidebarProps) {
  const t = useTranslations('MovieDetail');

  const facts: Fact[] = [];
  if (status) facts.push({ label: t('status'), value: status });
  if (releaseDate) {
    facts.push({
      label: t('releaseDate'),
      value: formatLongDate(releaseDate),
    });
  }
  if (originalLanguage) {
    facts.push({ label: t('originalLanguage'), value: originalLanguage.toUpperCase() });
  }
  if (budget > 0) {
    facts.push({
      label: t('budget'),
      value: (
        <span className="inline-flex items-center gap-1">
          <DollarSign className="size-3.5 shrink-0 text-muted-foreground" />
          {formatCurrency(budget)}
        </span>
      ),
    });
  }
  if (revenue > 0) {
    facts.push({
      label: t('revenue'),
      value: (
        <span className="inline-flex items-center gap-1">
          <DollarSign className="size-3.5 shrink-0 text-muted-foreground" />
          {formatCurrency(revenue)}
        </span>
      ),
    });
  }
  if (budget > 0 && revenue > 0) {
    facts.push({
      label: t('profit'),
      value: (
        <span className="inline-flex items-center gap-1">
          <TrendingUp className="size-3.5 shrink-0 text-muted-foreground" />
          {formatCurrency(revenue - budget)}
        </span>
      ),
    });
  }
  if (originalTitle !== title) {
    facts.push({ label: t('originalTitle'), value: originalTitle });
  }
  if (productionCompanies.length > 0) {
    facts.push({
      label: t('production'),
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
  if (productionCountries?.length > 0) {
    facts.push({
      label: t('productionCountries'),
      value: (
        <span className="inline-flex items-start gap-1">
          <Globe className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          {productionCountries.map((pc) => pc.name).join(', ')}
        </span>
      ),
    });
  }
  if (originCountry?.length > 0) {
    facts.push({
      label: t('originCountry'),
      value: (
        <span className="inline-flex items-start gap-1">
          <Flag className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          {originCountry.join(', ')}
        </span>
      ),
    });
  }
  if (adult) {
    facts.push({
      label: t('adult'),
      value: (
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="size-3.5 shrink-0 text-muted-foreground" />
          {t('yes')}
        </span>
      ),
    });
  }
  facts.push({
    label: t('languages'),
    value: t('languagesCount', {
      count: spokenLanguagesCount,
      translations: translationsCount,
    }),
  });

  return (
    <aside className="space-y-8">
      {/* Rating Card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <MovieRating voteAverage={voteAverage} voteCount={voteCount} popularity={popularity} />
      </div>

      {/* Movie Facts */}
      <FactsCard title={t('facts')} icon={<Info className="size-4" />} facts={facts} />

      {/* Keywords */}
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
            {t('keywords')}
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
