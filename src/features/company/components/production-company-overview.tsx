import Link from "next/link";
import { Globe, MapPin, Building2, Film, ExternalLink } from "lucide-react";
import { slugify } from "@/shared/utils/slugify";

type ProductionCompanyOverviewProps = {
  description: string;
  originCountry: string;
  headquarters: string;
  parentCompany: { id: number; name: string; logo_path: string | null } | null;
  totalProductions: number;
  homepage: string;
};

export function ProductionCompanyOverview({
  description,
  originCountry,
  headquarters,
  parentCompany,
  totalProductions,
  homepage,
}: ProductionCompanyOverviewProps) {
  return (
    <section className="space-y-6">
      {description && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Company Facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {originCountry && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <Globe className="size-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Origin Country</p>
                <p className="text-sm text-foreground font-medium">{originCountry}</p>
              </div>
            </div>
          )}
          {headquarters && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <MapPin className="size-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Headquarters</p>
                <p className="text-sm text-foreground font-medium">{headquarters}</p>
              </div>
            </div>
          )}
          {totalProductions > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <Film className="size-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Total Productions</p>
                <p className="text-sm text-foreground font-medium">{totalProductions}</p>
              </div>
            </div>
          )}
          {parentCompany && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <Building2 className="size-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Parent Company</p>
                <Link
                  href={`/company/${slugify(parentCompany.name)}/${parentCompany.id}`}
                  className="text-sm text-foreground font-medium hover:text-brand transition-colors"
                >
                  {parentCompany.name}
                </Link>
              </div>
            </div>
          )}
          {homepage && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <ExternalLink className="size-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Website</p>
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground font-medium hover:text-brand transition-colors"
                >
                  {new URL(homepage).hostname}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
