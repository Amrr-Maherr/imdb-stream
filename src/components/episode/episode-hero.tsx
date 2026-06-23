import Image from "next/image";
import { Star, Clock, Calendar } from "lucide-react";
import { FadeIn } from "@/components/movie/fade-in";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type EpisodeHeroProps = {
  stillPath: string | null;
  name: string;
  seasonNumber: string;
  episodeNumber: number;
  voteAverage: number;
  voteCount: number;
  airDate: string | null;
  runtime: number | null;
};

export function EpisodeHero({
  stillPath,
  name,
  seasonNumber,
  episodeNumber,
  voteAverage,
  voteCount,
  airDate,
  runtime,
}: EpisodeHeroProps) {
  return (
    <FadeIn>
      <section className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
        {stillPath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/original${stillPath}`}
            alt={name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-card to-background" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-12">
          <div className="w-full mx-auto app-container">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white/60">
                  S{String(seasonNumber).padStart(2, "0")} · E{String(episodeNumber).padStart(2, "0")}
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mt-1">
                  {name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <Star className="size-4 fill-rating-star text-rating-star" />
                    <span className="text-white font-medium">{voteAverage.toFixed(1)}</span>
                    <span className="text-white/50">({voteCount.toLocaleString()})</span>
                  </span>
                  {airDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {new Date(airDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {runtime != null && runtime > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {runtime} min
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
