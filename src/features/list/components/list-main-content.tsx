import Link from "next/link";
import Image from "next/image";
import { Star, Tv } from "lucide-react";
import { slugify } from "@/shared/utils/slugify";
import { FadeIn } from "@/features/movies/components/detail/fade-in";
import { EmptyState } from "@/shared/components/empty-state";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type ListItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
};

type ListMainContentProps = {
  name: string;
  description: string | null;
  items: ListItem[];
};

function getTitle(item: ListItem): string {
  return item.title || item.name || "Unknown";
}

function getHref(item: ListItem): string {
  const title = getTitle(item);
  const slug = slugify(title);
  if (item.media_type === "tv") {
    return `/tv-shows/${slug}/${item.id}`;
  }
  return `/movies/${slug}/${item.id}`;
}

export function ListMainContent({
  name,
  description,
  items,
}: ListMainContentProps) {
  const isMovie = items.every((item) => item.media_type === "movie");
  const isTV = items.every((item) => item.media_type === "tv");

  return (
    <div className="flex-1 min-w-0 space-y-10">
      {/* Description */}
      {description && (
        <FadeIn>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </section>
        </FadeIn>
      )}

      {/* Items grid */}
      {items.length > 0 && (
        <FadeIn delay={0.05}>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">
              {isMovie ? "Movies" : isTV ? "TV Shows" : "Titles"}
              <span className="text-muted-foreground font-normal text-base ml-2">
                ({items.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => {
                const title = getTitle(item);
                const year = (item.release_date || item.first_air_date || "").slice(0, 4);
                const href = getHref(item);

                return (
                  <Link
                    key={item.id}
                    href={href}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
                      {item.poster_path ? (
                        <Image
                          src={`${TMDB_IMAGE_BASE}/w342${item.poster_path}`}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-2 text-center">
                          {title}
                        </div>
                      )}
                      {item.vote_average > 0 && (
                        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-bold rounded bg-background/80 text-foreground backdrop-blur-sm">
                          <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
                          <span>{item.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight group-hover:text-brand transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                        {year && <span>{year}</span>}
                        <span className="flex items-center gap-0.5">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.vote_average.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {items.length === 0 && (
        <EmptyState
          title="This list is empty."
          className="py-16"
        />
      )}
    </div>
  );
}
