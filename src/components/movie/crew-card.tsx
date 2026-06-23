import Image from "next/image";
import Link from "next/link";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CrewCardProps = {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string | null;
  creditId: string;
};

export function CrewCard({
  id,
  name,
  job,
  profilePath,
}: CrewCardProps) {
  return (
    <Link
      href={`/person/${id}`}
      className="group w-full text-center"
    >
      <div className="relative size-24 mx-auto overflow-hidden rounded-full bg-muted ring-2 ring-border group-hover:ring-brand transition-all">
        {profilePath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w185${profilePath}`}
            alt={name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground text-lg font-bold">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm font-medium text-foreground line-clamp-1 leading-tight group-hover:text-brand transition-colors">
          {name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {job}
        </p>
      </div>
    </Link>
  );
}
