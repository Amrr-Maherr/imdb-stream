'use client';

import { ActiveFilters, FilterSidebar, MobileBar } from '@/shared/components/filters';
import { useTvFilterConfig } from './config';

function TvFilters() {
  const config = useTvFilterConfig();

  return <FilterSidebar config={config} />;
}

function TvMobileBar() {
  const config = useTvFilterConfig();

  return <MobileBar config={config} />;
}

function TvActiveFilters({ className }: { className?: string }) {
  const config = useTvFilterConfig();

  return <ActiveFilters config={config} className={className} />;
}

export { TvFilters, TvMobileBar, TvActiveFilters };
