import Image from '@/shared/components/ui/image';
import { useLocale } from 'next-intl';
import { Calendar, ExternalLink, MapPin, Star, UserRound, Clapperboard } from 'lucide-react';
import { slugify } from '@/shared/utils/slugify';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { Link } from '@/i18n/navigation';
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

function formatBirthday(birthday: string, locale: string): string {
  const date = new Date(birthday);
  if (isNaN(date.getTime())) return birthday;
  return date.toLocaleDateString(locale, {
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
  const locale = useLocale();
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
      <SectionHeader title={title} subtitle={subtitle} icon={Star} />

      <Card className="relative overflow-hidden rounded-3xl border-brand/15 bg-gradient-to-br from-card via-card to-brand/[0.045] shadow-xl shadow-black/[0.04] ring-1 ring-brand/10">
        <div className="relative h-44 overflow-hidden sm:h-56 lg:h-64">
          {person.backdropPath ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w1280${person.backdropPath}`}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-muted to-card" />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -end-12 -top-24 size-72 rounded-full bg-brand/20 blur-3xl"
            aria-hidden="true"
          />

          {person.knownForDepartment && (
            <Badge
              variant="brand"
              className="absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-lg sm:start-7 sm:top-7"
            >
              {person.knownForDepartment}
            </Badge>
          )}
          <div className="absolute inset-x-5 bottom-5 flex items-center gap-2 text-sm font-semibold text-white/90 sm:inset-x-7 sm:bottom-7">
            <Star className="size-4 fill-rating-star text-rating-star" aria-hidden="true" />
            <span>{title}</span>
          </div>
        </div>

        <div className="relative px-5 pb-6 sm:px-7 sm:pb-8 lg:px-9 lg:pb-9">
          <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-9">
            <Link
              href={profileHref}
              aria-label={person.name}
              className="group relative -mt-24 block aspect-[2/3] w-[156px] overflow-hidden rounded-2xl border border-white/30 bg-muted shadow-2xl shadow-black/25 ring-4 ring-card transition-all hover:-translate-y-1 hover:shadow-brand/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:-mt-28 sm:w-[190px] lg:-mt-32 lg:w-[240px]"
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
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/15 via-muted to-card text-muted-foreground">
                  <UserRound className="size-14 text-brand/60" />
                </div>
              )}
            </Link>

            <div className="min-w-0 lg:pt-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="brand" className="rounded-full px-3 py-1 text-[11px] font-bold">
                  {person.knownForDepartment || labels.knownFor}
                </Badge>
              </div>
              <h3 className="mt-3 text-3xl leading-tight font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {person.name}
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {person.birthday && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 text-xs font-medium text-muted-foreground">
                    <Calendar className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
                    <span className="font-semibold text-foreground">{labels.birth}</span>
                    {formatBirthday(person.birthday, locale)}
                    {age != null && <span className="text-muted-foreground/70">({age})</span>}
                  </span>
                )}
                {person.placeOfBirth && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 text-xs font-medium text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
                    {person.placeOfBirth}
                  </span>
                )}
              </div>

              {person.biography && (
                <div className="mt-5 rounded-2xl border border-border/60 bg-muted/35 p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
                      <UserRound className="size-4" aria-hidden="true" />
                    </span>
                    <h4 className="text-sm font-bold text-foreground">{labels.biography}</h4>
                  </div>
                  <p className="line-clamp-4 text-sm leading-7 text-muted-foreground sm:line-clamp-5 lg:line-clamp-6">
                    {person.biography}
                  </p>
                </div>
              )}

              {statItems.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {statItems.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-2xl border border-border/70 bg-background/70 px-3 py-3 transition-colors hover:border-brand/30 hover:bg-brand/[0.04]"
                    >
                      <p className="text-2xl font-black tracking-tight text-foreground">
                        {item.value}
                      </p>
                      <p className="mt-1 text-[10px] font-bold tracking-wide text-muted-foreground uppercase">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={profileHref}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/15 transition-all hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <UserRound className="size-4" />
                  {labels.viewProfile}
                </Link>
                {person.imdbId && (
                  <a
                    href={`https://www.imdb.com/name/${person.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-border/70 bg-background/70 px-4 text-sm font-semibold text-foreground transition-all hover:border-brand/30 hover:bg-brand/[0.05]"
                  >
                    <ExternalLink className="size-4" />
                    {labels.imdb}
                  </a>
                )}
              </div>
            </div>
          </div>

          {credits.length > 0 && (
            <div className="mt-9 border-t border-border/60 pt-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/15">
                  <Clapperboard className="size-4" aria-hidden="true" />
                </span>
                <h4 className="text-lg font-black tracking-tight text-foreground">
                  {labels.knownFor}
                </h4>
              </div>
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
