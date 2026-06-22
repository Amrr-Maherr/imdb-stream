import { Monitor } from "lucide-react";
import { MovieRating } from "@/components/movie/movie-rating";

type TvSidebarProps = {
  voteAverage: number;
  voteCount: number;
  popularity: number;
  status: string;
  type: string;
  originalLanguage: string;
  firstAirDate: string;
  lastAirDate: string | null;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  episodeRuntime: number[];
  networks: { id: number; name: string; logo_path: string | null }[];
  createdBy: string[];
  productionCompanies: { id: number; name: string; logo_path: string | null }[];
  keywords: { id: number; name: string }[];
  languages: string[];
  translationsCount: number;
  spokenLanguagesCount: number;
};

export function TvSidebar({
  voteAverage,
  voteCount,
  popularity,
  status,
  type,
  originalLanguage,
  firstAirDate,
  lastAirDate,
  numberOfSeasons,
  numberOfEpisodes,
  episodeRuntime,
  networks,
  createdBy,
  productionCompanies,
  keywords,
  languages,
  translationsCount,
  spokenLanguagesCount,
}: TvSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Rating Card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <MovieRating
          voteAverage={voteAverage}
          voteCount={voteCount}
          popularity={popularity}
        />
      </div>

      {/* TV Facts */}
      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Facts</h3>
        <div className="space-y-3">
          {status && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Status</h4>
              <p className="text-sm text-foreground mt-0.5">{status}</p>
            </div>
          )}
          {type && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Type</h4>
              <p className="text-sm text-foreground mt-0.5">{type}</p>
            </div>
          )}
          {firstAirDate && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">First Air Date</h4>
              <p className="text-sm text-foreground mt-0.5">
                {new Date(firstAirDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          {lastAirDate && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Last Air Date</h4>
              <p className="text-sm text-foreground mt-0.5">
                {new Date(lastAirDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          {numberOfSeasons > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Seasons</h4>
              <p className="text-sm text-foreground mt-0.5">{numberOfSeasons}</p>
            </div>
          )}
          {numberOfEpisodes > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Episodes</h4>
              <p className="text-sm text-foreground mt-0.5">{numberOfEpisodes}</p>
            </div>
          )}
          {episodeRuntime.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Episode Runtime</h4>
              <p className="text-sm text-foreground mt-0.5">{episodeRuntime[0]} min</p>
            </div>
          )}
          {originalLanguage && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Original Language</h4>
              <p className="text-sm text-foreground mt-0.5 uppercase">{originalLanguage}</p>
            </div>
          )}
          {createdBy.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Created by</h4>
              <div className="text-sm text-foreground mt-0.5 space-y-0.5">
                {createdBy.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            </div>
          )}
          {networks.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Network</h4>
              <div className="text-sm text-foreground mt-0.5">
                {networks.map((n) => (
                  <p key={n.id} className="flex items-center gap-1">
                    <Monitor className="size-3.5 text-muted-foreground" />
                    {n.name}
                  </p>
                ))}
              </div>
            </div>
          )}
          {productionCompanies.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Production</h4>
              <div className="text-sm text-foreground mt-0.5 space-y-0.5">
                {productionCompanies.map((c) => (
                  <p key={c.id}>{c.name}</p>
                ))}
              </div>
            </div>
          )}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Languages</h4>
            <p className="text-sm text-foreground mt-0.5">
              {spokenLanguagesCount} spoken · {translationsCount} translations
            </p>
          </div>
        </div>
      </div>

      {/* Keywords */}
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Keywords</h3>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <span
                key={kw.id}
                className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {kw.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
