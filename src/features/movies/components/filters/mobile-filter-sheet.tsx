"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { GenreDropdown } from "./genre-dropdown"
import { LanguageDropdown } from "./language-dropdown"
import { CountryDropdown } from "./country-dropdown"
import { SortSelect } from "./sort-select"
import { YearSelect } from "./year-select"
import { RatingSelect } from "./rating-select"

function MobileFilterSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="default" className="w-full gap-2">
          <SlidersHorizontal className="size-4" />
          <span className="text-sm">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-fit max-h-[70vh] p-0">
        <SheetHeader className="border-b border-border px-5 py-3.5">
          <SheetTitle className="text-base font-semibold">Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-5 overflow-y-auto px-5 py-5">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Genre</span>
            <GenreDropdown />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Original Language</span>
            <LanguageDropdown />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Release Year</span>
            <YearSelect />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Minimum Rating</span>
            <RatingSelect />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Region / Country</span>
            <CountryDropdown />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Sort By</span>
            <SortSelect />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileFilterSheet }
