export function PeopleListingSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background pt-16">
      <main className="app-container flex flex-1 flex-col py-8 md:py-12">
        <section className="mb-6 md:mb-8 animate-pulse">
          <div className="h-9 md:h-10 w-28 rounded bg-muted" />
          <div className="h-4 w-64 rounded bg-muted mt-1.5" />
        </section>

        <div className="flex items-center justify-between mb-4 md:mb-5 animate-pulse">
          <div className="h-4 w-36 rounded bg-muted" />
          <div className="h-3 w-28 rounded bg-muted" />
        </div>

        <section>
          <div className="grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 md:gap-6">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-3 animate-pulse">
                <div className="size-24 rounded-full bg-muted md:size-28" />
                <div className="w-full space-y-2 text-center">
                  <div className="mx-auto h-3 w-20 rounded bg-muted" />
                  <div className="mx-auto h-2.5 w-32 rounded bg-muted" />
                </div>
              </div>
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
