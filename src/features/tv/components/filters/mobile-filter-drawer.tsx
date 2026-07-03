"use client"

import { RotateCcw, SlidersHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/shared/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer"
import { GenreDropdown } from "./genre-dropdown"
import { LanguageDropdown } from "./language-dropdown"
import { CountryDropdown } from "./country-dropdown"
import { SortSelect } from "./sort-select"
import { YearSelect } from "./year-select"
import { RatingSelect } from "./rating-select"
import { AdultToggle } from "./adult-toggle"
import { useResetFilters } from "@/shared/hooks/useResetFilters"

function MobileFilterDrawer() {
  const t = useTranslations("Filters")
  const { hasFilters, handleReset } = useResetFilters()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="default" className="w-full gap-2">
          <SlidersHorizontal className="size-4" />
          <span className="text-sm">{t("filters")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-fit max-h-[70vh] p-0">
        <DrawerHeader className="border-b border-border px-5 py-3.5">
          <DrawerTitle className="text-base font-semibold">{t("filters")}</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-5 overflow-y-auto px-5 py-5">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{t("genre")}</span>
            <GenreDropdown />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{t("originalLanguage")}</span>
            <LanguageDropdown />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{t("releaseYear")}</span>
            <YearSelect />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{t("minimumRating")}</span>
            <RatingSelect />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{t("regionCountry")}</span>
            <CountryDropdown />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{t("sortBy")}</span>
            <SortSelect />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{t("adultContent")}</span>
            <AdultToggle />
          </div>
          {hasFilters && (
            <Button
              variant="outline"
              size="default"
              onClick={handleReset}
              className="w-full gap-2"
            >
              <RotateCcw className="size-4" />
              {t("resetFilters")}
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { MobileFilterDrawer }
