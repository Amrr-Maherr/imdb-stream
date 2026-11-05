'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, ChevronUp, History } from 'lucide-react';
import type { TMDBChanges } from '@/shared/types/tmdb';
import { MovieSection } from './movie-section';

type MovieChangeHistoryProps = {
  changes?: TMDBChanges;
};

type ChangeValueRow = {
  label: string;
  value: string;
};

type MovieDetailTranslator = ReturnType<typeof useTranslations<'MovieDetail'>>;

const HIDDEN_FIELDS = new Set(['id', 'file_path', 'poster_path', 'backdrop_path']);
const DISPLAY_LIMIT = 4;

function collectValueRows(
  value: unknown,
  label: string,
  rows: ChangeValueRow[] = [],
  t: MovieDetailTranslator,
  yes: string,
  no: string
): ChangeValueRow[] {
  if (value == null || typeof value === 'function') return rows;

  if (Array.isArray(value)) {
    value.forEach((item) => collectValueRows(item, label, rows, t, yes, no));
    return rows;
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, nestedValue]) => {
      if (
        HIDDEN_FIELDS.has(key.toLowerCase()) ||
        /(^|_)id($|_)/i.test(key) ||
        /_path$/i.test(key)
      ) {
        return;
      }
      collectValueRows(nestedValue, getValueLabel(key, t), rows, t, yes, no);
    });
    return rows;
  }

  if (typeof value !== 'object') {
    const formattedValue =
      typeof value === 'boolean' ? (value ? yes : no) : String(value).trim();
    if (formattedValue) {
      rows.push({ label: label || t('changeValueKeys.details'), value: formattedValue });
    }
  }

  return rows;
}

