import { SlidersHorizontal, RotateCcw } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

function MoviesFiltersEmpty() {
  return (
    <div data-slot="movies-filters-empty" className="border-b border-border">
      <div className="app-container py-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <SlidersHorizontal className="size-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">No filters available</p>
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
  )
}

export { MoviesFiltersEmpty }
