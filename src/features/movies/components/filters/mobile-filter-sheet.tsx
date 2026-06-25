"use client"

import {
  Search,
  Star,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Film,
  Compass,
  Gauge,
  Settings2,
} from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { cn } from "@/shared/utils/utils"
import {
  GENRES,
  LANGUAGES,
  COUNTRIES,
  SORT_OPTIONS,
  CONTENT_TYPES,
  CONTENT_TYPE_ICONS,
  MOCK_GENRES,
  MOCK_LANGUAGE,
  MOCK_COUNTRY,
  MOCK_YEAR_FROM,
  MOCK_YEAR_TO,
  MOCK_MIN_RATING,
  MOCK_RUNTIME_MIN,
  MOCK_RUNTIME_MAX,
  MOCK_CONTENT_TYPE,
  MOCK_ACTIVE_COUNT,
  LANGUAGE_ICONS,
} from "./constants"
import { ActiveFilterBadges } from "./active-filter-badges"

/* ─── Section header pattern ────────────────────────────── */

function SectionHeader({ icon: Icon, title }: { icon: typeof Film; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-6 items-center justify-center rounded-md bg-brand/10">
        <Icon className="size-3.5 text-brand" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">
        {title}
      </span>
      <div className="ml-auto h-px flex-1 bg-border/60" />
    </div>
  )
}

/* ─── Section components ────────────────────────────────── */

function ContentSection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={Film} title="Content" />
      <div className="space-y-3 pl-0">
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Genre</span>
          <div className="flex flex-wrap gap-1.5">
            {GENRES.map((genre) => {
              const active = MOCK_GENRES.includes(genre)
              return (
                <button
                  key={genre}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-brand text-brand-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {genre}
                </button>
              )
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Content Type</span>
          <div className="grid grid-cols-2 gap-2">
            {CONTENT_TYPES.map((type) => {
              const Icon = CONTENT_TYPE_ICONS[type.value]
              const isActive = type.value === MOCK_CONTENT_TYPE
              return (
                <button
                  key={type.value}
                  type="button"
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {type.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Language</span>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((lang) => {
              const active = lang === MOCK_LANGUAGE
              return (
                <button
                  key={lang}
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-brand text-brand-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  <span className="flex size-4 items-center justify-center rounded-[2px] border border-current/20 bg-background/50 text-[8px] font-bold">
                    {LANGUAGE_ICONS[lang]}
                  </span>
                  {lang}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscoverySection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={Compass} title="Discovery" />
      <div className="space-y-3">
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Search</span>
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
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Sort By</span>
          <Select defaultValue="popularity">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => {
                const OptIcon = opt.icon
                return (
                  <SelectItem key={opt.value} value={opt.value}>
                    <OptIcon className="size-3.5" />
                    {opt.label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Country</span>
          <div className="flex flex-wrap gap-1.5">
            {COUNTRIES.map((country) => {
              const active = country === MOCK_COUNTRY
              return (
                <button
                  key={country}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-brand text-brand-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {country}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function RatingsSection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={Gauge} title="Ratings" />
      <div className="space-y-3">
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Minimum Rating</span>
          <div className="flex items-center gap-3">
            <Star className="size-5 shrink-0 text-amber-500" />
            <Input
              defaultValue={MOCK_MIN_RATING}
              type="number"
              min={0}
              max={10}
              step={0.5}
              className="w-20"
            />
            <span className="text-xs text-muted-foreground">or higher</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Release Year</span>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground/60">From</span>
              <Input
                defaultValue={MOCK_YEAR_FROM}
                type="number"
                min={1900}
                max={2030}
                placeholder="e.g. 2020"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground/60">To</span>
              <Input
                defaultValue={MOCK_YEAR_TO}
                type="number"
                min={1900}
                max={2030}
                placeholder="e.g. 2024"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdvancedSection() {
  return (
    <div className="space-y-3">
      <SectionHeader icon={Settings2} title="Advanced" />
      <div className="space-y-3">
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground/70">Runtime</span>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground/60">Min (min)</span>
              <Input
                defaultValue={MOCK_RUNTIME_MIN}
                type="number"
                min={0}
                max={500}
                placeholder="e.g. 90"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground/60">Max (min)</span>
              <Input
                defaultValue={MOCK_RUNTIME_MAX}
                type="number"
                min={0}
                max={500}
                placeholder="e.g. 180"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main sheet component ──────────────────────────────── */

function MobileFilterSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="default" className="gap-2 shrink-0">
          <SlidersHorizontal className="size-4" />
          <span className="text-sm">Filters</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
            {MOCK_ACTIVE_COUNT}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90dvh] max-h-[44rem] p-0">
        <SheetHeader className="border-b border-border px-5 py-3.5">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base font-semibold">Filters</SheetTitle>
            <SheetDescription className="sr-only">
              Adjust filters to refine your movie browsing experience
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="overflow-y-auto px-5 py-5 space-y-7">
          <ContentSection />
          <DiscoverySection />
          <RatingsSection />
          <AdvancedSection />

          {/* Active badges */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
              Active Filters
            </span>
            <ActiveFilterBadges />
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-border bg-background px-5 py-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex-1 gap-2 text-sm">
              <RotateCcw className="size-4" />
              Reset
            </Button>
            <Button
              variant="default"
              className="flex-1 gap-2 bg-brand text-brand-foreground shadow-sm hover:brightness-110"
            >
              <Sparkles className="size-4" />
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileFilterSheet }
