export function MovieDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      {/* Hero skeleton */}
      <div className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] bg-gray-200 dark:bg-gray-700" />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16 space-y-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            {/* Poster + Overview skeleton */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-full max-w-[200px] mx-auto sm:mx-0">
                <div className="aspect-[2/3] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="flex-1 min-w-0 space-y-3">
                <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex gap-6 mt-4">
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>

            {/* Sections skeleton */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="shrink-0 w-[140px] space-y-2">
                      <div className="aspect-[2/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-3/4 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-2.5 w-1/2 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar skeleton */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
