'use client';

import { ActiveFilters, FilterSidebar, MobileBar } from '@/shared/components/filters';
import { useMoviesFilterConfig } from './config';

function MoviesFilters() {
  const config = useMoviesFilterConfig();

  return <FilterSidebar config={config} />;
}

function MoviesMobileBar() {
  const config = useMoviesFilterConfig();

  return <MobileBar config={config} />;
}

function MoviesActiveFilters({ className }: { className?: string }) {
  const config = useMoviesFilterConfig();

  return <ActiveFilters config={config} className={className} />;
}

export { MoviesFilters, MoviesMobileBar, MoviesActiveFilters };
