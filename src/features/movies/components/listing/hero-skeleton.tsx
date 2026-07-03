export function HeroBannerSkeleton() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-muted animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      <div className="relative h-full mx-auto app-container">
        <div className="flex h-full flex-col justify-center items-start py-10 max-w-2xl">
          <div className="space-y-4 w-full">
            <div className="h-12 sm:h-14 lg:h-16 w-3/4 rounded bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="h-5 w-16 rounded bg-white/10" />
              <div className="h-5 w-24 rounded bg-white/10" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full max-w-xl rounded bg-white/10" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/10" />
            </div>
            <div className="flex gap-3 pt-2">
              <div className="h-12 w-28 rounded-lg bg-white/20" />
              <div className="h-12 w-32 rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
