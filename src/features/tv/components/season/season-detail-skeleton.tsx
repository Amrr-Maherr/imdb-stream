export function SeasonDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background animate-pulse">
      <div className="w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] bg-gray-200 dark:bg-gray-700" />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-6">
            <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <div className="w-[140px] sm:w-[180px] aspect-video rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="size-14 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-12 mx-auto rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
