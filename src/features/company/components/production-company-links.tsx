import { ExternalLink, Globe } from "lucide-react";
import type { ExternalIds } from "@/shared/types/tmdb";
import { MovieSection } from "@/features/movies/components/detail/movie-section";
import { Link2 } from "lucide-react";

type ProductionCompanyLinksProps = {
  homepage: string;
  externalIds: ExternalIds | null;
};

const LINKS: {
  key: keyof ExternalIds;
  label: string;
  href: (id: string) => string;
}[] = [
  {
    key: "imdb_id",
    label: "IMDb",
    href: (id) => `https://www.imdb.com/company/${id}`,
  },
  {
    key: "facebook_id",
    label: "Facebook",
    href: (id) => `https://www.facebook.com/${id}`,
  },
  {
    key: "instagram_id",
    label: "Instagram",
    href: (id) => `https://www.instagram.com/${id}`,
  },
  {
    key: "twitter_id",
    label: "X (Twitter)",
    href: (id) => `https://twitter.com/${id}`,
  },
];

export function ProductionCompanyLinks({
  homepage,
  externalIds,
}: ProductionCompanyLinksProps) {
  const socialLinks = externalIds
    ? LINKS.filter((link) => externalIds[link.key])
    : [];

  if (!homepage && socialLinks.length === 0) return null;

  return (
    <MovieSection title="External Links" icon={<Link2 className="size-5" />}>
      <div className="flex flex-wrap gap-2">
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Globe className="size-3.5" />
            Official Website
          </a>
        )}
        {socialLinks.map((link) => {
          const id = externalIds![link.key];
          if (!id) return null;
          return (
            <a
              key={link.key}
              href={link.href(id)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <ExternalLink className="size-3.5" />
              {link.label}
            </a>
          );
        })}
      </div>
    </MovieSection>
  );
}
