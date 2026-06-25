import Image from "next/image";
import Link from "next/link";
import { Star, TrendingUp, Languages } from "lucide-react";
import type { TMDBMovie } from "@/shared/types/tmdb";
import { slugify } from "@/shared/utils/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type MovieCardProps = {
  movie: TMDBMovie;
  genreMap?: Record<number, string>;
  showRank?: number;
};

export function MovieCard({ movie, genreMap, showRank }: MovieCardProps) {
  const year = movie.release_date?.slice(0, 4);
  const vote = movie.vote_average.toFixed(1);
  const genres = movie.genre_ids
    ?.slice(0, 2)
    .map((id) => genreMap?.[id])
    .filter(Boolean) as string[] | undefined;

  return (
    <Link
      href={`/movies/${slugify(movie.title)}/${movie.id}`}
      className="group flex-shrink-0 w-[160px] sm:w-[180px] relative"
    >
      {showRank && (
        <div className="absolute -top-1.5 -left-1.5 z-10 flex items-center justify-center size-7 rounded-full bg-brand text-brand-foreground text-xs font-bold shadow-md">
          {showRank}
        </div>
      )}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {movie.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="180px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-2 text-center">
            {movie.title}
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
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-bold rounded bg-background/80 text-foreground backdrop-blur-sm">
            <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
            <span>{vote}</span>
          </div>
        )}
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          {year && <span>{year}</span>}
          <span className="flex items-center gap-0.5">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span>{vote}</span>
          </span>
          {movie.vote_count > 0 && (
            <span className="text-[11px] text-muted-foreground/70">
              ({movie.vote_count.toLocaleString()})
            </span>
          )}
        </div>
        {movie.overview && (
          <p className="text-[11px] text-muted-foreground/60 line-clamp-2 leading-relaxed">
            {movie.overview}
          </p>
        )}
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50">
          {movie.popularity > 0 && (
            <span className="flex items-center gap-0.5">
              <TrendingUp className="size-2.5" />
              {Math.round(movie.popularity)}
            </span>
          )}
          {movie.original_language && (
            <span className="flex items-center gap-0.5">
              <Languages className="size-2.5" />
              {movie.original_language.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
