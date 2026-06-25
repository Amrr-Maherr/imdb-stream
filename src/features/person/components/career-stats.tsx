import type { PersonCreditCast, PersonCreditCrew } from "@/shared/types/tmdb";
import { Film, Tv, Clapperboard, PenLine, Monitor, Pencil } from "lucide-react";
import { FadeIn } from "@/features/movies/components/detail/fade-in";

type CareerStatsProps = {
  cast: PersonCreditCast[];
  crew: PersonCreditCrew[];
};

type StatItem = {
  label: string;
  value: number;
  icon: React.ReactNode;
};

export function CareerStats({ cast, crew }: CareerStatsProps) {
  const movies = cast.filter((c) => c.media_type === "movie").length +
    crew.filter((c) => c.media_type === "movie").length;
  const tvShows = cast.filter((c) => c.media_type === "tv").length +
    crew.filter((c) => c.media_type === "tv").length;
  const acting = cast.length;
  const directing = crew.filter((c) => c.department === "Directing").length;
  const producing = crew.filter((c) => c.department === "Production").length;
  const writing = crew.filter((c) => c.department === "Writing").length;

  const stats: StatItem[] = [
    { label: "Movies", value: movies, icon: <Film className="size-4" /> },
    { label: "TV Shows", value: tvShows, icon: <Tv className="size-4" /> },
    { label: "Acting", value: acting, icon: <Clapperboard className="size-4" /> },
    { label: "Directing", value: directing, icon: <Monitor className="size-4" /> },
    { label: "Producing", value: producing, icon: <PenLine className="size-4" /> },
    { label: "Writing", value: writing, icon: <Pencil className="size-4" /> },
  ];

  const total = stats.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  return (
    <FadeIn>
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Career Statistics</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <div className="flex justify-center text-muted-foreground mb-1">
                {stat.icon}
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
