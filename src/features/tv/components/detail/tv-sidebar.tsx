"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Monitor, Flag, Globe, ShieldCheck } from "lucide-react";
import { MovieRating } from "@/features/movies/components/detail/movie-rating";
import { slugify } from "@/shared/utils/slugify";

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
  productionCountries: { iso_3166_1: string; name: string }[];
  keywords: { id: number; name: string }[];
  languages: string[];
  translationsCount: number;
  spokenLanguagesCount: number;
  originalName: string;
  name: string;
  inProduction: boolean;
  originCountry: string[];
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
  productionCountries,
  keywords,
  languages,
  translationsCount,
  spokenLanguagesCount,
  originalName,
  name,
  inProduction,
  originCountry,
}: TvSidebarProps) {
  const t = useTranslations("TvDetail");
  const tm = useTranslations("MovieDetail");
  const tc = useTranslations("Common");
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
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          {tm("facts")}
        </h3>
        <div className="space-y-3">
          {status && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("status")}
              </h4>
              <p className="text-sm text-foreground mt-0.5">{status}</p>
            </div>
          )}
          {type && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("type")}
              </h4>
              <p className="text-sm text-foreground mt-0.5">{type}</p>
            </div>
          )}
          {firstAirDate && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("firstAirDate")}
              </h4>
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
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("lastAirDate")}
              </h4>
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
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("seasons")}
              </h4>
              <p className="text-sm text-foreground mt-0.5">
                {numberOfSeasons}
              </p>
            </div>
          )}
          {numberOfEpisodes > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("episodes")}
              </h4>
              <p className="text-sm text-foreground mt-0.5">
                {numberOfEpisodes}
              </p>
            </div>
          )}
          {episodeRuntime.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("episodeRuntime")}
              </h4>
              <p className="text-sm text-foreground mt-0.5">
                {t("runtimeMin", { runtime: episodeRuntime[0] })}
              </p>
            </div>
          )}
          {originalLanguage && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {tm("originalLanguage")}
              </h4>
              <p className="text-sm text-foreground mt-0.5 uppercase">
                {originalLanguage}
              </p>
            </div>
          )}
          {inProduction && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("inProduction")}
              </h4>
              <p className="text-sm text-foreground mt-0.5 flex items-center gap-1">
                <ShieldCheck className="size-3.5" />
                {tc("yes")}
              </p>
            </div>
          )}
          {createdBy.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("createdBy")}
              </h4>
              <div className="text-sm text-foreground mt-0.5 space-y-0.5">
                {createdBy.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            </div>
          )}
          {originalName !== name && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("originalName")}
              </h4>
              <p className="text-sm text-foreground mt-0.5">{originalName}</p>
            </div>
          )}
          {originCountry?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {tm("originCountry")}
              </h4>
              <p className="text-sm text-foreground mt-0.5 flex items-center gap-1">
                <Flag className="size-3.5" />
                {originCountry.join(", ")}
              </p>
            </div>
          )}
          {productionCountries?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {tm("productionCountries")}
              </h4>
              <p className="text-sm text-foreground mt-0.5 flex items-center gap-1">
                <Globe className="size-3.5" />
                {productionCountries.map((pc) => pc.name).join(", ")}
              </p>
            </div>
          )}
          {networks.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("network")}
              </h4>
              <div className="text-sm text-foreground mt-0.5">
                {networks.map((n) => (
                  <Link
                    key={n.id}
                    href={`/company/${slugify(n.name)}/${n.id}`}
                    className="flex items-center gap-1 hover:text-brand transition-colors"
                  >
                    <Monitor className="size-3.5 text-muted-foreground" />
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {productionCompanies.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {tm("production")}
              </h4>
              <div className="text-sm text-foreground mt-0.5 space-y-0.5">
                {productionCompanies.map((c) => (
                  <Link
                    key={c.id}
                    href={`/company/${slugify(c.name)}/${c.id}`}
                    className="block hover:text-brand transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">
              {tm("languages")}
            </h4>
            <p className="text-sm text-foreground mt-0.5">
              {spokenLanguagesCount} spoken · {translationsCount} translations
            </p>
          </div>
        </div>
      </div>

      {/* Keywords */}
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
            {tm("keywords")}
          </h3>
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
