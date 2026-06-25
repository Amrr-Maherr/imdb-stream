"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "@/shared/components/ui/language-switcher";
import ThemeToggle from "@/shared/components/ui/theme-toggle";
import { Button } from "@/shared/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";

export default function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 shadow-md backdrop-blur-md"
          : "bg-background/0"
      }`}
    >
      <div className="app-container flex h-16 items-center gap-4">
        <Logo />

        <NavLinks />

        <div className="flex items-center gap-1 ms-auto md:gap-2">
          <SearchBar
            open={searchOpen}
            onToggle={() => setSearchOpen((p) => !p)}
          />

          <div className="hidden items-center gap-1 md:flex md:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/auth/signin">{t("signOut")}</Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/auth/signin">{t("signIn")}</Link>
            </Button>
          )}

          {isAuthenticated && <UserMenu />}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="app-container space-y-4 border-t border-border bg-background py-4 md:hidden">
          <NavLinks mobile />
          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/signin">{t("signIn")}</Link>
            </Button>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
