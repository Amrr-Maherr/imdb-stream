import Image from "next/image";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type MoviePosterProps = {
  posterPath: string | null;
  title: string;
  priority?: boolean;
};

export function MoviePoster({ posterPath, title, priority }: MoviePosterProps) {
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-2xl bg-muted">
      {posterPath ? (
        <Image
          src={`${TMDB_IMAGE_BASE}/w500${posterPath}`}
          alt={title}
          fill
          className="object-cover"
          priority={priority}
          sizes="300px"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground p-4 text-center text-sm">
          {title}
        </div>
      )}
    </div>
  );
}
