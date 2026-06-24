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
  )
}

export { MoviesFiltersLoading }
