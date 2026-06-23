import Image from "next/image";
import { Building2, ExternalLink, Globe, MapPin, Film } from "lucide-react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type ProductionCompanyHeroProps = {
  name: string;
  logoPath: string | null;
  originCountry: string;
  headquarters: string;
  description: string;
  homepage: string;
  totalProductions: number;
};

export function ProductionCompanyHero({
  name,
  logoPath,
  originCountry,
  headquarters,
  description,
  homepage,
  totalProductions,
}: ProductionCompanyHeroProps) {
  return (
    <section className="bg-card border-b border-border">
      <div className="app-container py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0 mx-auto md:mx-0 w-full max-w-[280px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted flex items-center justify-center p-6">
              {logoPath ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w500${logoPath}`}
                  alt={name}
                  fill
                  className="object-contain p-4"
                  sizes="280px"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Building2 className="size-16" />
                  <span className="text-sm text-center">{name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {name}
            </h1>

            <div className="flex flex-wrap gap-2 mt-4">
              {originCountry && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  <Globe className="size-3" />
                  {originCountry}
                </span>
              )}
              {headquarters && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  <MapPin className="size-3" />
                  {headquarters}
                </span>
              )}
              {totalProductions > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  <Film className="size-3" />
                  {totalProductions} {totalProductions === 1 ? "Production" : "Productions"}
                </span>
              )}
            </div>

            {homepage && (
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-all"
                >
                  <ExternalLink className="size-4" />
                  Website
                </a>
              </div>
            )}

            {description && (
              <div className="mt-6">
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
