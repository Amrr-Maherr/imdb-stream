"use client";

import { ExternalLink, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ExternalIds } from "@/shared/types/tmdb";
import { MovieSection } from "@/features/movies/components/detail/movie-section";
import { Link2 } from "lucide-react";

type ProductionCompanyLinksProps = {
  homepage: string;
  externalIds: ExternalIds | null;
};

const LINKS: {
  key: keyof ExternalIds;
  labelKey: string;
  href: (id: string) => string;
}[] = [
  {
    key: "imdb_id",
    labelKey: "imdb",
    href: (id) => `https://www.imdb.com/company/${id}`,
  },
  {
    key: "facebook_id",
    labelKey: "facebook",
    href: (id) => `https://www.facebook.com/${id}`,
  },
  {
    key: "instagram_id",
    labelKey: "instagram",
    href: (id) => `https://www.instagram.com/${id}`,
  },
  {
    key: "twitter_id",
    labelKey: "twitterX",
    href: (id) => `https://twitter.com/${id}`,
  },
];

export function ProductionCompanyLinks({
  homepage,
  externalIds,
}: ProductionCompanyLinksProps) {
  const t = useTranslations("Company");
  const socialLinks = externalIds
    ? LINKS.filter((link) => externalIds[link.key])
    : [];

  if (!homepage && socialLinks.length === 0) return null;

  return (
    <MovieSection title={t("externalLinks")} icon={<Link2 className="size-5" />}>
      <div className="flex flex-wrap gap-2">
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Globe className="size-3.5" />
            {t("officialWebsite")}
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
              {t(link.labelKey)}
            </a>
          );
        })}
      </div>
    </MovieSection>
  );
}
