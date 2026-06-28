import { fetchApi } from "@/shared/services/fetchApi";
import { ErrorState } from "@/shared/components/error-state";
import type { TMDBPersonDetails } from "@/shared/types/tmdb";
import { PersonHero } from "@/features/person/components/person-hero";
import { PersonMainContent } from "@/features/person/components/person-main-content";
import { PersonSidebarColumn } from "@/features/person/components/person-sidebar-column";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

async function getPerson(id: string) {
  return fetchApi<TMDBPersonDetails>({
    endpoint: `person/${id}?append_to_response=combined_credits,external_ids,images,tagged_images,translations`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const person = await getPerson(id);
    return {
      title: person.name,
      description: person.biography?.slice(0, 160),
    };
  } catch {
    return { title: "Person" };
  }
}

export default async function PersonPage({ params }: Props) {
  const { id } = await params;

  let person: TMDBPersonDetails;
  try {
    person = await getPerson(id);
  } catch {
    return (
      <ErrorState
        title="Person not found"
        description="We couldn't find the person you're looking for."
        actionLabel="Go Home"
        actionHref="/"
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-background">
      <PersonHero
        name={person.name}
        profilePath={person.profile_path}
        knownForDepartment={person.known_for_department}
        birthday={person.birthday}
        deathday={person.deathday}
        placeOfBirth={person.place_of_birth}
        homepage={person.homepage}
        imdbId={person.imdb_id}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <PersonMainContent person={person} />
          <PersonSidebarColumn person={person} />
        </div>
      </div>
    </div>
  );
}
