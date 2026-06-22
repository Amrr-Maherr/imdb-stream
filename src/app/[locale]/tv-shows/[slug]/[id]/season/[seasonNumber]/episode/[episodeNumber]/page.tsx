import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Clock, AlertCircle } from "lucide-react";
import { fetchApi } from "@/services/api/fetchApi";
import type { TVEpisode } from "@/types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string; seasonNumber: string; episodeNumber: string }>;
}

async function getEpisode(tvId: string, seasonNumber: string, episodeNumber: string) {
  return fetchApi<TVEpisode>({
    endpoint: `tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
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

  let ep: TVEpisode;
  try {
    ep = await getEpisode(id, seasonNumber, episodeNumber);
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
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/tv-shows/${slug}/${id}/season/${seasonNumber}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Season {seasonNumber}
        </Link>

        {/* Hero still */}
        {ep.still_path && (
          <div className="relative w-full aspect-video max-h-[500px] overflow-hidden rounded-xl bg-muted mb-8">
            <Image
              src={`${TMDB_IMAGE_BASE}/original${ep.still_path}`}
              alt={ep.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                S{String(seasonNumber).padStart(2, "0")} · E{String(ep.episode_number).padStart(2, "0")}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mt-1">
                {ep.name}
              </h1>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Star className="size-5 fill-rating-star text-rating-star" />
              <span className="text-lg font-bold text-foreground">{ep.vote_average.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({ep.vote_count.toLocaleString()})</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            {ep.air_date && (
              <span>
                {new Date(ep.air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {ep.runtime != null && ep.runtime > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {ep.runtime} min
              </span>
            )}
          </div>

          {ep.overview && (
            <p className="mt-6 text-muted-foreground leading-relaxed">{ep.overview}</p>
          )}
        </div>

        {/* Guest Stars */}
        {ep.guest_stars && ep.guest_stars.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Guest Stars</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ep.guest_stars.map((star) => (
                <div key={star.credit_id} className="text-center">
                  <div className="relative mx-auto w-16 h-16 overflow-hidden rounded-full bg-muted">
                    {star.profile_path ? (
                      <Image
                        src={`${TMDB_IMAGE_BASE}/w185${star.profile_path}`}
                        alt={star.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        {star.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium text-foreground mt-1 line-clamp-1">{star.name}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{star.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Crew */}
        {ep.crew && ep.crew.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Crew</h2>
            <div className="space-y-1">
              {ep.crew.map((member) => (
                <div key={member.credit_id} className="flex items-center gap-2 text-sm">
                  <span className="text-foreground font-medium">{member.name}</span>
                  <span className="text-muted-foreground">· {member.job}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