export function MovieChangeHistory({ changes }: MovieChangeHistoryProps) {
  const t = useTranslations('MovieDetail');
  const locale = useLocale();
  const [expanded, setExpanded] = useState(false);

  if (!changes?.changes.length) return null;

  const visibleChanges = expanded
    ? changes.changes
    : changes.changes.slice(0, DISPLAY_LIMIT);
  const hasMore = changes.changes.length > DISPLAY_LIMIT;

  const formatChangeTime = (time: string) => {
    const date = new Date(time.replace(' UTC', 'Z'));
    if (Number.isNaN(date.getTime())) return t('notAvailable');
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  const formatCode = (code: string, type: 'language' | 'region') => {
    if (!code) return null;
    try {
      return new Intl.DisplayNames([locale], { type }).of(code);
    } catch {
      return null;
    }
  };

  return (
    <MovieSection title={t('changeHistory')} icon={<History />}>
      <div className="space-y-5">
        {visibleChanges.map((change, changeIndex) => (
          <details
            key={`${change.key}-${changeIndex}`}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-card/60"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-muted/40 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="font-semibold text-foreground">
                {getChangeKeyLabel(change.key, t)}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {t('changeItemsCount', { count: change.items.length })}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                />
              </span>
            </summary>

            <ol className="divide-y divide-border/60 border-t border-border/70">
              {change.items.map((item, itemIndex) => {
                const newValues = collectValueRows(
                  item.value,
                  t('changeValueKeys.value'),
                  [],
                  t,
                  t('yes'),
                  t('no')
                );
                const previousValues = collectValueRows(
                  item.original_value,
                  t('changeValueKeys.value'),
                  [],
                  t,
                  t('yes'),
                  t('no')
                );
                const language = item.iso_639_1
                  ? formatCode(item.iso_639_1, 'language')
                  : null;
                const region = item.iso_3166_1 ? formatCode(item.iso_3166_1, 'region') : null;

                return (
                  <li key={`${item.id}-${itemIndex}`} className="space-y-3 p-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="rounded-full bg-brand/10 px-2.5 py-1 font-semibold text-foreground">
                        {getChangeActionLabel(item.action, t)}
                      </span>
                      <time dateTime={item.time}>{formatChangeTime(item.time)}</time>
                      {language && language !== item.iso_639_1 && <span>{language}</span>}
                      {region && region !== item.iso_3166_1 && <span>{region}</span>}
                    </div>

                    {(newValues.length > 0 || previousValues.length > 0) && (
                      <dl className="grid gap-2 sm:grid-cols-2">
                        {newValues.map((row, rowIndex) => (
                          <div
                            key={`new-${row.label}-${rowIndex}`}
                            className="min-w-0 rounded-xl bg-muted/50 p-3"
                          >
                            <dt className="text-xs text-muted-foreground">
                              {t('changeNewValue')} · {row.label}
                            </dt>
                            <dd className="mt-1 break-words text-sm font-medium text-foreground">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                        {previousValues.map((row, rowIndex) => (
                          <div
                            key={`previous-${row.label}-${rowIndex}`}
                            className="min-w-0 rounded-xl border border-border/60 p-3"
                          >
                            <dt className="text-xs text-muted-foreground">
                              {t('changeOriginalValue')} · {row.label}
                            </dt>
                            <dd className="mt-1 break-words text-sm text-muted-foreground">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </li>
                );
              })}
            </ol>
          </details>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand/80"
        >
          {expanded ? (
            <>
              {t('changeShowLess')} <ChevronUp className="size-3.5" />
            </>
          ) : (
            <>
              {t('changeShowMore', { count: changes.changes.length - DISPLAY_LIMIT })}{' '}
              <ChevronDown className="size-3.5" />
            </>
          )}
        </button>
      )}
    </MovieSection>
  );
}

function getChangeKeyLabel(
  key: string,
  t: ReturnType<typeof useTranslations<'MovieDetail'>>
) {
  const knownKeys: Record<string, string> = {
    title: t('changeKeys.title'),
    overview: t('changeKeys.overview'),
    tagline: t('changeKeys.tagline'),
    images: t('changeKeys.images'),
    poster: t('changeKeys.poster'),
    backdrop: t('changeKeys.backdrop'),
    videos: t('changeKeys.videos'),
    release_date: t('changeKeys.releaseDate'),
    genres: t('changeKeys.genres'),
    cast: t('changeKeys.cast'),
    crew: t('changeKeys.crew'),
    runtime: t('changeKeys.runtime'),
    status: t('changeKeys.status'),
    budget: t('changeKeys.budget'),
    revenue: t('changeKeys.revenue'),
    vote_average: t('changeKeys.rating'),
    vote_count: t('changeKeys.votes'),
    homepage: t('changeKeys.homepage'),
    production_companies: t('changeKeys.productionCompanies'),
    production_countries: t('changeKeys.productionCountries'),
    spoken_languages: t('changeKeys.languages'),
    alternative_titles: t('changeKeys.alternativeTitles'),
    translations: t('changeKeys.translations'),
    plot_keywords: t('changeKeys.keywords'),
  };

  return knownKeys[key] ?? t('changeKeys.details');
}

function getValueLabel(key: string, t: MovieDetailTranslator) {
  const knownLabels: Record<string, string> = {
    name: t('changeValueKeys.name'),
    title: t('changeValueKeys.title'),
    overview: t('changeValueKeys.overview'),
    tagline: t('changeValueKeys.tagline'),
    character: t('changeValueKeys.character'),
    job: t('changeValueKeys.job'),
    department: t('changeValueKeys.department'),
    release_date: t('changeValueKeys.releaseDate'),
    air_date: t('changeValueKeys.airDate'),
    value: t('changeValueKeys.value'),
    type: t('changeValueKeys.type'),
    url: t('changeValueKeys.link'),
    genres: t('changeKeys.genres'),
    cast: t('changeKeys.cast'),
    crew: t('changeKeys.crew'),
    production_companies: t('changeKeys.productionCompanies'),
    production_countries: t('changeKeys.productionCountries'),
    spoken_languages: t('changeKeys.languages'),
    plot_keywords: t('changeKeys.keywords'),
  };

  return knownLabels[key] ?? t('changeValueKeys.details');
}

function getChangeActionLabel(
  action: string,
  t: ReturnType<typeof useTranslations<'MovieDetail'>>
) {
  const labels: Record<string, string> = {
    added: t('changeActions.added'),
    updated: t('changeActions.updated'),
    deleted: t('changeActions.deleted'),
  };

  return labels[action] ?? t('changeActions.updated');
}
