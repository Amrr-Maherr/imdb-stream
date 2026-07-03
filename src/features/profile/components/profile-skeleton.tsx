export function ProfileSkeleton() {
  return (
    <div className="app-container pt-20 pb-12 animate-pulse">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="size-24 rounded-full bg-muted sm:size-28 shrink-0" />
        <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-1 w-full max-w-2xl">
          <div className="h-7 sm:h-8 w-48 rounded bg-muted" />
          <div className="h-4 w-36 rounded bg-muted" />
          <div className="h-4 w-56 rounded bg-muted" />
          <div className="flex gap-2 mt-1">
            <div className="h-6 w-28 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-2">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="h-4 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>

      <section className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-5 rounded bg-muted" />
          <div className="h-5 w-40 rounded bg-muted" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5">
              <div className="size-10 rounded-full bg-muted shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-3 w-36 rounded bg-muted" />
              </div>
              <div className="h-5 w-16 rounded-full bg-muted shrink-0" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-5 rounded bg-muted" />
          <div className="h-5 w-36 rounded bg-muted" />
        </div>
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
