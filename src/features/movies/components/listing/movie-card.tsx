'use client';

import type { TMDBMovie } from '@/shared/types/tmdb';
import { TitleQuickView } from '@/features/movies/components/listing/title-quick-view';
import { slugify } from '@/shared/utils/slugify';
import { PosterCard } from './poster-card';

type MovieCardProps = {
  movie: TMDBMovie;
  genreMap?: Record<number, string>;
  showRank?: number;
  badge?: string;
};

export function MovieCard({ movie, genreMap, showRank, badge }: MovieCardProps) {
  const genres = movie.genre_ids
    ?.slice(0, 2)
    .map((id) => genreMap?.[id])
    .filter((name): name is string => Boolean(name));

  return (
    <PosterCard
      href={`/movies/${slugify(movie.title)}/${movie.id}`}
      title={movie.title}
      posterPath={movie.poster_path}
      voteAverage={movie.vote_average}
      adult={movie.adult}
      meta={[movie.release_date?.slice(0, 4), movie.original_language?.toUpperCase()]}
      genres={genres}
      showRank={showRank}
      badge={badge}
      overlay={<TitleQuickView mediaType="movie" data={movie} genreMap={genreMap} />}
    />
  );
}
