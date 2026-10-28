import Image from 'next/image';
import Link from 'next/link';
import { Shapes } from 'lucide-react';
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
      <SectionHeader title={title} subtitle={subtitle} icon={Shapes} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={genre.href}
            className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60 transition-all hover:ring-brand/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {genre.backdropPath && (
              <Image
                src={`${TMDB_IMAGE_BASE}/w500${genre.backdropPath}`}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/25" />
            <span className="relative z-10 px-3 text-center text-base font-black tracking-tight text-white drop-shadow-md sm:text-xl">
              {genre.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
