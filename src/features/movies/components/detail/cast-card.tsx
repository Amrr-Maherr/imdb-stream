import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/shared/utils/slugify';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type CastCardProps = {
  name: string;
  character: string;
  profilePath: string | null;
  creditId: string;
  id?: number;
};

export function CastCard({ name, character, profilePath, creditId, id }: CastCardProps) {
  const content = (
    <>
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
        <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-brand transition-colors">
          {name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1">{character}</p>
      </div>
    </>
  );

  if (id) {
    return (
      <Link
        key={creditId}
        href={`/people/${slugify(name)}/${id}`}
        className="group block w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {content}
      </Link>
    );
  }

  return (
    <div key={creditId} className="w-full">
      {content}
    </div>
  );
}
