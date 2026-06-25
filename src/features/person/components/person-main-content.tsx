import type { TMDBPersonDetails } from "@/shared/types/tmdb";
import { ImageIcon, Link2 } from "lucide-react";
import { MovieSection } from "@/features/movies/components/detail/movie-section";
import { MovieExternalLinks } from "@/features/movies/components/detail/movie-external-links";
import { FadeIn } from "@/features/movies/components/detail/fade-in";
import { PersonKnownFor } from "./person-known-for";
import { PersonPhotos } from "./person-photos";
import { PersonCredits } from "./person-credits";
import { CareerStats } from "./career-stats";
import { BiographySection } from "./biography-section";

type PersonMainContentProps = {
  person: TMDBPersonDetails;
};

export function PersonMainContent({ person }: PersonMainContentProps) {
  const combinedCredits = person.combined_credits;

  const allKnownFor = [
    ...(combinedCredits?.cast ?? []),
    ...(combinedCredits?.crew ?? []),
  ]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);

  const profiles = person.images?.profiles ?? [];
  const taggedImages = person.tagged_images?.results ?? [];

  const socialIds = person.external_ids
    ? {
        imdb_id: null as string | null,
        facebook_id: person.external_ids.facebook_id,
        instagram_id: person.external_ids.instagram_id,
        twitter_id: person.external_ids.twitter_id,
        wikidata_id: person.external_ids.wikidata_id,
      }
    : null;

  return (
    <div className="flex-1 min-w-0 space-y-10">
      <CareerStats
        cast={combinedCredits?.cast ?? []}
        crew={combinedCredits?.crew ?? []}
      />

      <BiographySection
        biography={person.biography}
        alsoKnownAs={person.also_known_as}
      />

      {allKnownFor.length > 0 && (
        <FadeIn delay={0.05}>
          <PersonKnownFor items={allKnownFor} />
        </FadeIn>
      )}

      <FadeIn delay={0.1}>
        <PersonCredits
          cast={combinedCredits?.cast ?? []}
          crew={combinedCredits?.crew ?? []}
        />
      </FadeIn>

      {profiles.length > 0 && (
        <FadeIn delay={0.15}>
          <MovieSection title="Profile Photos" icon={<ImageIcon className="size-5" />}>
            <PersonPhotos profiles={profiles} />
          </MovieSection>
        </FadeIn>
      )}

      {taggedImages.length > 0 && (
        <FadeIn delay={0.2}>
          <MovieSection title="Tagged Images" icon={<ImageIcon className="size-5" />}>
            <PersonPhotos profiles={taggedImages.map((t) => t.image)} />
          </MovieSection>
        </FadeIn>
      )}

      {(socialIds || person.homepage || person.imdb_id) && (
        <FadeIn delay={0.25}>
          <MovieSection title="External Links" icon={<Link2 className="size-5" />}>
            <div className="flex flex-wrap gap-2">
              {person.imdb_id && (
                <a
                  href={`https://www.imdb.com/name/${person.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Link2 className="size-3.5" />
                  IMDb
                </a>
              )}
              <MovieExternalLinks ids={socialIds} homepage={null} />
            </div>
          </MovieSection>
        </FadeIn>
      )}
    </div>
  );
}
