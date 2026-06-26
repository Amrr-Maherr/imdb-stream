import { FadeIn } from "@/features/movies/components/detail/fade-in";

export default function ListLoading() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* Hero skeleton */}
      <section className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-10 md:pb-16">
          <div className="w-full mx-auto app-container">
            <div className="flex items-end gap-6">
              <div className="relative w-[130px] sm:w-[160px] aspect-[2/3] flex-shrink-0 rounded-xl overflow-hidden bg-muted/50 animate-pulse hidden sm:block" />
              <div className="min-w-0 flex-1 space-y-4">
                <div className="h-8 w-64 rounded bg-muted/50 animate-pulse" />
                <div className="h-4 w-96 rounded bg-muted/50 animate-pulse" />
                <div className="h-3 w-48 rounded bg-muted/50 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            <FadeIn>
              <div className="h-6 w-24 rounded bg-muted/50 animate-pulse" />
              <div className="space-y-2 mt-4">
                <div className="h-3 w-full rounded bg-muted/50 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-muted/50 animate-pulse" />
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="h-6 w-48 rounded bg-muted/50 animate-pulse mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-[2/3] w-full rounded-lg bg-muted/50 animate-pulse" />
                    <div className="h-3 w-3/4 rounded bg-muted/50 animate-pulse" />
                    <div className="h-2 w-1/2 rounded bg-muted/50 animate-pulse" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8">
            <FadeIn delay={0.05}>
              <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                <div className="h-4 w-24 rounded bg-muted/50 animate-pulse" />
                <div className="h-3 w-32 rounded bg-muted/50 animate-pulse" />
                <div className="h-3 w-28 rounded bg-muted/50 animate-pulse" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
