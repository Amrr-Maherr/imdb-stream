import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, AlertCircle } from "lucide-react";
import { fetchApi } from "@/services/api/fetchApi";
import type { TVSeasonDetails } from "@/types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string; seasonNumber: string }>;
}

async function getSeason(tvId: string, seasonNumber: string) {
  return fetchApi<TVSeasonDetails>({
    endpoint: `tv/${tvId}/season/${seasonNumber}`,
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
  try {
    season = await getSeason(id, seasonNumber);
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
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/tv-shows/${slug}/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to TV Show
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-[180px] aspect-[2/3] overflow-hidden rounded-xl bg-muted">
              {season.poster_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w342${season.poster_path}`}
                  alt={season.name}
                  fill
                  className="object-cover"
                  sizes="180px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-4 text-center">
                  {season.name}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {season.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span>{season.episodes.length} Episodes</span>
              {season.air_date && <span>· {season.air_date.slice(0, 4)}</span>}
              <div className="flex items-center gap-0.5">
                <Star className="size-4 fill-rating-star text-rating-star" />
                <span className="font-medium text-foreground">{season.vote_average.toFixed(1)}</span>
              </div>
            </div>
            {season.overview && (
              <p className="mt-4 text-muted-foreground leading-relaxed">{season.overview}</p>
            )}
          </div>
        </div>

        {/* Episodes */}
        <h2 className="text-xl font-bold text-foreground mb-6">Episodes</h2>
        <div className="space-y-4">
          {season.episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/tv-shows/${slug}/${id}/season/${seasonNumber}/episode/${episode.episode_number}`}
              className="flex gap-4 rounded-lg border border-border bg-card p-4 hover:bg-muted transition-colors"
            >
              {episode.still_path ? (
                <div className="relative w-[160px] sm:w-[200px] aspect-video flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w300${episode.still_path}`}
                    alt={episode.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              ) : (
                <div className="w-[160px] sm:w-[200px] aspect-video flex-shrink-0 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  No image
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {episode.episode_number}. {episode.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                    <span>{episode.vote_average.toFixed(1)}</span>
                  </div>
                </div>
                {episode.air_date && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(episode.air_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                {episode.overview && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {episode.overview}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
