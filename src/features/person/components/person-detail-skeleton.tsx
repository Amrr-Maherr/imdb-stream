export function PersonDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      <section className="bg-card border-b border-border">
        <div className="w-full mx-auto app-container py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-[180px] sm:w-[220px] aspect-[2/3] rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <div className="h-8 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="flex gap-3">
                <div className="h-9 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="h-9 w-20 rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-2">
                    <div className="h-4 w-4 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-6 w-8 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-12 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>

            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="shrink-0 w-[140px] space-y-2">
                      <div className="aspect-[2/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
