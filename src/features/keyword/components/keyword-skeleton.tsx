import { PageHeaderSkeleton } from '@/shared/components/page-header';

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
    <div className="flex flex-1 flex-col bg-background">
      <PageHeaderSkeleton />
      <main className="app-container flex flex-1 flex-col py-6 md:py-10">
        <section className="rounded-3xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.025] p-4 shadow-sm sm:p-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 md:gap-y-8 xl:grid-cols-5">
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
