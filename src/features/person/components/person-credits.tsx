'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, Clapperboard, Film, Star, Tv } from 'lucide-react';
import type { PersonCreditCast, PersonCreditCrew } from '@/shared/types/tmdb';
import { getHref, getTitle, getYear } from '@/features/person/utils/credit-helpers';
import { EmptyState } from '@/shared/components/empty-state';
import { Link } from '@/i18n/navigation';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
const CREDITS_PAGE_SIZE = 6;

type PersonCreditsProps = {
  cast: PersonCreditCast[];
  crew: PersonCreditCrew[];
};

type KnownForDepartment = string;

export function PersonCredits({ cast, crew }: PersonCreditsProps) {
  const t = useTranslations('Person');
  const departments = new Map<KnownForDepartment, PersonCreditCrew[]>();
  for (const c of crew) {
    const dept = c.department || 'Other';
    if (!departments.has(dept)) departments.set(dept, []);
    departments.get(dept)!.push(c);
  }

  return (
    <section className="space-y-7">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/15">
          <Clapperboard className="size-5" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-black tracking-tight text-foreground">{t('filmography')}</h2>
      </div>

      {/* Acting */}
      {cast.length > 0 && (
        <CreditGroup
          title={t('acting')}
          credits={cast.map((credit) => ({
            key: `cast-${credit.credit_id}`,
            title: getTitle(credit, t),
            year: getYear(credit) ?? '—',
            posterPath: credit.poster_path,
            role: credit.character,
            href: getHref(credit),
            voteAverage: credit.vote_average,
            mediaType: credit.media_type,
          }))}
        />
      )}

      {/* Crew by department */}
      {Array.from(departments.entries()).map(([dept, credits]) => (
        <CreditGroup
          key={dept}
          title={dept}
          credits={credits.map((credit) => ({
            key: `crew-${credit.credit_id}`,
            title: getTitle(credit, t),
            year: getYear(credit) ?? '—',
            posterPath: credit.poster_path,
            role: credit.job,
            href: getHref(credit),
            voteAverage: credit.vote_average,
            mediaType: credit.media_type,
          }))}
        />
      ))}

      {cast.length === 0 && departments.size === 0 && (
        <EmptyState title={t('noCredits')} className="py-16" />
      )}
    </section>
  );
}

type CreditGroupProps = {
  title: string;
  credits: (CreditRowProps & { key: string })[];
};

function CreditGroup({ title, credits }: CreditGroupProps) {
  const t = useTranslations('Person');
  const [visibleCount, setVisibleCount] = useState(CREDITS_PAGE_SIZE);
  const visibleCredits = credits.slice(0, visibleCount);
  const remainingCount = credits.length - visibleCredits.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-brand" aria-hidden="true" />
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <span className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
          {credits.length}
        </span>
      </div>
      <div className="space-y-2">
        {visibleCredits.map(({ key, ...credit }) => (
          <CreditRow key={key} {...credit} />
        ))}
      </div>
      {remainingCount > 0 && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + CREDITS_PAGE_SIZE)}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-brand/25 bg-brand/[0.06] px-4 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {t('viewMoreCredits', { count: remainingCount })}
          <ChevronDown className="size-4 text-brand" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

type CreditRowProps = {
  title: string;
  year: string;
  posterPath: string | null;
  role: string;
  href: string;
  voteAverage: number;
  mediaType: string;
};

function CreditRow({
  title,
  year,
  posterPath,
  role,
  href,
  voteAverage,
  mediaType,
}: CreditRowProps) {
  const t = useTranslations('Person');
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:gap-4 sm:p-3.5"
    >
      {/* Poster thumbnail */}
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border/60 sm:h-[4.5rem] sm:w-16">
        {posterPath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w92${posterPath}`}
            alt={title}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1 text-[9px] font-semibold text-muted-foreground">
            <Film className="size-4 text-brand/70" aria-hidden="true" />
            {year}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-brand sm:text-base">
          {title}
        </p>
        {role && (
          <p className="mt-1 truncate text-xs leading-relaxed text-muted-foreground">{role}</p>
        )}
      </div>

      {/* Meta */}
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5 text-xs text-muted-foreground sm:gap-2">
        <span className="rounded-lg border border-border/70 bg-background/70 px-2.5 py-1.5 font-semibold">
          {year}
        </span>
        {mediaType === 'movie' && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-brand/[0.08] px-2.5 py-1.5 font-semibold text-foreground">
            <Film className="size-3 text-brand" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">{t('movie')}</span>
          </span>
        )}
        {mediaType === 'tv' && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-brand/[0.08] px-2.5 py-1.5 font-semibold text-foreground">
            <Tv className="size-3 text-brand" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">{t('tv')}</span>
          </span>
        )}
        {voteAverage > 0 && (
          <div className="inline-flex items-center gap-1 rounded-lg border border-brand/20 bg-brand/[0.08] px-2.5 py-1.5 font-bold text-foreground">
            <Star className="size-3 fill-rating-star text-rating-star" aria-hidden="true" />
            <span>{voteAverage.toFixed(1)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
