import { getTranslations } from 'next-intl/server';
import { fetchApi } from '@/shared/services/fetchApi';
import { ErrorState } from '@/shared/components/error-state';
import type { TMDBEpisodeDetails, TVSeasonDetails, TMDBTVDetails } from '@/shared/types/tmdb';
import { EpisodeHero } from '@/features/tv/components/episode/episode-hero';
import { EpisodeMainContent } from '@/features/tv/components/episode/episode-main-content';
import { EpisodeSidebarColumn } from '@/features/tv/components/episode/episode-sidebar-column';
import { EpisodeMoreEpisodes } from '@/features/tv/components/episode/episode-more-episodes';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>;
}

const EPISODE_APPEND = 'videos,images,external_ids,credits';
const SEASON_APPEND = 'videos,images,external_ids,credits,aggregate_credits';

async function getEpisode(
  tvId: string,
  seasonNumber: string,
  episodeNumber: string,
  locale: string
) {
  return fetchApi<TMDBEpisodeDetails>({
    endpoint: `tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=${EPISODE_APPEND}`,
    revalidate: 3600,
    locale,
  });
}

async function getSeason(tvId: string, seasonNumber: string, locale: string) {
  return fetchApi<TVSeasonDetails>({
    endpoint: `tv/${tvId}/season/${seasonNumber}?append_to_response=${SEASON_APPEND}`,
    revalidate: 3600,
    locale,
  });
}

async function getTvShow(tvId: string, locale: string) {
  return fetchApi<TMDBTVDetails>({
    endpoint: `tv/${tvId}`,
    revalidate: 3600,
    locale,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id, seasonNumber, episodeNumber, locale } = await params;
  try {
    const ep = await getEpisode(id, seasonNumber, episodeNumber, locale);
    return { title: `${ep.episode_number}. ${ep.name}` };
  } catch {
    const t = await getTranslations({ locale, namespace: 'ErrorState' });
    return { title: t('episodeNotFound') };
  }
}

export default async function EpisodePage({ params }: Props) {
  const { id, seasonNumber, episodeNumber, slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ErrorState' });

  let ep: TMDBEpisodeDetails;
  let season: TVSeasonDetails | null = null;
  let tvShow: TMDBTVDetails | null = null;
  try {
    [ep, season, tvShow] = await Promise.all([
      getEpisode(id, seasonNumber, episodeNumber, locale),
      getSeason(id, seasonNumber, locale).catch(() => null),
      getTvShow(id, locale).catch(() => null),
    ]);
  } catch {
    return (
      <ErrorState
        title={t('episodeNotFound')}
        actionLabel={t('backToSeason')}
        actionHref={`/tv-shows/${slug}/${id}/season/${seasonNumber}`}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-background">
      <EpisodeHero
        stillPath={ep.still_path}
        name={ep.name}
        tvName={tvShow?.name ?? ''}
        tvSlug={slug}
        tvId={id}
        seasonNumber={seasonNumber}
        episodeNumber={ep.episode_number}
        voteAverage={ep.vote_average}
        voteCount={ep.vote_count}
        airDate={ep.air_date}
        runtime={ep.runtime}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <EpisodeMainContent ep={ep} />
          <EpisodeSidebarColumn
            ep={ep}
            seasonNumber={seasonNumber}
            seasonEpisodes={season?.episodes ?? []}
            currentEpisodeNumber={ep.episode_number}
            slug={slug}
            tvId={id}
          />
        </div>

        <div className="mt-12 lg:mt-16">
          <EpisodeMoreEpisodes
            episodes={season?.episodes ?? []}
            currentEpisodeNumber={ep.episode_number}
            slug={slug}
            tvId={id}
            seasonNumber={seasonNumber}
          />
        </div>
      </div>
    </div>
  );
}
