export function MovieCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="aspect-[2/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-10 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-2.5 w-14 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function MovieRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 py-20 app-container">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
