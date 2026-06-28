import { fetchApi } from "@/shared/services/fetchApi";
import { ErrorState } from "@/shared/components/error-state";
import type { TMDBEpisodeDetails, TVSeasonDetails } from "@/shared/types/tmdb";
import { EpisodeHero } from "@/features/tv/components/episode/episode-hero";
import { EpisodeMainContent } from "@/features/tv/components/episode/episode-main-content";
import { EpisodeSidebarColumn } from "@/features/tv/components/episode/episode-sidebar-column";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string; seasonNumber: string; episodeNumber: string }>;
}

const EPISODE_APPEND = "videos,images,external_ids,credits";
const SEASON_APPEND = "videos,images,external_ids,credits,aggregate_credits";

async function getEpisode(tvId: string, seasonNumber: string, episodeNumber: string) {
  return fetchApi<TMDBEpisodeDetails>({
    endpoint: `tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=${EPISODE_APPEND}`,
    revalidate: 3600,
  });
}

async function getSeason(tvId: string, seasonNumber: string) {
  return fetchApi<TVSeasonDetails>({
    endpoint: `tv/${tvId}/season/${seasonNumber}?append_to_response=${SEASON_APPEND}`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id, seasonNumber, episodeNumber } = await params;
  try {
    const ep = await getEpisode(id, seasonNumber, episodeNumber);
    return { title: `${ep.episode_number}. ${ep.name}` };
  } catch {
    return { title: "Episode" };
  }
}

export default async function EpisodePage({ params }: Props) {
  const { id, seasonNumber, episodeNumber, slug } = await params;

  let ep: TMDBEpisodeDetails;
  let season: TVSeasonDetails | null = null;
  try {
    [ep, season] = await Promise.all([
      getEpisode(id, seasonNumber, episodeNumber),
      getSeason(id, seasonNumber).catch(() => null),
    ]);
  } catch {
    return (
      <ErrorState
        title="Episode not found"
        actionLabel="Back to Season"
        actionHref={`/tv-shows/${slug}/${id}/season/${seasonNumber}`}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-background">
      <EpisodeHero
        stillPath={ep.still_path}
        name={ep.name}
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
      </div>
    </div>
  );
}
