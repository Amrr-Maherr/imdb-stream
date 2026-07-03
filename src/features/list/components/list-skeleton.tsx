export function ListSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      <section className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-10 md:pb-16">
          <div className="w-full mx-auto app-container">
            <div className="flex items-end gap-6">
              <div className="w-[130px] sm:w-[160px] aspect-[2/3] rounded-xl bg-white/10 hidden sm:flex items-center justify-center" />
              <div className="min-w-0 space-y-3">
                <div className="h-4 w-16 rounded bg-white/10" />
                <div className="h-8 sm:h-9 lg:h-10 w-72 rounded bg-white/10" />
                <div className="h-4 w-96 rounded bg-white/10" />
                <div className="flex gap-3">
                  <div className="h-4 w-24 rounded bg-white/10" />
                  <div className="h-4 w-20 rounded bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            <div className="space-y-4">
              <div className="h-6 w-20 rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <div className="h-6 w-24 rounded bg-muted" />
                <div className="h-4 w-10 rounded bg-muted" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                    <div className="h-2.5 w-1/2 rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-4 rounded bg-muted" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 w-12 rounded bg-muted" />
                    <div className="h-4 w-8 rounded bg-muted" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-4 rounded bg-muted" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 w-16 rounded bg-muted" />
                    <div className="h-4 w-20 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="h-4 w-16 rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
