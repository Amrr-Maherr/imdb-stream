import type { CrewMember } from '@/shared/types/tmdb';

export const PRIORITY_JOBS = [
  'Director',
  'Screenplay',
  'Writer',
  'Story',
  'Producer',
  'Executive Producer',
  'Director of Photography',
  'Original Music Composer',
  'Editor',
  'Production Design',
  'Art Director',
  'Costume Design',
  'Visual Effects Supervisor',
];

export function deduplicatedCrew(crew: CrewMember[]): CrewMember[] {
  const seen = new Set<string>();
  return crew.filter((m) => {
    if (!PRIORITY_JOBS.includes(m.job)) return false;
    const key = `${m.id}-${m.job}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
