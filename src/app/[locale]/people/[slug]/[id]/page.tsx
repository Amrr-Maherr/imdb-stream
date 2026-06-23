import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/services/api/fetchApi";
import type { TMDBPersonDetails } from "@/types/tmdb";
import { PersonHero } from "@/components/person/person-hero";
import { PersonMainContent } from "@/components/person/person-main-content";
import { PersonSidebarColumn } from "@/components/person/person-sidebar-column";

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
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">
            Person not found
          </h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find the person you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
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
