import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
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
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-muted ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-brand/50">
        {profilePath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w185${profilePath}`}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 40vw, 160px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <User className="size-10 text-muted-foreground/40" />
          </div>
        )}
      </div>
      <div className="mt-2.5 px-0.5 text-center">
        <p className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
          {name}
        </p>
        {character && <p className="line-clamp-1 text-xs text-muted-foreground">{character}</p>}
      </div>
    </>
  );

  if (id) {
    return (
      <Link
        key={creditId}
        href={`/people/${slugify(name)}/${id}`}
        className="group block w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
