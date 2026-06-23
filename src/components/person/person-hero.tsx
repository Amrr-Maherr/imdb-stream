import Image from "next/image";
import { ExternalLink, Calendar, MapPin, Flame } from "lucide-react";
import { FadeIn } from "@/components/movie/fade-in";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type PersonHeroProps = {
  name: string;
  profilePath: string | null;
  knownForDepartment: string;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  homepage: string | null;
  imdbId: string | null;
};

function calculateAge(birthday: string, deathday?: string | null): number | null {
  const birth = new Date(birthday);
  if (isNaN(birth.getTime())) return null;
  const end = deathday ? new Date(deathday) : new Date();
  if (isNaN(end.getTime())) return null;
  let age = end.getFullYear() - birth.getFullYear();
  const monthDiff = end.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function PersonHero({
  name,
  profilePath,
  knownForDepartment,
  birthday,
  deathday,
  placeOfBirth,
  homepage,
  imdbId,
}: PersonHeroProps) {
  const age = birthday ? calculateAge(birthday, deathday) : null;

  return (
    <FadeIn>
      <section className="bg-card border-b border-border">
        <div className="w-full mx-auto app-container py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-[180px] sm:w-[220px] aspect-[2/3] overflow-hidden rounded-xl bg-muted shadow-lg">
                {profilePath ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w342${profilePath}`}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="220px"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm p-4 text-center">
                    {name}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                {name}
              </h1>

              {knownForDepartment && (
                <span className="inline-flex items-center gap-1 mt-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground w-fit">
                  <Flame className="size-3 text-muted-foreground" />
                  {knownForDepartment}
                </span>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
                {birthday && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
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
                    {age != null && <span className="text-muted-foreground/60">({age} years{deathday ? "" : " old"})</span>}
                  </span>
                )}
                {placeOfBirth && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {placeOfBirth}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
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
                    <ExternalLink className="size-4" />
                    IMDb
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
