export function PersonDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      <section className="bg-card border-b border-border">
        <div className="w-full mx-auto app-container py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-[180px] sm:w-[220px] aspect-[2/3] rounded-xl bg-muted" />
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <div className="h-8 w-1/3 rounded bg-muted" />
              <div className="h-4 w-1/4 rounded bg-muted" />
              <div className="flex gap-3">
                <div className="h-9 w-24 rounded-lg bg-muted" />
                <div className="h-9 w-20 rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-muted" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-2">
                    <div className="h-4 w-4 mx-auto rounded bg-muted" />
                    <div className="h-6 w-8 mx-auto rounded bg-muted" />
                    <div className="h-3 w-12 mx-auto rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-6 w-32 rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-4/6 rounded bg-muted" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-6 w-36 rounded bg-muted" />
              <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="shrink-0 w-[140px] space-y-2">
                    <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-6 w-32 rounded bg-muted" />
              <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="shrink-0 w-[140px] space-y-2">
                    <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-6 w-40 rounded bg-muted" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-12 w-full rounded-lg bg-muted" />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-3/4 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
