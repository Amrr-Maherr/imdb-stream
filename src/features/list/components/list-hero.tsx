import Image from "next/image";
import { List as ListIcon, Heart, Film } from "lucide-react";
import { FadeIn } from "@/features/movies/components/detail/fade-in";

type ListHeroProps = {
  name: string;
  description: string | null;
  itemCount: number;
  favoriteCount: number;
};

export function ListHero({
  name,
  description,
  itemCount,
  favoriteCount,
}: ListHeroProps) {
  return (
    <FadeIn>
      <section className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-gradient-to-br from-card to-background">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-10 md:pb-16">
          <div className="w-full mx-auto app-container">
            <div className="flex items-end gap-6">
              <div className="relative w-[130px] sm:w-[160px] aspect-[2/3] flex-shrink-0 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 hidden sm:flex items-center justify-center bg-muted">
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <ListIcon className="size-12 sm:size-16" />
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white/60 flex items-center gap-2">
                  <ListIcon className="size-3.5" />
                  List
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mt-1">
                  {name}
                </h1>

                {description && (
                  <p className="mt-2 text-sm text-white/70 max-w-2xl line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <Film className="size-3.5" />
                    {itemCount} items
                  </span>
                  {favoriteCount > 0 && (
                    <>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Heart className="size-3.5" />
                        {favoriteCount}
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
