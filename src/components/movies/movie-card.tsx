import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { TMDBMovie } from "@/types/tmdb";
import { slugify } from "@/lib/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type MovieCardProps = {
  movie: TMDBMovie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date?.slice(0, 4);
  const vote = movie.vote_average.toFixed(1);

  return (
    <Link
      href={`/movies/${slugify(movie.title)}/${movie.id}`}
      className="group flex-shrink-0 w-[160px] sm:w-[180px]"
    >
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
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span>{vote}</span>
          </div>
          {year && <span>{year}</span>}
        </div>
      </div>
    </Link>
  );
}
