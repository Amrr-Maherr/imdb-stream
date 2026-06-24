function MoviesFiltersSkeleton() {
  return (
    <div data-slot="movies-filters-skeleton" className="animate-pulse space-y-4">
      <div className="hidden md:block">
        <div className="border-b border-border">
          <div className="app-container py-3">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-80 rounded-lg bg-muted" />
                <div className="hidden h-6 w-px lg:block bg-border" />
                <div className="h-8 w-24 rounded-lg bg-muted" />
                <div className="h-8 w-28 rounded-lg bg-muted" />
                <div className="h-8 w-28 rounded-lg bg-muted" />
                <div className="hidden h-6 w-px lg:block bg-border" />
                <div className="h-8 w-32 rounded-lg bg-muted" />
                <div className="hidden h-6 w-px lg:block bg-border" />
                <div className="h-8 w-52 rounded-lg bg-muted" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-40 rounded-lg bg-muted" />
                <div className="h-6 w-px bg-border" />
                <div className="h-8 w-24 rounded-lg bg-muted" />
                <div className="h-6 w-px bg-border" />
                <div className="h-8 w-32 rounded-lg bg-muted" />
                <div className="ms-auto flex items-center gap-2">
                  <div className="h-7 w-20 rounded-lg bg-muted" />
                  <div className="h-7 w-28 rounded-lg bg-muted" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <div className="h-5 w-16 rounded-full bg-muted" />
                <div className="h-5 w-14 rounded-full bg-muted" />
                <div className="h-5 w-16 rounded-full bg-muted" />
                <div className="h-5 w-20 rounded-full bg-muted" />
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
  )
}

export { MoviesFiltersSkeleton }
