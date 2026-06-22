import Image from "next/image";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CastCardProps = {
  name: string;
  character: string;
  profilePath: string | null;
  creditId: string;
};

export function CastCard({ name, character, profilePath, creditId }: CastCardProps) {
  return (
    <div key={creditId} className="w-full">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {profilePath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w185${profilePath}`}
            alt={name}
            fill
            className="object-cover"
            sizes="140px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-xs p-2 text-center">
            {name}
          </div>
        )}
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm font-medium text-foreground line-clamp-1">{name}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{character}</p>
      </div>
    </div>
  );
}
