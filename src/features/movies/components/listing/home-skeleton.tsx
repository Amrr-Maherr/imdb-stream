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
    <div className="rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.065] via-card to-card p-4 shadow-lg shadow-black/[0.035] sm:p-6">
      <div className="animate-pulse space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="h-6 w-44 rounded bg-muted" />
            <div className="mt-1 h-4 w-64 rounded bg-muted" />
          </div>
        </div>
        <div className="flex gap-3 overflow-hidden md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedRowSkeleton() {
  return (
    <div className="rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.065] via-card to-card p-4 shadow-lg shadow-black/[0.035] sm:p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-44 rounded bg-muted" />
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[2/1] w-full rounded-2xl bg-muted sm:aspect-[3/1]" />
          <div className="flex gap-3 overflow-hidden md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PremiumRowSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/[0.08] via-card to-card p-4 shadow-xl shadow-black/[0.05] sm:p-6">
      <div className="animate-pulse space-y-4">
        <div className="flex items-end gap-3">
          <div className="size-10 rounded-xl bg-muted" />
          <div>
            <div className="h-6 w-32 rounded bg-muted" />
            <div className="mt-1 h-4 w-56 rounded bg-muted" />
          </div>
        </div>
        <div className="flex gap-3 overflow-hidden md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function RankedRowSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/[0.09] via-card to-card p-4 shadow-xl shadow-black/[0.05] sm:p-6">
      <div className="animate-pulse space-y-5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded bg-muted" />
            <div className="h-4 w-56 rounded bg-muted" />
          </div>
        </div>
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex w-[140px] shrink-0 items-end sm:w-[180px]">
              <div className="h-28 min-w-0 flex-1 rounded bg-muted md:h-36" />
              <div className="aspect-[2/3] w-[64%] shrink-0 rounded-xl bg-muted shadow-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BannerSectionSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/[0.09] via-card to-card p-4 shadow-lg shadow-black/[0.035] sm:p-6 lg:p-8">
      <div className="animate-pulse space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="h-6 w-36 rounded bg-muted" />
            <div className="mt-1 h-4 w-72 rounded bg-muted" />
          </div>
        </div>
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
    <div className="rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.065] via-card to-card p-4 shadow-lg shadow-black/[0.035] sm:p-6">
      <div className="animate-pulse space-y-4">
        <div>
          <div className="h-7 w-56 rounded bg-muted" />
          <div className="mt-1 h-4 w-72 rounded bg-muted" />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="col-span-2 aspect-[16/9] rounded-2xl bg-muted md:row-span-2 md:aspect-auto md:min-h-[200px]" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[16/9] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GenreGridSkeleton() {
  return (
    <div className="rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.065] via-card to-card p-4 shadow-lg shadow-black/[0.035] sm:p-6">
      <div className="animate-pulse space-y-4">
        <div>
          <div className="h-6 w-40 rounded bg-muted" />
          <div className="mt-1 h-4 w-64 rounded bg-muted" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[16/9] rounded-2xl bg-muted" />
          ))}
        </div>
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
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/[0.04]">
        <div className="h-44 bg-muted sm:h-56 lg:h-64" />
        <div className="px-5 pb-6 sm:px-7 sm:pb-8 lg:px-9 lg:pb-9">
          <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-9">
            <div className="-mt-24 aspect-[2/3] w-[156px] rounded-2xl bg-muted ring-4 ring-card sm:-mt-28 sm:w-[190px] lg:-mt-32 lg:w-[240px]" />
            <div className="space-y-4 lg:pt-5">
              <div className="h-6 w-24 rounded-full bg-muted" />
              <div className="h-10 w-64 rounded bg-muted sm:h-12" />
              <div className="flex flex-wrap gap-2">
                <div className="h-9 w-40 rounded-full bg-muted" />
                <div className="h-9 w-48 rounded-full bg-muted" />
              </div>
              <div className="space-y-2 rounded-2xl border border-border/60 bg-muted/35 p-4">
                <div className="h-5 w-28 rounded bg-muted" />
                <div className="h-3 w-full max-w-xl rounded bg-muted" />
                <div className="h-3 w-full max-w-lg rounded bg-muted" />
                <div className="h-3 w-3/4 rounded bg-muted" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-2xl bg-muted" />
                ))}
              </div>
              <div className="h-11 w-40 rounded-xl bg-muted" />
            </div>
          </div>
          <div className="mt-9 border-t border-border/60 pt-7">
            <div className="mb-4 h-9 w-40 rounded-xl bg-muted" />
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] rounded-xl bg-muted" />
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
