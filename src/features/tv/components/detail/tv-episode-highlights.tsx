'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, Clapperboard, Clock3, Layers3, Star } from 'lucide-react';
import Image from '@/shared/components/ui/image';
import type { TVEpisodeSummary, TVEpisodeGroupSummary } from '@/shared/types/tmdb';
import { SectionTitle } from '@/features/movies/components/detail/movie-section';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type ScreenedEpisode = {
  id: number;
  episode_number: number;
  season_number: number;
};

type TvEpisodeHighlightsProps = {
  slug: string;
  tvId: number;
  lastEpisode: TVEpisodeSummary | null;
  nextEpisode: TVEpisodeSummary | null;
  episodeGroups: TVEpisodeGroupSummary[];
  screenedTheatrically: ScreenedEpisode[];
};

export function TvEpisodeHighlights({
  slug,
  tvId,
  lastEpisode,
  nextEpisode,
  episodeGroups,
  screenedTheatrically,
}: TvEpisodeHighlightsProps) {
  const t = useTranslations('TvDetail');
  const locale = useLocale();

  if (
    !lastEpisode &&
    !nextEpisode &&
    episodeGroups.length === 0 &&
    screenedTheatrically.length === 0
  ) {
    return null;
  }

  const formatDate = (date: string | null) => {
    if (!date) return null;
    const parsedDate = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsedDate.getTime())) return date;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(parsedDate);
  };

  const episodes = [
    { episode: lastEpisode, label: t('lastEpisodeToAir') },
    { episode: nextEpisode, label: t('nextEpisodeToAir') },
  ].filter((item): item is { episode: TVEpisodeSummary; label: string } => item.episode !== null);

  return (
    <section>
      <SectionTitle>{t('episodeGuide')}</SectionTitle>
      {episodes.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {episodes.map(({ episode, label }) => (
            <Link
              key={`${label}-${episode.id}`}
              href={`/tv-shows/${slug}/${tvId}/season/${episode.season_number}/episode/${episode.episode_number}`}
              className="group flex min-w-0 gap-3 rounded-2xl border border-border/70 bg-card p-3 transition-all hover:border-brand/40 hover:bg-brand/[0.035] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-4"
            >
              <span className="relative aspect-video w-24 shrink-0 self-start overflow-hidden rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 sm:w-28">
                {episode.still_path ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w300${episode.still_path}`}
                    alt={episode.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center">
                    <CalendarDays className="size-5" aria-hidden="true" />
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {label}
                </span>
                <span className="mt-1 block truncate text-sm font-bold text-foreground transition-colors group-hover:text-brand">
                  {episode.name}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    {t('season')} {episode.season_number} · {t('episode')} {episode.episode_number}
                  </span>
                  {episode.air_date && <span>{formatDate(episode.air_date)}</span>}
                  {episode.runtime != null && episode.runtime > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3" aria-hidden="true" />
                      {t('runtimeMin', { runtime: episode.runtime })}
                    </span>
                  )}
                  {episode.vote_average > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Star
                        className="size-3 fill-rating-star text-rating-star"
                        aria-hidden="true"
                      />
                      {episode.vote_average.toFixed(1)}
                    </span>
                  )}
                </span>
                {episode.overview && (
                  <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {episode.overview}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      )}

      {episodeGroups.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <Layers3 className="size-4 text-brand" aria-hidden="true" />
            {t('episodeGroups')}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {episodeGroups.map((group) => (
              <div key={group.id} className="rounded-2xl border border-border/70 bg-card/70 p-4">
                <p className="font-semibold text-foreground">{group.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('episodeGroupStats', {
                    groups: group.group_count,
                    episodes: group.episode_count,
                  })}
                </p>
                {group.network?.name && (
                  <p className="mt-1 text-xs text-muted-foreground">{group.network.name}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {getEpisodeGroupType(group.type, t)}
                </p>
                {group.description && (
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {screenedTheatrically.length > 0 && (
        <div className="mt-5 rounded-2xl border border-brand/15 bg-brand/[0.04] p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <Clapperboard className="size-4 text-brand" aria-hidden="true" />
            {t('screenedTheatrically')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {screenedTheatrically.map((episode) => (
              <Link
                key={episode.id}
                href={`/tv-shows/${slug}/${tvId}/season/${episode.season_number}/episode/${episode.episode_number}`}
                className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {t('season')} {episode.season_number} · {t('episode')} {episode.episode_number}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function getEpisodeGroupType(
  type: number,
  t: ReturnType<typeof useTranslations<'TvDetail'>>
) {
  const labels: Record<number, string> = {
    1: t('episodeGroupTypes.originalAirDate'),
    2: t('episodeGroupTypes.absolute'),
    3: t('episodeGroupTypes.dvd'),
    4: t('episodeGroupTypes.digital'),
    5: t('episodeGroupTypes.storyArc'),
    6: t('episodeGroupTypes.production'),
    7: t('episodeGroupTypes.tv'),
  };

  return labels[type] ?? t('episodeGroupTypes.other');
}
