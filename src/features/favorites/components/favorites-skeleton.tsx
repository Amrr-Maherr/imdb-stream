export function FavoritesSkeleton() {
  return (
    <div className="app-container py-25 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-32 rounded bg-muted" />
        <div className="h-9 w-28 rounded-lg bg-muted" />
      </div>
      <div className="flex flex-wrap justify-start gap-3 md:gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5rem)] lg:w-[calc(20%-0.5rem)] xl:w-[calc(16.666%-0.5rem)]">
            <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
            <div className="mt-3 space-y-2">
              <div className="h-3 w-3/4 rounded bg-muted" />
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-10 rounded bg-muted" />
                <div className="h-2.5 w-14 rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
