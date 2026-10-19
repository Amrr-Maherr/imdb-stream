'use client';

import Image from 'next/image';
import type { TMDBMovie } from '@/shared/types/tmdb';
import { HeroContent } from './hero-content';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function HeroSlide({ movie }: { movie: TMDBMovie }) {
  return (
    <div className="relative h-full">
      <Image
        src={`${TMDB_IMAGE_BASE}/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 dark:bg-background/60" />
      <div className="absolute inset-0 dark:bg-background/50" />

      <HeroContent movie={movie} />
    </div>
  );
}
