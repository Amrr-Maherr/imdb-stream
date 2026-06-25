"use client";

import { Slider } from "@/shared/components/ui/slider";
import { CrewCard } from "./crew-card";

type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
};

type MovieCrewSectionProps = {
  crew: CrewMember[];
};

const PRIORITY_JOBS = [
  "Director",
  "Screenplay",
  "Writer",
  "Story",
  "Producer",
  "Executive Producer",
  "Director of Photography",
  "Original Music Composer",
  "Editor",
  "Production Design",
  "Art Director",
  "Costume Design",
  "Visual Effects Supervisor",
];

function deduplicatedCrew(crew: CrewMember[]): CrewMember[] {
  const seen = new Set<string>();
  return crew.filter((m) => {
    if (!PRIORITY_JOBS.includes(m.job)) return false;
    const key = `${m.id}-${m.job}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function MovieCrewSection({ crew }: MovieCrewSectionProps) {
  const filtered = deduplicatedCrew(crew);
  if (filtered.length === 0) return null;

  return (
    <Slider
      slidesPerView={6}
      slidesMobilePerView={3}
      spaceBetween={14}
      grabCursor
      freeMode
      className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
    >
      {filtered.map((m) => (
        <CrewCard
          key={m.credit_id}
          id={m.id}
          name={m.name}
          job={m.job}
          department={m.department}
          profilePath={m.profile_path}
          creditId={m.credit_id}
        />
      ))}
    </Slider>
  );
}
