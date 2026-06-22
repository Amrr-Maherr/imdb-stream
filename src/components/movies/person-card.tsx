import Image from "next/image";
import Link from "next/link";
import type { TMDBPerson } from "@/types/tmdb";
import { slugify } from "@/lib/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type PersonCardProps = {
  person: TMDBPerson;
};

export function PersonCard({ person }: PersonCardProps) {
  const knownFor = person.known_for
    ?.slice(0, 2)
    .map((item) => ("title" in item ? item.title : item.name))
    .join(", ");

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
      </div>
    </Link>
  );
}
