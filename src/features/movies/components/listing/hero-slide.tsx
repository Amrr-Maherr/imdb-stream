'use client';

import Image from '@/shared/components/ui/image';
import type { TMDBMovie } from '@/shared/types/tmdb';
import { HeroContent } from './hero-content';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type HeroSlideProps = {
  movie: TMDBMovie;
  rank: number;
};

export function HeroSlide({ movie, rank }: HeroSlideProps) {
  return (
    <div className="relative h-full overflow-hidden bg-black">
      <div className="ken-burns absolute inset-0">
        <Image
          src={`${TMDB_IMAGE_BASE}/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority={rank === 1}
          sizes="100vw"
        />
      </div>

      <HeroContent movie={movie} rank={rank} />
    </div>
  );
}
