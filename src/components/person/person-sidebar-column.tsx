import type { TMDBPersonDetails } from "@/types/tmdb";
import { FadeIn } from "@/components/movie/fade-in";
import { PersonSidebar } from "./person-sidebar";

type PersonSidebarColumnProps = {
  person: TMDBPersonDetails;
};

export function PersonSidebarColumn({ person }: PersonSidebarColumnProps) {
  return (
    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
      <FadeIn delay={0.05}>
        <PersonSidebar
          gender={person.gender}
          popularity={person.popularity}
          adult={person.adult}
        />
      </FadeIn>
    </div>
  );
}
