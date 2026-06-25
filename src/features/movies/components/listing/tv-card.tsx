import Image from "next/image";
import Link from "next/link";
import { Star, TrendingUp, Languages, Globe } from "lucide-react";
import type { TMDBTV } from "@/shared/types/tmdb";
import { slugify } from "@/shared/utils/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type TvCardProps = {
  tv: TMDBTV;
  genreMap?: Record<number, string>;
  showRank?: number;
};

export function TvCard({ tv, genreMap, showRank }: TvCardProps) {
  const year = tv.first_air_date?.slice(0, 4);
  const vote = tv.vote_average.toFixed(1);
  const genres = tv.genre_ids
    ?.slice(0, 2)
    .map((id) => genreMap?.[id])
    .filter(Boolean) as string[] | undefined;

  return (
    <Link
      href={`/tv-shows/${slugify(tv.name)}/${tv.id}`}
      className="group flex-shrink-0 w-[160px] sm:w-[180px] relative"
    >
      {showRank && (
        <div className="absolute -top-1.5 -left-1.5 z-10 flex items-center justify-center size-7 rounded-full bg-brand text-brand-foreground text-xs font-bold shadow-md">
          {showRank}
        </div>
      )}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {tv.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w342${tv.poster_path}`}
            alt={tv.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="180px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-2 text-center">
            {tv.name}
          </div>
        )}
        {genres && genres.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {genres.map((g) => (
              <span
                key={g}
                className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-background/80 text-foreground backdrop-blur-sm"
              >
                {g}
              </span>
            ))}
          </div>
        )}
        {tv.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-bold rounded bg-background/80 text-foreground backdrop-blur-sm">
            <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
            <span>{vote}</span>
          </div>
        )}
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {tv.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          {year && <span>{year}</span>}
          <span className="flex items-center gap-0.5">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span>{vote}</span>
          </span>
          {tv.vote_count > 0 && (
            <span className="text-[11px] text-muted-foreground/70">
              ({tv.vote_count.toLocaleString()})
            </span>
          )}
        </div>
        {tv.overview && (
          <p className="text-[11px] text-muted-foreground/60 line-clamp-2 leading-relaxed">
            {tv.overview}
          </p>
        )}
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50">
          {tv.popularity > 0 && (
            <span className="flex items-center gap-0.5">
              <TrendingUp className="size-2.5" />
              {Math.round(tv.popularity)}
            </span>
          )}
          {tv.original_language && (
            <span className="flex items-center gap-0.5">
              <Languages className="size-2.5" />
              {tv.original_language.toUpperCase()}
            </span>
          )}
          {tv.origin_country && tv.origin_country.length > 0 && (
            <span className="flex items-center gap-0.5">
              <Globe className="size-2.5" />
              {tv.origin_country[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
