function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 rounded bg-muted" />
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-10 rounded bg-muted" />
          <div className="h-2.5 w-14 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function KeywordSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8 animate-pulse">
          <div className="h-9 md:h-10 w-48 rounded bg-muted" />
        </section>

        <div className="flex items-center justify-between mb-4 md:mb-5 animate-pulse">
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-3 w-24 rounded bg-muted" />
        </div>

        <section>
          <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
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
