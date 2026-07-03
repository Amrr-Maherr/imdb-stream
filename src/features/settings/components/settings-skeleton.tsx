export function SettingsSkeleton() {
  return (
    <div className="app-container pt-16 py-8 sm:py-20 animate-pulse">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <nav className="lg:w-56 shrink-0">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-5 rounded bg-muted" />
            <div className="h-6 w-24 rounded bg-muted" />
          </div>
          <div className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 pb-2 lg:pb-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                <div className="size-4 rounded bg-muted" />
                <div className="h-4 w-24 rounded bg-muted" />
              </div>
            ))}
          </div>
        </nav>
        <div className="flex-1 min-w-0 space-y-8">
          <div className="space-y-4">
            <div className="h-6 w-32 rounded bg-muted" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="h-10 w-full rounded-lg bg-muted" />
                </div>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-border" />
          <div className="space-y-4">
            <div className="h-6 w-36 rounded bg-muted" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div className="space-y-1">
                    <div className="h-4 w-28 rounded bg-muted" />
                    <div className="h-3 w-40 rounded bg-muted" />
                  </div>
                  <div className="h-6 w-11 rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
