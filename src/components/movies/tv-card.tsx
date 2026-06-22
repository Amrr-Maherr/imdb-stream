import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { TMDBTV } from "@/types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type TvCardProps = {
  tv: TMDBTV;
};

export function TvCard({ tv }: TvCardProps) {
  const year = tv.first_air_date?.slice(0, 4);
  const vote = tv.vote_average.toFixed(1);

  return (
    <Link
      href={`/tv-shows/${tv.id}`}
      className="group flex-shrink-0 w-[160px] sm:w-[180px]"
    >
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
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {tv.name}
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
