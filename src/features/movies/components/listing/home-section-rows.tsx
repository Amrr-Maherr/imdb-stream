'use client';

import { CalendarClock, Clapperboard, Flame, Radio, Sparkles, Users } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { TMDBMovie, TMDBPerson, TMDBTV } from '@/shared/types/tmdb';
import { FeaturedRow } from './featured-row';
import { PremiumRow } from './premium-row';
import { BannerSection } from './banner-section';
import { MediaRow } from './media-row';
import { RankedRow } from './ranked-row';
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

function useViewAll() {
  const t = useTranslations('HomePage');
  return t('viewAll');
}

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

export function TopRatedMoviesRow({ title, subtitle, movies }: MoviesRowProps) {
  return (
    <RankedRow
      title={title}
      subtitle={subtitle}
      viewAllHref="/movies?sort_by=vote_average.desc"
      items={movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        year: movie.release_date?.slice(0, 4),
        mediaType: 'movie',
      }))}
    />
  );
}

export function NowPlayingRow({ title, subtitle, movies, genreMap }: MoviesRowProps) {
  const t = useTranslations('HomePage');
  return (
    <BannerSection
      title={title}
      subtitle={subtitle}
      eyebrow={t('inTheaters')}
      icon={Clapperboard}
      viewAllHref="/movies"
      viewAllLabel={useViewAll()}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
    </BannerSection>
  );
}

export function UpcomingRow({ title, subtitle, movies, genreMap }: MoviesRowProps) {
  const locale = useLocale();
  const t = useTranslations('HomePage');
  const viewAll = useViewAll();
  const dateFormat = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });

  // Soonest first, so the row reads like a release calendar.
  const sorted = [...movies].sort((a, b) =>
    (a.release_date ?? '').localeCompare(b.release_date ?? '')
  );

  return (
    <MediaRow
      title={title}
      subtitle={subtitle}
      eyebrow={t('releaseCalendar')}
      icon={CalendarClock}
      viewAllHref="/movies?sort_by=primary_release_date.desc"
      viewAllLabel={viewAll}
    >
      {sorted.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genreMap={genreMap}
          badge={movie.release_date ? dateFormat.format(new Date(movie.release_date)) : undefined}
        />
      ))}
    </MediaRow>
  );
}

export function TrendingTvRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  return (
    <MediaRow
      title={title}
      subtitle={subtitle}
      icon={Flame}
      viewAllHref="/tv-shows"
      viewAllLabel={useViewAll()}
    >
      {shows.map((tv, index) => (
        <TvCard
          key={tv.id}
          tv={tv}
          genreMap={genreMap}
          showRank={index < 3 ? index + 1 : undefined}
        />
      ))}
    </MediaRow>
  );
}

export function PopularTvRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  return (
    <MediaRow
      title={title}
      subtitle={subtitle}
      icon={Sparkles}
      viewAllHref="/tv-shows"
      viewAllLabel={useViewAll()}
    >
      {shows.map((tv) => (
        <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
      ))}
    </MediaRow>
  );
}

export function AiringTodayRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  const t = useTranslations('HomePage');
  return (
    <BannerSection
      title={title}
      subtitle={subtitle}
      eyebrow={t('newEpisodes')}
      icon={Radio}
      viewAllHref="/tv-shows"
      viewAllLabel={useViewAll()}
    >
      {shows.map((tv) => (
        <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
      ))}
    </BannerSection>
  );
}

export function TopRatedTvRow({ title, subtitle, shows, genreMap }: TvRowProps) {
  const averageRating = shows.reduce((sum, show) => sum + show.vote_average, 0) / shows.length;
  return (
    <PremiumRow
      title={title}
      subtitle={subtitle}
      averageRating={averageRating}
      viewAllHref="/tv-shows?sort_by=vote_average.desc"
      viewAllLabel={useViewAll()}
    >
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
      icon={Users}
      density="person"
      viewAllHref="/people"
      viewAllLabel={useViewAll()}
    >
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </MediaRow>
  );
}
