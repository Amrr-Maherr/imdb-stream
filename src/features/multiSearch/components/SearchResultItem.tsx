"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { slugify } from "@/shared/utils/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export type SearchResult = {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string | null;
  profile_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
  adult?: boolean;
  known_for_department?: string;
};

type SearchResultItemProps = {
  result: SearchResult;
  onNavigate: () => void;
};

export function SearchResultItem({ result, onNavigate }: SearchResultItemProps) {
  const isMovie = result.media_type === "movie";
  const isTv = result.media_type === "tv";
  const isPerson = result.media_type === "person";

  const title = isMovie ? result.title : result.name;
  const imagePath = isPerson ? result.profile_path : result.poster_path;
  const year = isMovie
    ? result.release_date?.slice(0, 4)
    : isTv
      ? result.first_air_date?.slice(0, 4)
      : undefined;
  const rating = isMovie || isTv ? result.vote_average : undefined;

  let href: string;
  if (isMovie) {
    href = `/movies/${slugify(result.title ?? "")}/${result.id}`;
  } else if (isTv) {
    href = `/tv-shows/${slugify(result.name ?? "")}/${result.id}`;
  } else {
    href = `/people/${slugify(result.name ?? "")}/${result.id}`;
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-start gap-3 px-3 py-2 transition-colors hover:bg-accent"
    >
      <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
        {imagePath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w92${imagePath}`}
            alt={title ?? ""}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-[10px] text-muted-foreground">
            N/A
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">{title}</span>
          {result.adult && (
            <span className="shrink-0 rounded border border-destructive/40 bg-destructive/10 px-1 py-0 text-[10px] font-bold text-destructive leading-tight">
              18+
            </span>
          )}
          <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0">
            {isMovie ? "Movie" : isTv ? "TV" : "Person"}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {year && <span>{year}</span>}
          {rating && rating > 0 && (
            <span className="flex items-center gap-0.5">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
          )}
          {isPerson && (
            <span>{result.known_for_department}</span>
          )}
        </div>
        {!isPerson && result.overview && (
          <p className="line-clamp-1 text-xs text-muted-foreground/70">{result.overview}</p>
        )}
      </div>
    </Link>
  );
}
