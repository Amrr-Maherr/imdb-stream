import Image from "next/image";
import Link from "next/link";
import type { TVSeason } from "@/shared/types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type SeasonCardProps = {
  season: TVSeason;
  tvId: number;
  tvSlug: string;
};

export function SeasonCard({ season, tvId, tvSlug }: SeasonCardProps) {
  if (season.season_number === 0) return null;

  return (
    <Link
      href={`/tv-shows/${tvSlug}/${tvId}/season/${season.season_number}`}
      className="group flex-shrink-0 w-[160px] sm:w-[180px]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {season.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w342${season.poster_path}`}
            alt={season.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="180px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-2 text-center">
            {season.name}
          </div>
        )}
      </div>
      <div className="mt-2 space-y-0.5">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {season.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {season.episode_count} episodes
          {season.air_date && <> · {season.air_date.slice(0, 4)}</>}
        </p>
      </div>
    </Link>
  );
}
