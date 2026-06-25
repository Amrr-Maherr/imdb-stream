import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/shared/services/fetchApi";
import type { TVSeasonDetails, TMDBTVDetails } from "@/shared/types/tmdb";
import { SeasonHero } from "@/features/tv/components/season/season-hero";
import { SeasonMainContent } from "@/features/tv/components/season/season-main-content";
import { SeasonSidebarColumn } from "@/features/tv/components/season/season-sidebar-column";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string; seasonNumber: string }>;
}

const SEASON_APPEND = "videos,images,external_ids,credits,aggregate_credits";

async function getSeason(tvId: string, seasonNumber: string) {
  return fetchApi<TVSeasonDetails>({
    endpoint: `tv/${tvId}/season/${seasonNumber}?append_to_response=${SEASON_APPEND}`,
    revalidate: 3600,
  });
}

async function getTvShow(tvId: string) {
  return fetchApi<TMDBTVDetails>({
    endpoint: `tv/${tvId}`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id, seasonNumber } = await params;
  try {
    const season = await getSeason(id, seasonNumber);
    return { title: `${season.name} · Season ${seasonNumber}` };
  } catch {
    return { title: "Season" };
  }
}

export default async function SeasonPage({ params }: Props) {
  const { id, seasonNumber, slug } = await params;

  let season: TVSeasonDetails;
  let tvShow: TMDBTVDetails | null = null;
  try {
    [season, tvShow] = await Promise.all([
      getSeason(id, seasonNumber),
      getTvShow(id).catch(() => null),
    ]);
  } catch {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Season not found</h1>
          <Link
            href={`/tv-shows/${slug}/${id}`}
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Back to TV Show
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-background">
      <SeasonHero
        season={season}
        backdropPath={tvShow?.backdrop_path ?? null}
        tvName={tvShow?.name ?? ""}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <SeasonMainContent season={season} slug={slug} tvId={id} seasonNumber={seasonNumber} />
          <SeasonSidebarColumn
            season={season}
            allSeasons={tvShow?.seasons ?? []}
            tvSlug={slug}
            tvId={id}
          />
        </div>
      </div>
    </div>
  );
}
