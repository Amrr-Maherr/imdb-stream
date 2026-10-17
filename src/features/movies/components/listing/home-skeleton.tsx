import { HeroBannerSkeleton } from './hero-skeleton';

function SkeletonCard() {
  return (
    <div className="shrink-0 w-[140px] sm:w-[160px] space-y-2 animate-pulse">
      <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
      <div className="space-y-1.5">
        <div className="h-3 w-3/4 rounded bg-muted" />
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-10 rounded bg-muted" />
          <div className="h-2.5 w-14 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

function PersonSkeletonCard() {
  return (
    <div className="shrink-0 w-[140px] sm:w-[160px] space-y-3 animate-pulse">
      <div className="size-24 sm:size-28 rounded-full bg-muted mx-auto" />
      <div className="space-y-1.5 text-center">
        <div className="h-3 w-20 rounded bg-muted mx-auto" />
        <div className="h-2.5 w-32 rounded bg-muted mx-auto" />
      </div>
    </div>
  );
}

export function SectionRowSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-end justify-between">
        <div>
          <div className="h-6 w-44 rounded bg-muted" />
          <div className="h-4 w-64 rounded bg-muted mt-1" />
        </div>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function FeaturedRowSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-44 rounded bg-muted" />
      <div className="flex flex-col gap-6">
        <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] rounded-xl bg-muted" />
        <div className="flex gap-3 md:gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PremiumRowSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-end gap-3">
        <div className="size-8 rounded-full bg-muted" />
        <div>
          <div className="h-6 w-32 rounded bg-muted" />
          <div className="h-4 w-56 rounded bg-muted mt-1" />
        </div>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function BannerSectionSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-muted/30 border border-border/50 animate-pulse">
      <div className="p-4 sm:p-6 pb-0">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="h-6 w-36 rounded bg-muted" />
            <div className="h-4 w-72 rounded bg-muted mt-1" />
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex gap-3 md:gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedBannerGridSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-56 rounded bg-muted" />
        <div className="h-4 w-72 rounded bg-muted mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="col-span-2 aspect-[16/9] rounded-xl bg-muted md:row-span-2 md:aspect-auto md:min-h-[200px]" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[16/9] rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export function GenreGridSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-6 w-40 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[16/9] rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export function EditorialSpotlightSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-6 w-32 rounded bg-muted" />
        <div className="h-4 w-60 rounded bg-muted mt-1" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <div className="h-36 bg-muted sm:h-48 lg:h-52" />
        <div className="px-5 pb-6 sm:px-7 sm:pb-8 lg:px-9 lg:pb-9">
          <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-9">
            <div className="-mt-20 aspect-[2/3] w-[150px] rounded-xl bg-muted ring-4 ring-card sm:-mt-24 sm:w-[180px] lg:-mt-28 lg:w-[220px]" />
            <div className="space-y-4 lg:pt-2">
              <div className="h-8 w-52 rounded bg-muted sm:h-9" />
              <div className="h-4 w-72 rounded bg-muted" />
              <div className="space-y-2 pt-1">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-3 w-full max-w-xl rounded bg-muted" />
                <div className="h-3 w-full max-w-lg rounded bg-muted" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-lg bg-muted" />
                ))}
              </div>
              <div className="h-10 w-40 rounded-lg bg-muted" />
            </div>
          </div>
          <div className="mt-8">
            <div className="mb-3 h-4 w-24 rounded bg-muted" />
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] rounded-lg bg-muted" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PersonRowSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-end justify-between">
        <div>
          <div className="h-6 w-36 rounded bg-muted" />
          <div className="h-4 w-52 rounded bg-muted mt-1" />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <PersonSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="flex flex-col flex-1">
      <HeroBannerSkeleton />
      <div className="w-full app-container py-8 space-y-14">
        <FeaturedRowSkeleton />
        <FeaturedBannerGridSkeleton />
        <PremiumRowSkeleton />
        <BannerSectionSkeleton />
        <EditorialSpotlightSkeleton />
        <SectionRowSkeleton />
        <SectionRowSkeleton />
        <SectionRowSkeleton />
        <SectionRowSkeleton />
        <SectionRowSkeleton />
        <BannerSectionSkeleton />
        <PremiumRowSkeleton />
        <GenreGridSkeleton />
        <PersonRowSkeleton />
      </div>
    </div>
  );
}
