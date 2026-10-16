'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Info, Star } from 'lucide-react';
import type { TMDBEpisodeDetails, TVEpisode } from '@/shared/types/tmdb';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { FactsCard, type Fact } from '@/features/movies/components/detail/facts-card';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const EPISODE_TYPE_KEYS: Record<string, string> = {
  standard: 'episodeTypeStandard',
  finale: 'episodeTypeFinale',
  season_premiere: 'episodeTypeSeasonPremiere',
  season_finale: 'episodeTypeSeasonFinale',
};

type EpisodeSidebarColumnProps = {
  ep: TMDBEpisodeDetails;
  seasonNumber: string;
  seasonEpisodes: TVEpisode[];
  currentEpisodeNumber: number;
  slug: string;
  tvId: string;
};

export function EpisodeSidebarColumn({
  ep,
  seasonNumber,
  seasonEpisodes,
  currentEpisodeNumber,
  slug,
  tvId,
}: EpisodeSidebarColumnProps) {
  const t = useTranslations('TvDetail');
  const prevEp = seasonEpisodes.find((e) => e.episode_number === currentEpisodeNumber - 1) ?? null;
  const nextEp =
    seasonEpisodes.find((e) => e.episode_number === currentEpisodeNumber + 1) ?? null;

  const typeKey = ep.episode_type ? EPISODE_TYPE_KEYS[ep.episode_type] : undefined;

  const facts: Fact[] = [{ label: t('season'), value: seasonNumber }];
  facts.push({ label: t('episode'), value: ep.episode_number });
  if (typeKey) facts.push({ label: t('type'), value: t(typeKey) });
  if (ep.air_date) {
    facts.push({
      label: t('airDate'),
      value: new Date(ep.air_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  }
  if (ep.runtime != null && ep.runtime > 0) {
    facts.push({ label: t('episodeRuntime'), value: t('runtimeMin', { runtime: ep.runtime }) });
  }
  if (ep.vote_count > 0) {
    facts.push({
      label: t('voteAverage'),
      value: (
        <span className="inline-flex items-center gap-1.5">
          <Star className="size-3.5 fill-rating-star text-rating-star" />
          <span className="font-medium">{ep.vote_average.toFixed(1)}</span>
          <span className="text-muted-foreground">({ep.vote_count.toLocaleString()})</span>
        </span>
      ),
    });
  }
  if (ep.production_code) {
    facts.push({ label: t('productionCode'), value: ep.production_code });
  }

  return (
    <aside className="order-1 w-full space-y-6 lg:sticky lg:top-20 lg:order-2 lg:w-80 xl:w-96 lg:flex-shrink-0 lg:self-start">
      <FadeIn delay={0.05}>
        <FactsCard title={t('episodeInfo')} icon={<Info className="size-4" />} facts={facts} />
      </FadeIn>

      {(prevEp || nextEp) && (
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-3">
            {prevEp && (
              <EpisodeNavLink
                episode={prevEp}
                label={t('previousEpisode')}
                direction="prev"
                slug={slug}
                tvId={tvId}
                seasonNumber={seasonNumber}
              />
            )}
            {nextEp && (
              <EpisodeNavLink
                episode={nextEp}
                label={t('nextEpisode')}
                direction="next"
                slug={slug}
                tvId={tvId}
                seasonNumber={seasonNumber}
              />
            )}
          </div>
        </FadeIn>
      )}
    </aside>
  );
}

type EpisodeNavLinkProps = {
  episode: TVEpisode;
  label: string;
  direction: 'prev' | 'next';
  slug: string;
  tvId: string;
  seasonNumber: string;
};

function EpisodeNavLink({
  episode,
  label,
  direction,
  slug,
  tvId,
  seasonNumber,
}: EpisodeNavLinkProps) {
  const tc = useTranslations('Common');
  const isPrev = direction === 'prev';
  const Chevron = isPrev ? ChevronLeft : ChevronRight;

  return (
    <Link
      href={`/tv-shows/${slug}/${tvId}/season/${seasonNumber}/episode/${episode.episode_number}`}
      className={`group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isPrev ? '' : 'flex-row-reverse'
      }`}
    >
      <Chevron className="size-5 shrink-0 text-muted-foreground rtl:rotate-180" />
      <div className="relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        {episode.still_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w200${episode.still_path}`}
            alt={episode.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
            {tc('noImage')}
          </div>
        )}
      </div>
      <div className={`min-w-0 flex-1 ${isPrev ? '' : 'text-end'}`}>
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-brand">
          {episode.episode_number}. {episode.name}
        </p>
      </div>
    </Link>
  );
}
