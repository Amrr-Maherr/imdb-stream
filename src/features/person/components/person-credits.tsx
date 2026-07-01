import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { PersonCreditCast, PersonCreditCrew } from "@/shared/types/tmdb";
import { slugify } from "@/shared/utils/slugify";
import { EmptyState } from "@/shared/components/empty-state";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type PersonCreditsProps = {
  cast: PersonCreditCast[];
  crew: PersonCreditCrew[];
};

function getYear(item: { release_date?: string; first_air_date?: string }) {
  const date = item.release_date || item.first_air_date;
  if (!date) return "—";
  return date.slice(0, 4);
}

function getTitle(item: { title?: string; name?: string }) {
  return item.title || item.name || "Unknown";
}

function getHref(item: { media_type: string; id: number; title?: string; name?: string }) {
  const title = item.title || item.name || "unknown";
  if (item.media_type === "movie") return `/movies/${slugify(title)}/${item.id}`;
  if (item.media_type === "tv") return `/tv-shows/${slugify(title)}/${item.id}`;
  return "#";
}

type KnownForDepartment = string;

export function PersonCredits({ cast, crew }: PersonCreditsProps) {
  const departments = new Map<KnownForDepartment, PersonCreditCrew[]>();
  for (const c of crew) {
    const dept = c.department || "Other";
    if (!departments.has(dept)) departments.set(dept, []);
    departments.get(dept)!.push(c);
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-6">Filmography</h2>

      {/* Acting */}
      {cast.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-foreground mb-4">Acting</h3>
          <div className="space-y-1">
            {cast.map((credit) => (
              <CreditRow
                key={`cast-${credit.credit_id}`}
                title={getTitle(credit)}
                year={getYear(credit)}
                posterPath={credit.poster_path}
                role={credit.character}
                href={getHref(credit)}
                voteAverage={credit.vote_average}
                mediaType={credit.media_type}
              />
            ))}
          </div>
        </div>
      )}

      {/* Crew by department */}
      {Array.from(departments.entries()).map(([dept, credits]) => (
        <div key={dept} className="mb-10">
          <h3 className="text-lg font-semibold text-foreground mb-4">{dept}</h3>
          <div className="space-y-1">
            {credits.map((credit) => (
              <CreditRow
                key={`crew-${credit.credit_id}`}
                title={getTitle(credit)}
                year={getYear(credit)}
                posterPath={credit.poster_path}
                role={credit.job}
                href={getHref(credit)}
                voteAverage={credit.vote_average}
                mediaType={credit.media_type}
              />
            ))}
          </div>
        </div>
      ))}

      {cast.length === 0 && departments.size === 0 && (
        <EmptyState
          title="No credits available."
          className="py-16"
        />
      )}
    </section>
  );
}

type CreditRowProps = {
  title: string;
  year: string;
  posterPath: string | null;
  role: string;
  href: string;
  voteAverage: number;
  mediaType: string;
};

function CreditRow({ title, year, posterPath, role, href, voteAverage, mediaType }: CreditRowProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
    >
      {/* Poster thumbnail */}
      <div className="relative w-10 h-14 flex-shrink-0 overflow-hidden rounded bg-muted">
        {posterPath ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w92${posterPath}`}
            alt={title}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[8px] text-muted-foreground text-center p-0.5">
            {year}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-brand transition-colors">
          {title}
        </p>
        {role && (
          <p className="text-xs text-muted-foreground truncate">{role}</p>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 flex-shrink-0 text-xs text-muted-foreground">
        <span>{year}</span>
        {mediaType === "movie" && (
          <span className="rounded bg-muted px-1.5 py-0.5 uppercase">Movie</span>
        )}
        {mediaType === "tv" && (
          <span className="rounded bg-muted px-1.5 py-0.5 uppercase">TV</span>
        )}
        <div className="flex items-center gap-0.5">
          <Star className="size-3 fill-yellow-400 text-yellow-400" />
          <span>{voteAverage.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
