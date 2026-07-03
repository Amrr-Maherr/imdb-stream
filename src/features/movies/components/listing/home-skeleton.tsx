import { HeroBannerSkeleton } from "./hero-skeleton";

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

function SectionRowSkeleton() {
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

function FeaturedRowSkeleton() {
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

function PremiumRowSkeleton() {
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

function BannerSectionSkeleton() {
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

function PersonRowSkeleton() {
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
        <PremiumRowSkeleton />
        <BannerSectionSkeleton />
        <SectionRowSkeleton />
        <SectionRowSkeleton />
        <BannerSectionSkeleton />
        <PersonRowSkeleton />
      </div>
    </div>
  );
}
