import Link from "next/link";
import Image from "next/image";
import { Star, Calendar, Film, Tv, Play } from "lucide-react";
import type { CollectionPart } from "@/shared/types/tmdb";
import { slugify } from "@/shared/utils/slugify";
import { FadeIn } from "@/features/movies/components/detail/fade-in";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CollectionMainContentProps = {
  name: string;
  overview: string;
  parts: CollectionPart[];
};

function isTV(part: CollectionPart): boolean {
  return (
    part.media_type === "tv" ||
    part.original_title === undefined ||
    !part.title
  );
}

function getTitle(part: CollectionPart): string {
  return isTV(part) ? (part as any).name || part.original_title || part.title : part.title;
}

function getHref(part: CollectionPart): string {
  const title = getTitle(part);
  const slug = slugify(title);
  if (isTV(part)) {
    return `/tv-shows/${slug}/${part.id}`;
  }
  return `/movies/${slug}/${part.id}`;
}

export function CollectionMainContent({
  name,
  overview,
  parts,
}: CollectionMainContentProps) {
  return (
    <div className="flex-1 min-w-0 space-y-10">
      {/* Overview */}
      {overview && (
        <FadeIn>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Storyline</h2>
            <p className="text-muted-foreground leading-relaxed">{overview}</p>
          </section>
        </FadeIn>
      )}

      {/* Collection Timeline */}
      {parts.length > 0 && (
        <FadeIn delay={0.05}>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Collection Timeline
            </h2>
            <div className="space-y-3">
              {parts.map((part, index) => {
                const title = getTitle(part);
                const year = part.release_date?.slice(0, 4);
                const href = getHref(part);
                const MediaIcon = isTV(part) ? Tv : Film;

                return (
                  <Link
                    key={part.id}
                    href={href}
                    className="flex gap-4 rounded-xl border border-border bg-card p-3 sm:p-4 hover:bg-muted transition-colors group"
                  >
                    <div className="relative w-[100px] sm:w-[120px] aspect-[2/3] flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      {part.poster_path ? (
                        <>
                          <Image
                            src={`${TMDB_IMAGE_BASE}/w185${part.poster_path}`}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="120px"
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
                        #{index + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                          {title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span>{part.vote_average.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MediaIcon className="size-3" />
                        {year && (
                          <>
                            <span>{year}</span>
                          </>
                        )}
                        {part.original_language && (
                          <>
                            <span className="text-muted-foreground/50">·</span>
                            <span className="uppercase">
                              {part.original_language}
                            </span>
                          </>
                        )}
                      </div>

                      {part.overview && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {part.overview}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Grid of all collection items */}
      {parts.length > 0 && (
        <FadeIn delay={0.1}>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Titles in this Collection
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {parts.map((part, index) => {
                const title = getTitle(part);
                const year = part.release_date?.slice(0, 4);
                const href = getHref(part);

                return (
                  <Link
                    key={part.id}
                    href={href}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
                      {part.poster_path ? (
                        <Image
                          src={`${TMDB_IMAGE_BASE}/w342${part.poster_path}`}
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
                      {part.vote_average > 0 && (
                        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-bold rounded bg-background/80 text-foreground backdrop-blur-sm">
                          <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
                          <span>{part.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight group-hover:text-brand transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                        {year && <span>{year}</span>}
                        <span className="flex items-center gap-0.5">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span>{part.vote_average.toFixed(1)}</span>
                        </span>
                        {part.original_language && (
                          <span className="text-[10px] text-muted-foreground/60 uppercase">
                            {part.original_language}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Empty state */}
      {parts.length === 0 && (
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Film className="size-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No titles in this collection yet.
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
