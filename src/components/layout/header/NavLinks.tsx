"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const links = [
  { href: "/", key: "home" },
  { href: "/movies", key: "movies" },
  { href: "/tv-shows", key: "tvShows" },
  { href: "/people", key: "people" },
] as const;

export default function NavLinks({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname();
  const t = useTranslations("Header.nav");

  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-1"
          : "hidden md:flex items-center gap-0.5"
      }
    >
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(link.key)}
            {isActive && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
