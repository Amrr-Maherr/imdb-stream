import Image from "next/image";
import { Star, Layers } from "lucide-react";
import { FadeIn } from "@/features/movies/components/detail/fade-in";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CollectionHeroProps = {
  backdropPath: string | null;
  posterPath: string | null;
  name: string;
  partsCount: number;
  releaseRange: string | null;
  avgRating: number;
};

export function CollectionHero({
  backdropPath,
  posterPath,
  name,
  partsCount,
  releaseRange,
  avgRating,
}: CollectionHeroProps) {
  return (
    <FadeIn>
      <section className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
        {backdropPath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/original${backdropPath}`}
            alt={name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-card to-background" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-10 md:pb-16">
          <div className="w-full mx-auto app-container">
            <div className="flex items-end gap-6">
              <div className="relative w-[130px] sm:w-[160px] aspect-[2/3] flex-shrink-0 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 hidden sm:block">
                {posterPath ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w342${posterPath}`}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-muted-foreground text-xs p-2 text-center">
                    {name}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white/60 flex items-center gap-2">
                  <Layers className="size-3.5" />
                  Collection
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mt-1">
                  {name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <Layers className="size-3.5" />
                    {partsCount} titles
                  </span>
                  {releaseRange && (
                    <>
                      <span>·</span>
                      <span>{releaseRange}</span>
                    </>
                  )}
                  {avgRating > 0 && (
                    <>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3.5 fill-rating-star text-rating-star" />
                        <span className="text-white font-medium">
                          {avgRating.toFixed(1)}
                        </span>
                      </span>
                    </>
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
