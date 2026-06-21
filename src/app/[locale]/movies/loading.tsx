import { SectionSkeleton } from "@/components/skeletons";

export default function MoviesLoading() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <SectionSkeleton type="movie" itemCount={6} sectionCount={4} />
    </div>
  );
}
