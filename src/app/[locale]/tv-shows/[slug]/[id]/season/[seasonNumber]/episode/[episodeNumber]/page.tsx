import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/shared/services/fetchApi";
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
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Episode not found</h1>
          <Link
            href={`/tv-shows/${slug}/${id}/season/${seasonNumber}`}
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Back to Season
          </Link>
        </div>
      </div>
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
