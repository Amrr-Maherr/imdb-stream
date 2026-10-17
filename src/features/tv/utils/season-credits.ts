import type { CrewMember, Credits } from '@/shared/types/tmdb';

type AggregateJob = {
  credit_id: string;
  job: string;
};

type WithJobs = { jobs?: AggregateJob[] };

type SeasonCredits = {
  credits?: Credits;
  aggregate_credits?: Credits;
};

/**
 * `aggregate_credits` crew entries do not expose a top-level `job` field; the
 * role names live in a `jobs` array instead. Flatten them back to the shape
 * expected by the shared crew components.
 */
export function seasonCrew(season: SeasonCredits): CrewMember[] {
  const source = season.aggregate_credits?.crew?.length
    ? season.aggregate_credits.crew
    : (season.credits?.crew ?? []);

  return source.map((member) => {
    const jobs = (member as CrewMember & WithJobs).jobs;
    if (!jobs || jobs.length === 0) return member;
    return {
      ...member,
      job: jobs.map((entry) => entry.job).join(' / '),
      credit_id: jobs[0].credit_id,
    };
  });
}
