import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, MapPin, UserRound } from 'lucide-react';
import { slugify } from '@/shared/utils/slugify';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { MovieCard } from '@/features/movies/components/listing/movie-card';
import { TvCard } from '@/features/movies/components/listing/tv-card';
import {
  spotlightCreditToMovie,
  spotlightCreditToTv,
} from '@/features/movies/utils/spotlight-helpers';
import type {
  SpotlightCredit,
  SpotlightPerson,
  SpotlightStats,
} from '@/features/movies/services/spotlight';
import { SectionHeader } from './section-header';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type {
  SpotlightCredit,
  SpotlightPerson,
  SpotlightStats,
} from '@/features/movies/services/spotlight';

export type SpotlightLabels = {
  knownFor: string;
  biography: string;
  birth: string;
  credits: string;
  movies: string;
  tvShows: string;
  averageRating: string;
  viewProfile: string;
  imdb: string;
  movie: string;
  tv: string;
};

type EditorialSpotlightProps = {
  title: string;
  subtitle?: string;
  labels: SpotlightLabels;
  person: SpotlightPerson;
  stats: SpotlightStats;
  credits: SpotlightCredit[];
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

function formatBirthday(birthday: string): string {
  const date = new Date(birthday);
  if (isNaN(date.getTime())) return birthday;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function EditorialSpotlight({
  title,
  subtitle,
  labels,
  person,
  stats,
  credits,
}: EditorialSpotlightProps) {
  const profileHref = `/people/${slugify(person.name)}/${person.id}`;
  const age = person.birthday ? calculateAge(person.birthday, person.deathday) : null;

  const statItems: { key: string; label: string; value: string }[] = [];
  if (stats.credits > 0)
    statItems.push({ key: 'credits', label: labels.credits, value: String(stats.credits) });
  if (stats.movies > 0)
    statItems.push({ key: 'movies', label: labels.movies, value: String(stats.movies) });
  if (stats.tvShows > 0)
    statItems.push({ key: 'tvShows', label: labels.tvShows, value: String(stats.tvShows) });
  if (stats.averageRating != null)
    statItems.push({
      key: 'averageRating',
      label: labels.averageRating,
      value: stats.averageRating.toFixed(1),
    });

  return (
    <section>
      <SectionHeader title={title} subtitle={subtitle} />

      <Card className="overflow-hidden rounded-2xl border-border/60">
        <div className="relative h-36 sm:h-48 lg:h-52">
          {person.backdropPath ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w1280${person.backdropPath}`}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-card" />
          )}
          <div className="absolute inset-0 bg-card/60" />

          {person.knownForDepartment && (
            <Badge variant="brand" className="absolute start-4 top-4 sm:start-6 sm:top-6">
              {person.knownForDepartment}
            </Badge>
          )}
        </div>

        <div className="px-5 pb-6 sm:px-7 sm:pb-8 lg:px-9 lg:pb-9">
          <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-9">
            <Link
              href={profileHref}
              aria-label={person.name}
              className="group relative -mt-20 block aspect-[2/3] w-[150px] overflow-hidden rounded-xl border border-border/50 bg-muted shadow-lg ring-4 ring-card transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:-mt-24 sm:w-[180px] lg:-mt-28 lg:w-[220px]"
            >
              {person.profilePath ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w500${person.profilePath}`}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 220px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <UserRound className="size-14" />
                </div>
              )}
            </Link>

            <div className="min-w-0 lg:pt-2">
              <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                {person.name}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {person.birthday && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 shrink-0" />
                    <span className="font-medium text-foreground">{labels.birth}</span>{' '}
                    {formatBirthday(person.birthday)}
                    {age != null && <span className="text-muted-foreground/70">({age})</span>}
                  </span>
                )}
                {person.placeOfBirth && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0" />
                    {person.placeOfBirth}
                  </span>
                )}
              </div>

              {person.biography && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {labels.biography}
                  </h4>
                  <p className="mt-1.5 line-clamp-4 text-sm leading-relaxed text-muted-foreground sm:line-clamp-5 lg:line-clamp-6">
                    {person.biography}
                  </p>
                </div>
              )}

              {statItems.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {statItems.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-xl border border-border/60 bg-muted/40 px-3 py-2.5"
                    >
                      <p className="text-xl font-bold text-foreground">{item.value}</p>
                      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={profileHref}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <UserRound className="size-4" />
                  {labels.viewProfile}
                </Link>
                {person.imdbId && (
                  <a
                    href={`https://www.imdb.com/name/${person.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <ExternalLink className="size-4" />
                    {labels.imdb}
                  </a>
                )}
              </div>
            </div>
          </div>

          {credits.length > 0 && (
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {labels.knownFor}
              </h4>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {credits.map((credit) => (
                  <div key={`${credit.mediaType}-${credit.id}`} className="min-w-0">
                    {credit.mediaType === 'movie' ? (
                      <MovieCard movie={spotlightCreditToMovie(credit)} />
                    ) : (
                      <TvCard tv={spotlightCreditToTv(credit)} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
