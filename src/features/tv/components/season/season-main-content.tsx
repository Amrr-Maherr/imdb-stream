import Image from "next/image";
import Link from "next/link";
import { Star, Play } from "lucide-react";
import type { TVSeasonDetails } from "@/shared/types/tmdb";
import { MovieCast } from "@/features/movies/components/detail/movie-cast";
import { MovieSection } from "@/features/movies/components/detail/movie-section";
import { FadeIn } from "@/features/movies/components/detail/fade-in";
import { Slider } from "@/shared/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type SeasonMainContentProps = {
  season: TVSeasonDetails;
  slug: string;
  tvId: string;
  seasonNumber: string;
};

export function SeasonMainContent({
  season,
  slug,
  tvId,
  seasonNumber,
}: SeasonMainContentProps) {
  const allCast = season.aggregate_credits?.cast ?? season.credits?.cast ?? [];
  const posters = season.images?.posters ?? [];
  const backdrops = season.images?.backdrops ?? [];

  return (
    <div className="flex-1 min-w-0 space-y-12">
      <FadeIn>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Episodes</h2>
          <div className="space-y-3">
            {season.episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/tv-shows/${slug}/${tvId}/season/${seasonNumber}/episode/${episode.episode_number}`}
                className="flex gap-4 rounded-xl border border-border bg-card p-3 sm:p-4 hover:bg-muted transition-colors group"
              >
                <div className="relative w-[140px] sm:w-[180px] aspect-video flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  {episode.still_path ? (
                    <>
                      <Image
                        src={`${TMDB_IMAGE_BASE}/w300${episode.still_path}`}
                        alt={episode.name}
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <Play className="size-5 text-white ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                  <div className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {episode.episode_number}
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                      {episode.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      <span>{episode.vote_average.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                    {episode.air_date && (
                      <span>
                        {new Date(episode.air_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    )}
                    {episode.runtime != null && episode.runtime > 0 && (
                      <>
                        <span className="text-muted-foreground/50">·</span>
                        <span>{episode.runtime} min</span>
                      </>
                    )}
                  </div>

                  {episode.overview && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {episode.overview}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {allCast.length > 0 && (
        <FadeIn delay={0.1}>
          <MovieCast cast={allCast} />
        </FadeIn>
      )}

      {(posters.length > 0 || backdrops.length > 0) && (
        <FadeIn delay={0.15}>
          <MovieSection title="Images" icon={null}>
            <Slider
              slidesPerView={3}
              slidesMobilePerView={1.5}
              spaceBetween={12}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
            >
              {[...posters, ...backdrops].map((img) => (
                <div
                  key={img?.file_path}
                  className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w500${img?.file_path}`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 75vw, 33vw"
                  />
                </div>
              ))}
            </Slider>
          </MovieSection>
        </FadeIn>
      )}
    </div>
  );
}
