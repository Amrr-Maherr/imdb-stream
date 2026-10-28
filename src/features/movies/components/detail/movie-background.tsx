'use client';

import Image from 'next/image';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type MovieBackgroundProps = {
  trailerKey: string | null;
  backdropPath: string | null;
  title: string;
};

export function MovieBackground({ trailerKey, backdropPath, title }: MovieBackgroundProps) {
  if (!trailerKey) {
    return (
      <div className="relative w-full h-full">
        {backdropPath ? (
          <>
            <Image
              src={`${TMDB_IMAGE_BASE}/original${backdropPath}`}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </div>
    );
  }

  return (
    <div className="video-cover relative w-full h-full">
      {backdropPath && (
        <Image
          src={`${TMDB_IMAGE_BASE}/original${backdropPath}`}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}
      <div id="youtube-player" className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
