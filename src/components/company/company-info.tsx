import { Globe, MapPin, Building2, Calendar, Link as LinkIcon } from "lucide-react";

type CompanyInfoProps = {
  name: string;
  originCountry: string;
  headquarters: string;
  foundedDate: string | null;
  parentCompany: { id: number; name: string; logo_path: string | null } | null;
  homepage: string;
  totalProductions: number;
};

export function CompanyInfo({
  name,
  originCountry,
  headquarters,
  foundedDate,
  parentCompany,
  homepage,
  totalProductions,
}: CompanyInfoProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          Company Info
        </h3>
        <div className="space-y-3">
          {name && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Name</h4>
              <p className="text-sm text-foreground mt-0.5">{name}</p>
            </div>
          )}
          {originCountry && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                <Globe className="size-3" />
                Origin Country
              </h4>
              <p className="text-sm text-foreground mt-0.5">{originCountry}</p>
            </div>
          )}
          {headquarters && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="size-3" />
                Headquarters
              </h4>
              <p className="text-sm text-foreground mt-0.5">{headquarters}</p>
            </div>
          )}
          {foundedDate && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                <Calendar className="size-3" />
                Founded
              </h4>
              <p className="text-sm text-foreground mt-0.5">
                {new Date(foundedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          {totalProductions > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Productions</h4>
              <p className="text-sm text-foreground mt-0.5">{totalProductions}</p>
            </div>
          )}
          {homepage && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                <LinkIcon className="size-3" />
                Website
              </h4>
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand hover:underline mt-0.5 inline-block"
              >
                {new URL(homepage).hostname}
              </a>
            </div>
          )}
          {parentCompany && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Parent Company</h4>
              <p className="text-sm text-foreground mt-0.5">{parentCompany.name}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
