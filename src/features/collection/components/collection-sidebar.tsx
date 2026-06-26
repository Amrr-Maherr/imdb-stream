import {
  Star,
  Layers,
  Calendar,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import type { CollectionPart } from "@/shared/types/tmdb";
import { FadeIn } from "@/features/movies/components/detail/fade-in";
import { MovieRating } from "@/features/movies/components/detail/movie-rating";

type CollectionSidebarProps = {
  partsCount: number;
  releaseRange: string | null;
  avgRating: number;
  parts: CollectionPart[];
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

export function CollectionSidebar({
  partsCount,
  releaseRange,
  avgRating,
  parts,
}: CollectionSidebarProps) {
  const totalRevenue = parts.reduce((sum, p) => sum + (p as any).revenue || 0, 0);
  const totalBudget = parts.reduce((sum, p) => sum + (p as any).budget || 0, 0);
  const genres = parts.reduce((acc: string[], part) => {
    return acc;
  }, []);

  return (
    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8">
      {/* Statistics Card */}
      <FadeIn delay={0.05}>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Layers className="size-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Titles</p>
                <p className="text-sm text-foreground">{partsCount}</p>
              </div>
            </div>
            {releaseRange && (
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Release Range</p>
                  <p className="text-sm text-foreground">{releaseRange}</p>
                </div>
              </div>
            )}
            {avgRating > 0 && (
              <div className="flex items-center gap-3">
                <Star className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Average Rating</p>
                  <p className="text-sm text-foreground font-medium">
                    {avgRating.toFixed(1)}
                  </p>
                </div>
              </div>
            )}
            {partsCount > 0 && (
              <div className="flex items-center gap-3">
                <BarChart3 className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Popularity</p>
                  <p className="text-sm text-foreground">
                    {Math.round(
                      parts.reduce((sum, p) => sum + p.popularity, 0) /
                        partsCount,
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Rating Card */}
      {avgRating > 0 && (
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-border bg-card p-5">
            <MovieRating
              voteAverage={avgRating}
              voteCount={parts.reduce((sum, p) => sum + p.vote_count, 0)}
              popularity={Math.round(
                parts.reduce((sum, p) => sum + p.popularity, 0) / partsCount,
              )}
            />
          </div>
        </FadeIn>
      )}

      {/* Budget & Revenue Stats */}
      {(totalBudget > 0 || totalRevenue > 0) && (
        <FadeIn delay={0.15}>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
              Financials
            </h3>
            <div className="space-y-3">
              {totalBudget > 0 && (
                <div className="flex items-center gap-3">
                  <BarChart3 className="size-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Total Budget</p>
                    <p className="text-sm text-foreground">
                      {formatCurrency(totalBudget)}
                    </p>
                  </div>
                </div>
              )}
              {totalRevenue > 0 && (
                <div className="flex items-center gap-3">
                  <TrendingUp className="size-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                    <p className="text-sm text-foreground">
                      {formatCurrency(totalRevenue)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Collection Facts */}
      <FadeIn delay={0.05}>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
            Facts
          </h3>
          <div className="space-y-3">
            {parts.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                  Type
                </h4>
                <p className="text-sm text-foreground mt-0.5">
                  {parts.some((p) => isTV(p)) ? "Mixed" : "Movie Collection"}
                </p>
              </div>
            )}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                Languages
              </h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {[
                  ...new Set(
                    parts.map((p) => p.original_language).filter(Boolean),
                  ),
                ].map((lang) => (
                  <span
                    key={lang}
                    className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground uppercase"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function isTV(part: CollectionPart): boolean {
  return (
    part.media_type === "tv" ||
    part.original_title === undefined ||
    !part.title
  );
}
