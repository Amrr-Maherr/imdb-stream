'use client';

import type { TMDBMovie, TMDBPerson, TMDBTV } from '@/shared/types/tmdb';
import { FeaturedRow } from './featured-row';
import { PremiumRow } from './premium-row';
import { BannerSection } from './banner-section';
import { MediaRow } from './media-row';
import { MovieCard } from './movie-card';
import { TvCard } from './tv-card';
import { PersonCard } from './person-card';

type GenreMap = Record<number, string>;

type MoviesRowProps = {
  title: string;
  subtitle?: string;
  movies: TMDBMovie[];
  genreMap: GenreMap;
};

type TvRowProps = {
  title: string;
  subtitle?: string;
  shows: TMDBTV[];
  genreMap: GenreMap;
};

export function PopularMoviesRow({ title, movies, genreMap }: MoviesRowProps) {
  const [spotlight, ...rest] = movies;
  return (
    <FeaturedRow title={title} spotlight={spotlight} genreMap={genreMap}>
      {rest.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
    </FeaturedRow>
  );
}

export function TopRatedMoviesRow({ title, subtitle, movies, genreMap }: MoviesRowProps) {
  const averageRating = movies.reduce((sum, movie) => sum + movie.vote_average, 0) / movies.length;
  return (
    <PremiumRow title={title} subtitle={subtitle} averageRating={averageRating}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
    </PremiumRow>
  );
}

export function NowPlayingRow({ title, subtitle, movies, genreMap }: MoviesRowProps) {
  return (
    <BannerSection title={title} subtitle={subtitle}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
    </BannerSection>
  );
}

export function UpcomingRow({ title, subtitle, movies, genreMap }: MoviesRowProps) {
  return (
    <MediaRow
      title={title}
      subtitle={subtitle}
      slidesPerView={5}
      slidesMobilePerView={2.5}
      spaceBetween={14}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
    </MediaRow>
  );
}

export function TrendingTvRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  return (
    <MediaRow
      title={title}
      subtitle={subtitle}
      slidesPerView={5}
      slidesMobilePerView={2.5}
      spaceBetween={14}
    >
      {shows.map((tv) => (
        <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
      ))}
    </MediaRow>
  );
}

export function PopularTvRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  return (
    <MediaRow
      title={title}
      subtitle={subtitle}
      slidesPerView={5}
      slidesMobilePerView={2.5}
      spaceBetween={14}
    >
      {shows.map((tv) => (
        <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
      ))}
    </MediaRow>
  );
}

export function AiringTodayRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  return (
    <BannerSection title={title} subtitle={subtitle}>
      {shows.map((tv) => (
        <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
      ))}
    </BannerSection>
  );
}

export function TopRatedTvRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  const averageRating = shows.reduce((sum, show) => sum + show.vote_average, 0) / shows.length;
  return (
    <PremiumRow title={title} subtitle={subtitle} averageRating={averageRating}>
      {shows.map((tv) => (
        <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
      ))}
    </PremiumRow>
  );
}

export function PopularPeopleRow({
  title,
  subtitle,
  people,
}: {
  title: string;
  subtitle?: string;
  people: TMDBPerson[];
}) {
  return (
    <MediaRow
      title={title}
      subtitle={subtitle}
      slidesPerView={6}
      slidesMobilePerView={3}
      spaceBetween={16}
    >
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </MediaRow>
  );
}
