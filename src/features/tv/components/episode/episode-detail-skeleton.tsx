export function EpisodeDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      <div className="w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] bg-muted" />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="order-2 flex-1 min-w-0 space-y-10 lg:order-1">
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
            <div className="space-y-3">
              <div className="h-6 w-24 rounded bg-muted" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="size-16 rounded-full bg-muted mx-auto" />
                    <div className="h-3 w-16 mx-auto rounded bg-muted" />
                    <div className="h-2.5 w-12 mx-auto rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-32 rounded bg-muted" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-[2/3] rounded-lg bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 w-full space-y-6 lg:order-2 lg:w-80 xl:w-96 lg:flex-shrink-0">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="h-4 w-24 rounded bg-muted" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="h-3 w-16 rounded bg-muted" />
                  <div className="h-3 w-20 rounded bg-muted" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div className="size-5 rounded bg-muted" />
                  <div className="aspect-video w-20 flex-shrink-0 rounded-md bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-12 rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 space-y-4">
          <div className="h-6 w-32 rounded bg-muted" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-video rounded-lg bg-muted" />
                <div className="h-3 w-3/4 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
