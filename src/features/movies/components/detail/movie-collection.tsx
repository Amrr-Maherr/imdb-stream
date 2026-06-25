import Image from "next/image";
import Link from "next/link";
import { Film } from "lucide-react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

type MovieCollectionProps = {
  collection: Collection;
};

export function MovieCollection({ collection }: MovieCollectionProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="absolute inset-0">
        {collection.backdrop_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w780${collection.backdrop_path}`}
            alt={collection.name}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        ) : null}
      </div>
      <div className="relative z-10 flex items-center gap-4 p-5">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
          {collection.poster_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w185${collection.poster_path}`}
              alt={collection.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <Film className="size-6" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Part of
          </p>
          <p className="text-lg font-bold text-foreground truncate">
            {collection.name}
          </p>
          <Link
            href={`/collection/${collection.id}`}
            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
          >
            View collection
          </Link>
        </div>
      </div>
    </div>
  );
}
