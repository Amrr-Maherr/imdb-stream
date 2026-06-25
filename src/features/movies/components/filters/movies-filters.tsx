"use client";

import { GenreDropdown } from "./genre-dropdown";
import { LanguageDropdown } from "./language-dropdown";
import { CountryDropdown } from "./country-dropdown";
import { SortSelect } from "./sort-select";
import { YearSelect } from "./year-select";
import { RatingSelect } from "./rating-select";
import { MobileFilterSheet } from "./mobile-filter-sheet";

function DesktopFilters() {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="app-container py-3">
        <div className="flex flex-wrap items-center gap-2 justify-between grid grid-cols-6">
          <GenreDropdown />
          <LanguageDropdown />
          <YearSelect />
          <RatingSelect />
          <CountryDropdown />
          <SortSelect />
        </div>
      </div>
    </div>
  );
}

function MobileBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="app-container py-2.5">
        <MobileFilterSheet />
      </div>
    </div>
  );
}

function MoviesFilters() {
  return (
    <div className="space-y-0" data-slot="movies-filters">
      <div className="hidden md:block">
        <DesktopFilters />
      </div>
      <div className="md:hidden">
        <MobileBar />
      </div>
    </div>
  );
}

export { MoviesFilters, DesktopFilters, MobileBar };
