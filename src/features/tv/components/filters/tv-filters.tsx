"use client";

import { RotateCcw } from "lucide-react";
import { GenreDropdown } from "./genre-dropdown";
import { LanguageDropdown } from "./language-dropdown";
import { CountryDropdown } from "./country-dropdown";
import { SortSelect } from "./sort-select";
import { YearSelect } from "./year-select";
import { RatingSelect } from "./rating-select";
import { AdultToggle } from "./adult-toggle";
import { MobileFilterSheet } from "./mobile-filter-sheet";
import { Button } from "@/shared/components/ui/button";
import { useResetFilters } from "@/shared/hooks/useResetFilters";

function DesktopFilters({ totalResults }: { totalResults?: number }) {
  const { hasFilters, handleReset } = useResetFilters();

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="space-y-0.5">
          <h2 className="text-sm font-semibold text-foreground leading-none">
            Filters
          </h2>
          <p className="text-xs text-muted-foreground">
            Refine results using genres, ratings, languages, and more.
          </p>
        </div>
        {totalResults !== undefined && (
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
            {totalResults.toLocaleString()} results
          </span>
        )}
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center gap-2">
        <div className="flex flex-wrap items-center gap-2.5 xl:flex-nowrap">
          <GenreDropdown />
          <LanguageDropdown />
          <YearSelect />
          <RatingSelect />
          <CountryDropdown />
          <SortSelect />
        </div>
        <div className="flex items-center gap-2.5 xl:ml-auto">
          <div className="hidden xl:block h-6 w-px bg-border" />
          <AdultToggle />
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-xs shrink-0"
            >
              <RotateCcw className="size-3.5" />
              Clear Filters
            </Button>
          )}
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

export { DesktopFilters, MobileBar };
