import type { TMDBEpisodeDetails } from '@/shared/types/tmdb';

type EpisodeCrew = TMDBEpisodeDetails['crew'];

export function getDirector(crew: EpisodeCrew) {
  return crew.find((m) => m.job === 'Director') ?? null;
}

export function getWriters(crew: EpisodeCrew) {
  return crew.filter((m) => m.job === 'Writer' || m.job === 'Screenplay' || m.job === 'Teleplay');
}

export function getProducers(crew: EpisodeCrew) {
  return crew.filter((m) => m.job === 'Producer' || m.job === 'Executive Producer');
}
