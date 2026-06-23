import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import type { TMDBCompanyDetails } from "@/types/tmdb";
import { slugify } from "@/lib/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CompanyCardProps = {
  company: TMDBCompanyDetails;
};

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={`/company/${slugify(company.name)}/${company.id}`}
      className="group flex-shrink-0 w-[160px] sm:w-[180px]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-card border border-border flex items-center justify-center p-4 transition-colors group-hover:border-brand/50">
        {company.logo_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w185${company.logo_path}`}
            alt={company.name}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            sizes="180px"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Building2 className="size-8" />
            <span className="text-xs text-center line-clamp-2">
              {company.name}
            </span>
          </div>
        )}
      </div>
      <div className="mt-2 space-y-0.5 text-center">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {company.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {company.origin_country || "Production Company"}
        </p>
        {company.description && (
          <p className="text-[10px] text-muted-foreground/50 line-clamp-1 leading-relaxed">
            {company.description}
          </p>
        )}
      </div>
    </Link>
  );
}
