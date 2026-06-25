type MovieInfoProps = {
  title: string;
  year: string;
  certification: string;
  runtime: number;
  tagline: string | null;
  overlay?: boolean;
};

function runtimeDisplay(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function MovieInfo({ title, year, certification, runtime, tagline, overlay }: MovieInfoProps) {
  const titleClass = overlay
    ? "text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
    : "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight";
  const metaClass = overlay
    ? "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-white/60"
    : "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-muted-foreground";
  const certClass = overlay
    ? "rounded border border-white/30 px-1.5 py-0.5 text-xs font-bold text-white"
    : "rounded border border-border px-1.5 py-0.5 text-xs font-bold text-foreground";
  const yearClass = overlay
    ? "font-medium text-white"
    : "font-medium text-foreground";
  const taglineClass = overlay
    ? "text-base text-white/60 italic mt-1"
    : "text-base text-muted-foreground italic mt-1";

  return (
    <div>
      <h1 className={titleClass}>{title}</h1>
      <div className={metaClass}>
        {certification && (
          <span className={certClass}>{certification}</span>
        )}
        {year && <span className={yearClass}>{year}</span>}
        {runtime > 0 && <span>{runtimeDisplay(runtime)}</span>}
      </div>
      {tagline && <p className={taglineClass}>{tagline}</p>}
    </div>
  );
}
