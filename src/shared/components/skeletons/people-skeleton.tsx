export function PersonCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 animate-pulse">
      <div className="size-24 rounded-full bg-gray-200 dark:bg-gray-700 md:size-28" />
      <div className="w-full space-y-2 text-center">
        <div className="mx-auto h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mx-auto h-2.5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function PersonRowSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <PersonCardSkeleton key={i} />
      ))}
    </div>
  );
}
