import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import type { TMDBPerson } from "@/shared/types/tmdb";
import { slugify } from "@/shared/utils/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type PersonCardProps = {
  person: TMDBPerson;
  featured?: boolean;
};

export function PersonCard({ person, featured }: PersonCardProps) {
  const knownFor = person.known_for
    ?.slice(0, 2)
    .map((item) => ("title" in item ? item.title : item.name))
    .join(", ");

  if (featured) {
    return (
      <Link
        href={`/people/${slugify(person.name)}/${person.id}`}
        className="group flex-shrink-0 w-[200px] sm:w-[240px]"
      >
        <div className="relative aspect-[1/1] w-full overflow-hidden rounded-xl bg-muted">
          {person.profile_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w342${person.profile_path}`}
              alt={person.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="240px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-2 text-center">
              {person.name}
            </div>
          )}
        </div>
        <div className="mt-3 space-y-1 text-center">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1 leading-tight">
            {person.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {person.known_for_department}
          </p>
          {knownFor && (
            <p className="text-xs text-muted-foreground/70 line-clamp-1">
              Known for: {knownFor}
            </p>
          )}
          <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground/50">
            <TrendingUp className="size-3" />
            <span>{Math.round(person.popularity)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/people/${slugify(person.name)}/${person.id}`}
      className="group flex-shrink-0 w-[140px] sm:w-[160px]"
    >
      <div className="relative aspect-[1/1] w-full overflow-hidden rounded-full bg-muted">
        {person.profile_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w185${person.profile_path}`}
            alt={person.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="160px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-xs p-2 text-center">
            {person.name}
          </div>
        )}
      </div>
      <div className="mt-2 space-y-0.5 text-center">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {person.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {person.known_for_department}
        </p>
        {knownFor && (
          <p className="text-[11px] text-muted-foreground/70 line-clamp-1">
            {knownFor}
          </p>
        )}
        <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground/50 mt-0.5">
          <TrendingUp className="size-2.5" />
          <span>{Math.round(person.popularity)}</span>
        </div>
      </div>
    </Link>
  );
}
