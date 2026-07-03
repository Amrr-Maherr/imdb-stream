function SkeletonCard() {
  return (
    <div className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5rem)] lg:w-[calc(20%-0.5rem)] xl:w-[calc(16.666%-0.5rem)] animate-pulse">
      <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 rounded bg-muted" />
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-10 rounded bg-muted" />
          <div className="h-2.5 w-14 rounded bg-muted" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 rounded bg-muted" />
          <div className="size-1.5 rounded-full bg-muted" />
          <div className="h-2 w-12 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function TvShowsListingSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8 animate-pulse">
          <div className="h-9 md:h-10 w-36 rounded bg-muted" />
          <div className="h-4 w-80 rounded bg-muted mt-1.5" />
        </section>

        <div className="hidden md:block w-full mb-6 animate-pulse">
          <div className="flex gap-2">
            <div className="h-10 w-32 rounded-lg bg-muted" />
            <div className="h-10 w-36 rounded-lg bg-muted" />
            <div className="h-10 w-28 rounded-lg bg-muted" />
            <div className="h-10 w-40 rounded-lg bg-muted" />
            <div className="h-10 w-24 rounded-lg bg-muted" />
            <div className="h-10 w-32 rounded-lg bg-muted" />
          </div>
        </div>
        <div className="md:hidden w-full mb-4 animate-pulse">
          <div className="h-10 w-full rounded-lg bg-muted" />
        </div>

        <div className="flex items-center justify-between mb-4 md:mb-5 animate-pulse">
          <div className="h-4 w-44 rounded bg-muted" />
          <div className="h-3 w-32 rounded bg-muted" />
        </div>

        <section>
          <div className="flex flex-wrap justify-between gap-3 md:gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>

        <section className="mt-10 md:mt-12 pb-8 animate-pulse">
          <div className="flex justify-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-muted" />
            <div className="h-10 w-10 rounded-lg bg-muted" />
            <div className="h-10 w-10 rounded-lg bg-muted" />
            <div className="h-10 w-10 rounded-lg bg-muted" />
          </div>
        </section>
      </main>
    </div>
  );
}
