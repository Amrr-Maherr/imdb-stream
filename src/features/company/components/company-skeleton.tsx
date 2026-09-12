export function CompanySkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      <section className="bg-card border-b border-border">
        <div className="app-container py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0 w-full max-w-[280px]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted" />
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <div className="h-9 sm:h-10 w-1/2 rounded bg-muted" />
              <div className="flex gap-2">
                <div className="h-7 w-24 rounded-full bg-muted" />
                <div className="h-7 w-36 rounded-full bg-muted" />
                <div className="h-7 w-32 rounded-full bg-muted" />
              </div>
              <div className="h-9 w-24 rounded-lg bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16 space-y-10">
        <section className="space-y-6">
          <div className="h-6 w-28 rounded bg-muted" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
              >
                <div className="size-5 rounded bg-muted mt-0.5 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-4 w-32 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="h-6 w-36 rounded bg-muted" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0 w-[140px] sm:w-[160px] space-y-2">
                <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-2.5 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="h-6 w-20 rounded bg-muted" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-card border border-border" />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="h-6 w-36 rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-10 w-36 rounded-lg bg-muted" />
            <div className="h-10 w-28 rounded-lg bg-muted" />
            <div className="h-10 w-32 rounded-lg bg-muted" />
          </div>
        </section>
      </div>
    </div>
  );
}
