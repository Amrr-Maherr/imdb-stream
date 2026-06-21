import { MovieRowSkeleton } from "./movies-skeleton";
import { TvRowSkeleton } from "./tv-skeleton";
import { PersonRowSkeleton } from "./people-skeleton";

type SkeletonType = "movie" | "tv" | "person";

const rowComponents: Record<SkeletonType, typeof MovieRowSkeleton> = {
  movie: MovieRowSkeleton,
  tv: TvRowSkeleton,
  person: PersonRowSkeleton,
};

export function MediaGridSkeleton({
  type = "movie",
  count = 6,
}: {
  type?: SkeletonType;
  count?: number;
}) {
  const Row = rowComponents[type];
  return <Row count={count} />;
}

export function SectionSkeleton({
  type = "movie",
  itemCount = 6,
  sectionCount = 3,
}: {
  type?: SkeletonType;
  itemCount?: number;
  sectionCount?: number;
}) {
  return (
    <div className="space-y-8">
      {Array.from({ length: sectionCount }).map((_, i) => (
        <section key={i}>
          <div className="mb-4 h-5 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <MediaGridSkeleton type={type} count={itemCount} />
        </section>
      ))}
    </div>
  );
}
