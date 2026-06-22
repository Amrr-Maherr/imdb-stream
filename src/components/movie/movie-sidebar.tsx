import Link from "next/link";
import { DollarSign } from "lucide-react";
import { MovieRating } from "./movie-rating";
import { slugify } from "@/lib/slugify";

type MovieSidebarProps = {
  voteAverage: number;
  voteCount: number;
  popularity: number;
  budget: number;
  revenue: number;
  status: string;
  originalLanguage: string;
  releaseDate: string;
  originalTitle: string;
  title: string;
  productionCompanies: { id: number; name: string; logo_path: string | null }[];
  keywords: { id: number; name: string }[];
  translationsCount: number;
  spokenLanguagesCount: number;
};

function formatCurrency(amount: number) {
  if (amount === 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function MovieSidebar({
  voteAverage,
  voteCount,
  popularity,
  budget,
  revenue,
  status,
  originalLanguage,
  releaseDate,
  originalTitle,
  title,
  productionCompanies,
  keywords,
  translationsCount,
  spokenLanguagesCount,
}: MovieSidebarProps) {
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

      {/* Movie Facts */}
      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Facts</h3>
        <div className="space-y-3">
          {status && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Status</h4>
              <p className="text-sm text-foreground mt-0.5">{status}</p>
            </div>
          )}
          {releaseDate && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Release Date</h4>
              <p className="text-sm text-foreground mt-0.5">
                {new Date(releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          {originalLanguage && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Original Language</h4>
              <p className="text-sm text-foreground mt-0.5 uppercase">{originalLanguage}</p>
            </div>
          )}
          {budget > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Budget</h4>
              <p className="text-sm text-foreground mt-0.5 flex items-center gap-1">
                <DollarSign className="size-3.5" />
                {formatCurrency(budget)}
              </p>
            </div>
          )}
          {revenue > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Revenue</h4>
              <p className="text-sm text-foreground mt-0.5 flex items-center gap-1">
                <DollarSign className="size-3.5" />
                {formatCurrency(revenue)}
              </p>
            </div>
          )}
          {originalTitle !== title && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Original Title</h4>
              <p className="text-sm text-foreground mt-0.5">{originalTitle}</p>
            </div>
          )}
          {productionCompanies.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Production</h4>
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
