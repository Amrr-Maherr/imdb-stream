import { Globe } from "lucide-react";

type AlternativeTitle = {
  iso_3166_1: string;
  title: string;
  type: string;
};

type MovieAlternativeTitlesProps = {
  titles: AlternativeTitle[];
};

function getCountryName(code: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

export function MovieAlternativeTitles({
  titles,
}: MovieAlternativeTitlesProps) {
  if (titles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {titles.map((t, i) => (
        <div
          key={`${t.iso_3166_1}-${t.title}-${i}`}
          className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"
        >
          <Globe className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {t.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {getCountryName(t.iso_3166_1)}
              {t.type ? ` · ${t.type}` : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
