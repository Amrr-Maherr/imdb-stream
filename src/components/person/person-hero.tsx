import Image from "next/image";
import { ExternalLink } from "lucide-react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type PersonHeroProps = {
  name: string;
  profilePath: string | null;
  biography: string;
  knownForDepartment: string;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  homepage: string | null;
  imdbId: string | null;
};

export function PersonHero({
  name,
  profilePath,
  biography,
  knownForDepartment,
  birthday,
  deathday,
  placeOfBirth,
  homepage,
  imdbId,
}: PersonHeroProps) {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile photo */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-[200px] sm:w-[260px] aspect-[2/3] overflow-hidden rounded-xl bg-muted">
              {profilePath ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w342${profilePath}`}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="260px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-4 text-center">
                  {name}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {name}
            </h1>
            {knownForDepartment && (
              <p className="text-base text-muted-foreground mt-1">{knownForDepartment}</p>
            )}

            {/* Quick personal info */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-muted-foreground">
              {birthday && (
                <span>
                  <span className="font-medium text-foreground">Born:</span>{" "}
                  {new Date(birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {deathday &&
                    ` — ${new Date(deathday).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                </span>
              )}
              {placeOfBirth && (
                <span>
                  <span className="font-medium text-foreground">Place:</span> {placeOfBirth}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-4">
              {homepage && (
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-all"
                >
                  <ExternalLink className="size-4" />
                  Website
                </a>
              )}
              {imdbId && (
                <a
                  href={`https://www.imdb.com/name/${imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-all"
                >
                  IMDb
                </a>
              )}
            </div>

            {/* Biography */}
            {biography && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-foreground mb-3">Biography</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-[8]">
                  {biography}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
