import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from './section-header';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type GenreTile = {
  id: number;
  name: string;
  href: string;
  backdropPath: string | null;
};

type GenreDiscoveryProps = {
  title: string;
  subtitle?: string;
  genres: GenreTile[];
};

export function GenreDiscovery({ title, subtitle, genres }: GenreDiscoveryProps) {
  if (genres.length === 0) return null;

  return (
    <section>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={genre.href}
            className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {genre.backdropPath && (
              <Image
                src={`${TMDB_IMAGE_BASE}/w500${genre.backdropPath}`}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <span className="relative z-10 px-3 text-center text-base font-bold text-foreground sm:text-lg">
              {genre.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
