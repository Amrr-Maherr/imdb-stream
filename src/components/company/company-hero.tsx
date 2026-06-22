import Image from "next/image";
import { Building2, ExternalLink, Globe, MapPin } from "lucide-react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CompanyHeroProps = {
  name: string;
  logoPath: string | null;
  headquarters: string;
  originCountry: string;
  homepage: string;
  description: string;
  totalProductions: number;
};

export function CompanyHero({
  name,
  logoPath,
  headquarters,
  originCountry,
  homepage,
  description,
  totalProductions,
}: CompanyHeroProps) {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Logo */}
          <div className="flex-shrink-0 mx-auto md:mx-0 w-full max-w-[260px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted flex items-center justify-center p-6">
              {logoPath ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w342${logoPath}`}
                  alt={name}
                  fill
                  className="object-contain p-4"
                  sizes="260px"
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

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {name}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
              {originCountry && (
                <span className="flex items-center gap-1.5">
                  <Globe className="size-4" />
                  <span className="font-medium text-foreground">Country:</span> {originCountry}
                </span>
              )}
              {headquarters && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  <span className="font-medium text-foreground">Headquarters:</span> {headquarters}
                </span>
              )}
              {totalProductions > 0 && (
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">{totalProductions}</span> productions
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-4">
              {homepage && (
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-all"
                >
                  <ExternalLink className="size-4" />
                  Website
                </a>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
                <div className="text-muted-foreground leading-relaxed line-clamp-[6]">
                  {description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
