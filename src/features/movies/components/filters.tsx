"use client";

import {
  Search,
  X,
  Filter,
  ChevronDown,
  Star,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Film,
  Tv,
  Hash,
} from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/utils/utils";

/* --- Mock data ------------------------------------------ */

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Romance",
  "Fantasy",
];

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity", icon: Sparkles },
  { value: "rating", label: "Rating", icon: Star },
  { value: "releaseDate", label: "Release Date", icon: ChevronDown },
  { value: "title", label: "Title", icon: Hash },
];

const CONTENT_TYPES = [
  { value: "movie", label: "Movie", icon: Film },
  { value: "tv", label: "TV Show", icon: Tv },
] as const;

const CONTENT_TYPE_ICONS: Record<string, typeof Film> = {
  movie: Film,
  tv: Tv,
};

/* --- Mock active filters (UI display only) -------------- */

const MOCK_GENRES = ["Action", "Sci-Fi"];
const MOCK_SORT = "Popularity";
const MOCK_MIN_RATING = 7;
const MOCK_CONTENT_TYPE = "movie";
const MOCK_ACTIVE_COUNT = 3;

/* --- Sub-components ------------------------------------- */

function GenreDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="size-3.5" />
          Genre
          <span className="flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
            {MOCK_GENRES.length}
          </span>
          <ChevronDown className="size-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Genre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {GENRES.map((genre) => (
          <DropdownMenuCheckboxItem
            key={genre}
            checked={MOCK_GENRES.includes(genre)}
          >
            {genre}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortSelect() {
  const active = SORT_OPTIONS.find((o) => o.label === MOCK_SORT)!;
  const Icon = active.icon;
  return (
    <Select defaultValue="popularity">
      <SelectTrigger className="h-8 w-36 text-xs">
        <Icon className="size-3.5 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => {
          const OptIcon = opt.icon;
          return (
            <SelectItem key={opt.value} value={opt.value}>
              <OptIcon className="size-3.5" />
              {opt.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

function RatingFilter() {
  return (
    <div className="flex items-center gap-1.5">
      <Star className="size-3.5 text-amber-500" />
      <Input
        defaultValue={MOCK_MIN_RATING}
        className="h-8 w-14 text-xs"
        type="number"
        min={0}
        max={10}
        step={0.5}
        aria-label="Minimum rating"
        placeholder="0"
      />
      <span className="text-xs text-muted-foreground">+</span>
    </div>
  );
}

function ContentTypeGroup() {
  return (
    <div
      className="flex items-center rounded-lg border border-border bg-background p-0.5"
      role="group"
      aria-label="Content type"
    >
      {CONTENT_TYPES.map((type) => {
        const Icon = type.icon;
        const isActive = type.value === MOCK_CONTENT_TYPE;
        return (
          <button
            key={type.value}
            type="button"
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              isActive
                ? "bg-brand text-brand-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3" />
            <span className="hidden sm:inline">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ActiveFilterBadges() {
  const badges = [
    { label: "Action", variant: "brand" as const, onRemove: undefined },
    { label: "Sci-Fi", variant: "brand" as const, onRemove: undefined },
    { label: "7+ Rating", variant: "secondary" as const, onRemove: undefined },
    { label: "Movie", variant: "secondary" as const, onRemove: undefined },
  ];

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">Active:</span>
      {badges.map((badge) => (
        <Badge key={badge.label} variant={badge.variant} className="gap-1 pe-1">
          {badge.label}
          <button
            type="button"
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
            aria-label={`Remove ${badge.label} filter`}
          >
            <X className="size-2.5" />
          </button>
        </Badge>
      ))}
    </div>
  );
}

function SearchInput() {
  return (
    <div className="relative min-w-0 flex-1 max-w-80">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        defaultValue=""
        placeholder="Search movies..."
        className="h-8 pl-8 pr-8 text-xs"
        aria-label="Search movies"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Clear search"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

/* --- Main component ------------------------------------- */

function MoviesFilters() {
  return (
    <div className="space-y-4 w-full" data-slot="movies-filters">
      {/* -- Desktop / Tablet --------------------------------- */}
      <div className="hidden md:block">
        <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="app-container py-3">
            <div className="space-y-3">
              {/* First row — primary filters */}
              <div className="flex flex-wrap items-center gap-2">
                <SearchInput />

                <Separator
                  orientation="vertical"
                  className="hidden h-6 lg:block"
                />

                <GenreDropdown />

                <Separator
                  orientation="vertical"
                  className="hidden h-6 lg:block"
                />

                <SortSelect />

                <Separator
                  orientation="vertical"
                  className="hidden h-6 lg:block"
                />

                <RatingFilter />

                <Separator
                  orientation="vertical"
                  className="hidden h-6 lg:block"
                />

                <ContentTypeGroup />
              </div>

              {/* Second row — actions */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="ms-auto flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs text-muted-foreground"
                  >
                    <RotateCcw className="size-3" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Active filter badges */}
              <ActiveFilterBadges />
            </div>
          </div>
        </div>
      </div>

      {/* -- Mobile ------------------------------------------ */}
      <div className="md:hidden">
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

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-2 shrink-0"
                  >
                    <SlidersHorizontal className="size-4" />
                    <span className="text-sm">Filters</span>
                    <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                      {MOCK_ACTIVE_COUNT}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="h-[80dvh] max-h-[35rem] p-0"
                >
                  <SheetHeader className="border-b border-border px-4 py-3">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-base">Filters</SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="overflow-y-auto px-4 py-4 space-y-6">
                    {/* Search */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Search
                      </Label>
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          defaultValue=""
                          placeholder="Search movies..."
                          className="pl-10"
                          aria-label="Search movies"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Genre */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Genre
                      </Label>
                      <div className="flex flex-wrap gap-1.5">
                        {GENRES.map((genre) => {
                          const active = MOCK_GENRES.includes(genre);
                          return (
                            <button
                              key={genre}
                              type="button"
                              className={cn(
                                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                                active
                                  ? "bg-brand text-brand-foreground"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                              )}
                            >
                              {genre}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <Separator />

                    {/* Sort By */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Sort By
                      </Label>
                      <Select defaultValue="popularity">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SORT_OPTIONS.map((opt) => {
                            const OptIcon = opt.icon;
                            return (
                              <SelectItem key={opt.value} value={opt.value}>
                                <OptIcon className="size-3.5" />
                                {opt.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Rating */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Minimum Rating
                      </Label>
                      <div className="flex items-center gap-3">
                        <Star className="size-5 text-amber-500 shrink-0" />
                        <Input
                          defaultValue={MOCK_MIN_RATING}
                          type="number"
                          min={0}
                          max={10}
                          step={0.5}
                          className="w-20"
                        />
                        <span className="text-xs text-muted-foreground">
                          or higher
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Content Type */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Content Type
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {CONTENT_TYPES.map((type) => {
                          const Icon = CONTENT_TYPE_ICONS[type.value];
                          const isActive = type.value === MOCK_CONTENT_TYPE;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              className={cn(
                                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                  ? "border-brand bg-brand/10 text-brand"
                                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                              )}
                            >
                              <Icon className="size-4" />
                              {type.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <Separator />

                    {/* Active filter badges */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Active Filters
                      </Label>
                      <ActiveFilterBadges />
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="sticky bottom-0 border-t border-border bg-background px-4 py-3">
                    <Button variant="outline" className="w-full gap-2">
                      <RotateCcw className="size-4" />
                      Reset
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Skeleton ------------------------------------------- */

function MoviesFiltersSkeleton() {
  return (
    <div
      data-slot="movies-filters-skeleton"
      className="animate-pulse space-y-4"
    >
      <div className="hidden md:block">
        <div className="border-b border-border">
          <div className="app-container py-3">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-80 rounded-lg bg-muted" />
                <div className="hidden h-6 w-px lg:block bg-border" />
                <div className="h-8 w-24 rounded-lg bg-muted" />
                <div className="hidden h-6 w-px lg:block bg-border" />
                <div className="h-8 w-36 rounded-lg bg-muted" />
                <div className="hidden h-6 w-px lg:block bg-border" />
                <div className="h-8 w-24 rounded-lg bg-muted" />
                <div className="hidden h-6 w-px lg:block bg-border" />
                <div className="h-8 w-32 rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="border-b border-border">
          <div className="app-container py-2">
            <div className="flex items-center gap-2">
              <div className="h-9 flex-1 rounded-lg bg-muted" />
              <div className="h-9 w-28 rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Empty state ---------------------------------------- */

function MoviesFiltersEmpty() {
  return (
    <div data-slot="movies-filters-empty" className="border-b border-border">
      <div className="app-container py-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <SlidersHorizontal className="size-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              No filters available
            </p>
            <p className="text-xs text-muted-foreground">
              Filter options could not be loaded. Try refreshing the page.
            </p>
          </div>
          <Button variant="outline" size="sm" className="mt-1 gap-1.5">
            <RotateCcw className="size-3.5" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}

/* --- Loading state -------------------------------------- */

function MoviesFiltersLoading() {
  return (
    <div data-slot="movies-filters-loading" className="border-b border-border">
      <div className="app-container py-4">
        <div className="flex items-center justify-center gap-3">
          <div className="flex size-5 items-center justify-center">
            <div className="size-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
          <p className="text-sm text-muted-foreground">Loading filters…</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Exports ───────────────────────────────────────────── */

export {
  MoviesFilters,
  MoviesFiltersSkeleton,
  MoviesFiltersEmpty,
  MoviesFiltersLoading,
};
