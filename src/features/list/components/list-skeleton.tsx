export function ListSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      <section className="relative isolate overflow-hidden border-b border-brand/15 bg-gradient-to-b from-brand/[0.05] to-background pt-20 md:pt-24">
        <div className="app-container py-5 md:py-7">
          <div className="flex items-center gap-4 rounded-3xl border border-brand/15 bg-gradient-to-br from-card via-card to-brand/[0.06] p-5 shadow-xl shadow-black/[0.04] sm:p-7 md:p-9">
            <div className="hidden size-20 shrink-0 rounded-2xl bg-brand/10 sm:block md:size-24" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-6 w-20 rounded-full bg-muted" />
              <div className="h-8 w-72 max-w-full rounded-lg bg-muted sm:h-9 lg:h-10" />
              <div className="h-4 w-96 max-w-full rounded bg-muted" />
              <div className="flex gap-2">
                <div className="h-7 w-28 rounded-full bg-muted" />
                <div className="h-7 w-20 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            <div className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.035] p-5 shadow-sm sm:p-6 space-y-4">
              <div className="h-6 w-20 rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </div>

            <div className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.025] p-4 shadow-sm sm:p-6 space-y-4">
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
            <div className="rounded-2xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.035] p-5 shadow-sm space-y-4">
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

            <div className="rounded-2xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.035] p-5 shadow-sm space-y-3">
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
