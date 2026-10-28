'use client';

import type { TMDBTV } from '@/shared/types/tmdb';
import { TitleQuickView } from '@/features/movies/components/listing/title-quick-view';
import { slugify } from '@/shared/utils/slugify';
import { PosterCard } from './poster-card';

type TvCardProps = {
  tv: TMDBTV;
  genreMap?: Record<number, string>;
  showRank?: number;
};

export function TvCard({ tv, genreMap, showRank }: TvCardProps) {
  const genres = tv.genre_ids
    ?.slice(0, 2)
    .map((id) => genreMap?.[id])
    .filter((name): name is string => Boolean(name));

  return (
    <PosterCard
      href={`/tv-shows/${slugify(tv.name)}/${tv.id}`}
      title={tv.name}
      posterPath={tv.poster_path}
      voteAverage={tv.vote_average}
      adult={tv.adult}
      meta={[tv.first_air_date?.slice(0, 4), tv.origin_country?.[0]]}
      genres={genres}
      showRank={showRank}
      overlay={<TitleQuickView mediaType="tv" data={tv} genreMap={genreMap} />}
    />
  );
}
