"use client"

import { Search, RotateCcw, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "./search-input"
import { GenreDropdown } from "./genre-dropdown"
import { LanguageDropdown } from "./language-dropdown"
import { CountryDropdown } from "./country-dropdown"
import { SortSelect } from "./sort-select"
import { YearRange } from "./year-range"
import { RuntimeRange } from "./runtime-range"
import { RatingInput } from "./rating-input"
import { ContentTypeGroup } from "./content-type-group"
import { ActiveFilterBadges } from "./active-filter-badges"
import { MobileFilterSheet } from "./mobile-filter-sheet"
import { MOCK_ACTIVE_COUNT } from "./constants"

/* ─── Desktop / Tablet ──────────────────────────────────── */

function DesktopFilters() {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="app-container py-4">
        <div className="space-y-4">
          {/* ── Primary row ──────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-3 max-lg:justify-start lg:grid lg:grid-cols-[1fr_auto_auto_auto] lg:gap-3">
            <SearchInput />

            <Separator orientation="vertical" className="h-6 max-lg:hidden" />

            <GenreDropdown />

            <Separator orientation="vertical" className="h-6 max-lg:hidden" />

            <SortSelect />

            <Separator orientation="vertical" className="h-6 max-lg:hidden" />

            <ContentTypeGroup />
          </div>

          {/* ── Secondary row ────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-lg:justify-start lg:grid lg:grid-cols-[auto_auto_minmax(13rem,1fr)_auto_auto] lg:gap-x-4 lg:items-center">
            <LanguageDropdown />
            <CountryDropdown />

            <Separator orientation="vertical" className="h-5 max-lg:hidden" />

            <div className="flex items-center gap-2 max-lg:w-full max-lg:justify-between">
              <span className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider shrink-0">
                Year
              </span>
              <YearRange />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider shrink-0">
                Rating
              </span>
              <RatingInput />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider shrink-0">
                Runtime
              </span>
              <RuntimeRange />
            </div>
          </div>

          {/* ── Actions row ──────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <ActiveFilterBadges />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs text-muted-foreground/70 hover:text-foreground"
              >
                <RotateCcw className="size-3" />
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                className="gap-1.5 text-xs bg-brand text-brand-foreground shadow-sm hover:brightness-110 hover:shadow-md"
              >
                <Sparkles className="size-3" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Mobile ────────────────────────────────────────────── */

function MobileBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="app-container py-2">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue=""
              placeholder="Search movies..."
              className="h-9 pl-8 text-sm"
              aria-label="Search movies"
            />
          </div>
          <MobileFilterSheet />
        </div>
      </div>
    </div>
  )
}

/* ─── Main export ───────────────────────────────────────── */

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
  )
}

export { MoviesFilters }
