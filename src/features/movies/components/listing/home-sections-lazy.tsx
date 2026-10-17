'use client';

import { Suspense, lazy } from 'react';
import type { TMDBMovie, TMDBPerson, TMDBTV } from '@/shared/types/tmdb';
import type { FeaturedBanner } from './featured-banner-grid';
import type { GenreTile } from './genre-discovery';
import type { SpotlightLabels } from './editorial-spotlight';
import type {
  SpotlightCredit,
  SpotlightPerson,
  SpotlightStats,
} from '@/features/movies/services/spotlight';
import {
  BannerSectionSkeleton,
  EditorialSpotlightSkeleton,
  FeaturedBannerGridSkeleton,
  FeaturedRowSkeleton,
  GenreGridSkeleton,
  PersonRowSkeleton,
  PremiumRowSkeleton,
  SectionRowSkeleton,
} from './home-skeleton';

type GenreMap = Record<number, string>;

const PopularMoviesRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.PopularMoviesRow }))
);
const TopRatedMoviesRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.TopRatedMoviesRow }))
);
const NowPlayingRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.NowPlayingRow }))
);
const UpcomingRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.UpcomingRow }))
);
const TrendingTvRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.TrendingTvRow }))
);
const PopularTvRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.PopularTvRow }))
);
const AiringTodayRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.AiringTodayRow }))
);
const TopRatedTvRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.TopRatedTvRow }))
);
const PopularPeopleRow = lazy(() =>
  import('./home-section-rows').then((m) => ({ default: m.PopularPeopleRow }))
);
const FeaturedBannerGrid = lazy(() =>
  import('./featured-banner-grid').then((m) => ({ default: m.FeaturedBannerGrid }))
);
const EditorialSpotlight = lazy(() =>
  import('./editorial-spotlight').then((m) => ({ default: m.EditorialSpotlight }))
);
const GenreDiscovery = lazy(() =>
  import('./genre-discovery').then((m) => ({ default: m.GenreDiscovery }))
);

export function LazyPopularMoviesRow(props: {
  title: string;
  movies: TMDBMovie[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<FeaturedRowSkeleton />}>
      <PopularMoviesRow {...props} />
    </Suspense>
  );
}

export function LazyTopRatedMoviesRow(props: {
  title: string;
  subtitle?: string;
  movies: TMDBMovie[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<PremiumRowSkeleton />}>
      <TopRatedMoviesRow {...props} />
    </Suspense>
  );
}

export function LazyNowPlayingRow(props: {
  title: string;
  subtitle?: string;
  movies: TMDBMovie[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<BannerSectionSkeleton />}>
      <NowPlayingRow {...props} />
    </Suspense>
  );
}

export function LazyUpcomingRow(props: {
  title: string;
  subtitle?: string;
  movies: TMDBMovie[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<SectionRowSkeleton />}>
      <UpcomingRow {...props} />
    </Suspense>
  );
}

export function LazyTrendingTvRow(props: {
  title: string;
  subtitle?: string;
  shows: TMDBTV[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<SectionRowSkeleton />}>
      <TrendingTvRow {...props} />
    </Suspense>
  );
}

export function LazyPopularTvRow(props: {
  title: string;
  subtitle?: string;
  shows: TMDBTV[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<SectionRowSkeleton />}>
      <PopularTvRow {...props} />
    </Suspense>
  );
}

export function LazyAiringTodayRow(props: {
  title: string;
  subtitle?: string;
  shows: TMDBTV[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<BannerSectionSkeleton />}>
      <AiringTodayRow {...props} />
    </Suspense>
  );
}

export function LazyTopRatedTvRow(props: {
  title: string;
  subtitle?: string;
  shows: TMDBTV[];
  genreMap: GenreMap;
}) {
  return (
    <Suspense fallback={<PremiumRowSkeleton />}>
      <TopRatedTvRow {...props} />
    </Suspense>
  );
}

export function LazyPopularPeopleRow(props: {
  title: string;
  subtitle?: string;
  people: TMDBPerson[];
}) {
  return (
    <Suspense fallback={<PersonRowSkeleton />}>
      <PopularPeopleRow {...props} />
    </Suspense>
  );
}

export function LazyFeaturedBannerGrid(props: {
  title: string;
  subtitle?: string;
  items: FeaturedBanner[];
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <Suspense fallback={<FeaturedBannerGridSkeleton />}>
      <FeaturedBannerGrid {...props} />
    </Suspense>
  );
}

export function LazyEditorialSpotlight(props: {
  title: string;
  subtitle?: string;
  labels: SpotlightLabels;
  person: SpotlightPerson;
  stats: SpotlightStats;
  credits: SpotlightCredit[];
}) {
  return (
    <Suspense fallback={<EditorialSpotlightSkeleton />}>
      <EditorialSpotlight {...props} />
    </Suspense>
  );
}

export function LazyGenreDiscovery(props: {
  title: string;
  subtitle?: string;
  genres: GenreTile[];
}) {
  return (
    <Suspense fallback={<GenreGridSkeleton />}>
      <GenreDiscovery {...props} />
    </Suspense>
  );
}
