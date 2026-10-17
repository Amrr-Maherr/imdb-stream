import { fetchApi } from '@/shared/services/fetchApi';
import type {
  TMDBMovie,
  TMDBPerson,
  TMDBPersonDetails,
  TMDBTV,
  PersonCreditCast,
} from '@/shared/types/tmdb';
import { slugify } from '@/shared/utils/slugify';

export type SpotlightCredit = {
  id: number;
  href: string;
  title: string;
  posterPath: string | null;
  year?: string;
  voteAverage: number;
  voteCount: number;
  mediaType: 'movie' | 'tv';
};

export type SpotlightPerson = {
  id: number;
  name: string;
  knownForDepartment: string;
  profilePath: string | null;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  biography: string;
  imdbId: string | null;
  backdropPath: string | null;
};

export type SpotlightStats = {
  credits: number;
  movies: number;
  tvShows: number;
  averageRating: number | null;
};

export type SpotlightViewModel = {
  person: SpotlightPerson;
  stats: SpotlightStats;
  credits: SpotlightCredit[];
};

// Editorial actor spotlight. Chosen for a verified, information-rich TMDB profile
// (biography, personal details, extensive filmography, profile gallery).
export const SPOTLIGHT_PERSON_ID = 500;

function personCreditToSpotlight(credit: PersonCreditCast): SpotlightCredit | null {
  const isMovie = credit.media_type === 'movie';
  const title = (isMovie ? credit.title : credit.name)?.trim();
  if (!title) return null;
  const year = (isMovie ? credit.release_date : credit.first_air_date)?.slice(0, 4);
  return {
    id: credit.id,
    href: isMovie
      ? `/movies/${slugify(title)}/${credit.id}`
      : `/tv-shows/${slugify(title)}/${credit.id}`,
    title,
    posterPath: credit.poster_path,
    year,
    voteAverage: credit.vote_average,
    voteCount: credit.vote_count,
    mediaType: isMovie ? 'movie' : 'tv',
  };
}

function knownForToSpotlight(credit: TMDBMovie | TMDBTV): SpotlightCredit {
  const isMovie = 'title' in credit;
  const title = (isMovie ? credit.title : credit.name)?.trim() ?? '';
  const year = (isMovie ? credit.release_date : credit.first_air_date)?.slice(0, 4);
  return {
    id: credit.id,
    href: isMovie
      ? `/movies/${slugify(title)}/${credit.id}`
      : `/tv-shows/${slugify(title)}/${credit.id}`,
    title,
    posterPath: credit.poster_path,
    year,
    voteAverage: credit.vote_average,
    voteCount: credit.vote_count,
    mediaType: isMovie ? 'movie' : 'tv',
  };
}

export async function fetchSpotlightDetail(locale: string): Promise<TMDBPersonDetails | null> {
  try {
    return await fetchApi<TMDBPersonDetails>({
      endpoint: `person/${SPOTLIGHT_PERSON_ID}?append_to_response=combined_credits,external_ids,images`,
      revalidate: 3600,
      locale,
    });
  } catch {
    return null;
  }
}

export function buildSpotlight(details: TMDBPersonDetails): SpotlightViewModel {
  const cast = details.combined_credits?.cast ?? [];

  const seen = new Set<string>();
  const unique: PersonCreditCast[] = [];
  for (const credit of cast) {
    const key = `${credit.media_type}-${credit.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(credit);
  }

  const ranked = [...unique].sort(
    (a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0) || b.popularity - a.popularity
  );

  const credits = ranked
    .filter((credit) => credit.poster_path)
    .slice(0, 6)
    .map(personCreditToSpotlight)
    .filter((credit): credit is SpotlightCredit => credit !== null);

  const rated = unique.filter((credit) => credit.vote_count >= 50 && credit.vote_average > 0);
  const averageRating = rated.length
    ? Math.round(
      (rated.reduce((sum, credit) => sum + credit.vote_average, 0) / rated.length) * 10
    ) / 10
    : null;

  const backdropPath =
    ranked.find((credit) => credit.backdrop_path && credit.vote_count >= 100)?.backdrop_path ??
    null;

  return {
    person: {
      id: details.id,
      name: details.name,
      knownForDepartment: details.known_for_department,
      profilePath: details.profile_path,
      birthday: details.birthday,
      deathday: details.deathday,
      placeOfBirth: details.place_of_birth,
      biography: details.biography ?? '',
      imdbId: details.imdb_id,
      backdropPath,
    },
    stats: {
      credits: unique.length,
      movies: unique.filter((credit) => credit.media_type === 'movie').length,
      tvShows: unique.filter((credit) => credit.media_type === 'tv').length,
      averageRating,
    },
    credits,
  };
}

export function pickSpotlightPerson(people: TMDBPerson[]): TMDBPerson | undefined {
  const candidates = people.filter((person) => (person.known_for?.length ?? 0) > 0);
  if (candidates.length === 0) return undefined;

  return [...candidates].sort((a, b) => {
    const acting =
      Number(b.known_for_department === 'Acting') - Number(a.known_for_department === 'Acting');
    if (acting !== 0) return acting;

    const works = (b.known_for?.length ?? 0) - (a.known_for?.length ?? 0);
    if (works !== 0) return works;

    return b.popularity - a.popularity;
  })[0];
}

export function buildSpotlightFallback(person: TMDBPerson): SpotlightViewModel | null {
  const credits = (person.known_for ?? [])
    .map(knownForToSpotlight)
    .filter((credit) => credit.title)
    .slice(0, 6);

  if (credits.length === 0) return null;

  return {
    person: {
      id: person.id,
      name: person.name,
      knownForDepartment: person.known_for_department,
      profilePath: person.profile_path,
      birthday: null,
      deathday: null,
      placeOfBirth: null,
      biography: '',
      imdbId: null,
      backdropPath: null,
    },
    stats: {
      credits: person.known_for?.length ?? 0,
      movies: credits.filter((credit) => credit.mediaType === 'movie').length,
      tvShows: credits.filter((credit) => credit.mediaType === 'tv').length,
      averageRating: null,
    },
    credits,
  };
}

export function getSpotlight(
  details: TMDBPersonDetails | null,
  popularPeople: TMDBPerson[]
): SpotlightViewModel | null {
  const fromDetails = details ? buildSpotlight(details) : null;
  if (fromDetails && fromDetails.credits.length > 0) return fromDetails;

  const fallbackPerson = pickSpotlightPerson(popularPeople);
  return fallbackPerson ? buildSpotlightFallback(fallbackPerson) : null;
}
