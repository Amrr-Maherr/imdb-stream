import { SectionSkeleton } from "@/components/skeletons";

export default function PeopleLoading() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <SectionSkeleton type="person" itemCount={8} sectionCount={3} />
    </div>
  );
}
