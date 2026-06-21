import { SectionSkeleton } from "@/components/skeletons";

export default function TvShowsLoading() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <SectionSkeleton type="tv" itemCount={6} sectionCount={4} />
    </div>
  );
}
