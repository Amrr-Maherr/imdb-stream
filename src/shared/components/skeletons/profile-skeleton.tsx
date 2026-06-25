"use client";

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="app-container py-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="rounded-full bg-muted h-24 w-24 sm:h-28 sm:w-28" />

          <div className="w-full max-w-2xl space-y-3">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-1/3" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="h-20 rounded-xl bg-muted" />
          <div className="h-20 rounded-xl bg-muted" />
          <div className="h-20 rounded-xl bg-muted" />
          <div className="h-20 rounded-xl bg-muted" />
        </div>

        <div className="mt-12 space-y-3">
          <div className="h-6 bg-muted rounded w-44" />
          <div className="h-40 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
