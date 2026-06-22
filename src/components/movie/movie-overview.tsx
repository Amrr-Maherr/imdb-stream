type MovieOverviewProps = {
  overview: string;
  director: string | null;
  writers: string[];
};

export function MovieOverview({ overview, director, writers }: MovieOverviewProps) {
  if (!overview && !director && writers.length === 0) return null;

  return (
    <section>
      {overview && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">Storyline</h2>
          <p className="text-muted-foreground leading-relaxed">{overview}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm">
        {director && (
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Director</h3>
            <p className="text-foreground font-medium mt-0.5">{director}</p>
          </div>
        )}
        {writers.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Writers</h3>
            <p className="text-foreground mt-0.5">{writers.join(", ")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
