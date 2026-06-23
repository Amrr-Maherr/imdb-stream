import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Hash, Film, Clock, Star } from "lucide-react";
import type { TMDBEpisodeDetails, TVEpisode } from "@/types/tmdb";
import { FadeIn } from "@/components/movie/fade-in";
import { Slider } from "@/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

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
  const prevEp = seasonEpisodes.find((e) => e.episode_number === currentEpisodeNumber - 1) ?? null;

  const moreEpisodes = seasonEpisodes.filter(
    (e) => e.episode_number !== currentEpisodeNumber,
  ).slice(0, 12);

  return (
    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8">
      <FadeIn delay={0.05}>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Episode Info
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Hash className="size-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Season</p>
                <p className="text-sm text-foreground">{seasonNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Film className="size-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Episode</p>
                <p className="text-sm text-foreground">{ep.episode_number}</p>
              </div>
            </div>
            {ep.runtime != null && ep.runtime > 0 && (
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Runtime</p>
                  <p className="text-sm text-foreground">{ep.runtime} min</p>
                </div>
              </div>
            )}
            {ep.production_code && (
              <div className="flex items-center gap-3">
                <Hash className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Production Code</p>
                  <p className="text-sm text-foreground">{ep.production_code}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {prevEp && (
        <FadeIn delay={0.1}>
          <Link
            href={`/tv-shows/${slug}/${tvId}/season/${seasonNumber}/episode/${prevEp.episode_number}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-muted transition-colors group"
          >
            <ChevronLeft className="size-5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase">Previous Episode</p>
              <p className="text-sm font-medium text-foreground truncate group-hover:text-brand transition-colors">
                {prevEp.name}
              </p>
            </div>
          </Link>
        </FadeIn>
      )}

      {moreEpisodes.length > 0 && (
        <FadeIn delay={0.15}>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
              More Episodes
            </h3>
            <Slider
              slidesPerView={2}
              slidesMobilePerView={2}
              spaceBetween={12}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-0 px-4 sm:px-0 pb-2"
            >
              {moreEpisodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/tv-shows/${slug}/${tvId}/season/${seasonNumber}/episode/${episode.episode_number}`}
                  className="group"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted mb-1.5">
                    {episode.still_path ? (
                      <Image
                        src={`${TMDB_IMAGE_BASE}/w300${episode.still_path}`}
                        alt={episode.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 150px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                        No image
                      </div>
                    )}
                    <div className="absolute top-1 left-1 rounded bg-black/70 px-1 py-0.5 text-[10px] font-medium text-white">
                      {episode.episode_number}
                    </div>
                  </div>
                  <p className="text-xs font-medium text-foreground truncate group-hover:text-brand transition-colors leading-tight">
                    {episode.name}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                    <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
                    <span>{episode.vote_average.toFixed(1)}</span>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
